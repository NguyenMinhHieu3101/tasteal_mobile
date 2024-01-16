import { Text } from "react-native-paper";
import { ScrollView, View } from "react-native";

import { RecipeEntity } from "../api/models/entities/RecipeEntity/RecipeEntity";
import RecipeCard from "./RecipeCard";

const RecipesCarousel = ({ array }: { array: RecipeEntity[] }) => {
  return (
    <>
      {array && array.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ height: 460 }}
        >
          <View style={{ flexDirection: "row", gap: 20 }}>
            {array.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </View>
        </ScrollView>
      ) : (
        <Text>Chưa có công thức nào :(</Text>
      )}
    </>
  );
};

export default RecipesCarousel;
