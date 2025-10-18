import { Button, Textarea } from "@heroui/react";
import {
  AtSignIcon,
  CloudUploadIcon,
  MicIcon,
  QrCodeIcon,
  StickerIcon,
  XIcon,
} from "lucide-react";
import { FC, RefObject, memo, useState } from "react";

import Emoji from "./Emoji";
import { useReplyStore } from "@/stores";
import { useMessages } from "@/hooks";

interface ComposerProps {
  id: string;
  ref: RefObject<HTMLDivElement | null>;
}

const Composer: FC<ComposerProps> = ({ ref, id }) => {
  const [content, setContent] = useState("");
  const { reply, setReply } = useReplyStore();
  const { isDisabled, handleSendMessage } = useMessages(id);

  return (
    <div
      ref={ref}
      className="absolute bottom-0 left-0 w-full space-y-3 p-2 z-20"
    >
      {reply && (
        <div className="relative py-2 px-3 rounded-2xl bg-semilight">
          <div className="absolute top-0 right-0">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => setReply(null)}
            >
              <XIcon size={18} />
            </Button>
          </div>

          <div className="text-neutral-500 text-sm mb-1">
            {reply.displayName}
          </div>

          <div className="border-l-2 line-clamp-3 py-1 bg-semidark rounded-r-md pl-4">
            {reply.content}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 p-2 bg-semilight rounded-xl">
          <Button isIconOnly size="sm" variant="light">
            <QrCodeIcon size={20} />
          </Button>

          <Button isIconOnly size="sm" variant="light">
            <CloudUploadIcon size={20} />
          </Button>

          <Button isIconOnly size="sm" variant="light">
            <StickerIcon size={20} />
          </Button>

          <Button isIconOnly size="sm" variant="light">
            <AtSignIcon size={20} />
          </Button>
        </div>

        <div className="flex-1 flex items-center gap-3 py-2 px-4 bg-semilight rounded-full">
          <Button isIconOnly size="sm" variant="light">
            <MicIcon size={20} />
          </Button>

          <Textarea
            value={content}
            onChange={(e) => {
              const value = e.target.value;
              if (value.startsWith(" ")) return;
              setContent(value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isDisabled) {
                handleSendMessage(content, () => setContent(""));
              }
            }}
            maxRows={1}
            radius="full"
            placeholder="Enter here"
          />

          <Emoji setContent={setContent} />
        </div>
      </div>
    </div>
  );
};

export default memo(Composer);
