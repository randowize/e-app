"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function permutations(str) {
    let chars = str.split('');
    let result = [];
    if (str.length < 2) {
        return [str];
    }
    if (str.length == 2) {
        return [chars[0] + chars[1], chars[1] + chars[0]];
    }
    for (let i = 0; i < chars.length; i++) {
        let rmn = chars.filter(function (e, j) {
            return j != i;
        });
        permutations(rmn.join('')).forEach(function (v) {
            result.push(chars[i] + v);
        });
    }
    return result;
}
exports.permutations = permutations;
