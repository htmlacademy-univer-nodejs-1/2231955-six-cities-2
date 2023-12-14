import {UserType} from './enums/user-type.enum.js';


export type User = {
  username: string;
  email: string;
  avatar?: string;
  type : UserType;
}
