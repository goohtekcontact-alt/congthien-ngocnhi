import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const getBaseURL = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  return url.endsWith('/') ? url : `${url}/`;
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

// Fix axios URL joining behavior: remove leading slash from request url to prevent it from replacing the baseURL path
api.interceptors.request.use((config) => {
    if (config.url && config.url.startsWith('/')) {
        config.url = config.url.substring(1);
    }
    return config;
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (Token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        // We use a new axios instance to avoid infinite loops with the interceptor
        const refreshApi = axios.create({
            baseURL: getBaseURL(),
            withCredentials: true,
        });
        
        const response = await refreshApi.post('auth/refresh-token');

        // Update frontend authStore with new token
        if (response.data?.tokens?.accessToken) {
          useAuthStore.getState().setAuth(response.data.tokens.accessToken);
        }

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed (or no refresh token) -> Redirect to login
        // Optional: Clear local storage/auth store if needed
        if (typeof window !== 'undefined') {
            useAuthStore.getState().logout();
            window.location.href = '/dang-nhap';
        }
        return Promise.reject(refreshError);
      }
    }

    // Centralized Error Reporting (optional, can be removed if handled locally)
    /* 
    if (error.response?.data?.message) {
         // message.error(error.response.data.message);
    } 
    */

    return Promise.reject(error);
  }
);

export default api;
