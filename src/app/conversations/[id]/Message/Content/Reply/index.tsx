import { Button } from "@heroui/react";
import { XIcon } from "lucide-react";
import { FC, memo } from "react";

interface ReplyProps {
  displayName: string;
  content: string;
  onClose?: () => void;
}

const Reply: FC<ReplyProps> = ({ displayName, content, onClose }) => {
  return (
    <>
      {onClose && (
        <div className="absolute top-0 right-0">
          <Button isIconOnly size="sm" variant="light" onPress={onClose}>
            <XIcon size={18} />
          </Button>
        </div>
      )}

      <div className="border-l-2 line-clamp-3 py-1 bg-semidark rounded-r-md px-4">
        <div className="text-neutral-500 text-sm mb-1">{displayName}</div>

        {content}
      </div>
    </>
  );
};

export default memo(Reply);
