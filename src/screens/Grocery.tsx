import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { BackHandler, StyleSheet, TextInput, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/MyButton";
import COLORS from "../constants/colors";
import FONTSIZE from "../constants/fontsize";
import FONTWEIGHT from "../constants/fontweight";

const Grocery = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ alignItems: "flex-start" }}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.navigate("DoThang")}
          />
        </View>
        <View style={styles.view}>
          <Text variant="headlineLarge" style={{fontWeight: "600"}}>Giỏ đi chợ</Text>
        </View>
        <View style={styles.view}>
          <Text variant="titleMedium">
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
    fontSize: FONTSIZE.xl,
    fontWeight: "900",
    color: COLORS.black,
  },
  subtitle2: {
    fontSize: FONTSIZE.subtitle2,
    fontWeight: "400",
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

export default Grocery;
