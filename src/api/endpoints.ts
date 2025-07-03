import { API_BASE_URL } from './env';

export const endpoints = {
  auth: {
    login: () => `${API_BASE_URL}/auth/login`,
  },
} as const;
