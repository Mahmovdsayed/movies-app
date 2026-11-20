import { HStack, Image, Text, VStack } from "@expo/ui/swift-ui";
import { font, foregroundStyle, frame, glassEffect, padding } from "@expo/ui/swift-ui/modifiers";
import type { FormFieldProps } from "@/types/swift-ui";

export function FormField({ label, icon, accessory, children }: FormFieldProps) {
  return (
    <VStack alignment="leading" spacing={7}>
      <Text modifiers={[font({ size: 14, weight: "semibold" }), foregroundStyle("primary")]}>
        {label}
      </Text>

      <HStack
        spacing={12}
        modifiers={[
          frame({ height: 48 }),
          padding({ horizontal: 15 }),
          glassEffect({ glass: { variant: "clear", interactive: true }, shape: "capsule" }),
        ]}
      >
        <Image systemName={icon} size={15} color="secondary" />

        {children}

        {accessory}
      </HStack>
    </VStack>
  );
}
