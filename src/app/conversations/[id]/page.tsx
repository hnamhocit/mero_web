"use client";

import { use, useEffect, useState } from "react";

import { socket } from "@/config";
import { IMessage } from "@/interfaces";
import Composer from "./Composer";
import Loading from "@/components/Loading";
import Message from "./Message";

function isSameMinute(a: Date, b: Date) {
  a = new Date(a);
  b = new Date(b);

  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate() &&
    a.getHours() === b.getHours() &&
    a.getMinutes() === b.getMinutes()
  );
}

const ConversationDetail = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConversation = async () => {
      const response = await socket.emitWithAck("message", {
        cmd: "getConversationMessages",
        args: {
          conversationId: Number(id),
        },
      });

      setMessages(response.data);
      setIsLoading(false);
    };

    fetchConversation();
  }, [id]);

  useEffect(() => {
    const handleNewMessage = (message: IMessage) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("message:new", handleNewMessage);

    return () => {
      socket.off("message:new", handleNewMessage);
    };
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="h-screen relative bg-semidark">
      {/* <Header /> */}

      <div className="p-4 h-[calc(100vh-64px)] overflow-y-scroll no-scrollbar">
        {messages.map((message, i) => {
          const nextMessage = messages[i + 1];
          const prevMessage = messages[i - 1];

          const isContinuously =
            nextMessage && nextMessage.sender!.id === message.sender!.id;
          const isSameTime =
            prevMessage &&
            isSameMinute(prevMessage.createdAt, message.createdAt);

          return (
            <Message
              key={message.id}
              message={message}
              isContinuously={isContinuously}
              isSameTime={isSameTime}
            />
          );
        })}
      </div>

      <Composer setMessages={setMessages} id={id} />
    </div>
  );
};

export default ConversationDetail;
