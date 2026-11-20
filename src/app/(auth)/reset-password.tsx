import { Link, useLocalSearchParams } from "expo-router";
import { Typography } from "heroui-native";
import { Text } from "react-native";
import { AuthScreen, ResetPasswordForm } from "@/components/auth";

const ResetPassword = () => {
  const params = useLocalSearchParams<{ email?: string; otp?: string }>();

  return (
    <AuthScreen title="Reset Password" contentClassName="gap-6 pt-2">
      <Typography.Paragraph className="text-[13px] font-normal text-zinc-500 dark:text-zinc-400 leading-relaxed">
        Choose a strong new password for your account.
      </Typography.Paragraph>

      <ResetPasswordForm email={params.email || ""} otp={params.otp || ""} />

      <Link href="/(auth)/sign-in" asChild>
        <Text className="text-[13px] text-center text-zinc-500 dark:text-zinc-400 font-medium">
          Back to <Text className="text-blue-500 dark:text-blue-400 font-semibold">Sign in</Text>
        </Text>
      </Link>
    </AuthScreen>
  );
};

export default ResetPassword;
