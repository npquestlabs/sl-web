import {
  Complex,
  Unit,
  Lease,
  Payment,
  MaintenanceRequest,
  DashboardStats,
  ActivityItem,
  UserPOJO,
  Tenant,
} from "../types";
import { ApiResponse } from "./httpService";

// Dummy data that strictly adheres to our types
export const dummyUser: UserPOJO = {
  id: "1",
  firstName: "Sarah",
  lastName: "Johnson",
  email: "sarah@example.com",
  phone: "+1 (555) 123-4567",
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-01-15T10:00:00Z",
};

export const dummyComplexes: Complex[] = [
  {
    id: "1",
    name: "Willow Creek Apartments",
    countryCode: "US",
    cityName: "Anytown",
    street: "123 Oak Street",
    address: "123 Oak Street, Anytown, CA 91234",
    description: "Modern apartment complex with 24 units",
    totalUnits: 24,
    occupiedUnits: 18,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Maplewood Estates",
    countryCode: "US",
    cityName: "Anytown",
    street: "456 Pine Avenue",
    address: "456 Pine Avenue, Anytown, CA 91234",
    description: "Luxury townhomes with private parking",
    totalUnits: 16,
    occupiedUnits: 14,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Cedar Ridge Townhomes",
    countryCode: "US",
    cityName: "Anytown",
    street: "789 Elm Road",
    address: "789 Elm Road, Anytown, CA 91234",
    description: "Family-friendly community with playground",
    totalUnits: 32,
    occupiedUnits: 20,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Birchwood Condos",
    countryCode: "US",
    cityName: "Anytown",
    street: "1011 Spruce Lane",
    address: "1011 Spruce Lane, Anytown, CA 91234",
    description: "Modern condos with city views",
    totalUnits: 12,
    occupiedUnits: 11,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "5",
    name: "Aspen Grove Apartments",
    countryCode: "US",
    cityName: "Anytown",
    street: "1213 Fir Court",
    address: "1213 Fir Court, Anytown, CA 91234",
    description: "Affordable housing with community amenities",
    totalUnits: 20,
    occupiedUnits: 14,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

export const dummyTenants: Tenant[] = [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@email.com",
    phone: "+1 (555) 234-5678",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 345-6789",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    firstName: "David",
    lastName: "Wilson",
    email: "david.wilson@email.com",
    phone: "+1 (555) 456-7890",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

export const dummyUnits: Unit[] = [
  {
    id: "101",
    complexId: "1",
    label: "101",
    type: "2BHK",
    description: "2 bedroom, 1 bathroom apartment with modern amenities",
    rentAmount: 1500,
    rentCurrency: "USD",
    squareFootage: 1200,
    bedrooms: 2,
    bathrooms: 1,
    features: ["In-unit Washer", "In-unit Dryer", "Dishwasher", "Central Air"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "102",
    complexId: "1",
    label: "102",
    type: "1BHK",
    description: "1 bedroom, 1 bathroom apartment",
    rentAmount: 1200,
    rentCurrency: "USD",
    squareFootage: 800,
    bedrooms: 1,
    bathrooms: 1,
    features: ["In-unit Washer", "In-unit Dryer", "Dishwasher", "Central Air"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "201",
    complexId: "1",
    label: "201",
    type: "3BHK",
    description: "3 bedroom, 2 bathroom apartment with balcony",
    rentAmount: 2000,
    rentCurrency: "USD",
    squareFootage: 1400,
    bedrooms: 3,
    bathrooms: 2,
    features: ["In-unit Washer", "In-unit Dryer", "Dishwasher", "Central Air"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "202",
    complexId: "1",
    label: "202",
    type: "2BHK",
    description: "2 bedroom, 1.5 bathroom apartment",
    rentAmount: 1600,
    rentCurrency: "USD",
    squareFootage: 1100,
    bedrooms: 2,
    bathrooms: 1,
    features: ["In-unit Washer", "In-unit Dryer", "Dishwasher", "Central Air"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "301",
    complexId: "1",
    label: "301",
    type: "1BHK",
    description: "1 bedroom, 1 bathroom apartment",
    rentAmount: 1300,
    rentCurrency: "USD",
    squareFootage: 750,
    bedrooms: 1,
    bathrooms: 1,
    features: ["In-unit Washer", "In-unit Dryer", "Dishwasher", "Central Air"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

export const dummyLeases: Lease[] = [
  {
    id: "1",
    unitId: "101",
    tenantId: "1",
    startedAt: "2023-01-15T00:00:00Z",
    endsAt: "2024-01-14T00:00:00Z",
    rentAmount: 1200,
    status: "active",
    tenant: dummyTenants[0],
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2023-01-15T00:00:00Z",
  },
  {
    id: "2",
    unitId: "102",
    tenantId: "2",
    startedAt: "2023-03-01T00:00:00Z",
    endsAt: "2024-02-29T00:00:00Z",
    rentAmount: 1500,
    status: "active",
    tenant: dummyTenants[1],
    createdAt: "2023-03-01T00:00:00Z",
    updatedAt: "2023-03-01T00:00:00Z",
  },
  {
    id: "3",
    unitId: "201",
    tenantId: "3",
    startedAt: "2023-05-15T00:00:00Z",
    endsAt: "2024-05-14T00:00:00Z",
    rentAmount: 1400,
    status: "active",
    tenant: dummyTenants[2],
    createdAt: "2023-05-15T00:00:00Z",
    updatedAt: "2023-05-15T00:00:00Z",
  },
  {
    id: "4",
    unitId: "202",
    tenantId: "4",
    startedAt: "2023-07-01T00:00:00Z",
    endsAt: "2024-06-30T00:00:00Z",
    rentAmount: 1600,
    status: "active",
    tenant: dummyTenants[3],
    createdAt: "2023-07-01T00:00:00Z",
    updatedAt: "2023-07-01T00:00:00Z",
  },
];

export const dummyStats: DashboardStats = {
  totalComplexes: 5,
  totalUnits: 20,
  activeLeases: 15,
  upcomingPayments: 3,
  pendingMaintenanceRequests: 2,
};

export const dummyActivity: ActivityItem[] = [
  {
    id: "1",
    type: "lease_signed",
    title: "Lease Agreement Signed",
    description: "Unit 101, Maplewood Apartments",
    date: "2024-01-15T10:00:00Z",
    icon: "FileText",
  },
  {
    id: "2",
    type: "payment_received",
    title: "Payment Received",
    description: "Unit 203, Oakridge Complex",
    date: "2024-01-14T15:30:00Z",
    icon: "DollarSign",
  },
  {
    id: "3",
    type: "maintenance_created",
    title: "Maintenance Request Created",
    description: "Unit 302, Pinecrest Residences",
    date: "2024-01-14T09:15:00Z",
    icon: "Wrench",
  },
];

export const dummyMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: "1",
    unitId: "101",
    tenantId: "1",
    description: "Kitchen sink is leaking",
    status: "pending",
    priority: "medium",
    createdAt: "2024-01-14T09:15:00Z",
    updatedAt: "2024-01-14T09:15:00Z",
  },
  {
    id: "2",
    unitId: "202",
    tenantId: "4",
    description: "Air conditioning not working",
    status: "in_progress",
    priority: "high",
    cost: 250,
    createdAt: "2024-01-13T14:30:00Z",
    updatedAt: "2024-01-14T10:00:00Z",
  },
];

// Dummy API functions with proper typing
export const dummyApi = {
  // Auth
  async login(email: string, password: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { token: "dummy-jwt-token", user: dummyUser } as ApiResponse<{
      user: UserPOJO;
    }>;
  },

  async getCurrentUser() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return dummyUser as ApiResponse<UserPOJO>;
  },

  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return dummyStats;
  },

  async getRecentActivity(): Promise<ActivityItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return dummyActivity;
  },

  // Complexes
  async getComplexes(): Promise<Complex[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return dummyComplexes;
  },

  async getComplex(id: string): Promise<Complex> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const complex = dummyComplexes.find((c) => c.id === id);
    if (!complex) throw new Error("Complex not found");
    return complex;
  },

  async getComplexUnits(complexId: string): Promise<Unit[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return dummyUnits.filter((unit) => unit.complexId === complexId);
  },

  // Units
  async getUnit(unitId: string): Promise<Unit> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const unit = dummyUnits.find((u) => u.id === unitId);
    if (!unit) throw new Error("Unit not found");
    return unit;
  },

  // Leases
  async getLeases(): Promise<Lease[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return dummyLeases;
  },

  async getUnitLease(unitId: string): Promise<Lease | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return (
      dummyLeases.find(
        (lease) => lease.unitId === unitId && lease.status === "active",
      ) || null
    );
  },

  // Maintenance
  async getMaintenanceRequests(): Promise<MaintenanceRequest[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return dummyMaintenanceRequests;
  },
};
