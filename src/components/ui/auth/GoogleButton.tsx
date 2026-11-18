import { authClient } from "@/lib/auth-client";
import { Ionicons } from "@expo/vector-icons";
import { Button, useToast } from "heroui-native";

type GoogleButtonProps = {
    isDark: boolean;
};

const GoogleButton = ({ isDark }: GoogleButtonProps) => {
    const { toast } = useToast();

    const handleLogin = async () => {
        try {
            const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/(tabs)/home",
            });
            if (error) {
                toast.show({
                    label: "Sign-in failed",
                    description: error.message || "Could not sign in with Google",
                    variant: "danger",
                    placement: "bottom",
                });
                return;
            }
            toast.show({
                label: "Success",
                description: "Signed in with Google successfully",
                variant: "success",
                placement: "bottom",
            });
        } catch (err: unknown) {
            toast.show({
                label: "Sign-in error",
                description: err instanceof Error ? err.message : "An unexpected error occurred",
                variant: "danger",
                placement: "bottom",
            });
        }
    };

    return (
        <Button onPress={handleLogin} variant="outline" className="w-full" size="md">
            <Ionicons
                name="logo-google"
                size={16}
                color={isDark ? '#FFFFFF' : '#18181B'}
            />
            <Button.Label className="text-zinc-950 dark:text-white">Google</Button.Label>
        </Button>
    );
};

export default GoogleButton;
