import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Ajusta si usas otro puerto

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Interceptor para agregar token en cada petición (autenticación)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
