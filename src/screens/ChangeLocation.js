import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Layout, Button, Input, Icon } from "@ui-kitten/components";
import Screen from "../components/Screen";

export default function ({ navigation }) {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("Loading...");
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [mapMarker, setMapMarker] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  let apiKey = "AIzaSyD87ToWqo4Y8vIjlgURucGldvbD5h44l3k";

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      Location.setGoogleApiKey(apiKey);
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setMapRegion({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setMapMarker({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });
      let address = await Location.reverseGeocodeAsync({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });
      address.find((place) => {
        setAddress(
          "No." + place.streetNumber + ", " + place.street + ", " + place.city
        );
      });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

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
        value={address}
        placeholder={address}
        onChangeText={(nextValue) => setAddress(nextValue)}
        accessoryLeft={renderIcon}
        disabled
      />

      <Layout style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ ...StyleSheet.absoluteFillObject }}
          initialRegion={mapRegion}
        >
          <Marker coordinate={mapMarker} />
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
