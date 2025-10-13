"use client";

import { Button, Image, Input } from "@heroui/react";
import {
  BoltIcon,
  FileImageIcon,
  IdCardIcon,
  PaperclipIcon,
  PhoneIcon,
  SendIcon,
  StickerIcon,
  VideoIcon,
} from "lucide-react";

const actions = [
  {
    label: "Stickers",
    icon: StickerIcon,
  },
  {
    label: "Files",
    icon: PaperclipIcon,
  },
  {
    label: "Photos",
    icon: FileImageIcon,
  },
  {
    label: "ID card",
    icon: IdCardIcon,
  },
];

export default function Home() {
  return (
    <div className="h-screen relative bg-semidark">
      <div className="sticky top-0 left-0 w-full h-16 border-b border-white/10 flex items-center justify-between px-4 bg-semilight">
        <div className="flex items-center gap-3">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP5ZUpPdZVKWaCvqmZulKqnEzDKffKbGQpvQ&s"
            radius="full"
            alt="Logo"
            width={40}
            height={40}
            className="object-cover"
          />

          <div>
            <div className="text-white line-clamp-1 font-semibold">Nhung</div>
            <div className="text-sm line-clamp-1 text-white/50">
              “Stars can’t shine without darkness.” ✨
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button isIconOnly variant="light">
            <PhoneIcon size={20} />
          </Button>

          <Button isIconOnly variant="light">
            <VideoIcon size={20} />
          </Button>

          <Button isIconOnly variant="light">
            <BoltIcon size={20} />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-7 h-[calc(100vh-64px-96px)] overflow-y-scroll">
        <div className="flex gap-3">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP5ZUpPdZVKWaCvqmZulKqnEzDKffKbGQpvQ&s"
            radius="full"
            alt="Logo"
            width={44}
            height={44}
            className="object-cover"
          />

          <div className="border border-white/10 bg-white text-black p-2 rounded-2xl min-w-24">
            <div className="text-sm text-black/30 font-medium">Nhung</div>
            <div>Chao xinnnn</div>
          </div>
        </div>

        <div className="flex gap-3">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP5ZUpPdZVKWaCvqmZulKqnEzDKffKbGQpvQ&s"
            radius="full"
            alt="Logo"
            width={44}
            height={44}
            className="object-cover"
          />

          <div className="border border-white/10 bg-white text-black p-2 rounded-2xl min-w-24">
            <div className="text-sm text-black/30 font-medium">Nhung</div>
            <div>Chao xinnnn</div>
          </div>
        </div>

        <div className="flex flex-row-reverse gap-3">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP5ZUpPdZVKWaCvqmZulKqnEzDKffKbGQpvQ&s"
            radius="full"
            alt="Logo"
            width={44}
            height={44}
            className="object-cover"
          />

          <div className="border border-white/10 bg-primary text-white p-2 rounded-2xl min-w-24">
            <div>Chao xinnnn</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 space-y-1 left-0 h-24 border-t border-white/10 w-full bg-semilight p-2">
        <div className="flex items-center gap-3">
          {actions.map((action) => (
            <Button key={action.label} isIconOnly size="sm" variant="light">
              {<action.icon size={18} />}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Input placeholder="Enter here..." />

          <Button isIconOnly color="secondary">
            <SendIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
