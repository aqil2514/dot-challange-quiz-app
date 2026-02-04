import { create } from "zustand";

export type PageNameType = "login" | "menu";

interface AppStore {
  page: PageNameType;
  setPage: (page: PageNameType) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  page: "login",
  setPage: (page) => set({ page }),
}));
