import { View, Image, StyleSheet } from "react-native";
import CheckBox from "react-native-check-box";
import React, { useState, useCallback } from "react";
import { Text, useTheme } from "react-native-paper";
import { CartEntity } from "../../../api/models/entities/CartEntity/CartEntity";
import { Cart_ItemEntity } from "../../../api/models/entities/Cart_ItemEntity/Cart_ItemEntity";
import { IngredientEntity } from "../../../api/models/entities/IngredientEntity/IngredientEntity";
import { PersonalCartItemEntity } from "../../../api/models/entities/PersonalCartItemEntity/PersonalCartItemEntity";
import { CartItemService } from "../../../api/services/CartItemService";

const CartItemCheckBox = ({
  item,
  total,
  type = "cart",
  handleChangeCartItemData,
  handleChangePersonalCartItemData,
  shorten = false,
}: {
  item: Cart_ItemEntity;
  total?: () => number;
  type?: "cart" | "personal";
  handleChangeCartItemData?: (cartId: number, ingredientId: number) => void;
  handleChangePersonalCartItemData?: (
    id: PersonalCartItemEntity["id"]
  ) => Promise<void>;
  shorten?: boolean;
}) => {
  // const [shorten, setShorten] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [isBought, setIsBought] = useState<Cart_ItemEntity["isBought"]>(
    item.isBought
  );

  const updateCartItem = useCallback(
    async (
      cartID: CartEntity["id"],
      ingredientId: IngredientEntity["id"],
      isBought: Cart_ItemEntity["isBought"]
    ) => {
      try {
        const result = await CartItemService.UpdateCartItem(
          cartID,
          ingredientId,
          isBought
        );
        if (result) {
          console.log("Cập nhật thành công!", "success");
        } else console.log("Thao tác không thành công.", "error");
      } catch (error) {
        console.log(error);
      }
    },
    [item, isBought]
  );

  return (
    <View
      style={
        isBought
          ? { backgroundColor: "rgba(0, 0, 0, 0.1)" }
          : { backgroundColor: "white" }
      }
    >
      <View
        style={{
          flex: 1,
          gap: 10,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            // paddingVertical: 10,
            borderColor: "grey",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 0,
            paddingRight: 16,
            borderTopColor: "lightgrey",
            borderTopWidth: 1,
            paddingTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                // source={{ uri: item.ingredient?.image }}
                source={{
                  uri: "https://www.sidechef.com/ingredient/28cce717-1e68-446e-ac63-18bd27f8b7e9.jpg",
                }}
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "contain",
                  borderRadius: 50,
                  marginHorizontal: 20,
                }}
              ></Image>
              <View>
                <Text
                  variant="bodyLarge"
                  style={{ fontWeight: "bold", color: "#002c36" }}
                >
                  {/* {shorten ? item.cart?.recipe?.name : item.ingredient?.name} */}
                  Chanh
                </Text>
                <Text style={{ color: "grey" }}>
                  {/* {total ? (
              <span style={{ color: "grey" }}>
                {Math.ceil(item.amount)} /{Math.ceil(total())}
                {item?.ingredient.isLiquid ? " (ml)" : " (g)"}
              </span>
            ) : (
              ""
            )} */}
                  300 g
                </Text>
              </View>
            </View>
            <CheckBox
              isChecked={item.isBought}
              onClick={async () => {
                setIsBought(!isBought);
                if (type === "cart" && handleChangeCartItemData) {
                  handleChangeCartItemData(item.cartId, item.ingredient_id);
                  await updateCartItem(
                    item.cartId,
                    item.ingredient_id,
                    !isBought
                  );
                  return;
                }
                if (type === "personal" && handleChangePersonalCartItemData) {
                  await handleChangePersonalCartItemData(item.cartId);
                }
              }}
              // leftText={
              //   <View>
              //     <Image
              //       source={{ uri: item.ingredient?.image }}
              //       //   style={{
              //       //     width: 50,
              //       //     height: 50,
              //       //     objectFit: "contain",
              //       //     borderRadius: "50%",
              //       //     display: shorten ? "none" : "block",
              //       //   }}
              //     ></Image>
              //     <Text>
              //       {shorten ? item.cart?.recipe?.name : item.ingredient?.name}
              //     </Text>
              //     <Text>
              //       {total ? (
              //         <span style={{ color: "grey" }}>
              //           {Math.ceil(item.amount)} /{Math.ceil(total())}
              //           {item?.ingredient.isLiquid ? " (ml)" : " (g)"}
              //         </span>
              //       ) : (
              //         ""
              //       )}
              //     </Text>
              //   </View>
              // }
            ></CheckBox>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItemCheckBox;
