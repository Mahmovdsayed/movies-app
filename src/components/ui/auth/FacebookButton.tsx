import { authClient } from "@/lib/auth-client";
import { Ionicons } from "@expo/vector-icons";
import { Button, useToast } from "heroui-native";

type FacebookButtonProps = {
    isDark: boolean;
};

const FacebookButton = ({ isDark: _isDark }: FacebookButtonProps) => {
    const { toast } = useToast();

    const handleLogin = async () => {
        try {
            const { error } = await authClient.signIn.social({
                provider: "facebook",
                callbackURL: "/(tabs)/home",
            });
            if (error) {
                toast.show({
                    label: "Sign-in failed",
                    description: error.message || "Could not sign in with Facebook",
                    variant: "danger",
                    placement: "top",
                });
                return;
            }
            toast.show({
                label: "Success",
                description: "Signed in with Facebook successfully",
                variant: "success",
                placement: "top",
            });
        } catch (err: unknown) {
            toast.show({
                label: "Sign-in error",
                description: err instanceof Error ? err.message : "An unexpected error occurred",
                variant: "danger",
                placement: "top",
            });
        }
    };

    return (
        <Button onPress={handleLogin} variant="outline" className="w-full" size="md">
            <Ionicons
                name="logo-facebook"
                size={16}
                color="#1877F2"
            />
            <Button.Label className="text-zinc-950 dark:text-white">Facebook</Button.Label>
        </Button>
    );
};

export default FacebookButton;
