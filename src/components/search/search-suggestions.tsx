import { ScrollView } from "react-native";
import { MediaFeedRow } from "@/components/home";
import { SEARCH_SUGGESTION_ROWS } from "@/constants/search";

export function SearchSuggestions() {
  return (
    <ScrollView
      className="flex-1"
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      contentContainerClassName="gap-6 pb-10 pt-4"
    >
      {SEARCH_SUGGESTION_ROWS.map((row) => (
        <MediaFeedRow
          key={row.path}
          title={row.title}
          path={row.path}
          type={row.type}
          version={0}
        />
      ))}
    </ScrollView>
  );
}
