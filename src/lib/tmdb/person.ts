import { toMediaItem } from "./media";
import type {
  MediaItem,
  MediaType,
  PersonLink,
  PersonProfile,
  TmdbCredit,
  TmdbExternalIds,
  TmdbPerson,
} from "@/types/tmdb";

export const personPath = (id: number) => `/person/${id}`;
export const personCreditsPath = (id: number) => `/person/${id}/combined_credits`;
export const toPersonProfile = (raw: TmdbPerson): PersonProfile => ({
  id: raw.id,
  name: raw.name,
  biography: raw.biography || undefined,
  photo: raw.profile_path,
  birthday: raw.birthday || undefined,
  deathday: raw.deathday || undefined,
  placeOfBirth: raw.place_of_birth || undefined,
  department: raw.known_for_department || undefined,
});

export const toPersonCredits = (credits: TmdbCredit[] | undefined): MediaItem[] => {
  const seen = new Set<string>();
  const items: MediaItem[] = [];

  for (const credit of credits ?? []) {
    const type = credit.media_type;
    if (type !== "movie" && type !== "tv") continue;

    const key = `${type}-${credit.id}`;
    if (seen.has(key)) continue;
    seen.add(key);

    items.push(toMediaItem(credit, type as MediaType));
  }

  return items.sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0));
};

export const personExternalIdsPath = (id: number) => `/person/${id}/external_ids`;

export const toPersonLinks = (raw: TmdbExternalIds | undefined): PersonLink[] => {
  if (!raw) return [];

  const candidates: (PersonLink | undefined)[] = [
    raw.instagram_id
      ? { key: "instagram", label: "Instagram", url: `https://instagram.com/${raw.instagram_id}` }
      : undefined,
    raw.facebook_id
      ? { key: "facebook", label: "Facebook", url: `https://facebook.com/${raw.facebook_id}` }
      : undefined,
    raw.twitter_id ? { key: "x", label: "X", url: `https://x.com/${raw.twitter_id}` } : undefined,
    raw.tiktok_id
      ? { key: "tiktok", label: "TikTok", url: `https://tiktok.com/@${raw.tiktok_id}` }
      : undefined,
    raw.youtube_id
      ? { key: "youtube", label: "YouTube", url: `https://youtube.com/@${raw.youtube_id}` }
      : undefined,
    raw.imdb_id
      ? { key: "imdb", label: "IMDb", url: `https://www.imdb.com/name/${raw.imdb_id}` }
      : undefined,
  ];

  return candidates.filter((link): link is PersonLink => Boolean(link));
};
