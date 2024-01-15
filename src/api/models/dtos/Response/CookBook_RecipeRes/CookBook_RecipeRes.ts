import { CookBookEntity } from '../../../entities/CookBookEntity/CookBookEntity';
import { RecipeEntity } from '../../../entities/RecipeEntity/RecipeEntity';

export type CookBook_RecipeRes = {
  cook_book_id: CookBookEntity['id'];
  RecipeEntity?: RecipeEntity;
};
