import { create } from 'zustand';
import { type VendorUser } from '@repo/types';
import { AuthState } from '@repo/utils/auth';

export const useAuthStore = create<AuthState<VendorUser>>(
  (set) =>
    new AuthState(
      (user) => set({ user }),
      (loading) => set({ isLoading: loading }),
    ),
);

export const getCurrentUser = () => {
  const { user } = useAuthStore.getState();

  if (!user) {
    throw new Error(
      'User not authenticated!',
    );
  }

  return user;
};
