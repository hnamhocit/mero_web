import { create } from "zustand";

import { api, baseURL } from "@/config/api";
import { IResponse, ITokens, IUser } from "@/interfaces";
import { JwtUtils } from "@/utils";

interface UserStore {
  user: IUser | null;
  isLoading: boolean;

  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  getProfile: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,

  login: async (data) => {
    set({ isLoading: true });

    const { data: tokens }: IResponse<ITokens> = await api.post(
      "/auth/login",
      data,
    );

    JwtUtils.setTokens(tokens.accessToken, tokens.refreshToken);

    const { data: user }: IResponse<IUser> = await api.get("/users/me");

    set({ user, isLoading: false });
  },

  register: async (data) => {
    set({ isLoading: true });

    const { data: tokens }: IResponse<ITokens> = await api.post(
      "/auth/register",
      data,
    );

    JwtUtils.setTokens(tokens.accessToken, tokens.refreshToken);

    const { data: user }: IResponse<IUser> = await api.get("/users/me");

    set({ user, isLoading: false });
  },

  getProfile: async () => {
    set({ isLoading: true });

    const { data: user }: IResponse<IUser> = await api.get("/users/me");

    set({ user, isLoading: false });
  },

  logout: async () => {
    set({ isLoading: true });

    await api.post("/auth/logout");
    JwtUtils.removeTokens();

    set({ user: null, isLoading: false });
  },
}));
