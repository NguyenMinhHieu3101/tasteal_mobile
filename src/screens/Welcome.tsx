import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Pressable, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Button } from "react-native-paper";
import COLORS from "../constants/colors";
import IMAGES from "../constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import Container from "../components/common/Container";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Welcome = ({ navigation }) => {
  const theme = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Image
          source={IMAGES.welcome}
          style={{
            height: "100%",
            width: "100%",
            resizeMode: "cover",
          }}
        />
      </View>

      <Container
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <SafeAreaView style={{ flex: 1, paddingBottom: 20, gap: 16 }}>
          <Text
            variant="displayLarge"
            style={{
              color: "white",
              fontWeight: "bold",
              marginBottom: -8,
            }}
          >
            DishDash
          </Text>

          <Text
            variant="headlineSmall"
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Cook with Confidence
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: 16,
            }}
          >
            <TouchableOpacity
              // mode="contained"
              // buttonColor="white"
              onPress={() => navigation.navigate("Signup")}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 50,
                flex: 1,
                borderRadius: 100,
                backgroundColor: "white",
              }}
            >
              <Image
                source={IMAGES.icon_google}
                style={{
                  height: 24,
                  width: 24,
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              // mode="contained"
              // buttonColor="white"
              onPress={() => navigation.navigate("Signup")}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 50,
                flex: 1,
                borderRadius: 100,
                backgroundColor: "white",
              }}
            >
              <Image
                source={IMAGES.icon_facebook}
                style={{
                  height: 24,
                  width: 24,
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={{
              borderRadius: 100,
              height: 50,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <MaterialCommunityIcons name="gmail" size={24} color="black" />
              <Text variant="bodyLarge" style={{ fontWeight: "700" }}>
                SIGN UP WITH EMAIL
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              variant="bodyLarge"
              style={{
                color: COLORS.grey,
              }}
            >
              Already have an account?{" "}
            </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                variant="bodyLarge"
                style={{
                  fontWeight: "bold",
                  color: COLORS.grey,
                  textDecorationLine: "underline",
                }}
              >
                Log In
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Container>
    </View>
  );
};

export default Welcome;
