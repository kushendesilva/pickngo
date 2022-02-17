import React from "react";
import { Text, Card, Icon, Layout, useTheme } from "@ui-kitten/components";

export const RequestCard = ({ id, date, onPress, style, delivered = true }) => {
  const theme = useTheme();

  return (
    <Card
      onPress={onPress}
      style={{
        marginHorizontal: "5%",
        marginVertical: "1%",
        backgroundColor:
          delivered == true
            ? theme["color-info-100"]
            : theme["color-success-default"],
      }}
    >
      <Layout>
        <Layout
          style={
            (style,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor:
                delivered == true
                  ? theme["color-info-100"]
                  : theme["color-success-default"],
            })
          }
        >
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor:
                delivered == true
                  ? theme["color-info-100"]
                  : theme["color-success-default"],
            }}
          >
            <Icon
              style={{ width: 25, height: 25, marginRight: 25 }}
              fill={theme["color-info-default"]}
              name="cube"
            />
            <Layout
              style={{
                justifyContent: "center",
                backgroundColor:
                  delivered == true
                    ? theme["color-info-100"]
                    : theme["color-success-default"],
              }}
            >
              <Text
                category="h6"
                style={{
                  fontWeight: "bold",
                  color: theme["color-info-default"],
                }}
              >
                #{id}
              </Text>
              <Text
                category="label"
                style={{ color: theme["color-info-default"] }}
              >
                {date}
              </Text>
            </Layout>
          </Layout>
          <Icon
            style={{ width: 20, height: 20 }}
            fill={theme["color-info-default"]}
            name="arrow-ios-forward"
          />
        </Layout>
      </Layout>
    </Card>
  );
};
