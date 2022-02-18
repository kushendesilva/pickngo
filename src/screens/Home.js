import React, { useState, useEffect, useContext } from "react";
import { FlatList, RefreshControl } from "react-native";
import * as Location from "expo-location";
import { getAuth } from "firebase/auth";
import {
  getDoc,
  doc,
  getFirestore,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore/lite";
import { Icon, Layout, Text, Card, useTheme } from "@ui-kitten/components";
import { ThemeContext } from "../configs/Theme";
import Screen from "../components/Screen";
import { OngoingCard } from "../components/OngoingCard";
import { LocationCard } from "../components/LocationCard";
import { NewCard } from "../components/NewCard";
import { RequestCard } from "../components/RequestCard";
import RenderIf from "../configs/RenderIf";

export default function ({ navigation }) {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser.uid;
  const themeContext = useContext(ThemeContext);
  const theme = useTheme();
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

  const [profile, setProfile] = useState({ name: "", phone: "" });

  useEffect(() => {
    getNote();
  }, []);

  const getNote = async () => {
    const docSnap = await getDoc(doc(db, "users", user));
    if (docSnap.exists()) {
      const userData = docSnap.data();
      setProfile(userData);
    } else {
      const userData = { name: "", phone: "" };
      setProfile(userData);
    }
  };

  const [refreshing, setRefreshing] = useState(true);
  const [agentList, setAgentList] = useState([]);
  useEffect(() => {
    getAgentList();
  }, []);

  const getAgentList = async () => {
    const q = query(collection(db, "requests"), where("rider", "==", null));
    const querySnapshot = await getDocs(q);
    setAgentList(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    setRefreshing(false);
    if (querySnapshot.empty) {
      setAgentList(null);
    }
  };

  const [riderList, setRiderList] = useState([]);
  useEffect(() => {
    getRiderList();
  }, []);

  const getRiderList = async () => {
    const q = query(collection(db, "requests"), where("riderID", "==", user));
    const querySnapshot = await getDocs(q);
    setRiderList(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    setRefreshing(false);
    if (querySnapshot.empty) {
      setRiderList(null);
    }
  };

  return (
    <>
      {RenderIf(
        profile.type == null,
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
          {profile.name == "" || profile.phone == "" ? (
            <NewCard
              isProfile
              onPress={() =>
                navigation.navigate("ProfileInformation", {
                  user: {
                    email: auth.currentUser.email,
                    id: auth.currentUser.uid,
                    name: profile.name,
                    phone: profile.phone,
                  },
                })
              }
            />
          ) : (
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
                    name: profile.name,
                    phone: profile.phone,
                  },
                });
              }}
            />
          )}
        </Screen>
      )}
      {RenderIf(
        profile.type == "rider",
        <Screen headerTitle="Ongoing Requests">
          <FlatList
            ListHeaderComponent={
              <>
                {riderList == null && (
                  <Layout
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <Card
                      style={{
                        margin: "2%",
                        backgroundColor: theme["color-info-default"],
                        borderColor:
                          themeContext.theme == "light"
                            ? theme["color-info-default"]
                            : theme["color-info-100"],
                        borderRadius: 10,
                        elevation: 5,
                      }}
                    >
                      <Icon
                        style={{
                          width: 30,
                          height: 30,
                          alignSelf: "center",
                          margin: 20,
                        }}
                        fill={theme["color-info-100"]}
                        name="sync"
                      />
                      <Text
                        style={{
                          textAlign: "center",
                          color: theme["color-info-100"],
                          fontWeight: "bold",
                        }}
                        category="label"
                      >
                        No Requests Available, Pull to Refresh...
                      </Text>
                    </Card>
                  </Layout>
                )}
              </>
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={getRiderList}
              />
            }
            data={riderList}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) =>
              item.delivered == false && (
                <RequestCard
                  delivered={false}
                  id={item.id}
                  date={item.date}
                  onPress={() => {
                    navigation.navigate("Ongoing", {
                      request: {
                        id: item.id,
                        pickAd: item.pickAd,
                        dropAd: item.dropAd,
                        date: item.date,
                        time: item.time,
                        pickLat: item.pickLat,
                        pickLong: item.pickLong,
                        dropLat: item.dropLat,
                        dropLong: item.dropLong,
                        lat: item.lat,
                        long: item.long,
                        phone: item.phone,
                        name: item.name,
                        rider: item.name,
                        riderPhone: item.phone,
                        price: item.price,
                        type: "rider",
                      },
                    });
                  }}
                />
              )
            }
          />
        </Screen>
      )}
      {RenderIf(
        profile.type == "agent",
        <Screen headerTitle="New Requests">
          <FlatList
            ListHeaderComponent={
              <>
                {agentList == null && (
                  <Layout
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <Card
                      style={{
                        margin: "2%",
                        backgroundColor: theme["color-info-default"],
                        borderColor:
                          themeContext.theme == "light"
                            ? theme["color-info-default"]
                            : theme["color-info-100"],
                        borderRadius: 10,
                        elevation: 5,
                      }}
                    >
                      <Icon
                        style={{
                          width: 30,
                          height: 30,
                          alignSelf: "center",
                          margin: 20,
                        }}
                        fill={theme["color-info-100"]}
                        name="sync"
                      />
                      <Text
                        style={{
                          textAlign: "center",
                          color: theme["color-info-100"],
                          fontWeight: "bold",
                        }}
                        category="label"
                      >
                        No Requests Available, Pull to Refresh...
                      </Text>
                    </Card>
                  </Layout>
                )}
              </>
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={getAgentList}
              />
            }
            data={agentList}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => (
              <RequestCard
                id={item.id}
                date={item.date}
                onPress={() => {
                  navigation.navigate("Ongoing", {
                    request: {
                      id: item.id,
                      pickAd: item.pickAd,
                      dropAd: item.dropAd,
                      date: item.date,
                      time: item.time,
                      pickLat: item.pickLat,
                      pickLong: item.pickLong,
                      dropLat: item.dropLat,
                      dropLong: item.dropLong,
                      lat: item.lat,
                      long: item.long,
                      phone: item.phone,
                      name: item.name,
                      rider: item.name,
                      riderPhone: item.phone,
                      price: item.price,
                      type: "agent",
                    },
                  });
                }}
              />
            )}
          />
        </Screen>
      )}
    </>
  );
}
