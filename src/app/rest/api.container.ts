import {Container} from "inversify";
import {Application} from "./app.js";
import {Component} from "../../types/component.type.js";
import {LoggerInterface} from "../../common/logger/logger.interface.js";
import {ConfigInterface} from "../../common/config/config.interface.js";
import {DatabaseClientInterface} from "../../common/db-client/db-client.interface.js";
import {ConfigSchema} from "../../common/config/config.schema.js";
import ConfigService from "../../common/config/config.js";
import MongoClientService from "../../common/db-client/db-client.js";
import {PinoLogger} from "../../common/logger/logger.js";


export function createApplicationContainer() {
  const applicationContainer = new Container();
  applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
  applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(PinoLogger).inSingletonScope();
  applicationContainer.bind<ConfigInterface<ConfigSchema>>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
  applicationContainer.bind<DatabaseClientInterface>(Component.DatabaseClientInterface).to(MongoClientService).inSingletonScope();

  return applicationContainer;
}
