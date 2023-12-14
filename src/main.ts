import 'reflect-metadata';
import { Container } from 'inversify';
import {Application} from './app/rest/app.js';
import {Component} from './types/component.type.js';

import {createUserContainer} from "./modules/users/container";
import {createApplicationContainer} from "./app/rest/api.container";
import {createOfferContainer} from "./modules/offers/container";


async function bootstrap() {
  const mainContainer = Container.merge(createApplicationContainer(),
    createUserContainer(),
    createOfferContainer());
  const application = mainContainer.get<Application>(Component.Application);
  await application.init();

}

bootstrap();
