import { CookBookEntity } from '../CookBookEntity/CookBookEntity';
import { RecipeEntity } from '../RecipeEntity/RecipeEntity';

export type CookBook_RecipeEntity = {
  id: number;
  cook_book_id: number;
  recipe_id: number;
  cook_book?: CookBookEntity;
  recipe?: RecipeEntity;
};
