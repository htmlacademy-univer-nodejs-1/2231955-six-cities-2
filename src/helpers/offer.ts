import {Offer} from '../cli/types/offer.type';
import {City} from '../cli/types/enums/cities.enum';
import {HousingType} from '../cli/types/enums/housing-type.enum';
import {Facility} from '../cli/types/enums/facility.enum';
import {UserType} from '../cli/types/enums/user-type.enum';

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
    offerAuthorPassword,
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
      email: offerAuthorEmail,
      password: offerAuthorPassword
    },
    commentsCount: parseInt(commentsCount, 10),
    coordinate: {latitude: parseFloat(latitude), longitude: parseFloat(longitude)}
  };
}
