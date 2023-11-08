import {User} from './user.type';

export type Comment = {
  text: string,
  publicationDate: Date,
  rate: number,
  author: User
}
