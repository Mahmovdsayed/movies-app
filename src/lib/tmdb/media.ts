import type { MediaItem, MediaType, TmdbMedia } from "@/types/tmdb";

const IMAGE_BASE = "https://image.tmdb.org/t/p";

export const tmdbImage = (path: string | null | undefined, size: "w342" | "w780") =>
  path ? `${IMAGE_BASE}/${size}${path}` : undefined;

export const toMediaItem = (raw: TmdbMedia, type: MediaType): MediaItem => ({
  id: raw.id,
  type,
  title: raw.title ?? raw.name ?? "Untitled",
  year: (raw.release_date ?? raw.first_air_date)?.slice(0, 4) || undefined,
  rating: raw.vote_average ?? 0,
  poster: raw.poster_path,
  backdrop: raw.backdrop_path,
});
