import {ipcRenderer} from 'electron';
const img: any = document.getElementById('img');
if (img) {
  img.onload = () => {
    console.log('revoking ' + img.src);
    URL.revokeObjectURL(img.src);
  };
}
ipcRenderer.on('img-refresh', (_, res) => {
  if (img) {
    //img.src = d.src;
    //img.src = URL.createObjectURL(res.d.url);
  }
});

ipcRenderer.on('refresh', async (_, res) => {
  //console.log(d);
   const blob = await fetch(res.d.url).then(res => res.blob());
  img.src = URL.createObjectURL(blob);
});