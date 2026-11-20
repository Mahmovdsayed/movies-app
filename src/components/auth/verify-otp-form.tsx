import { useRouter } from "expo-router";
import { InputOTP } from "heroui-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { FormSubmitButton, SwiftFormHost } from "@/components/ui/swift";
import { useAuthToast } from "@/hooks/use-auth-toast";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/errors";
import type { VerifyOtpFormProps } from "@/types/auth";

export function VerifyOtpForm({ email, otpType }: VerifyOtpFormProps) {
  const router = useRouter();
  const { success, error } = useAuthToast();

  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleVerify = async (codeToVerify?: string) => {
    const code = codeToVerify || otp;
    if (code.length < 6 || isVerifying) return;

    if (!email) {
      error("Email missing", "Please go back and enter your email again.");
      return;
    }

    try {
      setIsVerifying(true);

      if (otpType === "forget-password") {
        const { error: forgotPasswordError } = await authClient.emailOtp.checkVerificationOtp({
          email,
          otp: code,
          type: "forget-password",
        });

        if (forgotPasswordError) {
          error(
            "Verification failed",
            forgotPasswordError.message || "Invalid or expired OTP code."
          );
          return;
        }

        success("Code verified", "Please set your new password.");

        router.replace({
          pathname: "/(auth)/reset-password",
          params: { email, otp: code },
        });
        return;
      }

      const { error: verifyEmailError } = await authClient.emailOtp.verifyEmail({
        email,
        otp: code,
      });

      if (verifyEmailError) {
        error("Verification failed", verifyEmailError.message || "Invalid or expired OTP code.");
        return;
      }

      success("Email verified", "Your account is ready. Welcome to Movies!");

      await authClient.getSession();
      router.replace("/(tabs)/home");
    } catch (err: unknown) {
      error("Verification error", getErrorMessage(err, "An unexpected error occurred."));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (isResending || !email) return;

    try {
      setIsResending(true);

      const { error: resendError } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: otpType === "forget-password" ? "forget-password" : "email-verification",
      });

      if (resendError) {
        error("Resend failed", resendError.message || "Could not resend verification code.");
        return;
      }

      success("Code sent", "A new verification code was sent to your email.");
    } catch (err: unknown) {
      error("Resend error", getErrorMessage(err, "Could not send verification code."));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <View className="items-center justify-center py-4">
        <InputOTP maxLength={6} value={otp} onChange={setOtp} onComplete={handleVerify}>
          <InputOTP.Group>
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
          </InputOTP.Group>
          <InputOTP.Separator />
          <InputOTP.Group>
            <InputOTP.Slot index={3} />
            <InputOTP.Slot index={4} />
            <InputOTP.Slot index={5} />
          </InputOTP.Group>
        </InputOTP>
      </View>

      <SwiftFormHost height={48}>
        <FormSubmitButton
          label="Verify Code"
          loadingLabel="Verifying..."
          isLoading={isVerifying}
          onPress={() => handleVerify()}
        />
      </SwiftFormHost>

      <View className="flex-row items-center justify-center gap-1.5 pt-2">
        <Text className="text-[13px] text-zinc-500 dark:text-zinc-400">
          Didn&apos;t receive a code?
        </Text>
        <Pressable onPress={handleResend} disabled={isResending}>
          <Text className="text-[13px] text-blue-500 dark:text-blue-400 font-semibold">
            {isResending ? "Sending..." : "Resend Code"}
          </Text>
        </Pressable>
      </View>
    </>
  );
}
