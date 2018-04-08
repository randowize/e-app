import { ipcRenderer } from 'electron';
import { rxifyIpcModule } from './common/streams/rx-ipc';

rxifyIpcModule(ipcRenderer);

import { refreshPreview$ } from './common/streams';

const img: any = document.getElementById('img');

refreshPreview$
  .map(e => e.data.data)
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
