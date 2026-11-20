import { Stack } from "expo-router";

import { detailScreenOptions } from "@/constants/headers";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={detailScreenOptions("Profile")} />
    </Stack>
  );
}
