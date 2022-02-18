import React, { useState, useEffect, useContext } from "react";
import { FlatList, RefreshControl } from "react-native";
import {
  query,
  where,
  collection,
  getDocs,
  getFirestore,
  getDoc,
  doc,
} from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { Icon, Layout, Text, Card, useTheme } from "@ui-kitten/components";
import Screen from "../components/Screen";
import { RequestCard } from "../components/RequestCard";
import RenderIf from "../configs/RenderIf";
import { ThemeContext } from "../configs/Theme";

export default function ({ navigation }) {
  const auth = getAuth();
  const db = getFirestore();
  const themeContext = useContext(ThemeContext);
  const theme = useTheme();

  const [refreshing, setRefreshing] = useState(true);

  const [list, setList] = useState([]);
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const q = query(
      collection(db, "requests"),
      where("user", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    setList(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setRefreshing(false);
    if (querySnapshot.empty) {
      setList(null);
    }
  };

  const [riderList, setRiderList] = useState([]);
  useEffect(() => {
    getRiderList();
  }, []);

  const getRiderList = async () => {
    const q = query(
      collection(db, "requests"),
      where("riderID", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    setRiderList(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    setRefreshing(false);
    if (querySnapshot.empty) {
      setRiderList(null);
    }
  };

  const [agentList, setAgentList] = useState([]);
  useEffect(() => {
    getAgentList();
  }, []);

  const getAgentList = async () => {
    const q = query(collection(db, "requests"), where("rider", "!=", null));
    const querySnapshot = await getDocs(q);
    setAgentList(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    setRefreshing(false);
    if (querySnapshot.empty) {
      setAgentList(null);
    }
  };

  const [profile, setProfile] = useState({ name: "", phone: "" });

  useEffect(() => {
    getNote();
  }, []);

  const getNote = async () => {
    const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
    if (docSnap.exists()) {
      const userData = docSnap.data();
      setProfile(userData);
    } else {
      const userData = { name: "", phone: "" };
      setProfile(userData);
    }
  };

  return (
    <>
      {RenderIf(
        profile.type == null,
        <Screen headerTitle="Requests">
          <FlatList
            ListHeaderComponent={
              <>
                {list == null && (
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
              <RefreshControl refreshing={refreshing} onRefresh={getList} />
            }
            data={list}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) =>
              item.delivered == true ? (
                <RequestCard
                  id={item.id}
                  date={item.date}
                  onPress={() => {
                    navigation.navigate("Request", {
                      request: {
                        id: item.id,
                        pickAd: item.pickAd,
                        dropAd: item.dropAd,
                        date: item.date,
                        time: item.time,
                        phone: item.phone,
                        name: item.name,
                        rider: item.rider,
                        riderPhone: item.riderPhone,
                        price: item.price,
                      },
                    });
                  }}
                />
              ) : (
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
                        rider: item.rider,
                        riderPhone: item.riderPhone,
                        price: item.price,
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
        profile.type == "rider",
        <Screen headerTitle="Completed Requests">
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
              item.delivered == true && (
                <RequestCard
                  id={item.id}
                  date={item.date}
                  onPress={() => {
                    navigation.navigate("Request", {
                      request: {
                        id: item.id,
                        pickAd: item.pickAd,
                        dropAd: item.dropAd,
                        date: item.date,
                        time: item.time,
                        name: item.name,
                        rider: item.name,
                        price: item.price,
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
        <Screen headerTitle="Assigned Requests">
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
            renderItem={({ item }) =>
              item.delivered == true ? (
                <RequestCard
                  id={item.id}
                  date={item.date}
                  onPress={() => {
                    navigation.navigate("Request", {
                      request: {
                        id: item.id,
                        pickAd: item.pickAd,
                        dropAd: item.dropAd,
                        date: item.date,
                        time: item.time,
                        phone: item.phone,
                        name: item.name,
                        rider: item.name,
                        riderPhone: item.phone,
                        price: item.price,
                      },
                    });
                  }}
                />
              ) : (
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
                      },
                    });
                  }}
                />
              )
            }
          />
        </Screen>
      )}
    </>
  );
}
