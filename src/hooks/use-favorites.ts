import { useMemo, useSyncExternalStore } from "react";

import { favoritesStore } from "@/lib/favorites-store";
import { toAppMediaType } from "@/lib/api/favorites";
import type { MediaType } from "@/types/tmdb";

export const useFavorites = () =>
  useSyncExternalStore(favoritesStore.subscribe, favoritesStore.get, favoritesStore.get);

export const useFavorite = (type: MediaType, id: number) => {
  const { items } = useFavorites();

  return useMemo(
    () => items.find((item) => item.mediaId === id && toAppMediaType(item.mediaType) === type),
    [items, type, id]
  );
};
