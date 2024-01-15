import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import {
  MD3Theme,
  TextInput,
  TextInputProps,
  useTheme,
} from 'react-native-paper';

const TastealTextInput: FC<TextInputProps> = (props) => {
  const theme = useTheme();

  const styles = getStyles(theme);

  return (
    <TextInput
      {...props}
      mode="outlined"
      theme={{
        roundness: 12,
        ...props.theme,
      }}
      contentStyle={[styles.contentStyle, props.contentStyle]}
      outlineStyle={[styles.outlinedStyle, props.outlineStyle]}
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

export default TastealTextInput;
