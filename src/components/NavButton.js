import React from "react";
import { Button, Text, Card, Icon, Layout } from "@ui-kitten/components";

export const NavButton = ({ icon, title, onPress, style }) => {
  const ArrowIcon = (props) => (
    <Icon {...props} name="arrow-ios-forward-outline" />
  );
  return (
    <Card
      onPress={onPress}
      style={{ marginHorizontal: "3%", marginVertical: "1%" }}
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
            <Button
              onPress={onPress}
              accessoryRight={<Icon name={icon} />}
              status="primary"
              appearance="ghost"
            />
            <Text category="h6" style={{ fontWeight: "bold" }}>
              {title}
            </Text>
          </Layout>
          <Button
            onPress={onPress}
            accessoryRight={ArrowIcon}
            status="primary"
            appearance="ghost"
          />
        </Layout>
      </Layout>
    </Card>
  );
};
