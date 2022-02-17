import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore/lite";
import { Input, Button, Icon, Layout } from "@ui-kitten/components";
import RenderIf from "../configs/RenderIf";
import Screen from "../components/Screen";

export default function ({ navigation, route }) {
  const { user } = route.params;
  const auth = getAuth();
  const db = getFirestore();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [visibility, setVisibility] = useState(true);

  const EditIcon = (props) => <Icon {...props} name="edit-2-outline" />;
  const CancelIcon = (props) => <Icon {...props} name="slash-outline" />;
  const SaveIcon = (props) => <Icon {...props} name="save-outline" />;

  async function reset() {
    await sendPasswordResetEmail(auth, user.email)
      .then(function () {
        navigation.goBack();
        alert("Your password reset link has been sent to your email");
      })
      .catch(function (error) {
        alert(error);
      });
  }

  const updateUser = async () => {
    const testCollectionRef = doc(db, "users", user.id);
    await setDoc(testCollectionRef, {
      name,
      id: user.id,
      email: user.email,
      phone,
    });
  };

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
          keyboardType="number-pad"
          style={{ marginHorizontal: "2%", marginVertical: "1%" }}
          size="large"
          status="primary"
          value={phone}
          label="Phone"
          placeholder="Change Your Phone Number"
          onChangeText={(nextValue) => setPhone(nextValue)}
          disabled={visibility}
        />
        <Input
          style={{ marginHorizontal: "2%", marginVertical: "1%" }}
          size="large"
          status="primary"
          value={user.email}
          label="Email"
          disabled={true}
        />
        <Button
          style={{ alignSelf: "center", marginVertical: 10, width: 300 }}
          status="basic"
          disabled={visibility}
          onPress={() => {
            reset();
          }}
        >
          Reset Password
        </Button>

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
                setVisibility(!visibility);
                updateUser();
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
