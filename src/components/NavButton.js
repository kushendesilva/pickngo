import React, { useContext } from "react";
import { Text, Card, Icon, Layout, useTheme } from "@ui-kitten/components";
import { ThemeContext } from "../configs/Theme";

export const NavButton = ({ icon, title, onPress, style }) => {
  const themeContext = useContext(ThemeContext);
  const theme = useTheme();

  return (
    <Card
      onPress={onPress}
      style={{ marginHorizontal: "3%", marginVertical: "1%", padding: "2%" }}
    >
      <Layout>
        <Layout
          style={
            (style,
            {
              flexDirection: "row",
              justifyContent: "space-between",
            })
          }
        >
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Icon
              style={{ width: 20, height: 20, marginRight: 20 }}
              fill={
                themeContext.theme == "light"
                  ? theme["color-info-default"]
                  : theme["color-info-100"]
              }
              name={icon}
            />
            <Text category="h6" style={{ fontWeight: "bold" }}>
              {title}
            </Text>
          </Layout>
          <Icon
            style={{ width: 20, height: 20 }}
            fill={
              themeContext.theme == "light"
                ? theme["color-info-default"]
                : theme["color-info-100"]
            }
            name="arrow-ios-forward"
          />
        </Layout>
      </Layout>
    </Card>
  );
};
