import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { BackHandler, StyleSheet, Text, TextInput, View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckBox from "../components/CheckBox";
import MyButton from "../components/MyButton";
import COLORS from "../constants/colors";
import FONTSIZE from "../constants/fontsize";

const Signup = ({ navigation }) => {
  const [check, setCheck] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ alignItems: "flex-start" }}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.view}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.text}>
            Save delicious recipes and get personalized content.
          </Text>
        </View>
        <View style={styles.view}>
          <TextInput
            placeholder="Display Name"
            placeholderTextColor={COLORS.grey}
            style={styles.input}
          ></TextInput>
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
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            placeholderTextColor={COLORS.grey}
            style={styles.input}
          ></TextInput>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <CheckBox
            onPress={() => setCheck(!check)}
            // title="Music"
            isChecked={check}
          />
          <Text style={styles.text}>
            I would like to receive inspiration, meal plans, updates, and more!
          </Text>
        </View>
        <View style={styles.view}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("HomeScreen")}
          >
            NEXT
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

export default Signup;
