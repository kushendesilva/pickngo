import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { ThemeProvider } from "react-native-rapi-ui";

export default function App() {
  const images = [
    require("./assets/icon.png"),
    require("./assets/splash.png"),
    require("./assets/login.png"),
    require("./assets/register.png"),
    require("./assets/forgot.png"),
  ];

  return (
    <ThemeProvider images={images}>
      <AppNavigator />
    </ThemeProvider>
  );
}
