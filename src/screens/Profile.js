import React, { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import { ThemeContext } from "../configs/Theme";
import Screen from "../components/Screen";
import { ProfileCard } from "../components/ProfileCard";
import { NavButton } from "../components/NavButton";

export default function ({ navigation }) {
  const auth = getAuth();
  const themeContext = useContext(ThemeContext);
  return (
    <Screen headerTitle="Profile">
      <ProfileCard
        email="admin@pickngo.com"
        onPress={() => {
          signOut(auth);
        }}
        onEditPress={() => {
          navigation.navigate("ProfileInformation");
        }}
        name="Admin"
      />
      <NavButton
        icon="credit-card"
        title="Payment Methods"
        onPress={() => {
          navigation.navigate("PaymentMethods");
        }}
      />
      <NavButton
        themeChanger
        icon={themeContext.theme == "dark" ? "sun" : "moon"}
        title={themeContext.theme == "dark" ? "Light Mode" : "Dark Mode"}
        onPress={themeContext.toggleTheme}
      />
      <NavButton
        icon="question-mark-circle"
        title="Help"
        onPress={() => {
          navigation.navigate("Help");
        }}
      />
    </Screen>
  );
}
