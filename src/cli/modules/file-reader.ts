import {readFileSync} from 'node:fs';
import {FileReader} from './file-reader.interface';
import {Offer} from '../types/offer.type';
import {UserType} from '../types/enums/user-type.enum';
import {Facility} from '../types/enums/facility.enum';
import {HousingType} from '../types/enums/housing-type.enum';
import {City} from '../types/enums/cities.enum';


export default class TSVFileReader implements FileReader {
  private data = ' ';

  constructor(public filename: string) {
  }

  public read(): void {
    this.data = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public parseData(): Offer[] {
    const offers = this.data?.split('\n').filter((row) => row.trim() !== '');
    const offersRows = offers?.map((row) => row.split('\t'));
    console.log(offersRows);
    return offersRows.map(([name,
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
      longitude,]) => ({
      title: name,
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
    }));
  }
}
