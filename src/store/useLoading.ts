import { create } from 'zustand';

type State = {
  buttonLoading: boolean;
};

type Actions = {
  showButtonLoading: () => void;
  hideButtonLoading: () => void;
};

export const useLoading = create<State & Actions>((set) => ({
  buttonLoading: false,
  showButtonLoading: () => set(() => ({ buttonLoading: true })),
  hideButtonLoading: () => set(() => ({ buttonLoading: false })),
}));
