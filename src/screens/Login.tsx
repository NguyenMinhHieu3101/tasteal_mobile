import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  BackHandler,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Button, IconButton, Text, useTheme } from "react-native-paper";
import MyButton from "../components/MyButton";
import COLORS from "../constants/colors";
import FONTSIZE from "../constants/fontsize";
import { ROUTES } from "../constants/common";
import Container from "../components/common/Container";
const Login = ({ navigation }) => {
  const theme = useTheme();
  return (
    <Container>
      <SafeAreaView />
      <View
        style={{
          alignItems: "flex-start",
          marginLeft: -10,
        }}
      >
        <IconButton
          icon="arrow-left"
          size={20}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{ ...styles.view }}>
        <Text
          variant="displaySmall"
          style={{ ...styles.title, marginBottom: 10 }}
        >
          Đăng nhập
        </Text>
        <Text variant="bodyLarge" style={styles.text}>
          Chào mừng trở lại! Bạn chắc hẳn vừa thấy món gì đó ngon ngon.
        </Text>
      </View>
      <View style={styles.view}>
        <TextInput
          placeholder="Email"
          placeholderTextColor={COLORS.grey}
          style={{ ...styles.input, fontSize: theme.fonts.bodyLarge.fontSize }}
        ></TextInput>
        <TextInput
          placeholder="Mật khẩu"
          secureTextEntry
          placeholderTextColor={COLORS.grey}
          style={{ ...styles.input, fontSize: theme.fonts.bodyLarge.fontSize }}
        ></TextInput>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={{ color: COLORS.blue }}>Quên mật khẩu?</Text>
      </View>
      <View style={styles.view}>
        <Button
          onPress={() => navigation.navigate(ROUTES.NoBottomBarScreen)}
          mode="contained"
          style={{
            paddingVertical: 4,
          }}
        >
          Đăng nhập
        </Button>
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  view: {
    marginTop: 30,
    marginVertical: 20,
  },
  title: {
    fontWeight: "700",
    color: COLORS.black,
  },
  text: {
    fontWeight: "200",
    color: COLORS.black,
  },
  input: {
    backgroundColor: COLORS.lightgrey,
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default Login;
