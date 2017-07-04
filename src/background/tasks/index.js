"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_remote_1 = require("electron-remote");
const Tasks = electron_remote_1.requireTaskPool(require.resolve('../tasks/image-processing.ts'));
exports.default = Tasks;
