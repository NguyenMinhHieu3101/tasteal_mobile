import { View, Text, ViewStyle } from "react-native";
import React from "react";
import Container from "./Container";

const Header = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) => {
  return (
    <Container style={{ flex: 0, paddingBottom: 16, ...style }}>
      {children}
    </Container>
  );
};

export default Header;
