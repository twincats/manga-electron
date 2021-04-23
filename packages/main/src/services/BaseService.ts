import { app } from 'electron';
import { platform } from 'os';
import { Service } from './Service';
import { readdir } from 'fs';
import { promisify } from 'util';

const readdirs = promisify(readdir);

interface BasicInformation {
  platform: NodeJS.Platform;
  version: string;
  root: string;
}

export class BaseService extends Service {
  async getBasicInformation(): Promise<BasicInformation> {
    this.log('getBasicInformation is called!');
    const result = {
      platform: platform(),
      version: app.getVersion(),
      root: app.getPath('userData'),
    };
    return result;
  }

  async getManga(): Promise<string[]> {
    const directoryPath = 'D:\\DATA\\Manga';
    // const outData =
    const result = await readdirs(directoryPath);
    return result;
  }
}
