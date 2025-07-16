import { create } from "zustand";
import { User } from "@/types";
import { se } from "date-fns/locale";
import { httpService } from "@/api/httpService";
import { toast } from "sonner";
import { dummyApi } from "@/api/dummy";

class AuthState {
  user: User | null;
  setUser: (user: User) => void;
  isLoading: boolean = false;
  setIsLoading: (loading: boolean) => void;
  logout: () => void;
  reload: () => void;

  constructor(
    setUser: (user: User | null) => void,
    setIsLoading: (loading: boolean) => void,
  ) {
    this.user = null;
    this.setUser = setUser;
    this.isLoading = false;
    this.setIsLoading = setIsLoading;
    this.reload = async () => {
      setIsLoading(true);
      //const result = await httpService.getCurrentUser();
      const result = await dummyApi.getCurrentUser();
      if (result.error) {
        toast.error("Failed to reload user data");
      } else {
        setUser(new User(result));
      }

      setIsLoading(false);
    };

    this.logout = () => {
      httpService.clearToken();
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
