import { io, Socket } from "socket.io-client";
import { useUserStore } from "@/stores";

let currentAccessToken = useUserStore.getState().accessToken;

export const socket: Socket = io("http://localhost:8080", {
  auth: (cb) => {
    cb({ token: useUserStore.getState().accessToken });
  },
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});

socket.on("connect_error", async (err) => {
  if (err.message.includes("Invalid or expired token")) {
    console.log("🔄 Socket token expired. Waiting for new token...");
  }
});

socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
});
