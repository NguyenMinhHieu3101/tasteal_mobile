import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import { Button, IconButton } from "react-native-paper";

import StarRating from "./StarRating";

const RecipeCard = () => {
  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        style={styles.imageStyle}
        source={{
          uri: "https://www.sidechef.com/recipe/cc20c05d-aeca-4029-b717-e77b6f3ea5e0.jpg?d=375x375",
        }}
      >
        <View style={{ position: "absolute", top: 10, right: 10 }}>
          <IconButton
            mode="contained"
            icon="bookmark-outline"
            iconColor="white"
            containerColor="rgba(0, 0, 0, 0.6 )"
            size={20}
            onPress={() => {}}
          />
        </View>
        <Text style={styles.timeStyle}>40min</Text>
      </ImageBackground>

      <Image
        style={styles.avatarStyle}
        source={{
          uri: "https://www.sidechef.com/profile/d88eb0d9-9e88-4841-b8de-9de6283b10db.jpeg?d=980x1120",
        }}
      ></Image>

      <View style={{ marginHorizontal: 14, marginTop: 10 }}>
        <StarRating rating={4} />
      </View>

      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          marginHorizontal: 15,
          // marginTop: 5,
          marginVertical: 10,
        }}
      >
        Zabaglione cùng mứt cherry
      </Text>

      <View style={styles.buttonStyle}>
        <Button
          mode="outlined"
          onPress={() => {}}
          textColor="black"
          icon="cart"
          style={{
            borderRadius: 100,
            height: 40,
            width: "85%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderColor: "black",
          }}
        >
          THÊM VÀO GIỎ ĐI CHỢ
        </Button>
      </View>
    </View>
  );
};

const radius = 20;
const deviceWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
  cardContainer: {
    width: deviceWidth - 100,
    backgroundColor: "white",
    height: 430,
    borderRadius: radius,
    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9,
  },
  imageStyle: {
    height: 300,
    width: deviceWidth - 100,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    overflow: "hidden",
  },
  timeStyle: {
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "white",
    position: "absolute",
    bottom: 10,
  },
  avatarStyle: {
    position: "absolute",
    right: 15,
    bottom: 100,
    borderRadius: 25,
    height: "10%",
    width: "14%",
    borderColor: "white",
    borderWidth: 4,
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
});

export default RecipeCard;
