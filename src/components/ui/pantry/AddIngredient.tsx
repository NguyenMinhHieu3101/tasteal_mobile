import { View, Text } from "react-native";
import React from "react";
import Container from "../../common/Container";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "react-native-paper";

const AddIngredient = () => {
  const theme = useTheme();
  return (
    <LinearGradient
      colors={[
        theme.colors.primary + (0.5 * 255).toString,
        theme.colors.background,
      ]}
    >
      <Container style={{ flex: 0, height: 50 }}>
        <Text>AddIngredient</Text>
      </Container>
    </LinearGradient>
  );
};

export default AddIngredient;
