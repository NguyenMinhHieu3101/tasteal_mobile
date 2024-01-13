import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const Search = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <ProgressBar progress={0.5} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginLeft: 25,
  },
});

export default Search;
