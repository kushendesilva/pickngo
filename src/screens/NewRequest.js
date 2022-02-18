import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Layout, Input, Button, Icon } from "@ui-kitten/components";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { LocationCard } from "../components/LocationCard";
import Screen from "../components/Screen";

export default function ({ navigation, route }) {
  const { request } = route.params;
  const [pickDate, setDate] = useState(new Date());
  const [pickTime, setTime] = useState(new Date());
  const [dateShow, setDateShow] = useState(true);
  const [timeShow, setTimeShow] = useState(false);
  const [address, setAddress] = useState(
    "No.42, Vijithapura Rd, Sri Jayawardenepura Kotte"
  );
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

  const renderIcon = (props) => <Icon {...props} name="search" />;

  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Request Information"}
    >
      <LocationCard
        icon="clock"
        title={date}
        location={time}
        onPress={showDatepicker}
      />
      <Input
        accessoryLeft={renderIcon}
        style={{ margin: "2%", marginHorizontal: "5%" }}
        size="large"
        status="primary"
        value={address}
        placeholder={address}
        onChangeText={(nextValue) => setAddress(nextValue)}
        disabled
      />

      <Layout style={{ flex: 1, marginTop: 5 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ ...StyleSheet.absoluteFillObject }}
          initialRegion={{
            latitude: request.lat,
            longitude: request.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: request.lat,
              longitude: request.long,
            }}
          />
        </MapView>
      </Layout>

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
          navigation.navigate("Confirmation", {
            request: {
              date,
              time,
              user: request.user,
              name: request.name,
              phone: request.phone,
              pickAd: request.pickAd,
              pickLat: request.pickLat,
              pickLong: request.pickLong,
              dropAd: request.pickAd,
              dropLat: request.pickLat,
              dropLong: request.pickLong,
              lat: request.lat,
              long: request.long,
            },
          });
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
