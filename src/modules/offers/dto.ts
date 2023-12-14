import {HousingType} from "../../types/enums/housing-type.enum.js";
import {City} from "../../types/enums/cities.enum.js";
import {Facility} from "../../types/enums/facility.enum.js";
import {Coordinate} from "../../types/coordinate.type.js";

export default class OfferDto {
  public title!: string;
  public description!: string;
  public publicationDate!: Date;
  public city!: City;
  public previewImage!: string;
  public housingPhotos!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rate!: number;
  public housingType!: HousingType;
  public rooms!: number;
  public guests!: number;
  public price!: number;
  public facilities!: Facility[];
  public userId!: string;
  public commentsCount!: number;
  public coordinate!: Coordinate;
}
