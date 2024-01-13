import { AntDesign } from '@expo/vector-icons';
import { styled } from 'nativewind';
import React from 'react';
import { BackHandler, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/MyButton';
import COLORS from '../constants/colors';
import FONTSIZE from '../constants/fontsize';
import FONTWEIGHT from '../constants/fontweight';

const Grocery = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ alignItems: 'flex-start' }}>
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate('HomeScreen')}
            backgroundColor="transparent"
            borderColor="transparent"
            width={'20%'}
            height={50}
            startIcon={
              <AntDesign
                name="arrowleft"
                size={24}
                color="black"
                style={{ marginRight: 40 }}
              />
            }
          ></Button>
        </View>
        <View style={styles.view}>
          <Text style={styles.title}>Giỏ Đi Chợ</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.subtitle2}>
            {/* {cartData.length} Công thức | {getTotalIngredient()} Nguyên liệu */}
            0 Công thức | 3 Nguyên liệu
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  view: {
    marginTop: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: FONTSIZE.xlarge,
    fontWeight: '900',
    color: COLORS.black,
  },
  text: {
    fontSize: FONTSIZE.medium,
    fontWeight: '200',
    color: COLORS.black,
  },
  subtitle2: {
    fontSize: FONTSIZE.subtitle2,
    fontWeight: '400',
    color: COLORS.black,
  },
  input: {
    backgroundColor: COLORS.lightgrey,
    fontSize: FONTSIZE.small,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default Grocery;
