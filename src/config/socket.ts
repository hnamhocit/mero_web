import { io, Socket } from "socket.io-client";
import { JwtUtils } from "@/utils";

let refreshing = false;

const refreshAccessToken = async () => {
  if (refreshing) return null;
  refreshing = true;

  try {
    await JwtUtils.refreshAccessToken();
  } catch (e) {
    console.error("Failed to refresh token:", e);
    return null;
  } finally {
    refreshing = false;
  }
};

let { accessToken } = JwtUtils.getTokens();

if (!accessToken || JwtUtils.isTokenExpired(accessToken)) {
  console.warn("Access token invalid or expired at startup.");
  accessToken = null;
}

export const socket: Socket = io("http://localhost:8080", {
  auth: { token: accessToken },
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});

socket.on("connect_error", async (err) => {
  if (err.message.includes("Invalid or expired token")) {
    console.log("🔄 Token expired, refreshing...");
    const newAccessToken = await refreshAccessToken();
    if (newAccessToken) {
      socket.io.opts.auth = { token: newAccessToken };
      socket.connect();
    } else {
      console.error("Token refresh failed, disconnecting socket");
      socket.disconnect();
    }
  }
});

socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
});
