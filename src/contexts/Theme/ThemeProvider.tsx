import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import ThemeContext from "./ThemeContext";
import { theme } from "theme";
import { getStoredItem, storeItem } from "utils/storage";
import { ThemeMode } from "types";

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeType, setThemeType] = useState<ThemeMode | null>(null);
  const colorScheme: ThemeMode = useColorScheme() === "dark" ? "dark" : "light";

  useEffect(() => {
    const getTheme = async () => {
      const storedThemeType = (await getStoredItem(
        "theme"
      )) as ThemeMode | null;
      storedThemeType
        ? setThemeType(storedThemeType)
        : setThemeType(colorScheme);
    };

    getTheme();
  }, [colorScheme]);

  const toggleTheme = async () => {
    const expectedTheme: ThemeMode = themeType === "dark" ? "light" : "dark";
    setThemeType(expectedTheme);
    await storeItem("theme", expectedTheme);
  };

  const value = {
    theme: theme[themeType],
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
