import httpClient from '@/api/httpClient';
import { endpoints } from '@/api/endpoints';
import { LoginPayload, AuthResponse } from '@/types/auth';

export const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await httpClient.post(endpoints.auth.login(), payload);
  return data;
};
