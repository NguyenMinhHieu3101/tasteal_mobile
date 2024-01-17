import { AccountEntity } from '../../../entities/AccountEntity/AccountEntity';

export type GetAllPantryItemReq = {
  account_id: AccountEntity['uid'];
  pageSize: number;
  page: number;
};
