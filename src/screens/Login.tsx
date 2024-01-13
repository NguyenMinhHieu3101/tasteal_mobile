import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { BackHandler, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/MyButton';
import COLORS from '../constants/colors';
import FONTSIZE from '../constants/fontsize';
const Login = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ alignItems: 'flex-start' }}>
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate('Welcome')}
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
          <Text style={styles.title}>Log In</Text>
          <Text style={styles.text}>
            Welcome back! You're just a tap away from something delicious.
          </Text>
        </View>
        <View style={styles.view}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={COLORS.grey}
            style={styles.input}
          ></TextInput>
          <TextInput
            placeholder="Password"
            secureTextEntry
            placeholderTextColor={COLORS.grey}
            style={styles.input}
          ></TextInput>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: FONTSIZE.small, color: COLORS.blue }}>
            Forgot Your Password?
          </Text>
        </View>
        <View style={styles.view}>
          <Button
            title="Log In"
            onPress={() => navigation.navigate('Grocery')}
            backgroundColor={COLORS.blue}
            label="Start Cooking!"
            labelColor={COLORS.white}
            borderColor={COLORS.blue}
            // borderColor={COLORS.white}
            width={'100%'}
            height={50}
          ></Button>
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
    marginTop: 30,
    marginVertical: 20,
  },
  title: {
    fontSize: FONTSIZE.xlarge,
    fontWeight: '700',
    color: COLORS.black,
  },
  text: {
    fontSize: FONTSIZE.medium,
    fontWeight: '200',
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

export default Login;
