import { View } from "react-native";
import React from "react";
import { List, Text, useTheme } from "react-native-paper";
import SecondaryCard from "../../common/SecondaryCard";

const IngredientContent = () => {
  const theme = useTheme();

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
      {[1, 2, 3, 4, 5].map((item) => (
        <List.Accordion
          key={item}
          title={
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text
                variant="bodyMedium"
                style={{ fontWeight: "800", color: theme.colors.primary }}
              >
                Fruit
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
                3
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
            {[1, 2, 3, 4, 5].map((i) => {
              const width = 100 / 3;
              return (
                <View key={i} style={{ width: `${width}%`, padding: 6 }}>
                  <SecondaryCard />
                </View>
              );
            })}
          </View>
        </List.Accordion>
      ))}
    </>
  );
};

export default IngredientContent;
