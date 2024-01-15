import React, { FC, memo, useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import useFirebaseImage from '../../../api/hooks/useStorageImage';
import { IngredientEntity } from '../../../api/models/entities/IngredientEntity/IngredientEntity';

type IngredientItemProps = {
  item: IngredientEntity;
  onTap?: (ingredient: IngredientEntity) => void;
};

const IngredientItem: FC<IngredientItemProps> = ({ item, onTap }) => {
  const imageUrl = useFirebaseImage(item.image || '');

  const handleTap = useCallback(() => {
    if (onTap) {
      onTap(item);
    }
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={handleTap}>
      <Image source={{ uri: imageUrl }} style={[styles.image]} />
      <Text variant="titleSmall" style={styles.name}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 32,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 100,
  },
  name: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default memo(IngredientItem);
