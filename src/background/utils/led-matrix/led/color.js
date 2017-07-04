"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function getRGBA(hexStr) {
    if (typeof hexStr === 'object' && typeof hexStr.r !== 'undefined') {
        return Object.assign({}, hexStr);
    }
    else if (typeof hexStr === 'string' || typeof hexStr === 'number') {
        const [r, g, b] = utils_1.hexToRGB(hexStr);
        return {
            r, g, b, a: 1
        };
    }
    return { r: 0, b: 0, g: 0, a: 1 };
}
exports.getRGBA = getRGBA;
class Color {
    static hex(hexStr) {
        const [r, g, b] = utils_1.hexToRGB(hexStr);
        return {
            r, g, b, a: 1
        };
    }
    static rgba(r, g, b, a = 1) {
        return {
            r, g, b, a
        };
    }
}
exports.Color = Color;
