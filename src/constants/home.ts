import type { HomeSection } from "@/types/home";

export const ALL_GENRES = 0;
export const HERO_COUNT = 5;
export const HERO_H_PADDING = 24;
export const HERO_GAP = 12;
export const HEADER_HIDE_OFFSET = 40;
export const MEDIA_CARD_WIDTH = 140;
export const MEDIA_ROW_SKELETON_KEYS = [0, 1, 2, 3];

export const HOME_SECTIONS = [
  { title: "Top rated", path: "/movie/top_rated", type: "movie", href: "/(tabs)/movies" },
  { title: "Coming soon", path: "/movie/upcoming", type: "movie", href: undefined },
  { title: "Popular TV shows", path: "/tv/popular", type: "tv", href: "/(tabs)/tv-shows" },
] as const satisfies readonly HomeSection[];
