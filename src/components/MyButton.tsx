import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const MyButton = ({
  label = '',
  labelColor = 'black',
  backgroundColor = 'white',
  borderColor = 'black',
  onPress,
  width,
  height,
  startIcon,
  endIcon,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        backgroundColor
          ? { backgroundColor: backgroundColor }
          : { backgroundColor: 'white' },
        borderColor ? { borderColor: borderColor } : { borderColor: 'black' },
        width ? { width: width } : { width: '100%' },
        height ? { height: height } : { height: 35 },
      ]}
      onPress={onPress}
    >
      <View style={styles.buttonContainer}>
        {startIcon}
        <Text style={[styles.buttonText, { color: labelColor }]}>{label}</Text>
        {endIcon}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    borderWidth: 1.5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  buttonText: {
    fontSize: 14,
    textTransform: 'uppercase',
  },
});

export default MyButton;
