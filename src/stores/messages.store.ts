import { socket } from "@/config";
import { IMessage } from "@/interfaces";
import { create } from "zustand";

interface MessagesStore {
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
  isLoading: boolean;

  getMessages: (id: string) => Promise<void>;
}

export const useMessagesStore = create<MessagesStore>((set, get) => ({
  messages: [],
  setMessages: (messages: IMessage[]) => set({ messages }),
  isLoading: true,

  getMessages: async (id) => {
    set({ isLoading: true });

    const response = await socket.emitWithAck("message", {
      cmd: "getConversationMessages",
      args: {
        conversationId: Number(id),
      },
    });

    set({ messages: response.data, isLoading: false });
  },
}));
