require('dotenv').config();
import  { app, BrowserWindow, ipcMain } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import * as cp from 'child_process';
import * as path from 'path';
import * as Rx from 'rxjs';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null = null;
let previewWindow: Electron.BrowserWindow | null = null;

//const fop : cp.ForkOptions;
const pname = path.resolve(__dirname, 'background', 'worker.js');
const child = cp.fork(pname, undefined, {
  stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
  env: {
    ELECTRON_RUN_AS_NODE: 1
  },
  cwd: path.resolve(__dirname, 'background')
});

const msgevt: any = 'message';
const childResponseStream = Rx.Observable.fromEventPattern(
  l => child.addListener(msgevt, l),
  l => child.removeListener(msgevt, l)
);
const debugMessagesStream = childResponseStream.filter((m: any) => m.type === 'debug');
const refreshPreviewStream = childResponseStream.filter((m: any) => m.type === 'refresh');

debugMessagesStream.subscribe(console.log);
refreshPreviewStream.subscribe( m => {
  if (previewWindow) {
    previewWindow.webContents.send('refresh', m);
  };
});

child.on('close', console.log);
child.on('disconnect', console.log);
child.on('error', console.log);

ipcMain.on('refresh', (e, d) => {
  if (previewWindow) {
    previewWindow.webContents.send(d.type, d);
  };
});

ipcMain.on('process-img', (e, payload) => {
  if (child.connected) {
    child.send({type: 'process-img', payload});
  };
});

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) enableLiveReload({ strategy: 'react-hmr' });

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      experimentalFeatures: true
    }
  });

  previewWindow = new BrowserWindow({
    width: 320 ,
    height: 240,
    webPreferences: {
      experimentalFeatures: true
    },
    frame: false,
    title: 'Preview',
    movable: true,
    alwaysOnTop: true
  });

  ipcMain.on('data', (evt, data) => {
    evt.sender.send('ok', `data ${data} received`);
    console.log(data);
  });
  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  previewWindow.loadURL(`file://${__dirname}/preview.html`);

  // Open the DevTools.
  if (isDevMode) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    try {
      await installExtension(REACT_DEVELOPER_TOOLS);
    } catch (e) {
      console.log(e);
    }
    //mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
