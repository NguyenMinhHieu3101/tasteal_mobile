import { Link, NavigationProp, useRoute } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import {
  Button,
  Chip,
  IconButton,
  MD3Theme,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import TastealTextInput from '../components/common/inputs/TastealTextInput';
import { ROUTES } from '../constants/common';

const Search = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const theme = useTheme();

  const styles = getStyles(theme);

  const handleFilterClick = () => {
    navigation.push(ROUTES.IngredientFilter);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={[styles.content]}>
          <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>
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
              onPress={() => '/' + navigation.push(ROUTES.IngredientFilter)}
            >
              Nguyên liệu
            </Button>
          </View>
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
    filterButton: {
      paddingHorizontal: 8,
    },
  });

export default Search;
