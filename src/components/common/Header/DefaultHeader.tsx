import { View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Icon, Text, useTheme } from "react-native-paper";
import { Avatar } from "react-native-paper";
import Header from "./HeaderFrame";
import { ROUTES } from "../../../constants/common";
import LoginContext from "../../../contexts/LoginContext";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../api/firebase/firebaseConfig";
import { CartService } from "../../../api/services/cartService";

export function DefaultHeader({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const { login, cart } = useContext(LoginContext);

  return (
    <>
      {login.user && (
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
            {/* Avatar */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Avatar.Image
                size={28}
                source={{
                  uri: login.avatar,
                }}
              />
            </TouchableOpacity>

            <View style={{ flexDirection: "row", gap: 8 }}>
              {/* <TouchableOpacity onPress={() => navigation.goBack()}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                    borderColor: theme.colors.primary,
                    borderWidth: 1,
                    padding: 4,
                    paddingHorizontal: 8,
                    borderRadius: 100,
                  }}
                >
                  <Icon
                    source="bookmark-outline"
                    size={20}
                    color={theme.colors.primary}
                  />
                  <Text
                    style={{ fontWeight: "bold", color: theme.colors.primary }}
                  >
                    8
                  </Text>
                </View>
              </TouchableOpacity> */}

              {/* Cart */}

              {cart && cart.cartCount > 0 && (
                <TouchableOpacity
                  onPress={() => navigation.navigate(ROUTES.Grocery)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 2,
                      alignItems: "center",
                      borderColor: theme.colors.primary,
                      borderWidth: 1,
                      padding: 4,
                      paddingHorizontal: 8,
                      borderRadius: 100,

                      backgroundColor: theme.colors.primary,
                    }}
                  >
                    <Icon source="cart" size={20} color="white" />
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      {cart.cartCount}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Header>
      )}
    </>
  );
}
