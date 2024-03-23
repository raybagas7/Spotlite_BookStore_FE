import services from '@/utils/service';
import { toast } from 'sonner';
import { create } from 'zustand';

type State = {
  tags: Tag[] | undefined;
};

type Actions = {
  getTags: () => void;
};

export const useTag = create<State & Actions>((set) => ({
  tags: undefined,
  getTags: async () => {
    const { error, data, message } = await services.getTags();

    if (error || !data) {
      toast.error(message);
    } else {
      set(() => ({ tags: data }));
    }
  },
}));
