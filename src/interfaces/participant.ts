import { IConversation } from "./conversation";
import { IDocument } from "./document";
import { ParticipantRole } from "./enums";
import { IMessage } from "./message";
import { IUser } from "./user";

export interface IParticipant extends IDocument {
  conversationId: number;
  userId: number;
  role: ParticipantRole;
  lastSeenMessageId?: number | null;

  conversation?: IConversation;
  user?: IUser;
  lastSeenMessage?: IMessage;
}
