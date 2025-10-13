import { baseURL } from "@/config/api";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export class JwtUtils {
  static keys = { at: "accessToken", rt: "refreshToken" };

  static async refreshAccessToken() {
    const { refreshToken } = JwtUtils.getTokens();
    if (!refreshToken) throw new Error("No refresh token");

    const { data } = await axios.post(`${baseURL}/auth/refresh`, {
      refreshToken: `Bearer ${refreshToken}`,
    });

    const tokens = data.data;

    JwtUtils.setTokens(tokens.accessToken, tokens.refreshToken);

    return tokens.accessToken;
  }

  static isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded && decoded.exp) {
        return decoded.exp < now;
      }

      return true;
    } catch (error) {
      return true;
    }
  }

  static getTokens() {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem(JwtUtils.keys.at);
      const refreshToken = localStorage.getItem(JwtUtils.keys.rt);

      return { accessToken, refreshToken };
    }

    return { accessToken: null, refreshToken: null };
  }

  static setTokens(accessToken: string | null, refreshToken: string | null) {
    if (typeof window !== "undefined") {
      if (accessToken) {
        localStorage.setItem(JwtUtils.keys.at, accessToken);
      } else {
        localStorage.removeItem(JwtUtils.keys.at);
      }

      if (refreshToken) {
        localStorage.setItem(JwtUtils.keys.rt, refreshToken);
      } else {
        localStorage.removeItem(JwtUtils.keys.rt);
      }
    }
  }

  static removeTokens() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(JwtUtils.keys.at);
      localStorage.removeItem(JwtUtils.keys.rt);
    }
  }
}
