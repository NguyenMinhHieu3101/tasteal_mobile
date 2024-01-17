import React, { FC } from 'react';
import { View } from 'react-native';
import { Chip, Text } from 'react-native-paper';

type ChipListProps = {
  chips: { id: number; name: string }[];
  onAdd?: () => void;
  onRemove?: (id: number) => void;
};

const ChipList: FC<ChipListProps> = ({ chips, onAdd, onRemove }) => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {chips &&
        chips.length > 0 &&
        chips.map((i) => (
          <Chip key={i.id} onClose={() => onRemove && onRemove(i.id)}>
            <Text>{i.name}</Text>
          </Chip>
        ))}
      <Chip icon="plus" onPress={onAdd}>
        Thêm
      </Chip>
    </View>
  );
};

export { ChipList };
