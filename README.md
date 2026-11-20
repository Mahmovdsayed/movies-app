# Movies App

A native-feeling iOS movie & TV browsing app built with Expo. Discover titles from TMDB, read
episode-by-episode details, save favourites to your own account, and jump straight to a player —
all with a UI that adapts to light and dark mode.

## Features

- **Authentication** — Google, Facebook or Email via Better Auth, with OAuth in
  `ASWebAuthenticationSession` and sessions in `expo-secure-store`
- **Auth Guard** — Tab routes are protected; unauthenticated users land on the welcome screen with
  no flash on cold start
- **Home Feed** — Parallax hero carousel plus trending / popular rows, filterable by genre
- **Browse Tabs** — Movies and TV Shows with genre filters and infinite scroll
- **Search** — Debounced multi-search with a native filter sheet (type, genre, rating, year,
  language); browse mode uses TMDB Discover when filters are active but no query is set
- **Detail Screens** — Blurred artwork header with title, genres and actions, then section tabs for
  Episodes (season picker, every episode playable), Similar, Cast and Details
- **Episodes** — Every episode of a season listed with still, runtime and a per-episode Watch action
- **Favourites** — Saved server-side per user; long-press any poster to add or remove
- **People** — Actor pages with biography, social links and Movies / TV Shows carousels
- **Context Menu** — Long-press any card for a native SwiftUI menu: favourite, details, or watch
- **Light / Dark Mode** — Fully themed UI including splash screen and native headers
- **Settings** — Account, version, TMDB attribution and sign out

## Tech Stack

