import { Command } from './command.interface.js';
import {createOffer} from '../../common/offers/offer.js';
import {TSVFileReader} from '../modules/file-reader/file-reader.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  private static onImportedLine(line: string) {
    const offer = createOffer(line);
    console.info(offer);
  }

  private static onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', ImportCommand.onImportedLine);
    fileReader.on('end', ImportCommand.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(error);
    }
  }
}
