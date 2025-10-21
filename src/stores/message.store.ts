import { IMessage } from "@/interfaces";
import { create } from "zustand";
import { useComposerStore, useMessagesStore } from ".";
import { socket } from "@/config";

interface MessageStore {
  message: IMessage | null;
  setMessage: (message: IMessage | null) => void;

  onCopy: () => void;
  onReply: () => void;
  onDelete: () => void;
  onDeleteForMe: () => Promise<void>;
}

export const useMessageStore = create<MessageStore>((set, get) => ({
  message: null,
  setMessage: (message) => set({ message }),

  onCopy: () => {
    const message = get().message;
    if (!message) return;

    navigator.clipboard.writeText(message.content);
  },

  onReply: () => {
    const message = get().message;
    if (!message) return;

    const state = useComposerStore.getState();

    state.onOpenAccessoryBar();
    state.setReply({
      id: message.id,
      displayName: message.sender?.displayName!,
    });
  },

  onDelete: () => {
    const message = get().message;
    if (!message) return;

    const state = useMessagesStore.getState();
    state.setMessages(state.messages.filter((m) => m.id !== message.id));

    socket.emit("message", {
      cmd: "delete",
      args: {
        id: message.id,
      },
    });
  },

  onDeleteForMe: async () => {
    const message = get().message;
    if (!message) return;

    const state = useMessagesStore.getState();
    state.setMessages(state.messages.filter((m) => m.id !== message.id));

    await socket.emitWithAck("message", {
      cmd: "deleteForMe",
      args: {
        id: message.id,
      },
    });
  },
}));
