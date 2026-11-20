import { View } from "react-native";

import { FactList } from "@/components/ui";
import type { InfoDetailsProps } from "@/types/info";

export function InfoDetails({ details }: InfoDetailsProps) {
  if (details.facts.length === 0) return null;

  return (
    <View className="px-6">
      <FactList facts={details.facts} />
    </View>
  );
}
