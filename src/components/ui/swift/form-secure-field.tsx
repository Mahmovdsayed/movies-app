import { Button, Image, SecureField, TextField } from "@expo/ui/swift-ui";
import {
  autocorrectionDisabled,
  buttonStyle,
  frame,
  textContentType,
  textFieldStyle,
  textInputAutocapitalization,
} from "@expo/ui/swift-ui/modifiers";
import { useState } from "react";

import { FormField } from "./form-field";
import type { FormSecureFieldProps } from "@/types/swift-ui";

/** Password input with a built-in show/hide toggle. */
export function FormSecureField({
  label,
  placeholder,
  text,
  textContentType: contentType,
}: FormSecureFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  const modifiers = [
    textFieldStyle("plain"),
    autocorrectionDisabled(),
    textInputAutocapitalization("never"),
    textContentType(contentType),
    frame({ maxWidth: Infinity }),
  ];

  return (
    <FormField
      label={label}
      icon="lock"
      accessory={
        <Button
          onPress={() => setIsVisible((visible) => !visible)}
          modifiers={[buttonStyle("plain")]}
        >
          <Image systemName={isVisible ? "eye.slash" : "eye"} size={15} color="secondary" />
        </Button>
      }
    >
      {isVisible ? (
        <TextField placeholder={placeholder} text={text} modifiers={modifiers} />
      ) : (
        <SecureField placeholder={placeholder} text={text} modifiers={modifiers} />
      )}
    </FormField>
  );
}
