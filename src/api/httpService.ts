import {
  CreateComplexRequest,
  CreateLeaseRequest,
  CreateMaintenanceRequest,
  CreateUnitRequest,
  User,
  UserPOJO,
} from "@/types";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { A } from "node_modules/framer-motion/dist/types.d-Bq-Qm38R";

export type ApiResponse<T extends object> = T & { error?: string };

class HttpService {
  private api: AxiosInstance;
  private baseURL = "https://api.example.com"; // Replace with actual API URL

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "x-client": "landlord",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("auth_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Response interceptor to handle auth errors and save tokens
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        // Save token if present in response
        if (response.data?.token) {
          localStorage.setItem("auth_token", response.data.token);
        }
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          // Clear token and redirect to login
          this.clearToken();
          window.location.href = "/login";
        }
        return Promise.reject(error);
      },
    );
  }

  clearToken() {
    localStorage.removeItem("auth_token");
  }

  // Generic HTTP methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.get<T>(url, config);
    return response.data;
  }

  async post<T, B = unknown>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.api.post<T>(url, data, config);
    return response.data;
  }

  async patch<T, B = unknown>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.api.patch<T>(url, data, config);
    return response.data;
  }

  async put<T, B = unknown>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.api.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.delete<T>(url, config);
    return response.data;
  }

  // Auth methods
  async login(email: string, password: string) {
    return this.post<ApiResponse<{ user: UserPOJO }>>("/auth/login", {
      email,
      password,
    });
  }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    return this.post<ApiResponse<{ user: UserPOJO }>>("/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
  }

  async forgotPassword(email: string) {
    return this.post<ApiResponse<null>>("/auth/forgot-password", { email });
  }

  async getCurrentUser() {
    return this.get<ApiResponse<UserPOJO>>("/users/me");
  }

  // Complex methods
  async getComplexes() {
    return this.get("/complexes");
  }

  async getComplex(id: string) {
    return this.get(`/complexes/${id}`);
  }

  async createComplex(data: CreateComplexRequest) {
    return this.post("/complexes", data);
  }

  async deleteComplex(id: string) {
    return this.delete(`/complexes/${id}`);
  }

  async getComplexUnits(id: string) {
    return this.get(`/complexes/${id}/units`);
  }

  // Unit methods
  async getUnit(unitId: string) {
    return this.get(`/units/${unitId}`);
  }

  async createUnit(complexId: string, data: CreateUnitRequest) {
    return this.post(`/complexes/${complexId}/units`, data);
  }

  async deleteUnit(unitId: string) {
    return this.delete(`/units/${unitId}`);
  }

  // Lease methods
  async getLeases() {
    return this.get("/lease");
  }

  async createLease(data: CreateLeaseRequest) {
    return this.post("/lease", data);
  }

  async terminateLease(id: string) {
    return this.put(`/lease/${id}/terminate`);
  }

  // Payment methods
  async getPayments(config: AxiosRequestConfig = {}) {
    return this.get("/payments", config);
  }

  // Maintenance methods
  async getMaintenanceRequests(config: AxiosRequestConfig = {}) {
    return this.get("/maintenance", config);
  }

  async createMaintenanceRequest(data: CreateMaintenanceRequest) {
    return this.post("/maintenance", data);
  }

  async completeMaintenanceRequest(id: string, cost: number) {
    return this.post(`/maintenance/${id}/complete`, { cost });
  }
}

export const httpService = new HttpService();
