
import { Stack } from 'expo-router';

export default function SearchLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerShadowVisible: true,
            }}
        >
            <Stack.Screen name="index" options={{ title: 'Search' }}>
                <Stack.SearchBar
                    placeholder="Movies, TV shows, actors..."
                    placement="inline"
                    hideWhenScrolling={true}
                    autoCapitalize="none"
                    onChangeText={(event) => {
                        console.log(event.nativeEvent.text);
                    }}
                />
            </Stack.Screen>
        </Stack>
    );
}
