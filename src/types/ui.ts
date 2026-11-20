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
