import React, { useCallback, useContext } from "react";
import { Linking } from "react-native";
import {
  Button,
  Icon,
  ButtonGroup,
  Layout,
  Text,
  Card,
  useTheme,
} from "@ui-kitten/components";
import Screen from "../components/Screen";
import { ThemeContext } from "../configs/Theme";

export default function ({ navigation }) {
  const themeContext = useContext(ThemeContext);
  const theme = useTheme();

  const handleFBPress = useCallback(async () => {
    await Linking.openURL("https://www.facebook.com/ciphernpc/");
  }, []);
  const handleGooglePress = useCallback(async () => {
    await Linking.openURL("mailto: kushenthimira@gmail.com");
  }, []);
  const handleTwitterPress = useCallback(async () => {
    await Linking.openURL("https://twitter.com/kushenthimira");
  }, []);
  const handleGHPress = useCallback(async () => {
    await Linking.openURL("https://github.com/kushenthimira/posify/releases");
  }, []);
  const FacebookIcon = (props) => <Icon {...props} name="facebook-outline" />;
  const GoogleIcon = (props) => <Icon {...props} name="google-outline" />;
  const TwitterIcon = (props) => <Icon {...props} name="twitter-outline" />;
  const GithubIcon = (props) => <Icon {...props} name="github-outline" />;

  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Help"}
    >
      <Layout
        style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
      >
        <Card
          style={{
            margin: "2%",
            marginTop: 0,
            backgroundColor: theme["color-info-default"],
            borderColor:
              themeContext.theme == "light"
                ? theme["color-info-default"]
                : theme["color-info-100"],
            borderRadius: 10,
            elevation: 5,
          }}
          disabled
        >
          <ButtonGroup
            status="control"
            style={{ alignSelf: "center", marginBottom: 10 }}
            appearance="ghost"
          >
            <Button accessoryLeft={FacebookIcon} onPress={handleFBPress} />
            <Button accessoryLeft={TwitterIcon} onPress={handleTwitterPress} />
            <Button accessoryLeft={GoogleIcon} onPress={handleGooglePress} />
          </ButtonGroup>
          <Text
            category="label"
            style={{
              textAlign: "center",
              color: theme["color-info-100"],
              fontWeight: "bold",
            }}
          >
            Contact Us via Social Media
          </Text>
        </Card>
        <Card
          style={{
            margin: "2%",
            backgroundColor: theme["color-info-default"],
            borderColor:
              themeContext.theme == "light"
                ? theme["color-info-default"]
                : theme["color-info-100"],
            borderRadius: 10,
            elevation: 5,
          }}
          onPress={handleGHPress}
        >
          <ButtonGroup
            style={{ alignSelf: "center" }}
            status="control"
            appearance="ghost"
          >
            <Button accessoryLeft={GithubIcon} onPress={handleGHPress} />
          </ButtonGroup>
          <Text
            style={{
              textAlign: "center",
              color: theme["color-info-100"],
              fontWeight: "bold",
            }}
            category="label"
          >
            Visit our GitHub page for Release Details
          </Text>
        </Card>
      </Layout>
    </Screen>
  );
}
