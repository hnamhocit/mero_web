"use client";

import { Image, Input } from "@heroui/react";
import { SearchIcon } from "lucide-react";
import AddFriendModal from "./AddFriendModal";
import AddGroupModal from "./AddGroupModal";

function Sidebar() {
  return (
    <div className="shrink-0 w-80 border-r border-white/10 bg-dark">
      <div className="h-16 border-b border-white/10 p-2 flex items-center gap-3">
        <Input
          startContent={<SearchIcon size={20} />}
          placeholder="Search user or group..."
        />

        <div className="flex items-center gap-1">
          <AddFriendModal />

          <AddGroupModal />
        </div>
      </div>

      <div className="h-[calc(100vh-64px)] flex flex-col overflow-x-scroll overflow-y-auto">
        <div className="relative p-4 flex items-center gap-3">
          <Image
            src="https://i.pinimg.com/736x/51/45/a1/5145a11ace874008d38cb27244010595.jpg"
            radius="full"
            alt="Logo"
            width={44}
            height={44}
            className="object-cover"
          />

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="text-white line-clamp-1 font-semibold">Lila</div>

              <div className="text-sm text-white/30">1:30 AM</div>
            </div>

            <div className="text-sm line-clamp-1 text-white/50">
              Hi, how are you 💕
            </div>
          </div>

          <div className="absolute bottom-2 right-2 w-4 h-4 flex items-center justify-center bg-red-400 text-xs font-bold rounded-full">
            1
          </div>
        </div>

        <div className="relative p-4 flex items-center gap-3 bg-semilight">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP5ZUpPdZVKWaCvqmZulKqnEzDKffKbGQpvQ&s"
            radius="full"
            alt="Logo"
            width={44}
            height={44}
            className="object-cover"
          />

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="text-white line-clamp-1 font-semibold">Nhung</div>

              <div className="text-sm text-white/30">1:02 AM</div>
            </div>

            <div className="text-sm line-clamp-1 text-white/50">
              Tối nay bạn rảnh khum á?
            </div>
          </div>

          <div className="absolute bottom-2 right-2 w-4 h-4 flex items-center justify-center bg-red-400 text-xs font-bold rounded-full">
            2
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
