import { Platform } from "react-native";

export const SUPPORTS_GLASS = parseInt(String(Platform.Version), 10) >= 26;
