import { IDocument } from "./document";
import { ConversationType } from "./enums";
import { IMessage } from "./message";
import { IParticipant } from "./participant";

export interface IConversation extends IDocument {
  type: ConversationType;
  name: string | null;
  lastMessageId: number | null;
  photoURL: string | null;
  photoId: string | null;

  lastMessage?: IMessage;
  messages?: IMessage[];
  participants?: IParticipant[];
}
