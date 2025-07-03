import httpClient from "../api/httpClient";
import { endpoints } from "../api/endpoints";

export interface MagicLinkRequest {
  email: string;
}

export interface UserResponse {
  email: string;
  first_name?: string | null;
  last_name?: string | null;
}

export const authService = {
  // Send magic link to email
  async sendMagicLink(payload: MagicLinkRequest) {
    const { data } = await httpClient.post(endpoints.users.magicLink, payload);
    return data;
  },
  // Handle the magic link callback
  async magicLinkCallback(token: string): Promise<UserResponse> {
    const { data } = await httpClient.get(`${endpoints.users.magicLinkCallback}?token=${encodeURIComponent(token)}`);
    return data;
  },
  // Refresh access token
  async refreshAccessToken() {
    const { data } = await httpClient.post(endpoints.users.jwt);
    return data;
  },
  // Logout
  async logout() {
    const { data } = await httpClient.post(endpoints.users.logout);
    return data;
  },
};
