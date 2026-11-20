import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { PersonLinks } from "./person-links";
import { FactList, RemoteImage } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { tmdbImage } from "@/lib/tmdb";
import type { PersonProfileProps } from "@/types/person";

const AVATAR_SIZE = 120;
const BIO_LINES = 6;

export function PersonProfile({ person }: PersonProfileProps) {
  const [expanded, setExpanded] = useState(false);

  const born = formatDate(person.birthday);
  const died = formatDate(person.deathday);

  const facts = [
    person.department ? { label: "Department", value: person.department } : undefined,
    born ? { label: "Born", value: died ? `${born} — ${died}` : born } : undefined,
    person.placeOfBirth ? { label: "From", value: person.placeOfBirth } : undefined,
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact));

  const canCollapse = (person.biography?.length ?? 0) > 320;

  return (
    <View className="gap-4 pb-6">
      <View className="items-center gap-3">
        <View
          className="overflow-hidden rounded-full bg-surface"
          style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
        >
          <RemoteImage
            source={{ uri: tmdbImage(person.photo, "w342") }}
            recyclingKey={String(person.id)}
            contentFit="cover"
            transition={250}
            icon="person-outline"
            iconSize={34}
            className="h-full w-full"
          />
        </View>

        <Text className="text-center text-2xl font-bold text-foreground">{person.name}</Text>
        <PersonLinks id={person.id} />
      </View>

      <FactList facts={facts} />

      {person.biography ? (
        <View className="gap-2">
          <Text
            numberOfLines={expanded ? undefined : BIO_LINES}
            className="text-sm leading-relaxed text-muted"
          >
            {person.biography}
          </Text>
          {canCollapse ? (
            <Pressable onPress={() => setExpanded((value) => !value)} hitSlop={8}>
              <Text className="text-sm font-semibold text-accent">
                {expanded ? "Show less" : "Read more"}
              </Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
