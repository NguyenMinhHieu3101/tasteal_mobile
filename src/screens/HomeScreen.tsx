import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, useTheme } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";

import TrendingComponent from "../components/ui/home/TrendingComponent";
import NewReleaseComponent from "../components/ui/home/NewReleaseComponent";
import MostContributeAuthorsComponent from "../components/ui/home/MostContributeAuthorsComponent";

const Home = () => {
  const theme = useTheme();
  const { width } = Dimensions.get("screen");
  const [recipes, setRecipes] = useState([]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginHorizontal: 20 }}
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

          <View>
            {/* <Carousel
            loop
            width={width}
            height={460}
            mode="parallax"
            autoPlay={true}
            data={[...new Array(6).keys()]}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => {}}
            renderItem={({ index }) => <RecipeCard  />}
            modeConfig={{
              parallaxScrollingScale: 1,
              parallaxScrollingOffset: 80,
            }}
          /> */}
            {/* <Carousel
            loop
            width={width}
            height={460}
            mode="horizontal-stack"
            autoPlay={true}
            data={[...new Array(6).keys()]}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => {}}
            renderItem={({ index }) => <RecipeCard />}
            modeConfig={{
              snapDirection: "left",
              stackInterval: 18,
            }}
          /> */}
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              marginTop: 0,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15,
              justifyContent: "space-between",
            }}
          >
            <Text
              variant="titleLarge"
              style={{
                flex: 0.9,
                fontWeight: "bold",
                color: theme.colors.primary,
              }}
            >
              Thịnh hành
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

          <TrendingComponent />
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15,
              justifyContent: "space-between",
            }}
          >
            <Text
              variant="titleLarge"
              style={{
                flex: 0.9,
                fontWeight: "bold",
                color: theme.colors.primary,
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

          <NewReleaseComponent />
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15,
              justifyContent: "space-between",
            }}
          >
            <Text
              variant="titleLarge"
              style={{
                flex: 0.9,
                fontWeight: "bold",
                color: theme.colors.primary,
              }}
            >
              Đóng góp nhiều nhất
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

          <MostContributeAuthorsComponent />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
