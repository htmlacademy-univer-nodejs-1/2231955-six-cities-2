import {Container} from "inversify";
import {OfferServiceInterface} from "./service.interface";
import {Component} from "../../types/component.type";
import OfferService from "./service";
import {OfferEntity, OfferModel} from "./entity";
import {types} from "@typegoose/typegoose";

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferServiceInterface>(Component.OfferServiceInterface).to(OfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
}
