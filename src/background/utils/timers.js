"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function delay(millis) {
    return new Promise(res => {
        setTimeout(res, millis);
    });
}
exports.delay = delay;
;
