import { IMatrix } from "./store";

export interface ILedMatrixOptions {
  x?: number;
  y?: number;
  pixelWidth?: number;
  pixelHeight?: number;
  margin?: number;
  glow?: boolean;
  animated?: boolean;
}

const DEFAULT_OPTS: ILedMatrixOptions = {
  x: 32,
  y: 16,
  pixelWidth: 10,
  pixelHeight: 10,
  margin: 4,
  glow: false,
  animated: false
};

export class LedMatrix {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private opts: ILedMatrixOptions;
  private data: IMatrix = [];
  private offset = 0;
  private rAF: any;

  constructor(canvas: HTMLCanvasElement, opts: ILedMatrixOptions = {}) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.opts = Object.assign({}, DEFAULT_OPTS, opts);
    this.setup();
  }

  private setup = () => {
    const width = this.opts.x * (this.opts.pixelWidth + this.opts.margin);
    const height = this.opts.y * (this.opts.pixelHeight + this.opts.margin);
    this.canvas.width = width;
    this.canvas.height = height;
    // this.canvas.style.width = '100%' /*`${width / 2}px`*/;
    // this.canvas.style.height = '100%' /*`${height / 2}px`*/;
  };

  render(): void {
    if (this.rAF) {
      cancelAnimationFrame(this.rAF);
    }
    this.clear();
    this.draw();
  }

  private draw(): void {
    const pw = this.opts.pixelWidth || 10;
    const ph = this.opts.pixelHeight || 10;
    const margin = this.opts.margin || 10;
    const x = this.opts.x || 32;
    const y = this.opts.y || 16;
   // const glow = this.opts.glow || false;
    const animated = this.opts.animated || false;
    let pixels;
    pixels = x * y;
    if (this.data.length !== pixels) {
      // throw new Error('`data` needs to be provided fully. Length is insufficient.');
      // console.log(this.data.length, pixels);
      pixels = this.data.length;
      //return;
    }

    if (this.ctx) {
      for (let i = 0; i < pixels; i += 1) {
        const { on, color } = this.data[i];
        let rgba = '';
        if (color) {
          rgba = on
            ? `rgba(${color.r},${color.g},${color.b},${color.a})`
            : 'rgba(0,0,0,.1)';
        }
        this.renderPixelOnCanvas(i, rgba, x, this.ctx, pw, ph, margin );

        /* if (animated) {
          dx -= this.offset;
          dx = dx < 0 ? x - 1 - Math.abs(dx) : dx;
        }
        */

        /*if (glow && on) {
          this.ctx.shadowBlur = 5;
          this.ctx.shadowColor = rgba;
        } else {
          this.ctx.shadowBlur = 0;
        }*/
      }
    }
    if (animated) {
      this.animate();
    }
  }

  animate() {
    this.offset += 1;
    if (this.offset >= (this.opts.x || 32)) {
      this.offset = 0;
    }

    this.rAF = requestAnimationFrame(() => {
      this.clear();
      this.draw();
    });
  }

  update(pixels: any[]) {
    const pw = this.opts.pixelWidth || 10;
    const ph = this.opts.pixelHeight || 10;
    const margin = this.opts.margin || 10;
    const x = this.opts.x || 32;
    // const y = this.opts.y || 16;
    if (pixels.length > 0 && this.ctx) {
      pixels.forEach(px => {
        this.renderPixelOnCanvas(px.i, px.rgba, x, this.ctx, pw, ph, margin);
      });
    }
  }

  private renderPixelOnCanvas(i, rgba, x, ctx, pw, ph, margin) {
    const dy = Math.floor(i / x);
    let dx = i - dy * x;
    ctx.fillStyle = rgba;
    ctx.fillRect(dx * (pw + margin), dy * (ph + margin), pw, ph);
  }

  clear(): void {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  setNewOptions(opts: ILedMatrixOptions) {
    this.opts = Object.assign({}, this.opts, opts);
    this.setup();
  }

  setData(data: IMatrix) {
    this.data = data;
  }
}
