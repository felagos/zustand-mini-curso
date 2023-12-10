import { create } from "zustand";
import { PersonSlice, createPeronSlice } from "./person.slice";
import { devtools } from "zustand/middleware";
import { GuestSlice, createGuestSlice } from "./guest.slice";
import { DateSlice, createDateSlice } from "./date.slice";

type ShareState = PersonSlice & GuestSlice & DateSlice;

export const useWeddingBoundStore = create<ShareState>()(
	devtools(
		(...a) => ({
			...createPeronSlice(...a),
			...createGuestSlice(...a),
			...createDateSlice(...a)
		})
	)
);