import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Banner,
  Chip,
  Divider,
  Icon,
  List,
  MD3Theme,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

import { useRecipeSearch } from '../api/hooks';
import { IngredientEntity } from '../api/models/entities/IngredientEntity/IngredientEntity';
import { IngredientService } from '../api/services/ingredientService';
import { ChipList } from '../components/common/collections';
import SmallRecipeCard from '../components/common/collections/SmallRecipeCard';
import TastealTextInput from '../components/common/inputs/TastealTextInput';
import { PADDING_HORIZONTAL, ROUTES, SMALL_GAP } from '../constants/common';
import { useSpinner } from '../hooks';
import { IngredientFilterMode } from './IngredientFilter';

const ITEM_AMOUNT = 100;

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
  //#region Routing

  const handleCardPress = useCallback((id: number) => {
    navigation.navigate(ROUTES.RecipeDetail, { recipeId: id });
  }, []);

  //#endregion
  //#region Filter

  //#region Time

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

  //#endregion
  //#region Calories

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

  //#endregion
  //#region Ingredients

  //#region Shared

  const [ingredients, setIngredients] = useState<IngredientEntity[]>([]);
  useEffect(() => {
    let active = true;

    spin(true);
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
      spin(false);
    })();

    return () => {
      active = false;
    };
  }, []);

  const handleIngredientFilterAddClick = (mode: IngredientFilterMode) => {
    navigation.navigate(ROUTES.IngredientFilter, {
      mode: mode,
      includedIngredients: includedIngredients.map(
        (ingredient) => ingredient.id
      ),
      excludedIngredients: excludedIngredients.map(
        (ingredient) => ingredient.id
      ),
    });
  };

  //#endregion
  //#region Included Ingredients

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

  //#endregion
  //#region Excluded Ingredients

  const [excludedIngredients, setExcludedIngredients] = useState<
    IngredientEntity[]
  >([]);
  useEffect(() => {
    if (
      !route.params ||
      !route.params.excludedIngredients ||
      route.params.excludedIngredients.length <= 0
    ) {
      setExcludedIngredients([]);
      return;
    }

    const ids = route.params.excludedIngredients;
    const foundSelectedIngredients: IngredientEntity[] = [];
    ingredients.forEach((ingredient) => {
      if (ids.includes(ingredient.id)) {
        foundSelectedIngredients.push(ingredient);
      }
    });
    setExcludedIngredients(foundSelectedIngredients);
  }, [route.params?.excludedIngredients]);
  useEffect(() => {
    handleSearchReqChange(
      'ExceptIngredientID',
      excludedIngredients.map((i) => i.id)
    );
  }, [excludedIngredients]);

  const handleExcludedIngredientRemove = useCallback((id: number) => {
    setExcludedIngredients((prev) => prev.filter((i) => i.id !== id));
  }, []);

  //#endregion

  //#endregion

  //#endregion

  // #region Filter Accordion

  const [accordionOpen, setAccodionOpen] = useState(false);

  // #endregion

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

          <List.Accordion
            title="Bộ lọc"
            style={[
              {
                borderColor: theme.colors.primary,
                borderWidth: 1,
                borderStyle: 'solid',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              },

              !accordionOpen
                ? { borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }
                : {},
            ]}
            titleStyle={{
              fontWeight: 'bold',
              fontSize: 16,
              color: theme.colors.primary,
            }}
            right={(props) => (
              <List.Icon
                {...props}
                icon="filter"
                color={theme.colors.primary}
              />
            )}
            onPress={() => setAccodionOpen(!accordionOpen)}
            expanded={accordionOpen}
          >
            <View
              style={[
                {
                  gap: 12,
                  padding: 12,

                  borderColor: theme.colors.primary,
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,

                  marginTop: 4,
                },
              ]}
            >
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
                <View
                  style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}
                >
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
                <ChipList
                  chips={includedIngredients}
                  onAdd={() => handleIngredientFilterAddClick('included')}
                  onRemove={handleIncludeIngredientRemove}
                />
              </View>
              <View style={{ gap: 8 }}>
                <Text
                  variant="titleMedium"
                  style={[styles.boldText, styles.primaryText]}
                >
                  Không bao gồm Nguyên liệu
                </Text>
                <ChipList
                  chips={excludedIngredients}
                  onAdd={() => handleIngredientFilterAddClick('excluded')}
                  onRemove={handleExcludedIngredientRemove}
                />
              </View>
            </View>
          </List.Accordion>

          <Divider />

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
    filter: {
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      padding: 4,

      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    filterBanner: {
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.background,
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
