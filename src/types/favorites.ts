import type { MediaItem } from "./tmdb";

export type ServerMediaType = "movie" | "series";

export interface LikedMedia {
  id: string;
  userId: string;
  mediaId: number;
  mediaType: ServerMediaType;
  title: string;
  imageUrl: string;
  rating: number;
  year?: number | null;
  likedAt: string;
}

export interface LikeMediaInput {
  mediaId: number;
  mediaType: ServerMediaType;
  title: string;
  imageUrl: string;
  rating: number;
  year?: number;
}

export type FavoriteTarget = Pick<
  MediaItem,
  "id" | "type" | "title" | "poster" | "rating" | "year"
>;

export interface FavoriteButtonProps {
  item: FavoriteTarget;
}

export interface FavoritesState {
  items: LikedMedia[];
  isLoading: boolean;
  error?: string;
}
