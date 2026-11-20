import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import type { SearchStateProps } from "@/types/search";

export function SearchCenteredState({ title, description }: SearchStateProps) {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      contentContainerClassName="grow items-center justify-center px-8"
    >
      <Text className="text-center text-base font-semibold text-foreground">{title}</Text>
      {description ? (
        <Text className="mt-1 text-center text-sm text-muted">{description}</Text>
      ) : null}
    </ScrollView>
  );
}

export function SearchLoading() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="grow items-center justify-center"
    >
      <ActivityIndicator />
    </ScrollView>
  );
}

export function SearchErrorCard() {
  return (
    <View className="w-full rounded-2xl bg-surface p-4">
      <Text className="text-base font-semibold text-foreground">Couldn&apos;t load results</Text>
      <Text className="mt-1 text-sm text-muted">Check your connection and try again.</Text>
    </View>
  );
}
