import React from "react";
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-reanimated-carousel";

import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const { width } = Dimensions.get("screen");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, margin: 20 }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 15 }}>
          Daily Inspiration
        </Text>

        <View>
          <Carousel
            loop
            width={width}
            height={460}
            // mode="horizontal-stack"
            autoPlay={true}
            data={[...new Array(6).keys()]}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => console.log("current index:", index)}
            renderItem={({ index }) => <RecipeCard />}
          />
        </View>

        <View>
          <View
            style={{
              marginTop: 35,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Text style={{ flex: 0.9, fontSize: 20, fontWeight: "bold" }}>
              Thịnh hành
            </Text>
            <TouchableOpacity style={{ marginRight: -20 }}>
              <Text
                style={{
                  textTransform: "uppercase",
                  textDecorationLine: "underline",
                }}
              >
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ height: 460 }}
          >
            <View style={{ flexDirection: "row", gap: 20 }}>
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
            </View>
          </ScrollView>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                flex: 0.9,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Vừa ra mắt
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  textTransform: "uppercase",
                  textDecorationLine: "underline",
                }}
              >
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ height: 460 }}
          >
            <View style={{ flexDirection: "row", gap: 20 }}>
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
