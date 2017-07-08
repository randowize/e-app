"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbgMessage = message => {
    if (process.send) {
        process.send({ type: 'debug', message });
    }
    else {
        console.log('not ok');
    }
};
