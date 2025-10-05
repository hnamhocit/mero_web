import { IDocument } from "./document";
import { IUser } from "./user";

export interface IFriend extends IDocument {
  userAId: number;
  userBId: number;

  userA?: IUser;
  userB?: IUser;
}
