import { router, Stack } from "expo-router";
import { useCallback, useMemo, useRef, useState, type ComponentProps } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import type { SearchBarCommands } from "react-native-screens";

import { GenreChips, HeroCarousel, MediaFeedRow, MediaRow } from "@/components/home";
import { ALL_GENRES, HEADER_HIDE_OFFSET, HERO_COUNT, HOME_SECTIONS } from "@/constants/home";
import { useTmdb } from "@/hooks";
import { refreshTmdb, toMediaItem } from "@/lib/tmdb";
import type { TmdbList, TmdbMedia, TmdbRequest } from "@/types/tmdb";

type HomeScreenOptions = NonNullable<ComponentProps<typeof Stack.Screen>["options"]>;

export default function HomeScreen() {
  const [genre, setGenre] = useState(ALL_GENRES);
  const [version, setVersion] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);

  const searchBarRef = useRef<SearchBarCommands>(null);
  const hiddenRef = useRef(false);

  const openSearch = useCallback(() => {
    searchBarRef.current?.blur();
    searchBarRef.current?.clearText();
    router.navigate("/(tabs)/search");
  }, []);

  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const hidden = event.nativeEvent.contentOffset.y > HEADER_HIDE_OFFSET;
    if (hidden !== hiddenRef.current) {
      hiddenRef.current = hidden;
      setHeaderHidden(hidden);
    }
  }, []);

  const screenOptions = useMemo<HomeScreenOptions>(
    () => ({
      headerShown: !headerHidden,
      headerSearchBarOptions: {
        ref: searchBarRef,
        placeholder: "Search movies and TV shows",
        placement: "stacked",
        hideWhenScrolling: false,
        autoCapitalize: "none",
        onFocus: openSearch,
      },
    }),
    [headerHidden, openSearch]
  );

  const feedPath = genre === ALL_GENRES ? "/trending/movie/day" : "/discover/movie";
  const feedParams = useMemo(
    () =>
      genre === ALL_GENRES
        ? undefined
        : { with_genres: genre, sort_by: "popularity.desc", "vote_count.gte": 100 },
    [genre]
  );

  const feed = useTmdb<TmdbList<TmdbMedia>>(feedPath, feedParams, version);

  const { hero, rest } = useMemo(() => {
    const all = feed.data?.results.map((r) => toMediaItem(r, "movie")) ?? [];
    const heroItems = all.filter((m) => m.backdrop).slice(0, HERO_COUNT);
    const heroIds = new Set(heroItems.map((m) => m.id));
    return { hero: heroItems, rest: all.filter((m) => !heroIds.has(m.id)) };
  }, [feed.data]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const requests: TmdbRequest[] = [
      [feedPath, feedParams],
      ["/genre/movie/list"],
      ...HOME_SECTIONS.map((section): TmdbRequest => [section.path]),
    ];
    await refreshTmdb(requests);
    setVersion((v) => v + 1);
    setRefreshing(false);
  }, [feedPath, feedParams]);

  return (
    <>
      <Stack.Screen options={screenOptions} />

      <ScrollView
        className="flex-1 bg-background"
        contentContainerClassName="gap-6 pb-10 pt-2"
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <GenreChips selected={genre} onSelect={setGenre} />

        {feed.error && !feed.data ? (
          <View className="mx-6 rounded-2xl bg-surface p-4">
            <Text className="text-base font-semibold text-foreground">
              Couldn&apos;t load movies
            </Text>
            <Text className="mt-1 text-sm text-muted">
              Check your connection, then pull down to try again.
            </Text>
          </View>
        ) : (
          <>
            <HeroCarousel items={hero} isLoading={feed.isLoading} />
            <MediaRow
              title="Trending"
              items={rest}
              isLoading={feed.isLoading}
              onSeeAll={() => router.navigate("/(tabs)/movies")}
            />
          </>
        )}

        {HOME_SECTIONS.map((section) => (
          <MediaFeedRow
            key={section.path}
            title={section.title}
            path={section.path}
            type={section.type}
            version={version}
            seeAllHref={section.href}
          />
        ))}
      </ScrollView>
    </>
  );
}
