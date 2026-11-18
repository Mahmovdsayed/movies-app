import { NativeTabs } from 'expo-router/native-tabs';

export const unstable_settings = {
  anchor: 'home',
};

export default function Layout() {
  return (
    <NativeTabs
      tintColor="#0A84FF"
      iconColor={{
        default: '#8E8E93',
        selected: '#0A84FF',
      }}
      blurEffect="systemChromeMaterialDark"
      indicatorColor="rgba(10, 132, 255, 0.18)"
      rippleColor="rgba(10, 132, 255, 0.25)"
      labelVisibilityMode="unlabeled"
    >
      <NativeTabs.Trigger name="home">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          md="home"
        />
        <NativeTabs.Trigger.Label hidden>
          Home
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="movies">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'film', selected: 'film.fill' }}
          md="movie"
        />
        <NativeTabs.Trigger.Label hidden>
          Movies
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="tv-shows">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'tv', selected: 'tv.fill' }}
          md="tv"
        />
        <NativeTabs.Trigger.Label hidden>
          TV Shows
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="search" role="search">
        <NativeTabs.Trigger.Icon sf="magnifyingglass" md="search" />
        <NativeTabs.Trigger.Label hidden>
          Search
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'person', selected: 'person.fill' }}
          md="person"
        />
        <NativeTabs.Trigger.Label hidden>
          Profile
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
