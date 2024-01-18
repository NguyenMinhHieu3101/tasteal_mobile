import { View, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Text, useTheme } from "react-native-paper";
import Container from "../components/common/Container";
import useDefaultBottomSheet from "../hooks/useDefaultBottomSheet";
import DefaultBottomSheet from "../components/common/DefaultBottomSheet";
import CustomTabItem from "../components/ui/pantry/CustomTabItem";
import { DefaultHeader } from "../components/common/Header/DefaultHeader";

import AddIngredient from "../components/ui/pantry/AddIngredient";
import PantryContent from "../components/ui/pantry/PantryContent";
import RecommendRecipe from "../components/ui/pantry/RecommendRecipe";
import LoginContext from "../contexts/LoginContext";
import { Pantry_ItemEntity } from "../api/models/entities/Pantry_ItemEntity/Pantry_ItemEntity";
import { PantryItemService } from "../api/services/pantryItemService";
import { RecipeEntity } from "../api/models/entities/RecipeEntity/RecipeEntity";
import { PageReq } from "../api/models/dtos/Request/PageReq/PageReq";
import { PantryService } from "../api/services/pantryService";
import { GetAllPantryItemReq } from "../api/models/dtos/Request/GetAllPantryItemReq/GetAllPantryItemReq";

const Pantry = ({ navigation }) => {
  const theme = useTheme();
  const bottomSheet = useDefaultBottomSheet();
  const { login } = useContext(LoginContext);

  const [tabValue, setTabValue] = useState(0);

  // tab tủ lạnh
  const [pantryItems, setPantryItems] = useState<Pantry_ItemEntity[]>([]);

  const hanlePantryItemsChange = async (
    type: "add" | "remove" | "update",
    item: Pantry_ItemEntity[]
  ) => {
    const ids = item.map((i) => i.id);
    switch (type) {
      case "add":
        setPantryItems((prev) => [...prev, ...item]);
        break;
      case "remove":
        setPantryItems((prev) => prev.filter((i) => !ids.includes(i.id)));
        const deleteResult = await PantryItemService.DeletePantryItem(
          item[0].id
        );
        // if (deleteResult) {
        //   snackbarAlert("Xóa thành công", "success");
        // } else {
        //   snackbarAlert("Xóa thất bại", "error");
        // }

        break;
      case "update":
        setPantryItems((prev) => {
          return prev.map((i) => {
            if (ids.includes(i.id)) {
              return item.find((item) => item.id === i.id)!;
            } else {
              return i;
            }
          });
        });
        const result = await PantryItemService.UpdatePantryItem(
          item[0].id,
          item[0].amount
        );
        // if (result) {
        //   snackbarAlert("Cập nhật thành công", "success");
        // } else {
        //   snackbarAlert("Cập nhật thất bại", "error");
        // }
        break;
    }
  };

  // tab gợi ý
  const [recommendRecipes, setRecommendRecipes] = useState<
    RecipeEntity[] | undefined
  >(undefined);
  const [page, setPage] = useState<PageReq>({
    page: 0,
    pageSize: 100,
  });
  const [end, setEnd] = useState(false);

  const loadMore = async (refresh = false) => {
    const recommend = await PantryService.GetRecipesByIngredientsAll({
      ingredients: pantryItems.map((item) => item.ingredient_id),
      page: {
        ...page,
        page: refresh ? 1 : page.page + 1,
      },
    });
    if (recommend.length < page.pageSize) {
      setEnd(true);
    }
    if (recommendRecipes && !refresh) {
      setRecommendRecipes((prev) => [...prev, ...recommend]);
    } else {
      setRecommendRecipes(recommend);
    }

    setPage((prev) => ({
      ...prev,
      page: refresh ? 1 : page.page + 1,
    }));
  };

  // use effect
  useEffect(() => {
    async function fetch() {
      try {
        await loadMore(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [pantryItems]);

  useEffect(() => {
    async function fetch() {
      try {
        if (!login.user) {
          return;
        }
        // lấy pantryItems
        const final = await PantryItemService.GetAllPantryItemsByAccountId({
          account_id: login.user.uid,
          pageSize: 2147483647,
          page: 1,
        } as GetAllPantryItemReq);

        setPantryItems(final);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);

  return (
    <DefaultBottomSheet
      bottomSheetHookType={bottomSheet}
      bottomSheetChildren={
        <View style={{ flex: 1, padding: 20 }}>
          <Text>huy</Text>
        </View>
      }
      snapPoints={["45%"]}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
        {/* Header */}
        <DefaultHeader navigation={navigation} />

        {/* Body */}
        <ScrollView style={{ flex: 1 }}>
          <Container style={{ gap: 12 }}>
            {/* Title */}
            <View style={{ gap: 4 }}>
              <Text
                variant="headlineMedium"
                style={{ fontWeight: "900", color: theme.colors.primary }}
              >
                Tủ lạnh
              </Text>
              <Text
                variant="titleMedium"
                style={{ fontWeight: "400", color: theme.colors.primary }}
              >
                Thêm nguyên liệu bạn có ở nhà để tìm công thức bạn có thể nấu
                ngay.
              </Text>
            </View>

            {/* Tabs */}
            <View style={{ flexDirection: "row", gap: 32 }}>
              <CustomTabItem
                title="Nguyên liệu"
                amount={
                  pantryItems.length > 99
                    ? "99+"
                    : pantryItems.length.toString()
                }
                active={tabValue === 0}
                onPress={() => setTabValue(0)}
              />

              <CustomTabItem
                title="Gợi ý"
                amount={"28"}
                active={tabValue === 1}
                onPress={() => setTabValue(1)}
              />
            </View>

            {/* Nguyên liệu tab */}
            <View
              style={{ gap: 12, display: tabValue === 0 ? "flex" : "none" }}
            >
              <PantryContent
                pantryItems={pantryItems}
                hanlePantryItemsChange={hanlePantryItemsChange}
              />
            </View>

            {/* Gợi ý tab */}
            <View
              style={{ gap: 12, display: tabValue === 1 ? "flex" : "none" }}
            >
              <RecommendRecipe
                pantryItems={pantryItems}
                recommendRecipes={recommendRecipes}
                loadMoreButton={
                  <TouchableOpacity onPress={() => loadMore()} disabled={end}>
                    {end ? "Đã hiển thị toàn bộ công thức phù hợp" : "Xem thêm"}
                  </TouchableOpacity>
                }
              />
            </View>
          </Container>
        </ScrollView>

        {/* Add */}
        <AddIngredient onPress={() => bottomSheet.openBottomSheet()} />
      </View>
    </DefaultBottomSheet>
  );
};

export default Pantry;
