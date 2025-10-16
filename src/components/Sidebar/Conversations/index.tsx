import { IConversation, IUser } from "@/interfaces";
import React, { FC, memo, useEffect, useMemo, useState } from "react";

import Conversation from "./Conversation";
import { api, socket } from "@/config";

interface ConversationsProps {
  q: string;
}

export interface MergeConversation extends IConversation {
  otherUser?: IUser;
}

const Conversations: FC<ConversationsProps> = ({ q }) => {
  const [conversations, setConversations] = useState<MergeConversation[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const response = await api.get("/users/me/conversations");
      setConversations(response.data);
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    const handleNewConversation = (conversation: IConversation) => {
      setConversations((prev) => [...prev, conversation]);
    };

    socket.on("conversation:new", handleNewConversation);

    return () => {
      socket.off("conversation:new", handleNewConversation);
    };
  }, []);

  const filteredConversations = useMemo(() => {
    if (!q) return conversations;
    return conversations.filter((conversation) =>
      conversation.name?.toLowerCase().includes(q.toLowerCase())
    );
  }, [q, conversations]);

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col no-scrollbar overflow-y-auto">
      {filteredConversations.map((c) => (
        <Conversation key={c.id} {...c} />
      ))}
    </div>
  );
};

export default memo(Conversations);
