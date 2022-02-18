import React, { useContext } from "react";
import {
  Text,
  Card,
  Icon,
  Layout,
  Button,
  useTheme,
} from "@ui-kitten/components";
import { PaymentIcon } from "react-native-payment-icons";
import { ThemeContext } from "../configs/Theme";

export const PaymentCard = ({ type, number, onPress, style }) => {
  const themeContext = useContext(ThemeContext);
  const TrashIcon = (props) => <Icon {...props} name="trash-2" />;
  return (
    <Card disabled style={{ marginHorizontal: "5%", marginVertical: "1%" }}>
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
            <PaymentIcon type={type} style={{ marginRight: 20 }} />
            <Layout>
              <Text
                category="h6"
                style={{ fontWeight: "bold", textTransform: "capitalize" }}
              >
                {type}
              </Text>
              <Text category="label">**** **** **** {number}</Text>
            </Layout>
          </Layout>
          <Button
            onPress={onPress}
            accessoryRight={TrashIcon}
            status={themeContext.theme == "light" ? "info" : "basic"}
            appearance="ghost"
          />
        </Layout>
      </Layout>
    </Card>
  );
};
