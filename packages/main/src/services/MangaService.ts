import type { BaseService } from './BaseService';
import { Inject, Service } from './Service';
import { basename } from 'path';
import { readdir } from 'fs';
import { promisify } from 'util';

const readdirs = promisify(readdir);

export class MangaService extends Service {
  @Inject('BaseService')
  private baseService!: BaseService;

  async getFolderList(path: string): Promise<string[]> {
    if (path === basename(path)) {
      return Promise.reject('Not Valid path string');
    } else {
      const result = await readdirs(path);
      return result;
    }
  }
}
