import type { ApiData } from '.';

export type StaffUser = {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone?: string;
  proofOfOwnership?: string;
  bankName?: string;
  bankAccount?: string;
  mobileMoneyNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  user: ApiData;
};
