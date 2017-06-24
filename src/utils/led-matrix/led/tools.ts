export function hexToBin(num: number): string {
  const bin = num.toString(2);
  return (bin.length < 8) ? '0'.repeat(8 - bin.length) + bin : bin;
}

export function prepareFont(fontMap: number[][]): string[][] {
  return fontMap.map(row => row.map(
    num => hexToBin(num).split('').reverse().join('')
  ));
}

export function hexToRGB(hexStr: string | number): Array<number> {
  if (typeof hexStr === 'string') {
    hexStr = parseInt(hexStr.substr(1), 16);
  }
  return [hexStr >> 16, hexStr >> 8 & 0xFF, hexStr & 0xFF];
}
