import { Button, HStack, Host, Image, Text } from "@expo/ui/swift-ui";
import { buttonStyle, controlSize, font, tint } from "@expo/ui/swift-ui/modifiers";
import * as WebBrowser from "expo-web-browser";
import { useCallback } from "react";
import { Share } from "react-native";

import { FavoriteButton } from "@/components/favorites";
import { TINT_COLOR } from "@/constants/theme";
import { watchUrl } from "@/lib/tmdb";
import type { InfoActionsProps } from "@/types/info";

export function InfoActions({ type, id, title, favorite }: InfoActionsProps) {
  const handleWatch = useCallback(() => {
    WebBrowser.openBrowserAsync(watchUrl(type, id)).catch(() => {});
  }, [type, id]);

  const handleShare = useCallback(() => {
    const path = type === "tv" ? "tv" : "movie";
    Share.share({
      message: `${title} — https://www.themoviedb.org/${path}/${id}`,
    }).catch(() => {});
  }, [type, id, title]);

  return (
    <Host matchContents style={{ alignSelf: "flex-start" }}>
      <HStack spacing={8}>
        <Button
          onPress={handleWatch}
          modifiers={[buttonStyle("glassProminent"), tint(TINT_COLOR), controlSize("regular")]}
        >
          <HStack spacing={5}>
            <Image systemName="play.fill" size={12} />
            <Text modifiers={[font({ size: 13, weight: "semibold" })]}>Watch now</Text>
          </HStack>
        </Button>

        <Button onPress={handleShare} modifiers={[buttonStyle("glass"), controlSize("regular")]}>
          <HStack spacing={5}>
            <Image systemName="square.and.arrow.up" size={12} />
            <Text modifiers={[font({ size: 13, weight: "medium" })]}>Share</Text>
          </HStack>
        </Button>

        <FavoriteButton item={favorite} />
      </HStack>
    </Host>
  );
}
