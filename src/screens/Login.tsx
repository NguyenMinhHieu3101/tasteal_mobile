import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { BackHandler, StyleSheet, Text, TextInput, View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton from "../components/MyButton";
import COLORS from "../constants/colors";
import FONTSIZE from "../constants/fontsize";
import { ROUTES } from "../constants/common";
const Login = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ alignItems: "flex-start" }}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.navigate("Welcome")}
          />
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
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ fontSize: FONTSIZE.sm, color: COLORS.blue }}>
            Forgot Your Password?
          </Text>
        </View>
        <View style={styles.view}>
          <Button
            onPress={() => navigation.navigate(ROUTES.Home)}
            mode="contained"
          >
            Log In
          </Button>
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
    fontSize: FONTSIZE.xl,
    fontWeight: "700",
    color: COLORS.black,
  },
  text: {
    fontSize: FONTSIZE.md,
    fontWeight: "200",
    color: COLORS.black,
  },
  input: {
    backgroundColor: COLORS.lightgrey,
    fontSize: FONTSIZE.sm,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default Login;
