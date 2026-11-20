import { ApiError, fetchLikedMedia, likeMedia, unlikeMedia } from "@/lib/api";
import { toAppMediaType, toServerMediaType } from "@/lib/api/favorites";
import { tmdbImage } from "@/lib/tmdb";
import type {
  FavoriteTarget,
  FavoritesState,
  LikeMediaInput,
  LikedMedia,
  ServerMediaType,
} from "@/types/favorites";
import type { MediaItem, MediaType } from "@/types/tmdb";

let state: FavoritesState = { items: [], isLoading: false };
const listeners = new Set<() => void>();

let inFlight: Promise<void> | null = null;
let loaded = false;

const emit = () => listeners.forEach((listener) => listener());
const patch = (next: Partial<FavoritesState>) => {
  state = { ...state, ...next };
  emit();
};

export const toLikeInput = (item: FavoriteTarget): LikeMediaInput | undefined => {
  const imageUrl = tmdbImage(item.poster, "w342");
  if (!imageUrl) return undefined;

  return {
    mediaId: item.id,
    mediaType: toServerMediaType(item.type),
    title: item.title,
    imageUrl,
    rating: item.rating,
    year: item.year ? Number(item.year) : undefined,
  };
};

export const likedMediaToItem = (liked: LikedMedia): MediaItem => ({
  id: liked.mediaId,
  type: toAppMediaType(liked.mediaType),
  title: liked.title,
  rating: liked.rating,
  year: liked.year ? String(liked.year) : undefined,
  poster: null,
  backdrop: null,
  posterUrl: liked.imageUrl,
});

const load = (force = false): Promise<void> => {
  if (inFlight) return inFlight;
  if (loaded && !force) return Promise.resolve();

  patch({ isLoading: true });
  inFlight = fetchLikedMedia()
    .then((items) => {
      loaded = true;
      patch({ items, isLoading: false, error: undefined });
    })
    .catch((error: unknown) => {
      patch({
        isLoading: false,
        error: error instanceof Error ? error.message : "Couldn't load favourites",
      });
    })
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
};

const message = (error: unknown) =>
  error instanceof ApiError || error instanceof Error ? error.message : "Something went wrong";

export const favoritesStore = {
  get: () => state,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    void load();
    return () => {
      listeners.delete(listener);
    };
  },
  reload: () => load(true),

  find: (type: MediaType, id: number) =>
    state.items.find((item) => item.mediaId === id && toAppMediaType(item.mediaType) === type),

  add: async (input: LikeMediaInput) => {
    const tempId = `pending-${input.mediaType}-${input.mediaId}`;
    const optimistic: LikedMedia = {
      id: tempId,
      userId: "",
      likedAt: new Date().toISOString(),
      ...input,
    };

    if (state.items.some((item) => item.id === tempId)) return;
    if (favoritesStore.find(toAppMediaType(input.mediaType), input.mediaId)) return;

    patch({ items: [optimistic, ...state.items] });

    try {
      const created = await likeMedia(input);
      patch({ items: state.items.map((item) => (item.id === tempId ? created : item)) });
    } catch (error) {
      patch({ items: state.items.filter((item) => item.id !== tempId) });
      await load(true);
      throw new Error(message(error));
    }
  },

  remove: async (likedId: string) => {
    const removed = state.items.find((item) => item.id === likedId);
    if (!removed) return;

    patch({ items: state.items.filter((item) => item.id !== likedId) });

    try {
      await unlikeMedia(likedId);
    } catch (error) {
      patch({ items: [removed, ...state.items] });
      throw new Error(message(error));
    }
  },
};

export const favoriteKey = (type: MediaType, id: number) => `${type}-${id}`;

export type { ServerMediaType };
