import { memo, useCallback } from "react";
import { useWindowDimensions, View, type ListRenderItemInfo } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { HeroCarouselDot } from "./hero-carousel-dot";
import { HeroSlide } from "./hero-slide";
import { HeroSkeleton } from "@/components/skeletons";
import { HERO_GAP, HERO_H_PADDING } from "@/constants/home";
import type { HeroCarouselProps } from "@/types/home";
import type { MediaItem } from "@/types/tmdb";

export const HeroCarousel = memo(function HeroCarousel({ items, isLoading }: HeroCarouselProps) {
  const { width } = useWindowDimensions();
  const itemWidth = width - HERO_H_PADDING * 2;
  const interval = itemWidth + HERO_GAP;
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<MediaItem>) => <HeroSlide item={item} width={itemWidth} />,
    [itemWidth]
  );

  if (isLoading) return <HeroSkeleton />;
  if (items.length === 0) return null;

  return (
    <View className="gap-3">
      <Animated.FlatList
        horizontal
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        snapToInterval={interval}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        initialNumToRender={2}
        windowSize={3}
        contentContainerStyle={{ paddingHorizontal: HERO_H_PADDING, gap: HERO_GAP }}
      />
      <View className="flex-row items-center justify-center gap-1.5">
        {items.map((item, i) => (
          <HeroCarouselDot key={item.id} index={i} interval={interval} scrollX={scrollX} />
        ))}
      </View>
    </View>
  );
});
