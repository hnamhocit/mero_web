import { FC, memo } from "react";
import { Ids } from "..";
import { Button } from "@heroui/react";
import {
  CheckIcon,
  EllipsisIcon,
  HandPlatter,
  HandshakeIcon,
  UserPlusIcon,
  XIcon,
} from "lucide-react";
import { IUser } from "@/interfaces";

interface ActionsProps {
  ids: Ids;
  onCreateRequest: (userId: number, message: string) => Promise<void>;
  onReject: (fromId: number) => Promise<void>;
  onAccept: (fromId: number) => Promise<void>;
  user: IUser;
}

const Actions: FC<ActionsProps> = ({
  user,
  ids: { receivedRequestIds, sentRequestIds, friendIds },
  onCreateRequest,
  onReject,
  onAccept,
}) => {
  return (
    <div className="flex items-center gap-3">
      {friendIds.includes(user.id) ? (
        <>
          <Button isIconOnly variant="light">
            <HandshakeIcon size={20} />
          </Button>

          <Button isIconOnly variant="light">
            <EllipsisIcon size={20} />
          </Button>
        </>
      ) : receivedRequestIds?.includes(user.id) ? (
        <>
          <Button
            onPress={() => onReject(user.id)}
            isIconOnly
            variant="light"
            color="danger"
          >
            <XIcon size={20} />
          </Button>

          <Button
            onPress={() => onAccept(user.id)}
            isIconOnly
            variant="light"
            color="secondary"
          >
            <CheckIcon size={20} />
          </Button>
        </>
      ) : sentRequestIds?.includes(user.id) ? (
        <Button variant="light" startContent={<HandPlatter size={20} />}>
          Pending
        </Button>
      ) : (
        <Button
          onPress={() =>
            onCreateRequest(
              user.id,
              `Hi ${user.displayName}, I found you through search. Let's connect!`
            )
          }
          isIconOnly
          variant="light"
        >
          <UserPlusIcon size={20} />
        </Button>
      )}
    </div>
  );
};

export default memo(Actions);
