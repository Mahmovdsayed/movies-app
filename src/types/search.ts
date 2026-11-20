import type { MediaItem, MediaType } from "./tmdb";

export type SearchMediaFilter = "all" | "movie" | "tv";

export interface SearchFilters {
  type: SearchMediaFilter;
  genreId: number | null;
  minRating: number;
  year: number | null;
  language: string | null;
}

export interface SearchFilterSheetProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
}

export interface SearchResultsProps {
  query: string;
  filters: SearchFilters;
}

export interface SearchDiscoverProps {
  filters: SearchFilters;
}

export interface DiscoverSectionProps {
  type: MediaType;
  filters: SearchFilters;
  title?: string;
}

export interface SearchResultGridProps {
  items: MediaItem[];
}

export interface SearchStateProps {
  title: string;
  description?: string;
}

export interface SearchResultCardProps {
  item: MediaItem;
  width: number;
}
