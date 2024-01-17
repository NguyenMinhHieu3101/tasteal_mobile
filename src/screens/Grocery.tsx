import { Dimensions, ScrollView, TouchableOpacity, View } from "react-native";
import { IconButton, PaperProvider, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";

import DefaultBottomSheet from "../components/common/DefaultBottomSheet";
import useDefaultBottomSheet from "../hooks/useDefaultBottomSheet";
import AddYourOwnItem from "../components/ui/grocery/AddYourOwnItem";
import Container from "../components/common/Container";
import Header from "../components/common/Header/HeaderFrame";
import { ROUTES } from "../constants/common";
import { CommonActions } from "@react-navigation/native";
import CartItemFrame from "../components/ui/grocery/CartItemFrame";
import CartItemCheckBox from "../components/ui/grocery/CartItemCheckBox";
const Grocery = ({ navigation }) => {
  const theme = useTheme();
  const bottomSheet = useDefaultBottomSheet();
  const heightDevice = Dimensions.get("screen").height;
  return (
    <DefaultBottomSheet
      bottomSheetHookType={bottomSheet}
      bottomSheetChildren={
        <View style={{ flex: 1, padding: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.Signup)}
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
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          // height: "100%",
        }}
      >
        {/* Header */}
        <Header>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              width: "100%",
            }}
          >
            <IconButton
              style={{ marginLeft: -10 }}
              icon="arrow-left"
              size={24}
              onPress={() => navigation.dispatch(CommonActions.goBack())}
            />

            <IconButton
              style={{ marginRight: -10 }}
              icon="dots-horizontal-circle-outline"
              size={24}
              onPress={() => {
                bottomSheet.openBottomSheet();
              }}
            />
          </View>
        </Header>

        <Container
          style={{
            paddingBottom: 20,
            flex: 0,
            backgroundColor: theme.colors.background,
          }}
        >
          <View>
            <Text variant="headlineMedium" style={{ fontWeight: "900" }}>
              Giỏ đi chợ
            </Text>
            <Text variant="titleMedium">0 Công thức • 3 Nguyên liệu</Text>
          </View>
        </Container>

        <ScrollView
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: theme.colors.secondary,
            flexGrow: 1,
            // height: "100%",
          }}
        >
          <Container
            style={{
              flex: 1,
              paddingTop: 20,
            }}
          >
            <AddYourOwnItem />
          </Container>
          <Container>
            <CartItemFrame label="Đồ cá nhân">
              <CartItemCheckBox
                item={{
                  cartId: 1,
                  ingredient_id: 1,
                  amount: 5,
                  isBought: false,
                }}
              ></CartItemCheckBox>

              <CartItemCheckBox
                item={{
                  cartId: 1,
                  ingredient_id: 1,
                  amount: 5,
                  isBought: false,
                }}
              ></CartItemCheckBox>

              <CartItemCheckBox
                item={{
                  cartId: 1,
                  ingredient_id: 1,
                  amount: 5,
                  isBought: false,
                }}
              ></CartItemCheckBox>
            </CartItemFrame>
          </Container>

          <Container>
            <View>
              <CartItemFrame label="Đã có">
                <View style={{ backgroundColor: "#f2f2f2" }}>
                  <CartItemCheckBox
                    item={{
                      cartId: 1,
                      ingredient_id: 1,
                      amount: 5,
                      isBought: true,
                    }}
                    type="personal"
                  ></CartItemCheckBox>
                </View>
              </CartItemFrame>
            </View>
          </Container>

          {/* <View
            style={{
              backgroundColor: theme.colors.secondary,
              flex: 1,
              // position: "relative",
              height: "100%",
            }}
          >
            <Container>
              
            </Container>
          </View> */}
        </ScrollView>
      </View>
    </DefaultBottomSheet>
  );
};

export default Grocery;
