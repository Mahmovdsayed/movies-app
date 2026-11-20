import type { TmdbParams, TmdbRequest } from "@/types/tmdb";
import { tmdbApi } from "./client";

const TTL = 5 * 60_000;
const cache = new Map<string, { at: number; data: unknown }>();
const inflight = new Map<string, Promise<unknown>>();

export const tmdbCacheKey = (path: string, params?: TmdbParams) =>
  `${path}?${JSON.stringify(params ?? {})}`;

export function peekTmdb<T>(path: string, params?: TmdbParams): T | undefined {
  const hit = cache.get(tmdbCacheKey(path, params));
  return hit && Date.now() - hit.at < TTL ? (hit.data as T) : undefined;
}

export function loadTmdb<T>(path: string, params?: TmdbParams, force = false): Promise<T> {
  const key = tmdbCacheKey(path, params);

  if (!force) {
    const cached = peekTmdb<T>(path, params);
    if (cached) return Promise.resolve(cached);
    const pending = inflight.get(key);
    if (pending) return pending as Promise<T>;
  }

  const request = tmdbApi
    .get<T>(path, params)
    .then((data) => {
      cache.set(key, { at: Date.now(), data });
      return data;
    })
    .finally(() => inflight.delete(key));

  inflight.set(key, request);
  return request;
}

export const refreshTmdb = (requests: TmdbRequest[]) =>
  Promise.allSettled(requests.map(([path, params]) => loadTmdb(path, params, true)));
