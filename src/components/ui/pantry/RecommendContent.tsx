import { View } from "react-native";
import React from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { PrimaryCard } from "./PrimaryCard";

const RecommendContent = () => {
  const theme = useTheme();

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
          Thật tuyệt vời! Bạn có thể tạo ra 28 món ăn với 48 nguyên liệu!
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
          {[1, 2, 3, 4, 5].map((i) => {
            const width = 100 / 2;
            return (
              <View key={i} style={{ width: `${width}%`, padding: 6 }}>
                <PrimaryCard />
              </View>
            );
          })}
        </View>

        <Button mode="contained">XEM THÊM</Button>
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
          {[1, 2, 3, 4, 5].map((i) => {
            const width = 100 / 2;
            return (
              <View key={i} style={{ width: `${width}%`, padding: 6 }}>
                <PrimaryCard />
              </View>
            );
          })}
        </View>

        <Button mode="contained">XEM THÊM</Button>
      </View>
    </>
  );
};

export default RecommendContent;
