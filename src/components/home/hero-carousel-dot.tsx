import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";

import type { HeroCarouselDotProps } from "@/types/home";

export function HeroCarouselDot({ index, interval, scrollX }: HeroCarouselDotProps) {
  const style = useAnimatedStyle(() => {
    const p = scrollX.value / interval;
    const range = [index - 1, index, index + 1];
    return {
      width: interpolate(p, range, [6, 18, 6], "clamp"),
      opacity: interpolate(p, range, [0.3, 1, 0.3], "clamp"),
    };
  });

  return <Animated.View style={style} className="h-1.5 rounded-full bg-foreground" />;
}
