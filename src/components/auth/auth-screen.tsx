import { Stack } from "expo-router";
import { ScrollView, View } from "react-native";

import {
  AUTH_CONTENT_CLASSNAME,
  AUTH_SCROLL_CLASSNAME,
  AUTH_SCROLL_CONTENT_STYLE,
  authScreenOptions,
} from "@/constants/auth";
import type { AuthScreenProps } from "@/types/auth";

export function AuthScreen({
  title,
  className = AUTH_SCROLL_CLASSNAME,
  contentClassName = AUTH_CONTENT_CLASSNAME,
  children,
}: AuthScreenProps) {
  return (
    <>
      <Stack.Screen options={authScreenOptions(title)} />

      <ScrollView
        className={className}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={AUTH_SCROLL_CONTENT_STYLE}
        keyboardShouldPersistTaps="handled"
      >
        <View className={contentClassName}>{children}</View>
      </ScrollView>
    </>
  );
}
