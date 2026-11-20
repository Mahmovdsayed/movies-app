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
import { signInSchema } from "@/validations/auth/sign-in.schema";

const isVerificationMessage = (message?: string) =>
  Boolean(
    message &&
    (message.toLowerCase().includes("not verified") ||
      message.toLowerCase().includes("verification"))
  );

export function SignInForm() {
  const router = useRouter();
  const { success, warning, error } = useAuthToast();
  const email = useNativeState("");
  const password = useNativeState("");

  const [isLoading, setIsLoading] = useState(false);

  /** Sends a fresh code and routes to the OTP screen. */
  const goToVerification = async (emailAddress: string) => {
    await authClient.emailOtp
      .sendVerificationOtp({ email: emailAddress, type: "email-verification" })
      .catch(() => {});

    warning("Verification required", "Please verify your email to continue.");

    router.push({
      pathname: "/(auth)/verify-otp",
      params: { email: emailAddress, type: "email-verification" },
    });
  };

  const handleSignIn = async () => {
    if (isLoading) return;

    const validation = signInSchema.safeParse({
      email: email.value,
      password: password.value,
    });

    if (!validation.success) {
      error("Invalid information", validation.error.issues[0].message);
      return;
    }

    const emailAddress = validation.data.email;

    try {
      setIsLoading(true);

      const { data, error: signInError } = await authClient.signIn.email({
        email: validation.data.email,
        password: validation.data.password,
      });

      if (signInError) {
        const needsVerification =
          signInError.code === "EMAIL_NOT_VERIFIED" || isVerificationMessage(signInError.message);

        if (needsVerification) {
          await goToVerification(emailAddress);
          return;
        }

        error("Sign-in failed", signInError.message || "Invalid email or password.");
        return;
      }

      if (data?.user && !data.user.emailVerified) {
        await authClient.signOut().catch(() => {});
        await goToVerification(emailAddress);
        return;
      }

      success("Welcome back!", "You have signed in successfully.");

      await authClient.getSession();
      router.replace("/(tabs)/home");
    } catch (err: unknown) {
      if (isVerificationMessage(err instanceof Error ? err.message : undefined)) {
        await goToVerification(emailAddress);
        return;
      }

      error("Sign-in error", getErrorMessage(err, "An unexpected error occurred."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SwiftFormHost height={330}>
      <SwiftFormStack>
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
          placeholder="Enter your password"
          text={password}
          textContentType="password"
        />

        <FormSubmitButton
          label="Sign In"
          loadingLabel="Signing in..."
          isLoading={isLoading}
          onPress={handleSignIn}
        />

        <SwiftLegalNotice action="signing in" />
      </SwiftFormStack>
    </SwiftFormHost>
  );
}
