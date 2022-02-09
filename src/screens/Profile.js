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
          justifyContent: "space-evenly",
        }}
      >
        <Button
          onPress={() => {
            navigation.navigate("PaymentMethods");
          }}
        >
          Payment Methods
        </Button>
        <Button status="basic" onPress={themeContext.toggleTheme}>
          {themeContext.theme == "dark" ? "Light Mode" : "Dark Mode"}
        </Button>

        <Button
          status="danger"
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
