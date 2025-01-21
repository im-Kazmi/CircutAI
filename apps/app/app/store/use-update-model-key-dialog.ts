import { create } from "zustand";

type Types = {
  isOpen: boolean;
  onOpen: (type: string, id: string) => void;
  onClose: () => void;
  type?: string;
  id?: string;
};

export const useModelKeyDialog = create<Types>((set) => ({
  type: undefined,
  id: undefined,
  isOpen: false,
  onOpen: (type: string, id: string) => set({ isOpen: true, type, id }),
  onClose: () => set({ isOpen: false, type: undefined, id: undefined }),
}));
