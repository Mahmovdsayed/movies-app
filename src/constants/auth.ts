import type { ViewStyle } from "react-native";

export const AUTH_SCROLL_CONTENT_STYLE: ViewStyle = {
  flexGrow: 1,
  paddingHorizontal: 20,
  paddingBottom: 32,
};

export const AUTH_SCROLL_CLASSNAME = "flex-1 bg-white dark:bg-black";
export const AUTH_CONTENT_CLASSNAME = "gap-6 pt-2";

export const authScreenOptions = (title: string) => ({
  headerShown: true,
  title,
  headerLargeTitleEnabled: true,
  headerBackTitle: "Back",
  headerBackButtonMenuEnabled: true,
});
