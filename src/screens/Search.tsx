import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useCallback } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { MD3Theme, Text, TextInput, useTheme } from 'react-native-paper';
import { useRecipeSearch } from '../api/hooks';
import { RecipeEntity } from '../api/models/entities/RecipeEntity/RecipeEntity';
import SmallRecipeCard from '../components/common/collections/SmallRecipeCard';
import TastealTextInput from '../components/common/inputs/TastealTextInput';
import { PADDING_HORIZONTAL, ROUTES, SMALL_GAP } from '../constants/common';
import { useSpinner } from '../hooks';

let cache: RecipeEntity[];
let time: number;

const ITEM_AMOUNT = 12;

const Search = () => {
  //#region Hooks

  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
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

  const handleIngredientClick = () => {
    navigation.navigate(ROUTES.IngredientFilter);
  };

  //#endregion
  //#region Routing

  const handleCardPress = useCallback((id: number) => {
    navigation.navigate(ROUTES.RecipeDetail, { recipeId: id });
  }, []);

  //#endregion

  return (
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

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity
            style={[styles.filterButton, { borderColor: theme.colors.primary }]}
          >
            <Text>Thời gian</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, { borderColor: theme.colors.primary }]}
          >
            <Text>Dịp lễ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, { borderColor: theme.colors.primary }]}
            onPress={handleIngredientClick}
          >
            <Text>Nguyên liệu</Text>
          </TouchableOpacity>
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
  );
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
  });

export default Search;
