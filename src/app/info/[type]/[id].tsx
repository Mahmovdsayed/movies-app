import { useLocalSearchParams } from "expo-router";
import { useThemeColor } from "heroui-native";
import { useMemo, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import { MediaFeedRow } from "@/components/home";
import {
  CastRow,
  InfoActions,
  InfoBackdrop,
  InfoDetails,
  InfoEpisodes,
  InfoHeading,
  InfoOverview,
  InfoSectionTabs,
} from "@/components/info";
import { INFO_BACKDROP_TEXT_BOTTOM, infoTabsFor } from "@/constants/info";
import { useTmdb } from "@/hooks";
import { detailsPath, recommendationsPath, toMediaDetails } from "@/lib/tmdb";
import type { InfoSection } from "@/types/info";
import type { MediaType, TmdbMediaDetails } from "@/types/tmdb";

export default function InfoScreen() {
  const params = useLocalSearchParams<{ type?: string; id?: string }>();
  const type: MediaType = params.type === "tv" ? "tv" : "movie";
  const id = Number(params.id);

  const background = useThemeColor("background");
  const [section, setSection] = useState<InfoSection>(() => infoTabsFor(type === "tv")[0].value);

  const tabs = useMemo(() => infoTabsFor(type === "tv"), [type]);
  const activeSection = tabs.some((tab) => tab.value === section) ? section : tabs[0].value;

  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const { data, error } = useTmdb<TmdbMediaDetails>(detailsPath(type, id));
  const details = useMemo(() => (data ? toMediaDetails(data, type) : undefined), [data, type]);

  if (!details) {
    return (
      <View
        className="flex-1 items-center justify-center px-6"
        style={{ backgroundColor: background }}
      >
        {error ? (
          <View className="w-full rounded-2xl bg-surface p-4">
            <Text className="text-base font-semibold text-foreground">
              Couldn&apos;t load details
            </Text>
            <Text className="mt-1 text-sm text-muted">Check your connection and try again.</Text>
          </View>
        ) : (
          <ActivityIndicator />
        )}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: background }}>
      <Animated.ScrollView
        style={{ flex: 1 }}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View>
          <InfoBackdrop details={details} scrollY={scrollY} />
          <View
            className="absolute left-0 right-0 gap-4 px-6"
            style={{ bottom: INFO_BACKDROP_TEXT_BOTTOM }}
          >
            <InfoHeading details={details} />
            <InfoActions type={type} id={id} title={details.title} favorite={details} />
          </View>
        </View>

        <View className="gap-6 pt-6">
          <View className="px-6">
            <InfoOverview overview={details.overview} />
          </View>

          <InfoSectionTabs tabs={tabs} selected={activeSection} onSelect={setSection} />

          {activeSection === "episodes" ? (
            <InfoEpisodes id={id} seasonCount={details.numberOfSeasons ?? 1} />
          ) : activeSection === "more" ? (
            <MediaFeedRow
              title="More like this"
              path={recommendationsPath(type, id)}
              type={type}
              version={0}
            />
          ) : activeSection === "cast" ? (
            <CastRow type={type} id={id} />
          ) : (
            <InfoDetails details={details} />
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
}
