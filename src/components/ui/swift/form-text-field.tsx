import { TextField } from "@expo/ui/swift-ui";
import {
  autocorrectionDisabled,
  frame,
  keyboardType,
  textContentType,
  textFieldStyle,
  textInputAutocapitalization,
} from "@expo/ui/swift-ui/modifiers";
import type { FormTextFieldProps } from "@/types/swift-ui";

export function FormTextField({
  placeholder,
  text,
  textContentType: contentType,
  autocapitalization = "never",
  keyboard,
}: FormTextFieldProps) {
  return (
    <TextField
      placeholder={placeholder}
      text={text}
      modifiers={[
        textFieldStyle("plain"),
        ...(keyboard ? [keyboardType(keyboard)] : []),
        autocorrectionDisabled(),
        textInputAutocapitalization(autocapitalization),
        textContentType(contentType),
        frame({ maxWidth: Infinity }),
      ]}
    />
  );
}
