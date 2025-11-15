import { create } from "zustand";

export const useNextStore = create((set) => ({
  next: 0,
  setNext: (value) => set(() => ({ next: value })),
  incrementNext: () => set((state) => ({ next: state.next + 1 })),
  decrementNext: () => set((state) => ({ next: state.next - 1 })),
}));
