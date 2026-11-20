import type { SecureFieldProps, TextFieldProps } from "@expo/ui/swift-ui";
import type {
  keyboardType,
  textContentType,
  textInputAutocapitalization,
} from "@expo/ui/swift-ui/modifiers";
import type { SFSymbol } from "sf-symbols-typescript";
import type { ReactNode } from "react";

export type TextFieldState = NonNullable<TextFieldProps["text"]>;
export type SecureFieldState = NonNullable<SecureFieldProps["text"]>;

export type KeyboardType = Parameters<typeof keyboardType>[0];
export type TextContentType = Parameters<typeof textContentType>[0];
export type Autocapitalization = Parameters<typeof textInputAutocapitalization>[0];

export interface SwiftFormHostProps {
  height: number;
  children: ReactNode;
}

export interface SwiftFormStackProps {
  children: ReactNode;
}

export interface FormFieldProps {
  label: string;
  icon: SFSymbol;
  accessory?: ReactNode;
  children: ReactNode;
}

export interface FormTextFieldProps {
  placeholder: string;
  text: TextFieldState;
  textContentType: TextContentType;
  autocapitalization?: Autocapitalization;
  keyboard?: KeyboardType;
}

export interface FormSecureFieldProps {
  label: string;
  placeholder: string;
  text: SecureFieldState;
  textContentType: TextContentType;
}

export interface FormSubmitButtonProps {
  label: string;
  loadingLabel: string;
  isLoading: boolean;
  onPress: () => void;
}

export interface SwiftLegalNoticeProps {
  action: string;
}