| Layer          | Technology                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------ |
| Framework      | [Expo](https://expo.dev) ~58                                                                                       |
| Navigation     | [Expo Router](https://expo.github.io/router) with Native Tabs                                                      |
| Language       | TypeScript 7                                                                                                       |
| Styling        | [Uniwind](https://uniwind.dev) (Tailwind CSS for React Native)                                                     |
| UI Components  | [HeroUI Native](https://heroui.com) + [@expo/ui](https://docs.expo.dev/versions/latest/sdk/ui/) (SwiftUI)          |
| Data           | [TMDB](https://www.themoviedb.org/documentation/api) REST API                                                      |
| Auth Client    | [Better Auth](https://better-auth.com) + [@better-auth/expo](https://better-auth.com)                              |
| Secure Storage | [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)                                         |
| Images         | [Expo Image](https://docs.expo.dev/versions/latest/sdk/image/) with a shared placeholder                           |
| Blur / Motion  | [Expo Blur](https://docs.expo.dev/versions/latest/sdk/blur-view/), Expo Linear Gradient, Reanimated 4              |
| Icons          | [@expo/vector-icons](https://docs.expo.dev/guides/icons/) (Ionicons) + SF Symbols / Material Icons via Native Tabs |
| Sheets         | [@gorhom/bottom-sheet](https://gorhom.github.io/react-native-bottom-sheet/)                                        |
| Linting        | ESLint + Prettier                                                                                                  |

## Backend

This app connects to the **movies-server** backend:
[https://github.com/Mahmovdsayed/movies-server](https://github.com/Mahmovdsayed/movies-server)

The backend handles authentication, session management, and the per-user favourites list.

| Endpoint                      | Auth | Purpose                                               |
| ----------------------------- | ---- | ----------------------------------------------------- |
| `GET /v1/movies/liked`        | ✓    | The signed-in user's favourites                       |
| `POST /v1/movies/liked`       | ✓    | Save a favourite — `409` if it is already saved       |
| `DELETE /v1/movies/liked/:id` | ✓    | Remove a favourite by its **row id**, not the TMDB id |
| `/api/auth/*`                 | —    | Better Auth handler (OAuth, email, sessions)          |

Two details the client has to respect:

- **`mediaType` is `"movie" | "series"`** on the server, while TMDB and the app use `"movie" | "tv"`.
  The translation lives in `src/lib/api/favorites.ts` and nowhere else.
- **`imageUrl` must be a valid URL**, so a title with no poster cannot be saved.

> **Run `bunx drizzle-kit push` in movies-server before use.** The favourites table gained a nullable
> `year` column; until it exists in the database, saving a favourite will fail. Rows saved before the
> column existed read back `null` and simply omit the year.

## Project Structure

```
src/
├── app/                        # Expo Router routes
│   ├── _layout.tsx             # Root layout — auth guard, theme, toast config
│   ├── index.tsx               # Animated splash, session redirect
│   ├── (auth)/                 # Welcome, sign-in, sign-up, forgot/reset password, verify OTP
│   ├── (tabs)/
│   │   ├── home/               # Hero carousel + trending rows
│   │   ├── movies/             # Movie browse grid
│   │   ├── tv-shows/           # TV browse grid
│   │   ├── search/             # Search, filters and discover
│   │   └── profile/            # Account summary
│   ├── info/[type]/[id].tsx    # Detail screen with section tabs
│   ├── person/[id].tsx         # Actor page
│   ├── favorites/              # Saved titles
│   └── settings/               # Account, about, sign out
├── components/
│   ├── auth/                   # Auth screens' pieces
│   ├── favorites/              # Favourite toggle
│   ├── home/                   # Hero, genre chips, rows, cards
│   ├── info/                   # Backdrop, heading, actions, tabs, episodes, details, cast
│   ├── media/                  # Shared grid, card and context menu
│   ├── person/                 # Profile header and social links
│   ├── search/                 # Results, discover, filter sheet and states
│   ├── skeletons/              # Loading placeholders
│   └── ui/                     # RemoteImage, FactList, MaskedView, SwiftUI form controls
├── constants/                  # Config, headers, theme, and per-screen layout values
├── hooks/                      # useTmdb, pagination, favourites, media menu, filters
├── lib/
│   ├── api/                    # movies-server REST client
│   ├── tmdb/                   # TMDB client, cache and normalisers
│   ├── auth-client.ts          # Better Auth client setup
│   └── favorites-store.ts      # Shared favourites state
├── types/                      # Shared types
└── validations/                # Zod schemas for auth forms
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 20+
- [Bun](https://bun.sh) (recommended) or npm / yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator (macOS), a physical iPhone, or the [Expo Go](https://expo.dev/go) app
- The [movies-server](https://github.com/Mahmovdsayed/movies-server) backend running locally
- A TMDB v4 read access token

### Installation

```bash
git clone https://github.com/Mahmovdsayed/movies-app.git
cd movies-app
bun install
```

### Environment Setup

Create a `.env` file (git-ignored) from the template and add your TMDB token:

```bash
cp .env.example .env
```

```bash
# .env
EXPO_PUBLIC_TMDB_TOKEN=your_tmdb_v4_read_access_token_here
```

Get a token from [themoviedb.org → Settings → API](https://www.themoviedb.org/settings/api).
The app throws at startup if it is missing.

> `EXPO_PUBLIC_*` variables are inlined into the JS bundle at build time, so they stay out of the
> repository but are still readable inside a shipped app binary.

Point the app at your backend in `src/constants/config.ts`:

```ts
export const API_BASE_URL = "http://localhost:3000";
```

Both the Better Auth client and the REST client read this value, so it only needs changing once.

> Make sure the [movies-server](https://github.com/Mahmovdsayed/movies-server) is running, and that
> its schema has been pushed, before starting the app.

### Running the App

```bash
bun start       # Start the Expo development server
bun ios         # Run on iOS simulator
```

## Development Scripts

| Script              | Description                       |
| ------------------- | --------------------------------- |
| `bun start`         | Start the Expo development server |
| `bun ios`           | Launch on iOS simulator           |
| `bun android`       | Launch on Android                 |
| `bun run lint`      | Run ESLint                        |
| `bun run lint:fix`  | Auto-fix lint issues              |
| `bun run format`    | Format code with Prettier         |
| `bun run typecheck` | Run TypeScript type checking      |

## Authentication Flow

1. App launches — animated splash screen is shown while the session is checked
2. If a valid session exists — user is redirected to `/(tabs)/home`
3. If no session — user is redirected to `/(auth)` (welcome screen)
4. Auth guard in `_layout.tsx` protects all tab routes from unauthenticated access
5. OAuth (Google / Facebook) uses `@better-auth/expo` with `ASWebAuthenticationSession` on iOS
6. Sessions are stored securely using `expo-secure-store`

## Screens

| Screen          | Route                     | Description                            |
| --------------- | ------------------------- | -------------------------------------- |
| Splash          | `/`                       | Animated entry, theme-aware            |
| Welcome         | `/(auth)`                 | Sign-in options                        |
| Sign In         | `/(auth)/sign-in`         | Email & password login                 |
| Sign Up         | `/(auth)/sign-up`         | Account registration                   |
| Forgot Password | `/(auth)/forgot-password` | Password reset request                 |
| Reset Password  | `/(auth)/reset-password`  | Set a new password                     |
| Verify OTP      | `/(auth)/verify-otp`      | Email verification                     |
| Home            | `/(tabs)/home`            | Hero carousel and media rows           |
| Movies          | `/(tabs)/movies`          | Movie grid with genre filter           |
| TV Shows        | `/(tabs)/tv-shows`        | TV grid with genre filter              |
| Search          | `/(tabs)/search`          | Search, filters and discover           |
| Profile         | `/(tabs)/profile`         | Account summary                        |
| Detail          | `/info/[type]/[id]`       | Episodes, similar, cast and details    |
| Person          | `/person/[id]`            | Actor biography, links and filmography |
| Favourites      | `/favorites`              | Titles saved to your account           |
| Settings        | `/settings`               | Account, about and sign out            |

## Notes

- **TMDB attribution** — This product uses the TMDB API but is not endorsed or certified by TMDB.
  All artwork and metadata come from TMDB.
- **Playback** — The Watch action opens an external embed for the title rather than streaming
  in-app.
- **Favourites without a poster** — TMDB leaves `poster_path` null for some titles; those cannot be
  saved because the backend validates `imageUrl` as a URL.
