import { baseObservable, EventName } from './base-observable';

type IpcModule = Electron.IpcMain | Electron.IpcRenderer;

export const rxifyIpcModule = (ipcMod: IpcModule) => {
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
