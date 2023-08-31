import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { ThemeContext, ThemeProvider } from "contexts";
import { Provider as PaperProvider } from "react-native-paper";
import { useIsAuthenticated, useIsAppInitialized } from "hooks";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack, AuthenticatedStack } from "navigation";

export default function App() {
  return (
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  );
}

const Root = () => {
  const { theme } = useContext(ThemeContext);
  const isAuthenticated = useIsAuthenticated();
  const { isInitialized, onReady } = useIsAppInitialized({
    theme,
    isAuthenticated,
  });

  return (
    isInitialized && (
      <>
        <StatusBar style={theme.dark ? "light" : "dark"} />
        <PaperProvider theme={theme}>
          <NavigationContainer onReady={onReady} theme={theme}>
            {!isAuthenticated ? <AuthStack /> : <AuthenticatedStack />}
          </NavigationContainer>
        </PaperProvider>
      </>
    )
  );
};
