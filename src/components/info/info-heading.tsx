import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { INFO_MAX_GENRE_CHIPS } from "@/constants/info";
import type { InfoHeadingProps } from "@/types/info";

export function InfoHeading({ details }: InfoHeadingProps) {
  const length = details.runtime
    ? `${details.runtime} min`
    : details.seasons
      ? `${details.seasons} seasons`
      : undefined;
  const facts = [details.year, length].filter(Boolean).join("  ·  ");

  return (
    <View className="gap-2.5">
      <Text
        numberOfLines={2}
        className="text-[26px] font-bold uppercase leading-[30px] tracking-tight text-white"
      >
        {details.title}
      </Text>

      {details.tagline ? (
        <Text numberOfLines={1} className="text-sm italic text-white/70">
          {details.tagline}
        </Text>
      ) : null}

      <View className="flex-row items-center gap-1.5">
        <Ionicons name="star" size={13} color="#FACC15" />
        <Text className="text-[13px] font-semibold text-white">{details.rating.toFixed(1)}</Text>
        {facts ? <Text className="text-[13px] text-white/70">{`  ·  ${facts}`}</Text> : null}
      </View>

      {details.genres.length > 0 ? (
        <View className="flex-row flex-wrap gap-2 pt-0.5">
          {details.genres.slice(0, INFO_MAX_GENRE_CHIPS).map((genre) => (
            <View
              key={genre.id}
              className="rounded-full border border-white/25 bg-black/35 px-2.5 py-1"
            >
              <Text className="text-[10px] font-semibold uppercase tracking-[0.5px] text-white/90">
                {genre.name}
              </Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}
