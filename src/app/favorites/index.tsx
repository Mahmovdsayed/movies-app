import { useMemo } from "react";

import { MediaGrid } from "@/components/media";
import { useFavorites } from "@/hooks";
import { likedMediaToItem } from "@/lib/favorites-store";

export default function FavoritesScreen() {
  const { items, isLoading, error } = useFavorites();

  const media = useMemo(() => items.map(likedMediaToItem), [items]);

  return (
    <MediaGrid
      items={media}
      isLoading={isLoading}
      error={error ? new Error(error) : undefined}
      emptyTitle="No favourites yet"
      emptyDescription="Long-press any poster to save it here."
    />
  );
}
