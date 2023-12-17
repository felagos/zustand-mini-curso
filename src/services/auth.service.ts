import { api } from "../api/api";

export interface LoginResponse {
	id: string;
	email: string;
	fullName: string;
	isActive: boolean;
	roles: string[];
	token: string;
}

export class AuthService {

	static async login(email: string, password: string) {
		const body = { email, password };
		const response = await api.post<LoginResponse>('/auth/login', body);

		return response.data;
	}

	static async checkStatus() {
		const response = await api.get<LoginResponse>('/auth/check-status');

		return response.data;
	}

}