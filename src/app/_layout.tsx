import type { JSX } from "react";
import { useEffect } from "react";
import {
  Stack,
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useRouter,
  useSegments,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useUniwind } from "uniwind";
import { authClient } from "@/lib/auth-client";
import "../global.css";

SplashScreen.preventAutoHideAsync().catch(() => { });

export default function RootLayout(): JSX.Element {
  const { theme } = useUniwind();
  const isDark = theme === "dark";
  const segments = useSegments();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const isAuthed = Boolean(session);

  useEffect(() => {
    if (isPending) return;

    const firstSegment = (segments as string[])[0];
    if (!firstSegment) return;
    const inAuthGroup = firstSegment === "(auth)";

    if (!isAuthed && !inAuthGroup) {
      router.replace("/(auth)");
    } else if (isAuthed && inAuthGroup) {
      router.replace("/(tabs)/home");
    }
  }, [isAuthed, isPending, segments, router]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <HeroUINativeProvider
          config={{
            toast: {
              defaultProps: {
                placement: "bottom",
              },
            },
          }}
        >
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "fade",
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
          </Stack>

          <StatusBar style={isDark ? "light" : "dark"} />
        </HeroUINativeProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
