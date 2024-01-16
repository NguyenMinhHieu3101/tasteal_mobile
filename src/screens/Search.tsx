import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import {
  Button,
  MD3Theme,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { RecipeEntity } from '../api/models/entities/RecipeEntity/RecipeEntity';
import { RecipeService } from '../api/services/recipeService';
import SmallRecipeCard from '../components/common/collections/SmallRecipeCard';
import TastealTextInput from '../components/common/inputs/TastealTextInput';
import { PADDING_HORIZONTAL, ROUTES } from '../constants/common';
import { useSpinner } from '../hooks';

let cache: RecipeEntity[];
let time: number;

const Search = () => {
  const [search, setSearch] = useState('');
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const spin = useSpinner();

  const styles = getStyles(theme);

  const handleIngredientClick = () => {
    navigation.navigate(ROUTES.IngredientFilter);
  };

  const [loading, setLoading] = useState(false);

  const [recipes, setRecipes] = useState<RecipeEntity[]>([]);
  useEffect(() => {
    let active = true;

    setLoading(true);
    spin(true);
    (async () => {
      try {
        if (cache) {
          if (time && Date.now() - time < 1000 * 12) {
            setRecipes(cache);
            return;
          } else {
            cache = undefined;
          }
        }

        const entities = await RecipeService.GetAllRecipes(1000000);

        if (!active) return;

        cache = entities;
        time = Date.now();
        setRecipes(entities);
      } catch (err) {
        console.log(err);
        setRecipes([]);
      } finally {
        setLoading(false);
        spin(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

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
          value={search}
          placeholder="Tìm kiếm..."
          right={<TextInput.Icon icon="magnify" />}
        />

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button mode="contained" compact style={styles.filterButton}>
            Thời gian
          </Button>
          <Button mode="contained" compact style={styles.filterButton}>
            Dịp lễ
          </Button>
          <Button
            mode="contained"
            compact
            style={styles.filterButton}
            onPress={handleIngredientClick}
          >
            Nguyên liệu
          </Button>
        </View>

        <FlatList
          data={recipes}
          renderItem={({ item }) => <SmallRecipeCard recipe={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
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
      paddingHorizontal: 8,
    },
  });

export default Search;
