import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';
import { AirbnbRating, Rating } from 'react-native-ratings';
import useFirebaseImage from '../api/hooks/useFirebaseImage';
import { RecipeRes } from '../api/models/dtos/Response/RecipeRes/RecipeRes';
import { RecipeEntity } from '../api/models/entities/RecipeEntity/RecipeEntity';
import { RecipeService } from '../api/services/recipeService';
import Container from '../components/common/Container';
import DirectionList from '../components/common/collections/DirectionList';
import IngredientList from '../components/common/collections/IngredientList';
import useDefaultBottomSheet from '../hooks/useDefaultBottomSheet';
import { useSpinner } from '../hooks/useSpinner';

const RecipeDetail = ({ route, navigation }) => {
  const theme = useTheme();
  const widthDevice = Dimensions.get('screen').width;
  const heightDevice = Dimensions.get('screen').height;
  const [currentRecipe, setCurrentRecipe] = useState<RecipeRes>(null);

  const { recipeId } = route.params ? route.params : { recipeId: 4 };

  const spin = useSpinner();
  const [showMore, setShowMore] = useState(false);

  useLayoutEffect(() => {
    let active = true;

    (async () => {
      let entities;

      spin(true);
      try {
        entities = await RecipeService.GetById(Number(recipeId));
      } catch (error) {
        console.log('error', error);
      } finally {
      }

      if (!active) return;

      setCurrentRecipe(entities);

      spin(false);
    })();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <IconButton
          style={{ marginLeft: -10 }}
          icon="arrow-left"
          size={24}
          onPress={() => navigation.navigate('DoThang')}
        />
      ),
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerShadowVisible: false,
    });
  }, [navigation, currentRecipe]);

  const imageRecipeUrl = useFirebaseImage(currentRecipe?.image);

  const renderIngredient = useCallback(
    ({ item }) => {
      return <IngredientList item={item} />;
    },
    [currentRecipe]
  );

  const renderDirection = useCallback(
    ({ item }) => {
      return <DirectionList item={item} />;
    },
    [currentRecipe]
  );

  const renderNutritionInfo = (nutrition, index) => (
    <View
      key={index}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 12,
        paddingBottom: 8,
      }}
    >
      <Text
        variant="labelLarge"
        style={{
          color: theme.colors.primary,
          flex: 6,
          fontWeight: nutrition[0] === 'calories' ? 'bold' : 'normal',
          paddingLeft: 12,
        }}
      >
        {nutrition[0]}
      </Text>
      <Text
        variant="bodyMedium"
        style={{
          color: theme.colors.primary,
          flex: 2,
          textAlign: 'left',
          fontWeight: nutrition[0] === 'calories' ? 'bold' : 'normal',
        }}
      >
        {nutrition[1]}g
      </Text>
    </View>
  );

  let nutritionEntries = null;
  if (currentRecipe != null) {
    nutritionEntries = Object.entries(currentRecipe.nutrition_info).slice(1);
  }
  return currentRecipe == null ? (
    <View style={{ flex: 1 }} />
  ) : (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={{ flex: 0 }}>
          <View style={{ height: 520 }}>
            <Image
              source={{ uri: imageRecipeUrl }}
              style={{
                height: '100%',
                width: '100%',
                resizeMode: 'cover',
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              position: 'absolute',
              bottom: -50,
              width: '100%',
            }}
          >
            <View
              style={{
                backgroundColor: theme.colors.background,
                padding: 20,
                alignItems: 'center',
                width: '90%',
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <Text style={{ color: theme.colors.primary }}>CÔNG THỨC</Text>
              <Text
                variant="headlineSmall"
                style={{
                  fontWeight: 'bold',
                  color: theme.colors.primary,
                  marginVertical: 8,
                }}
              >
                {currentRecipe.name}
              </Text>
              <Text style={{ color: theme.colors.primary }}>
                <Text
                  style={{ fontWeight: 'bold', color: theme.colors.primary }}
                >
                  by
                </Text>{' '}
                {currentRecipe.author.name}
              </Text>
            </View>
          </View>
        </View>

        <Container
          style={{
            width: '100%',
            flex: 1,
            marginTop: 100,
            backgroundColor: theme.colors.background,
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              gap: 16,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: theme.colors.primary,

                    // padding: 4,
                  }}
                >
                  {currentRecipe.rating % 1 === 0
                    ? currentRecipe.rating.toFixed(1)
                    : currentRecipe.rating}
                </Text>
              </View>

              <View>
                <Rating
                  type="star"
                  ratingCount={5}
                  startingValue={currentRecipe.rating}
                  imageSize={20}
                  style={{}}
                  readonly
                />
              </View>
            </View>
            <Text
              variant="bodyMedium"
              style={{
                color: theme.colors.primary,
                //  fontFamily: "roboto",
                textAlign: 'justify',
                marginTop: 24,
              }}
            >
              {currentRecipe.introduction}
            </Text>
            <View style={{ flexDirection: 'column' }}>
              <View
                style={{
                  backgroundColor: theme.colors.background,
                  padding: 30,
                  paddingHorizontal: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '90%',
                  borderRadius: 12,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  gap: 16,
                  marginTop: 24,
                }}
              >
                <Text
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    color: theme.colors.primary,
                  }}
                  variant="titleMedium"
                >
                  {currentRecipe.totalTime} phút
                </Text>
                <Text
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontStyle: 'italic',
                    color: theme.colors.primary,
                  }}
                  variant="labelSmall"
                >
                  Tổng thời gian
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontWeight: 'bold',
                color: theme.colors.primary,
                textAlign: 'left',
                width: '100%',
              }}
              variant="titleMedium"
            >
              {' '}
              Nguyên liệu
            </Text>
            <FlatList
              key="ingredient-flat-list"
              data={currentRecipe.ingredients}
              renderItem={renderIngredient}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              style={{
                flex: 1,
                width: '100%',
                marginBottom: 20,
                flexDirection: 'column',
              }}
            />

            <Button
              mode="contained"
              style={{
                width: '100%',
                marginBottom: 24,
              }}
              onPress={() => {
                navigation.navigate('#');
              }}
            >
              <Text
                variant="labelLarge"
                style={{ color: 'white', fontWeight: 'bold' }}
              >
                THÊM VÀO GIỎ
              </Text>
            </Button>

            <Text
              style={{
                fontWeight: 'bold',
                color: theme.colors.primary,
                textAlign: 'left',
                width: '100%',
              }}
              variant="titleMedium"
            >
              Dinh dưỡng mỗi bữa ăn
            </Text>

            <View>
              {nutritionEntries
                .map(renderNutritionInfo)
                .slice(0, showMore ? undefined : 3)}

              {!showMore && nutritionEntries.length > 3 && (
                <Pressable onPress={() => setShowMore(true)}>
                  <Text
                    style={{
                      color: theme.colors.primary,
                      fontStyle: 'italic',
                      textAlign: 'center',
                    }}
                  >
                    Xem thêm
                  </Text>
                </Pressable>
              )}

              {showMore && (
                <Pressable onPress={() => setShowMore(false)}>
                  <Text
                    style={{
                      color: theme.colors.primary,
                      fontStyle: 'italic',
                      textAlign: 'center',
                    }}
                  >
                    Ẩn bớt
                  </Text>
                </Pressable>
              )}
            </View>

            {currentRecipe.author_note && (
              <Text
                style={{
                  fontWeight: 'bold',
                  color: theme.colors.primary,
                  textAlign: 'left',
                  width: '100%',
                }}
                variant="titleMedium"
              >
                {' '}
                Ghi chú của tác giả
              </Text>
            )}
            <Text
              style={{
                fontWeight: 'bold',
                color: theme.colors.primary,
                textAlign: 'left',
                width: '100%',
              }}
              variant="titleMedium"
            >
              {' '}
              Hướng dẫn
            </Text>
            <Text style={{ marginBottom: 24 }}>{''}</Text>
          </View>

          <FlatList
            key="direction-flat-list"
            data={currentRecipe.directions}
            renderItem={renderDirection}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            style={{
              flex: 1,
              width: '100%',
              marginBottom: 20,
              flexDirection: 'column',
            }}
          />
        </Container>
      </View>
    </ScrollView>
  );
};

export default RecipeDetail;
