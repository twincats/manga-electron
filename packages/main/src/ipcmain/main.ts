import { ipcMain, shell } from 'electron';

import { readdir } from 'fs';
import { promisify } from 'util';
const read_dir = promisify(readdir);

export default (): void => {
  ipcMain.handle('getManga', async () => {
    const directoryPath = 'D:\\DATA\\Manga';
    const outData = await read_dir(directoryPath);
    return outData;
  });

  ipcMain.on('openFolder', (event, filePath: string) => {
    // console.log(filePath); // prints "ping"
    // event.reply('asynchronous-reply', 'pong')
    shell.openPath(filePath);
  });

  ipcMain.handle('msg', async (event, msg: string) => {
    return msg + ' Telah berhasil Terhubung ke main electron';
  });
};
