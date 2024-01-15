import { CookBookEntity } from '../../../entities/CookBookEntity/CookBookEntity';

export type CookBookRes = {
  id: CookBookEntity['id'];
  name: CookBookEntity['name'];
};
