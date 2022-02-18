import React, { useContext } from "react";
import { Text, Card, useTheme, Button } from "@ui-kitten/components";
import { ThemeContext } from "../configs/Theme";

export const NewCard = ({ onPress, isProfile = false }) => {
  const themeContext = useContext(ThemeContext);
  const theme = useTheme();
  return (
    <Card
      disabled
      style={{
        marginHorizontal: "5%",
        marginVertical: "1%",
        backgroundColor: theme["color-info-default"],
        borderColor:
          themeContext.theme == "light"
            ? theme["color-info-default"]
            : theme["color-info-100"],
      }}
    >
      <Text
        category="h5"
        style={{
          fontWeight: "bold",
          color: theme["color-info-100"],
          marginBottom: 10,
        }}
      >
        Wanna Schedule a Pickup?
      </Text>
      <Text
        style={{ color: theme["color-info-100"], marginVertical: 10 }}
        category="label"
      >
        Pick & Go fully vetted team is standing by ready to deliver your
        packages. To meet and exceed customer expectations. All agents of ours
        are ready to deliver fast and first-rate customer service.
      </Text>
      <Button
        disabled={isProfile}
        onPress={onPress}
        style={{ borderRadius: 5, marginVertical: 20 }}
        status="control"
      >
        New Request
      </Button>
      {isProfile && (
        <Button
          onPress={onPress}
          style={{ borderRadius: 5, marginBottom: 20, marginTop: -10 }}
          status="control"
        >
          Complete Profile
        </Button>
      )}
    </Card>
  );
};
