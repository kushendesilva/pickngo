import React, { useState } from "react";
import { default as colors } from "./src/configs/Colors.json";
import AppNavigator from "./src/navigation/AppNavigator";
import * as eva from "@eva-design/eva";
import { LogBox } from "react-native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ThemeContext } from "./src/configs/Theme";
import { AuthProvider } from "./src/provider/AuthProvider";

export default function App() {
  React.useEffect(() => {
    LogBox.ignoreLogs([
      "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
    ]);
  }, []);

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider {...eva} theme={{ ...eva[theme], ...colors }}>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
}
