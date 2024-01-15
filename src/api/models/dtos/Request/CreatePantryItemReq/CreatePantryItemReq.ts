import { AccountEntity } from '../../../entities/AccountEntity/AccountEntity';
import { IngredientEntity } from '../../../entities/IngredientEntity/IngredientEntity';

export type CreatePantryItemReq = {
  account_id: AccountEntity['uid'];
  ingredient_id: IngredientEntity['id'];
  number: number;
};
