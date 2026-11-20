import { Stack } from "expo-router";

import { detailScreenOptions } from "@/constants/headers";

export default function SettingsLayout() {
  return (
    <Stack screenOptions={detailScreenOptions("Settings")}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
