import { useCallback, useEffect, useRef, useState } from "react";

import { BROWSE_MAX_PAGES } from "@/constants/browse";
import { loadTmdb, tmdbCacheKey } from "@/lib/tmdb";
import type { TmdbList, TmdbParams } from "@/types/tmdb";

interface PageState<T> {
  key: string;
  items: T[];
  page: number;
  totalPages: number;
  error?: Error;
}

const EMPTY = { key: "", items: [], page: 0, totalPages: 1 };

export interface PaginatedTmdb<T> {
  items: T[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error?: Error;
  hasMore: boolean;
  loadMore: () => void;
}

export function usePaginatedTmdb<T>(path: string, params?: TmdbParams): PaginatedTmdb<T> {
  const key = tmdbCacheKey(path, params);

  const [state, setState] = useState<PageState<T>>(EMPTY);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const stateRef = useRef(state);
  stateRef.current = state;
  const loadingRef = useRef(false);

  useEffect(() => {
    let active = true;
    loadingRef.current = false;
    setIsLoadingMore(false);
    setState({ ...EMPTY, key });

    loadTmdb<TmdbList<T>>(path, { ...params, page: 1 })
      .then((data) => {
        if (!active) return;
        setState({
          key,
          items: data.results,
          page: 1,
          totalPages: Math.min(data.total_pages, BROWSE_MAX_PAGES),
        });
      })
      .catch((error: Error) => {
        if (!active) return;
        setState({ ...EMPTY, key, error });
      });

    return () => {
      active = false;
    };
    // `key` encodes path + params, so this only re-runs for a different request
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const loadMore = useCallback(() => {
    const snapshot = stateRef.current;
    if (loadingRef.current || snapshot.key !== key) return;
    if (snapshot.page === 0 || snapshot.page >= snapshot.totalPages) return;

    const nextPage = snapshot.page + 1;
    loadingRef.current = true;
    setIsLoadingMore(true);

    loadTmdb<TmdbList<T>>(path, { ...params, page: nextPage })
      .then((data) => {
        setState((prev) =>
          prev.key === key
            ? {
                ...prev,
                items: [...prev.items, ...data.results],
                page: nextPage,
                totalPages: Math.min(data.total_pages, BROWSE_MAX_PAGES),
              }
            : prev
        );
      })
      .catch(() => {})
      .finally(() => {
        loadingRef.current = false;
        setIsLoadingMore(false);
      });
  }, [key, path, params]);

  const current = state.key === key ? state : undefined;

  return {
    items: current?.items ?? [],
    isLoading: !current,
    isLoadingMore,
    error: current?.error,
    hasMore: Boolean(current && current.page > 0 && current.page < current.totalPages),
    loadMore,
  };
}
