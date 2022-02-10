import React from "react";
import {
  Layout,
  Button,
  Icon,
  Card,
  Text,
  useTheme,
} from "@ui-kitten/components";

export const ProfileCard = ({ email, onPress, onEditPress, name }) => {
  const LogoutIcon = (props) => <Icon {...props} name="log-out" />;
  const EditIcon = (props) => <Icon {...props} name="edit-2" />;
  const theme = useTheme();
  return (
    <Card
      status="basic"
      style={{ marginHorizontal: "3%", marginBottom: "1%" }}
      disabled
    >
      <Layout
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          style={{
            position: "absolute",
            right: 1,
            top: 1,
            borderRadius: 5,
          }}
          size="tiny"
          status="basic"
          onPress={onEditPress}
          accessoryRight={EditIcon}
        >
          Edit
        </Button>
        <Layout
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            backgroundColor: "#edf1f7",
            padding: "3%",
            marginBottom: "3%",
            borderRadius: 25,
            elevation: 2,
          }}
        >
          <Icon
            style={{ width: 40, height: 40 }}
            fill={theme["color-info-default"]}
            name="person"
          />
        </Layout>
        <Text style={{ margin: "1%", fontWeight: "bold" }} category="h6">
          {name}
        </Text>
        <Text style={{ margin: "1%" }} category="label">
          {email.charAt(0).toUpperCase() + email.slice(1)}
        </Text>
      </Layout>
      <Layout
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: "2%",
        }}
      >
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
