import {
  addToast,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { UserPlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

import Loading from "@/components/Loading";
import { socket } from "@/config";
import { api } from "@/config/api";
import { useDebounce } from "@/hooks";
import { IFriendRequest, IResponse, IUser } from "@/interfaces";
import RequestStatus from "./RequestStatus";

export interface Ids {
  receivedRequestIds: number[];
  sentRequestIds: number[];
  friendIds: number[];
}

const AddFriendModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [users, setUsers] = useState<IUser[]>([]);
  const [ids, setIds] = useState<Ids>({
    receivedRequestIds: [],
    sentRequestIds: [],
    friendIds: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [q, setQ] = useState("");

  const debouncedQ = useDebounce(q, 500);

  useEffect(() => {
    if (debouncedQ.length > 2) {
      (async () => {
        try {
          setIsLoading(true);

          const { data } = await api.get("/users", {
            params: { q: debouncedQ },
          });

          setUsers(data);
        } catch (error) {
          addToast({
            title: "Search user error",
            description: JSON.stringify(error),
          });
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [debouncedQ]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const response: IResponse<Ids> = await api.get("/users/me/ids");

      setIds(response.data);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    const handleNewFriendRequest = (req: IFriendRequest) => {
      setIds((prev) => ({
        ...prev,
        receivedRequestIds: [...prev.receivedRequestIds, req.fromId],
      }));
    };

    const handleFriendRequestRejected = (id: number) => {
      setIds((prev) => ({
        ...prev,
        sentRequestIds: prev.receivedRequestIds.filter((i) => i !== id),
      }));
    };

    const handleFriendRequestAccepted = (id: number) => {
      setIds((prev) => ({
        ...prev,
        sentRequestIds: prev.sentRequestIds.filter((i) => i !== id),
        friendIds: [...prev.friendIds, id],
      }));
    };

    socket.on("friendRequest:new", handleNewFriendRequest);
    socket.on("friendRequest:rejected", handleFriendRequestRejected);
    socket.on("friendRequest:accepted", handleFriendRequestAccepted);

    return () => {
      socket.off("friendRequest:new", handleNewFriendRequest);
      socket.off("friendRequest:rejected", handleFriendRequestRejected);
      socket.off("friendRequest:accepted", handleFriendRequestAccepted);
    };
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Add Friend</ModalHeader>
          <ModalBody className="min-h-40">
            <Input
              placeholder="Search for a friend"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />

            {isLoading && <Loading />}

            {users.map((user) => (
              <RequestStatus
                key={user.id}
                user={user}
                ids={ids}
                setIds={setIds}
              />
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Button onPress={onOpen} isIconOnly variant="light">
        <UserPlusIcon size={20} />
      </Button>
    </>
  );
};

export default AddFriendModal;
