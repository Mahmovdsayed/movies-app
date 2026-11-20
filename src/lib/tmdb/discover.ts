import type { SearchFilters } from "@/types/search";
import type { MediaType, TmdbParams } from "@/types/tmdb";

export const discoverPath = (type: MediaType) =>
  type === "tv" ? "/discover/tv" : "/discover/movie";
export const discoverTypes = (filters: SearchFilters): MediaType[] =>
  filters.type === "all" ? ["movie", "tv"] : [filters.type];

export const discoverParams = (type: MediaType, filters: SearchFilters): TmdbParams => {
  const params: TmdbParams = { sort_by: "popularity.desc" };

  if (filters.genreId !== null) {
    params.with_genres = filters.genreId;
  }
  if (filters.minRating > 0) {
    params["vote_average.gte"] = filters.minRating;
  }
  if (filters.language !== null) {
    params.with_original_language = filters.language;
  }
  if (filters.year !== null) {
    if (type === "tv") {
      params.first_air_date_year = filters.year;
    } else {
      params.primary_release_year = filters.year;
    }
  }

  return params;
};
