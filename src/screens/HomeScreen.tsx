import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";

import RecipeCard from "../components/RecipeCard";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Daily Inspiration</Text>
      <RecipeCard style={styles.card} />

      <View style={styles.subTitleRow}>
        <Text style={styles.subTitle}>Trending Now</Text>
        <TouchableOpacity>
          <Text style={styles.viewButton}>View all</Text>
        </TouchableOpacity>
      </View>
      <RecipeCard />

      <View style={styles.subTitleRow}>
        <Text style={styles.subTitle}>New Releases</Text>
        <TouchableOpacity>
          <Text style={styles.viewButton}>View all</Text>
        </TouchableOpacity>
      </View>
      <RecipeCard />

      <View style={styles.subTitleRow}>
        <Text style={styles.subTitle}>New Everyday Dishes</Text>
        <TouchableOpacity>
          <Text style={styles.viewButton}>View all</Text>
        </TouchableOpacity>
      </View>
      <RecipeCard />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginLeft: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
  },
  card: {
    marginBottom: 30,
  },
  subTitleRow: {
    marginTop: 35,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  subTitle: {
    flex: 0.9,
    fontSize: 20,
    fontWeight: "bold",
  },
  viewButton: {
    textTransform: "uppercase",
    textDecorationLine: "underline",
  },
});

export default HomeScreen;
