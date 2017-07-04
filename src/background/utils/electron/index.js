"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const electron_1 = require("electron");
const path = require("path");
const jimp = require("jimp");
const { dialog } = electron_1.remote;
const options = {
    filters: [{ name: 'Pics', extensions: ['jpg', 'png', 'gif', 'bmp'] }],
    defaultPath: path.resolve(__dirname, '../../../src/resources')
};
exports.selectImage = () => {
    return new Promise((res, rej) => {
        dialog.showOpenDialog(options, (arr) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            // tslint:disable-next-line:curly
            if (arr === undefined)
                return rej(undefined);
            try {
                const imr = yield jimp.read(arr[0]);
                const clone = imr.clone();
                const data = clone.bitmap.data;
                const red = [];
                clone.scan(0, 0, 64, 32, (x, y, idx) => red.push(data[idx + 2]));
                const rslt = {
                    width: clone.bitmap.width,
                    height: clone.bitmap.height,
                    data: [...clone.bitmap.data],
                    matrix: red.map(o => ({ on: !!o }))
                };
                return res(rslt);
            }
            catch (e) {
                return rej(e);
            }
        }));
    });
};
