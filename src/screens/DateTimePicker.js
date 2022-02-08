import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import Screen from "../components/Screen";

export default function ({ navigation }) {
  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Date & Time Picker"}
    >
      <Layout
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>This is the Requests tab</Text>
      </Layout>
    </Screen>
  );
}
