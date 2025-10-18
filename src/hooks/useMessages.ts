import { useState, useEffect, useCallback } from "react";

import { socket } from "@/config";
import { IMessage } from "@/interfaces";
import { useReplyStore } from "@/stores";

export const useMessages = (conversationId: string) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const { reply, setReply } = useReplyStore();

  //   fetch conversation messages
  useEffect(() => {
    if (!conversationId) return;

    const fetchConversation = async () => {
      setIsLoading(true);

      const response = await socket.emitWithAck("message", {
        cmd: "getConversationMessages",
        args: {
          conversationId: Number(conversationId),
        },
      });

      setMessages(response.data);
      setIsLoading(false);
    };

    fetchConversation();
  }, [conversationId]);

  //   subscribers
  useEffect(() => {
    const handleNewMessage = (message: IMessage) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleMessageDeleted = (id: number) => {
      setMessages((prev) => prev.filter((message) => message.id !== id));
    };

    socket.on("message:new", handleNewMessage);
    socket.on("message:deleted", handleMessageDeleted);

    return () => {
      socket.off("message:new", handleNewMessage);
      socket.off("message:deleted", handleMessageDeleted);
    };
  }, []);

  const handleDelete = useCallback(
    (messageId: number) => {
      setMessages((prev) => prev.filter((message) => message.id !== messageId));

      socket.emit("message", {
        cmd: "delete",
        args: {
          id: messageId,
          conversationId: Number(conversationId),
        },
      });
    },
    [conversationId]
  );

  const handleDeleteForMe = useCallback(
    async (id: number) => {
      setMessages((prev) => prev.filter((message) => message.id !== id));

      await socket.emitWithAck("message", {
        cmd: "deleteForMe",
        args: {
          id,
          conversationId: Number(conversationId),
        },
      });
    },
    [conversationId]
  );

  const handleSendMessage = useCallback(
    async (content: string, cleaner: () => void) => {
      setIsDisabled(true);

      socket.emit("message", {
        cmd: "send",
        args: {
          replyId: reply?.id ?? null,
          content,
          conversationId: Number(conversationId),
        },
      });

      cleaner();
      setReply(null);
      setIsDisabled(false);
    },
    [conversationId, reply, setReply]
  );

  return {
    messages,
    isLoading,
    handleDelete,
    handleSendMessage,
    handleDeleteForMe,
    isDisabled,
  };
};
