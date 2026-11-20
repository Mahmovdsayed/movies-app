import { useUniwind } from "uniwind";

export const useIsDark = () => {
  const { theme } = useUniwind();
  return theme === "dark";
};
