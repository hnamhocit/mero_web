"use client";

import { Button, Input } from "@heroui/react";
import { FilterIcon, Grid2X2Icon, ListIcon, SearchIcon } from "lucide-react";

import Requests from "./Requests";
import Contacts from "./Contacts";
import { useState } from "react";

export default function PhoneBookPage() {
  const [q, setQ] = useState("");

  return (
    <div className="p-4 space-y-8">
      <div className="text-3xl font-bold">Contacts</div>

      {/* Search + filter */}
      <div className="flex items-center gap-3">
        <Input
          placeholder="Search contacts"
          endContent={<SearchIcon size={18} />}
          className="flex-1"
          value={q}
          onValueChange={(value) => {
            if (value.startsWith(" ")) return;
            setQ(value);
          }}
        />

        <div className="flex gap-2">
          <Button isIconOnly variant="ghost">
            <FilterIcon size={18} />
          </Button>

          <Button isIconOnly variant="ghost">
            <ListIcon size={18} />
          </Button>

          <Button isIconOnly variant="ghost">
            <Grid2X2Icon size={18} />
          </Button>
        </div>
      </div>

      {/* Friend Requests */}
      <Requests />

      {/* Contacts list */}
      <Contacts q={q} />
    </div>
  );
}
