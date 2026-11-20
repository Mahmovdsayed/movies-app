import { Skeleton } from "heroui-native";
import { View } from "react-native";
import { MEDIA_CARD_WIDTH, MEDIA_ROW_SKELETON_KEYS } from "@/constants/home";

export function MediaRowSkeleton() {
  return (
    <View className="flex-row gap-3 overflow-hidden px-6">
      {MEDIA_ROW_SKELETON_KEYS.map((key) => (
        <View key={key} style={{ width: MEDIA_CARD_WIDTH }} className="gap-2">
          <Skeleton className="aspect-2/3 w-full rounded-2xl" />
          <Skeleton className="h-3.5 w-24 rounded-md" />
        </View>
      ))}
    </View>
  );
}
