import { Stack } from 'expo-router';

export default function TvShowsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'TV Shows',
          headerBlurEffect: 'systemMaterial',
        }}
      />
    </Stack>
  );
}
