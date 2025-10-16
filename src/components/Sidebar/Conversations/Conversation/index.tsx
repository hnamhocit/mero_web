import { Avatar } from "@heroui/react";
import moment from "moment";
import { FC, memo } from "react";

import { ConversationType, IConversation, IUser } from "@/interfaces";
import { useUserStore } from "@/stores";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MergeConversation } from "..";

const quickContent = (
  content: string,
  isDirect: boolean,
  isMe: boolean,
  displayName?: string
) => {
  if (isDirect) {
    if (isMe) {
      return `You: ${content}`;
    } else {
      return content;
    }
  }

  return `${displayName}: ${content}`;
};

const Conversation: FC<MergeConversation> = ({
  photoURL,
  type,
  name,
  lastMessage,
  otherUser,
  id,
}) => {
  const { user } = useUserStore();

  const isDirect = type === ConversationType.DIRECT;
  const pathname = usePathname();

  return (
    <Link
      href={`/conversations/${id}`}
      className={clsx(
        "relative p-4 flex items-center gap-3 transition hover:bg-semilight",
        pathname === `/conversations/${id}` && "bg-semilight"
      )}
    >
      <Avatar
        src={isDirect ? otherUser?.photoURL ?? "" : photoURL ?? ""}
        radius="full"
        alt="Logo"
        className="object-cover"
      />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="text-white line-clamp-1 font-semibold">
            {isDirect ? otherUser?.displayName : name}
          </div>

          {lastMessage && (
            <div className="text-sm text-white/30">
              {moment(lastMessage?.createdAt).format("DD:MM")}
            </div>
          )}
        </div>

        <div className="text-sm line-clamp-1 text-white/50">
          {lastMessage
            ? quickContent(
                lastMessage.content,
                isDirect,
                lastMessage.senderId === user?.id,
                otherUser?.displayName
              )
            : "Start a new conversation..."}
        </div>
      </div>

      <div className="absolute bottom-2 right-2 w-4 h-4 flex items-center justify-center bg-red-400 text-xs font-bold rounded-full">
        1
      </div>
    </Link>
  );
};

export default memo(Conversation);
