import type { TmdbParams } from "@/types/tmdb";

export const BROWSE_COLUMNS = 2;
export const BROWSE_GAP = 12;
export const BROWSE_PADDING = 24;
export const BROWSE_CHIPS_SPACING = { top: 12, bottom: 16 };
export const BROWSE_MAX_PAGES = 500;
const DISCOVER_PARAMS: TmdbParams = { sort_by: "popularity.desc", include_adult: "false" };

export const MOVIE_BROWSE = {
  path: "/discover/movie",
  params: DISCOVER_PARAMS,
} as const;

export const TV_BROWSE = {
  path: "/discover/tv",
  params: DISCOVER_PARAMS,
} as const;
