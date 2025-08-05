import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
} from 'axios';

export type ListingResponse<T> = {
  success: boolean;
  data?: T;
  error?: T;
  meta?: {
    page: number;
    pageSize: number;
    totalItems: number;
  }
};

const LISTING_SERVICE_API_URL =
  import.meta.env?.VITE_LISTING_SERVICE_API_URL || 'http://localhost:6000/api/v1';

class ListingService {
  private api: AxiosInstance;
  private baseURL = LISTING_SERVICE_API_URL;

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async get<T extends object>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ListingResponse<T>> {
    const response = await this.api.get<ListingResponse<T>>(url, config);
    return response.data;
  }

  async post<T extends object, B = unknown>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig,
  ): Promise<ListingResponse<T>> {
    const response = await this.api.post<ListingResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T, B = unknown>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig,
  ): Promise<ListingResponse<T>> {
    const response = await this.api.patch<ListingResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T extends object, B = unknown>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig,
  ): Promise<ListingResponse<T>> {
    const response = await this.api.put<ListingResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T extends object>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ListingResponse<T>> {
    const response = await this.api.delete<ListingResponse<T>>(url, config);
    return response.data;
  }
}

export const listingService = new ListingService();
