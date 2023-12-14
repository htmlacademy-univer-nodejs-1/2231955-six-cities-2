import {Offer} from '../types/offer.type.js';
import {City} from '../types/enums/cities.enum.js';
import {HousingType} from '../types/enums/housing-type.enum.js';
import {Facility} from '../types/enums/facility.enum.js';
import {UserType} from '../types/enums/user-type.enum.js';

export function createOffer(rawOffer: string): Offer {
  const offer = rawOffer.replace('\n', '').split('\t');
  const [title,
    description,
    publicationDate,
    city,
    previewImage,
    images,
    premium,
    favorite,
    rating,
    housingType,
    roomCount,
    guestCount,
    price,
    facilities,
    offerAuthorName,
    offerAuthorAvatar,
    offerAuthorType,
    offerAuthorEmail,
    commentsCount,
    latitude,
    longitude,] = offer;
  return {
    title: title,
    description: description,
    publicationDate: new Date(publicationDate),
    city: city as unknown as City,
    previewImage: previewImage,
    housingPhotos: images.split(','),
    isPremium: premium as unknown as boolean,
    isFavorite: favorite as unknown as boolean,
    rate: parseFloat(rating),
    housingType: housingType as unknown as HousingType,
    rooms: parseInt(roomCount, 10),
    guests: parseInt(guestCount, 10),
    price: parseInt(price, 10),
    facilities: facilities.split(',').map((x) => x as unknown as Facility),
    offerAuthor: {
      username: offerAuthorName,
      avatar: offerAuthorAvatar,
      type: offerAuthorType as unknown as UserType,
      email: offerAuthorEmail
    },
    commentsCount: parseInt(commentsCount, 10),
    coordinate: {latitude: parseFloat(latitude), longitude: parseFloat(longitude)}
  };
}
