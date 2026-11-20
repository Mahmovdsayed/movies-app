import { Stack } from "expo-router";

import { detailScreenOptions } from "@/constants/headers";

export default function PersonLayout() {
  return (
    <Stack screenOptions={detailScreenOptions()}>
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
