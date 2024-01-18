import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Button, IconButton, useTheme } from "react-native-paper";

import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import useFirebaseImage from "../api/hooks/useFirebaseImage";
import { RecipeEntity } from "../api/models/entities/RecipeEntity/RecipeEntity";
import { ROUTES } from "../constants/common";

const RecipeCard = ({ recipe }: { recipe: RecipeEntity }) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();

  const imageUrl = useFirebaseImage(recipe.image || "");
  const avatarUrl = useFirebaseImage(recipe.account.avatar || "");

  const handleCardPress = () => {
    navigation.navigate(ROUTES.RecipeDetail, { recipeId: recipe.id });
  };
  return (
    <>
      <TouchableOpacity onPress={handleCardPress}>
        <View style={styles.cardContainer}>
          <ImageBackground style={styles.imageStyle} source={{ uri: imageUrl }}>
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
            <Text style={styles.timeStyle}>{recipe.totalTime} phút</Text>
          </ImageBackground>

          <Avatar.Image
            style={styles.avatarStyle}
            size={34}
            source={{
              uri: avatarUrl,
            }}
          />

          <View style={{ marginHorizontal: 15, marginTop: 10 }}>
            <Rating
              type="star"
              ratingCount={5}
              startingValue={recipe.rating}
              imageSize={20}
              style={{ alignItems: "flex-start" }}
              readonly
            />
          </View>

          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginHorizontal: 15,
              marginVertical: 8,
              color: theme.colors.primary,
            }}
          >
            {recipe.name}
          </Text>

          <View style={styles.buttonStyle}>
            <Button
              mode="outlined"
              onPress={() => {}}
              textColor={theme.colors.primary}
              icon="cart"
              style={{
                borderRadius: 100,
                height: 40,
                width: "90%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderColor: theme.colors.primary,
              }}
            >
              THÊM VÀO GIỎ ĐI CHỢ
            </Button>
          </View>
        </View>
      </TouchableOpacity>
    </>
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
    bottom: 108,
    right: 15,
    // add border
    borderColor: "white",
    borderWidth: 22,
    borderRadius: 100,
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
});

export default RecipeCard;
