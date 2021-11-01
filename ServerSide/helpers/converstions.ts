import { UserManagement } from "../models/user-management-interface"

export class Convert
{
  public static castObject(obj: object): UserManagement
  {
    return obj as UserManagement;
  }
}