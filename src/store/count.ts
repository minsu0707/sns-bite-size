import { create } from "zustand";

type Store = {
  count: number;
  actions: {
    increase: () => void;
    decrease: () => void;
  };
};

export const useCountStore = create<Store>((set, get) => ({
  count: 0,
  actions: {
    increase: () => {
      // const count = get().count;
      // set({ count: count + 1 });

      set((store) => ({
        count: store.count + 1,
      }));
    },
    decrease: () => {
      set((store) => ({
        count: store.count - 1,
      }));
    },
  },
}));

export const useCount = () => {
  const count = useCountStore((store) => store.count);
  return count;
};

export const useIncrease = () => {
  const increse = useCountStore((store) => store.actions.increase);
  return increse;
};

export const useDecrease = () => {
  const decrease = useCountStore((store) => store.actions.decrease);
  return decrease;
};
