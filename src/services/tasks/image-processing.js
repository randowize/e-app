"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Jimp = require("jimp");
const led_matrix_1 = require("../utils/led-matrix");
exports.processImgBuffer = payload => new Promise((res, rej) => {
    const nb64Img = payload.data.replace('data:image/png;base64,', '');
    const ob64Img = payload.odata.replace('data:image/png;base64,', '');
    const nimg = Jimp.read(Buffer.from(nb64Img, 'base64'));
    const oimg = Jimp.read(Buffer.from(ob64Img, 'base64'));
    const canv = document.createElement('canvas');
    Promise.all([oimg, nimg])
        .then((imgs) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const [oimg, img] = imgs;
        canv.width = img.bitmap.width;
        canv.height = img.bitmap.height;
        const ctx = canv.getContext('2d');
        const ledM = new led_matrix_1.LedMatrix(canv, { x: payload.width, y: payload.height });
        const ui8arr = new Uint8ClampedArray(oimg.clone().greyscale().bitmap.data);
        const id = new ImageData(ui8arr, oimg.bitmap.width, oimg.bitmap.height);
        const bi = yield createImageBitmap(id);
        if (ctx) {
            ctx.fillStyle = 'green';
            ctx.drawImage(bi, 0, 0, canv.width, canv.height);
        }
        img
            .resize(payload.width, payload.height)
            .quality(90)
            .grayscale();
        oimg
            .resize(payload.width, payload.height)
            .quality(90);
        const clone = img.clone();
        const { width, height, data } = clone.bitmap;
        const { data: odata } = oimg.clone().bitmap;
        const pixels = [];
        const opixels = [];
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
        });
        const black = { r: 0, g: 0, b: 0, a: 1 };
        const matrix = pixels.map(mapPixel).map(on => ({ on, color: on ? payload.color : black }));
        const changed = matrix.map((o, i) => {
            if (o.on !== payload.omatrix[i].on) {
                return Object.assign({}, o, { idx: i, diff: [o.on, payload.omatrix[i].on] });
            }
            return null;
        }).filter(o => o !== null);
        ledM.setData(matrix.slice());
        ledM.render();
        let test = ledM.toDataURL();
        const blob = yield fetch(test).then(res => res.blob());
        const url = URL.createObjectURL(blob);
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
    }))
        .catch(rej);
});
function mapPixel(pixel) {
    if (pixel.r > 20 || pixel.g > 20 || pixel.b > 20)
        return true;
    return false;
}
