import { FC, ReactNode, memo } from "react";
import { ContextMenu as CM } from "@radix-ui/themes";
import {
  CopyIcon,
  CornerUpRightIcon,
  PencilIcon,
  ReplyIcon,
  Trash2Icon,
  TrashIcon,
} from "lucide-react";
import { useComposerStore, useMessageStore } from "@/stores";

interface ContextMenuProps {
  children: ReactNode;
  isMe: boolean;
  onOpen: () => void;
}

const ContextMenu: FC<ContextMenuProps> = ({ children, onOpen, isMe }) => {
  const { onCopy, onReply, onDelete, onDeleteForMe } = useMessageStore();
  const { setMode } = useComposerStore();

  return (
    <CM.Root
      onOpenChange={(isOpen) => {
        if (isOpen) {
          onOpen();
        }
      }}
    >
      <CM.Trigger>{children}</CM.Trigger>

      <CM.Content>
        <CM.Item onClick={onReply}>
          <CornerUpRightIcon size={18} />
          Reply
        </CM.Item>

        <CM.Item>
          <ReplyIcon size={18} />
          Forward
        </CM.Item>

        <CM.Item onClick={onCopy}>
          <CopyIcon size={18} />
          Copy
        </CM.Item>

        {isMe && (
          <>
            <CM.Item onClick={() => setMode("edit")}>
              <PencilIcon size={18} />
              Edit
            </CM.Item>

            <CM.Item onClick={onDelete} color="red">
              <Trash2Icon size={18} />
              Delete
            </CM.Item>
          </>
        )}

        <CM.Item onClick={onDeleteForMe} color="red">
          <TrashIcon size={18} />
          Delete for me
        </CM.Item>
      </CM.Content>
    </CM.Root>
  );
};

export default memo(ContextMenu);
