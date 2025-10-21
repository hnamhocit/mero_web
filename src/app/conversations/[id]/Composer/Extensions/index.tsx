import { Button } from "@heroui/react";
import {
  AtSignIcon,
  PaperclipIcon,
  QrCodeIcon,
  StickerIcon,
} from "lucide-react";
import Emoji from "./Emoji";

const Extensions = () => {
  return (
    <div className="flex items-center gap-1">
      <Emoji />

      <Button isIconOnly size="sm" variant="light">
        <StickerIcon size={20} />
      </Button>

      <Button isIconOnly size="sm" variant="light">
        <PaperclipIcon size={20} />
      </Button>

      <Button isIconOnly size="sm" variant="light">
        <QrCodeIcon size={20} />
      </Button>

      <Button isIconOnly size="sm" variant="light">
        <AtSignIcon size={20} />
      </Button>
    </div>
  );
};

export default Extensions;
