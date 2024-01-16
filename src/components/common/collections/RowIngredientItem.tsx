import { FC, memo, useCallback } from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { IconButton, MD3Theme, Text } from 'react-native-paper';
import useFirebaseImage from '../../../api/hooks/useStorageImage';
import { IngredientEntity } from '../../../api/models/entities/IngredientEntity/IngredientEntity';

type RowIngredientItemProps = {
  item: IngredientEntity;
  onTap?: (ingredient: IngredientEntity) => void;
  removeable?: boolean;
  style?: StyleProp<ViewStyle> | undefined;
};

const RowIngredientItem: FC<RowIngredientItemProps> = ({
  item,
  removeable = false,
  onTap,
  style,
}) => {
  const imageUrl = useFirebaseImage(item.image || '');

  const handleTap = useCallback(() => {
    if (onTap) {
      onTap(item);
    }
  }, []);

  return (
    <View style={[styles.container, style || {}]}>
      <View style={{ position: 'relative' }}>
        <Image source={{ uri: imageUrl }} style={[styles.image]} />
        {removeable && (
          <IconButton
            icon="close"
            iconColor="white"
            containerColor="black"
            size={10}
            style={styles.removeIcon}
            onPress={handleTap}
          />
        )}
      </View>
      <Text variant="titleSmall" style={styles.name}>
        {item.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 8,
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
    left: -12,
  },
});

export default memo(RowIngredientItem);
