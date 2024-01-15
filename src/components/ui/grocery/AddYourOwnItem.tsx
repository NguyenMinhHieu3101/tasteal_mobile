import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Button, IconButton, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const AddYourOwnItem = () => {
  return (
    <View style={{ flex: 1, flexDirection: "row", marginTop: 35 }}>
      <TouchableOpacity
        style={{
          borderRadius: 100,
          height: 50,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons name="add" size={24} color="black" />
          <Text variant="bodyMedium" style={{ fontWeight: "700" }}>
            THÊM NGUYÊN LIỆU
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddYourOwnItem;
