import React from "react";
import {
  Layout,
  Button,
  Icon,
  Card,
  Text,
  useTheme,
} from "@ui-kitten/components";
import { Pressable } from "react-native";

export const ProfileCard = ({ email, onPress, onEditPress, name }) => {
  const LogoutIcon = (props) => <Icon {...props} name="log-out" />;
  const theme = useTheme();

  return (
    <Card style={{ marginHorizontal: "3%", marginBottom: "1%" }} disabled>
      <Layout
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Layout
          style={{
            flexDirection: "row",
          }}
        >
          <Pressable
            onPress={onEditPress}
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              backgroundColor: "#edf1f7",
              padding: 10,
              borderRadius: 25,
              elevation: 2,
              marginRight: 15,
            }}
          >
            <Icon
              style={{ width: 40, height: 40 }}
              fill={theme["color-info-default"]}
              name="person"
            />
            <Icon
              style={{
                width: 15,
                height: 15,
                position: "absolute",
                right: -3,
                top: -3,
              }}
              fill={theme["color-info-default"]}
              name="edit-2"
            />
          </Pressable>
          <Layout style={{ justifyContent: "center" }}>
            <Text style={{ margin: "1%", fontWeight: "bold" }} category="h6">
              {name}
            </Text>
            <Text style={{ margin: "1%" }} category="label">
              {email.charAt(0).toUpperCase() + email.slice(1)}
            </Text>
          </Layout>
        </Layout>
        <Button
          style={{
            alignSelf: "center",
            marginVertical: "3%",
            borderRadius: 5,
          }}
          status="basic"
          onPress={onPress}
          accessoryRight={LogoutIcon}
        >
          Logout
        </Button>
      </Layout>
    </Card>
  );
};
