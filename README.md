# Movies App

A modern iOS React Native movie streaming app built with Expo. Browse and discover movies and TV shows with a clean, native-feeling UI that adapts to light and dark mode.

## Features

- **Authentication** — Sign in with Google, Facebook, or Email via Better Auth
- **Light / Dark Mode** — Fully themed UI including the splash screen
- **Movie & TV Show Browsing** — Dedicated tabs for movies, TV shows, and search
- **Search** — Quickly find content across the library
- **Profile** — View session info and sign out
- **Toast Notifications** — In-app success and error feedback on auth and logout actions
- **Auth Guard** — Protects tab routes; unauthenticated users are redirected to auth screens with zero flash on cold start
- **Animated Splash Screen** — Smooth, theme-aware branded entry screen

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Expo](https://expo.dev) ~58 |
| Navigation | [Expo Router](https://expo.github.io/router) with Native Tabs |
| Language | TypeScript 6 |
| Styling | [Uniwind](https://uniwind.dev) (Tailwind CSS for React Native) |
| UI Components | [HeroUI Native](https://heroui.com) |
| Auth Client | [Better Auth](https://better-auth.com) + [@better-auth/expo](https://better-auth.com) |
| Secure Storage | [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/) |
| Animations | [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) 4 |
| Icons | [@expo/vector-icons](https://docs.expo.dev/guides/icons/) (Ionicons) + SF Symbols / Material Icons via Native Tabs |
| SVG | [React Native SVG](https://github.com/software-mansion/react-native-svg) |
| Gestures | [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) |
| Linting | ESLint + Prettier |

## Backend

This app connects to the **movies-server** backend:  
[https://github.com/Mahmovdsayed/movies-server](https://github.com/Mahmovdsayed/movies-server)

The backend handles:
- Authentication (OAuth + Email via Better Auth)
- Session management with database-backed state storage
- API endpoints for movie and TV show data

## Project Structure

```
src/
├── app/
│   ├── _layout.tsx           # Root layout — auth guard, theme, toast config
│   ├── index.tsx             # Entry point — animated splash, session redirect
│   ├── +not-found.tsx        # 404 screen
│   ├── (auth)/               # Unauthenticated screens
│   │   ├── index.tsx         # Welcome / onboarding screen
│   │   ├── sign-in.tsx       # Email sign-in
│   │   ├── sign-up.tsx       # Registration
│   │   ├── forgot-password.tsx
│   │   ├── reset-password.tsx
│   │   └── verify-otp.tsx
│   ├── (tabs)/               # Authenticated tab screens
│   │   ├── home/             # Home feed
│   │   ├── movies/           # Movie listings
│   │   ├── tv-shows/         # TV show listings
│   │   ├── search/           # Search
│   │   └── profile/          # User profile + sign out
│   ├── info/[type]/[id].tsx  # Movie / TV show detail screen
│   └── settings/             # App settings
├── components/
│   ├── layout/
│   │   └── SplashScreen.tsx  # Animated splash screen (light/dark aware)
│   └── ui/
│       └── auth/
│           ├── GoogleButton.tsx
│           ├── FacebookButton.tsx
│           └── JoinViaEmailButton.tsx
├── constants/
│   └── config.ts             # App-wide config (API URLs, etc.)
└── lib/
    └── auth-client.ts        # Better Auth client setup
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 20+
- [Bun](https://bun.sh) (recommended) or npm / yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator (macOS) or a physical iPhone, or the [Expo Go](https://expo.dev/go) app
- The [movies-server](https://github.com/Mahmovdsayed/movies-server) backend running locally

### Installation

```bash
git clone https://github.com/Mahmovdsayed/movies-app.git
cd movies-app
bun install
```

### Environment Setup

Configure the backend URL in `src/lib/auth-client.ts`:

```ts
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // your movies-server URL
  plugins: [
    expoClient({
      scheme: "movies-app",
      storagePrefix: "movies-app",
      storage: SecureStore,
    }),
  ],
});
```

> Make sure the [movies-server](https://github.com/Mahmovdsayed/movies-server) is running before starting the app.

### Running the App

```bash
bun start       # Start the Expo development server
bun ios         # Run on iOS simulator
```

## Development Scripts

| Script | Description |
|---|---|
| `bun start` | Start the Expo development server |
| `bun ios` | Launch on iOS simulator |
| `bun run lint` | Run ESLint |
| `bun run lint:fix` | Auto-fix lint issues |
| `bun run format` | Format code with Prettier |
| `bun run typecheck` | Run TypeScript type checking |

## Authentication Flow

1. App launches — animated splash screen is shown while session is checked
2. If a valid session exists — user is redirected to `/(tabs)/home`
3. If no session — user is redirected to `/(auth)` (welcome screen)
4. Auth guard in `_layout.tsx` protects all tab routes from unauthenticated access
5. OAuth (Google / Facebook) uses `@better-auth/expo` with `ASWebAuthenticationSession` on iOS
6. Sessions are stored securely using `expo-secure-store`

## Screens

| Screen | Route | Description |
|---|---|---|
| Splash | `/` | Animated entry, theme-aware |
| Welcome | `/(auth)` | Sign-in options |
| Sign In | `/(auth)/sign-in` | Email & password login |
| Sign Up | `/(auth)/sign-up` | Account registration |
| Forgot Password | `/(auth)/forgot-password` | Password reset request |
| Home | `/(tabs)/home` | Main content feed |
| Movies | `/(tabs)/movies` | Movie listings |
| TV Shows | `/(tabs)/tv-shows` | TV show listings |
| Search | `/(tabs)/search` | Content search |
| Profile | `/(tabs)/profile` | User info & sign out |
| Detail | `/info/[type]/[id]` | Movie or TV show detail |
| Settings | `/settings` | App settings |
