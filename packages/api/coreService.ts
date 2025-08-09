import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

export type CoreResponse<T extends object> = T & { error?: string };

const ACCESS_TOKEN_KEY =
  import.meta.env?.VITE_ACCESS_TOKEN_KEY || 'access_token';
const REFRESH_TOKEN_KEY =
  import.meta.env?.VITE_REFRESH_TOKEN_KEY || 'refresh_token';

const CORE_SERVICE_API_URL =
  import.meta.env?.VITE_CORE_SERVICE_API_URL || 'http://localhost:5000/api/v1';

const CONSOLE_NAME = import.meta.env?.VITE_CONSOLE_NAME || 'not-set';

class CoreService {
  private api: AxiosInstance;
  private baseURL = CORE_SERVICE_API_URL;
  private unauthenticatedInterceptor: (() => void) | undefined = undefined;

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json',
        'x-client': CONSOLE_NAME,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
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
        if (response.data?.tokens) {
          const accessToken = response.data.tokens.access;
          const refreshToken = response.data.tokens.refresh;

          this.setTokens(accessToken, refreshToken);
        }

        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          // Remove tokens on 401
          this.clearTokens();
          this.unauthenticatedInterceptor?.();
        }
        if (error.response) {
          return Promise.resolve(error.response);
        }
        return Promise.reject(error);
      },
    );
  }

  public intercept401Response(callback: () => void) {
    this.unauthenticatedInterceptor = callback;
  }

  public clear401Interceptor() {
    this.unauthenticatedInterceptor = undefined;
  }

  setTokens(access: string, refresh: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  }

  public clearTokens() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  public hasTokens(): boolean {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY) || !!localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  async get<T extends object>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<CoreResponse<T>> {
    const response = await this.api.get<CoreResponse<T>>(url, config);
    return response.data;
  }

  async post<T extends object, B = unknown>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig,
  ): Promise<CoreResponse<T>> {
    const response = await this.api.post<CoreResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T extends object, B = unknown>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig,
  ): Promise<CoreResponse<T>> {
    const response = await this.api.patch<CoreResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T extends object, B = unknown>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig,
  ): Promise<CoreResponse<T>> {
    const response = await this.api.put<CoreResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T extends object>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<CoreResponse<T>> {
    const response = await this.api.delete<CoreResponse<T>>(url, config);
    return response.data;
  }
}

export const coreService = new CoreService();
