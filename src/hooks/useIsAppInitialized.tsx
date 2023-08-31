import { useCallback, useEffect, useState } from "react";
import { Theme } from "types";
import * as SplashScreen from "expo-splash-screen";

type UseIsAppInitializedProps = {
  theme: Theme;
  isAuthenticated: boolean;
};

SplashScreen.preventAutoHideAsync();

const useIsAppInitialized = ({
  theme,
  isAuthenticated,
}: UseIsAppInitializedProps) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (theme && isAuthenticated != null) {
      setIsInitialized(true);
    }
  }, [theme, isAuthenticated]);

  const onReady = useCallback(async () => {
    if (isInitialized) {
      await SplashScreen.hideAsync();
    }
  }, [isInitialized]);

  return { isInitialized, onReady };
};

export default useIsAppInitialized;
