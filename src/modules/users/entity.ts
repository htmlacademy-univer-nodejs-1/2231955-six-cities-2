import typegoose, {defaultClasses, getModelForClass} from "@typegoose/typegoose";
import {User} from "../../types/user.type.js";
import {createSHA256} from "../../common/db.js";
import {UserType} from "../../types/enums/user-type.enum.js";

const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({unique: true, required: true})
  public email: string;

  @prop({required: false, default: ''})
  public avatar?: string;

  @prop({
    required: true,
  })
  public username: string;

  @prop({
    required: true,
    type: () => String,
    enum: UserType
  })
  public type: UserType;

  @prop({
    required: true,
  })
  public password!: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatar = userData.avatar;
    this.username = userData.username;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
