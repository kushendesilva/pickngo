import React, { useCallback, useState } from "react";
import { StyleSheet, Linking } from "react-native";
import {
  Button,
  Layout,
  Text,
  Icon,
  Card,
  Input,
  OverflowMenu,
  TopNavigationAction,
  TopNavigation,
  MenuItem,
} from "@ui-kitten/components";
import { doc, updateDoc, getFirestore } from "firebase/firestore/lite";
import Screen from "../components/Screen";

export default function ({ navigation, route }) {
  const { request } = route.params;
  const db = getFirestore();
  const handleCall = useCallback(async () => {
    await Linking.openURL("tel:" + request.riderPhone);
  }, []);
  const MapIcon = (props) => <Icon {...props} name="pin" />;
  const CallIcon = (props) => <Icon {...props} name="phone" />;
  const [price, setPrice] = useState("");

  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Ongoing Delivery"}
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

          <Layout style={{ flexDirection: "row" }}>
            <Button
              size="small"
              accessoryRight={MapIcon}
              style={{ marginRight: 5 }}
              status="basic"
              onPress={() => {
                navigation.navigate("TrackLocation", {
                  marker: {
                    pickLat: request.pickLat,
                    pickLong: request.pickLong,
                    dropLat: request.dropLat,
                    dropLong: request.dropLong,
                    lat: request.lat,
                    long: request.long,
                  },
                });
              }}
            >
              Track
            </Button>
            {request.riderPhone && (
              <Button
                size="small"
                accessoryRight={CallIcon}
                status="basic"
                onPress={handleCall}
              >
                Contact
              </Button>
            )}
          </Layout>
        </Layout>
        {request.type == "rider" && (
          <Button
            style={{ marginTop: 20 }}
            size="large"
            status="primary"
            onPress={async () => {
              const requestDoc = doc(db, "requests", request.id);
              const newFields = {
                delivered: true,
              };
              await updateDoc(requestDoc, newFields);
              navigation.goBack();
            }}
          >
            Complete
          </Button>
        )}
        {request.type == "agent" && (
          <>
            <Input
              style={{ marginTop: 25 }}
              size="large"
              status="primary"
              value={price}
              placeholder="Price for the Delivery"
              onChangeText={(nextValue) => setPrice(nextValue)}
            />
            <Button
              style={{ marginTop: 20 }}
              size="large"
              status="primary"
              onPress={() => {
                navigation.navigate("NewRider", {
                  requestID: request.id,
                  price,
                });
              }}
            >
              Continue
            </Button>
          </>
        )}
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
