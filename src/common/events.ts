export interface IPCEvent  {
  type: string;
  [key: string]: any;

}

type IpcModule = Electron.IpcMain | Electron.IpcRenderer;

export const monkeyPatchIpcModule = (mod: IpcModule) => {

   return Object.assign(mod, {
     addEventListener(eventName: string, handler: Function) {
       mod.on(eventName, (...args) => {
         handler(...args);
         //dispatchTyp('')
       });
     },
     removeEventListener(channel: string, handler: Function) {
       mod.removeListener(channel, handler);
     }
   }) as IpcModule;
};