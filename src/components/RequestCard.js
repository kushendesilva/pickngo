import React, { useContext } from "react";
import { Text, Card, Icon, Layout, useTheme } from "@ui-kitten/components";
import { ThemeContext } from "../configs/Theme";

export const RequestCard = ({ id, date, onPress, style }) => {
  const themeContext = useContext(ThemeContext);
  const theme = useTheme();

  return (
    <Card
      onPress={onPress}
      style={{ marginHorizontal: "5%", marginVertical: "1%" }}
    >
      <Layout>
        <Layout
          style={
            (style,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
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
              style={{ width: 25, height: 25, marginRight: 25 }}
              fill={
                themeContext.theme == "light"
                  ? theme["color-info-default"]
                  : theme["color-info-100"]
              }
              name="cube"
            />
            <Layout style={{ justifyContent: "center" }}>
              <Text category="h6" style={{ fontWeight: "bold" }}>
                #{id}
              </Text>
              <Text category="label">{date}</Text>
            </Layout>
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
