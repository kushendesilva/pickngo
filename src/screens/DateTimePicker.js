import React from "react";
import { Layout, Text, Button, Calendar } from "@ui-kitten/components";
import { TimePickerModal } from "react-native-paper-dates";
import Screen from "../components/Screen";

export default function ({ navigation }) {
  const [date, setDate] = React.useState(new Date());
  const [visible, setVisible] = React.useState(false);
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      console.log({ hours, minutes });
    },
    [setVisible]
  );
  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Date & Time Picker"}
    >
      <Layout style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", margin: "5%" }} category="h6">
          Choose the Pickup Date
        </Text>
        <Calendar date={date} onSelect={(nextDate) => setDate(nextDate)} />
        <Text category="label" style={{ margin: "2%", fontWeight: "bold" }}>
          Selected date: {date.toLocaleDateString()}
        </Text>
        <TimePickerModal
          visible={visible}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          hours={12} // default: current hours
          minutes={14} // default: current minutes
          label="Select time" // optional, default 'Select time'
          uppercase={false} // optional, default is true
          cancelLabel="Cancel" // optional, default: 'Cancel'
          confirmLabel="Ok" // optional, default: 'Ok'
          animationType="fade" // optional, default is 'none'
          locale="en" // optional, default is automically detected by your system
        />
        <Button onPress={() => setVisible(true)}>Pick time</Button>
        <Button
          onPress={() => {
            navigation.navigate("DropLocation");
          }}
        >
          Confirm
        </Button>
      </Layout>
    </Screen>
  );
}
