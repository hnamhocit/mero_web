"use client";

import { useUserStore } from "@/stores";
import { Avatar, Button, Input } from "@heroui/react";
import {
  EllipsisIcon,
  FilterIcon,
  Grid2X2Icon,
  ListIcon,
  PhoneIcon,
  SearchIcon,
  VideoIcon,
} from "lucide-react";
import Requests from "./Requests";

function ContactItem({ name, photoURL }: { name: string; photoURL?: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
      <div className="flex items-center gap-3">
        <Avatar src={photoURL ?? ""} alt={name} />
        <div>{name}</div>
      </div>

      <div className="flex items-center gap-2">
        <Button isIconOnly variant="light">
          <PhoneIcon size={18} />
        </Button>
        <Button isIconOnly variant="light">
          <VideoIcon size={18} />
        </Button>
        <Button isIconOnly variant="light">
          <EllipsisIcon size={18} />
        </Button>
      </div>
    </div>
  );
}

function ContactSection({
  letter,
  contacts,
}: {
  letter: string;
  contacts: { name: string; photoURL?: string }[];
}) {
  return (
    <div>
      <div className="p-4 border-b border-white/10 text-lg font-bold">
        {letter}
      </div>
      <div className="p-2 space-y-2 bg-semidark rounded-b-2xl">
        {contacts.map((c, i) => (
          <ContactItem key={i} name={c.name} photoURL={c.photoURL} />
        ))}
      </div>
    </div>
  );
}

export default function PhoneBookPage() {
  const { user } = useUserStore();

  const contacts = [
    {
      letter: "A",
      items: [
        { name: user?.displayName ?? "Hoàng Nam", photoURL: user?.photoURL },
        { name: "An", photoURL: user?.photoURL },
        { name: "Anh Tuấn", photoURL: user?.photoURL },
      ],
    },
    {
      letter: "B",
      items: [
        { name: "Bảo", photoURL: user?.photoURL },
        { name: "Bình Minh", photoURL: user?.photoURL },
      ],
    },
  ];

  return (
    <div className="p-4 space-y-8">
      <div className="text-3xl font-bold">Contacts</div>

      {/* Search + filter */}
      <div className="flex items-center gap-3">
        <Input
          placeholder="Search contacts"
          endContent={<SearchIcon size={18} />}
          className="flex-1"
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
      <div className="space-y-8">
        {contacts.map((group) => (
          <ContactSection
            key={group.letter}
            letter={group.letter}
            contacts={group.items}
          />
        ))}
      </div>
    </div>
  );
}
