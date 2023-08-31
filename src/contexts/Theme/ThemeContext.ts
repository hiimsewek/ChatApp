import { createContext } from "react";
import { Theme } from "types";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export default ThemeContext;
