import {inject, injectable} from 'inversify';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {UserServiceInterface} from "./service.interface.js";
import {Component} from "../../types/component.type.js";
import UserDto from "./dto.js";
import {UserEntity} from "./entity.js";

@injectable()
export default class UserService implements UserServiceInterface {

  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {
  }

  public async create(dto: UserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(dto);
    this.logger.info(`Новый пользователь создан: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findById(userId: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({userId});
  }

  public async findOrCreate(dto: UserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }
}
