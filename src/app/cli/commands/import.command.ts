import {Command} from "./command.interface.js";
import {UserServiceInterface} from "../../../modules/users/service.interface.js";
import {OfferServiceInterface} from "../../../modules/offers/service.interface.js";
import {DatabaseClientInterface} from "../../../common/db-client/db-client.interface.js";
import {LoggerInterface} from "../../../common/logger/logger.interface.js";
import {PinoLogger} from "../../../common/logger/logger.js";
import OfferService from "../../../modules/offers/service.js";
import {OfferModel} from "../../../modules/offers/entity.js";
import UserService from "../../../modules/users/service.js";
import {UserModel} from "../../../modules/users/entity.js";
import MongoClientService from "../../../common/db-client/db-client.js";
import {Offer} from "../../../types/offer.type.js";
import {createOffer} from "../../../common/offer.js";
import {getMongoURI} from "../../../common/db.js";
import {TSVFileReader} from "../../../common/file-reader/file-reader.js";


export class ImportCommand implements Command {
  private userService!: UserServiceInterface;
  private offerService!: OfferServiceInterface;
  private databaseService!: DatabaseClientInterface;
  private readonly logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new PinoLogger();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new MongoClientService(this.logger);
  }
  public getName(): string {
    return '--import';
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.offerAuthor,
      password: "asdasd"
    }, this.salt);

    await this.offerService.create({
      ...offer,
      userId: user.id,
    });
  }

  private async onImportedLine(line: string,  resolve: VoidFunction) {const offer = createOffer(line);
    await this.saveOffer(offer)
    console.info(offer);
    resolve()
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename, login,passDb, hostDb,port, nameDb, salt ] = parameters;
    const connString = getMongoURI(login, passDb, hostDb, port, nameDb)
    this.salt = salt;
    await this.databaseService.connect(connString);
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('row', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(error);
    }
  }
}
