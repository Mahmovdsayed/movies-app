import { Button, Host, HStack, ScrollView } from "@expo/ui/swift-ui";
import {
  buttonBorderShape,
  buttonStyle,
  controlSize,
  padding,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import * as Haptics from "expo-haptics";
import { useThemeColor } from "heroui-native";
import { memo, useMemo } from "react";

import { ALL_GENRES } from "@/constants/home";
import { SUPPORTS_GLASS } from "@/constants/platform";
import { useTmdb } from "@/hooks";
import { genreListPath } from "@/lib/tmdb";
import type { GenreChipsProps } from "@/types/home";
import type { TmdbGenre } from "@/types/tmdb";

export const GenreChips = memo(function GenreChips({
  selected,
  onSelect,
  type = "movie",
}: GenreChipsProps) {
  const { data } = useTmdb<{ genres: TmdbGenre[] }>(genreListPath(type));
  const accent = useThemeColor("accent");
  const foreground = useThemeColor("foreground");

  const items = useMemo<TmdbGenre[]>(
    () => [{ id: ALL_GENRES, name: "All" }, ...(data?.genres ?? [])],
    [data]
  );

  return (
    <Host style={{ height: 32 }}>
      <ScrollView axes="horizontal" showsIndicators={false}>
        <HStack spacing={10} modifiers={[padding({ horizontal: 24, vertical: 4 })]}>
          {items.map((genre) => {
            const isSelected = genre.id === selected;
            return (
              <Button
                key={genre.id}
                label={genre.name}
                onPress={() => {
                  Haptics.selectionAsync();
                  onSelect(genre.id);
                }}
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
                  controlSize("mini"),
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
