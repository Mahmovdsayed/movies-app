import { router, Stack } from "expo-router";
import { HomeHeaderLeft } from "@/components/home/home-header-left";
import { TINT_COLOR } from "@/constants/theme";

export default function HomeLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: true,
                    title: "",
                    headerBlurEffect: "systemMaterial",
                    headerLeft: () => <HomeHeaderLeft />,
                }}
            >
                <Stack.Toolbar placement="right">
                    <Stack.Toolbar.Button
                        icon="heart.fill"
                        accessibilityLabel="Settings"
                        tintColor={TINT_COLOR}
                        onPress={() => router.push("/settings")}
                    />
                </Stack.Toolbar>
            </Stack.Screen>
        </Stack>
    );
}
