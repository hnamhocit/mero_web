"use client";

import { Tooltip, Image } from "@heroui/react";
import {
  MessageCircleIcon,
  BookUserIcon,
  BookMarkedIcon,
  FoldersIcon,
  ChartSplineIcon,
  CloudyIcon,
  ToolCaseIcon,
  SettingsIcon,
} from "lucide-react";
import NavButton from "./NavButton";

const userFeatures = [
  { icon: MessageCircleIcon, label: "Messages", href: "/" },
  { icon: BookUserIcon, label: "Phone Book", href: "/phonebook" },
  { icon: BookMarkedIcon, label: "Bookmarks", href: "/bookmarks" },
  { icon: FoldersIcon, label: "Folders", href: "/uploaded" },
  { icon: ChartSplineIcon, label: "Analytics", href: "/analytics" },
];

const appFeatures = [
  { icon: CloudyIcon, label: "Cloud", href: "/cloud" },
  { icon: ToolCaseIcon, label: "Tools", href: "/tools" },
  { icon: SettingsIcon, label: "Settings", href: "/me/settings" },
];

export default function Navbar() {
  return (
    <div className="shrink-0 border-r border-white/10 w-16 bg-dark">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-white/10">
        <Image src="/logo.png" alt="Logo" width={32} height={32} />
      </div>

      {/* Features */}
      <div className="h-[calc(100vh-64px)] flex flex-col justify-between p-2">
        {/* Top user features */}
        <div className="flex flex-col gap-3">
          {userFeatures.map((feature) => (
            <NavButton key={feature.label} {...feature} />
          ))}
        </div>

        {/* Bottom app features */}
        <div className="flex flex-col gap-3">
          {appFeatures.map((feature) => (
            <NavButton key={feature.label} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
}
