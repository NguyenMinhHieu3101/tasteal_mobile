import React, { useCallback, useContext, useEffect } from "react";
import { Image, Pressable, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import COLORS from "../constants/colors";
import IMAGES from "../constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import Container from "../components/common/Container";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ROUTES } from "../constants/common";
import { AccountService } from "../api/services/accountService";
import LoginContext from "../contexts/LoginContext";
import { signInWithPopup } from "@firebase/auth";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../api/firebase/firebaseConfig";
import AysncStorage from "@react-native-async-storage/async-storage";

const Welcome = ({ navigation }) => {
  const theme = useTheme();
  const { login } = useContext(LoginContext);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.ANDROIDCLIENTID,
  });

  useEffect(() => {
    if (response.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);

        login.handleLogin && login.handleLogin(true, user);
      }
    });

    return unsub;
  }, []);

  // const handleSignInWithGoogle = useCallback(() => {
  //   signInWithPopup(auth, googleProvider)
  //     .then((userCredential) => {
  //       console.log("[AUTH] Sign in with Google successfully", userCredential);
  //       // openSnackbar("Đăng nhập thành công!", "success");

  //       AccountService.GetByUid(userCredential.user.uid)
  //         .then(() =>
  //           console.log("Account existed! No need to create new account!")
  //         )
  //         .catch(() => {
  //           console.log("Account not existed! Need to create new account!");

  //           AccountService.SignUpAccount({
  //             uid: userCredential.user.uid,
  //             name: userCredential.user.displayName,
  //           })
  //             .then((isSuccess) => {
  //               if (isSuccess) {
  //                 console.log("Sign up successfully");
  //                 // openSnackbar("Đăng ký thành công!");
  //                 login.handleLogin(true, userCredential.user);

  //                 navigation.navigate(ROUTES.Login);
  //               } else {
  //                 console.log("Sign up failed");
  //                 // openSnackbar("Đăng ký thất bại!", "warning");
  //               }
  //             })
  //             .catch((error) => {
  //               console.log("Sign up failed", error);
  //               // openSnackbar("Đăng ký thất bại!", "warning");
  //             });
  //         })
  //         .finally(() => {
  //           if (login.handleLogin) {
  //             login.handleLogin(true, userCredential.user);
  //             // navigateSignIn();
  //           }
  //         });
  //     })
  //     .catch((error) => {
  //       console.log("[AUTH] Sign in with Google failed", error);
  //       // openSnackbar("Đăng nhập thất bại! Hệ thống xảy ra lỗi.", "warning");
  //       if (login.handleLogin) {
  //         login.handleLogin(false, undefined);
  //       }
  //     });
  // }, [login, navigation]);

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
              onPress={() => promptAsync()}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 12,
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
              <Text variant="bodyLarge" style={{ fontWeight: "700" }}>
                GOOGLE
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.Signup)}
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
            <Pressable onPress={() => navigation.navigate(ROUTES.Login)}>
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
