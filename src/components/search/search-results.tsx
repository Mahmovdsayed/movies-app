import { useMemo } from "react";
import { ScrollView } from "react-native";
import { SearchResultGrid } from "./search-result-grid";
import { SearchCenteredState, SearchLoading } from "./search-states";
import { SEARCH_GRID_PADDING } from "@/constants/search";
import { useTmdb } from "@/hooks";
import { toMediaItem } from "@/lib/tmdb";
import type { SearchResultsProps } from "@/types/search";
import type { MediaItem, TmdbList, TmdbMultiMedia } from "@/types/tmdb";

export function SearchResults({ query, filters }: SearchResultsProps) {
  const { data, isLoading, error } = useTmdb<TmdbList<TmdbMultiMedia>>("/search/multi", {
    query,
    include_adult: "false",
  });

  const items = useMemo<MediaItem[]>(
    () =>
      (data?.results ?? []).flatMap((result) => {
        const type = result.media_type;
        if (type !== "movie" && type !== "tv") return [];
        if (filters.type !== "all" && filters.type !== type) return [];
        if (filters.minRating > 0 && (result.vote_average ?? 0) < filters.minRating) return [];
        if (filters.genreId !== null && !(result.genre_ids ?? []).includes(filters.genreId)) {
          return [];
        }
        if (filters.language !== null && result.original_language !== filters.language) {
          return [];
        }
        if (filters.year !== null) {
          const date = result.release_date ?? result.first_air_date;
          if (!date?.startsWith(String(filters.year))) return [];
        }
        return [toMediaItem(result, type)];
      }),
    [data, filters]
  );

  if (error) {
    return (
      <SearchCenteredState
        title="Search failed"
        description="Check your connection and try again."
      />
    );
  }

  if (isLoading) {
    return <SearchLoading />;
  }

  if (items.length === 0) {
    return (
      <SearchCenteredState
        title={`No results for “${query}”`}
        description="Try a different title, or loosen the filters."
      />
    );
  }

  return (
    <ScrollView
      className="flex-1"
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ padding: SEARCH_GRID_PADDING, paddingBottom: 40 }}
    >
      <SearchResultGrid items={items} />
    </ScrollView>
  );
}
