import * as path from 'path';
import * as Jimp from 'jimp';

export function bmpAs2DArray(bmp: Jimp) {
  const tmp = bmp.clone();
  const res: any[] = [];
  tmp.scan(0, 0, tmp.bitmap.width, tmp.bitmap.height, (x, y) => {
    if (res[x] === undefined) {
      res[x] = [];
    }
    res[x][y] = tmp.getPixelColor(x, y);
  });
  return res;
}

let satir_1 = [12, 8, 4, 0, 13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3];

export async function getMatrixTest() {
  let dizi1: any[] = [];
  let dizi2: any[] = [];
  let dizi3: any[] = [];
  let dizi4: any[] = [];
  const img = await Jimp.read(
    path.resolve(__dirname, '../../resources/P10-2.bmp')
  );
  // const bmp = bmpAs2DArray(img);
  function applyToArray(carr: any[], dx = 0, dy = 0) {
    let pixel_x: number, pixel_y: number, pixel: number;
    let X: number, Y: number, sutun: number;
    let line: string;
    X = 4;
    Y = 16;
    let color;
    let pixelColor;
    let satir: number = 0,
      blok: number = 0;
    for (pixel_y = 0; pixel_y < Y; pixel_y++) {
      line = '';
      for (sutun = 0; sutun < X; sutun++) {
        pixel = 0;
        for (pixel_x = 0; pixel_x < 8; pixel_x++) {
          color = img.getPixelColor(pixel_x + dx + sutun * 8, dy + pixel_y);
          // console.log(pixel_x + sutun * 8, pixel_y);
          // color = bmp[pixel_x + sutun * 8][pixel_y];
          //console.log(`(${pixel_x + sutun * 8}, ${pixel_y}, ${color})`);
          pixelColor = Jimp.intToRGBA(color);
          //console.log(pixelColor);
          if (pixelColor.b === 255) {
            pixel = pixel + 0;
          } else {
            pixel = pixel + Math.pow(2, pixel_x);
          }
          // tslint:disable-next-line:curly
          if (carr[satir] === undefined) carr[satir] = [];
          carr[satir][satir_1[blok * 4 + sutun]] = pixel;
        }
        line += pixel + ',';
      }
      if (satir < 3) {
        satir++;
      } else {
        satir = 0;
        blok += 1;
      }
      // console.log(line);
    }
  }
  function buildLines(arr1: any[], arr2: any[]) {
    return arr1.map((a, i) => [...a, ...arr2[i]].join(','));
  }
  const prefix = 'volatile unsigned char Panel_';
  applyToArray(dizi1, 0, 0);
  applyToArray(dizi2, 32, 0);
  applyToArray(dizi3, 0, 16);
  applyToArray(dizi4, 32, 16);
  const mat = [buildLines(dizi2, dizi1), buildLines(dizi4, dizi3)];
  return mat.map((varr, idx) => {
    return varr.map((v, idx1) => {
      return `${prefix}${mat.length - idx}${varr.length - idx1}={${v}}`;
    });
  });
}
