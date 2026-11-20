import { SocialSignInButton } from "./social-sign-in-button";
import type { GoogleButtonProps } from "@/types/auth";

export function GoogleButton({ isDark }: GoogleButtonProps) {
  return (
    <SocialSignInButton
      provider="google"
      label="Google"
      icon="logo-google"
      iconColor={isDark ? "#FFFFFF" : "#18181B"}
    />
  );
}
