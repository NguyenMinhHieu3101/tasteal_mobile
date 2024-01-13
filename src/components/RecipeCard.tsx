import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import Button from "./MyButton";
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
        <View style={styles.savedStyle}>
          <Button
            backgroundColor="rgba(0, 0, 0, 0.6)"
            borderColor="rgba(0, 0, 0, 0.6 )"
            width={35}
            startIcon={
              <Icon name="bookmark-outline" size={20} color={"white"} />
            }
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

      <View style={styles.ratingStyle}>
        <StarRating rating={4} />
      </View>

      <Text style={styles.titleStyle}>
        Spicy Butternut Squash Soup with Maple Jalapaño Bacon
      </Text>

      <View style={styles.buttonStyle}>
        <Button
          label=" Add ingredients"
          width={deviceWidth - 130}
          startIcon={<Icon name="cart" size={20} />}
        />
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
    height: 425,
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
  savedStyle: {
    position: "absolute",
    top: 10,
    right: 10,
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
  ratingStyle: {
    marginHorizontal: 14,
    marginTop: 10,
  },
  titleStyle: {
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginTop: 5,
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 9,
  },
});

export default RecipeCard;
