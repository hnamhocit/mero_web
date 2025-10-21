import { IConversation } from "./conversation";
import { IDocument } from "./document";
import { IParticipant } from "./participant";
import { IUser } from "./user";

export interface IMessage extends IDocument {
  content: string;
  conversationId: number;
  senderId: number;
  replyId?: number;

  conversation?: IConversation;
  sender?: IUser;
  reply?: IMessage;

  conversationAsLast?: IConversation[];
  participantAsLast?: IParticipant[];
}
