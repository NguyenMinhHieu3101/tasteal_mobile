import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { Icon, IconButton, Text, useTheme } from "react-native-paper";
import { Pantry_ItemEntity } from "../../../api/models/entities/Pantry_ItemEntity/Pantry_ItemEntity";
import { LinearGradient } from "expo-linear-gradient";
import useFirebaseImage from "../../../api/hooks/useFirebaseImage";

const borderRadius = 20;
const cardHeight = 172;
const imageHeight = "68%";
const shadow = {
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.2,
};
const spacing = 8;

const PantryCard = ({
  item,
  hanlePantryItemsChange,
}: {
  hanlePantryItemsChange: (
    type: "add" | "remove" | "update",
    item: Pantry_ItemEntity[]
  ) => Promise<void>;
  item: Pantry_ItemEntity;
}) => {
  const theme = useTheme();

  const image = useFirebaseImage(item.ingredient.image || "");
  return (
    <View
      style={{
        backgroundColor: "white",
        width: "100%",
        height: cardHeight,
        ...shadow,
        borderRadius: borderRadius,
      }}
    >
      <View
        style={{
          borderRadius: borderRadius,
          overflow: "hidden",
          flex: 1,
        }}
      >
        <View style={{ height: imageHeight }}>
          <Image
            source={{
              uri: image,
            }}
            style={{ flex: 1 }}
          />

          <TouchableOpacity
            onPress={async () => {
              await hanlePantryItemsChange("remove", [item]);
            }}
            style={{
              position: "absolute",
              right: spacing,
              top: spacing,
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: 100,
              padding: 4,
            }}
          >
            <Icon source="close" size={16} color={"white"} />
          </TouchableOpacity>

          <View
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              padding: spacing,
            }}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.15)"]}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "250%",
              }}
            />
            <Text
              variant="bodySmall"
              style={{ fontWeight: "700", color: "white" }}
            >
              {getLabelAmount(item.amount, item.ingredient.isLiquid)}
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          <Text
            variant="bodySmall"
            numberOfLines={1}
            style={{
              fontWeight: "900",
              color: theme.colors.primary,
              textAlign: "center",
            }}
          >
            {item.ingredient?.name}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PantryCard;

function getLabelAmount(amount: number, isLiquid: boolean) {
  let amountStr = "";
  if (isLiquid) {
    if (amount >= 1000) {
      amountStr = `${amount / 1000}  lit`;
    } else {
      amountStr = `${amount} ml`;
    }
  } else {
    if (amount >= 1000) {
      amountStr = `${amount / 1000} kg`;
    } else {
      amountStr = `${amount} g`;
    }
  }

  return amountStr;
}
