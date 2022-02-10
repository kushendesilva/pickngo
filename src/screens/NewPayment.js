import React, { useContext } from "react";
import { Layout, useTheme } from "@ui-kitten/components";
import Screen from "../components/Screen";
import { CreditCardInput } from "react-native-credit-card-input-view";
import { ThemeContext } from "../configs/Theme";

export default function ({ navigation }) {
  const themeContext = useContext(ThemeContext);
  const theme = useTheme();

  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"New Payment"}
    >
      <Layout style={{ marginTop: 80 }}>
        <CreditCardInput
          autoFocus
          requiresName
          requiresCVC
          cardScale={1.0}
          labelStyle={{
            color:
              themeContext.theme == "dark"
                ? theme["color-info-100"]
                : theme["color-info-default"],
            fontSize: 12,
          }}
          inputStyle={{
            fontSize: 16,
            color:
              themeContext.theme == "dark"
                ? theme["color-info-100"]
                : theme["color-info-default"],
          }}
          validColor={
            themeContext.theme == "dark"
              ? theme["color-info-100"]
              : theme["color-info-default"]
          }
          invalidColor={theme["color-danger-default"]}
          placeholderColor={theme["color-info-400"]}
        />
      </Layout>
    </Screen>
  );
}
