import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import {
  getFirestore,
  query,
  where,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore/lite";
import Screen from "../components/Screen";
import { LocationCard } from "../components/LocationCard";

export default function ({ navigation, route }) {
  const { requestID, price } = route.params;
  const db = getFirestore();
  const [refreshing, setRefreshing] = useState(true);
  const [agentList, setAgentList] = useState([]);

  useEffect(() => {
    getAgentList();
  }, []);

  const getAgentList = async () => {
    const q = query(collection(db, "users"), where("type", "==", "rider"));
    const querySnapshot = await getDocs(q);
    setAgentList(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    setRefreshing(false);
  };

  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle="Select Rider"
    >
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getAgentList} />
        }
        data={agentList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <LocationCard
            location={item.phone}
            title={item.name}
            icon="person"
            btnText="Select"
            onPress={async () => {
              const requestDoc = doc(db, "requests", requestID);
              const newFields = {
                rider: item.name,
                riderID: item.id,
                riderPhone: item.phone,
                price,
              };
              await updateDoc(requestDoc, newFields);
              navigation.navigate("MainTabs");
            }}
          />
        )}
      />
    </Screen>
  );
}
