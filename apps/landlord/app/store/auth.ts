import { create } from "zustand";
import { type LandlordUser } from "@repo/types";
import { httpService } from "@repo/api/httpService";

class AuthState {
  user: LandlordUser | null;
  setUser: (user: LandlordUser) => void;
  isLoading: boolean = false;
  setIsLoading: (loading: boolean) => void;
  logout: () => void;
  reload: (options?: { handleError?: (error: Error) => void, handleSuccess?: () => void }) => void;

  constructor(
    setUser: (user: LandlordUser | null) => void,
    setIsLoading: (loading: boolean) => void,
  ) {
    this.user = null;
    this.setUser = setUser;
    this.isLoading = false;
    this.setIsLoading = setIsLoading;
    this.reload = async (options) => {
      setIsLoading(true);

      try {
        const result = await httpService.get<LandlordUser>("/landlords/me");
        // const result = await dummyApi.getCurrentUser();
        if (result.error) {
          throw new Error(result.error);
        } else {
          setUser(result);
        }
        if (options?.handleSuccess) {
          options.handleSuccess();
        }
      } catch (error) {
        if (options?.handleError) {
          options.handleError(error instanceof Error ? error : new Error("Unknown error"));
        }
      }

      setIsLoading(false);
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

export const useAuthStore = create<AuthState>(
  (set) =>
    new AuthState(
      (user) => set({ user }),
      (loading) => set({ isLoading: loading }),
    ),
);
