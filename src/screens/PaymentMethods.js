import React from "react";
import { Layout } from "@ui-kitten/components";
import Screen from "../components/Screen";
import { StyleSheet } from "react-native";
import { CreditCardInput } from "react-native-credit-card-input-view";
import { PaymentIcon } from "react-native-payment-icons";

export default function ({ navigation }) {
  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Payment Methods"}
    >
      <Layout style={s.container}>
        <CreditCardInput
          autoFocus
          requiresName
          requiresCVC
          cardScale={1.0}
          labelStyle={s.label}
          inputStyle={s.input}
          validColor={"black"}
          invalidColor={"red"}
          placeholderColor={"darkgray"}
        />
      </Layout>
    </Screen>
  );
}

const s = StyleSheet.create({
  switch: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: "#F5F5F5",
    marginTop: 60,
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
});
