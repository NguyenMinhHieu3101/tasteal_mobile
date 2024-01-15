import { CookBook_RecipeEntity } from '../../../entities/CookBook_RecipeEntity/CookBook_RecipeEntity';
import { CookBookEntity } from '../../../entities/CookBookEntity/CookBookEntity';

export type NewRecipeCookBookReq = {
  cookbook_recipe_id: CookBook_RecipeEntity['id'];
  cookbook_id: CookBookEntity['id'];
};
