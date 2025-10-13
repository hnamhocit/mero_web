import { IDocument } from "./document";
import { ConversationType, Role, Sex } from "./enums";
import { IFriend } from "./friend";
import { IFriendRequest } from "./friendRequest";
import { IMessage } from "./message";
import { IParticipant } from "./participant";

export interface IUser extends IDocument {
  displayName: string;
  email: string;
  password: string;
  refreshToken: string | null;
  bio: string | null;
  photoURL: string | null;
  photoId: string | null;
  backgroundURL: string | null;
  backgroundId: string | null;
  verificationCode: string | null;
  verificationCodeExpiresAt: Date | null;
  isEmailVerified: boolean;
  role: Role;
  sex: Sex;

  sentRequests?: IFriendRequest[];
  receivedRequests?: IFriendRequest[];

  friendshipsA?: IFriend[];
  friendshipsB?: IFriend[];

  messages?: IMessage[];
  participants?: IParticipant[];
}
