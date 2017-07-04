import { hexToRGB } from './utils';

export interface IRGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export type IColor = IRGBA | string | number;

export function getRGBA(hexStr: IColor): IRGBA  {
  if (typeof hexStr === 'object' && typeof hexStr.r !== 'undefined') {
    return { ...hexStr };
  } else if (typeof hexStr === 'string' || typeof hexStr === 'number') {
    const [r, g, b] = hexToRGB(hexStr);
    return {
      r, g, b, a: 1
    };
  }
  return {r: 0, b: 0, g: 0, a: 1};
}

export class Color {
  public static hex(hexStr: string | number): IRGBA {
    const [r, g, b] = hexToRGB(hexStr);
    return {
      r, g, b, a: 1
    };
  }

  public static rgba(r: number, g: number, b: number, a: number = 1): IRGBA {
    return {
      r, g, b, a
    };
  }
}
