import * as cp from 'child_process';

function monitorEventOn(evtname, p) {
   p.on(evtname, (a , b) => console.log(`${evtname}:(a) ${a} \n (b):${b}`));
}
export const send = d => new Promise( (res, rej) => {
   const w = cp.fork(`${__dirname}\\transform-pixels.js`);
    monitorEventOn('close', w);
    monitorEventOn('exit', w);
    monitorEventOn('disconnect', w);
    if (w.send({data: d, ok: true})) {
      w.on('message', (d) => {
        console.log('ok');
        res(d);
        w.kill('SIGINT');
      });

    }else {
      console.log('problem');
      rej('Something went wrong!');
      w.kill('SIGINT');
    }
});