import * as cp from 'child_process';

export const send = d => new Promise( (res, rej) => {
   const w = cp.fork(`${__dirname}\\transform-pixels.js`);
    w.on('error', (e)  => rej(e))
    if (w.send({data: d, ok: true})) {
      w.on('message', (d) => {
        res(d);
        w.kill('SIGINT');
      });

    }else {
      rej('Something went wrong!');
      w.kill('SIGINT');
    }
});