import { useThemeStore } from "@/stores";
import { useEffect } from "react";

const ThemeProvider = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return null;
};

export default ThemeProvider;
