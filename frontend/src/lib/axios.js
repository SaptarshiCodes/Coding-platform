import axios from "axios";

let getAuthToken = null;

export const setAuthTokenGetter = (getter) => {
  getAuthToken = getter;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  if (!getAuthToken) return config;

  const token = await getAuthToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
