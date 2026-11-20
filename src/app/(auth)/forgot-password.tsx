import { Link } from "expo-router";
import { Typography } from "heroui-native";
import { Text } from "react-native";
import { AuthScreen, ForgotPasswordForm } from "@/components/auth";

const ForgotPassword = () => (
  <AuthScreen title="Forgot Password" contentClassName="gap-6 pt-2">
    <Typography.Paragraph className="text-[13px] font-normal text-zinc-500 dark:text-zinc-400 leading-relaxed">
      Enter the email address registered with your account and we&apos;ll send you a 6-digit code to
      reset your password.
    </Typography.Paragraph>

    <ForgotPasswordForm />

    <Link href="/(auth)/sign-in" asChild>
      <Text className="text-[13px] text-center text-zinc-500 dark:text-zinc-400 font-medium">
        Remember your password?{" "}
        <Text className="text-blue-500 dark:text-blue-400 font-semibold">Sign in</Text>
      </Text>
    </Link>
  </AuthScreen>
);

export default ForgotPassword;
