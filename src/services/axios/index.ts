import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('access_token');
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
    // if (
    //   error.response.status === 401 &&
    //   originalRequest.url === '/auth/token'
    // ) {
    //   logout();
    //   const navigate = useNavigate();
    //   navigate('/auth/login');
    return Promise.reject(error);
    // }
  },
);

export default apiClient;
