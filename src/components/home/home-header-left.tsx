import { useRouter } from "expo-router";
import { Avatar } from "heroui-native";
import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { authClient } from "@/lib/auth-client";


export const HomeHeaderLeft = memo(function HomeHeaderLeft() {
  const router = useRouter();
  const { data } = authClient.useSession();
  const user = data?.user;
  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <Pressable
      className="flex-row items-center gap-2 pe-2"
      onPress={() => router.navigate("/(tabs)/profile")}
      accessibilityRole="button"
      accessibilityLabel="Open profile"
    >
      <Avatar size="sm" alt={user?.name ?? "Profile"}>
        {user?.image ? <Avatar.Image source={{ uri: user.image }} /> : null}
        <Avatar.Fallback>{firstName[0]?.toUpperCase()}</Avatar.Fallback>
      </Avatar>

      <View>
        <Text className="text-[10px] leading-[12px] text-muted">Welcome back</Text>
        <Text className="text-[13px] leading-[15px] font-semibold text-foreground">
          {firstName}
        </Text>
      </View>
    </Pressable>
  );
});
