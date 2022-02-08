import React, { useContext } from "react";
import { Button, Text, Layout, useTheme } from "@ui-kitten/components";
import { ThemeContext } from "../configs/Theme";
import Screen from "../components/Screen";

export default function ({ navigation }) {
  const theme = useTheme();
  const themeContext = useContext(ThemeContext);

  return (
    <Screen headerTitle="Home">
      <Layout
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          text="Pick Date & Time"
          onPress={() => {
            navigation.navigate("DateTimePicker");
          }}
        >
          Pick Date
        </Button>
      </Layout>
    </Screen>
  );
}
