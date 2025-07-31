export * from './landlord';
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
  landlord: object;
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

export type SummaryStats = {
  complexes: number;
  units: number;
  tenants: number;
  payments: number;
  maintenanceRequests: number;
};

export type Paginated<T> = {
  data: T[];
  meta: {
    limit: number;
    page: number;
    total: number;
  };
};
