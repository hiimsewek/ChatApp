import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { Theme, ThemeMode } from "types";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const colors = {
  light: {
    ...LightTheme.colors,
    ...MD3LightTheme.colors,
    primary: "#006a62",
    onPrimary: "#ffffff",
    primaryContainer: "#72f8e9",
    onPrimaryContainer: "#00201d",
    background: "#ffffff",
    onBackground: "#111111",
  },
  dark: {
    ...DarkTheme.colors,
    ...MD3DarkTheme.colors,
    primary: "#51dbcd",
    onPrimary: "#ffffff",
    primaryContainer: "#72f8e9",
    onPrimaryContainer: "#00201d",
    background: "#111111",
    onBackground: "#ffffff",
  },
};

const CombinedDefaultTheme: Theme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...colors.light,
  },
};

const CombinedDarkTheme: Theme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...colors.dark,
  },
};

const theme: Record<ThemeMode, Theme> = {
  light: CombinedDefaultTheme,
  dark: CombinedDarkTheme,
};

export default theme;
