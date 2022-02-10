import React from "react";
import { StyleSheet } from "react-native";
import { Card, Layout, Text } from "@ui-kitten/components";
import Screen from "../components/Screen";

export default function ({ navigation }) {
  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Request Details"}
    >
      <Card
        disabled
        style={styles.card}
        header={
          <Layout>
            <Text category="h6" style={{ fontWeight: "bold" }}>
              #1052515
            </Text>
            <Text category="s1">Pickup Location: No.10, Colombo-07</Text>
            <Text category="s1">Drop Location: No.42, Colombo-10</Text>
          </Layout>
        }
      >
        <Layout
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Layout>
            <Text>02/02/2022</Text>
            <Text>12:25</Text>
          </Layout>
        </Layout>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 15,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 5,
  },
});
