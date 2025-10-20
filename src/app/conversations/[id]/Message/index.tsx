import clsx from "clsx";
import { FC, memo, useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import moment from "moment";
import { Avatar, AvatarGroup, Button, Tooltip } from "@heroui/react";
import { SmileIcon } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { IMessage } from "@/interfaces";
import { useReplyStore, useUserStore } from "@/stores";
import ContextMenu from "./ContextMenu";

interface MessageProps {
  message: IMessage;
  isContinuously: boolean;
  isSameTime: boolean;
  onDelete: (id: number) => void;
  onDeleteForMe: (id: number) => Promise<void>;
}

const emojis = ["🔥", "💛", "😂", "😮", "😢", "😡"];

const Message: FC<MessageProps> = ({
  message: { id, content, sender, createdAt },
  isContinuously,
  isSameTime,
  onDelete,
  onDeleteForMe,
}) => {
  const [isHover, setIsHover] = useState(false);
  const { user } = useUserStore();
  const { setReply } = useReplyStore();
  const isMe = user?.id === sender?.id;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(content);
  }, [content]);

  const handleReply = useCallback(() => {
    setReply({ id, content, displayName: sender?.displayName as string });
  }, [content, sender?.displayName]);

  const handleEdit = useCallback(() => {}, []);

  return (
    <motion.div
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={clsx(isContinuously ? "mb-2" : "mb-7")}
    >
      {!isSameTime && (
        <div className="text-sm font-medium select-none text-center my-7 text-gray-400">
          {moment(createdAt).format("HH:mm")}
        </div>
      )}

      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={clsx("flex items-center gap-3", isMe && "flex-row-reverse")}
      >
        <div className="space-y-2">
          <ContextMenu
            isMe={isMe}
            onCopy={handleCopy}
            onEdit={handleEdit}
            onReply={handleReply}
            onDelete={() => onDelete(id)}
            onDeleteForMe={() => onDeleteForMe(id)}
          >
            <div
              className={clsx(
                "relative py-2 px-4 !text-white select-none cursor-pointer space-y-1 rounded-2xl min-w-16 w-fit max-w-120",
                isMe
                  ? "text-right rounded-tr-none bg-purple-500"
                  : "bg-indigo-500 rounded-tl-none"
              )}
            >
              <div className="prose">
                <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
              </div>

              <div className={clsx(!isMe && "flex justify-end")}>
                <div className="p-1 rounded-full text-sm shadow w-fit bg-white text-neutral-500">
                  🔥💛😂 3.2k+
                </div>
              </div>
            </div>
          </ContextMenu>

          <div className={clsx(isMe && "flex justify-end")}>
            <AvatarGroup
              size="sm"
              max={3}
              renderCount={(count) => (
                <p className="text-small text-foreground font-medium ms-2">
                  +{count}
                </p>
              )}
              total={10}
            >
              <Avatar />
              <Avatar />
              <Avatar />
              <Avatar />
            </AvatarGroup>
          </div>
        </div>

        <AnimatePresence>
          {isHover && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <Tooltip
                content={
                  <div className="flex items-center gap-2">
                    {emojis.map((emoji) => (
                      <Button key={emoji} isIconOnly variant="light">
                        {emoji}
                      </Button>
                    ))}
                  </div>
                }
              >
                <Button isIconOnly variant="light" size="sm">
                  <SmileIcon size={20} />
                </Button>
              </Tooltip>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default memo(Message);
