import 'reflect-metadata';
import { Container } from 'inversify';
import {Application} from './app/rest/app.js';
import {Component} from './types/component.type.js';
import {ConfigSchema} from './modules/config/config.schema.js';
import {ConfigInterface} from './modules/config/config.interface.js';
import {LoggerInterface} from './modules/logger/logger.interface.js';
import {PinoLogger} from './modules/logger/logger.js';
import ConfigService from './modules/config/config.js';
import {DatabaseClientInterface} from "./modules/db-client/db-client.interface.js";
import {MongoDatabaseClient} from "./modules/db-client/db-client.js";


async function bootstrap() {
  const container = new Container();
  container.bind<Application>(Component.Application).to(Application);
  container.bind<LoggerInterface>(Component.LoggerInterface).to(PinoLogger);
  container.bind<ConfigInterface<ConfigSchema>>(Component.ConfigInterface).to(ConfigService);
  container.bind<DatabaseClientInterface>(Component.DatabaseClientInterface).to(MongoDatabaseClient).inSingletonScope();

  const application = container.get<Application>(Component.Application);
  await application.init();

}

bootstrap();
