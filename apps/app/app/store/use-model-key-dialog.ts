import { create } from "zustand";

type Types = {
  isOpen: boolean;
  onOpen: (type: string) => void;
  onClose: () => void;
  type?: string;
};

export const useModelKeyDialog = create<Types>((set) => ({
  type: undefined,
  isOpen: false,
  onOpen: (type: string) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false, type: undefined }),
}));
