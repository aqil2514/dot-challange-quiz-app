import type { AuthStore } from "@/@types/auth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Karena pure Front-End Only, jadi saya menggunakan zustand persist dengan menggunakan session storage.

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (username) => {
        set({
          isAuthenticated: true,
          user: {
            username,
            lastLoginAt: new Date(),
          },
        });
      },
      logout: () => set({ isAuthenticated: false, user: null }),
      user: null,
    }),
    {
      name: "auth-persist",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
