import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import {
  query,
  where,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import Screen from "../components/Screen";
import { RequestCard } from "../components/RequestCard";

export default function ({ navigation }) {
  const auth = getAuth();
  const db = getFirestore();

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
  };

  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Ongoing Deliveries"}
    >
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getList} />
        }
        data={list}
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
                  },
                });
              }}
            />
          )
        }
      />
    </Screen>
  );
}
