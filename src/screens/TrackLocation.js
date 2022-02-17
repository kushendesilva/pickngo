import React from "react";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Layout, Text } from "@ui-kitten/components";
import Screen from "../components/Screen";

export default function ({ navigation, route }) {
  const { marker } = route.params;
  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Track Delivery"}
    >
      <Layout style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ ...StyleSheet.absoluteFillObject }}
          initialRegion={{
            latitude: marker.lat,
            longitude: marker.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: marker.lat,
              longitude: marker.long,
            }}
            image={require("../../assets/images/truck.png")}
          />
          <Marker
            coordinate={{
              latitude: marker.pickLat,
              longitude: marker.pickLong,
            }}
          />
          <Marker
            coordinate={{
              latitude: marker.dropLat,
              longitude: marker.dropLong,
            }}
          />
        </MapView>
      </Layout>
    </Screen>
  );
}
