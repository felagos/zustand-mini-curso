import { StateCreator, create } from "zustand";
import { AuthStatus, User } from "../models";
import { AuthService } from "../services";
import { devtools } from "zustand/middleware";

export interface AuthState {
	status: AuthStatus;
	token?: string;
	user?: User;
	login: (email: string, password: string) => Promise<void>;
	checkAuthStatus: () => Promise<void>;
}

const storeApi: StateCreator<AuthState> = (set) => ({
	status: 'authorized',
	token: undefined,
	login: async (email: string, password: string) => {
		try {
			const { token, ...user } = await AuthService.login(email, password);

			set({
				token,
				user,
				status: 'authorized'
			})
		} catch (_) {
			set({
				token: undefined,
				user: undefined,
				status: 'unauthorized'
			})
		}

	},
	checkAuthStatus: async () => {
		const { token, ...user } = await AuthService.checkStatus();

		set({
			status: 'authorized',
			token,
			user
		})
	},
});

export const useAuthStore = create<AuthState>()(
	devtools(storeApi)
);