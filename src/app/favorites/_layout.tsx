import { Stack } from "expo-router";

import { browseScreenOptions } from "@/constants/headers";

export default function FavoritesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={browseScreenOptions("Favourites")} />
    </Stack>
  );
}
