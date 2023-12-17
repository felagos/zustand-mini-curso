import axios from 'axios';
import { useAuthStore } from '../stores';

export const api = axios.create({
	baseURL: 'http://localhost:3000/api'
})

api.interceptors.request.use(config => {
	const token = useAuthStore.getState().token;

	if(token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	return config;
});