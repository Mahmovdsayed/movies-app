import { Stack } from "expo-router";

export default function SearchLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerBlurEffect: "systemMaterial",
            }}
        >
            <Stack.Screen name="index" options={{ title: "Search" }} />
        </Stack>
    );
}
