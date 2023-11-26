import { StateCreator, create } from "zustand";
import { StateStorage, createJSONStorage, persist, devtools } from "zustand/middleware";
import { logger } from ".";

type DevToolsType = [["zustand/devtools", never]];

interface PersonState {
    firstName: string;
    lastName: string;
}

interface Actions {
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
}

type State = PersonState & Actions;

const persistedStore: StateCreator<State, DevToolsType> =
    (set) => ({
        firstName: '',
        lastName: '',
        setFirstName: (value: string) => set({ firstName: value }, false, 'setFirstName'),
        setLastName: (value: string) => set({ lastName: value }, false, 'setLastName')
    })

const customStorage: StateStorage = {
    getItem: (name: string): string | null => {
        return sessionStorage.getItem(name);
    },
    setItem: (name: string, value: string): void => {
        sessionStorage.setItem(name, value);
    },
    removeItem: (name: string): void => {
        sessionStorage.removeItem(name);
    }
};

export const usePersonStore = create<State>()(
    logger(
        devtools(
            persist(persistedStore, {
                name: 'person-storage',
                storage: createJSONStorage(() => customStorage)
            })
        )
    )
)