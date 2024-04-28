import axios from 'axios';
import store from '../../store';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    // const token = localStorage.getItem('access_token');
    const token = store.getState().auth.access_token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    // const originalRequest = error.config;
    if (error.response.status === 401) {
      window.location.replace('/auth/login');
      return Promise.reject(error);
    }
  },
);

export default apiClient;
