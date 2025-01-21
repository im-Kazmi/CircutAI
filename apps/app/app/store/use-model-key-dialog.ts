import { create } from "zustand";

type Data = {
  type: string;
  id: string;
  key: string;
};
type Types = {
  isOpen: boolean;
  onOpen: (data: Data) => void;
  onClose: () => void;
  data?: {
    type: string;
    id?: string;
    key?: string;
  };
};

export const useModelKeyDialog = create<Types>((set) => ({
  data: undefined,
  isOpen: false,
  onOpen: (data: Data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false, data: undefined }),
}));
