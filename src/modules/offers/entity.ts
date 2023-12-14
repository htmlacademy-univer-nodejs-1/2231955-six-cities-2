import typegoose, {defaultClasses, getModelForClass, Ref, Severity} from '@typegoose/typegoose';
import {City} from "../../types/enums/cities.enum.js";
import {Facility} from "../../types/enums/facility.enum.js";
import {HousingType} from "../../types/enums/housing-type.enum.js";
import {Coordinate} from "../../types/coordinate.type.js";
import {UserEntity} from "../users/entity.js";


const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {

  @prop({
    required: true,
    type: () => String,
    enum: City
  })
  public city!: City;

  @prop({default: 0})
  public commentsCount!: number;

  @prop()
  public price!: number;

  @prop({
    required: true,
    minlength: [20, 'Min length for description is 20'],
    maxlength: [1024, 'Max length for description is 1024']
  })
  public description!: string;

  @prop({
    required: true,
    type: () => String,
    enum: Facility
  })
  public facilities!: Facility[];

  @prop({required: true, default: false})
  public isFavorite!: boolean;

  @prop({
    required: true, min: [1, 'Min length for username is 1'],
    max: [10, 'Max length for username is 10']
  })
  public guests!: number;

  @prop({
    required: true,
    type: () => String,
    enum: HousingType
  })
  public housingType!: HousingType;

  @prop({type: String, allowMixed: Severity.ALLOW})
  public housingPhotos!: string[];

  @prop({
    required: true,
  })
  public title!: string;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({required: true, default: false})
  public isPremium!: boolean;

  @prop({required: true,})
  public previewImage!: string;

  @prop({required: true})
  public publicationDate!: Date;

  @prop({
    required: true, min: [1, 'Min length for rating is 1'],
    max: [5, 'Max length for rating is 5']
  })
  public rate!: number;

  @prop({
    required: true, min: [1, 'Min length for room count is 1'],
    max: [8, 'Max length for room count is 8']
  })
  public rooms!: number;

  @prop({
    required: true,
    allowMixed: Severity.ALLOW
  })
  public coordinate!: Coordinate;
}

export const OfferModel = getModelForClass(OfferEntity);
