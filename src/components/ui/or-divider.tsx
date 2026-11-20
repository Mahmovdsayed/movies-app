import { Text, View } from "react-native";
import type { OrDividerProps } from "@/types/ui";

export function OrDivider({ className = "flex-row items-center w-full" }: OrDividerProps) {
  return (
    <View className={className}>
      <View className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
      <Text className="mx-3 text-xs text-zinc-400 dark:text-zinc-500 font-medium">
        or continue with
      </Text>
      <View className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
    </View>
  );
}
