import clsx from "clsx";
import { FC, memo, useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import moment from "moment";
import { Button, Tooltip } from "@heroui/react";
import { SmileIcon } from "lucide-react";

import { IMessage } from "@/interfaces";
import { useReplyStore, useUserStore } from "@/stores";
import ContextMenu from "./ContextMenu";

interface MessageProps {
  message: IMessage;
  isContinuously: boolean;
  isSameTime: boolean;
}

const emojis = ["🔥", "💛", "😂", "😮", "😢", "😡"];

const Message: FC<MessageProps> = ({
  message: { content, sender, createdAt },
  isContinuously,
  isSameTime,
}) => {
  const [isHover, setIsHover] = useState(false);
  const { user } = useUserStore();
  const { setReply } = useReplyStore();
  const isMe = user?.id === sender?.id;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(content);
  }, [content]);

  const handleReply = useCallback(() => {
    setReply({ content, displayName: sender?.displayName as string });
  }, [content, sender?.displayName]);

  const handleEdit = useCallback(() => {}, []);

  const handleDelete = useCallback(() => {}, []);

  const handleDeleteForMe = useCallback(() => {}, []);

  return (
    <motion.div
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={clsx(isContinuously ? "mb-2" : "mb-7")}
    >
      {!isSameTime && (
        <div className="text-sm font-medium select-none text-center mb-7 text-gray-400">
          {moment(createdAt).format("HH:mm")}
        </div>
      )}

      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={clsx("flex items-center gap-3", isMe && "flex-row-reverse")}
      >
        <ContextMenu
          onCopy={handleCopy}
          onEdit={handleEdit}
          onReply={handleReply}
          onDelete={handleDelete}
          onDeleteForMe={handleDeleteForMe}
        >
          <motion.div
            whileHover={{ scale: 0.95, opacity: 0.9 }}
            className={clsx(
              "relative py-2 px-4 select-none cursor-pointer space-y-1 rounded-2xl min-w-16 w-fit max-w-80",
              isMe
                ? "text-right rounded-tr-none bg-purple-500 text-white"
                : "bg-white text-black rounded-tl-none"
            )}
          >
            <div>{content}</div>
          </motion.div>
        </ContextMenu>

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
