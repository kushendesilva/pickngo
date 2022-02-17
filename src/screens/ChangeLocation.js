import React from "react";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Layout, Button, Input, Icon } from "@ui-kitten/components";
import Screen from "../components/Screen";

export default function ({ navigation, route }) {
  const { location } = route.params;

  const renderIcon = (props) => <Icon {...props} name="search" />;

  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Pickup Location"}
    >
      <Input
        style={{ marginHorizontal: 10, marginVertical: 10 }}
        size="large"
        status="primary"
        value={location.address}
        placeholder="Search location"
        accessoryLeft={renderIcon}
        disabled
      />

      <Layout style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ ...StyleSheet.absoluteFillObject }}
          initialRegion={location.mapRegion}
        >
          <Marker coordinate={location.mapMarker} />
        </MapView>
        <Button
          size="large"
          style={{
            margin: 20,
            position: "absolute",
            bottom: 0,
            width: 300,
            alignSelf: "center",
          }}
          onPress={() => {
            navigation.navigate("MainTabs");
          }}
        >
          Done
        </Button>
      </Layout>
    </Screen>
  );
}
