import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useToast } from "heroui-native";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";

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
  onPress?: () => void;
}) {
  const content = (
    <>
      <Ionicons name={icon} size={20} color="#8E8E93" />
      <Text numberOfLines={1} className="flex-1 text-base text-foreground">
        {label}
      </Text>
      {value ? (
        <Text numberOfLines={1} className="max-w-[55%] text-sm text-muted">
          {value}
        </Text>
      ) : null}
      {onPress ? <Ionicons name="chevron-forward" size={16} color="#8E8E93" /> : null}
    </>
  );

  const className =
    "flex-row items-center gap-3 border-b border-zinc-200/70 px-6 py-4 dark:border-zinc-800/70";

  if (!onPress) {
    return <View className={className}>{content}</View>;
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      className={`${className} active:opacity-70`}
    >
      {content}
    </Pressable>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <Text className="px-6 pb-2 pt-8 text-xs font-semibold uppercase tracking-wide text-muted">
      {children}
    </Text>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = authClient.useSession();
  const { items } = useFavorites();

  const version = Constants.expoConfig?.version ?? "1.0.0";

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.show({
          label: "Sign out failed",
          description: error.message || "Could not sign out. Please try again.",
          variant: "danger",
          placement: "top",
        });
        return;
      }

      toast.show({
        label: "Signed out",
        description: "You have been signed out successfully",
        variant: "success",
        placement: "top",
      });
    } catch (err: unknown) {
      toast.show({
        label: "Sign out error",
        description: err instanceof Error ? err.message : "An unexpected error occurred",
        variant: "danger",
        placement: "top",
      });
    }
  };

  const openTmdb = () => {
    Linking.openURL("https://www.themoviedb.org").catch(() => {});
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
    >
      <SectionLabel>Account</SectionLabel>
      <Row icon="mail-outline" label="Email" value={session?.user?.email ?? "Not signed in"} />
      <Row
        icon="heart-outline"
        label="Favourites"
        value={items.length > 0 ? String(items.length) : undefined}
        onPress={() => router.push("/favorites")}
      />

      <SectionLabel>About</SectionLabel>
      <Row icon="information-circle-outline" label="Version" value={version} />
      <Row icon="film-outline" label="Data from TMDB" onPress={openTmdb} />

      <View className="px-6 pt-10">
        <Pressable
          onPress={handleSignOut}
          accessibilityRole="button"
          className="items-center rounded-full bg-red-600 px-6 py-3 active:opacity-80"
        >
          <Text className="text-sm font-semibold text-white">Sign Out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
