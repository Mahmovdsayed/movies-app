import type { InfoSection, InfoSectionTab } from "@/types/info";

export const INFO_BACKDROP_HEIGHT = 420;
export const INFO_BACKDROP_PARALLAX = 0.05;
export const INFO_BACKDROP_BASE_SCALE = 1.12;
export const INFO_BACKDROP_STRETCH_SCALE = 1.9;
export const INFO_BACKDROP_FADE_HEIGHT = 156;
export const INFO_BACKDROP_TEXT_BOTTOM = 56;
export const INFO_MAX_GENRE_CHIPS = 3;
export const INFO_TABS_HEIGHT = 44;

export const INFO_SECTION_TABS: Record<InfoSection, InfoSectionTab> = {
  episodes: { value: "episodes", label: "Episodes" },
  more: { value: "more", label: "Similar" },
  cast: { value: "cast", label: "Cast" },
  details: { value: "details", label: "Details" },
};

export const infoTabsFor = (hasEpisodes: boolean): InfoSectionTab[] =>
  hasEpisodes
    ? [
        INFO_SECTION_TABS.episodes,
        INFO_SECTION_TABS.more,
        INFO_SECTION_TABS.cast,
        INFO_SECTION_TABS.details,
      ]
    : [INFO_SECTION_TABS.more, INFO_SECTION_TABS.cast, INFO_SECTION_TABS.details];
export const INFO_CAST_LIMIT = 12;
export const INFO_CAST_CARD_WIDTH = 84;
export const INFO_CAST_AVATAR_SIZE = 72;
export const INFO_EPISODE_STILL_WIDTH = 128;
export const INFO_EPISODE_STILL_ASPECT = 16 / 9;
