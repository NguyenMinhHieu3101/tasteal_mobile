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
import useFirebaseImage from '../../../api/hooks/useFirebaseImage';
import { IngredientRes } from '../../../api/models/dtos/Response/IngredientRes/IngredientRes';

type RowIngredientItemProps = {
  item: IngredientRes;
  style?: StyleProp<ViewStyle> | undefined;
};

const RowIngredientItem: FC<RowIngredientItemProps> = ({ item, style }) => {
  const imageUrl = useFirebaseImage(item.image || '');

  return (
    <View style={[styles.container, style || {}]}>
      <View
        style={{
          position: 'relative',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 32,
          width: 64,
          height: 64,
          flex: 2,
        }}
      >
        <Image source={{ uri: imageUrl }} style={[styles.image]} />

        <View style={{ flex: 1 }}>
          <Text
            variant="titleSmall"
            style={[styles.name, { fontWeight: 'bold' }]}
          >
            {item.name}
          </Text>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 90 }}>
          <Text>{item.amount}</Text>
          <Text variant="titleSmall" style={styles.name}>
            {item.isLiquid ? 'ml' : 'g'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 8,
    flexDirection: 'row',
    width: '100%',
    gap: 36,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  name: {
    textAlign: 'left',
  },
});

export default memo(RowIngredientItem);
