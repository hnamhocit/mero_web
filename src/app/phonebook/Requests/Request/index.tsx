"use client";

import { Avatar, Button, Card, CardBody } from "@heroui/react";
import { CheckIcon, XIcon, MessageCircleIcon } from "lucide-react";

import { IFriendRequest } from "@/interfaces";

interface RequestProps {
  request: IFriendRequest;
  onAccept?: (requestId: number) => void;
  onReject?: (requestId: number) => void;
}

export default function Request({ request, onAccept, onReject }: RequestProps) {
  const { from, message, createdAt } = request;

  return (
    <Card
      shadow="none"
      className="p-2 bg-semilight border border-white/10 hover:border-purple-500/40 transition-all duration-300 rounded-2xl"
    >
      <CardBody>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <Avatar
              src={from?.photoURL ?? ""}
              alt={from?.displayName}
              className="w-12 h-12 ring-2 ring-purple-500/30"
            />

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <div className="font-semibold text-white">
                  {from?.displayName}
                </div>

                <span className="text-xs text-gray-400">
                  {new Date(createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div className="text-sm text-gray-300 flex items-center gap-1 mt-1">
                <MessageCircleIcon size={14} className="text-purple-400" />
                <span>{message}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              isIconOnly
              color="danger"
              variant="flat"
              size="sm"
              className="rounded-xl bg-red-500/10 hover:bg-red-500/30"
              onPress={() => onReject?.(request.id)}
            >
              <XIcon size={18} />
            </Button>

            <Button
              isIconOnly
              color="primary"
              variant="flat"
              size="sm"
              className="rounded-xl bg-purple-500/20 hover:bg-purple-500/40"
              onPress={() => onAccept?.(request.id)}
            >
              <CheckIcon size={18} />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
