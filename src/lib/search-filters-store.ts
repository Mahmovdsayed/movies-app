import { DEFAULT_SEARCH_FILTERS } from "@/constants/search";
import type { SearchFilters } from "@/types/search";

let filters: SearchFilters = DEFAULT_SEARCH_FILTERS;
const listeners = new Set<() => void>();

export const searchFiltersStore = {
  get: () => filters,
  set: (next: SearchFilters) => {
    filters = next;
    listeners.forEach((listener) => listener());
  },
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
