import { Avatar, Button } from "@heroui/react";
import { EllipsisIcon, PhoneIcon, VideoIcon } from "lucide-react";
import React, { FC, memo } from "react";

import { IUser } from "@/interfaces";

const Contact: FC<IUser> = ({ displayName, photoURL }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
      <div className="flex items-center gap-3">
        <Avatar src={photoURL ?? ""} alt={displayName} />
        <div>{displayName}</div>
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
};

export default memo(Contact);
