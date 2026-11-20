import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useThemeColor } from "heroui-native";
import { useState } from "react";
import { View } from "react-native";
import { withUniwind } from "uniwind";

import type { RemoteImageProps } from "@/types/ui";

const UniwindImage = withUniwind(Image);

export function RemoteImage({
  source,
  className,
  icon = "image-outline",
  iconSize = 28,
  ...rest
}: RemoteImageProps) {
  const muted = useThemeColor("muted");
  const uri =
    source && typeof source === "object" && "uri" in source ? (source.uri ?? undefined) : undefined;

  const [failedUri, setFailedUri] = useState<string | null>(null);

  if (!uri || failedUri === uri) {
    return (
      <View
        className={`${className ?? ""} items-center justify-center bg-surface`}
        accessibilityRole="image"
        accessibilityLabel="No image available"
      >
        <Ionicons name={icon} size={iconSize} color={muted} />
      </View>
    );
  }

  return (
    <UniwindImage
      source={{ uri }}
      className={className}
      onError={() => setFailedUri(uri)}
      {...rest}
    />
  );
}
