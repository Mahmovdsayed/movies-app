import * as WebBrowser from "expo-web-browser";
import { useCallback } from "react";

import { useAuthToast } from "./use-auth-toast";
import { useFavorite } from "./use-favorites";
import { openMedia } from "@/components/home";
import { favoritesStore, toLikeInput } from "@/lib/favorites-store";
import { watchUrl } from "@/lib/tmdb";
import type { MediaItem } from "@/types/tmdb";

export const useMediaMenu = (item: MediaItem) => {
  const { success, error } = useAuthToast();
  const favorite = useFavorite(item.type, item.id);

  const toggleFavorite = useCallback(async () => {
    try {
      if (favorite) {
        await favoritesStore.remove(favorite.id);
        success("Removed from favourites", item.title);
        return;
      }

      const input = toLikeInput(item);
      if (!input) {
        error("Can't save this one", "It has no poster for the server to store.");
        return;
      }

      await favoritesStore.add(input);
      success("Added to favourites", item.title);
    } catch (err) {
      error("Couldn't update favourites", err instanceof Error ? err.message : "Please try again.");
    }
  }, [favorite, item, success, error]);

  const open = useCallback(() => openMedia(item), [item]);

  const watch = useCallback(() => {
    WebBrowser.openBrowserAsync(watchUrl(item.type, item.id)).catch(() => {});
  }, [item]);

  return { favorite, toggleFavorite, open, watch };
};
