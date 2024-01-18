import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { PrimaryCard } from "./PrimaryCard";
import { Pantry_ItemEntity } from "../../../api/models/entities/Pantry_ItemEntity/Pantry_ItemEntity";
import { RecipeEntity } from "../../../api/models/entities/RecipeEntity/RecipeEntity";
import { PageReq } from "../../../api/models/dtos/Request/PageReq/PageReq";
import { PantryService } from "../../../api/services/pantryService";

const RecommendRecipe = ({
  pantryItems,
  recommendRecipes,
  loadMoreButton,
}: {
  pantryItems: Pantry_ItemEntity[];
  recommendRecipes: RecipeEntity[] | undefined;
  loadMoreButton?: React.ReactNode;
}) => {
  const theme = useTheme();

  // Need by more
  const [needByMoreRecipes, setNeedByMoreRecipes] = useState<
    RecipeEntity[] | undefined
  >(undefined);

  const [page, setPage] = useState<PageReq>({
    page: 0,
    pageSize: 100,
  });
  const [end, setEnd] = useState(false);

  const loadMore = async (refresh = false) => {
    const recommend = await PantryService.GetRecipesByIngredientsAny({
      ingredients: pantryItems.map((item) => item.ingredient_id),
      page: {
        ...page,
        page: refresh ? 1 : page.page + 1,
      },
    });
    if (recommend.length < page.pageSize) {
      setEnd(true);
    }
    if (needByMoreRecipes) {
      setNeedByMoreRecipes((prev) => [...prev, ...recommend]);
    } else {
      setNeedByMoreRecipes(recommend);
    }

    setPage((prev) => ({
      ...prev,
      page: refresh ? 1 : page.page + 1,
    }));
  };

  useEffect(() => {
    async function fetch() {
      try {
        await loadMore(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);

  return (
    <>
      {/* Banner có tất cả */}
      <View
        style={{
          marginTop: 4,
          width: "100%",
          backgroundColor: theme.colors.primary,
          borderRadius: 24,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          gap: 12,
        }}
      >
        <Text
          variant="titleSmall"
          style={{
            fontWeight: "600",
            color: "white",
            textAlign: "left",
          }}
        >
          Tuyệt vời bạn có thể nấu {recommendRecipes?.length ?? 0} món ăn với{" "}
          {pantryItems.length} nguyên liệu!
        </Text>
      </View>

      <View style={{ gap: 12, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {recommendRecipes &&
            recommendRecipes.length > 0 &&
            recommendRecipes.map((i) => {
              const width = 100 / 2;
              return (
                <View key={i.id} style={{ width: `${width}%`, padding: 6 }}>
                  <PrimaryCard recipe={i} />
                </View>
              );
            })}
        </View>
      </View>

      {/* Banner có một số */}
      <View
        style={{
          marginTop: 4,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          variant="headlineSmall"
          style={{
            fontWeight: "900",
            color: theme.colors.primary,
            textAlign: "left",
            width: "100%",
          }}
        >
          Bạn cần mua thêm một số nguyên liệu
        </Text>
      </View>

      <View style={{ gap: 12, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {needByMoreRecipes &&
            needByMoreRecipes.length > 0 &&
            needByMoreRecipes.map((i) => {
              const width = 100 / 2;
              return (
                <View key={i.id} style={{ width: `${width}%`, padding: 6 }}>
                  <PrimaryCard recipe={i} />
                </View>
              );
            })}
        </View>
      </View>
    </>
  );
};

export default RecommendRecipe;
