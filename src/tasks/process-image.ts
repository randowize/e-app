import { dbgMessage } from './utils';
import * as Jimp from 'jimp';
import { LedMatrix } from '../utils/led-matrix';
import * as Canvas from 'canvas';

//import { LedDrawerManager } from '../utils/led-matrix/led/store';

const Image = Canvas.Image;

export const processImgBuffer = payload =>
  new Promise((res, rej) => {
    const nb64Img = payload.data.replace('data:image/png;base64,', '');
    const ob64Img = payload.odata.replace('data:image/png;base64,', '');
    const nimg = Jimp.read(Buffer.from(nb64Img, 'base64'));
    const oimg = Jimp.read(Buffer.from(ob64Img, 'base64'));
     //dbgMessage(`new ---> ${nb64Img}`);
    // dbgMessage(`old ---> ${ob64Img}`);
    //const canv =  new Canvas(200, 200)//document.createElement('canvas');
    Promise.all([oimg, nimg])
      .then(async imgs => {
        const [oimg, img] = imgs;
        //canv.width = img.bitmap.width;
        //canv.height = img.bitmap.height;
        const canv =  new Canvas(img.bitmap.width, img.bitmap.height);
        const ctx = canv.getContext('2d');
         const ledM = new LedMatrix(canv, {x: payload.width, y: payload.height});
        //const ui8arr = new Uint8ClampedArray(oimg.clone().greyscale().bitmap.data);
        //const id = new ImageData(ui8arr, oimg.bitmap.width, oimg.bitmap.height);
        //const bi = await createImageBitmap(id);
        const bi = new Image(img.bitmap.width, img.bitmap.height);
        bi.src = oimg.clone().greyscale().bitmap.data;
        if (ctx) {
          ctx.fillStyle = 'green';
          //ctx.fillRect(0, 0, canv.width, canv.height);
          //ctx.drawImage(bi, 0, 0, canv.width, canv.height);
           dbgMessage('img drawn');
        }
        img
          .resize(payload.width, payload.height)
          .quality(90)
          .grayscale();
          //.write(__dirname + '/../resources/nimg.bmp');
        oimg
          .resize(payload.width, payload.height)
          .quality(90);
          //.grayscale();
          //.write(__dirname + '/../resources/oimg.bmp');
        const clone = img.clone();
        const { width, height, data } = clone.bitmap;
        const {data: odata} = oimg.clone().bitmap;
        const pixels: any[] = [];
        const opixels: any[] = [];
        clone.scan(0, 0, width, height, (x, y, idx) => {
          pixels.push({
            r: data[idx],
            g: data[idx + 1],
            b: data[idx + 2],
            a: data[idx + 3]
          });
          opixels.push({
            r: odata[idx],
            g: odata[idx + 1],
            b: odata[idx + 2],
            a: odata[idx + 3]
          });
        }
        );
        const black = {r: 0, g: 0, b: 0, a: 1};
        const matrix =  pixels.map(mapPixel).map(on => ({ on, color: on ? payload.color : black }));
        // const omatrix =  opixels.map(mapPixel).map(on => ({ on, color: on ? payload.color : black }));
        const changed = matrix.map( (o, i) => {
          if (o.on !== payload.omatrix[i].on) {
          return {
            ...o,
            idx: i,
            diff: [o.on, payload.omatrix[i].on]
          };
        }
          return null;
        }).filter(o => o !== null);
        ledM.setData(matrix.slice());
        ledM.render();
        dbgMessage('ledM.render() ok');
        let test = ledM.toDataURL();
        dbgMessage('ledM.toDataURL() ok');
        //const blob = await fetch(test).then(res => res.blob());
        //const url = URL.createObjectURL(blob);
        const url = test;
        const result = {
          width,
          height,
          pixels,
          matrix,
          diff: Jimp.diff(img, oimg),
          data: [...clone.bitmap.data],
          url,
          changed
        };

        res(result);
      })
      .catch(rej);
  });

function mapPixel(pixel) {
  if (pixel.r > 20 || pixel.g > 20 || pixel.b > 20) return true;
  //if (pixel.b > 250) return true;
  return false;
}
