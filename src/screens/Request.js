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
            <Layout
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text category="h6" style={{ fontWeight: "bold" }}>
                #{request.id}
              </Text>
              {request.rider && (
                <Text category="h6" style={{ marginLeft: 5 }}>
                  ({request.rider})
                </Text>
              )}
            </Layout>
            <Text category="s1" style={{ fontWeight: "bold" }}>
              Pickup Location: <Text category="s1">{request.pickAd}</Text>
            </Text>
            <Text category="s1" style={{ fontWeight: "bold", marginTop: 5 }}>
              Drop Location: <Text category="s1">{request.dropAd}</Text>
            </Text>
            <Text category="s1" style={{ fontWeight: "bold", marginTop: 5 }}>
              Payment Type: <Text category="s1">Cash on Delivery</Text>
            </Text>
            {request.price && (
              <Text category="s1" style={{ fontWeight: "bold", marginTop: 5 }}>
                Price: <Text category="s1">Rs.{request.price}</Text>
              </Text>
            )}
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
