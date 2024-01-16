import { View, Text, ViewStyle, SafeAreaView } from "react-native";
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
    <SafeAreaView>
      <Container style={{ flex: 0, paddingBottom: 16, ...style }}>
        {children}
      </Container>
    </SafeAreaView>
  );
};

export default Header;
