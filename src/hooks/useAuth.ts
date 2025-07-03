import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
  const { token, isLoggedIn, setToken, logout } = useAuthStore();
  return { token, isLoggedIn, setToken, logout };
};
