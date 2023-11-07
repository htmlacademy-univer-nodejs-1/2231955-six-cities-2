import {City} from './enums/cities.enum';
import {HousingType} from './enums/housing-type.enum';
import {Facility} from './enums/facility.enum';
import {User} from './user.type';
import {Coordinate} from './coordinate.type';

export type Offer = {
  title: string,
  description: string,
  publicationDate: Date,
  city: City,
  previewImage: string,
  housingPhotos: string[]
  isPremium: boolean,
  isFavorite: boolean,
  rate: number,
  housingType: HousingType,
  rooms: number,
  guests: number,
  price: number,
  facilities: Facility[],
  offerAuthor: User,
  commentsCount: number,
  coordinate: Coordinate
}
