import { router } from "expo-router";
import type { OpenMediaTarget } from "@/types/home";

export const openMedia = (item: OpenMediaTarget) =>
  router.push({
    pathname: "/info/[type]/[id]",
    params: { type: item.type, id: String(item.id) },
  });
