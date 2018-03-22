import { baseObservable, EventName } from './base-observable';
import * as electron from 'electron';

type IpcModule = Electron.IpcMain | Electron.IpcRenderer;
export const ipcMod: IpcModule = process.type === 'browser' ? electron.ipcMain : electron.ipcRenderer;
 ipcMod.on('message', (event, type, ...data) => {
   baseObservable.next({ event, type, data });
 });

export const addRxStreamCapabilityToIpcModule = (ipcMod: IpcModule) => {
 ipcMod.on('message', (event, type, ...data) => {
   baseObservable.next({ event, type, data });
 });
};

export const ipcMessageSenderFactory = (
  sender: Electron.IpcRenderer | Electron.WebContents
) => {
  return (type: EventName, ...data) => {
    sender.send('message', type, ...data);
  };
};
