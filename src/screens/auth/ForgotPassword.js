import React, { useState } from "react";
import { ScrollView, Image } from "react-native";
import { Button, Layout, Text, Input } from "@ui-kitten/components";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Screen from "../../components/Screen";

export default function ({ navigation }) {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function reset() {
    setLoading(true);
    await sendPasswordResetEmail(auth, email)
      .then(function () {
        setLoading(false);
        navigation.navigate("Login");
        alert("Your password reset link has been sent to your email");
      })
      .catch(function (error) {
        setLoading(false);
        alert(error);
      });
  }

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <Layout
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            resizeMode="contain"
            style={{
              height: 220,
              width: 220,
            }}
            source={require("../../../assets/images/forgot.png")}
          />
        </Layout>
        <Layout
          style={{
            flex: 3,
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: 10,
            }}
            category="h5"
          >
            Forgot Password
          </Text>
          <Input
            style={{ marginHorizontal: "2%", marginVertical: "1%" }}
            size="large"
            status="primary"
            value={email}
            label="Email"
            placeholder="Your Email"
            onChangeText={(nextValue) => setEmail(nextValue)}
          />
          <Button
            size="large"
            style={{
              marginTop: 20,
              marginHorizontal: 10,
            }}
            disabled={loading}
            onPress={() => {
              reset();
            }}
          >
            {loading ? "Loading" : "Send email"}
          </Button>

          <Layout
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
              justifyContent: "center",
            }}
          >
            <Button
              onPress={() => {
                navigation.navigate("Login");
              }}
              appearance="ghost"
              status="primary"
            >
              <Text size="md">Already have an account? </Text>
              Login here
            </Button>
          </Layout>
        </Layout>
      </ScrollView>
    </Screen>
  );
}
