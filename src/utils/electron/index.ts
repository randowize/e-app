import * as electron from 'electron';
import * as path from 'path';
import * as jimp from 'jimp';
const { dialog } = electron.remote;

const options: any = {
  filters: [{ name: 'Pics', extensions: ['jpg', 'png', 'gif', 'bmp'] }],
  defaultPath: path.resolve(__dirname, '../../../src/resources')
};

export const selectImage = () => {
  return new Promise((res, rej) => {
    dialog.showOpenDialog(options, async arr => {
      // tslint:disable-next-line:curly
      if (arr === undefined) return rej(undefined);
      try {
        const imr = await jimp.read(arr[0]);
        const clone = imr.clone();
        const data = clone.bitmap.data;
        const red: any[] = [];
        clone.scan(0, 0, 64, 32, (x, y, idx) => red.push(data[idx + 2]));
        const rslt = {
          width: clone.bitmap.width,
          height: clone.bitmap.height,
          data: [...clone.bitmap.data],
          matrix: red.map( o => ({on: !!o}))
        };
        return res(rslt);
      } catch (e) {
        return rej(e);
      }
    });
  });
};
