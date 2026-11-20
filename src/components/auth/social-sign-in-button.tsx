import { Ionicons } from "@expo/vector-icons";
import { Button } from "heroui-native";
import { useAuthToast } from "@/hooks/use-auth-toast";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/errors";
import type { SocialSignInButtonProps } from "@/types/auth";

export function SocialSignInButton({ provider, label, icon, iconColor }: SocialSignInButtonProps) {
  const { success, error } = useAuthToast();

  const handleLogin = async () => {
    try {
      const { error: signInError } = await authClient.signIn.social({
        provider,
        callbackURL: "/(tabs)/home",
      });

      if (signInError) {
        error("Sign-in failed", signInError.message || `Could not sign in with ${label}`);
        return;
      }

      success("Success", `Signed in with ${label} successfully`);
    } catch (err: unknown) {
      error("Sign-in error", getErrorMessage(err, "An unexpected error occurred"));
    }
  };

  return (
    <Button onPress={handleLogin} variant="outline" className="w-full" size="md">
      <Ionicons name={icon} size={16} color={iconColor} />
      <Button.Label className="text-zinc-950 dark:text-white">{label}</Button.Label>
    </Button>
  );
}
