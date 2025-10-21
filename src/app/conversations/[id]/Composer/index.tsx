import { Button } from "@heroui/react";
import { CornerUpRight, PlusIcon, SendIcon, XIcon } from "lucide-react";
import { FC, RefObject, memo } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

import Extensions from "./Extensions";
import { useComposerStore } from "@/stores";

interface ComposerProps {
  id: string;
  ref: RefObject<HTMLDivElement | null>;
}

const Composer: FC<ComposerProps> = ({ ref, id }) => {
  const {
    content,
    setContent,
    reply,
    setReply,
    mode,
    isDisabled,
    onSend,
    isOpenAccessoryBar,
    onCloseAccessoryBar,
  } = useComposerStore();

  return (
    <div ref={ref} className="absolute bottom-0 left-0 w-full p-2 z-20">
      <div className="p-2 bg-semilight rounded-lg">
        {isOpenAccessoryBar && (
          <div className="relative px-2 pb-2 border-b border-neutral-700 mb-2 bg-semilight">
            {reply && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CornerUpRight className="text-purple-500" size={20} />

                  <div>
                    Replying{" "}
                    <span className="font-semibold">@{reply.displayName}</span>
                  </div>
                </div>

                <Button
                  onPress={() => {
                    setReply(null);
                    onCloseAccessoryBar();
                  }}
                  isIconOnly
                  size="sm"
                  variant="light"
                >
                  <XIcon size={18} />
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3 items-start">
          <Button size="sm" isIconOnly variant="light">
            <PlusIcon />
          </Button>

          <ReactTextareaAutosize
            value={content}
            onChange={(e) => {
              const value = e.target.value;
              if (value.startsWith(" ")) return;
              setContent(value);
            }}
            className="block py-1 resize-none w-full bg-transparent outline-none"
          />

          <Extensions />

          <Button
            isLoading={isDisabled}
            onPress={() => onSend(id)}
            size="sm"
            isIconOnly
            color="primary"
          >
            <SendIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(Composer);
