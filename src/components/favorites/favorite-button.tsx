import { Button, Image } from "@expo/ui/swift-ui";
import { buttonStyle, controlSize, tint } from "@expo/ui/swift-ui/modifiers";
import { useCallback, useState } from "react";

import { TINT_COLOR } from "@/constants/theme";
import { useFavorite } from "@/hooks";
import { useAuthToast } from "@/hooks/use-auth-toast";
import { favoritesStore, toLikeInput } from "@/lib/favorites-store";
import type { FavoriteButtonProps } from "@/types/favorites";

export function FavoriteButton({ item }: FavoriteButtonProps) {
  const favorite = useFavorite(item.type, item.id);
  const { success, error } = useAuthToast();
  const [busy, setBusy] = useState(false);

  const handlePress = useCallback(async () => {
    if (busy) return;
    setBusy(true);

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
    } finally {
      setBusy(false);
    }
  }, [busy, favorite, item, success, error]);

  return (
    <Button
      onPress={handlePress}
      modifiers={[
        buttonStyle("glass"),
        controlSize("regular"),
        ...(favorite ? [tint(TINT_COLOR)] : []),
      ]}
    >
      <Image systemName={favorite ? "heart.fill" : "heart"} size={12} />
    </Button>
  );
}
