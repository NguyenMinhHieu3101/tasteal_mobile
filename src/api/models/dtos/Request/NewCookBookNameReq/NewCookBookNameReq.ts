import { CookBookEntity } from '../../../entities/CookBookEntity/CookBookEntity';

export type NewCookBookNameReq = {
  id: CookBookEntity['id'];
  name: CookBookEntity['name'];
};
