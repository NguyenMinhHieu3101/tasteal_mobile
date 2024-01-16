import { FC, memo, useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton, MD3Theme, Text, useTheme } from 'react-native-paper';
import useFirebaseImage from '../../../api/hooks/useStorageImage';
import { IngredientEntity } from '../../../api/models/entities/IngredientEntity/IngredientEntity';

type IngredientItemProps = {
  item: IngredientEntity;
  selected?: boolean;
  onPress?: (ingredient: IngredientEntity) => void;
  removeable?: boolean;
};

const IngredientItem: FC<IngredientItemProps> = ({
  item,
  selected = false,
  removeable = false,
  onPress: onTap,
}) => {
  const theme = useTheme();

  const imageUrl = useFirebaseImage(item.image || '');

  const handleTap = useCallback(() => {
    if (onTap) {
      onTap(item);
    }
  }, []);

  return (
    <TouchableOpacity
      style={[styles.container, { opacity: selected ? 0.3 : 1 }]}
      onPress={handleTap}
    >
      <Image source={{ uri: imageUrl }} style={[styles.image]} />
      <Text
        variant="titleSmall"
        style={[styles.name, { color: theme.colors.primary }]}
      >
        {item.name}
      </Text>
      {removeable && (
        <IconButton
          icon="close"
          iconColor="white"
          containerColor="black"
          size={10}
          style={styles.removeIcon}
        />
      )}
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
  removeIcon: {
    position: 'absolute',
    top: -12,
    left: 0,
  },
});

export default memo(IngredientItem);
