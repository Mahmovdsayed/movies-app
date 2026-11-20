import { memo, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  useWindowDimensions,
  type ListRenderItemInfo,
} from "react-native";

import { MediaGridCard } from "./media-grid-card";
import { BROWSE_COLUMNS, BROWSE_GAP, BROWSE_PADDING } from "@/constants/browse";
import type { MediaGridProps } from "@/types/media";
import type { MediaItem } from "@/types/tmdb";

function Message({ title, description }: { title: string; description?: string }) {
  return (
    <View className="items-center px-8 py-16">
      <Text className="text-center text-base font-semibold text-foreground">{title}</Text>
      {description ? (
        <Text className="mt-1 text-center text-sm text-muted">{description}</Text>
      ) : null}
    </View>
  );
}

export const MediaGrid = memo(function MediaGrid({
  items,
  header,
  emptyTitle = "Nothing here yet",
  emptyDescription,
  isLoading,
  isLoadingMore,
  hasMore,
  error,
  onLoadMore,
}: MediaGridProps) {
  const { width } = useWindowDimensions();
  const cardWidth =
    (width - BROWSE_PADDING * 2 - BROWSE_GAP * (BROWSE_COLUMNS - 1)) / BROWSE_COLUMNS;

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<MediaItem>) => <MediaGridCard item={item} width={cardWidth} />,
    [cardWidth]
  );

  const empty = error ? (
    <Message title="Couldn't load" description="Check your connection and try again." />
  ) : isLoading ? (
    <View className="items-center py-16">
      <ActivityIndicator />
    </View>
  ) : (
    <Message title={emptyTitle} description={emptyDescription} />
  );

  return (
    <FlatList
      data={items}
      ListHeaderComponent={header ? <>{header}</> : undefined}
      ListEmptyComponent={empty}
      keyExtractor={(item) => `${item.type}-${item.id}`}
      renderItem={renderItem}
      numColumns={BROWSE_COLUMNS}
      columnWrapperStyle={{ gap: BROWSE_GAP }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        padding: BROWSE_PADDING,
        gap: BROWSE_GAP,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
      onEndReached={hasMore ? onLoadMore : undefined}
      onEndReachedThreshold={0.6}
      ListFooterComponent={
        isLoadingMore ? (
          <View className="items-center py-5">
            <ActivityIndicator />
          </View>
        ) : undefined
      }
    />
  );
});
