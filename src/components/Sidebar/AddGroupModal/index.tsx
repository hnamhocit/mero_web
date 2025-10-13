import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { MessageCirclePlusIcon } from "lucide-react";

const AddGroupModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Add Group</ModalHeader>

          <ModalBody>
            <div className="flex items-center gap-3">
              <Input />

              <Button isIconOnly>
                <MessageCirclePlusIcon size={20} />
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Button onPress={onOpen} isIconOnly variant="light">
        <MessageCirclePlusIcon size={20} />
      </Button>
    </>
  );
};

export default AddGroupModal;
