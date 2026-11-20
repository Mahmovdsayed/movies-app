import { Button, Host, HStack, ScrollView } from "@expo/ui/swift-ui";
import {
  buttonBorderShape,
  buttonStyle,
  controlSize,
  padding,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import { useThemeColor } from "heroui-native";
import { memo } from "react";

import { INFO_TABS_HEIGHT } from "@/constants/info";
import { SUPPORTS_GLASS } from "@/constants/platform";
import type { InfoSectionTabsProps } from "@/types/info";

export const InfoSectionTabs = memo(function InfoSectionTabs({
  tabs,
  selected,
  onSelect,
}: InfoSectionTabsProps) {
  const accent = useThemeColor("accent");
  const foreground = useThemeColor("foreground");

  return (
    <Host style={{ height: INFO_TABS_HEIGHT }}>
      <ScrollView axes="horizontal" showsIndicators={false}>
        <HStack spacing={8} modifiers={[padding({ horizontal: 24, vertical: 4 })]}>
          {tabs.map((tab) => {
            const isSelected = tab.value === selected;
            return (
              <Button
                key={tab.value}
                label={tab.label}
                onPress={() => onSelect(tab.value)}
                modifiers={[
                  buttonStyle(
                    SUPPORTS_GLASS
                      ? isSelected
                        ? "glassProminent"
                        : "glass"
                      : isSelected
                        ? "borderedProminent"
                        : "bordered"
                  ),
                  buttonBorderShape("capsule"),
                  controlSize("small"),
                  tint(isSelected ? accent : foreground),
                ]}
              />
            );
          })}
        </HStack>
      </ScrollView>
    </Host>
  );
});
