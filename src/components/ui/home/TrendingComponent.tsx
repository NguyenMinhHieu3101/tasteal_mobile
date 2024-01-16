import React, { useEffect, useState } from "react";

import { RecipeEntity } from "../../../api/models/entities/RecipeEntity/RecipeEntity";
import { RecipeService } from "../../../api/services/recipeService";
import RecipesCarousel from "../../RecipesCarousel";

const TrendingComponent = () => {
  const [trending, setTrending] = useState<RecipeEntity[] | undefined>(
    undefined
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        setTrending(await RecipeService.GetRecipeByRating(10));
      } catch (error) {
        console.log(error);
        setTrending([]);
      }
    };
    fetchData();
  }, []);
  return <>{trending && <RecipesCarousel array={trending} />}</>;
};

export default TrendingComponent;
