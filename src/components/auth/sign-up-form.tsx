import { useNativeState } from "@expo/ui/swift-ui";
import { useRouter } from "expo-router";
import { useState } from "react";

import {
  FormField,
  FormSecureField,
  FormSubmitButton,
  FormTextField,
  SwiftFormHost,
  SwiftFormStack,
  SwiftLegalNotice,
} from "@/components/ui/swift";
import { useAuthToast } from "@/hooks/use-auth-toast";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/errors";
import { signUpSchema } from "@/validations/auth/sign-up.schema";

export function SignUpForm() {
  const router = useRouter();
  const { success, error } = useAuthToast();
  const name = useNativeState("");
  const email = useNativeState("");
  const password = useNativeState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (isLoading) return;

    const validation = signUpSchema.safeParse({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    if (!validation.success) {
      error("Invalid information", validation.error.issues[0].message);
      return;
    }

    try {
      setIsLoading(true);

      const { error: signUpError } = await authClient.signUp.email({
        name: validation.data.name,
        email: validation.data.email,
        password: validation.data.password,
      });

      if (signUpError) {
        error("Sign-up failed", signUpError.message || "Could not create account.");
        return;
      }

      await authClient.emailOtp
        .sendVerificationOtp({ email: validation.data.email, type: "email-verification" })
        .catch(() => {});

      success("Account created!", "Verification code sent to your email.");

      router.push({
        pathname: "/(auth)/verify-otp",
        params: { email: validation.data.email, type: "email-verification" },
      });
    } catch (err: unknown) {
      error("Sign-up error", getErrorMessage(err, "An unexpected error occurred."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SwiftFormHost height={400}>
      <SwiftFormStack>
        <FormField label="Full Name" icon="person">
          <FormTextField
            placeholder="John Doe"
            text={name}
            textContentType="name"
            autocapitalization="words"
          />
        </FormField>

        <FormField label="Email address" icon="envelope">
          <FormTextField
            placeholder="name@example.com"
            text={email}
            textContentType="emailAddress"
            keyboard="email-address"
          />
        </FormField>

        <FormSecureField
          label="Password"
          placeholder="At least 8 characters"
          text={password}
          textContentType="newPassword"
        />

        <FormSubmitButton
          label="Create Account"
          loadingLabel="Creating account..."
          isLoading={isLoading}
          onPress={handleSignUp}
        />

        <SwiftLegalNotice action="creating an account" />
      </SwiftFormStack>
    </SwiftFormHost>
  );
}
