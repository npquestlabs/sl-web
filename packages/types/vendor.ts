import type { ApiData } from ".";

export type VendorUser = {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  user: ApiData;
};
