import { useMemo, useState } from "react";
import { View } from "react-native";

import { MediaGrid } from "./media-grid";
import { GenreChips } from "@/components/home";
import { BROWSE_CHIPS_SPACING, BROWSE_PADDING } from "@/constants/browse";
import { ALL_GENRES } from "@/constants/home";
import { usePaginatedTmdb } from "@/hooks";
import { toMediaItem } from "@/lib/tmdb";
import type { BrowseGridProps } from "@/types/media";
import type { TmdbMedia, TmdbParams } from "@/types/tmdb";

export function BrowseGrid({ path, params, type }: BrowseGridProps) {
  const [genre, setGenre] = useState(ALL_GENRES);

  const requestParams = useMemo<TmdbParams | undefined>(
    () => (genre === ALL_GENRES ? params : { ...params, with_genres: genre }),
    [genre, params]
  );

  const browse = usePaginatedTmdb<TmdbMedia>(path, requestParams);
  const items = useMemo(
    () => browse.items.map((raw) => toMediaItem(raw, type)),
    [browse.items, type]
  );

  const header = useMemo(
    () => (
      <View
        style={{
          marginHorizontal: -BROWSE_PADDING,
          paddingTop: BROWSE_CHIPS_SPACING.top,
          paddingBottom: BROWSE_CHIPS_SPACING.bottom,
        }}
      >
        <GenreChips type={type} selected={genre} onSelect={setGenre} />
      </View>
    ),
    [genre, type]
  );

  return (
    <MediaGrid
      items={items}
      header={header}
      isLoading={browse.isLoading}
      isLoadingMore={browse.isLoadingMore}
      hasMore={browse.hasMore}
      error={browse.error}
      onLoadMore={browse.loadMore}
    />
  );
}
