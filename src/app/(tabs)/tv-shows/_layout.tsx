import { Stack } from "expo-router";

import { browseScreenOptions } from "@/constants/headers";

export default function TvShowsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={browseScreenOptions("TV Shows")} />
    </Stack>
  );
}
