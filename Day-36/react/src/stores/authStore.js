import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isInitializing: false,
      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await fetch(
            "https://api.escuelajs.co/api/v1/auth/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            }
          );
          if (!response.ok) {
            throw new Error("Email hoặc mật khẩu không đúng");
          }
          const data = await response.json();
          set({
            user: { email, name: email.split("@")[0] },
            token: data.access_token,
            isAuthenticated: true,
            isLoading: false,
            isInitializing: false,
          });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: error.message };
        }
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
      checkAuth: async () => {
        const { token, user } = get();
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (token && user) {
          set({ isAuthenticated: true, isInitializing: false });
          return true;
        }
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          isInitializing: false,
        });
        return false;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
useAuthStore.getState().checkAuth();