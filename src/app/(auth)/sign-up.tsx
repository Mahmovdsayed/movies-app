import SignUpForm from '@/components/Forms/auth/SignUpForm';
import FacebookButton from '@/components/ui/auth/FacebookButton';
import GoogleButton from '@/components/ui/auth/GoogleButton';
import { Link, Stack } from 'expo-router';
import { Typography } from 'heroui-native';
import { Text, View, ScrollView } from 'react-native';
import { useUniwind } from 'uniwind';

const SignUp = () => {
  const { theme } = useUniwind();
  const isDark = theme === 'dark';

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Sign Up',
          headerLargeTitleEnabled: true,
          headerBackTitle: 'Back',
          headerBackButtonMenuEnabled: true,
        }}
      />

      <ScrollView
        className="flex-1 bg-white dark:bg-black"
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="gap-6">
          <Typography.Paragraph className="text-[13px] font-normal text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Create an account to track your favorite movies, watch trailers, and get personalized cinema recommendations.
          </Typography.Paragraph>

          <SignUpForm />

          <View className="flex-row items-center w-full">
            <View className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
            <Text className="mx-3 text-xs text-zinc-400 dark:text-zinc-500 font-medium">
              or continue with
            </Text>
            <View className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          </View>

          <View className="flex-col w-full gap-3">
            <GoogleButton isDark={isDark} />
            <FacebookButton isDark={isDark} />
          </View>

          <Link href="/(auth)/sign-in" asChild>
            <Text className="text-[13px] text-center text-zinc-500 dark:text-zinc-400 font-medium">
              Already have an account?{' '}
              <Text className="text-blue-500 dark:text-blue-400 font-semibold">Sign in</Text>
            </Text>
          </Link>
        </View>
      </ScrollView>
    </>
  );
};

export default SignUp;
