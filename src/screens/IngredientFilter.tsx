import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { MD3Theme, Text, TextInput, useTheme } from 'react-native-paper';
import TastealTextInput from '../components/common/inputs/TastealTextInput';

const IngredientFilter = ({ navigation }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const [search, setSearch] = useState('');

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
