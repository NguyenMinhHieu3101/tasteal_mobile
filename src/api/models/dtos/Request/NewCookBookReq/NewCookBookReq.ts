import { AccountEntity } from '../../../entities/AccountEntity/AccountEntity';

export type NewCookBookReq = {
  name: string;
  owner: AccountEntity['uid'];
};
