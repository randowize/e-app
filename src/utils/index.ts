// import ucompose from 'ucompose';


const extract = (w : number, h : number) => {
    /** w = width of leds matrices */
    /** h = height of leds matrices */

    return (hr_mat_count : number) => (x: number, y: number) => arr => {
        /** hr_mat_count = number of led matrices horizontally */
        /** x,y = position of the leds matrix */
        const res : any[] = [];
        let shift = 0;

        const dx = ((x - 1) * w);
        const dy = ((y - 1) * w * hr_mat_count * h);

        for (let i = 0; i < h; i++) {
            for (let j = 0; j < w; j += 1) {
                res.push(arr[ dx + shift + dy + j]);
            }
            shift += (w * hr_mat_count);
        }
        return res;
    };

};
export const scaledExtraction = (sx) => extract(sx * 32, 16);

export const extractPanel = scaledExtraction(1);

export const extractBytesColumn = extract(8, 16)(4);

export const extractByte = extract(8, 1)(1);

export const extractBlockOfFourBytes = extract(8, 4)(1);

export const getUInt = (arr : number[]) => {
    let res : any[] = [];
    for (let i = 1; i <= 4; i += 1) {
      let parts = extractBytesColumn(i, 1)(arr);
      let temp : any[] = [];
      let part : any[];
      for (let j = 1; j <= 16; j += 1) {
        part = extractByte(1, j)(parts);
        temp.push(parseInt(part.join(''), 2));
      }
      res.push(temp.slice(0));
      temp.splice(0);
    }
    return res;
  };

export const toCArrays = (arrs : any[]) => {
    const res : any = {};
    arrs.forEach((arr, i) => {
      res[`unsigned char panel_1${i + 1} [16]`] = `{${arr.join(',')}}`;
    });
    return res;
  };

export const initializeGrouping = (i : number) => (size: number) => () => {
    const col = i % size;
    i += 1;
    return col;
  };

export const weirdConversion = (arr: any[]) => {
  let res = 0;
  arr.forEach((a, ind) => {
    if (a === 1) {
      res += 0;
    }else {
      res += Math.pow(2, ind);
    }
  });
  return res;
}
export type indices = [number, number];
export const  getMatricesIndices = (rowScale, colScale) => {
    const res : indices[] = [];
    for (let i = 1; i <= rowScale; i++) {
      for (let j = 1; j <= colScale; j++) {
        res.push([j, i]);
      }
    }
    return res;
  };

