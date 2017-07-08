"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rx = require("rxjs");
const process_image_1 = require("./tasks/process-image");
const evtname = 'message';
const incomingMessage = Rx.Observable.fromEventPattern(l => process.addListener(evtname, l), l => process.removeListener(evtname, l));
const imgProcessingReq = incomingMessage.filter((m) => m.type === 'process-img');
imgProcessingReq
    .switchMap((d) => process_image_1.processImgBuffer(d.payload))
    .subscribe((d) => {
    return process.send ? process.send({ type: 'refresh', d }) : null;
});
