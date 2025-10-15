"use client";

import { Input } from "@heroui/react";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

import AddFriendModal from "./AddFriendModal";
import AddGroupModal from "./AddGroupModal";
import Conversations from "./Conversations";

function Sidebar() {
  const [q, setQ] = useState("");

  return (
    <div className="shrink-0 w-80 border-r border-white/10 bg-dark overflow-hidden">
      <div className="h-16 border-b border-white/10 p-2 flex items-center gap-3">
        <Input
          startContent={<SearchIcon size={20} />}
          placeholder="Search user or group..."
          value={q}
          onValueChange={(value) => {
            if (value.startsWith(" ")) return;
            setQ(value);
          }}
        />

        <div className="flex items-center gap-1">
          <AddFriendModal />

          <AddGroupModal />
        </div>
      </div>

      <Conversations q={q} />
    </div>
  );
}

export default Sidebar;
