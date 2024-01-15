import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
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

    (async () => {
      let entites;

      spin();
      try {
        entites = await IngredientService.GetAll(1000000);
        console.log('entites', entites);
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

  console.log(ingredients);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
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

          {ingredients.map((i) => (
            <IngredientItem key={i.id} name={i.name} image={i.image} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme?: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    innerContainer: {
      marginTop: 60,
      marginHorizontal: 20,
    },
    content: {
      gap: 12,
    },
  });

export default IngredientFilter;
