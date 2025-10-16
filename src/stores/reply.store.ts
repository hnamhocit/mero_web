import { create } from "zustand";

interface Reply {
  displayName: string;
  content: string;
}

interface ReplyStore {
  reply: Reply | null;
  setReply: (reply: Reply | null) => void;
}

export const useReplyStore = create<ReplyStore>((set) => ({
  reply: null,
  setReply: (reply) => set({ reply }),
}));
