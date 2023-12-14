import {City} from './enums/cities.enum.js';
import {HousingType} from './enums/housing-type.enum.js';
import {Facility} from './enums/facility.enum.js';
import {User} from './user.type.js';
import {Coordinate} from './coordinate.type.js';

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
