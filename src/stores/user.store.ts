import { create } from "zustand";

import { api } from "@/config/api";
import { IResponse, ITokens, IUser } from "@/interfaces";
import { socket } from "@/config";

interface UserStore {
  user: IUser | null;
  accessToken: string | null;
  isInitialized: boolean;
  isLoading: boolean;

  setAccessToken: (accessToken: string) => void;
  setUser: (user: IUser | null) => void;

  bootstrapApp: () => Promise<void>;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  getProfile: () => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  accessToken: null,
  isLoading: false,
  isInitialized: false,

  setUser: (user: IUser | null) => set({ user }),
  setAccessToken: (accessToken) => set({ accessToken }),

  login: async (data) => {
    set({ isLoading: true });

    const {
      data: { accessToken },
    }: IResponse<{ accessToken: string }> = await api.post("/auth/login", data);

    set({ accessToken });

    await get().getProfile();

    set({ isLoading: false });
    socket.connect();
  },

  register: async (data) => {
    set({ isLoading: true });

    const {
      data: { accessToken },
    }: IResponse<{ accessToken: string }> = await api.post(
      "/auth/register",
      data
    );

    set({ accessToken });

    await get().getProfile();
    set({ isLoading: false });

    socket.connect();
  },

  getProfile: async () => {
    const { data: user }: IResponse<IUser> = await api.get("/users/me");
    set({ user });
  },

  logout: async () => {
    set({ isLoading: true });

    try {
      await api.get("/auth/logout");
    } catch (error) {
      console.error("Logout failed, proceeding client-side:", error);
    }

    set({ user: null, accessToken: null, isLoading: false });
    socket.disconnect();
  },

  verifyEmail: async () => {
    await api.put("/users/me/email-verified");

    const { user } = get();
    set({ user: { ...user!, isEmailVerified: true } });
  },

  bootstrapApp: async () => {
    if (get().isInitialized) return;

    try {
      const { data } = await api.post("/auth/refresh");
      const newAccessToken = data.accessToken;

      if (newAccessToken) {
        set({ accessToken: newAccessToken });

        await get().getProfile();

        socket.connect();
      }
    } catch (error) {
      console.log("No valid session found on startup.");
    } finally {
      set({ isInitialized: true });
    }
  },
}));
