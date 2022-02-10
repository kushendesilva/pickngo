import React from "react";
import Screen from "../components/Screen";
import { RequestCard } from "../components/RequestCard";

export default function ({ navigation }) {
  return (
    <Screen headerTitle="Requests">
      <RequestCard
        id="1015454"
        date="12/03/2022"
        onPress={() => {
          navigation.navigate("Request");
        }}
      />
      <RequestCard
        id="1015455"
        date="20/03/2022"
        onPress={() => {
          navigation.navigate("Request");
        }}
      />
      <RequestCard
        id="1015456"
        date="21/03/2022"
        onPress={() => {
          navigation.navigate("Request");
        }}
      />
    </Screen>
  );
}
