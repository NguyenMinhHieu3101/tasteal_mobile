import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Divider,
  Icon,
  MD3Theme,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDebounce } from '@uidotdev/usehooks';
import { IngredientEntity } from '../api/models/entities/IngredientEntity/IngredientEntity';
import { IngredientService } from '../api/services/ingredientService';
import IngredientItem from '../components/common/collections/IngredientItem';
import RowIngredientItem from '../components/common/collections/RowIngredientItem';
import TastealTextInput from '../components/common/inputs/TastealTextInput';
import { PADDING_HORIZONTAL, ROUTES } from '../constants/common';
import { useSpinner } from '../hooks';

export type IngredientFilterMode = 'included' | 'excluded';

const IngredientFilter = ({ route }) => {
  //#region Mode

  const [mode, setMode] = useState<IngredientFilterMode>('included');
  useEffect(() => {
    if (!route.params.mode) return;
    setMode(route.params.mode);
  }, [route.params.mode]);

  //#endregion
  //#region Hooks

  const theme = useTheme();
  const styles = getStyles(theme);
  const spin = useSpinner();
  const navigation = useNavigation<NavigationProp<any>>();

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

  const includedIngredients = useMemo(() => {
    return route.params.includedIngredients || [];
  }, [route.params.includedIngredients]);
  const excludedIngredients = useMemo(() => {
    return route.params.excludedIngredients || [];
  }, [route.params.excludedIngredients]);
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientEntity[]
  >([]);
  useEffect(() => {
    const foundSelectedIngredients: IngredientEntity[] = [];
    if (mode === 'included') {
      ingredients.forEach((ingredient) => {
        if (includedIngredients.includes(ingredient.id)) {
          foundSelectedIngredients.push(ingredient);
        }
      });
    } else if (mode === 'excluded') {
      ingredients.forEach((ingredient) => {
        if (excludedIngredients.includes(ingredient.id)) {
          foundSelectedIngredients.push(ingredient);
        }
      });
    }
    setSelectedIngredients(foundSelectedIngredients);
  }, [ingredients]);

  const handleSelectIngredient = useCallback((ingredient: IngredientEntity) => {
    setSelectedIngredients((prev) => {
      if (prev.includes(ingredient)) {
        return prev;
      } else {
        return [ingredient, ...prev];
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
  //#region Handlers

  const handleConfirm = () => {
    if (mode === 'included') {
      navigation.navigate(ROUTES.Search, {
        includedIngredients: selectedIngredients.map((i) => i.id),
        excludedIngredients: excludedIngredients,
      });
    } else if (mode === 'excluded') {
      navigation.navigate(ROUTES.Search, {
        includedIngredients: includedIngredients,
        excludedIngredients: selectedIngredients.map((i) => i.id),
      });
    }
  };
  const handleGoBack = () => {
    navigation.navigate(ROUTES.Search, {
      includedIngredients: includedIngredients,
      excludedIngredients: excludedIngredients,
    });
  };

  //#endregion

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content]}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon source="close" size={20} />
        </TouchableOpacity>

        <Text
          variant="headlineSmall"
          style={{ fontWeight: 'bold', color: theme.colors.primary }}
        >
          Tìm kiếm với Nguyên liệu
        </Text>
        <TastealTextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Tìm nguyên liệu phổ biến"
          right={<TextInput.Icon icon="magnify" />}
        />

        <Divider />

        <Text
          variant="titleLarge"
          style={{ fontWeight: 'bold', color: theme.colors.primary }}
        >
          Nguyên liệu đã chọn
        </Text>

        {selectedIngredients.length <= 0 ? (
          <Text
            style={{
              textAlign: 'center',
              color: theme.colors.primary,
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}
          >
            Chọn nguyên liệu để lọc công thức ngay!
          </Text>
        ) : null}
        <View
          style={{
            // top inner shadow
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -4,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
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
            contentContainerStyle={
              getStyles(theme, {
                loading,
                hasSelected: selectedIngredients.length > 0,
              }).selectedIngredientFlatList
            }
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <Divider />

        <Text
          variant="titleLarge"
          style={{ fontWeight: 'bold', color: theme.colors.primary }}
        >
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

        <Button
          mode="contained"
          style={styles.confirmButton}
          disabled={selectedIngredients.length === 0}
          onPress={handleConfirm}
        >
          TÌM KIẾM VỚI {selectedIngredients.length} NGUYÊN LIỆU
        </Button>
      </View>
    </SafeAreaView>
  );
};

const getStyles = (
  theme?: MD3Theme,
  options?: { loading?: boolean; hasSelected?: boolean }
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 60,
      paddingBottom: 12,
      paddingHorizontal: PADDING_HORIZONTAL,
      backgroundColor: theme.colors.background,
      position: 'relative',
    },
    content: {
      gap: 12,
      height: '100%',
    },
    selectedIngredientFlatList: {
      paddingTop: 8,
      minHeight: options?.loading || !options?.hasSelected ? 0 : 240,
    },
    ingredientsFlatList: {
      flexGrow: 1,
    },
    confirmButton: {
      // position: 'absolute',
      // bottom: 0,
    },
  });

export default IngredientFilter;
