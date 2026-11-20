import { View } from "react-native";
import { FacebookButton } from "./facebook-button";
import { GoogleButton } from "./google-button";
import { JoinViaEmailButton } from "./join-via-email-button";
import { OrDivider } from "@/components/ui/or-divider";
import { useIsDark } from "@/hooks/use-is-dark";

export function AuthWelcomeActions() {
  const isDark = useIsDark();

  return (
    <View className="w-full">
      <JoinViaEmailButton />
      <OrDivider className="flex-row items-center my-3 w-full" />

      <View className="flex-row w-full gap-3">
        <View className="flex-1">
          <GoogleButton isDark={isDark} />
        </View>
        <View className="flex-1">
          <FacebookButton isDark={isDark} />
        </View>
      </View>
    </View>
  );
}
