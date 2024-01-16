import React, { useEffect, useState } from "react";
import { RecipeEntity } from "../../../api/models/entities/RecipeEntity/RecipeEntity";
import { RecipeService } from "../../../api/services/recipeService";
import RecipesCarousel from "../../RecipesCarousel";

const NewReleaseComponent = () => {
  const [newReleases, setNewReleases] = useState<RecipeEntity[] | undefined>(
    undefined
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        setNewReleases(await RecipeService.GetRecipeByDateTime(10));
      } catch (error) {
        console.log(error);
        setNewReleases([]);
      }
    };
    fetchData();
  }, []);
  return <>{newReleases && <RecipesCarousel array={newReleases} />}</>;
};

export default NewReleaseComponent;
