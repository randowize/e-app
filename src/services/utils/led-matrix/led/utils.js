"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hexToBin(num) {
    const bin = num.toString(2);
    return (bin.length < 8) ? '0'.repeat(8 - bin.length) + bin : bin;
}
exports.hexToBin = hexToBin;
function prepareFont(fontMap) {
    return fontMap.map(row => row.map(num => hexToBin(num).split('').reverse().join('')));
}
exports.prepareFont = prepareFont;
function hexToRGB(hexStr) {
    if (typeof hexStr === 'string') {
        hexStr = parseInt(hexStr.substr(1), 16);
    }
    return [hexStr >> 16, hexStr >> 8 & 0xFF, hexStr & 0xFF];
}
exports.hexToRGB = hexToRGB;
