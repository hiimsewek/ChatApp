import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeContext, ThemeProvider } from "contexts";
import { Button, Provider as PaperProvider } from "react-native-paper";
import { useIsAuthenticated, useIsAppInitialized } from "hooks";

export default function App() {
  return (
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  );
}

const Root = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
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
          <View
            onLayout={onReady}
            style={[
              styles.container,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <Text style={{ color: theme.colors.onBackground }}>
              Open up App.tsx to start working on your app!
            </Text>
            <Button onPress={toggleTheme}>Toggle theme</Button>
          </View>
        </PaperProvider>
      </>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
