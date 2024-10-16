/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
// import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

// class AppUpdater {
//   constructor() {
//     log.transports.file.level = 'info';
//     autoUpdater.logger = log;

//     autoUpdater.setFeedURL(
//       {
//         provider:"generic",
//         url:"https://raw.githubusercontent.com/LuoRiWuSheng/electron-study/72d2f5b90a441602e96c77d31a3f4ea936dd0513/lesson-6/server/download/latest.yml",
//       }
//     )

//   }
// }

let mainWindow: BrowserWindow | null = null;
// const updateInterval = null;
// const updateCheck = false;
// const updateFound = false;
// const updateNotAvailable = false;

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

ipcMain.on('minimize-window', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('close-window', () => {
  if (mainWindow) mainWindow.close();
});

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    transparent: true,
    frame: false,
    show: false,
    width: 1080,
    height: 720,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },

    roundedCorners: true,
  });

  ipcMain.on('open-file-dialog', async (event) => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    if (!result.canceled && result.filePaths.length > 0) {
      event.reply('selected-directory', result.filePaths[0]);
    }
  });
  mainWindow.setResizable(false);
  app.commandLine.appendSwitch('high-dpi-support', 1);
  app.commandLine.appendSwitch('force-device-scale-factor', 1);

  mainWindow.loadURL(resolveHtmlPath('index.html'));
  // if (isDevEnv) {
  // autoUpdater.updateConfigPath = path.join(__dirname, 'dev-app-update.yml');
  // }

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    // updateInterval = setInterval(() => autoUpdater.checkForUpdates(), 600000);

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
      const dialogOpts = {
        type: 'info',
        buttons: ['Ok'],
        title: `Update Not available for ${autoUpdater.channel}`,
        message: 'A message!',
        detail: `Update Not available for ${autoUpdater.channel}`,
      };

      // if (!updateNotAvailable) {
      dialog.showMessageBox(dialogOpts);

      // }
    });

    // autoUpdater
    //   .checkForUpdatesAndNotify()
    //   .then((res) => {
    //     console.debug('res', res);
    //   })
    //   .catch((error) => {
    //     console.debug('error', error);
    //   });
    function isDev() {
      return !app.isPackaged;
    }

    if (isDev()) {
      autoUpdater.checkForUpdates();
    }
  })
  .catch(console.log);

const showMessage = (message: string) => {
  console.log('showMessage trapped');
  console.log(message);
  window.webContents.send('updateMessage', message);
};

ipcMain.handle('select-directory', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  if (result.canceled) {
    return null;
  }
  return result.filePaths[0];
});

//   autoUpdater.on("update-available", (event, releaseNotes, releaseName) => {
//     console.debug("update")
//   const dialogOpts = {
//       type: 'info',
//       buttons: ['Ok'],
//       title: `${autoUpdater.channel} Update Available`,
//       message: process.platform === 'win32' ? releaseNotes : releaseName,
//       detail: `A new ${autoUpdater.channel} version download started.`
//   };

//   if (!updateCheck) {
//       updateInterval = null;
//       dialog.showMessageBox(dialogOpts);
//       updateCheck = true;
//   }
// });

// autoUpdater.on("update-downloaded", (_event) => {
//   if (!updateFound) {
//       updateInterval = null;
//       updateFound = true;

//       setTimeout(() => {
//           autoUpdater.quitAndInstall();
//       }, 3500);
//   }
// });

// autoUpdater.on("update-not-available", (_event) => {
//   const dialogOpts = {
//       type: 'info',
//       buttons: ['Ok'],
//       title: `Update Not available for ${autoUpdater.channel}`,
//       message: "A message!",
//       detail: `Update Not available for ${autoUpdater.channel}`
//   };

//   if (!updateNotAvailable) {
//       updateNotAvailable = true;
//       dialog.showMessageBox(dialogOpts);
//   }
// });
