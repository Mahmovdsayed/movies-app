export type TmdbParams = Record<string, string | number>;
export type TmdbRequest = [path: string, params?: TmdbParams];

export type MediaType = "movie" | "tv";

export interface TmdbList<T> {
  page: number;
  results: T[];
  total_pages: number;
}

export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbMedia {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  original_language?: string;
  genre_ids?: number[];
  release_date?: string;
  first_air_date?: string;
}

export interface TmdbMultiMedia extends TmdbMedia {
  media_type?: "movie" | "tv" | "person";
}

export interface MediaItem {
  id: number;
  type: MediaType;
  title: string;
  year?: string;
  rating: number;
  poster: string | null;
  backdrop: string | null;
  posterUrl?: string;
}

export interface TmdbMovieDetails {
  id: number;
  title: string;
  status?: string;
  budget?: number;
  revenue?: number;
  spoken_languages?: TmdbSpokenLanguage[];
  production_countries?: TmdbCountry[];
  overview: string;
  tagline?: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  runtime?: number;
  genres?: TmdbGenre[];
}

export interface TmdbTvDetails {
  id: number;
  name: string;
  status?: string;
  last_air_date?: string;
  number_of_episodes?: number;
  spoken_languages?: TmdbSpokenLanguage[];
  production_countries?: TmdbCountry[];
  networks?: TmdbNetwork[];
  created_by?: TmdbCreator[];
  overview: string;
  tagline?: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  first_air_date?: string;
  episode_run_time?: number[];
  number_of_seasons?: number;
  genres?: TmdbGenre[];
}

export type TmdbMediaDetails = TmdbMovieDetails | TmdbTvDetails;

export interface TmdbCastMember {
  id: number;
  name: string;
  character?: string;
  profile_path: string | null;
}

export interface TmdbCredits {
  cast: TmdbCastMember[];
}

export interface MediaDetails {
  id: number;
  type: MediaType;
  title: string;
  overview: string;
  tagline?: string;
  year?: string;
  rating: number;
  voteCount: number;
  runtime?: number;
  seasons?: number;
  backdrop: string | null;
  poster: string | null;
  genres: TmdbGenre[];
  facts: MediaFact[];
  episodeCount?: number;
  numberOfSeasons?: number;
}

export interface TmdbSpokenLanguage {
  english_name?: string;
  name: string;
}

export interface TmdbCountry {
  iso_3166_1: string;
  name: string;
}

export interface TmdbNetwork {
  id: number;
  name: string;
}

export interface TmdbCreator {
  id: number;
  name: string;
}

export interface TmdbEpisode {
  id: number;
  episode_number: number;
  season_number: number;
  name: string;
  overview?: string;
  still_path: string | null;
  air_date?: string;
  runtime?: number;
  vote_average?: number;
}

export interface TmdbSeason {
  id: number;
  season_number: number;
  name: string;
  episodes: TmdbEpisode[];
}

export interface MediaEpisode {
  id: number;
  season: number;
  number: number;
  title: string;
  overview?: string;
  still: string | null;
  airDate?: string;
  runtime?: number;
  rating?: number;
}

export interface MediaFact {
  label: string;
  value: string;
}

export interface TmdbPerson {
  id: number;
  name: string;
  biography?: string;
  profile_path: string | null;
  birthday?: string;
  deathday?: string | null;
  place_of_birth?: string;
  known_for_department?: string;
}

export interface TmdbCredit extends TmdbMedia {
  media_type?: MediaType | "person";
  character?: string;
  episode_count?: number;
}

export interface TmdbPersonCredits {
  cast: TmdbCredit[];
}

export interface PersonProfile {
  id: number;
  name: string;
  biography?: string;
  photo: string | null;
  birthday?: string;
  deathday?: string;
  placeOfBirth?: string;
  department?: string;
}

export interface TmdbExternalIds {
  imdb_id?: string | null;
  facebook_id?: string | null;
  instagram_id?: string | null;
  twitter_id?: string | null;
  tiktok_id?: string | null;
  youtube_id?: string | null;
}

export type PersonLinkKey = "instagram" | "facebook" | "x" | "tiktok" | "youtube" | "imdb";

export interface PersonLink {
  key: PersonLinkKey;
  label: string;
  url: string;
}
