"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PI = Math.PI;
exports.getRadians = () => (new Date().getSeconds() * PI / 30) - (90 * PI / 180);
