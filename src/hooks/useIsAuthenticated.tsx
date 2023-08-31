import { useEffect, useState } from "react";
import { auth } from "services/firebaseConfig";

const useIsAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return unsubscribe;
  }, []);

  return isAuthenticated;
};

export default useIsAuthenticated;
