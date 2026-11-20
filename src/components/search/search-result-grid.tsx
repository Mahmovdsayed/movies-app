import { useWindowDimensions, View } from "react-native";
import { SearchResultCard } from "./search-result-card";
import { SEARCH_GRID_COLUMNS, SEARCH_GRID_GAP, SEARCH_GRID_PADDING } from "@/constants/search";
import type { SearchResultGridProps } from "@/types/search";

export function SearchResultGrid({ items }: SearchResultGridProps) {
  const { width } = useWindowDimensions();
  const cardWidth =
    (width - SEARCH_GRID_PADDING * 2 - SEARCH_GRID_GAP * (SEARCH_GRID_COLUMNS - 1)) /
    SEARCH_GRID_COLUMNS;

  return (
    <View className="flex-row flex-wrap" style={{ gap: SEARCH_GRID_GAP }}>
      {items.map((item) => (
        <SearchResultCard key={`${item.type}-${item.id}`} item={item} width={cardWidth} />
      ))}
    </View>
  );
}
