import { View, ViewStyle } from "react-native";

function Container({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View style={{ flex: 1, paddingHorizontal: 20, ...style }}>{children}</View>
  );
}

export default Container;
