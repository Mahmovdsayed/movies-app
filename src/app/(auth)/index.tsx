import { Typography } from "heroui-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthBackground, AuthWelcomeActions } from "@/components/auth";

export default function AuthWelcomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <AuthBackground />

      <View
        className="flex-1 justify-end items-center px-6 gap-6"
        style={{ paddingBottom: insets.bottom + 28 }}
      >
        <View className="items-center w-full">
          <Typography.Heading
            type="h3"
            className="text-2xl font-bold text-center text-zinc-950 dark:text-white tracking-tight leading-snug mb-2"
          >
            Find Your Next{"\n"}Favorite Movie Here
          </Typography.Heading>
          <Typography.Paragraph className="text-[13px] font-normal text-center text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Get access to an extensive library of movies, from timeless classics to the latest
            blockbusters.
          </Typography.Paragraph>
        </View>

        <AuthWelcomeActions />
      </View>
    </View>
  );
}
