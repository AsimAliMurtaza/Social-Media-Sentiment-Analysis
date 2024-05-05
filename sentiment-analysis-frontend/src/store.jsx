import create from "zustand";
import { persist } from "zustand/middleware";

let store = (set) => ({
  dopen: true,
  setOpen: (dopen) => set({ dopen: dopen }),
});

store = persist(store, { name: "store" });

export const useStore = create(store);
