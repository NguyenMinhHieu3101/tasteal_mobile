import { View, TouchableOpacity } from "react-native";
import React from "react";
import Container from "../../common/Container";
import { Text, useTheme } from "react-native-paper";

const AddIngredient = ({ onPress }: { onPress?: () => void }) => {
  const theme = useTheme();
  return (
    <View style={{ width: "100%", backgroundColor: theme.colors.background }}>
      <Container style={{ flex: 0, paddingVertical: 16 }}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            width: "100%",
            backgroundColor: theme.colors.primary,
            borderRadius: 100,
            padding: 12,
            alignItems: "center",
          }}
        >
          <Text
            variant="bodyLarge"
            style={{ fontWeight: "700", color: "white" }}
          >
            Thêm nguyên liệu
          </Text>
        </TouchableOpacity>
      </Container>
    </View>
  );
};

export default AddIngredient;
