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
  content: string;
}

const ContextMenu: FC<ContextMenuProps> = ({ children, content }) => {
  return (
    <CM.Root>
      <CM.Trigger>{children}</CM.Trigger>

      <CM.Content>
        <CM.Item>
          <ReplyIcon size={18} />
          Reply
        </CM.Item>

        <CM.Item
          onClick={() => {
            navigator.clipboard.writeText(content);
          }}
        >
          <CopyIcon size={18} />
          Copy
        </CM.Item>

        <CM.Item>
          <PencilIcon size={18} />
          Edit
        </CM.Item>

        <CM.Item color="red">
          <Trash2Icon size={18} />
          Delete
        </CM.Item>

        <CM.Item color="red">
          <TrashIcon size={18} />
          Delete on my side
        </CM.Item>
      </CM.Content>
    </CM.Root>
  );
};

export default memo(ContextMenu);
