import { VStack } from "@expo/ui/swift-ui";
import { frame } from "@expo/ui/swift-ui/modifiers";
import type { SwiftFormStackProps } from "@/types/swift-ui";

export function SwiftFormStack({ children }: SwiftFormStackProps) {
  return (
    <VStack
      alignment="leading"
      spacing={16}
      modifiers={[frame({ maxWidth: Infinity, maxHeight: Infinity, alignment: "center" })]}
    >
      {children}
    </VStack>
  );
}
