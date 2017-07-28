require('dotenv').config();

import { app, BrowserWindow } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS
} from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import * as cp from 'child_process';
import * as path from 'path';
import { baseObservable, EventName } from '../shared/streams/base-observable';
import {ipcMessageSenderFactory } from '../shared/streams/rx-ipc';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null = null;
let previewWindow: Electron.BrowserWindow | null = null;
let modelWindow: Electron.BrowserWindow | null = null;
let sendPreviewIpcMsg: (evtName: EventName, ...data) => void;
let sendMatrixIpcMsg: (evtName: EventName, ...data) => void;
const isDevMode = process.execPath.match(/[\\/]electron/);
//const fop : cp.ForkOptions;
const pname = path.resolve(__dirname, '..', 'services', 'worker.js');
let img_proc_worker: cp.ChildProcess;

const setupIpcCom = () => {
  // configureIpcMessage(ipcMain);
  if (previewWindow && mainWindow) {

  sendPreviewIpcMsg = ipcMessageSenderFactory(previewWindow.webContents);
  sendMatrixIpcMsg = ipcMessageSenderFactory(mainWindow.webContents);
  const refreshStream = baseObservable.filter(m => m.type === 'refresh');
  const processImageStream = baseObservable.filter(m => m.type === 'process-img');
  const togglePreviewStream = baseObservable.filter(m => m.type === 'toggle-preview');
  const debugStream = baseObservable.filter(m => m.type === 'debug');

  debugStream.subscribe((d) => console.log(d));

  refreshStream.subscribe(e => {
    if (previewWindow) {
      sendPreviewIpcMsg(e.type, ...e.data);
    }
    /*if (mainWindow) {
      sendMatrixIpcMsg(e.type, ...e.data);
    }*/
  });

  processImageStream.subscribe(e => {
    if (img_proc_worker.connected) {
      img_proc_worker.send({ type: 'process-img', payload: e.data[0] });
    }
  });

  togglePreviewStream.subscribe(e => {
    if (previewWindow) {
      if (previewWindow.isVisible()) return previewWindow.hide();
      return previewWindow.show();
    }
  });

  }
};

const setupWorker = () => {
  img_proc_worker = cp.fork(pname, undefined, {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
    env: {
      ELECTRON_RUN_AS_NODE: 1
    },
    cwd: path.resolve(__dirname, 'background')
  });
  img_proc_worker.on('message', e => console.log(e.type));
  img_proc_worker.on('close', console.log);
  img_proc_worker.on('disconnect', console.log);
  img_proc_worker.on('error', console.log);
};

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      experimentalFeatures: true
    },
    backgroundColor: '#2e2c2d',
  });
  //mainWindow.setMenu(null);

  previewWindow = new BrowserWindow({
    width: 320,
    height: 240,
    webPreferences: {
      experimentalFeatures: true
    },
    frame: false,
    title: 'Preview',
    movable: true,
    show: false,
    alwaysOnTop: true
  });

  modelWindow = new BrowserWindow({
    width: 320,
    height: 240,
    webPreferences: {
      experimentalFeatures: true
    },
    frame: true,
    title: 'Model',
    movable: true,
    show: true
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/../screens/index.html`);
  previewWindow.loadURL(`file://${__dirname}/../screens/preview.html`);
  modelWindow.loadURL(`file://${__dirname}/../screens/prototyping.html`);

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
    if (previewWindow) previewWindow.close();
    if (modelWindow) modelWindow.close();
    modelWindow = null;
    previewWindow = null;
  });

  mainWindow.once('ready-to-show', () => {
    if (mainWindow) mainWindow.show();
  });
  setupIpcCom();
  setupWorker();
};

const init = () => {
  if (isDevMode) enableLiveReload({ strategy: 'react-hmr' });

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
};

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

export function lauch() {
  init();
}
