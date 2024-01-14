import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import DefaultBottomSheet from "../components/common/DefaultBottomSheet";
import useDefaultBottomSheet from "../hooks/useDefaultBottomSheet";
import React, { useEffect } from "react";
import AddYourOwnItem from "../components/grocery/AddYourOwnItem";
const Grocery = ({ navigation }) => {
  const theme = useTheme();
  const bottomSheet = useDefaultBottomSheet();

  useEffect(() => {
    // Tùy chỉnh header trong useEffect
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <IconButton
          style={{ marginLeft: -10 }}
          icon="arrow-left"
          size={24}
          onPress={() => navigation.navigate("DoThang")}
        />
      ),
      headerRight: () => (
        <IconButton
          style={{ marginRight: -10 }}
          icon="dots-horizontal-circle-outline"
          size={24}
          onPress={() => {
            bottomSheet.openBottomSheet();
          }}
        />
      ),
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerShadowVisible: false,
    });
  }, [navigation]);

  return (
    <DefaultBottomSheet
      bottomSheetHookType={bottomSheet}
      bottomSheetChildren={
        <View style={{ flex: 1, padding: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={{
              // borderRadius: 100,
              height: 50,
              width: "100%",
              display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Ionicons name="add-circle-outline" size={25} color="black" />
              <Text variant="bodyLarge">Thêm vào tủ lạnh</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={{
              height: 50,
              width: "100%",
              display: "flex",
              backgroundColor: "white",
            }}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              <AntDesign name="delete" size={24} color="black" />
              <Text variant="bodyLarge">Dọn giỏ đi chợ</Text>
            </View>
          </TouchableOpacity>
        </View>
      }
      snapPoints={["20%"]}
    >
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
      >
        <View style={{ marginHorizontal: 20, paddingBottom: 20 }}>
          <View>
            <Text variant="headlineMedium" style={{ fontWeight: "900" }}>
              Giỏ đi chợ
            </Text>
            <Text variant="titleMedium">0 Công thức • 3 Nguyên liệu</Text>
          </View>
        </View>
        <View style={{ backgroundColor: theme.colors.secondary, flex: 1 }}>
          <View style={{ marginHorizontal: 20 }}>
            <AddYourOwnItem></AddYourOwnItem>
          </View>
        </View>
      </SafeAreaView>
    </DefaultBottomSheet>
  );
};

export default Grocery;
