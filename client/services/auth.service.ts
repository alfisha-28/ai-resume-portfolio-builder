import api from "@/lib/axios";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  const response = await api.post("/users/login", data);
  return response.data;
};

export const registerUser = async (data: RegisterData) => {
  const response = await api.post("/users/register", data);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

