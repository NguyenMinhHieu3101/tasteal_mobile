import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import { Image } from "react-native";
import IMAGES from "../constants/images";
import Button from "../components/MyButton";
import Icon from "react-native-vector-icons/Ionicons";
const Welcome = ({ navigation }) => {
  return (
    <LinearGradient
      styles={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={{ flex: 1 }}>
        <View>
          <Image
            source={IMAGES.welcome}
            style={{
              height: 880,
              width: 400,
              position: "absolute",
            }}
          />
        </View>

        <View
          style={{
            paddingHorizontal: 20,
            position: "absolute",
            textAlignVertical: "center",
            paddingTop: 530,
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 50,
              fontWeight: 500,
              color: COLORS.white,
            }}
          >
            DishDash
          </Text>

          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: 500,
                color: COLORS.white,
              }}
            >
              Cook with Confidence
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: 20,
            }}
          >
            <Button
              onPress={() => navigation.navigate("Signup")}
              labelColor={COLORS.black}
              borderColor={COLORS.white}
              width={170}
              height={45}
              startIcon={
                <Image
                  source={IMAGES.icon_google}
                  style={{
                    height: 20,
                    width: 20,
                    position: "absolute",
                  }}
                />
              }
            ></Button>
            <Button
              onPress={() => navigation.navigate("Signup")}
              // label={<Text style={{fontSize: 22, fontWeight: 700}}>f</Text>}
              backgroundColor={"#3a559f"}
              labelColor={COLORS.white}
              borderColor={"#3a559f"}
              width={170}
              height={45}
              startIcon={
                <Image
                  source={IMAGES.icon_facebook}
                  style={{
                    height: 28,
                    width: 28,
                    position: "absolute",
                  }}
                />
              }
            ></Button>
          </View>

          <TouchableOpacity>
            <Button
              onPress={() => {
                navigation.navigate("Signup");
              }}
              label="SIGN UP WITH EMAIL"
              labelColor={COLORS.black}
              borderColor={COLORS.white}
              width="100%"
              height={45}
              startIcon={<Icon name="mail" size={20} color="black"></Icon>}
            ></Button>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 17,
                color: COLORS.grey,
              }}
            >
              Already have an account?{" "}
            </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  marginLeft: 4,
                  color: COLORS.grey,
                  textDecorationLine: "underline",
                }}
              >
                Log In
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
