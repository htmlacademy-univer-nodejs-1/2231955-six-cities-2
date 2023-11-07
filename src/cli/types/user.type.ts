import {UserType} from './enums/user-type.enum';


export type User = {
  username: string;
  email: string;
  avatar?: string;
  password: string;
  type : UserType;
}
