import { inject, injectable } from 'inversify';
import {Component} from '../../types/component.type.js';
import {ConfigSchema} from '../../common/config/config.schema.js';
import {ConfigInterface} from '../../common/config/config.interface.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';

@injectable()
export class Application {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.ConfigInterface) private readonly config: ConfigInterface<ConfigSchema>,
  ) {}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
