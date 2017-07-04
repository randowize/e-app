"use strict";
// import ucompose from 'ucompose';
Object.defineProperty(exports, "__esModule", { value: true });
exports.limitCalls = f => i => (cb = () => null) => {
    if (i <= 0) {
        cb();
        return;
    }
    i -= 1;
    f();
};
const extract = (w, h) => {
    /** w = width of leds matrices */
    /** h = height of leds matrices */
    return (hr_mat_count) => (x, y) => arr => {
        /** hr_mat_count = number of led matrices horizontally */
        /** x,y = position of the leds matrix */
        const res = [];
        let shift = 0;
        const dx = (x - 1) * w;
        const dy = (y - 1) * w * hr_mat_count * h;
        for (let i = 0; i < h; i++) {
            for (let j = 0; j < w; j += 1) {
                res.push(arr[dx + shift + dy + j]);
            }
            shift += w * hr_mat_count;
        }
        return res;
    };
};
exports.scaledExtraction = sx => extract(sx * 32, 16);
exports.extractPanel = exports.scaledExtraction(1);
exports.extractBytesColumn = extract(8, 16)(4);
exports.extractByte = extract(8, 1)(1);
exports.extractBlockOfFourBytes = extract(8, 4)(1);
exports.getUInt = (arr) => {
    let res = [];
    for (let i = 1; i <= 4; i += 1) {
        let parts = exports.extractBytesColumn(i, 1)(arr);
        let temp = [];
        let part;
        for (let j = 1; j <= 16; j += 1) {
            part = exports.extractByte(1, j)(parts);
            temp.push(parseInt(part.join(''), 2));
        }
        res.push(temp.slice(0));
        temp.splice(0);
    }
    return res;
};
exports.toCArrays = (arrs) => {
    const res = {};
    arrs.forEach((arr, i) => {
        res[`unsigned char panel_1${i + 1} [16]`] = `{${arr.join(',')}}`;
    });
    return res;
};
exports.initializeGrouping = (i) => (size) => () => {
    const col = i % size;
    i += 1;
    return col;
};
exports.weirdConversion = (arr) => {
    let res = 0;
    arr.forEach((a, ind) => {
        if (a === 1) {
            res += 0;
        }
        else {
            res += Math.pow(2, ind);
        }
    });
    return res;
};
exports.getMatricesIndices = (rowScale, colScale) => {
    const res = [];
    for (let i = 1; i <= rowScale; i++) {
        for (let j = 1; j <= colScale; j++) {
            res.push([j, i]);
        }
    }
    return res;
};
