import React from "react";
import { Button, Layout } from "@ui-kitten/components";
import Screen from "../components/Screen";

export default function ({ navigation }) {
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
