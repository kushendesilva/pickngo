import React from "react";
import { setDoc, doc, getFirestore } from "firebase/firestore/lite";
import Screen from "../components/Screen";
import { InfoCard } from "../components/InfoCard";

export default function ({ navigation, route }) {
  const { request } = route.params;
  const db = getFirestore();
  const id = Date.now().toString();

  const createRequest = async () => {
    const testCollectionRef = doc(db, "requests", id);
    await setDoc(testCollectionRef, {
      date: request.date,
      time: request.time,
      user: request.user,
      name: request.name,
      phone: request.phone,
      id,
      pickAd: request.pickAd,
      pickLat: request.pickLat,
      pickLong: request.pickLong,
      dropAd: request.pickAd + 0.02,
      dropLat: request.pickLat + 0.02,
      dropLong: request.pickLong,
      lat: request.lat,
      long: request.long,
      delivered: false,
      rider: null,
    });
    navigation.navigate("MainTabs");
  };

  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Confirmation"}
    >
      <InfoCard
        id={id}
        date={request.date}
        time={request.time}
        pickup={request.pickAd}
        drop={request.dropAd}
        onConfirmPress={createRequest}
        onChangePress={() => {
          navigation.goBack();
        }}
      />
    </Screen>
  );
}
