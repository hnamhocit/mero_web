import {
  Avatar,
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  User,
  addToast,
  useDisclosure,
} from "@heroui/react";
import { MessageCirclePlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { api, socket } from "@/config";
import { IUser } from "@/interfaces";
import UploadAvatar from "@/components/UploadAvatar";
import { getFormatDate } from "@/utils";

const AddGroupModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [friends, setFriends] = useState<IUser[]>([]);
  const [participantIds, setParticipantIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const fetchFriends = async () => {
      const response = await api.get("/users/me/friends");
      setFriends(response.data);
      setIsLoading(false);
    };

    fetchFriends();
  }, []);

  const handleReset = () => {
    setParticipantIds([]);
    setFile(null);
    setName("");
  };

  const handleCreateConversation = async () => {
    if (!file) {
      addToast({ description: "Please select an image", color: "danger" });
      return;
    }

    if (name.trim().length === 0) {
      addToast({ description: "Please enter a name", color: "danger" });
      return;
    }

    if (participantIds.length < 2) {
      addToast({
        description: "Please select at least 2 participants",
        color: "danger",
      });
      return;
    }

    const formData = new FormData();
    formData.append("path", `images/${getFormatDate()}`);
    formData.append("file", file);

    const { data } = await api.post("/uploads/file", formData);

    socket.emit("conversation", {
      cmd: "create",
      args: {
        name,
        participantIds,
        photoURL: data.url,
        photoId: data.key,
      },
    });

    handleReset();
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Add Group</ModalHeader>

          <ModalBody>
            <div className="flex items-center gap-3">
              <UploadAvatar className="shrink-0" onFileChange={setFile} />

              <Input value={name} onValueChange={setName} placeholder="Name" />
            </div>

            {isLoading && <div>Loading...</div>}

            {friends.map((f) => (
              <div key={f.id} className="flex items-center justify-between">
                <User
                  avatarProps={{
                    src: f.photoURL ?? "",
                  }}
                  name={f.displayName}
                />

                <Checkbox
                  checked={participantIds.includes(f.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setParticipantIds([...participantIds, f.id]);
                    } else {
                      setParticipantIds(
                        participantIds.filter((id) => id !== f.id)
                      );
                    }
                  }}
                />
              </div>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button onPress={handleReset} variant="bordered" color="danger">
              Reset
            </Button>

            <Button onPress={handleCreateConversation} color="primary">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Button onPress={onOpen} isIconOnly variant="light">
        <MessageCirclePlusIcon size={20} />
      </Button>
    </>
  );
};

export default AddGroupModal;
