import React from "react";
import { ActivityIndicator } from "react-native";
import { Layout, useTheme } from "@ui-kitten/components";
import Screen from "../../components/Screen";

export default function ({ navigation }) {
  const theme = useTheme();
  return (
    <Screen>
      <Layout
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator
          size="large"
          color={theme["color-primary-default"]}
        />
      </Layout>
    </Screen>
  );
}
