import { useNativeState } from "@expo/ui/swift-ui";
import { useRouter } from "expo-router";
import { useState } from "react";

import {
  FormSecureField,
  FormSubmitButton,
  SwiftFormHost,
  SwiftFormStack,
} from "@/components/ui/swift";
import { useAuthToast } from "@/hooks/use-auth-toast";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/errors";
import type { ResetPasswordFormProps } from "@/types/auth";
import { resetPasswordSchema } from "@/validations/auth/reset-password.schema";

export function ResetPasswordForm({ email, otp }: ResetPasswordFormProps) {
  const router = useRouter();
  const { success, error } = useAuthToast();
  const password = useNativeState("");
  const confirmPassword = useNativeState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (isLoading) return;

    if (!email || !otp) {
      error("Session expired", "Please request a new reset code.");
      router.replace("/(auth)/forgot-password");
      return;
    }

    const validation = resetPasswordSchema.safeParse({
      password: password.value,
      confirmPassword: confirmPassword.value,
    });

    if (!validation.success) {
      error("Invalid password", validation.error.issues[0].message);
      return;
    }

    try {
      setIsLoading(true);

      const { error: resetError } = await authClient.emailOtp.resetPassword({
        email,
        otp,
        password: validation.data.password,
      });

      if (resetError) {
        error("Reset failed", resetError.message || "Could not reset password.");
        return;
      }

      success("Password updated", "Your password has been reset. Please sign in.");

      router.replace("/(auth)/sign-in");
    } catch (err: unknown) {
      error("Reset error", getErrorMessage(err, "An unexpected error occurred."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SwiftFormHost height={280}>
      <SwiftFormStack>
        <FormSecureField
          label="New Password"
          placeholder="At least 8 characters"
          text={password}
          textContentType="newPassword"
        />

        <FormSecureField
          label="Confirm New Password"
          placeholder="Repeat password"
          text={confirmPassword}
          textContentType="newPassword"
        />

        <FormSubmitButton
          label="Reset Password"
          loadingLabel="Resetting..."
          isLoading={isLoading}
          onPress={handleResetPassword}
        />
      </SwiftFormStack>
    </SwiftFormHost>
  );
}
