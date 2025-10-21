import { socket } from "@/config";
import { create } from "zustand";

interface Reply {
  id: number;
  displayName: string;
}

type Mode = "edit" | "normal";

interface ComposerStore {
  content: string;
  reply: Reply | null;
  isOpenAccessoryBar: boolean;
  isDisabled: boolean;
  mode: Mode;
  setIsDisabled: (isDisabled: boolean) => void;
  setMode: (mode: Mode) => void;
  setContent: (content: string) => void;
  setReply: (reply: Reply | null) => void;
  onOpenAccessoryBar: () => void;
  onCloseAccessoryBar: () => void;
  onSend: (conversationId: string) => void;
}

export const useComposerStore = create<ComposerStore>((set, get) => ({
  content: "",
  isOpenAccessoryBar: false,
  reply: null,
  isDisabled: false,
  mode: "normal",
  setIsDisabled: (isDisabled) => set({ isDisabled }),
  setMode: (mode) => set({ mode }),
  setContent: (content) => set({ content }),
  onOpenAccessoryBar: () => set({ isOpenAccessoryBar: true }),
  onCloseAccessoryBar: () => set({ isOpenAccessoryBar: false }),
  setReply: (reply) => set({ reply }),

  onSend: (conversationId) => {
    const state = get();
    state.setIsDisabled(true);

    socket.emit("message", {
      cmd: "send",
      args: {
        replyId: state.reply?.id ?? null,
        content: state.content,
        conversationId: Number(conversationId),
      },
    });

    state.setContent("");
    state.setReply(null);
    state.setIsDisabled(false);
  },
}));
