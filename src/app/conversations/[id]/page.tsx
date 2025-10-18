"use client";

import { use } from "react";

import Composer from "./Composer";
import Loading from "@/components/Loading";
import Message from "./Message";
import { isSameMinute } from "@/utils";
import { useMessages, useResizeObserver } from "@/hooks";

const ConversationDetail = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);
  const { isLoading, handleDelete, handleDeleteForMe, messages } =
    useMessages(id);
  const { height, ref } = useResizeObserver();

  if (isLoading) return <Loading />;

  return (
    <div className="h-screen relative bg-semidark">
      {/* <Header /> */}

      <div
        className="p-4 overflow-y-scroll no-scrollbar"
        style={{
          maxHeight: `calc(100% - ${height}px)`,
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
              onDelete={handleDelete}
              onDeleteForMe={handleDeleteForMe}
            />
          );
        })}
      </div>

      <Composer ref={ref} id={id} />
    </div>
  );
};

export default ConversationDetail;
