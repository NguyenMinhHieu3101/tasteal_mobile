import { View, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Icon, List, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "react-native-paper";
import Container from "../components/common/Container";
import useDefaultBottomSheet from "../hooks/useDefaultBottomSheet";
import DefaultBottomSheet from "../components/common/DefaultBottomSheet";
import CustomTabItem from "../components/ui/pantry/CustomTabItem";
import Header from "../components/common/Header";

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
        <Header>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              width: "100%",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Avatar.Image
                size={28}
                source={require("../../assets/favicon.png")}
              />
            </TouchableOpacity>

            <View style={{ flexDirection: "row", gap: 8 }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                    borderColor: theme.colors.primary,
                    borderWidth: 1,
                    padding: 4,
                    paddingHorizontal: 8,
                    borderRadius: 100,
                  }}
                >
                  <Icon
                    source="bookmark-outline"
                    size={20}
                    color={theme.colors.primary}
                  />
                  <Text
                    style={{ fontWeight: "bold", color: theme.colors.primary }}
                  >
                    8
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                    borderColor: theme.colors.primary,
                    borderWidth: 1,
                    padding: 4,
                    paddingHorizontal: 8,
                    borderRadius: 100,

                    backgroundColor: theme.colors.primary,
                  }}
                >
                  <Icon source="cart" size={20} color="white" />
                  <Text style={{ fontWeight: "bold", color: "white" }}>6</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Header>

        <ScrollView style={{ flex: 1 }}>
          <Container style={{ gap: 12 }}>
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
              </List.Accordion>
            ))}
          </Container>
        </ScrollView>
      </SafeAreaView>
    </DefaultBottomSheet>
  );
};

export default Pantry;
