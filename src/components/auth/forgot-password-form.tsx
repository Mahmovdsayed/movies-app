import { useNativeState } from "@expo/ui/swift-ui";
import { useRouter } from "expo-router";
import { useState } from "react";

import {
  FormField,
  FormSubmitButton,
  FormTextField,
  SwiftFormHost,
  SwiftFormStack,
} from "@/components/ui/swift";
import { useAuthToast } from "@/hooks/use-auth-toast";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/errors";
import { forgotPasswordSchema } from "@/validations/auth/forgot-password.schema";

export function ForgotPasswordForm() {
  const router = useRouter();
  const { success, error } = useAuthToast();
  const email = useNativeState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    if (isLoading) return;

    const validation = forgotPasswordSchema.safeParse({ email: email.value });

    if (!validation.success) {
      error("Invalid email", validation.error.issues[0].message);
      return;
    }

    try {
      setIsLoading(true);

      const { error: requestError } = await authClient.emailOtp.sendVerificationOtp({
        email: validation.data.email,
        type: "forget-password",
      });

      if (requestError) {
        error("Request failed", requestError.message || "Could not send reset code.");
        return;
      }

      success("Reset code sent", "Please check your email for the verification code.");

      router.push({
        pathname: "/(auth)/verify-otp",
        params: { email: validation.data.email, type: "forget-password" },
      });
    } catch (err: unknown) {
      error("Request error", getErrorMessage(err, "An unexpected error occurred."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SwiftFormHost height={180}>
      <SwiftFormStack>
        <FormField label="Email address" icon="envelope">
          <FormTextField
            placeholder="name@example.com"
            text={email}
            textContentType="emailAddress"
            keyboard="email-address"
          />
        </FormField>

        <FormSubmitButton
          label="Send Reset Code"
          loadingLabel="Sending code..."
          isLoading={isLoading}
          onPress={handleSendCode}
        />
      </SwiftFormStack>
    </SwiftFormHost>
  );
}
