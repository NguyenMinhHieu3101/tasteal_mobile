import { View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";

function CartItemFrame({
  children,
  label,
}: {
  children?: React.ReactNode;
  label: string;
}) {
  return (
    <>
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: 10,
          overflow: "hidden",
          marginVertical: 20,
        }}
      >
        <Text
          variant="titleMedium"
          style={{
            width: "100%",
            textAlign: "left",
            color: "grey",
            fontWeight: "bold",
            margin: 10,
          }}
        >
          {label}
        </Text>
        {children}
      </View>
    </>
  );
}

export default CartItemFrame;
