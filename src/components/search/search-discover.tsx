import { useMemo } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SearchResultGrid } from "./search-result-grid";
import { SearchErrorCard } from "./search-states";
import { SEARCH_GRID_PADDING } from "@/constants/search";
import { useTmdb } from "@/hooks";
import { discoverParams, discoverPath, discoverTypes, toMediaItem } from "@/lib/tmdb";
import type { DiscoverSectionProps, SearchDiscoverProps } from "@/types/search";
import type { TmdbList, TmdbMedia } from "@/types/tmdb";

function DiscoverSection({ type, filters, title }: DiscoverSectionProps) {
  const params = useMemo(() => discoverParams(type, filters), [type, filters]);
  const { data, isLoading, error } = useTmdb<TmdbList<TmdbMedia>>(discoverPath(type), params);
  const items = useMemo(
    () => data?.results.map((row) => toMediaItem(row, type)) ?? [],
    [data, type]
  );

  return (
    <View className="gap-4">
      {title ? <Text className="text-xl font-bold text-foreground">{title}</Text> : null}

      {error ? (
        <SearchErrorCard />
      ) : isLoading ? (
        <ActivityIndicator />
      ) : items.length === 0 ? (
        <Text className="text-sm text-muted">Nothing matches these filters.</Text>
      ) : (
        <SearchResultGrid items={items} />
      )}
    </View>
  );
}

export function SearchDiscover({ filters }: SearchDiscoverProps) {
  const types = discoverTypes(filters);
  const showTitles = types.length > 1;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: SEARCH_GRID_PADDING, paddingBottom: 40, gap: 28 }}
    >
      {types.map((type) => (
        <DiscoverSection
          key={type}
          type={type}
          filters={filters}
          title={showTitles ? (type === "tv" ? "TV Shows" : "Movies") : undefined}
        />
      ))}
    </ScrollView>
  );
}
