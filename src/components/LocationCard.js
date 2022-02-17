import React from "react";
import {
  Text,
  Card,
  Icon,
  Layout,
  useTheme,
  Button,
} from "@ui-kitten/components";

export const LocationCard = ({
  title = "Pickup Location",
  location,
  onPress,
  style,
  icon = "pin",
}) => {
  const theme = useTheme();
  return (
    <Card
      disabled
      style={[
        style,
        {
          marginHorizontal: "5%",
          marginVertical: "1%",
          backgroundColor: theme["color-info-100"],
        },
      ]}
    >
      <Layout
        style={{
          backgroundColor: theme["color-info-100"],
        }}
      >
        <Layout
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: theme["color-info-100"],
          }}
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
              name={icon}
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
                {title}
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
