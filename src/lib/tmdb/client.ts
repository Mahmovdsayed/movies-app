import { TMDB_API_URL, TMDB_BEARER_TOKEN } from "@/constants/config";
import type { TmdbParams } from "@/types/tmdb";

export const tmdbApi = {
  get: async <T>(url: string, params?: TmdbParams) => {
    const searchParams = new URLSearchParams();

    Object.entries(params ?? {}).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });

    const query = searchParams.toString();
    const endpoint = `${TMDB_API_URL}${url}${query ? `?${query}` : ""}`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  },
};
