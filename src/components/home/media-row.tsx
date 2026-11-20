import { memo, useCallback } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { MediaCard } from "./media-card";
import { MediaRowSkeleton } from "@/components/skeletons";
import type { MediaRowProps } from "@/types/home";
import type { MediaItem } from "@/types/tmdb";

export const MediaRow = memo(function MediaRow({
  title,
  items,
  isLoading,
  onSeeAll,
}: MediaRowProps) {
  const renderItem = useCallback(({ item }: { item: MediaItem }) => <MediaCard item={item} />, []);

  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between px-6">
        <Text className="text-xl font-bold text-foreground">{title}</Text>
        {onSeeAll ? (
          <Pressable onPress={onSeeAll} hitSlop={8} accessibilityRole="link">
            <Text className="text-sm font-medium text-muted">See all</Text>
          </Pressable>
        ) : null}
      </View>

      {isLoading ? (
        <MediaRowSkeleton />
      ) : (
        <FlatList
          horizontal
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.type}-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-3 px-6"
          initialNumToRender={4}
          maxToRenderPerBatch={4}
          windowSize={5}
          removeClippedSubviews
        />
      )}
    </View>
  );
});
