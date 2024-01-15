import React, { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import useFirebaseImage from '../../../api/hooks/useStorageImage';

type IngredientItemProps = {
  name: string;
  image?: string;
};

const IngredientItem: FC<IngredientItemProps> = ({ name, image }) => {
  const imageUrl = useFirebaseImage(image || '');

  return (
    <TouchableOpacity>
      <Image source={{ uri: imageUrl }} style={[styles.image]} />
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

export default IngredientItem;

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
});
