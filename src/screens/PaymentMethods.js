import React from "react";
import Screen from "../components/Screen";
import { PaymentIcon } from "react-native-payment-icons";

export default function ({ navigation }) {
  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Payment Methods"}
    ></Screen>
  );
}
