import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SERVICE_BASE_URL

// 🔧 Buat instance axios
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Tambahkan interceptor untuk otomatis kirim token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 Global error handler
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized. Redirecting to login...");
      // Bisa redirect ke halaman login, atau refresh token
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
