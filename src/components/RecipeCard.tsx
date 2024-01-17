import React, { useCallback, useContext, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, IconButton, useTheme } from 'react-native-paper';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';
import useFirebaseImage from '../api/hooks/useFirebaseImage';
import { RecipeEntity } from '../api/models/entities/RecipeEntity/RecipeEntity';
import { ROUTES } from '../constants/common';
import StarRating from './StarRating';

const RecipeCard = ({ recipe }: { recipe: RecipeEntity }) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();

  const imageUrl = useFirebaseImage(recipe.image || '');
  const avatarUrl = useFirebaseImage(recipe.account.avatar || '');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const { login, cookbooks, handleSpinner } = useContext(AppContext);

  // const handleCardPress = useCallback(() => {
  //   navigate(PageRoute.Recipe.Detail(recipe.id));
  // }, [navigate, recipe.id]);
  // const [snackbarAlert] = useSnackbarService();
  const handleCardPress = () => {
    navigation.navigate(ROUTES.RecipeDetail, { recipeId: recipe.id });
  };
  return (
    <>
      <TouchableOpacity onPress={handleCardPress}>
        <View style={styles.cardContainer}>
          <ImageBackground style={styles.imageStyle} source={{ uri: imageUrl }}>
            <View style={{ position: 'absolute', top: 10, right: 10 }}>
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

          <Image
            style={styles.avatarStyle}
            source={{
              uri: avatarUrl,
            }}
          ></Image>

          <View style={{ marginHorizontal: 15, marginTop: 10 }}>
            {/* <StarRating rating={recipe.rating} /> */}
            <Rating
              type="star"
              ratingCount={5}
              startingValue={recipe.rating}
              imageSize={20}
              style={{ alignItems: 'flex-start' }}
              readonly
            />
          </View>

          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
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
                width: '90%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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

  // return (
  //   <View style={styles.cardContainer}>
  //     <ImageBackground
  //       style={styles.imageStyle}
  //       source={{
  //         uri: "https://www.sidechef.com/recipe/cc20c05d-aeca-4029-b717-e77b6f3ea5e0.jpg?d=375x375",
  //       }}
  //     >
  //       <View style={{ position: "absolute", top: 10, right: 10 }}>
  //         <IconButton
  //           mode="contained"
  //           icon="bookmark-outline"
  //           iconColor="white"
  //           containerColor="rgba(0, 0, 0, 0.6 )"
  //           size={20}
  //           onPress={() => {}}
  //         />
  //       </View>
  //       <Text style={styles.timeStyle}>40min</Text>
  //     </ImageBackground>

  //     <Image
  //       style={styles.avatarStyle}
  //       source={{
  //         uri: "https://www.sidechef.com/profile/d88eb0d9-9e88-4841-b8de-9de6283b10db.jpeg?d=980x1120",
  //       }}
  //     ></Image>

  //     <View style={{ marginHorizontal: 14, marginTop: 10 }}>
  //       <StarRating rating={4} />
  //     </View>

  //     <Text
  //       style={{
  //         fontSize: 15,
  //         fontWeight: "bold",
  //         marginHorizontal: 15,
  //         // marginTop: 5,
  //         marginVertical: 10,
  //       }}
  //     >
  //       Zabaglione cùng mứt cherry
  //     </Text>

  //     <View style={styles.buttonStyle}>
  //       <Button
  //         mode="outlined"
  //         onPress={() => {}}
  //         textColor="black"
  //         icon="cart"
  //         style={{
  //           borderRadius: 100,
  //           height: 40,
  //           width: "85%",
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           borderColor: "black",
  //         }}
  //       >
  //         THÊM VÀO GIỎ ĐI CHỢ
  //       </Button>
  //     </View>
  //   </View>
  // );
};

const radius = 20;
const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  cardContainer: {
    width: deviceWidth - 100,
    backgroundColor: 'white',
    height: 430,
    borderRadius: radius,
    shadowColor: 'black',
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
    overflow: 'hidden',
  },
  timeStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: 'white',
    position: 'absolute',
    bottom: 10,
  },
  avatarStyle: {
    position: 'absolute',
    right: 15,
    bottom: 108,
    borderRadius: 25,
    height: '10%',
    width: '14%',
    borderColor: 'white',
    borderWidth: 4,
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
});

export default RecipeCard;
