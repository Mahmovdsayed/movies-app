import { router } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

import { RemoteImage } from "@/components/ui";
import { INFO_CAST_AVATAR_SIZE, INFO_CAST_CARD_WIDTH, INFO_CAST_LIMIT } from "@/constants/info";
import { useTmdb } from "@/hooks";
import { creditsPath, tmdbImage } from "@/lib/tmdb";
import type { CastCardProps, CastRowProps } from "@/types/info";
import type { TmdbCastMember, TmdbCredits } from "@/types/tmdb";

function CastCard({ member }: CastCardProps) {
  return (
    <Pressable
      onPress={() => router.push({ pathname: "/person/[id]", params: { id: String(member.id) } })}
      style={{ width: INFO_CAST_CARD_WIDTH }}
      className="items-center gap-2"
      accessibilityRole="button"
      accessibilityLabel={`Open ${member.name}`}
    >
      <View
        className="overflow-hidden rounded-full bg-surface"
        style={{ width: INFO_CAST_AVATAR_SIZE, height: INFO_CAST_AVATAR_SIZE }}
      >
        <RemoteImage
          source={{ uri: tmdbImage(member.profile_path, "w342") }}
          recyclingKey={String(member.id)}
          contentFit="cover"
          transition={200}
          icon="person-outline"
          iconSize={20}
          className="h-full w-full"
        />
      </View>
      <Text numberOfLines={2} className="text-center text-xs font-semibold text-foreground">
        {member.name}
      </Text>
      {member.character ? (
        <Text numberOfLines={2} className="text-center text-[11px] text-muted">
          {member.character}
        </Text>
      ) : null}
    </Pressable>
  );
}

export function CastRow({ type, id, title }: CastRowProps) {
  const { data } = useTmdb<TmdbCredits>(creditsPath(type, id));
  const cast = (data?.cast ?? []).slice(0, INFO_CAST_LIMIT);

  if (cast.length === 0) return null;

  return (
    <View className="gap-3">
      {title ? <Text className="px-6 text-lg font-bold text-foreground">{title}</Text> : null}
      <FlatList
        horizontal
        data={cast}
        keyExtractor={(member: TmdbCastMember) => String(member.id)}
        renderItem={({ item }) => <CastCard member={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
      />
    </View>
  );
}
