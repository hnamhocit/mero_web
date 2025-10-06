import { JwtUtils } from "@/utils";
import axios from "axios";

export const baseURL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

const refreshAccessToken = async () => {
  const { refreshToken } = JwtUtils.getTokens();
  if (!refreshToken) throw new Error("No refresh token");

  const { data } = await axios.post(`${baseURL}/auth/refresh`, {
    refreshToken: `Bearer ${refreshToken}`,
  });

  const tokens = data.data;

  JwtUtils.setTokens(tokens.accessToken, tokens.refreshToken);

  return tokens.accessToken;
};

api.interceptors.request.use(async (config) => {
  let { accessToken: token } = JwtUtils.getTokens();

  if (token && JwtUtils.isTokenExpired(token)) {
    try {
      token = await refreshAccessToken();
    } catch (err) {
      localStorage.removeItem(JwtUtils.keys.at);
      localStorage.removeItem(JwtUtils.keys.rt);

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
