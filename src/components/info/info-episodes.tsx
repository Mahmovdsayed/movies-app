import { Host, Picker, Text } from "@expo/ui/swift-ui";
import { pickerStyle, tag } from "@expo/ui/swift-ui/modifiers";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { useThemeColor } from "heroui-native";
import { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, Text as RNText, View } from "react-native";

import { RemoteImage } from "@/components/ui";
import { INFO_EPISODE_STILL_ASPECT, INFO_EPISODE_STILL_WIDTH } from "@/constants/info";
import { useTmdb } from "@/hooks";
import { seasonPath, tmdbImage, toMediaEpisodes, watchUrl } from "@/lib/tmdb";
import type { EpisodeRowProps, InfoEpisodesProps } from "@/types/info";
import type { TmdbSeason } from "@/types/tmdb";

function EpisodeRow({ id, episode }: EpisodeRowProps) {
  const accent = useThemeColor("accent");
  const facts = [episode.runtime ? `${episode.runtime} min` : undefined, episode.airDate]
    .filter(Boolean)
    .join("  ·  ");

  const handlePress = () => {
    WebBrowser.openBrowserAsync(watchUrl("tv", id, episode.season, episode.number)).catch(() => {});
  };

  return (
    <Pressable
      onPress={handlePress}
      className="flex-row gap-3 px-6"
      accessibilityRole="button"
      accessibilityLabel={`Play episode ${episode.number}, ${episode.title}`}
    >
      <View
        className="overflow-hidden rounded-xl bg-surface"
        style={{
          width: INFO_EPISODE_STILL_WIDTH,
          height: INFO_EPISODE_STILL_WIDTH / INFO_EPISODE_STILL_ASPECT,
        }}
      >
        <RemoteImage
          source={{ uri: tmdbImage(episode.still, "w342") }}
          recyclingKey={String(episode.id)}
          contentFit="cover"
          transition={200}
          className="h-full w-full"
        />
      </View>

      <View className="flex-1 gap-1">
        <RNText numberOfLines={1} className="text-sm font-semibold text-foreground">
          {episode.number}. {episode.title}
        </RNText>
        {facts ? <RNText className="text-xs text-muted">{facts}</RNText> : null}
        <View className="flex-row items-center gap-1 pt-0.5">
          <Ionicons name="play-circle" size={15} color={accent} />
          <RNText className="text-xs font-semibold" style={{ color: accent }}>
            Watch
          </RNText>
        </View>
      </View>
    </Pressable>
  );
}

export function InfoEpisodes({ id, seasonCount }: InfoEpisodesProps) {
  const [season, setSeason] = useState(1);
  const { data, isLoading, error } = useTmdb<TmdbSeason>(seasonPath(id, season));
  const episodes = useMemo(() => toMediaEpisodes(data), [data]);

  const seasons = useMemo(
    () => Array.from({ length: Math.max(seasonCount, 1) }, (_, index) => index + 1),
    [seasonCount]
  );

  return (
    <View className="gap-4">
      {seasons.length > 1 ? (
        <View className="flex-row items-center justify-between px-6">
          <RNText className="text-sm text-muted">Season</RNText>
          <Host matchContents>
            <Picker
              selection={season}
              onSelectionChange={(value: number) => setSeason(value)}
              modifiers={[pickerStyle("menu")]}
            >
              {seasons.map((value) => (
                <Text key={value} modifiers={[tag(value)]}>{`Season ${value}`}</Text>
              ))}
            </Picker>
          </Host>
        </View>
      ) : null}

      {error ? (
        <RNText className="px-6 text-sm text-muted">Couldn&apos;t load episodes.</RNText>
      ) : isLoading ? (
        <ActivityIndicator className="py-6" />
      ) : episodes.length === 0 ? (
        <RNText className="px-6 text-sm text-muted">No episodes for this season.</RNText>
      ) : (
        <View className="gap-4">
          {episodes.map((episode) => (
            <EpisodeRow key={episode.id} id={id} episode={episode} />
          ))}
        </View>
      )}
    </View>
  );
}
