import {DocumentType} from "@typegoose/typegoose";
import UserDto from "./dto.js";
import {UserEntity} from "./entity.js";

export interface UserServiceInterface {
  create(dto: UserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findById(userId: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: UserDto, salt: string): Promise<DocumentType<UserEntity>>;
}
