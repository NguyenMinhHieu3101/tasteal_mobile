import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Text, useTheme } from "react-native-paper";

const CustomTabItem = ({
  title,
  amount,
  active,
  onPress,
}: {
  title: string;
  amount: string;
  active: boolean;
  onPress?: () => void;
}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
        padding: 8,
        borderBottomWidth: 2,
        borderColor: active ? theme.colors.primary : "transparent",
      }}
    >
      <Text
        variant="bodyLarge"
        style={{
          fontWeight: "700",
          color: active ? theme.colors.primary : "grey",
        }}
      >
        {title}
      </Text>
      <View
        style={{
          borderRadius: 100,
          paddingHorizontal: 8,
          backgroundColor: active ? theme.colors.primary : "grey",
          justifyContent: "center",
        }}
      >
        <Text variant="bodySmall" style={{ fontWeight: "700", color: "white" }}>
          {amount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomTabItem;
