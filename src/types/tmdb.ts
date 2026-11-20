export type TmdbParams = Record<string, string | number>;
export type TmdbRequest = [path: string, params?: TmdbParams];

export type MediaType = "movie" | "tv";

export interface TmdbList<T> {
  page: number;
  results: T[];
  total_pages: number;
}

export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbMedia {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  original_language?: string;
  genre_ids?: number[];
  release_date?: string;
  first_air_date?: string;
}

export interface TmdbMultiMedia extends TmdbMedia {
  media_type?: "movie" | "tv" | "person";
}

export interface MediaItem {
  id: number;
  type: MediaType;
  title: string;
  year?: string;
  rating: number;
  poster: string | null;
  backdrop: string | null;
}
