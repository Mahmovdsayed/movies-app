import { Image, View } from "react-native";
import Svg, { Defs, LinearGradient as SvgLinearGradient, Rect, Stop } from "react-native-svg";
import { BG_AUTH_IMAGE_URL } from "@/constants/config";
import { useIsDark } from "@/hooks/use-is-dark";

export function AuthBackground() {
  const isDark = useIsDark();
  const bgColor = isDark ? "#000000" : "#FFFFFF";

  return (
    <View className="absolute inset-0 h-[68%]">
      <Image
        source={{ uri: BG_AUTH_IMAGE_URL }}
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
      />
      <Svg height="100%" width="100%" className="absolute inset-0 w-full h-full">
        <Defs>
          <SvgLinearGradient id="posterFade" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={bgColor} stopOpacity="0" />
            <Stop offset="40%" stopColor={bgColor} stopOpacity="0.05" />
            <Stop offset="65%" stopColor={bgColor} stopOpacity="0.45" />
            <Stop offset="84%" stopColor={bgColor} stopOpacity="0.88" />
            <Stop offset="100%" stopColor={bgColor} stopOpacity="1" />
          </SvgLinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#posterFade)" />
      </Svg>
    </View>
  );
}
