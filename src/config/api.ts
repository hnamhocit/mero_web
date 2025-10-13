import { JwtUtils } from "@/utils";
import axios from "axios";

export const baseURL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

api.interceptors.request.use(async (config) => {
  let { accessToken: token } = JwtUtils.getTokens();

  if (token && JwtUtils.isTokenExpired(token)) {
    try {
      token = await JwtUtils.refreshAccessToken();
    } catch (err) {
      JwtUtils.removeTokens();

      throw err;
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use((res) => res.data);

export { api };
