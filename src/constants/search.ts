import type { HomeSection } from "@/types/home";
import type { SearchFilters, SearchMediaFilter } from "@/types/search";

export const SEARCH_DEBOUNCE_MS = 350;

export const SEARCH_GRID_COLUMNS = 2;
export const SEARCH_GRID_GAP = 16;
export const SEARCH_GRID_PADDING = 24;

export const SEARCH_SUGGESTION_ROWS = [
  { title: "Trending now", path: "/trending/movie/day", type: "movie" },
  { title: "Top rated", path: "/movie/top_rated", type: "movie" },
  { title: "Popular TV shows", path: "/tv/popular", type: "tv" },
] as const satisfies readonly HomeSection[];

export const DEFAULT_SEARCH_FILTERS: SearchFilters = {
  type: "all",
  genreId: null,
  minRating: 0,
  year: null,
  language: null,
};

export const ANY_GENRE_ID = 0;
export const ANY_YEAR = 0;
export const ANY_LANGUAGE = "";

const CURRENT_YEAR = new Date().getFullYear();

export const SEARCH_YEAR_OPTIONS: { value: number; label: string }[] = [
  { value: ANY_YEAR, label: "Any year" },
  ...Array.from({ length: 56 }, (_, index) => {
    const year = CURRENT_YEAR + 1 - index;
    return { value: year, label: String(year) };
  }),
];

export const SEARCH_LANGUAGE_OPTIONS: { value: string; label: string }[] = [
  { value: ANY_LANGUAGE, label: "Any language" },
  { value: "ar", label: "Arabic" },
  { value: "zh", label: "Chinese" },
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "hi", label: "Hindi" },
  { value: "it", label: "Italian" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "es", label: "Spanish" },
  { value: "tr", label: "Turkish" },
];

export const SEARCH_TYPE_OPTIONS: { value: SearchMediaFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "movie", label: "Movies" },
  { value: "tv", label: "TV" },
];

export const SEARCH_RATING_OPTIONS: { value: number; label: string }[] = [
  { value: 0, label: "Any" },
  { value: 7, label: "7+" },
  { value: 8.5, label: "8.5+" },
];

/** True when any filter is narrowing the results. */
export const hasActiveSearchFilters = (filters: SearchFilters) =>
  filters.type !== DEFAULT_SEARCH_FILTERS.type || filters.genreId !== null || filters.minRating > 0;
