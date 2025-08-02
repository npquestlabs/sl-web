export * from './staff';
export * from './tenant';
export * from './vendor';

export type ApiData = {
  id: string;
  email: string;
  avatarUrl?: string;
};

export type GenericUser = {
  id: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  user: ApiData;
};

export type Complex = {
  id: string;
  name: string;
  countryCode: string;
  cityName: string;
  street: string;
  address: string;
  description?: string;
  totalUnits?: number;
  occupiedUnits?: number;
  createdAt: string;
  updatedAt: string;
};

export type Unit = {
  id: string;
  complexId: string;
  label: string;
  type: string;
  description?: string;
  rentAmount: number;
  rentCurrency: string;
  squareFootage?: number;
  bedrooms?: number;
  bathrooms?: number;
  features?: string[];
  createdAt: string;
  updatedAt: string;
};

export type Tenant = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
};

export type Lease = {
  id: string;
  unitId: string;
  tenantId: string;
  startedAt: string;
  endsAt: string;
  rentAmount: number;
  status: 'active' | 'terminated' | 'expired';
  tenant?: Tenant;
  unit?: Unit;
  complex?: Complex;
  createdAt: string;
  updatedAt: string;
};

export type Payment = {
  id: string;
  leaseId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  paymentDate: string;
  createdAt: string;
  updatedAt: string;
};

export type MaintenanceRequest = {
  id: string;
  unitId: string;
  tenantId?: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  cost?: number;
  vendorId?: string;
  createdAt: string;
  updatedAt: string;
  unit?: Unit;
  complex?: Complex;
};

export type ActivityItem = {
  id: string;
  type:
    | 'lease_signed'
    | 'payment_received'
    | 'maintenance_created'
    | 'maintenance_completed';
  title: string;
  description: string;
  date: string;
  icon?: string;
};

// API Request/Response types
export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type CreateComplexRequest = {
  name: string;
  countryCode: string;
  cityName: string;
  street: string;
  address: string;
  description?: string;
};

export type CreateUnitRequest = {
  label: string;
  type: string;
  description?: string;
  rentAmount: number;
  rentCurrency: string;
};

export type CreateLeaseRequest = {
  unitId: string;
  tenantId: string;
  startedAt: string;
  endsAt: string;
  rentAmount: number;
};

export type CreateMaintenanceRequest = {
  unitId: string;
  description: string;
  priority?: 'low' | 'medium' | 'high';
};

export type RegisterUserSchema = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email: string;
  password: string;
  staff: object;
};

export type RegisterStageOneRequest = {
  email: string;
  user: RegisterUserSchema;
};

export type RegisterStageTwoRequest = {
  otp: string;
  user: RegisterUserSchema;
};

export type MessageResponse = {
  message: string;
};

export type StaffSummary = {
  totalComplexes: number
  totalUnits: number
  activeTenants: number
  unitsWithExpiredLeases: number
  pendingMaintenanceRequests: number
}

export type Paginated<T> = {
  data: T[];
  meta: {
    limit: number;
    page: number;
    total: number;
  };
};


export enum IdType {
  VOTER_ID = "VOTER_ID",
  PASSPORT = "PASSPORT",
  DRIVER_LICENSE = "DRIVER_LICENSE",
  GH_CARD = "GH_CARD"
}

export enum InvoiceStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
  CANCELED = "CANCELED"
};

export enum StaffRole {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  REGULAR = "REGULAR"
}

export enum LeaseStatus {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  TERMINATED = "TERMINATED",
  EXPIRED = "EXPIRED",
  RENEWED = "RENEWED"
}

export enum MaintenanceStatus {
  PENDING = "PENDING",
  SCHEDULED = "SCHEDULED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED"
}

export enum PaymentMethod {
  MOBILE_MONEY = "MOBILE_MONEY",
  BANK_TRANSFER = "BANK_TRANSFER",
  CARD = "CARD",
  CASH = "CASH"
}

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED"
}

export enum PaymentType {
  RENT = "RENT",
  UTILITY = "UTILITY",
  MAINTENANCE = "MAINTENANCE",
  DEPOSIT = "DEPOSIT"
}

export enum UnitType {
  ROOM = "ROOM",
  STUDIO = "STUDIO",
  APARTMENT = "APARTMENT",
  HOUSE = "HOUSE"
}
