import { Host } from "@expo/ui/swift-ui";
import type { SwiftFormHostProps } from "@/types/swift-ui";

export function SwiftFormHost({ height, children }: SwiftFormHostProps) {
  return <Host style={{ width: "100%", height }}>{children}</Host>;
}
