import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { List, Text, useTheme } from "react-native-paper";
import PantryCard from "./PantryCard";
import { Ingredient_TypeEntity } from "../../../api/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity";
import { Pantry_ItemEntity } from "../../../api/models/entities/Pantry_ItemEntity/Pantry_ItemEntity";
import { IngredientTypeService } from "../../../api/services/ingredientTypeService";

export type DisplayPantryItem = {
  ingredientType?: Ingredient_TypeEntity;
  ingredients: Pantry_ItemEntity[];
};

const PantryContent = ({
  pantryItems,
  hanlePantryItemsChange,
}: {
  pantryItems: Pantry_ItemEntity[];
  hanlePantryItemsChange: (
    type: "add" | "remove" | "update",
    item: Pantry_ItemEntity[]
  ) => Promise<void>;
}) => {
  const theme = useTheme();

  //#region Text Search
  const [searchText, setSearchText] = useState("");
  //#endregion

  //#region Pantry
  const [pantryDataDisplay, setPantryDataDisplay] = useState<
    DisplayPantryItem[]
  >([]);

  const [ingredientType, setIngredientType] = useState<Ingredient_TypeEntity[]>(
    []
  );

  //#endregion

  useEffect(() => {
    async function fetch() {
      try {
        let final = ingredientType.map((type) => {
          return {
            ingredientType: type,
            ingredients: pantryItems.filter((item) => {
              return item.ingredient?.type_id == type.id;
            }),
          };
        });

        if (pantryItems.map((item) => item.ingredient.type_id).includes(null)) {
          final.push({
            ingredientType: null,
            ingredients: pantryItems.filter((item) => {
              return item.ingredient.type_id == null;
            }),
          });
        }

        final = final.sort(
          (a, b) => b.ingredients.length - a.ingredients.length
        );

        setPantryDataDisplay(
          final.map((item) => ({
            ...item,
            ingredients: item.ingredients.sort((a, b) =>
              a.ingredient?.name < b.ingredient?.name ? -1 : 1
            ),
          }))
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [pantryItems, ingredientType]);

  useEffect(() => {
    async function fetch() {
      try {
        const types = await IngredientTypeService.GetAllIngredientTypes();

        setIngredientType(types);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);

  return (
    <>
      {/* Banner welcome */}
      <View
        style={{
          marginTop: 4,
          width: "100%",
          backgroundColor: theme.colors.primary,
          borderRadius: 24,
          justifyContent: "center",
          alignItems: "center",
          padding: 32,
          gap: 12,
        }}
      >
        <Text
          variant="titleMedium"
          style={{
            fontWeight: "900",
            color: "white",
            textAlign: "center",
            width: "50%",
          }}
        >
          Chào mừng đến với Tủ lạnh!
        </Text>

        <Text
          variant="titleSmall"
          style={{
            fontWeight: "400",
            color: "white",
            textAlign: "center",
          }}
        >
          Những nguyên liệu bạn thường có ở nhà!
        </Text>
      </View>

      {/* List Accordion */}
      {pantryDataDisplay.length > 0 &&
        pantryDataDisplay.map((item, index) => {
          const displayPantryItem = {
            ingredientType: item.ingredientType,
            ingredients: item.ingredients.filter((ingre) =>
              ingre.ingredient?.name
                .toLowerCase()
                .includes(searchText.toLowerCase())
            ),
          };
          return (
            <List.Accordion
              key={index}
              style={{
                display:
                  displayPantryItem.ingredients.length > 0 ? "flex" : "none",
              }}
              title={
                <View style={{ flexDirection: "row", gap: 4 }}>
                  <Text
                    variant="bodyMedium"
                    style={{ fontWeight: "800", color: theme.colors.primary }}
                  >
                    {displayPantryItem.ingredientType
                      ? displayPantryItem.ingredientType.name
                      : "Khác"}
                  </Text>

                  <Text
                    variant="bodyMedium"
                    style={{ fontWeight: "800", color: theme.colors.primary }}
                  >
                    •
                  </Text>

                  <Text
                    variant="bodyMedium"
                    style={{ fontWeight: "800", color: theme.colors.primary }}
                  >
                    {displayPantryItem.ingredients.length}
                  </Text>
                </View>
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                {displayPantryItem.ingredients.map((i) => {
                  const width = 100 / 3;
                  return (
                    <View key={i.id} style={{ width: `${width}%`, padding: 6 }}>
                      <PantryCard
                        item={i}
                        hanlePantryItemsChange={hanlePantryItemsChange}
                      />
                    </View>
                  );
                })}
              </View>
            </List.Accordion>
          );
        })}
    </>
  );
};

export default PantryContent;
