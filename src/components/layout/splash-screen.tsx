import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useIsDark } from "@/hooks/use-is-dark";

export function SplashScreenUI() {
  const isDark = useIsDark();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.96);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 750,
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });

    scale.value = withTiming(1, {
      duration: 850,
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
  }, [opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View className="flex-1 bg-white dark:bg-black items-center justify-center">
      <StatusBar style={isDark ? "light" : "dark"} />
      <Animated.View className="items-center justify-center" style={animatedStyle}>
        <Text className="text-[40px] font-bold text-black dark:text-white tracking-tight text-center">
          Movies
        </Text>
      </Animated.View>
    </View>
  );
}
