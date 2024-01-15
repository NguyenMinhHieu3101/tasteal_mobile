import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import { List, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Container from "../components/common/Container";
import useDefaultBottomSheet from "../hooks/useDefaultBottomSheet";
import DefaultBottomSheet from "../components/common/DefaultBottomSheet";
import CustomTabItem from "../components/ui/pantry/CustomTabItem";
import { PantryHeader } from "../components/ui/pantry/PantryHeader";
import SecondaryCard from "../components/common/SecondaryCard";
import AddIngredient from "../components/ui/pantry/AddIngredient";

const Pantry = ({ navigation }) => {
  const theme = useTheme();
  const bottomSheet = useDefaultBottomSheet();

  const [tabValue, setTabValue] = useState(0);

  return (
    <DefaultBottomSheet
      bottomSheetHookType={bottomSheet}
      bottomSheetChildren={<></>}
      snapPoints={["20%"]}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
        {/* Header */}
        <PantryHeader navigation={navigation} />

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
                amount={2}
                active={tabValue === 0}
                onPress={() => setTabValue(0)}
              />

              <CustomTabItem
                title="Gợi ý"
                amount={28}
                active={tabValue === 1}
                onPress={() => setTabValue(1)}
              />
            </View>

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
          </Container>
        </ScrollView>

        {/* Add */}
        <AddIngredient />
      </SafeAreaView>
    </DefaultBottomSheet>
  );
};

export default Pantry;
