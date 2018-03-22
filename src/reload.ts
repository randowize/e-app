import { ipcRenderer } from 'electron';

import { baseObservable } from './shared/streams/base-observable';
import { addRxStreamCapabilityToIpcModule } from './shared/streams/rx-ipc';

addRxStreamCapabilityToIpcModule(ipcRenderer);

const img: any = document.getElementById('img');

baseObservable
  .filter(e => e.type === 'refresh')
  .do(console.log)
  .map(e => e.data[0].src)
  .switchMap(src => fetch(src).then(res => res.blob()))
  .subscribe(blob => {
    img.src = URL.createObjectURL(blob);
  });

if (img) {
  img.onload = () => {
    URL.revokeObjectURL(img.src);
  };
}

//ipcRenderer.on('message', () => {/**/});