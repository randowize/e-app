const Rx = require('rxjs');
const fs = require('fs');
const { processImgBuffer } = require('./tasks/process-image');
const utils = require('./tasks/utils');


if( processImgBuffer){
  utils.dbgMessage('processImgBuffer not null')
}else {
  utils.dbgMessage('processImgBuffer  null')
}
const evtname = 'message';

const incomingMessage = Rx.Observable.fromEventPattern(
  l => process.addListener(evtname, l),
  l => process.removeListener(evtname, l)
);
const imgProcessingReq = incomingMessage.filter(m => m.type === 'process-img');

imgProcessingReq
.switchMap((d) => processImgBuffer(d.payload))
.subscribe((d) => {
  return process.send ?  process.send({type: 'refresh', d}) : null;
});

incomingMessage
.filter(m => m.type === 'test')
.throttleTime(5000)
.subscribe((m) => {
   const num = parseFloat(m);
   const d = JSON.stringify({m, tofixed: num.toFixed(6), cwd: process.cwd()});
  fs.writeFile('number.txt', d, (err) => {
    if ( process.send) {
      process.send({m, toFixed: num.toFixed(5), d, type:'debug'});
    }
  });
});
