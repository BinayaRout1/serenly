import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("Serenly-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("Serenly-theme", theme);
    set({ theme });
  },
}));
