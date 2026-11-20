import { router } from "expo-router";
import { useMemo } from "react";

import { MediaRow } from "./media-row";
import { useTmdb } from "@/hooks";
import { toMediaItem } from "@/lib/tmdb";
import type { MediaFeedRowProps } from "@/types/home";
import type { TmdbList, TmdbMedia } from "@/types/tmdb";

export function MediaFeedRow({ title, path, type, version, seeAllHref }: MediaFeedRowProps) {
  const { data, isLoading } = useTmdb<TmdbList<TmdbMedia>>(path, undefined, version);
  const items = useMemo(() => data?.results.map((r) => toMediaItem(r, type)) ?? [], [data, type]);
  if (!isLoading && items.length === 0) return null;

  return (
    <MediaRow
      title={title}
      items={items}
      isLoading={isLoading}
      onSeeAll={seeAllHref ? () => router.navigate(seeAllHref) : undefined}
    />
  );
}
