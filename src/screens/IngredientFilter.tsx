import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { MD3Theme, Text, TextInput, useTheme } from 'react-native-paper';
import { IngredientEntity } from '../api/models/entities/IngredientEntity/IngredientEntity';
import { IngredientService } from '../api/services/ingredientService';
import IngredientItem from '../components/common/collections/IngredientItem';
import TastealTextInput from '../components/common/inputs/TastealTextInput';
import { useSpinner } from '../hooks';

const IngredientFilter = ({ navigation }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const spin = useSpinner();

  const [search, setSearch] = useState('');
  const [ingredients, setIngredients] = useState<IngredientEntity[]>([]);

  useEffect(() => {
    let active = true;

    spin();
    (async () => {
      let entites;

      try {
        entites = await IngredientService.GetAll(1000000);
        console.log('entites', entites);
      } catch (error) {
        console.log('error', error);
      } finally {
        spin(false);
      }

      if (!active) return;

      setIngredients(entites);
    })();

    return () => {
      active = false;
    };
  }, []);

  console.log(ingredients);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content]}>
        <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>
          Tìm kiếm với Nguyên liệu
        </Text>
        <TastealTextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Tìm nguyên liệu phổ biến"
          right={<TextInput.Icon icon="magnify" />}
        />
        <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
          Nguyên liệu đã chọn
        </Text>

        <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
          Gợi ý cho bạn
        </Text>

        <FlatList
          data={ingredients}
          keyExtractor={(i) => i.id.toString()}
          renderItem={({ item }) => (
            <IngredientItem name={item.name} image={item.image} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme?: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 60,
      marginHorizontal: 20,
      backgroundColor: theme.colors.background,
    },
    content: {
      gap: 12,
    },
  });

export default IngredientFilter;
