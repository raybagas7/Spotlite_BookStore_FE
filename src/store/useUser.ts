import services from '@/utils/service';
import { toast } from 'sonner';
import { create } from 'zustand';

type State = {
  userData: IUserData | undefined;
};

type Actions = {
  getUserData: () => void;
};

export const useUser = create<State & Actions>((set) => ({
  userData: undefined,
  getUserData: async () => {
    const { error, data, message } = await services.getUserData();

    if (error || !data) {
      toast.error(message);
    } else {
      set(() => ({ userData: data }));
    }
  },
}));
