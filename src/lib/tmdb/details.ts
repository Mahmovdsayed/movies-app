import type {
  MediaDetails,
  MediaEpisode,
  MediaFact,
  MediaType,
  TmdbEpisode,
  TmdbMediaDetails,
  TmdbMovieDetails,
  TmdbSeason,
  TmdbTvDetails,
} from "@/types/tmdb";

export const detailsPath = (type: MediaType, id: number) =>
  type === "tv" ? `/tv/${id}` : `/movie/${id}`;

export const creditsPath = (type: MediaType, id: number) => `${detailsPath(type, id)}/credits`;

export const recommendationsPath = (type: MediaType, id: number) =>
  `${detailsPath(type, id)}/recommendations`;

export const seasonPath = (id: number, season: number) => `/tv/${id}/season/${season}`;

const EMBED_BASE = "https://vaplayer.ru";

export const watchUrl = (type: MediaType, id: number, season?: number, episode?: number) => {
  if (type === "movie") {
    return `${EMBED_BASE}/embed/movie/${id}`;
  }
  return `${EMBED_BASE}/embed/tv/${id}/${season ?? 1}/${episode ?? 1}`;
};

const money = (value?: number) =>
  value ? `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}` : undefined;

const list = (values?: string[]) => (values?.length ? values.join(", ") : undefined);

function factsFor(type: MediaType, raw: TmdbMediaDetails, year: string | undefined): MediaFact[] {
  const movie = raw as TmdbMovieDetails;
  const tv = raw as TmdbTvDetails;
  const isTv = type === "tv";

  const candidates: (MediaFact | undefined)[] = [
    { label: "Status", value: raw.status ?? "" },
    {
      label: isTv ? "First aired" : "Released",
      value: isTv ? (tv.first_air_date ?? "") : (movie.release_date ?? ""),
    },
    isTv ? { label: "Last aired", value: tv.last_air_date ?? "" } : undefined,
    year ? { label: "Year", value: year } : undefined,
    isTv && tv.number_of_seasons
      ? { label: "Seasons", value: String(tv.number_of_seasons) }
      : undefined,
    isTv && tv.number_of_episodes
      ? { label: "Episodes", value: String(tv.number_of_episodes) }
      : undefined,
    isTv && tv.episode_run_time?.[0]
      ? { label: "Episode length", value: `${tv.episode_run_time[0]} min` }
      : undefined,
    !isTv && movie.runtime ? { label: "Runtime", value: `${movie.runtime} min` } : undefined,
    { label: "Rating", value: `${(raw.vote_average ?? 0).toFixed(1)} / 10` },
    raw.vote_count ? { label: "Votes", value: raw.vote_count.toLocaleString("en-US") } : undefined,
    !isTv && money(movie.budget) ? { label: "Budget", value: money(movie.budget)! } : undefined,
    !isTv && money(movie.revenue) ? { label: "Revenue", value: money(movie.revenue)! } : undefined,
    isTv && list(tv.networks?.map((network) => network.name))
      ? { label: "Network", value: list(tv.networks?.map((network) => network.name))! }
      : undefined,
    isTv && list(tv.created_by?.map((creator) => creator.name))
      ? { label: "Created by", value: list(tv.created_by?.map((creator) => creator.name))! }
      : undefined,
    list(raw.spoken_languages?.map((language) => language.english_name ?? language.name))
      ? {
          label: "Languages",
          value: list(raw.spoken_languages?.map((l) => l.english_name ?? l.name))!,
        }
      : undefined,
    list(raw.production_countries?.map((country) => country.name))
      ? { label: "Countries", value: list(raw.production_countries?.map((c) => c.name))! }
      : undefined,
  ];

  return candidates
    .filter((fact): fact is MediaFact => Boolean(fact && fact.value && fact.value !== "N/A"))
    .map((fact) => ({ ...fact, value: fact.value.trim() }));
}

export const toMediaDetails = (raw: TmdbMediaDetails, type: MediaType): MediaDetails => {
  const movie = raw as TmdbMovieDetails;
  const tv = raw as TmdbTvDetails;
  const isTv = type === "tv";
  const date = isTv ? tv.first_air_date : movie.release_date;
  const year = date?.slice(0, 4) || undefined;

  return {
    id: raw.id,
    type,
    title: (isTv ? tv.name : movie.title) ?? "Untitled",
    overview: raw.overview ?? "",
    tagline: raw.tagline || undefined,
    year,
    rating: raw.vote_average ?? 0,
    voteCount: raw.vote_count ?? 0,
    runtime: isTv ? tv.episode_run_time?.[0] : movie.runtime,
    seasons: isTv ? tv.number_of_seasons : undefined,
    backdrop: raw.backdrop_path,
    poster: raw.poster_path,
    genres: raw.genres ?? [],
    facts: factsFor(type, raw, year),
    episodeCount: isTv ? tv.number_of_episodes : undefined,
    numberOfSeasons: isTv ? tv.number_of_seasons : undefined,
  };
};

export const toMediaEpisode = (raw: TmdbEpisode): MediaEpisode => ({
  id: raw.id,
  season: raw.season_number,
  number: raw.episode_number,
  title: raw.name || `Episode ${raw.episode_number}`,
  overview: raw.overview || undefined,
  still: raw.still_path,
  airDate: raw.air_date || undefined,
  runtime: raw.runtime || undefined,
  rating: raw.vote_average || undefined,
});

export const toMediaEpisodes = (season: TmdbSeason | undefined): MediaEpisode[] =>
  (season?.episodes ?? []).map(toMediaEpisode);
