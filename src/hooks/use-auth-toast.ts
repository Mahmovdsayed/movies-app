import { useToast } from "heroui-native";
import { useCallback, useMemo } from "react";

type AuthToastVariant = "success" | "warning" | "danger";

export const useAuthToast = () => {
  const { toast } = useToast();

  const show = useCallback(
    (variant: AuthToastVariant, label: string, description?: string) => {
      toast.show({ label, description, variant, placement: "top" });
    },
    [toast]
  );

  return useMemo(
    () => ({
      success: (label: string, description?: string) => show("success", label, description),
      warning: (label: string, description?: string) => show("warning", label, description),
      error: (label: string, description?: string) => show("danger", label, description),
    }),
    [show]
  );
};
