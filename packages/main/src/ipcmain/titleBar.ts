import { ipcMain, BrowserWindow } from 'electron';

export default (): void => {
  // const win = remote.getCurrentWindow();
  // const win = BrowserWindow.getFocusedWindow();
  ipcMain.on('minimizeApp', () => {
    console.log('minimize');
    const win = BrowserWindow.getFocusedWindow();
    win?.minimize();
  });

  ipcMain.on('maximizeApp', () => {
    console.log('maximize');
    const win = BrowserWindow.getFocusedWindow();
    if (win?.isMaximized()) {
      win.restore();
    } else {
      win?.maximize();
    }
  });

  ipcMain.on('closeApp', () => {
    const win = BrowserWindow.getFocusedWindow();
    console.log('close');

    win?.close();
  });
};
