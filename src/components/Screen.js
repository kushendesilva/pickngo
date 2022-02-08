import React, { useContext } from "react";
import {
  Layout,
  Icon,
  TopNavigation,
  TopNavigationAction,
  Text,
} from "@ui-kitten/components";
import { StatusBar } from "react-native";
import { ThemeContext } from "../configs/Theme";
import RenderIf from "../configs/RenderIf";

function Screen({ children, backAction, headerTitle }) {
  const themeContext = useContext(ThemeContext);

  const BackIcon = (props) => <Icon {...props} name="arrow-ios-back" />;
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={backAction} />
  );

  if (backAction) {
    return (
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          accessoryLeft={BackAction}
          title={() => <Text>{headerTitle}</Text>}
        />
        {RenderIf(
          themeContext.theme == "light",
          <StatusBar backgroundColor="white" barStyle="dark-content" />
        )}
        {RenderIf(
          themeContext.theme == "dark",
          <StatusBar backgroundColor="#222b45" barStyle="light-content" />
        )}
        {children}
      </Layout>
    );
  }

  if (headerTitle) {
    return (
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          alignment="center"
          title={() => (
            <Text category="h6" style={{ fontWeight: "bold" }}>
              {headerTitle}
            </Text>
          )}
        />
        {RenderIf(
          themeContext.theme == "light",
          <StatusBar backgroundColor="white" barStyle="dark-content" />
        )}
        {RenderIf(
          themeContext.theme == "dark",
          <StatusBar backgroundColor="#222b45" barStyle="light-content" />
        )}
        {children}
      </Layout>
    );
  }

  return (
    <Layout style={{ flex: 1 }}>
      {RenderIf(
        themeContext.theme == "light",
        <StatusBar backgroundColor="white" barStyle="dark-content" />
      )}
      {RenderIf(
        themeContext.theme == "dark",
        <StatusBar backgroundColor="#222b45" barStyle="light-content" />
      )}
      {children}
    </Layout>
  );
}

export default Screen;
