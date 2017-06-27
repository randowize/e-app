console.time('start')
//require('ts-node/register');
const Jimp = require('jimp');
const t =  require('./add');
console.log(t.add(40,50));
console.timeEnd('start');
process.on("message", bf => {
 
  Jimp.read(Buffer.from(bf.data, "base64"))
    .then(d => {
      d
        .resize(32 * 2, 16 * 2)
        .quality(90)
        .greyscale()
        .write("./src/resources/save.bmp");
      const {width, height, data} = d.bitmap;
      process.send(d.clone());
    })
    .catch(e => {
      console.log(e);
    });
});
