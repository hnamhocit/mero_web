import { FC, ReactNode, memo } from "react";
import { ContextMenu as CM } from "@radix-ui/themes";
import {
  CopyIcon,
  PencilIcon,
  ReplyIcon,
  Trash2Icon,
  TrashIcon,
} from "lucide-react";

interface ContextMenuProps {
  children: ReactNode;
  onCopy: () => void;
  onEdit: () => void;
  onReply: () => void;
  onDelete: () => void;
  onDeleteForMe: () => void;
}

const ContextMenu: FC<ContextMenuProps> = ({
  children,
  onCopy,
  onEdit,
  onReply,
  onDelete,
  onDeleteForMe,
}) => {
  return (
    <CM.Root>
      <CM.Trigger>{children}</CM.Trigger>

      <CM.Content>
        <CM.Item onClick={onReply}>
          <ReplyIcon size={18} />
          Reply
        </CM.Item>

        <CM.Item onClick={onCopy}>
          <CopyIcon size={18} />
          Copy
        </CM.Item>

        <CM.Item onClick={onEdit}>
          <PencilIcon size={18} />
          Edit
        </CM.Item>

        <CM.Item color="red" onClick={onDelete}>
          <Trash2Icon size={18} />
          Delete
        </CM.Item>

        <CM.Item color="red" onClick={onDeleteForMe}>
          <TrashIcon size={18} />
          Delete for me
        </CM.Item>
      </CM.Content>
    </CM.Root>
  );
};

export default memo(ContextMenu);
