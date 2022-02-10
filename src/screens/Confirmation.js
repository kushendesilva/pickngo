import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import Screen from "../components/Screen";
import { InfoCard } from "../components/InfoCard";

export default function ({ navigation }) {
  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Confirmation"}
    >
      <InfoCard
        id="1015457"
        date="21/03/2022"
        time="10:25"
        pickup="No.10, Colombo-07"
        drop="No.42, Colombo-10"
        onConfirmPress={() => {
          navigation.navigate("MainTabs");
        }}
        onChangePress={() => {
          navigation.goBack();
        }}
      />
    </Screen>
  );
}
