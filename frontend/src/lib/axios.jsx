import axios from "axios";

// Node.js backend (Auth, DB, etc.)
export const nodeAPI = axios.create({
  baseURL: import.meta.env.VITE_NODE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Flask backend (Spam Detection)
export const flaskAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Add interceptor for Node API (for token)
nodeAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default { nodeAPI, flaskAPI };
