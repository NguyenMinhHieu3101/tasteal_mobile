import { CookBookEntity } from '../../../entities/CookBookEntity/CookBookEntity';
import { RecipeEntity } from '../../../entities/RecipeEntity/RecipeEntity';

export type RecipeToCookBookReq = {
  cook_book_id: CookBookEntity['id'];
  recipe_id: RecipeEntity['id'];
};
