import { Text } from "@expo/ui/swift-ui";
import { font, foregroundStyle, multilineTextAlignment } from "@expo/ui/swift-ui/modifiers";
import type { SwiftLegalNoticeProps } from "@/types/swift-ui";

export function SwiftLegalNotice({ action }: SwiftLegalNoticeProps) {
  return (
    <Text
      modifiers={[
        font({ size: 11 }),
        foregroundStyle({ type: "hierarchical", style: "secondary" }),
        multilineTextAlignment("center"),
      ]}
    >
      {`By ${action}, you agree to our Terms of Service, Privacy Policy, and Community Guidelines.`}
    </Text>
  );
}
