import { AccountEntity } from '../../../entities/AccountEntity/AccountEntity';
import { OccasionEntity } from '../../../entities/OccasionEntity/OccasionEntity';
import { PageReq } from '../PageReq/PageReq';
import { RecipeDirectionReq } from '../RecipeDirectionReq/RecipeDirectionReq';
import { Recipe_IngredientReq } from '../Recipe_IngredientReq/Recipe_IngredientReq';

export type RecipeReq = {
  name: string;
  rating?: number;
  image?: string;
  totalTime?: number;
  active_time?: number;
  serving_size: number;
  introduction?: string;
  author_note?: string;
  is_private: boolean;
  author: string;
  ingredients?: Recipe_IngredientReq[];
  directions?: RecipeDirectionReq[];
  occasions?: OccasionEntity['id'][];
  isDeleted?: boolean;
};

export type RecipeByUids = {
  uids: AccountEntity['uid'][];
  page: PageReq;
};
