import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-5 bg-background">
        <Text className="text-xl font-bold text-foreground">
          This screen does not exist.
        </Text>
        <Link href="/(tabs)/home" className="mt-4 py-4">
          <Text className="text-sm text-sky-500 font-medium">
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}
