import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  BackHandler,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Button, IconButton, Text, useTheme } from "react-native-paper";
import CheckBox from "../components/CheckBox";
import MyButton from "../components/MyButton";
import COLORS from "../constants/colors";
import FONTSIZE from "../constants/fontsize";
import Container from "../components/common/Container";
import { ROUTES } from "../constants/common";

const Signup = ({ navigation }) => {
  const theme = useTheme();
  const [check, setCheck] = useState(false);
  return (
    <Container>
      <SafeAreaView />
      <View style={{ alignItems: "flex-start", marginLeft: -10 }}>
        <IconButton
          icon="arrow-left"
          size={20}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.view}>
        <Text
          variant="displaySmall"
          style={{ ...styles.title, marginBottom: 10 }}
        >
          Đăng ký
        </Text>
        <Text variant="bodyLarge" style={styles.text}>
          Lưu những công thức tuyệt vời và nhận nội dung giành cho bạn.
        </Text>
      </View>
      <View style={styles.view}>
        <TextInput
          placeholder="Display Name"
          placeholderTextColor={COLORS.grey}
          style={{ ...styles.input, fontSize: theme.fonts.bodyLarge.fontSize }}
        ></TextInput>
        <TextInput
          placeholder="Email"
          placeholderTextColor={COLORS.grey}
          style={{ ...styles.input, fontSize: theme.fonts.bodyLarge.fontSize }}
        ></TextInput>
        <TextInput
          placeholder="Password"
          secureTextEntry
          placeholderTextColor={COLORS.grey}
          style={{ ...styles.input, fontSize: theme.fonts.bodyLarge.fontSize }}
        ></TextInput>
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          placeholderTextColor={COLORS.grey}
          style={{ ...styles.input, fontSize: theme.fonts.bodyLarge.fontSize }}
        ></TextInput>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
        }}
      >
        <CheckBox onPress={() => setCheck(!check)} isChecked={check} />
        <Text style={{ ...styles.text, flex: 1 }}>
          Tôi muốn nhận cảm hứng công thức, lịch ăn, cập nhật và hơn thế nữa!
        </Text>
      </View>
      <View style={styles.view}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate(ROUTES.Login)}
          style={{
            paddingVertical: 4,
          }}
        >
          Tiếp tục
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

export default Signup;
