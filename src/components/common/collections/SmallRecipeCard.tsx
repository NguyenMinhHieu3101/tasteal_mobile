import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, Button, IconButton, Text, useTheme } from 'react-native-paper';

import useFirebaseImage from '../../../api/hooks/useFirebaseImage';
import { RecipeEntity } from '../../../api/models/entities/RecipeEntity/RecipeEntity';
import {
  SMALL_GAP as COMMON_GAP,
  PADDING_HORIZONTAL,
  ROUTES,
} from '../../../constants/common';
import StarRating from '../../StarRating';

type SmallRecipeCard = {
  recipe: RecipeEntity;
  onPressed?: (id: number) => void;
};

const SmallRecipeCard = ({ recipe, onPressed }: SmallRecipeCard) => {
  // #region Hooks

  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();

  // #endregion
  // #region Images

  const imageUrl = useFirebaseImage(recipe.image || '');
  const avatarUrl = useFirebaseImage(recipe.account.avatar || '');

  // #endregion
  // #region Handlers

  const handleCardPress = () => {
    onPressed && onPressed(recipe.id);
  };

  // #endregion

  return (
    <>
      <TouchableOpacity onPress={handleCardPress}>
        <View style={styles.cardContainer}>
          <ImageBackground style={styles.imageStyle} source={{ uri: imageUrl }}>
            <View style={{ position: 'absolute', top: 4, right: 4 }}>
              <IconButton
                mode="contained"
                icon="bookmark-outline"
                iconColor="white"
                containerColor="rgba(0, 0, 0, 0.6 )"
                size={16}
                onPress={() => {}}
              />
            </View>
            <Text variant="labelMedium" style={styles.timeStyle}>
              {recipe.totalTime} phút
            </Text>
          </ImageBackground>

          <View style={styles.infoContainer}>
            <Avatar.Image
              style={styles.avatarStyle}
              size={24}
              source={{
                uri: avatarUrl,
              }}
            />
            <View style={{ marginHorizontal: 14, marginTop: 10 }}>
              <StarRating rating={recipe.rating} />
            </View>
            <Text style={[styles.name, { color: theme.colors.primary }]}>
              {recipe.name}
            </Text>

            <View
              style={{
                alignItems: 'center',
                flexGrow: 1,
                justifyContent: 'flex-end',
                paddingBottom: 16,
              }}
            >
              <TouchableOpacity
                onPress={() => {}}
                style={[
                  styles.buttonStyle,
                  { borderColor: theme.colors.primary },
                ]}
              >
                <Text
                  variant="bodySmall"
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: theme.colors.primary,
                  }}
                >
                  THÊM {recipe.ingredients?.length || 2} NGUYÊN LIỆU
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const RADIUS = 20;
const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  cardContainer: {
    width: (deviceWidth - PADDING_HORIZONTAL * 2 - COMMON_GAP) / 2,
    backgroundColor: 'white',
    height: 300,
    borderRadius: RADIUS,
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9,
    marginBottom: COMMON_GAP,
  },
  imageStyle: {
    height: 180,
    width: (deviceWidth - PADDING_HORIZONTAL * 2 - COMMON_GAP) / 2,
    borderTopLeftRadius: RADIUS,
    borderTopRightRadius: RADIUS,
    overflow: 'hidden',
  },
  timeStyle: {
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: 'white',
    position: 'absolute',
    bottom: 10,
  },
  infoContainer: {
    position: 'relative',
    flex: 1,
  },
  avatarStyle: {
    position: 'absolute',
    top: -14,
    right: 12,
    // add border
    borderColor: 'white',
    borderWidth: 16,
    borderRadius: 100,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  buttonStyle: {
    width: '90%',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 4,
    justifyContent: 'center',
  },
});

export default SmallRecipeCard;
