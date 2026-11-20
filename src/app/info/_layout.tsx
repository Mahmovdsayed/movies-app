import { Stack } from "expo-router";

export default function InfoLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerShadowVisible: false,
        headerTintColor: "#FFFFFF",
        title: "",
      }}
    >
      <Stack.Screen name="[type]/[id]" />
    </Stack>
  );
}
