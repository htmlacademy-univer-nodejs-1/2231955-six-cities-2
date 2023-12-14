import {UserType} from "../../types/enums/user-type.enum.js";

export default class UserDto {
  public email!: string;
  public avatar?: string;
  public username!: string;
  public type!: UserType;
  public password!: string;
}
