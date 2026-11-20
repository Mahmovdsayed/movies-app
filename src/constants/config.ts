export const API_BASE_URL = "http://localhost:3000";

export const BG_AUTH_IMAGE_URL =
  "https://img.magnific.com/free-photo/youth-group-with-pop-inspired-background_23-2151494744.jpg?semt=ais_hybrid&w=740&q=100";

export const TMDB_API_URL = "https://api.themoviedb.org/3";
const tmdbBearerToken = process.env.EXPO_PUBLIC_TMDB_TOKEN;

if (!tmdbBearerToken) {
  throw new Error(
    "Missing EXPO_PUBLIC_TMDB_TOKEN. Run `cp .env.example .env` and set your TMDB v4 read access token."
  );
}

export const TMDB_BEARER_TOKEN = tmdbBearerToken;
