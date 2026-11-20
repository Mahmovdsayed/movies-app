import { SearchFilterSheet } from "./search-filter-sheet";
import { useSearchFilters } from "@/hooks";
import { searchFiltersStore } from "@/lib/search-filters-store";

export function SearchFilterBar() {
  const filters = useSearchFilters();

  return <SearchFilterSheet filters={filters} onChange={searchFiltersStore.set} />;
}
