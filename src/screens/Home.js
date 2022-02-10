import React from "react";
import { Button, Layout } from "@ui-kitten/components";
import Screen from "../components/Screen";
import { OngoingCard } from "../components/OngoingCard";
import { LocationCard } from "../components/LocationCard";
import { NewCard } from "../components/NewCard";

export default function ({ navigation }) {
  return (
    <Screen headerTitle="Home">
      <LocationCard
        location="No.42, Colombo-10"
        onPress={() => {
          navigation.navigate("ChangeLocation");
        }}
      />
      <OngoingCard
        id="1015454"
        onPress={() => {
          navigation.navigate("Ongoing");
        }}
      />
      <NewCard
        onPress={() => {
          navigation.navigate("NewRequest");
        }}
      />
    </Screen>
  );
}
