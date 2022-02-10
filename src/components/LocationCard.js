import React, { useContext } from "react";
import {
  Text,
  Card,
  Icon,
  Layout,
  useTheme,
  Button,
} from "@ui-kitten/components";

export const LocationCard = ({ location, onPress, style }) => {
  const theme = useTheme();
  return (
    <Card
      disabled
      style={{
        marginHorizontal: "5%",
        marginVertical: "1%",
        backgroundColor: theme["color-info-100"],
      }}
    >
      <Layout
        style={{
          backgroundColor: theme["color-info-100"],
        }}
      >
        <Layout
          style={
            (style,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: theme["color-info-100"],
            })
          }
        >
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor: theme["color-info-100"],
            }}
          >
            <Icon
              style={{ width: 25, height: 25, marginRight: 25 }}
              fill={theme["color-info-default"]}
              name="pin"
            />
            <Layout
              style={{
                justifyContent: "center",
                backgroundColor: theme["color-info-100"],
              }}
            >
              <Text
                category="h6"
                style={{
                  fontWeight: "bold",
                  color: theme["color-info-default"],
                }}
              >
                Pickup Location
              </Text>
              <Text
                style={{ color: theme["color-info-default"] }}
                category="label"
              >
                {location}
              </Text>
            </Layout>
          </Layout>
          <Button onPress={onPress} style={{ borderRadius: 20 }} status="info">
            Change
          </Button>
        </Layout>
      </Layout>
    </Card>
  );
};
