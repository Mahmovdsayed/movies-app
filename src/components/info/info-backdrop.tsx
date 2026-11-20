import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeColor } from "heroui-native";
import { StyleSheet, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";

import { MaskedView, RemoteImage } from "@/components/ui";
import {
  INFO_BACKDROP_BASE_SCALE,
  INFO_BACKDROP_FADE_HEIGHT,
  INFO_BACKDROP_HEIGHT,
  INFO_BACKDROP_PARALLAX,
  INFO_BACKDROP_STRETCH_SCALE,
} from "@/constants/info";
import { tmdbImage } from "@/lib/tmdb";
import type { InfoBackdropProps } from "@/types/info";

const styles = StyleSheet.create({
  blur: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "64%",
  },
  scrim: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "62%",
  },
  fade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: INFO_BACKDROP_FADE_HEIGHT,
  },
});

export function InfoBackdrop({ details, scrollY }: InfoBackdropProps) {
  const background = useThemeColor("background");

  const animatedStyle = useAnimatedStyle(() => {
    const overscroll = Math.min(scrollY.value, 0);

    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, INFO_BACKDROP_HEIGHT],
            [0, INFO_BACKDROP_HEIGHT * INFO_BACKDROP_PARALLAX],
            "clamp"
          ),
        },
        {
          scale: interpolate(
            scrollY.value,
            [-INFO_BACKDROP_HEIGHT, 0, INFO_BACKDROP_HEIGHT],
            [INFO_BACKDROP_STRETCH_SCALE, INFO_BACKDROP_BASE_SCALE, INFO_BACKDROP_BASE_SCALE],
            "clamp"
          ),
        },
        { translateY: overscroll * 0.25 },
      ],
    };
  });

  return (
    <View style={{ height: INFO_BACKDROP_HEIGHT }} className="overflow-hidden bg-surface">
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <RemoteImage
          source={{ uri: tmdbImage(details.backdrop ?? details.poster, "w780") }}
          recyclingKey={String(details.id)}
          contentFit="cover"
          transition={250}
          className="h-full w-full"
        />

        <MaskedView
          style={styles.blur}
          pointerEvents="none"
          maskElement={
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
              locations={[0, 1]}
              style={StyleSheet.absoluteFill}
            />
          }
        >
          <BlurView intensity={60} tint="systemMaterialDark" style={StyleSheet.absoluteFill} />
        </MaskedView>

        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.62)", "rgba(0,0,0,0.7)", "rgba(0,0,0,0.45)"]}
          locations={[0, 0.45, 0.72, 1]}
          style={styles.scrim}
          pointerEvents="none"
        />
      </Animated.View>

      <LinearGradient
        colors={["transparent", background]}
        locations={[0.12, 1]}
        style={styles.fade}
        pointerEvents="none"
      />
    </View>
  );
}
