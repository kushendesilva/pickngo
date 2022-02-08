import React, { useState, useContext } from "react";
import { ScrollView, Image, TouchableWithoutFeedback } from "react-native";
import {
  Button,
  Layout,
  Text,
  Icon,
  Input,
  OverflowMenu,
  TopNavigationAction,
  TopNavigation,
  MenuItem,
} from "@ui-kitten/components";
import Screen from "../../components/Screen";
import { ThemeContext } from "../../configs/Theme";

export default function ({ navigation }) {
  const themeContext = useContext(ThemeContext);
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
  const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;
  const DarkIcon = (props) => <Icon {...props} name="moon-outline" />;
  const LightIcon = (props) => <Icon {...props} name="sun-outline" />;

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderRightActions = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}
      >
        <MenuItem
          onPress={themeContext.toggleTheme}
          accessoryLeft={themeContext.theme == "dark" ? LightIcon : DarkIcon}
          title={themeContext.theme == "dark" ? "Light theme" : "Dark theme"}
        />
      </OverflowMenu>
    </React.Fragment>
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
          <TopNavigation
            style={{ position: "absolute", right: 0, top: 0 }}
            accessoryRight={renderRightActions}
          />
          <Image
            resizeMode="contain"
            style={{
              height: 220,
              width: 220,
            }}
            source={require("../../../assets/images/login.png")}
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
            Welcome Back!
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
          <Input
            style={{ marginHorizontal: "2%", marginVertical: "1%" }}
            size="large"
            status="primary"
            value={password}
            label="Password"
            placeholder="Your Password"
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={(nextValue) => setPassword(nextValue)}
          />
          <Button
            size="large"
            style={{
              marginTop: 20,
              marginHorizontal: 10,
            }}
            disabled={loading}
            onPress={() => {
              navigation.navigate("MainTabs");
            }}
          >
            {loading ? "Loading" : "Login"}
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
                navigation.navigate("Register");
              }}
              appearance="ghost"
              status="primary"
            >
              <Text size="md">Don't have an account? </Text>
              Register here
            </Button>
          </Layout>
          <Layout
            style={{
              flexDirection: "row",
              alignItems: "center",

              justifyContent: "center",
            }}
          >
            <Button
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
              appearance="ghost"
              status="primary"
            >
              Forgot password
            </Button>
          </Layout>
        </Layout>
      </ScrollView>
    </Screen>
  );
}
