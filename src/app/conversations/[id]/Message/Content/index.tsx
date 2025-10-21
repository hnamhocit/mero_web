import clsx from "clsx";
import { FC, memo } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { IMessage } from "@/interfaces";
import { useComposerStore } from "@/stores";
import Reply from "./Reply";
import ContextMenu from "./ContextMenu";

interface ContentProps {
  isMe: boolean;
  reply?: IMessage;
  content: string;
  id: number;
  onOpen: () => void;
}

const Content: FC<ContentProps> = ({ isMe, reply, id, content, onOpen }) => {
  const { reply: replyStore } = useComposerStore();

  return (
    <ContextMenu onOpen={onOpen} isMe={isMe}>
      <div
        className={clsx(
          "relative py-2 px-4 transition-colors border-2 !text-white select-none space-y-1 rounded-2xl min-w-16 w-fit max-w-120",
          isMe
            ? "text-right rounded-tr-none bg-purple-500"
            : "bg-indigo-500 rounded-tl-none",
          replyStore?.id === id ? "border-white" : "border-transparent"
        )}
      >
        {reply && (
          <Reply
            displayName={reply.sender?.displayName!}
            content={reply.content}
          />
        )}

        <div className="prose text-white">
          <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
        </div>

        <div className={clsx(!isMe && "flex justify-end")}>
          <div className="p-1 rounded-full text-sm shadow w-fit bg-white text-neutral-500">
            🔥💛😂 3.2k+
          </div>
        </div>
      </div>
    </ContextMenu>
  );
};

export default memo(Content);
