import React from "react";
import { StyleSheet } from "react-native";
import { Card, Layout, Text } from "@ui-kitten/components";
import Screen from "../components/Screen";

export default function ({ navigation, route }) {
  const { request } = route.params;
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
              #{request.id}
            </Text>
            <Text category="s1" style={{ fontWeight: "bold", marginTop: 5 }}>
              Pickup Location: <Text category="s1">{request.pickAd}</Text>
            </Text>
            <Text category="s1" style={{ fontWeight: "bold", marginTop: 5 }}>
              Drop Location: <Text category="s1">{request.dropAd}</Text>
            </Text>
          </Layout>
        }
      >
        <Layout
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Layout>
            <Text category="s1" style={{ fontWeight: "bold" }}>
              Date: <Text category="s1">{request.date}</Text>
            </Text>
            <Text category="s1" style={{ fontWeight: "bold" }}>
              Time: <Text category="s1">{request.time}</Text>
            </Text>
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
