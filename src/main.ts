import 'reflect-metadata';
import { Container } from 'inversify';
import {Application} from './rest/app/app.js';
import {Component} from './types/component.type.js';
import {ConfigSchema} from './common/config/config.schema.js';
import {ConfigInterface} from './common/config/config.interface.js';
import {LoggerInterface} from './common/logger/logger.interface.js';
import {PinoLogger} from './common/logger/logger.js';
import ConfigService from './common/config/config.js';


async function bootstrap() {
  const container = new Container();
  container.bind<Application>(Component.Application).to(Application);
  container.bind<LoggerInterface>(Component.LoggerInterface).to(PinoLogger);
  container.bind<ConfigInterface<ConfigSchema>>(Component.ConfigInterface).to(ConfigService);
  const application = container.get<Application>(Component.Application);
  await application.init();

}

bootstrap();
