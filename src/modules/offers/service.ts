import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';

import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {OfferServiceInterface} from "./service.interface.js";
import {Component} from "../../types/component.type.js";
import OfferDto from "./dto.js";
import {OfferEntity} from "./entity.js";

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {
  }

  public async create(dto: OfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`Новое предложение об аренде создано: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }
}
