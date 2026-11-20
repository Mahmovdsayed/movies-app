import { Text, View } from "react-native";

import type { FactListProps } from "@/types/ui";

export function FactList({ facts }: FactListProps) {
  if (facts.length === 0) return null;

  return (
    <View>
      {facts.map((fact) => (
        <View
          key={fact.label}
          className="flex-row items-start justify-between gap-6 border-b border-zinc-200/70 py-3 dark:border-zinc-800/70"
        >
          <Text className="text-sm text-muted">{fact.label}</Text>
          <Text className="flex-1 text-right text-sm font-medium text-foreground">
            {fact.value}
          </Text>
        </View>
      ))}
    </View>
  );
}
