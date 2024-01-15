import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import useFirebaseImage from '../../../api/hooks/useStorageImage';

type IngredientItemProps = {
  name: string;
  image?: string;
};

const IngredientItem: FC<IngredientItemProps> = ({ name, image }) => {
  const imageUrl = useFirebaseImage(image || '');

  return (
    <View>
      <Image source={{ uri: imageUrl }} style={[styles.image]} />
      <Text>{name}</Text>
    </View>
  );
};

export default IngredientItem;

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
  },
});
