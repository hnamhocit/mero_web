import { IDocument } from "./document";
import { IUser } from "./user";

export interface IFriendRequest extends IDocument {
  fromId: number;
  toId: number;
  message: string;

  from?: IUser;
  to?: IUser;
}
