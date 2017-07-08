"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("./color");
class LedDrawerManager {
    constructor(x, y) {
        this.getMatrix = () => this.matrix;
        this.x = x;
        this.y = y;
        this.fillScreen(null);
    }
    setSize(row, column) {
        this.x = row;
        this.y = column;
    }
    fill(x = 0, y = 0, r = 0, g = 0, b = 0, a = 1) {
        if (x < this.x && y < this.y) {
            this.matrix[(y * this.x) + x] = {
                on: true,
                color: { r, g, b, a }
            };
        }
    }
    write(text, font, color) {
        const lines = text.split('\n');
        const { r, g, b, a } = color_1.getRGBA(color);
        const CHAR_WIDTH = font[0].length;
        const CHAR_HEIGHT = font[0][0].length;
        lines.forEach((ch, line) => {
            for (let i = 0; i < ch.length; i += 1) {
                const ind = ch.charCodeAt(i) - 32;
                const fontRow = font[ind];
                for (let x = 0; x < CHAR_WIDTH; x += 1) {
                    const col = fontRow[x];
                    for (let y = 0; y < CHAR_HEIGHT; y += 1) {
                        if (col[y] === '1') {
                            this.fill(x + (i * CHAR_WIDTH), y - 1 + (line * CHAR_HEIGHT), r, g, b, a);
                        }
                    }
                }
            }
        });
    }
    drawPixel(x, y, c) {
        if (x < this.x && y < this.y) {
            this.matrix[(y * this.x) + x] = {
                on: true,
                color: c
            };
        }
    }
    drawLine(x1, y1, x2, y2, color) {
        const steep = Math.abs(y2 - y1) > Math.abs(x2 - x1);
        if (steep) {
            [x1, y1] = [y1, x1];
            [x2, y2] = [y2, x2];
        }
        if (x1 > x2) {
            [x1, x2] = [x2, x1];
            [y1, y2] = [y2, y1];
        }
        let dx = x2 - x1;
        let dy = Math.abs(y2 - y1);
        let err = dx / 2;
        let ystep = (y1 < y2) ? 1 : -1;
        for (; x1 <= x2; x1 += 1) {
            if (steep) {
                this.drawPixel(y1, x1, color);
            }
            else {
                this.drawPixel(x1, y1, color);
            }
            err -= dy;
            if (err < 0) {
                y1 += ystep;
                err += dx;
            }
        }
    }
    drawFastVLine(x, y, h, color) {
        this.drawLine(x, y, x, y + h - 1, color);
    }
    drawFastHLine(x, y, w, color) {
        this.drawLine(x, y, x + w - 1, y, color);
    }
    drawRect(x, y, w, h, color) {
        this.drawFastHLine(x, y, w, color);
        this.drawFastHLine(x, y + h - 1, w, color);
        this.drawFastVLine(x, y, h, color);
        this.drawFastVLine(x + w - 1, y, h, color);
    }
    drawRoundRect(x, y, w, h, r, color) {
        this.drawFastHLine(x + r, y, w - 2 * r, color);
        this.drawFastHLine(x + r, y + h - 1, w - 2 * r, color);
        this.drawFastVLine(x, y + r, h - 2 * r, color);
        this.drawFastVLine(x + w - 1, y + r, h - 2 * r, color);
        this.drawCircleHelper(x + r, y + r, r, 1, color);
        this.drawCircleHelper(x + w - r - 1, y + r, r, 2, color);
        this.drawCircleHelper(x + w - r - 1, y + h - r - 1, r, 4, color);
        this.drawCircleHelper(x + r, y + h - r - 1, r, 8, color);
    }
    drawTriangle(x1, y1, x2, y2, x3, y3, color) {
        this.drawLine(x1, y1, x2, y2, color);
        this.drawLine(x2, y2, x3, y3, color);
        this.drawLine(x3, y3, x1, y1, color);
    }
    drawCircleHelper(x1, y1, r, cornername, color) {
        let f = 1 - r;
        let ddF_x = 1;
        let ddF_y = -2 * r;
        let x = 0;
        let y = r;
        while (x < y) {
            if (f >= 0) {
                y--;
                ddF_y += 2;
                f += ddF_y;
            }
            x++;
            ddF_x += 2;
            f += ddF_x;
            if (cornername & 0x4) {
                this.drawPixel(x1 + x, y1 + y, color);
                this.drawPixel(x1 + y, y1 + x, color);
            }
            if (cornername & 0x2) {
                this.drawPixel(x1 + x, y1 - y, color);
                this.drawPixel(x1 + y, y1 - x, color);
            }
            if (cornername & 0x8) {
                this.drawPixel(x1 - y, y1 + x, color);
                this.drawPixel(x1 - x, y1 + y, color);
            }
            if (cornername & 0x1) {
                this.drawPixel(x1 - y, y1 - x, color);
                this.drawPixel(x1 - x, y1 - y, color);
            }
        }
    }
    drawCircle(x1, y1, r, color) {
        let f = 1 - r;
        let ddF_x = 1;
        let ddF_y = -2 * r;
        let x = 0;
        let y = r;
        this.drawPixel(x1, y1 + r, color);
        this.drawPixel(x1, y1 - r, color);
        this.drawPixel(x1 + r, y1, color);
        this.drawPixel(x1 - r, y1, color);
        while (x < y) {
            if (f >= 0) {
                y--;
                ddF_y += 2;
                f += ddF_y;
            }
            x++;
            ddF_x += 2;
            f += ddF_x;
            this.drawPixel(x1 + x, y1 + y, color);
            this.drawPixel(x1 - x, y1 + y, color);
            this.drawPixel(x1 + x, y1 - y, color);
            this.drawPixel(x1 - x, y1 - y, color);
            this.drawPixel(x1 + y, y1 + x, color);
            this.drawPixel(x1 - y, y1 + x, color);
            this.drawPixel(x1 + y, y1 - x, color);
            this.drawPixel(x1 - y, y1 - x, color);
        }
    }
    fillScreen(color) {
        let pixel;
        if (color === null) {
            pixel = {
                on: false
            };
        }
        else {
            pixel = {
                on: true,
                color
            };
        }
        this.matrix = Array(this.x * this.y).fill(pixel);
    }
    fillRect(x, y, w, h, color) {
        for (let i = x; i < x + w; i += 1) {
            this.drawFastVLine(i, y, h, color);
        }
    }
    fillRoundRect(x, y, w, h, r, color) {
        this.fillRect(x + r, y, w - 2 * r, h, color);
        this.fillCircleHelper(x + w - r - 1, y + r, r, 1, h - 2 * r - 1, color);
        this.fillCircleHelper(x + r, y + r, r, 2, h - 2 * r - 1, color);
    }
    fillCircleHelper(x1, y1, r, cornername, delta, color) {
        let f = 1 - r;
        let ddF_x = 1;
        let ddF_y = -2 * r;
        let x = 0;
        let y = r;
        while (x < y) {
            if (f >= 0) {
                y--;
                ddF_y += 2;
                f += ddF_y;
            }
            x++;
            ddF_x += 2;
            f += ddF_x;
            if (cornername & 0x1) {
                this.drawFastVLine(x1 + x, y1 - y, 2 * y + 1 + delta, color);
                this.drawFastVLine(x1 + y, y1 - x, 2 * x + 1 + delta, color);
            }
            if (cornername & 0x2) {
                this.drawFastVLine(x1 - x, y1 - y, 2 * y + 1 + delta, color);
                this.drawFastVLine(x1 - y, y1 - x, 2 * x + 1 + delta, color);
            }
        }
    }
    fillCircle(x, y, r, color) {
        this.drawFastVLine(x, y - r, 2 * r + 1, color);
        this.fillCircleHelper(x, y, r, 3, 0, color);
    }
    fillTriangle(x0, y0, x1, y1, x2, y2, color) {
        let a, b, y, last;
        if (y0 > y1) {
            [y0, y1] = [y1, y0];
            [x0, x1] = [x1, x0];
        }
        if (y1 > y2) {
            [y2, y1] = [y1, y2];
            [x2, x1] = [x1, x2];
        }
        if (y0 > y1) {
            [y0, y1] = [y1, y0];
            [x0, x1] = [x1, x0];
        }
        if (y0 === y2) {
            a = b = x0;
            if (x1 < a)
                a = x1;
            else if (x1 > b)
                b = x1;
            if (x2 < a)
                a = x2;
            else if (x2 > b)
                b = x2;
            this.drawFastHLine(a, y0, b - a + 1, color);
            return;
        }
        let dx01 = x1 - x0, dy01 = y1 - y0, dx02 = x2 - x0, dy02 = y2 - y0, dx12 = x2 - x1, dy12 = y2 - y1, sa = 0, sb = 0;
        last = (y1 === y2) ?
            y1 :
            y1 - 1;
        for (y = y0; y <= last; y++) {
            a = x0 + sa / dy01;
            b = x0 + sb / dy02;
            sa += dx01;
            sb += dx02;
            if (a > b) {
                [a, b] = [b, a];
            }
            this.drawFastHLine(a, y, b - a + 1, color);
        }
        sa = dx12 * (y - y1);
        sb = dx02 * (y - y0);
        for (; y <= y2; y++) {
            a = x1 + sa / dy12;
            b = x0 + sb / dy02;
            sa += dx12;
            sb += dx02;
            if (a > b) {
                [a, b] = [b, a];
            }
            this.drawFastHLine(a, y, b - a + 1, color);
        }
    }
    drawBitmap(x, y, bitmap, w, h, color) {
        let i, j, byteWidth = Math.trunc((w + 7) / 8);
        for (j = 0; j < h; j++) {
            for (i = 0; i < w; i++) {
                if (bitmap[Math.trunc(j * byteWidth + i / 8)] & (128 >> (i & 7))) {
                    this.drawPixel(x + i, y + j, color);
                }
            }
        }
    }
}
exports.LedDrawerManager = LedDrawerManager;
function createStore(x, y) {
    return new LedDrawerManager(x, y);
}
exports.createStore = createStore;
