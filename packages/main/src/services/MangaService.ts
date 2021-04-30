import type { BaseService } from './BaseService';
import { Inject, Service } from './Service';
import { basename } from 'path';
import { readdir, access } from 'fs';
import { promisify } from 'util';

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});

export class MangaService extends Service {
  @Inject('BaseService')
  private baseService!: BaseService;

  async getFolderList(path: string): Promise<string[]> {
    const readdirs = promisify(readdir);
    if (path === basename(path)) {
      return Promise.reject('Not Valid path string');
    } else {
      const result = await readdirs(path);
      result.sort(collator.compare);
      return result;
    }
  }

  async folderExist(path: string): Promise<boolean> {
    const exist = promisify(access);

    try {
      await exist(path);
      return true;
    } catch (error) {
      return false;
    }
  }
}
