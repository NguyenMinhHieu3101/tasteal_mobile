import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { QueryFieldFilterConstraint } from 'firebase/firestore';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Chip,
  Dialog,
  Drawer,
  MD3Theme,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { useRecipeSearch } from '../api/hooks';
import { IngredientEntity } from '../api/models/entities/IngredientEntity/IngredientEntity';
import { RecipeEntity } from '../api/models/entities/RecipeEntity/RecipeEntity';
import SmallRecipeCard from '../components/common/collections/SmallRecipeCard';
import TastealTextInput from '../components/common/inputs/TastealTextInput';
import { PADDING_HORIZONTAL, ROUTES, SMALL_GAP } from '../constants/common';
import { ingredients } from '../constants/sampleData';
import { useSpinner } from '../hooks';

let cache: RecipeEntity[];
let time: number;

const ITEM_AMOUNT = 12;

const Search = ({ route }) => {
  //#region Hooks

  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();
  const spin = useSpinner();

  //#endregion
  //#region Styles

  const styles = getStyles(theme);

  //#endregion
  //#region Search

  const {
    recipes,
    searchReq,
    resetSearchReq,
    handleSearchReqChange,
    searchTerm,
    handleSearchTermChange,
    // tuKhoas,
    // handleChangeTuKhoa,
    loadNext,
    end,
    sortType,
    handleSort,
  } = useRecipeSearch(ITEM_AMOUNT);

  //#endregion
  //#region Filtering

  const handleIncludedIngredientTabClick = () => {
    navigation.navigate(ROUTES.IngredientFilter, {
      includedIngredients: includedIngredients.map(
        (ingredient) => ingredient.id
      ),
    });
  };

  //#endregion
  //#region Routing

  const handleCardPress = useCallback((id: number) => {
    navigation.navigate(ROUTES.RecipeDetail, { recipeId: id });
  }, []);

  //#endregion

  const [selectedTime, setSelectedTime] = useState<TimeFilterValue>(null);
  const handleTimePressed = (time: TimeFilterValue) => {
    if (selectedTime === time) {
      setSelectedTime(null);
      handleSearchReqChange('TotalTime', null);
      return;
    }

    setSelectedTime(time);
    if (time === 'custom') {
      return;
    }
    handleSearchReqChange('TotalTime', time);
  };

  const [selectedCalories, setSelectedCalories] =
    useState<CaloriesFilterValue>(null);
  const handleCaloriesPressed = (value: CaloriesFilterValue) => {
    if (value === selectedCalories) {
      setSelectedCalories(null);
      handleSearchReqChange('Calories', null);
      return;
    }

    if (value === null) {
      setSelectedCalories(null);
      handleSearchReqChange('Calories', { min: 0, max: 5000 });
      return;
    }
    if (value === 'custom') {
      setSelectedCalories('custom');
      return;
    }

    setSelectedCalories(value);
    if (value.includes('>')) {
      handleSearchReqChange('Calories', {
        min: Number(value.split('>')[1]),
        max: 5000,
      });
      return;
    }

    if (value.includes('<')) {
      handleSearchReqChange('Calories', {
        min: 0,
        max: Number(value.split('<')[1]),
      });
      return;
    }

    const [min, max] = value.split('-');
    handleSearchReqChange('Calories', { min: Number(min), max: Number(max) });
  };

  // Ingredient
  const [includedIngredients, setIncludedIngredients] = useState<
    IngredientEntity[]
  >([]);
  useEffect(() => {
    if (
      !route.params ||
      !route.params.includedIngredients ||
      route.params.includedIngredients.length <= 0
    ) {
      setIncludedIngredients([]);
      return;
    }

    const ids = route.params.includedIngredients;
    const foundSelectedIngredients: IngredientEntity[] = [];
    ingredients.forEach((ingredient) => {
      if (ids.includes(ingredient.id)) {
        foundSelectedIngredients.push(ingredient);
      }
    });
    setIncludedIngredients(foundSelectedIngredients);
  }, [route.params?.includedIngredients]);
  useEffect(() => {
    handleSearchReqChange(
      'IngredientID',
      includedIngredients.map((i) => i.id)
    );
  }, [includedIngredients]);

  const handleIncludeIngredientRemove = useCallback((id: number) => {
    setIncludedIngredients((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={[styles.content]}>
          <Text
            variant="headlineSmall"
            style={{ fontWeight: 'bold', color: theme.colors.primary }}
          >
            Khám phá các món mới
          </Text>

          <TastealTextInput
            value={searchTerm}
            placeholder="Tìm kiếm..."
            right={<TextInput.Icon icon="magnify" />}
            onChangeText={handleSearchTermChange}
          />

          <View style={{ gap: 8 }}>
            <Text
              variant="titleMedium"
              style={[styles.boldText, styles.primaryText]}
            >
              Thời gian
            </Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Chip
                onPress={() => handleTimePressed(15)}
                selected={selectedTime === 15}
                showSelectedOverlay
              >
                &lt; 15 phút
              </Chip>
              <Chip
                onPress={() => handleTimePressed(30)}
                selected={selectedTime === 30}
                showSelectedOverlay
              >
                &lt; 30 phút
              </Chip>
              <Chip
                onPress={() => handleTimePressed(60)}
                selected={selectedTime === 60}
                showSelectedOverlay
              >
                &lt; 60 phút
              </Chip>
            </View>
          </View>

          <View style={{ gap: 8 }}>
            <Text
              variant="titleMedium"
              style={[styles.boldText, styles.primaryText]}
            >
              Calories (Cal) / phần
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              <Chip
                onPress={() => handleCaloriesPressed('<200')}
                selected={selectedCalories === '<200'}
                showSelectedOverlay
              >
                &lt; 200
              </Chip>
              <Chip
                onPress={() => handleCaloriesPressed('200-400')}
                selected={selectedCalories === '200-400'}
                showSelectedOverlay
              >
                200 - 400
              </Chip>
              <Chip
                onPress={() => handleCaloriesPressed('400-600')}
                selected={selectedCalories === '400-600'}
                showSelectedOverlay
              >
                400 - 600
              </Chip>
              <Chip
                onPress={() => handleCaloriesPressed('600-800')}
                selected={selectedCalories === '600-800'}
                showSelectedOverlay
              >
                600 - 800
              </Chip>
              <Chip
                onPress={() => handleCaloriesPressed('>800')}
                selected={selectedCalories === '>800'}
                showSelectedOverlay
              >
                &gt; 800
              </Chip>
            </View>
          </View>

          <View style={{ gap: 8 }}>
            <Text
              variant="titleMedium"
              style={[styles.boldText, styles.primaryText]}
            >
              Bao gồm Nguyên liệu
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {includedIngredients &&
                includedIngredients.length > 0 &&
                includedIngredients.map((i) => (
                  <Chip
                    key={i.id}
                    onClose={() => handleIncludeIngredientRemove(i.id)}
                  >
                    {i.name}
                  </Chip>
                ))}
              <Chip icon="plus" onPress={handleIncludedIngredientTabClick}>
                Thêm
              </Chip>
            </View>
          </View>

          <FlatList
            data={recipes}
            renderItem={({ item }) => (
              <SmallRecipeCard recipe={item} onPressed={handleCardPress} />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ gap: SMALL_GAP }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

type TimeFilterValue = null | 15 | 30 | 60 | 'custom';
type CaloriesFilterValue =
  | null
  | '<200'
  | '200-400'
  | '400-600'
  | '600-800'
  | '>800'
  | 'custom';
type Ingredient = {
  id: number;
  name: string;
};

const getStyles = (theme?: MD3Theme) =>
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
    filterButton: {
      paddingHorizontal: 16,
      paddingVertical: 4,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 20,

      justifyContent: 'center',
      alignItems: 'center',
    },
    primaryText: {
      color: theme.colors.primary,
    },
    boldText: {
      fontWeight: 'bold',
    },
  });

export default Search;
