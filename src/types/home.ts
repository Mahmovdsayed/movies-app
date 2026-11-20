import type { Href } from "expo-router";
import type { SharedValue } from "react-native-reanimated";

import type { MediaItem, MediaType } from "./tmdb";

export interface GenreChipsProps {
  selected: number;
  onSelect: (id: number) => void;
}

export interface HeroCarouselProps {
  items: MediaItem[];
  isLoading: boolean;
}

export interface HeroSlideProps {
  item: MediaItem;
  width: number;
}

export interface HeroCarouselDotProps {
  index: number;
  interval: number;
  scrollX: SharedValue<number>;
}

export interface MediaCardProps {
  item: MediaItem;
}

export interface MediaRowProps {
  title: string;
  items: MediaItem[];
  isLoading?: boolean;
  onSeeAll?: () => void;
}

export interface MediaFeedRowProps {
  title: string;
  path: string;
  type: MediaType;
  version: number;
  seeAllHref?: Href;
}

export interface HomeSection {
  title: string;
  path: string;
  type: MediaType;
  href?: Href;
}

export type OpenMediaTarget = Pick<MediaItem, "id" | "type">;
