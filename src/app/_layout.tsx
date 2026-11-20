import { HeroUINativeProvider } from "heroui-native";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import type { JSX } from "react";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useIsDark } from "@/hooks";
import { authClient } from "@/lib/auth-client";
import "../global.css";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout(): JSX.Element {
  const isDark = useIsDark();
  const segments = useSegments();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const isAuthed = Boolean(session && session.user?.emailVerified);

  useEffect(() => {
    if (isPending) return;

    const firstSegment = (segments as string[])[0];
    if (!firstSegment) return;
    const inAuthGroup = firstSegment === "(auth)";

    if (session?.user && !session.user.emailVerified) {
      const secondSegment = (segments as string[])[1];
      if (secondSegment !== "verify-otp") {
        router.replace({
          pathname: "/(auth)/verify-otp",
          params: { email: session.user.email, type: "email-verification" },
        });
      }
      return;
    }

    if (!isAuthed && !inAuthGroup) {
      router.replace("/(auth)");
    } else if (isAuthed && inAuthGroup) {
      router.replace("/(tabs)/home");
    }
  }, [isAuthed, isPending, session, segments, router]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <HeroUINativeProvider
          config={{
            toast: {
              defaultProps: {
                placement: "top",
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
