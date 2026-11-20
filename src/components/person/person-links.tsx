import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "heroui-native";
import { useMemo } from "react";
import { Linking, Pressable, View } from "react-native";

import { useTmdb } from "@/hooks";
import { personExternalIdsPath, toPersonLinks } from "@/lib/tmdb";
import type { PersonLinksProps } from "@/types/person";
import type { PersonLinkKey, TmdbExternalIds } from "@/types/tmdb";
import type { IoniconsName } from "@/types/ui";

const BUTTON_SIZE = 34;
const ICON_SIZE = 17;

const LINK_ICONS: Record<PersonLinkKey, IoniconsName> = {
  instagram: "logo-instagram",
  facebook: "logo-facebook",
  x: "logo-x",
  tiktok: "logo-tiktok",
  youtube: "logo-youtube",
  imdb: "film-outline",
};

export function PersonLinks({ id }: PersonLinksProps) {
  const foreground = useThemeColor("foreground");
  const { data } = useTmdb<TmdbExternalIds>(personExternalIdsPath(id));
  const links = useMemo(() => toPersonLinks(data), [data]);

  if (links.length === 0) return null;

  return (
    <View className="flex-row flex-wrap items-center justify-center gap-2">
      {links.map((link) => (
        <Pressable
          key={link.key}
          onPress={() => {
            Linking.openURL(link.url).catch(() => {});
          }}
          hitSlop={8}
          accessibilityRole="link"
          accessibilityLabel={link.label}
          className="items-center justify-center rounded-full active:opacity-60"
          style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
        >
          <Ionicons name={LINK_ICONS[link.key]} size={ICON_SIZE} color={foreground} />
        </Pressable>
      ))}
    </View>
  );
}
