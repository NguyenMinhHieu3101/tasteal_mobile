import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Banner,
  MD3Theme,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { IngredientEntity } from '../api/models/entities/IngredientEntity/IngredientEntity';
import { IngredientService } from '../api/services/ingredientService';
import IngredientItem from '../components/common/collections/IngredientItem';
import TastealTextInput from '../components/common/inputs/TastealTextInput';
import { useSpinner } from '../hooks';

const IngredientFilter = ({ navigation }) => {
  // Hooks
  const theme = useTheme();
  const styles = getStyles(theme);
  const spin = useSpinner();

  const [search, setSearch] = useState('');
  const [ingredients, setIngredients] = useState<IngredientEntity[]>([]);
  useEffect(() => {
    let active = true;

    (async () => {
      let entites;

      spin(true);
      try {
        entites = await IngredientService.GetAll(1000000);
      } catch (error) {
        console.log('error', error);
      } finally {
      }

      if (!active) return;

      setIngredients(entites);
      spin(false);
    })();

    return () => {
      active = false;
    };
  }, []);

  // Ingredient selection
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientEntity[]
  >([]);
  const handleSelectIngredient = useCallback((ingredient: IngredientEntity) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients((prev) => {
        if (prev.includes(ingredient)) {
          return prev;
        }
        return [...prev, ingredient];
      });
    }
  }, []);
  const handleUnselectIngredient = useCallback(
    (ingredient: IngredientEntity) => {
      setSelectedIngredients((prev) => {
        return prev.filter((i) => i != ingredient);
      });
    },
    []
  );

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
        <FlatList
          key="selected-ingredient-flat-list"
          data={selectedIngredients}
          keyExtractor={(i) => i.id.toString()}
          renderItem={({ item }) => (
            <IngredientItem item={item} onTap={handleSelectIngredient} />
          )}
          horizontal={false}
          numColumns={4}
          style={styles.ingredientList}
        />

        <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
          Gợi ý cho bạn
        </Text>

        <FlatList
          key="ingredient-flat-list"
          data={ingredients}
          keyExtractor={(i) => i.id.toString()}
          renderItem={({ item }) => (
            <IngredientItem item={item} onTap={handleSelectIngredient} />
          )}
          horizontal={false}
          numColumns={4}
          style={styles.ingredientList}
        />
      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme?: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 60,
      paddingHorizontal: 20,
      backgroundColor: theme.colors.background,
    },
    content: {
      gap: 12,
    },
    ingredientList: {
      rowGap: 200,
    },
  });

export default IngredientFilter;
