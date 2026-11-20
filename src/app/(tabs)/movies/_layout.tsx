import { Stack } from "expo-router";

import { browseScreenOptions } from "@/constants/headers";

export default function MoviesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={browseScreenOptions("Movies")} />
    </Stack>
  );
}
