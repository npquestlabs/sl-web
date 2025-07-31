import { type GenericUser } from '@repo/types';
import { httpService } from '@repo/api/httpService';

export class AuthState<T extends GenericUser> {
  user: T | null;
  setUser: (user: T) => void;
  isLoading: boolean = false;
  setIsLoading: (loading: boolean) => void;
  logout: () => void;
  refetch: (options?: {
    handleError?: (error: Error) => void;
    handleSuccess?: () => void;
  }) => Promise<T | null>;

  constructor(
    setUser: (user: T | null) => void,
    setIsLoading: (loading: boolean) => void,
  ) {
    this.user = null;
    this.setUser = setUser;
    this.isLoading = false;
    this.setIsLoading = setIsLoading;
    this.refetch = async (options) => {
      setIsLoading(true);

      let value: T | null = null;

      try {
        const result = await httpService.get<T>('/auth/me');
        // const result = await dummyApi.getCurrentUser();
        if (result.error) {
          throw new Error(result.error);
        } else {
          setUser(result);
          value = result;
        }
        if (options?.handleSuccess) {
          options.handleSuccess();
        }
      } catch (error) {
        if (options?.handleError) {
          options.handleError(
            error instanceof Error ? error : new Error('Unknown error'),
          );
        }
      }

      setIsLoading(false);

      return value;
    };

    this.logout = () => {
      httpService.clearTokens();
      setUser(null);
    };
  }

  get isAuthenticated(): boolean {
    return this.user !== null;
  }
}
