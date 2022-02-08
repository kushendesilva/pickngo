import React, { useState } from "react";
import { ScrollView, Image, TouchableWithoutFeedback } from "react-native";
import { Button, Layout, Text, Icon, Input } from "@ui-kitten/components";
import Screen from "../../components/Screen";

export default function ({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

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
              navigation.navigate("Login");
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
