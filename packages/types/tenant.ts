import type { ApiData } from '.';

export type TenantUser = {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  user: ApiData;
};
