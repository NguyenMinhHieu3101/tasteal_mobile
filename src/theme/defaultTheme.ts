import { DefaultTheme } from "react-native-paper";

const TopicColor = "#00404e";
const SubColor = "#ffe6d4";

export const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: TopicColor,
    secondary: SubColor,
    background: "#fffaf9",
  },
};
