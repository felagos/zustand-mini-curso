import { create } from 'zustand'

interface Bear {
    id: number;
    name: string;
}

interface BearState {
    blackBears: number;
    polarBears: number;
    pandaBears: number;
    bears: Bear[];
    increaseBlackBears: (by: number) => void;
    addBear: () => void;
    clearBears: () => void;
    computed: {
        totalBears: number;
    },
}

export const useBearStore = create<BearState>((set, get) => ({
    blackBears: 10,
    polarBears: 5,
    pandaBears: 1,
    bears: [],
    computed: {
        get totalBears() {
            return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
        }
    },
    increaseBlackBears: (by: number) => set(state => ({ blackBears: state.blackBears + by })),
    addBear: () => set(state => ({ bears: [...state.bears, { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}` }] })),
    clearBears: () => set({ bears: [] })
}))