import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import {
  MD3Theme,
  Searchbar,
  SearchbarProps,
  TextInput,
  TextInputProps,
  useTheme,
} from 'react-native-paper';

const TastealSearchbar: FC<SearchbarProps> = (props) => {
  const theme = useTheme();

  const styles = getStyles(theme);

  return (
    <Searchbar
      {...props}
      theme={{
        roundness: 12,
        ...props.theme,
      }}
    />
  );
};

const getStyles = (theme?: MD3Theme) =>
  StyleSheet.create({
    contentStyle: {},
    outlinedStyle: {
      borderWidth: 0,
      backgroundColor: '#e1e1e1',
    },
  });

export default TastealSearchbar;
