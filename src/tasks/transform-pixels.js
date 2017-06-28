const Jimp = require("jimp");

function mapPixel(pixel) {
  // if(pixel.r>250 && pixel.g>100 && pixel.b>100) return true;
  if (pixel.b > 250) return true;
  return false;
}

process.on("message", bf => {
  Jimp.read(Buffer.from(bf.data, "base64"))
    .then(img => {
      img
        .resize(32 * 2, 16 * 2)
        .quality(90)
        .greyscale()
        .write("../resources/save.bmp");
      const rimg = Jimp.read("../resources/save.bmp");
      rimg.then(d => {
        const { width, height, data } = d.bitmap;
        const pixels = [];
        d.scan(0, 0, width, height, (x, y, idx) =>
          pixels.push({
            r: data[idx],
            g: data[idx + 1],
            b: data[idx + 2],
            a: data[idx + 3]
          })
        );
        process.send({
          width,
          height,
          pixels,
          matrix: pixels.map(mapPixel).map(on => ({ on })),
          data: [...d.bitmap.data]
        });
      });
    })
    .catch(e => {
      console.log(e);
    });
});
