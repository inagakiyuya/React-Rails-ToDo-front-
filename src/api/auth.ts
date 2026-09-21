import axiosInstance from "./axios";
import type { AuthResponse, LoginInput } from "../types";

// authentication#login
export const loginRequest = async (input: LoginInput): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(`/auth/login`, input);

  return response.data;
};
