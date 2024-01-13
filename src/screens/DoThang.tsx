import { View, SafeAreaView } from "react-native";
import React from "react";
import { ROUTES } from "../constants/common";
import { Button, Text } from "react-native-paper";

const DoThang = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          gap: 16,
          flex: 1,
          justifyContent: "space-around",
          paddingHorizontal: 16,
        }}
      >
        {Object.entries(ROUTES).map((route) => (
          <Button
            mode="contained"
            key={route[0]}
            onPress={() => {
              navigation.navigate(route[1]);
            }}
          >
            <Text
              variant="labelLarge"
              style={{ color: "white", fontWeight: "bold" }}
            >
              {route}
            </Text>
          </Button>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default DoThang;
