import { useSyncExternalStore } from "react";

import { searchFiltersStore } from "@/lib/search-filters-store";

export const useSearchFilters = () =>
  useSyncExternalStore(
    searchFiltersStore.subscribe,
    searchFiltersStore.get,
    searchFiltersStore.get
  );
