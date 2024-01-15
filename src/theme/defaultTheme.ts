import { DefaultTheme } from "react-native-paper";

const TopicColor = "#00404e";
const SubColor = "#ffe6d4";

export const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: TopicColor,
    primaryContainer: TopicColor,
    secondary: SubColor,
    secondaryContainer: SubColor,
    background: "#fffaf9",
  },
};
