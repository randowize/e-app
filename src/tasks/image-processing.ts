import * as Jimp from 'jimp';

export const processImgBuffer = payload =>
  new Promise((res, rej) => {
    console.log('which process');
    const nb64Img = payload.data.replace('data:image/png;base64,', '');
    const ob64Img = payload.odata.replace('data:image/png;base64,', '');
    const nimg = Jimp.read(Buffer.from(nb64Img, 'base64'));
    const oimg = Jimp.read(Buffer.from(ob64Img, 'base64'));
    Promise.all([oimg, nimg])
      .then(imgs => {
        const [oimg, img] = imgs;
        img
          .resize(payload.width, payload.height)
          .quality(90)
          .grayscale()
          .write(__dirname + '/../resources/save.bmp');
        const clone = img.clone();
        const { width, height, data } = clone.bitmap;
        const pixels: any[] = [];
        clone.scan(0, 0, width, height, (x, y, idx) =>
          pixels.push({
            r: data[idx],
            g: data[idx + 1],
            b: data[idx + 2],
            a: data[idx + 3]
          })
        );
        res({
          width,
          height,
          pixels,
          matrix: pixels.map(mapPixel).map(on => ({ on })),
          data: [...clone.bitmap.data]
        });
      })
      .catch(rej);
  });

function mapPixel(pixel) {
  if (pixel.r > 20 || pixel.g > 20 || pixel.b > 20) return true;
  //if (pixel.b > 250) return true;
  return false;
}
