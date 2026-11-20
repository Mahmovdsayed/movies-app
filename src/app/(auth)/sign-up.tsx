import { Link } from "expo-router";
import { Typography } from "heroui-native";
import { Text, View } from "react-native";
import { AuthScreen, FacebookButton, GoogleButton, SignUpForm } from "@/components/auth";
import { OrDivider } from "@/components/ui";
import { useIsDark } from "@/hooks";

const SignUp = () => {
  const isDark = useIsDark();

  return (
    <AuthScreen title="Sign Up" contentClassName="gap-6 pt-2">
      <Typography.Paragraph className="text-[13px] font-normal text-zinc-500 dark:text-zinc-400 leading-relaxed">
        Create an account to track your favorite movies, watch trailers, and get personalized cinema
        recommendations.
      </Typography.Paragraph>

      <SignUpForm />

      <OrDivider />

      <View className="flex-col w-full gap-3">
        <GoogleButton isDark={isDark} />
        <FacebookButton isDark={isDark} />
      </View>

      <Link href="/(auth)/sign-in" asChild>
        <Text className="text-[13px] text-center text-zinc-500 dark:text-zinc-400 font-medium">
          Already have an account?{" "}
          <Text className="text-blue-500 dark:text-blue-400 font-semibold">Sign in</Text>
        </Text>
      </Link>
    </AuthScreen>
  );
};

export default SignUp;
