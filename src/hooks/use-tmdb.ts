import { useEffect, useRef, useState } from "react";

import { loadTmdb, peekTmdb, tmdbCacheKey } from "@/lib/tmdb";
import type { TmdbParams } from "@/types/tmdb";

export function useTmdb<T>(path: string, params?: TmdbParams, version = 0) {
  const key = `${tmdbCacheKey(path, params)}#${version}`;
  const latest = useRef({ path, params });
  latest.current = { path, params };

  const [state, setState] = useState<{ key: string; data?: T; error?: Error }>({
    key: "",
  });

  useEffect(() => {
    let active = true;
    loadTmdb<T>(latest.current.path, latest.current.params)
      .then((data) => active && setState({ key, data }))
      .catch((error: Error) => active && setState({ key, error }));
    return () => {
      active = false;
    };
  }, [key]);

  const current = state.key === key ? state : undefined;
  const data = current?.data ?? peekTmdb<T>(path, params);

  return {
    data,
    error: current?.error,
    isLoading: !data && !current?.error,
  };
}
