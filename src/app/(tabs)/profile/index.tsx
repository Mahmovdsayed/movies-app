import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Avatar } from "heroui-native";
import { Pressable, ScrollView, Text, View } from "react-native";

import { useFavorites } from "@/hooks";
import { authClient } from "@/lib/auth-client";
import type { IoniconsName } from "@/types/ui";

function Row({
  icon,
  label,
  value,
  onPress,
}: {
  icon: IoniconsName;
  label: string;
  value?: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      className="flex-row items-center gap-3 border-b border-zinc-200/70 px-6 py-4 active:opacity-70 dark:border-zinc-800/70"
    >
      <Ionicons name={icon} size={20} color="#8E8E93" />
      <Text className="flex-1 text-base text-foreground">{label}</Text>
      {value ? <Text className="text-sm text-muted">{value}</Text> : null}
      <Ionicons name="chevron-forward" size={16} color="#8E8E93" />
    </Pressable>
  );
}

const ProfileScreen = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { items } = useFavorites();

  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
    >
      <View className="items-center gap-3 px-6 py-8">
        <Avatar className="border-2 border-default" size="lg" alt={user?.name ?? "Profile"}>
          {user?.image ? <Avatar.Image source={{ uri: user.image }} /> : null}
          <Avatar.Fallback>{firstName[0]?.toUpperCase()}</Avatar.Fallback>
        </Avatar>

        <View className="items-center gap-0.5">
          <Text className="text-xl font-bold text-foreground">{user?.name ?? "Profile"}</Text>
          {user?.email ? <Text className="text-sm text-muted">{user.email}</Text> : null}
        </View>
      </View>

      <Row
        icon="heart-outline"
        label="Favourites"
        value={items.length > 0 ? String(items.length) : undefined}
        onPress={() => router.push("/favorites")}
      />
      <Row icon="settings-outline" label="Settings" onPress={() => router.push("/settings")} />
    </ScrollView>
  );
};

export default ProfileScreen;
