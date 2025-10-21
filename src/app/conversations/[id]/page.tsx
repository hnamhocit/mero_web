"use client";

import { use, useEffect } from "react";

import Composer from "./Composer";
import Loading from "@/components/Loading";
import Message from "./Message";
import { isSameMinute } from "@/utils";
import { useResizeObserver } from "@/hooks";
import Header from "./Header";
import { useMessagesStore } from "@/stores";
import { IMessage } from "@/interfaces";
import { socket } from "@/config";

const ConversationDetail = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);
  const { height, ref } = useResizeObserver();
  const { messages, isLoading, setMessages, getMessages } = useMessagesStore();

  useEffect(() => {
    if (!id) return;

    getMessages(id);
  }, [id]);

  //   subscribers
  useEffect(() => {
    const handleNewMessage = (message: IMessage) => {
      setMessages([...messages, message]);
    };

    const handleMessageDeleted = (id: number) => {
      setMessages(messages.filter((message) => message.id !== id));
    };

    socket.on("message:new", handleNewMessage);
    socket.on("message:deleted", handleMessageDeleted);

    return () => {
      socket.off("message:new", handleNewMessage);
      socket.off("message:deleted", handleMessageDeleted);
    };
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="h-screen relative bg-semidark">
      <Header />

      <div
        className="p-4 overflow-y-scroll no-scrollbar"
        style={{
          maxHeight: `calc(100% - ${height}px - 64px)`,
        }}
      >
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

      <Composer ref={ref} id={id} />
    </div>
  );
};

export default ConversationDetail;
