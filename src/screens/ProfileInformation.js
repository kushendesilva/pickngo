import React, { useState } from "react";
import { TouchableNativeFeedback } from "react-native";
import { Input, Button, Icon, Layout } from "@ui-kitten/components";
import RenderIf from "../configs/RenderIf";
import Screen from "../components/Screen";

export default function ({ navigation }) {
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@pickngo.com");
  const [password, setPassword] = useState("");
  const [visibility, setVisibility] = useState(true);

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableNativeFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableNativeFeedback>
  );
  const EditIcon = (props) => <Icon {...props} name="edit-2-outline" />;
  const CancelIcon = (props) => <Icon {...props} name="slash-outline" />;
  const SaveIcon = (props) => <Icon {...props} name="save-outline" />;

  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Account Information"}
    >
      <Layout style={{ padding: 10 }}>
        <Input
          style={{ marginHorizontal: "2%", marginVertical: "1%" }}
          size="large"
          status="primary"
          value={name}
          label="Name"
          placeholder="Change Your Name"
          onChangeText={(nextValue) => setName(nextValue)}
          disabled={visibility}
        />
        <Input
          style={{ marginHorizontal: "2%", marginVertical: "1%" }}
          size="large"
          status="primary"
          value={email}
          label="Email"
          placeholder="Change Your Email"
          onChangeText={(nextValue) => setEmail(nextValue)}
          disabled={true}
        />
        <Input
          style={{ marginHorizontal: "2%", marginVertical: "1%" }}
          size="large"
          status="primary"
          value={password}
          label="Password"
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          placeholder="Enter Your New Password"
          onChangeText={(nextValue) => setPassword(nextValue)}
          disabled={true}
        />

        {RenderIf(
          visibility,
          <Button
            accessoryRight={EditIcon}
            style={{ alignSelf: "center", marginTop: "2%" }}
            status="warning"
            size="giant"
            onPress={() => {
              setVisibility(!visibility);
            }}
          >
            Change
          </Button>
        )}
        {RenderIf(
          !visibility,
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: "2%",
            }}
          >
            <Button
              accessoryRight={CancelIcon}
              status="danger"
              size="giant"
              onPress={() => {
                setVisibility(!visibility);
              }}
            >
              Cancel
            </Button>
            <Button
              accessoryRight={SaveIcon}
              status="success"
              size="giant"
              onPress={() => {
                navigation.goBack();
              }}
            >
              Update
            </Button>
          </Layout>
        )}
      </Layout>
    </Screen>
  );
}
