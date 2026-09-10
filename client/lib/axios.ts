import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request interceptor: attach JWT token ──────────────────────────────────
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  if (config.method === "get") {
    config.headers["Cache-Control"] = "no-cache";
    config.headers["Pragma"] = "no-cache";
  }

  return config;
});

// ─── Response interceptor: handle 401 token expiry ─────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      typeof window !== "undefined"
    ) {
      localStorage.removeItem("token");
      // Only redirect if not already on auth pages
      const pathname = window.location.pathname;
      if (!pathname.startsWith("/login") && !pathname.startsWith("/register")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;