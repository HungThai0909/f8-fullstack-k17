import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isInitializing: true,

      login: async (email, password) => {
        set({ isLoading: true });

        try {
          const response = await fetch(
            "https://api.escuelajs.co/api/v1/auth/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            },
          );

          if (!response.ok) {
            throw new Error("Email hoặc mật khẩu không đúng");
          }

          const data = await response.json();

          const user = {
            email,
            name: email.split("@")[0],
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          };

          set({
            user,
            token: data.access_token,
            isAuthenticated: true,
            isLoading: false,
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
        const { token } = get();

        if (!token) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isInitializing: false,
          });
          return;
        }

        try {
          const response = await fetch(
            "https://api.escuelajs.co/api/v1/auth/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (!response.ok) throw new Error("Token không hợp lệ");

          const userData = await response.json();

          set({
            user: userData,
            isAuthenticated: true,
            isInitializing: false,
          });
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isInitializing: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

useAuthStore.getState().checkAuth();
