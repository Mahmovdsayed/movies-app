import type { MediaType } from "@/types/tmdb";

export const genreListPath = (type: MediaType) =>
  type === "tv" ? "/genre/tv/list" : "/genre/movie/list";
