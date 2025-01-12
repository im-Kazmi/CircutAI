"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQueue = createQueue;
const next_app_1 = require("quirrel/next-app");
function createQueue(path, handler, options) {
    return (0, next_app_1.Queue)(path, handler, options);
}
