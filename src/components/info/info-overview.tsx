import { Text } from "react-native";

import type { InfoOverviewProps } from "@/types/info";

export function InfoOverview({ overview }: InfoOverviewProps) {
  if (!overview) return null;

  return <Text className="text-sm leading-relaxed text-muted">{overview}</Text>;
}
