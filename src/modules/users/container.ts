import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';
import {UserServiceInterface} from "./service.interface.js";
import {Component} from "../../types/component.type.js";
import {UserEntity, UserModel} from "./entity.js";
import UserService from "./service.js";

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);

  return userContainer;
}
