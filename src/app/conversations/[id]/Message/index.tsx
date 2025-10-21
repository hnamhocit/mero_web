import clsx from "clsx";
import { FC, memo, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import moment from "moment";
import { Avatar, AvatarGroup, Button, Tooltip } from "@heroui/react";
import { SmileIcon } from "lucide-react";

import { IMessage } from "@/interfaces";
import { useMessageStore, useUserStore } from "@/stores";
import Content from "./Content";

interface MessageProps {
  message: IMessage;
  isContinuously: boolean;
  isSameTime: boolean;
}

const emojis = ["🔥", "💛", "😂", "😮", "😢", "😡"];

const Message: FC<MessageProps> = ({ message, isContinuously, isSameTime }) => {
  const [isHover, setIsHover] = useState(false);
  const { user } = useUserStore();
  const { setMessage } = useMessageStore();

  const { id, content, sender, createdAt, reply } = message;
  const isMe = useMemo(() => user?.id === sender?.id, [user?.id, sender?.id]);

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
          <Content
            id={id}
            isMe={isMe}
            reply={reply}
            content={content}
            onOpen={() => setMessage(message)}
          />

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
