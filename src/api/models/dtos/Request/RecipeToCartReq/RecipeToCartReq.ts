import { AccountEntity } from '../../../entities/AccountEntity/AccountEntity';
import { RecipeEntity } from '../../../entities/RecipeEntity/RecipeEntity';

export type RecipeToCartReq = {
  account_id: AccountEntity['uid'];
  recipe_ids: RecipeEntity['id'][];
};
