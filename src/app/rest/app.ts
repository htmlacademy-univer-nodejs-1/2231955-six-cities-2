import { inject, injectable } from 'inversify';
import {Component} from '../../types/component.type.js';
import {ConfigSchema} from '../../common/config/config.schema.js';
import {ConfigInterface} from '../../common/config/config.interface.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {getMongoURI} from '../../common/db.js';
import {DatabaseClientInterface} from '../../common/db-client/db-client.interface.js';

@injectable()
export class Application {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.ConfigInterface) private readonly config: ConfigInterface<ConfigSchema>,
    @inject(Component.DatabaseClientInterface) private readonly databaseClient: DatabaseClientInterface
  ) {}

  public async init() {
    this.logger.info('Application initialization');
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );
    console.info(mongoUri)

    await this.databaseClient.connect(mongoUri);
    this.logger.info('База данных инициализирована');


  }
}
