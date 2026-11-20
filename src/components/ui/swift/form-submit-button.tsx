import { Button, HStack, Spacer, Text } from "@expo/ui/swift-ui";
import { buttonStyle, controlSize, font, frame } from "@expo/ui/swift-ui/modifiers";
import type { FormSubmitButtonProps } from "@/types/swift-ui";

export function FormSubmitButton({
  label,
  loadingLabel,
  isLoading,
  onPress,
}: FormSubmitButtonProps) {
  return (
    <Button
      onPress={onPress}
      modifiers={[
        buttonStyle("glassProminent"),
        controlSize("large"),
        frame({ maxWidth: Infinity }),
        frame({ height: 48 }),
      ]}
    >
      <HStack spacing={8}>
        <Spacer />
        <Text modifiers={[font({ size: 15, weight: "semibold" })]}>
          {isLoading ? loadingLabel : label}
        </Text>
        <Spacer />
      </HStack>
    </Button>
  );
}
