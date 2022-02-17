import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { getAuth } from "firebase/auth";
import Screen from "../components/Screen";
import { OngoingCard } from "../components/OngoingCard";
import { LocationCard } from "../components/LocationCard";
import { NewCard } from "../components/NewCard";

export default function ({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser.uid;
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("Loading...");
  const trimmedAddress = address.substring(0, 35) + "...";
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 6.880622,
    longitude: 79.9116138,
  });
  const [mapMarker, setMapMarker] = useState({
    latitude: 6.880622,
    longitude: 79.9116138,
  });
  const [lat, setLat] = useState(6.880622);
  const [long, setLong] = useState(79.9116138);
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
      setLat(location.coords.latitude);
      setLong(location.coords.longitude);
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

  return (
    <Screen headerTitle="Home">
      <LocationCard
        location={trimmedAddress}
        onPress={() => {
          navigation.navigate("ChangeLocation", {
            location: {
              mapMarker: mapMarker,
              mapRegion: mapRegion,
              address: address,
            },
          });
        }}
      />
      <OngoingCard
        onPress={() => {
          navigation.navigate("OngoingRequests");
        }}
      />
      <NewCard
        onPress={() => {
          navigation.navigate("NewRequest", {
            request: {
              user,
              pickAd: address,
              pickLat: lat,
              pickLong: long,
              lat: 6.870622,
              long: 79.9216138,
            },
          });
        }}
      />
    </Screen>
  );
}
