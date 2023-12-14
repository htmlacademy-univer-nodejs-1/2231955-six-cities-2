import OfferDto from "./dto";
import {DocumentType} from "@typegoose/typegoose";
import {OfferEntity} from "./entity.js";

export interface OfferServiceInterface {
  create(dto: OfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
