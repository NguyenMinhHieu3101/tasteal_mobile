import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { MD3Theme, Text, TextInput, useTheme } from 'react-native-paper';

import { useDebounce } from '@uidotdev/usehooks';
import { IngredientEntity } from '../api/models/entities/IngredientEntity/IngredientEntity';
import { IngredientService } from '../api/services/ingredientService';
import IngredientItem from '../components/common/collections/IngredientItem';
import RowIngredientItem from '../components/common/collections/RowIngredientItem';
import TastealTextInput from '../components/common/inputs/TastealTextInput';
import { useSpinner } from '../hooks';

const PADDING_HORIZONTAL = 20;

const IngredientFilter = ({ navigation }) => {
  //#region Hooks

  const theme = useTheme();
  const styles = getStyles(theme);
  const spin = useSpinner();

  //#endregion
  //#region State

  const [firstTime, setFirstTime] = useState(true); // Set to false after data loaded
  const [loading, setLoading] = useState(false);

  //#endregion
  //#region Ingredients + Search

  // Ingredients
  const [ingredients, setIngredients] = useState<IngredientEntity[]>([]);
  useEffect(() => {
    let active = true;
    setLoading(true);

    (async () => {
      let entities;

      spin(true);
      try {
        entities = await IngredientService.GetAll(1000000);
      } catch (error) {
        console.log('error', error);
      } finally {
      }

      if (!active) return;

      setIngredients(entities);
      setLoading(false);
      setFirstTime(false);
      spin(false);
    })();

    return () => {
      active = false;
    };
  }, []);

  // Search
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [searchResults, setSearchResulst] = useState<IngredientEntity[]>([]);

  useEffect(() => {
    if (firstTime || loading) return;
    spin(true);

    if (debouncedSearchTerm === '') {
      setSearchResulst(ingredients);
      spin(false);
      return;
    }

    setSearchResulst(
      ingredients.filter((i) =>
        i.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    );
    spin(false);
  }, [debouncedSearchTerm, ingredients, loading, firstTime]);

  //#endregion
  //#region Selection

  // Ingredient selection
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientEntity[]
  >([]);
  const handleSelectIngredient = useCallback((ingredient: IngredientEntity) => {
    setSelectedIngredients((prev) => {
      if (prev.includes(ingredient)) {
        return prev;
      } else {
        return [...prev, ingredient];
      }
    });
  }, []);
  const handleDeselectIngredient = useCallback(
    (ingredient: IngredientEntity) => {
      setSelectedIngredients((prev) => prev.filter((i) => i != ingredient));
    },
    []
  );

  //#endregion
  //#region Rendering stuffs

  const [flatListWidth, setFlatListWidth] = useState(0);
  const handleLayout = (event) => {
    setFlatListWidth(event.nativeEvent.layout.width);
  };

  const renderIngredient = useCallback(
    ({ item }) => {
      const selected = Boolean(
        selectedIngredients.find((i) => i.id === item.id)
      );
      return (
        <IngredientItem
          item={item}
          selected={selected}
          onPress={handleSelectIngredient}
        />
      );
    },
    [selectedIngredients]
  );

  //#endregion

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content]}>
        <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>
          Tìm kiếm với Nguyên liệu
        </Text>
        <TastealTextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
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
            <RowIngredientItem
              item={item}
              onTap={handleDeselectIngredient}
              removeable
              style={{
                width: flatListWidth / 4,
              }}
            />
          )}
          horizontal={true}
          contentContainerStyle={styles.selectedIngredientFlatList}
          showsHorizontalScrollIndicator={false}
        />

        <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
          Gợi ý cho bạn
        </Text>

        <FlatList
          key="ingredient-flat-list"
          data={searchResults}
          keyExtractor={(i) => i.id.toString()}
          renderItem={renderIngredient}
          horizontal={false}
          numColumns={4}
          onLayout={handleLayout}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ingredientsFlatList}
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
      paddingHorizontal: PADDING_HORIZONTAL,
      backgroundColor: theme.colors.background,
    },
    content: {
      gap: 12,
    },
    selectedIngredientFlatList: {
      overflow: 'visible',
      height: 'auto',
      paddingBottom: 32,
    },
    ingredientsFlatList: {
      paddingBottom: 512,
    },
  });

export default IngredientFilter;
