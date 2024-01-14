import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const StarRating = ({ rating, onStarPress }:{rating: number, onStarPress?: (rating: number) => void}) => {
  const starIcons = [];

  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= rating;
    starIcons.push(
      <TouchableOpacity
        key={i}
        onPress={() => onStarPress(i)}
        style={styles.icon}
      >
        <Icon name="star" size={15} color={isFilled ? '#f4b846' : '#e8e8e8'} />
      </TouchableOpacity>
    );
  }
  return <View style={styles.container}>{starIcons}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 1,
  },
});

export default StarRating;
