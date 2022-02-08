import React, { useContext } from "react";
import { Button, Layout } from "@ui-kitten/components";
import { ThemeContext } from "../configs/Theme";
import Screen from "../components/Screen";

export default function ({ navigation }) {
  const themeContext = useContext(ThemeContext);
  return (
    <Screen headerTitle="Profile">
      <Layout
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button onPress={themeContext.toggleTheme}>
          {themeContext.theme == "dark" ? "Light Mode" : "Dark Mode"}
        </Button>

        <Button
          onPress={() => {
            navigation.navigate("Auth");
          }}
        >
          Log Out
        </Button>
      </Layout>
    </Screen>
  );
}
