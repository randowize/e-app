"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEFAULT_OPTS = {
    x: 32,
    y: 16,
    pixelWidth: 10,
    pixelHeight: 10,
    margin: 10,
    glow: false,
    animated: false
};
class LedMatrix {
    constructor(canvas, opts = {}) {
        this.data = [];
        this.offset = 0;
        this.setup = () => {
            const x = this.opts.x || 32;
            const y = this.opts.y || 16;
            const pw = this.opts.pixelWidth || 10;
            const ph = pw;
            const margin = this.opts.margin || 10;
            const width = x * (pw + margin);
            const height = y * (ph + margin);
            this.canvas.width = width;
            this.canvas.height = height;
        };
        this.getFillColor = px => {
            const { on, color } = px;
            let rgba = '';
            if (color) {
                rgba = on
                    ? `rgb(${color.r},${color.g},${color.b})`
                    : 'rgba(0,0,0,0.1)';
            }
            return rgba;
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.opts = Object.assign({}, DEFAULT_OPTS, opts);
        this.setup();
    }
    render() {
        if (this.rAF) {
            cancelAnimationFrame(this.rAF);
        }
        this.clear();
        this.draw();
    }
    draw() {
        const pw = this.opts.pixelWidth || 10;
        const ph = this.opts.pixelHeight || 10;
        const margin = this.opts.margin || 10;
        const x = this.opts.x || 32;
        const y = this.opts.y || 16;
        const animated = this.opts.animated || false;
        let pixels;
        pixels = x * y;
        if (this.data.length !== pixels) {
            pixels = this.data.length;
        }
        if (this.ctx) {
            for (let i = 0; i < pixels; i += 1) {
                let fillColor = this.getFillColor(this.data[i]);
                this.renderPixelOnCanvas(i, fillColor, x, this.ctx, pw, ph, margin);
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
    update(pixels) {
        const pw = this.opts.pixelWidth || 10;
        const ph = this.opts.pixelHeight || 10;
        const margin = this.opts.margin || 10;
        const x = this.opts.x || 32;
        if (pixels.length > 0 && this.ctx) {
            pixels.forEach(px => {
                const pxcolor = this.getFillColor(px);
                this.renderPixelOnCanvas(px.idx, pxcolor, x, this.ctx, pw, ph, margin);
            });
        }
    }
    renderPixelOnCanvas(i, pxcolor, x, ctx, pw, ph, margin) {
        const dy = Math.floor(i / x);
        let dx = i - dy * x;
        ctx.fillStyle = pxcolor;
        ctx.clearRect(dx * (pw + margin), dy * (ph + margin), pw, ph);
        ctx.fillRect(dx * (pw + margin), dy * (ph + margin), pw, ph);
    }
    clear() {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    setNewOptions(opts) {
        this.opts = Object.assign({}, this.opts, opts);
        this.setup();
    }
    setData(data) {
        this.data = data;
    }
    toDataURL() {
        return this.canvas.toDataURL();
    }
}
exports.LedMatrix = LedMatrix;
