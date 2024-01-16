import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, useTheme } from "react-native-paper";

import TrendingComponent from "../components/ui/home/TrendingComponent";
import NewReleaseComponent from "../components/ui/home/NewReleaseComponent";
import MostContributeCarousel from "../components/ui/home/MostContributeCarousel";

const Home = () => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginLeft: 20 }}
      >
        <View>
          <Text
            variant="headlineLarge"
            style={{
              fontWeight: "bold",
              marginVertical: 15,
              color: theme.colors.primary,
            }}
          >
            Daily Inspiration
          </Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              marginTop: 0,
              flexDirection: "column",
              marginBottom: 15,
            }}
          >
            <Text
              variant="titleLarge"
              style={{
                fontWeight: "bold",
                color: theme.colors.primary,
                textTransform: "uppercase",
              }}
            >
              Thịnh hành
            </Text>

            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.primary, paddingVertical: 5 }}
            >
              Những công thức được mọi người yêu thích nhất!
            </Text>
          </View>

          <TrendingComponent />
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={{ marginBottom: 15, marginRight: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",

                justifyContent: "space-between",
              }}
            >
              <Text
                variant="titleLarge"
                style={{
                  flex: 0.9,
                  fontWeight: "bold",
                  color: theme.colors.primary,
                  textTransform: "uppercase",
                }}
              >
                Vừa ra mắt
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    textTransform: "uppercase",
                    textDecorationLine: "underline",
                    color: theme.colors.primary,
                  }}
                >
                  Xem tất cả
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.primary, paddingVertical: 5 }}
            >
              Các công thức nấu ăn nhanh, mới, dễ đi chợ giúp bạn tiết kiệm thời
              gian và tiền bạc.
            </Text>
          </View>

          <NewReleaseComponent />
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              alignItems: "center",
              marginBottom: 15,
              justifyContent: "space-between",
              marginRight: 20,
            }}
          >
            <Text
              variant="titleLarge"
              style={{
                flex: 0.9,
                fontWeight: "bold",
                color: theme.colors.primary,
                textTransform: "uppercase",
              }}
            >
              Đóng góp nhiều nhất
            </Text>

            <Text
              variant="bodyMedium"
              style={{
                color: theme.colors.primary,
                textAlign: "center",
                paddingVertical: 5,
              }}
            >
              Gặp gỡ cộng đồng các chuyên gia ẩm thực, người viết blog ẩm thực
              cho đến các đầu bếp bậc thầy của chúng tôi từ khắp nơi trên thế
              giới.
            </Text>
          </View>

          <MostContributeCarousel />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
