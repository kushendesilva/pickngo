import React from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Layout, Text } from "@ui-kitten/components";

export const InfoCard = ({
  id,
  date,
  time,
  pickup,
  drop,
  onConfirmPress,
  onChangePress,
}) => (
  <Card
    status="basic"
    disabled
    style={styles.card}
    header={
      <Layout>
        <Text category="h6" style={{ fontWeight: "bold" }}>
          #{id}
        </Text>
        <Text category="s1">Pickup Location: {pickup}</Text>
        <Text category="s1">Drop Location: {drop}</Text>
      </Layout>
    }
  >
    <Layout style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Layout>
        <Text>{date}</Text>
        <Text>{time}</Text>
      </Layout>
      <Layout style={{ flexDirection: "row" }}>
        <Button
          onPress={onChangePress}
          style={styles.footerControl}
          size="small"
          status="danger"
        >
          Change
        </Button>
        <Button
          onPress={onConfirmPress}
          style={styles.footerControl}
          size="small"
          status="success"
        >
          Confirm
        </Button>
      </Layout>
    </Layout>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    margin: 10,
    elevation: 3,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 5,
  },
});
