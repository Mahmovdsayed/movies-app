import { Stack, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import { MediaRow } from "@/components/home";
import { PersonProfile } from "@/components/person";
import { useTmdb } from "@/hooks";
import { personCreditsPath, personPath, toPersonCredits, toPersonProfile } from "@/lib/tmdb";
import type { TmdbPerson, TmdbPersonCredits } from "@/types/tmdb";

export default function PersonScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const id = Number(params.id);

  const { data, error } = useTmdb<TmdbPerson>(personPath(id));
  const credits = useTmdb<TmdbPersonCredits>(personCreditsPath(id));

  const person = useMemo(() => (data ? toPersonProfile(data) : undefined), [data]);

  const { movies, shows } = useMemo(() => {
    const all = toPersonCredits(credits.data?.cast);
    return {
      movies: all.filter((item) => item.type === "movie"),
      shows: all.filter((item) => item.type === "tv"),
    };
  }, [credits.data]);

  if (!person) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        {error ? (
          <View className="w-full rounded-2xl bg-surface p-4">
            <Text className="text-base font-semibold text-foreground">
              Couldn&apos;t load this person
            </Text>
            <Text className="mt-1 text-sm text-muted">Check your connection and try again.</Text>
          </View>
        ) : (
          <ActivityIndicator />
        )}
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: person.name }} />

      <ScrollView
        className="flex-1 bg-background"
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-6 pb-10"
      >
        <View className="px-6">
          <PersonProfile person={person} />
        </View>

        {movies.length > 0 || credits.isLoading ? (
          <MediaRow title="Movies" items={movies} isLoading={credits.isLoading} />
        ) : null}

        {shows.length > 0 || credits.isLoading ? (
          <MediaRow title="TV Shows" items={shows} isLoading={credits.isLoading} />
        ) : null}
      </ScrollView>
    </>
  );
}
