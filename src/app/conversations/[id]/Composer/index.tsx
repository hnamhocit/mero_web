import { Button } from "@heroui/react";
import {
  AtSignIcon,
  CloudUploadIcon,
  MicIcon,
  QrCodeIcon,
  StickerIcon,
} from "lucide-react";
import { Dispatch, FC, SetStateAction, memo, useState } from "react";

import Emoji from "./Emoji";
import { IMessage } from "@/interfaces";
import { socket } from "@/config";

interface ComposerProps {
  id: string;
  setMessages: Dispatch<SetStateAction<IMessage[]>>;
}

const Composer: FC<ComposerProps> = ({ setMessages, id }) => {
  const [content, setContent] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSendMessage = async () => {
    setIsDisabled(true);

    const response = await socket.emitWithAck("message", {
      cmd: "send",
      args: {
        content,
        conversationId: Number(id),
      },
    });
    setMessages((prev) => [...prev, response.data]);

    setContent("");
    setIsDisabled(false);
  };

  return (
    <div className="absolute bottom-0 left-0 h-16 w-full p-2 flex items-center gap-3">
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

        <input
          value={content}
          onChange={(e) => {
            const value = e.target.value;
            if (value.startsWith(" ")) return;
            setContent(value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isDisabled) {
              handleSendMessage();
            }
          }}
          placeholder="Enter here"
          className="block w-full outline-none"
        />

        <Emoji setContent={setContent} />
      </div>
    </div>
  );
};

export default memo(Composer);
