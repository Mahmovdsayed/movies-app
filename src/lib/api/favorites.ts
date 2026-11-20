import { apiRequest } from "./client";
import type { LikeMediaInput, LikedMedia, ServerMediaType } from "@/types/favorites";
import type { MediaType } from "@/types/tmdb";

const LIKED_PATH = "/v1/movies/liked";

export const toServerMediaType = (type: MediaType): ServerMediaType =>
  type === "tv" ? "series" : "movie";

export const toAppMediaType = (type: ServerMediaType): MediaType =>
  type === "series" ? "tv" : "movie";

export const fetchLikedMedia = () => apiRequest<LikedMedia[]>(LIKED_PATH);

export const likeMedia = (input: LikeMediaInput) =>
  apiRequest<LikedMedia>(LIKED_PATH, { method: "POST", body: input });

export const unlikeMedia = (likedId: string) =>
  apiRequest<LikedMedia>(`${LIKED_PATH}/${likedId}`, { method: "DELETE" });
