import { StateCreator } from "zustand";

export interface DateSlice {
	dateEvent: number;
	setDateEvent: (dateEvent: string) => void;
	setHourEvent: (hourEvent: string) => void;
	getDateEvent: () => string;
	getHourEvent: () => string;
}

export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({
	dateEvent: new Date().getTime(),
	setDateEvent: (dateEvent: string) => {
		const date = new Date(dateEvent);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();

		const newDate = new Date(get().dateEvent);
		newDate.setFullYear(year, month, day)

		set({ dateEvent: newDate.getTime() });
	},
	setHourEvent: (hourEvent: string) => {
		const [hours, minutes] = hourEvent.split(':');

		const newDate = new Date(get().dateEvent);
		newDate.setHours(parseInt(hours), parseInt(minutes));

		set({ dateEvent: newDate.getTime() });
	},
	getDateEvent: () => new Date(get().dateEvent).toISOString().split('T')[0],
	getHourEvent: () => {
		const hours = new Date(get().dateEvent).getHours().toString().padStart(2, '0');
		const minutes = new Date(get().dateEvent).getMinutes().toString().padStart(2, '0');
		return `${hours}:${minutes}`;
	},
});