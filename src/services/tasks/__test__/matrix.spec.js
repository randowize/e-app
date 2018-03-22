"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matrix_1 = require("../matrix");
test('tranforms 1D array to 2D array', () => {
    const t1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const res1 = matrix_1.to2DArray(3, 4)(t1);
    const expected1 = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12]
    ];
    expect(JSON.stringify(res1)).toBe(JSON.stringify(expected1));
});
