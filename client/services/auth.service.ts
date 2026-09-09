import api from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import type { AuthResponse, User } from "@/types/auth";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData): Promise<ApiResponse<AuthResponse>> => {
  const response = await api.post<ApiResponse<AuthResponse>>("/users/login", data);
  return response.data;
};

export const registerUser = async (data: RegisterData): Promise<ApiResponse<AuthResponse>> => {
  const response = await api.post<ApiResponse<AuthResponse>>("/users/register", data);
  return response.data;
};

export const getProfile = async (): Promise<ApiResponse<User>> => {
  const response = await api.get<ApiResponse<User>>("/users/profile");
  return response.data;
};
