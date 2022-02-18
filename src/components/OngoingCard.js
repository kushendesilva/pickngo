import React from "react";
import {
  Text,
  Card,
  Icon,
  Layout,
  useTheme,
  Button,
} from "@ui-kitten/components";

export const OngoingCard = ({ onPress, style }) => {
  const theme = useTheme();
  return (
    <Card
      disabled
      style={{
        marginHorizontal: "5%",
        marginVertical: "1%",
        backgroundColor: theme["color-success-default"],
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
              backgroundColor: theme["color-success-default"],
            })
          }
        >
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor: theme["color-success-default"],
            }}
          >
            <Icon
              style={{ width: 25, height: 25, marginRight: 25 }}
              fill={theme["color-info-default"]}
              name="car"
            />
            <Layout
              style={{
                justifyContent: "center",
                backgroundColor: theme["color-success-default"],
              }}
            >
              <Text
                category="h6"
                style={{
                  fontWeight: "bold",
                  color: theme["color-info-default"],
                }}
              >
                Ongoing Requests
              </Text>
            </Layout>
          </Layout>
          <Button onPress={onPress} style={{ borderRadius: 20 }} status="info">
            Find
          </Button>
        </Layout>
      </Layout>
    </Card>
  );
};
