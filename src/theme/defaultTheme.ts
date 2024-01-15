import { DefaultTheme } from 'react-native-paper';

const TopicColor = '#00404e';
const SubColor = '#ffe6d4';

export const defaultTheme: typeof DefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: TopicColor,
    inversePrimary: '#fff',
    primaryContainer: TopicColor,
    secondary: SubColor,
    secondaryContainer: SubColor,
    background: '#fffaf9',
  },
};
