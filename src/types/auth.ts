import type { ReactNode } from "react";
import type { IoniconsName } from "./ui";

export interface AuthScreenProps {
  title: string;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
}

export type SocialProvider = "google" | "facebook";

export interface SocialSignInButtonProps {
  provider: SocialProvider;
  label: string;
  icon: IoniconsName;
  iconColor: string;
}

export interface GoogleButtonProps {
  isDark: boolean;
}

export interface FacebookButtonProps {
  isDark: boolean;
}

export interface ResetPasswordFormProps {
  email: string;
  otp: string;
}

export interface VerifyOtpFormProps {
  email: string;
  otpType: string;
}
