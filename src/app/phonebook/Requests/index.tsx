import { addToast, Button } from "@heroui/react";
import Request from "./Request";
import { IFriendRequest } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";
import { socket } from "@/config/socket";
import { api } from "@/config";

function Requests() {
  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState<IFriendRequest[]>([]);

  useEffect(() => {
    (async () => {
      const response = await api.get("/users/me/received-requests");

      setRequests(response.data);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    const handleNewFriendRequest = (req: any) => {
      setRequests((prevRequests) => [...prevRequests, req]);
    };

    socket.on("friendRequest:new", handleNewFriendRequest);

    return () => {
      socket.off("friendRequest:new", handleNewFriendRequest);
    };
  }, []);

  const handleAccept = useCallback(async (id: number) => {
    try {
      await socket.emitWithAck("friendRequest", {
        cmd: "accept",
        args: { id },
      });

      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      );
    } catch (error) {
      addToast({
        color: "danger",
        title: "Accept friend request failed",
        description: JSON.stringify(error),
      });
    }
  }, []);

  const handleReject = useCallback(async (id: number) => {
    try {
      await socket.emitWithAck("friendRequest", {
        cmd: "reject",
        args: { id },
      });

      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      );
    } catch (error) {
      addToast({
        color: "danger",
        title: "Reject friend request failed",
        description: JSON.stringify(error),
      });
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold flex items-center justify-between">
        <span>Friend requests ({requests.length})</span>

        <Button variant="light" size="sm" className="text-xs text-white/70">
          See all
        </Button>
      </div>

      {isLoading && <div>Loading...</div>}

      {requests.map((request) => (
        <Request
          key={request.id}
          request={request}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      ))}
    </div>
  );
}

export default Requests;
