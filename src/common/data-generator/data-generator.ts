import dayjs from 'dayjs';
import {MockServerData} from '../../types/mock-server-data.type.js';
import {OfferGenerator} from './data-generator.interface.js';
import {City} from '../../types/enums/cities.enum.js';
import {HousingType} from '../../types/enums/housing-type.enum.js';
import {Facility} from '../../types/enums/facility.enum.js';
import {UserType} from '../../types/enums/user-type.enum.js';
import {
  FIRST_WEEK_DAY, LAST_WEEK_DAY, MIN_RATING,
  MAX_RATING, MAX_COUNT_ROOM, MIN_COUNT_ROOM,
  MIN_COUNT, MAX_COUNT, MIN_COST, MAX_COST
} from './const.js';
import {generateRandomValue, getRandomItem, getRandomItems} from "../utils.js";
export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.names);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const publicationDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem([City.Amsterdam, City.Cologne, City.Brussels, City.Paris, City.Hamburg, City.Dusseldorf]);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.images);
    const isPremium = getRandomItem<string>(['true', 'false']);
    const isFavorite = getRandomItem<string>(['true', 'false']);
    const rate = generateRandomValue(MIN_RATING, MAX_RATING, 1);
    const housingType = getRandomItem([HousingType.house, HousingType.hotel, HousingType.room, HousingType.apartment]);
    const roomCount = generateRandomValue(MIN_COUNT_ROOM, MAX_COUNT_ROOM);
    const guestCount = generateRandomValue(MIN_COUNT, MAX_COUNT);
    const price = generateRandomValue(MIN_COST, MAX_COST);
    const facilities = getRandomItems([Facility.AirConditioning, Facility.BabySeat, Facility.Fridge]);
    const offerAuthorName = getRandomItem<string>(this.mockData.users.usernames);
    const offerAuthorAvatar = getRandomItem<string>(this.mockData.users.avatars);
    const offerAuthorType = getRandomItem([UserType.pro, UserType.simple]);
    const offerAuthorEmail = getRandomItem<string>(this.mockData.users.emails);
    const offerAuthorPassword = getRandomItem<string>(this.mockData.users.passwords);
    const commentsCount = generateRandomValue(MIN_COUNT, MAX_COUNT);
    const latitude = getRandomItem<number>(this.mockData.coordinates.latitude);
    const longitude = getRandomItem<number>(this.mockData.coordinates.longitude);

    return [
      title, description, publicationDate,
      city, previewImage, images, isPremium,
      isFavorite, rate, housingType, roomCount,
      guestCount, price, facilities, offerAuthorName,
      offerAuthorAvatar, offerAuthorType, offerAuthorEmail,
      offerAuthorPassword, commentsCount, latitude, longitude
    ].join('\t');
  }
}
