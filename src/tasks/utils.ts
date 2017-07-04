export const dbgMessage = message => {
  if (process.send) {
    process.send({type: 'debug', message});
  }else {
    console.log('not ok');
  }
};