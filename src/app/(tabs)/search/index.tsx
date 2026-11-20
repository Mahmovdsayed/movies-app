import { Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import type { SearchBarCommands } from "react-native-screens";
import { SearchDiscover, SearchResults, SearchSuggestions } from "@/components/search";
import { SEARCH_DEBOUNCE_MS, hasActiveSearchFilters } from "@/constants/search";
import { useDebouncedValue, useSearchFilters } from "@/hooks";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const searchBarRef = useRef<SearchBarCommands>(null);
  const debouncedQuery = useDebouncedValue(query.trim(), SEARCH_DEBOUNCE_MS);
  const filters = useSearchFilters();

  useEffect(() => {
    searchBarRef.current?.focus();
  }, []);

  return (
    <>
      <Stack.SearchBar
        ref={searchBarRef}
        placeholder="Movies, TV shows, actors..."
        placement="stacked"
        hideWhenScrolling={false}
        autoCapitalize="none"
        onChangeText={(event) => setQuery(event.nativeEvent.text)}
      />

      <View className="flex-1 bg-background">
        {debouncedQuery.length > 0 ? (
          <SearchResults query={debouncedQuery} filters={filters} />
        ) : hasActiveSearchFilters(filters) ? (
          <SearchDiscover filters={filters} />
        ) : (
          <SearchSuggestions />
        )}
      </View>
    </>
  );
}
