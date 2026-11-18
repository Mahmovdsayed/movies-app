import SignInForm from '@/components/Forms/auth/SignInForm';
import FacebookButton from '@/components/ui/auth/FacebookButton';
import GoogleButton from '@/components/ui/auth/GoogleButton';
import { Link, Stack } from 'expo-router';
import { Typography } from 'heroui-native';
import { Text, View, ScrollView } from 'react-native';
import { useUniwind } from 'uniwind';

const SignIn = () => {
  const { theme } = useUniwind();
  const isDark = theme === 'dark';

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Sign In',
          headerLargeTitleEnabled: true,
          headerBackTitle: 'Back',
          headerBackButtonMenuEnabled: true,
        }}
      />

      <ScrollView
        className="flex-1 "
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="gap-6">
          <Typography.Paragraph className="text-[13px] font-normal text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Welcome back! Sign in to continue exploring movies and TV shows.
          </Typography.Paragraph>

          <SignInForm />

          <Link href="/(auth)/forgot-password" asChild>
            <Text className="text-[13px] text-center text-zinc-500 dark:text-zinc-400 font-medium">
              Forgot your password?{' '}
              <Text className="text-blue-500 dark:text-blue-400 font-semibold">Reset it</Text>
            </Text>
          </Link>

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

          <Link href="/(auth)/sign-up" asChild>
            <Text className="text-[13px] text-center text-zinc-500 dark:text-zinc-400 font-medium">
              Don&apos;t have an account?{' '}
              <Text className="text-blue-500 dark:text-blue-400 font-semibold">Sign up</Text>
            </Text>
          </Link>
        </View>
      </ScrollView>
    </>
  );
};

export default SignIn;
