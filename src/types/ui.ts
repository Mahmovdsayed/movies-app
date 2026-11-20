import type { ImageProps } from "expo-image";

import type { MediaFact } from "./tmdb";

import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps, ComponentType, ReactElement } from "react";
import type { ViewProps } from "react-native";

export type IoniconsName = ComponentProps<typeof Ionicons>["name"];

export type MaskedViewProps = ViewProps & {
  maskElement: ReactElement;
};

export type MaskedViewComponent = ComponentType<MaskedViewProps>;

export interface OrDividerProps {
  className?: string;
}

export interface FactListProps {
  facts: MediaFact[];
}

export interface RemoteImageProps extends Omit<ImageProps, "source" | "onError"> {
  source?: { uri?: string | null } | number | string | null;
  icon?: IoniconsName;
  iconSize?: number;
}
