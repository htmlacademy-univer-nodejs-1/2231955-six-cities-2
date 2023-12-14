import {User} from './user.type.js';

export type Comment = {
  text: string,
  publicationDate: Date,
  rate: number,
  author: User
}
