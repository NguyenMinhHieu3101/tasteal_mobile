import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import { Text, useTheme } from "react-native-paper";
import Container from "../components/common/Container";
import useDefaultBottomSheet from "../hooks/useDefaultBottomSheet";
import DefaultBottomSheet from "../components/common/DefaultBottomSheet";
import CustomTabItem from "../components/ui/pantry/CustomTabItem";
import { DefaultHeader } from "../components/common/Header/DefaultHeader";

import AddIngredient from "../components/ui/pantry/AddIngredient";
import IngredientContent from "../components/ui/pantry/IngredientContent";
import RecommendContent from "../components/ui/pantry/RecommendContent";

const Pantry = ({ navigation }) => {
  const theme = useTheme();
  const bottomSheet = useDefaultBottomSheet();

  const [tabValue, setTabValue] = useState(0);

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

            {/* Nguyên liệu tab */}
            <View
              style={{ gap: 12, display: tabValue === 0 ? "flex" : "none" }}
            >
              <IngredientContent />
            </View>

            {/* Gợi ý tab */}
            <View
              style={{ gap: 12, display: tabValue === 1 ? "flex" : "none" }}
            >
              <RecommendContent />
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
