import axios, { AxiosError } from "axios";
import { useUserStore } from "@/stores";
import { jwtDecode } from "jwt-decode";

export const baseURL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  let token = useUserStore.getState().accessToken;

  if (token) {
    const decoded = jwtDecode(token);

    if (decoded && decoded.exp && decoded.exp * 1000 < Date.now()) {
      try {
        const { data } = await axios.post(
          `${baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        token = data.data.accessToken;
        useUserStore.setState({ accessToken: token });
      } catch (error) {
        useUserStore().logout();
      }
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use((res) => res.data);

export { api };
