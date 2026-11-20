import {
  BottomSheet,
  Button,
  Divider,
  Group,
  Host,
  HStack,
  Image,
  Picker,
  Rectangle,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from "@expo/ui/swift-ui";
import {
  buttonStyle,
  controlSize,
  font,
  foregroundStyle,
  frame,
  hidden,
  padding,
  pickerStyle,
  presentationDetents,
  presentationDragIndicator,
  tag,
} from "@expo/ui/swift-ui/modifiers";
import { useState, type ReactNode } from "react";

import {
  ANY_GENRE_ID,
  ANY_LANGUAGE,
  ANY_YEAR,
  DEFAULT_SEARCH_FILTERS,
  SEARCH_LANGUAGE_OPTIONS,
  SEARCH_RATING_OPTIONS,
  SEARCH_TYPE_OPTIONS,
  SEARCH_YEAR_OPTIONS,
} from "@/constants/search";
import { useTmdb } from "@/hooks";
import type { SearchFilterSheetProps, SearchMediaFilter } from "@/types/search";
import type { TmdbGenre } from "@/types/tmdb";

function SectionLabel({ children }: { children: string }) {
  return (
    <Text modifiers={[font({ size: 13, weight: "semibold" }), foregroundStyle("secondary")]}>
      {children}
    </Text>
  );
}

function PickerRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <HStack spacing={12} modifiers={[frame({ maxWidth: Infinity })]}>
      <Text modifiers={[font({ size: 15 })]}>{label}</Text>
      <Spacer />
      {children}
    </HStack>
  );
}

export function SearchFilterSheet({ filters, onChange }: SearchFilterSheetProps) {
  const [isPresented, setIsPresented] = useState(false);
  const { data } = useTmdb<{ genres: TmdbGenre[] }>("/genre/movie/list");
  const genres = data?.genres ?? [];

  return (
    <Host style={{ width: "100%", height: "100%", minHeight: 44 }}>
      <BottomSheet
        isPresented={isPresented}
        onIsPresentedChange={setIsPresented}
        presentationBackground={
          <Rectangle modifiers={[foregroundStyle({ type: "material", material: "regular" })]} />
        }
        anchor={
          <Button
            onPress={() => setIsPresented(true)}
            modifiers={[
              buttonStyle("plain"),
              controlSize("large"),
              frame({ maxWidth: Infinity, maxHeight: Infinity }),
            ]}
          >
            <HStack spacing={8}>
              <Spacer />
              <Image systemName="line.3.horizontal.decrease" size={16} />
              <Text modifiers={[font({ size: 17 })]}>Filters</Text>
              <Spacer />
              <Image systemName="line.3.horizontal.decrease" size={16} modifiers={[hidden(true)]} />
            </HStack>
          </Button>
        }
      >
        <Group
          modifiers={[
            presentationDetents(["medium", "large"]),
            presentationDragIndicator("visible"),
          ]}
        >
          <ScrollView showsIndicators={false}>
            <VStack
              alignment="leading"
              spacing={16}
              modifiers={[padding({ all: 20 }), frame({ maxWidth: Infinity })]}
            >
              <Text modifiers={[font({ size: 20, weight: "bold" })]}>Filters</Text>

              <VStack alignment="leading" spacing={6} modifiers={[frame({ maxWidth: Infinity })]}>
                <SectionLabel>Type</SectionLabel>
                <Picker
                  selection={filters.type}
                  onSelectionChange={(value: SearchMediaFilter) =>
                    onChange({ ...filters, type: value })
                  }
                  modifiers={[pickerStyle("segmented"), frame({ maxWidth: Infinity })]}
                >
                  {SEARCH_TYPE_OPTIONS.map((option) => (
                    <Text key={option.value} modifiers={[tag(option.value)]}>
                      {option.label}
                    </Text>
                  ))}
                </Picker>
              </VStack>

              <VStack alignment="leading" spacing={6} modifiers={[frame({ maxWidth: Infinity })]}>
                <SectionLabel>Minimum rating</SectionLabel>
                <Picker
                  selection={filters.minRating}
                  onSelectionChange={(value: number) => onChange({ ...filters, minRating: value })}
                  modifiers={[pickerStyle("segmented"), frame({ maxWidth: Infinity })]}
                >
                  {SEARCH_RATING_OPTIONS.map((option) => (
                    <Text key={option.value} modifiers={[tag(option.value)]}>
                      {option.label}
                    </Text>
                  ))}
                </Picker>
              </VStack>

              <Divider />

              <PickerRow label="Genre">
                <Picker
                  selection={filters.genreId ?? ANY_GENRE_ID}
                  onSelectionChange={(value: number) =>
                    onChange({ ...filters, genreId: value === ANY_GENRE_ID ? null : value })
                  }
                  modifiers={[pickerStyle("menu")]}
                >
                  <Text modifiers={[tag(ANY_GENRE_ID)]}>Any</Text>
                  {genres.map((genre) => (
                    <Text key={genre.id} modifiers={[tag(genre.id)]}>
                      {genre.name}
                    </Text>
                  ))}
                </Picker>
              </PickerRow>

              <PickerRow label="Release year">
                <Picker
                  selection={filters.year ?? ANY_YEAR}
                  onSelectionChange={(value: number) =>
                    onChange({ ...filters, year: value === ANY_YEAR ? null : value })
                  }
                  modifiers={[pickerStyle("menu")]}
                >
                  {SEARCH_YEAR_OPTIONS.map((option) => (
                    <Text key={option.value} modifiers={[tag(option.value)]}>
                      {option.label}
                    </Text>
                  ))}
                </Picker>
              </PickerRow>

              <PickerRow label="Language">
                <Picker
                  selection={filters.language ?? ANY_LANGUAGE}
                  onSelectionChange={(value: string) =>
                    onChange({ ...filters, language: value === ANY_LANGUAGE ? null : value })
                  }
                  modifiers={[pickerStyle("menu")]}
                >
                  {SEARCH_LANGUAGE_OPTIONS.map((option) => (
                    <Text key={option.value} modifiers={[tag(option.value)]}>
                      {option.label}
                    </Text>
                  ))}
                </Picker>
              </PickerRow>

              <Button
                onPress={() => onChange(DEFAULT_SEARCH_FILTERS)}
                modifiers={[
                  buttonStyle("glass"),
                  controlSize("large"),
                  frame({ maxWidth: Infinity }),
                ]}
              >
                <HStack spacing={8}>
                  <Spacer />
                  <Text modifiers={[font({ size: 15, weight: "semibold" })]}>Reset filters</Text>
                  <Spacer />
                </HStack>
              </Button>
            </VStack>
          </ScrollView>
        </Group>
      </BottomSheet>
    </Host>
  );
}
