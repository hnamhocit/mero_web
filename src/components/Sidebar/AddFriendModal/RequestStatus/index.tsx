import { Avatar } from "@heroui/react";
import { Dispatch, FC, SetStateAction, memo, useCallback } from "react";

import { IUser } from "@/interfaces";
import { Ids } from "..";
import Actions from "./Actions";
import { socket } from "@/config";

interface RequestStatusProps {
  user: IUser;
  ids: Ids;
  setIds: Dispatch<SetStateAction<Ids>>;
}

const RequestStatus: FC<RequestStatusProps> = ({ user, ids, setIds }) => {
  const handleCreateRequest = useCallback(
    async (id: number, message: string) => {
      const req = await socket.emitWithAck("friendRequest", {
        cmd: "create",
        args: {
          to: id,
          message,
        },
      });

      setIds((prev) => ({
        ...prev,
        sentRequestIds: [...prev.sentRequestIds, req.data.toId],
      }));
    },
    []
  );

  const handleReject = useCallback(async (fromId: number) => {
    await socket.emitWithAck("friendRequest", {
      cmd: "reject",
      args: {
        fromId,
      },
    });

    setIds((prev) => ({
      ...prev,
      receivedRequestIds: prev.receivedRequestIds.filter((id) => id !== fromId),
    }));
  }, []);

  const handleAccept = useCallback(async (fromId: number) => {
    await socket.emitWithAck("friendRequest", {
      cmd: "accept",
      args: {
        fromId,
      },
    });

    setIds((prev) => ({
      ...prev,
      friendIds: [...prev.friendIds, fromId],
      receivedRequestIds: prev.receivedRequestIds.filter((id) => id !== fromId),
    }));
  }, []);

  return (
    <div key={user.id} className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar src={user.photoURL ?? ""} alt={user.displayName} />

        <div>
          <div>{user.displayName}</div>
          <div>{user.bio}</div>
        </div>
      </div>

      <Actions
        ids={ids}
        onCreateRequest={handleCreateRequest}
        onAccept={handleAccept}
        onReject={handleReject}
        user={user}
      />
    </div>
  );
};

export default memo(RequestStatus);
