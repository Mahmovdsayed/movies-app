import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { heroStyles } from "./hero-styles";
import { openMedia } from "./open-media";
import { MaskedView, RemoteImage } from "@/components/ui";
import { tmdbImage } from "@/lib/tmdb";
import type { HeroSlideProps } from "@/types/home";

export const HeroSlide = memo(function HeroSlide({ item, width }: HeroSlideProps) {
  return (
    <Pressable
      onPress={() => openMedia(item)}
      style={{ width }}
      accessibilityRole="button"
      accessibilityLabel={item.title}
    >
      <View className="aspect-video overflow-hidden rounded-3xl bg-surface">
        <RemoteImage
          source={{ uri: tmdbImage(item.backdrop, "w780") }}
          recyclingKey={String(item.id)}
          contentFit="cover"
          transition={250}
          className="h-full w-full"
        />

        <MaskedView
          style={heroStyles.fade}
          pointerEvents="none"
          maskElement={
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
              locations={[0, 0.65]}
              style={StyleSheet.absoluteFill}
            />
          }
        >
          <BlurView intensity={45} tint="systemMaterialDark" style={StyleSheet.absoluteFill} />
        </MaskedView>

        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.45)"]}
          style={heroStyles.fade}
          pointerEvents="none"
        />

        <View className="absolute bottom-0 left-0 right-0 gap-1 p-4">
          <Text numberOfLines={1} className="text-base font-bold text-white">
            {item.title}
          </Text>
          <View className="flex-row items-center gap-1.5">
            <Ionicons name="star" size={12} color="#FACC15" />
            <Text className="text-xs font-medium text-white/80">
              {item.rating.toFixed(1)}
              {item.year ? `  ·  ${item.year}` : ""}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
});
