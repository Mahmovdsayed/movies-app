import { useSegments } from "expo-router";
import { NativeTabs } from "expo-router/native-tabs";
import { SearchFilterBar } from "@/components/search";
import { TAB_ICON_COLOR, TINT_COLOR } from "@/constants/theme";

export const unstable_settings = {
  anchor: "home",
};

export default function Layout() {
  // The accessory is a child of the navigator, so it is global by nature —
  // rendering it conditionally is what scopes it to the search tab.
  const segments = useSegments() as string[];
  const isSearchTab = segments[1] === "search";

  return (
    <NativeTabs
      tintColor={TINT_COLOR}
      iconColor={{
        default: TAB_ICON_COLOR,
        selected: TINT_COLOR,
      }}
      blurEffect="systemChromeMaterialDark"
      indicatorColor="rgba(10, 132, 255, 0.18)"
      rippleColor="rgba(10, 132, 255, 0.25)"
      labelVisibilityMode="unlabeled"
    >
      {isSearchTab ? (
        <NativeTabs.BottomAccessory>
          <SearchFilterBar />
        </NativeTabs.BottomAccessory>
      ) : null}

      <NativeTabs.Trigger name="home">
        <NativeTabs.Trigger.Icon sf={{ default: "house", selected: "house.fill" }} md="home" />
        <NativeTabs.Trigger.Label hidden>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="movies">
        <NativeTabs.Trigger.Icon sf={{ default: "film", selected: "film.fill" }} md="movie" />
        <NativeTabs.Trigger.Label hidden>Movies</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="tv-shows">
        <NativeTabs.Trigger.Icon sf={{ default: "tv", selected: "tv.fill" }} md="tv" />
        <NativeTabs.Trigger.Label hidden>TV Shows</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="search">
        <NativeTabs.Trigger.Icon sf="magnifyingglass" md="search" />
        <NativeTabs.Trigger.Label hidden>Search</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Icon sf={{ default: "person", selected: "person.fill" }} md="person" />
        <NativeTabs.Trigger.Label hidden>Profile</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
