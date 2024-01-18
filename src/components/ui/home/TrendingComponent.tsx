import React, { useEffect, useState } from "react";

import { RecipeEntity } from "../../../api/models/entities/RecipeEntity/RecipeEntity";
import { RecipeService } from "../../../api/services/recipeService";
import RecipesCarousel from "../../RecipesCarousel";
import { useSpinner } from "../../../hooks/useSpinner";

const TrendingComponent = () => {
  const spin = useSpinner();

  const [firstTime, setFirstTime] = useState(true); // Set to false after data loaded
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState<RecipeEntity[] | undefined>(
    undefined
  );

  useEffect(() => {
    let active = true;
    setLoading(true);
    spin(true);

    const fetchData = async () => {
      try {
        setTrending(await RecipeService.GetRecipeByRating(10));
      } catch (error) {
        console.log(error);
        setTrending([]);
      }

      if (!active) return;

      setLoading(false);
      setFirstTime(false);
      spin(false);
    };
    fetchData();
  }, []);
  return <>{trending && <RecipesCarousel array={trending} />}</>;
};

export default TrendingComponent;
