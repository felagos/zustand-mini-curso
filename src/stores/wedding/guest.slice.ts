import { StateCreator } from "zustand";

export interface GuestSlice {
	guestsCount: number;
	setGuestCount: (guestsCount: number) => void;
}

export const createGuestSlice: StateCreator<GuestSlice> = (set) => ({
	guestsCount: 0,
	setGuestCount: (guestsCount: number) => set({ guestsCount: guestsCount > 0 ? guestsCount : 0 }),
});