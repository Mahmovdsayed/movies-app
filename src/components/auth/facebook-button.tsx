import { SocialSignInButton } from "./social-sign-in-button";
import type { FacebookButtonProps } from "@/types/auth";

export function FacebookButton(_props: FacebookButtonProps) {
  return (
    <SocialSignInButton
      provider="facebook"
      label="Facebook"
      icon="logo-facebook"
      iconColor="#1877F2"
    />
  );
}
