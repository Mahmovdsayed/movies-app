import { useLocalSearchParams } from "expo-router";
import { Typography } from "heroui-native";
import { Text } from "react-native";
import { AuthScreen, VerifyOtpForm } from "@/components/auth";

const VerifyOtp = () => {
  const params = useLocalSearchParams<{ email?: string; type?: string }>();
  const email = params.email || "";
  const otpType = params.type || "email-verification";

  return (
    <AuthScreen title="Verification" contentClassName="gap-6 pt-2">
      <Typography.Paragraph className="text-[13px] font-normal text-zinc-500 dark:text-zinc-400 leading-relaxed">
        Enter the 6-digit verification code sent to{" "}
        <Text className="text-zinc-950 dark:text-white font-semibold">{email || "your email"}</Text>
        .
      </Typography.Paragraph>

      <VerifyOtpForm email={email} otpType={otpType} />
    </AuthScreen>
  );
};

export default VerifyOtp;
