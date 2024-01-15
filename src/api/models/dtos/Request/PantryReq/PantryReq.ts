import { IngredientEntity } from '../../../entities/IngredientEntity/IngredientEntity';
import { PantryEntity } from '../../../entities/PantryEntity/PantryEntity';
import { PageReq } from '../PageReq/PageReq';

export type RecipesIngreAny = {
  ingredients: IngredientEntity['id'][];
  page: PageReq;
};

export type RecipesPantryAny = {
  pantry_id: PantryEntity['id'];
  page: PageReq;
};
