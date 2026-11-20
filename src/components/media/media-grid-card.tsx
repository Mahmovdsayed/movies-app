import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { MediaContextMenu } from "./media-context-menu";
import { openMedia } from "@/components/home";
import { RemoteImage } from "@/components/ui";
import { tmdbImage } from "@/lib/tmdb";
import type { MediaGridCardProps } from "@/types/media";

export function MediaGridCard({ item, width }: MediaGridCardProps) {
  return (
    <MediaContextMenu item={item} width={width}>
      <Pressable
        onPress={() => openMedia(item)}
        accessibilityRole="button"
        accessibilityLabel={`${item.title}, rated ${item.rating.toFixed(1)}`}
        className="w-full"
      >
        <View className="aspect-2/3 overflow-hidden rounded-2xl bg-surface">
          <RemoteImage
            source={{ uri: item.posterUrl ?? tmdbImage(item.poster, "w342") }}
            recyclingKey={String(item.id)}
            contentFit="cover"
            transition={200}
            className="h-full w-full"
          />
          {item.rating > 0 && (
            <View className="absolute right-2 top-2 flex-row items-center gap-1 rounded-full bg-black/60 px-2 py-1">
              <Ionicons name="star" size={11} color="#FACC15" />
              <Text className="text-xs font-semibold text-white">{item.rating.toFixed(1)}</Text>
            </View>
          )}
        </View>

        <Text numberOfLines={1} className="mt-2 text-sm font-semibold text-foreground">
          {item.title}
        </Text>
        <Text numberOfLines={1} className="text-xs text-muted">
          {item.type === "tv" ? "TV Show" : "Movie"}
          {item.year ? ` · ${item.year}` : ""}
        </Text>
      </Pressable>
    </MediaContextMenu>
  );
}
