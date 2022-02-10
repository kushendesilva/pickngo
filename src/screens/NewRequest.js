import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Layout, Text, Button } from "@ui-kitten/components";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Screen from "../components/Screen";

export default function ({ navigation }) {
  const [pickDate, setDate] = useState(new Date());
  const [pickTime, setTime] = useState(new Date());
  const [dateShow, setDateShow] = useState(true);
  const [timeShow, setTimeShow] = useState(false);
  const date = pickDate.toLocaleDateString();
  const time = pickTime.toLocaleTimeString("en-GB").slice(0, -3);

  const onDateChange = (event, selectedDate) => {
    setDateShow(false);
    const currentDate = selectedDate || pickDate;
    setDate(currentDate);
    setTimeShow(true);
  };
  const onTimeChange = (event, selectedTime) => {
    setTimeShow(false);
    const currentTime = selectedTime || pickTime;
    setTime(currentTime);
  };

  const showDatepicker = () => {
    setDateShow(true);
  };

  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Request Information"}
    >
      <Layout
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          margin: 10,
          marginTop: 0,
        }}
      >
        <Layout>
          <Text category="label" style={{ margin: "2%", fontWeight: "bold" }}>
            Selected Date: {date}
          </Text>
          <Text category="label" style={{ margin: "2%", fontWeight: "bold" }}>
            Selected Time: {time}
          </Text>
        </Layout>
        <Button size="small" onPress={showDatepicker}>
          Change
        </Button>
      </Layout>
      <Layout style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ ...StyleSheet.absoluteFillObject }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
          />
        </MapView>
      </Layout>
      <Button
        style={{ margin: 20 }}
        onPress={() => {
          navigation.navigate("Confirmation");
        }}
      >
        Continue
      </Button>
      {dateShow && (
        <DateTimePicker
          testID="datePicker"
          value={pickDate}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}
      {timeShow && (
        <DateTimePicker
          testID="timePicker"
          value={pickTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
        />
      )}
    </Screen>
  );
}
