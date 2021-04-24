import { app, BrowserWindow, nativeTheme } from 'electron';
import { join } from 'path';
import { URL } from 'url';
import mainProcess from './ipcmain';
import imgProtocol from './protocol';

const isSingleInstance = app.requestSingleInstanceLock();

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

/**
 * Workaround for TypeScript bug
 * @see https://github.com/microsoft/TypeScript/issues/41468#issuecomment-727543400
 */
const env = import.meta.env;

// Install "Vue.js devtools"
if (env.MODE === 'development') {
  app
    .whenReady()
    .then(() => imgProtocol()) // load local protocol
    .then(() => import('electron-devtools-installer'))
    .then(({ default: installExtension, VUEJS3_DEVTOOLS }) =>
      installExtension(VUEJS3_DEVTOOLS, {
        loadExtensionOptions: {
          allowFileAccess: true,
        },
      })
    )
    .catch((e) => console.error('Failed install extension:', e));
}

// load ipcmain before load window
mainProcess();
//change native theme
nativeTheme.themeSource = 'dark';

let mainWindow: BrowserWindow | null = null;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    show: true,
    frame: true,
    backgroundColor: '#262626',
    width: 1280,
    height: 720,
    minWidth: 960,
    minHeight: 540,
    webPreferences: {
      preload: join(__dirname, '../../preload/dist/index.cjs'),
      contextIsolation: env.MODE !== 'test', // Spectron tests can't work with contextIsolation: true
      enableRemoteModule: env.MODE === 'test', // Spectron tests can't work with enableRemoteModule: false
    },
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl =
    env.MODE === 'development'
      ? <string>env.VITE_DEV_SERVER_URL
      : new URL(
          '../renderer/dist/index.html',
          'file://' + __dirname
        ).toString();

  if (env.MODE === 'development') {
    mainWindow.webContents.once('dom-ready', () =>
      mainWindow?.webContents.openDevTools()
    );
  }

  await mainWindow.loadURL(pageUrl);
};

app.on('second-instance', () => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(createWindow)
  .catch((e) => console.error('Failed create window:', e));

// Auto-updates
if (env.PROD) {
  app
    .whenReady()
    .then(() => import('electron-updater'))
    .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
    .catch((e) => console.error('Failed check updates:', e));
}
