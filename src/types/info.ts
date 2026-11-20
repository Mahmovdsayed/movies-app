import type { SharedValue } from "react-native-reanimated";

import type { FavoriteTarget } from "./favorites";
import type { MediaDetails, MediaEpisode, MediaType, TmdbCastMember } from "./tmdb";

export type InfoSection = "episodes" | "more" | "cast" | "details";

export interface InfoSectionTab {
  value: InfoSection;
  label: string;
}

export interface InfoBackdropProps {
  details: MediaDetails;
  scrollY: SharedValue<number>;
}

export interface InfoHeadingProps {
  details: MediaDetails;
}

export interface InfoOverviewProps {
  overview: string;
}

export interface InfoActionsProps {
  type: MediaType;
  id: number;
  title: string;
  favorite: FavoriteTarget;
}

export interface CastRowProps {
  type: MediaType;
  id: number;
  title?: string;
}

export interface CastCardProps {
  member: TmdbCastMember;
}

export interface InfoSectionTabsProps {
  tabs: readonly InfoSectionTab[];
  selected: InfoSection;
  onSelect: (section: InfoSection) => void;
}

export interface InfoEpisodesProps {
  id: number;
  seasonCount: number;
}

export interface EpisodeRowProps {
  id: number;
  episode: MediaEpisode;
}

export interface InfoDetailsProps {
  details: MediaDetails;
}
