import { Link } from "expo-router";
import { Typography } from "heroui-native";
import { Text, View } from "react-native";
import { AuthScreen, FacebookButton, GoogleButton, SignInForm } from "@/components/auth";
import { OrDivider } from "@/components/ui";
import { useIsDark } from "@/hooks";

const SignIn = () => {
  const isDark = useIsDark();

  return (
    <AuthScreen title="Sign In" className="flex-1" contentClassName="gap-6">
      <Typography.Paragraph className="text-[13px] font-normal text-zinc-500 dark:text-zinc-400 leading-relaxed">
        Welcome back! Sign in to continue exploring movies and TV shows.
      </Typography.Paragraph>

      <SignInForm />

      <Link href="/(auth)/forgot-password" asChild>
        <Text className="text-[13px] text-center text-zinc-500 dark:text-zinc-400 font-medium">
          Forgot your password?{" "}
          <Text className="text-blue-500 dark:text-blue-400 font-semibold">Reset it</Text>
        </Text>
      </Link>

      <OrDivider />

      <View className="flex-col w-full gap-3">
        <GoogleButton isDark={isDark} />
        <FacebookButton isDark={isDark} />
      </View>

      <Link href="/(auth)/sign-up" asChild>
        <Text className="text-[13px] text-center text-zinc-500 dark:text-zinc-400 font-medium">
          Don&apos;t have an account?{" "}
          <Text className="text-blue-500 dark:text-blue-400 font-semibold">Sign up</Text>
        </Text>
      </Link>
    </AuthScreen>
  );
};

export default SignIn;
