import {
  View,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
  LogBox,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Icon, Text, useTheme } from "react-native-paper";
import { AccountEntity } from "../api/models/entities/AccountEntity/AccountEntity";
import useFirebaseImage from "../api/hooks/useFirebaseImage";
import { RecipeEntity } from "../api/models/entities/RecipeEntity/RecipeEntity";
import { useSpinner } from "../hooks/useSpinner";
import { AccountService } from "../api/services/accountService";
import { PageReq } from "../api/models/dtos/Request/PageReq/PageReq";
import { RecipeService } from "../api/services/recipeService";
import SmallRecipeCard from "../components/common/collections/SmallRecipeCard";
import { ROUTES, SMALL_GAP } from "../constants/common";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const AuthorDetail = ({ route }) => {
  const theme = useTheme();
  const spin = useSpinner();

  const navigation = useNavigation<NavigationProp<any>>();

  const [userData, setUserData] = useState<AccountEntity | undefined>(
    undefined
  );
  const [recipeData, setRecipeData] = useState<RecipeEntity[] | undefined>(
    undefined
  );

  const imageUrl = useFirebaseImage(userData?.avatar);
  const { uid } = route.params
    ? route.params
    : { uid: "Ah3AvtwmXrfuvGFo8sjSO2IOpCg1" };

  const [end, setEnd] = useState(false);
  const [page, setPage] = useState<PageReq>({
    page: 0,
    pageSize: 12,
  });

  const loadMore = async (refresh = false) => {
    if (!uid) {
      return;
    }
    const recipes = await RecipeService.GetRecipesByUserId({
      uids: [uid],
      page: {
        ...page,
        page: !refresh ? page.page + 1 : 1,
      },
    });

    if (recipes.length < page.pageSize) {
      setEnd(true);
    }

    setPage({
      ...page,
      page: !refresh ? page.page + 1 : 1,
    });

    if (recipeData && !refresh) {
      setRecipeData([...recipeData, ...recipes]);
    } else setRecipeData(recipes);
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (uid == "") {
          return;
        }
        spin(true);
        const fetchUser = await AccountService.GetByUid(uid);
        setUserData(fetchUser);

        await loadMore(true);
        spin(false);
      } catch (error) {
        console.log(error);
        spin(false);
      }
    };
    fetchData();
  }, [uid]);

  const handleCardPress = useCallback((id: number) => {
    navigation.navigate(ROUTES.RecipeDetail, { recipeId: id });
  }, []);

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
          <View style={{ flex: 0 }}>
            <View style={{ height: 550 }}>
              <Image
                source={{
                  uri: imageUrl,
                }}
                style={{
                  height: "100%",
                  width: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>
          </View>

          <View style={{ flex: 1, padding: 20, gap: 30 }}>
            <View style={{ flex: 1, gap: 10 }}>
              <Text
                variant="titleMedium"
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: theme.colors.primary,
                }}
              >
                {userData?.slogan}
              </Text>
              <Text
                variant="headlineLarge"
                style={{
                  fontWeight: "bold",
                  color: theme.colors.primary,
                }}
              >
                {userData?.name}
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon
                  source="web"
                  size={20}
                  color={theme.colors.primary}
                ></Icon>

                <Text
                  variant="titleMedium"
                  style={{
                    fontWeight: "bold",
                    color: theme.colors.primary,
                    marginLeft: 5,
                  }}
                >
                  {userData?.link}
                </Text>
              </View>

              <Text
                variant="bodyMedium"
                style={{
                  color: theme.colors.primary,
                }}
              >
                {userData?.introduction}
              </Text>
            </View>

            <View style={{ gap: 10 }}>
              <Text
                variant="titleLarge"
                style={{ fontWeight: "bold", color: theme.colors.primary }}
              >
                Tất cả công thức của {userData?.name}
              </Text>

              <FlatList
                data={recipeData}
                renderItem={({ item }) => (
                  <SmallRecipeCard recipe={item} onPressed={handleCardPress} />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{ gap: SMALL_GAP }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default AuthorDetail;
