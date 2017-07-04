"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path = require("path");
const Jimp = require("jimp");
function bmpAs2DArray(bmp) {
    const tmp = bmp.clone();
    const res = [];
    tmp.scan(0, 0, tmp.bitmap.width, tmp.bitmap.height, (x, y) => {
        if (res[x] === undefined) {
            res[x] = [];
        }
        res[x][y] = tmp.getPixelColor(x, y);
    });
    return res;
}
exports.bmpAs2DArray = bmpAs2DArray;
let satir_1 = [12, 8, 4, 0, 13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3];
function getMatrixTest() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let dizi1 = [];
        let dizi2 = [];
        let dizi3 = [];
        let dizi4 = [];
        const img = yield Jimp.read(path.resolve('../resources/P10-2.bmp'));
        // const bmp = bmpAs2DArray(img);
        function applyToArray(carr, dx = 0, dy = 0) {
            let pixel_x, pixel_y, pixel;
            let X, Y, sutun;
            let line;
            X = 4;
            Y = 16;
            let color;
            let pixelColor;
            let satir = 0, blok = 0;
            for (pixel_y = 0; pixel_y < Y; pixel_y++) {
                line = '';
                for (sutun = 0; sutun < X; sutun++) {
                    pixel = 0;
                    for (pixel_x = 0; pixel_x < 8; pixel_x++) {
                        color = img.getPixelColor(pixel_x + dx + sutun * 8, dy + pixel_y);
                        pixelColor = Jimp.intToRGBA(color);
                        if (pixelColor.r > 100 && pixelColor.g > 100 && pixelColor.b > 100) {
                            pixel = pixel + 0;
                        }
                        else {
                            pixel = pixel + Math.pow(2, pixel_x);
                        }
                        // tslint:disable-next-line:curly
                        if (carr[satir] === undefined)
                            carr[satir] = [];
                        carr[satir][satir_1[blok * 4 + sutun]] = pixel;
                    }
                    line += pixel + ',';
                }
                if (satir < 3) {
                    satir++;
                }
                else {
                    satir = 0;
                    blok += 1;
                }
            }
        }
        function buildLines(arr1, arr2) {
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
    });
}
exports.getMatrixTest = getMatrixTest;
