"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.DEBUG_HIDE_DATE = '1';
const debug_1 = __importDefault(require("debug"));
debug_1.default.enable(process.env.NODE_ENV === 'development' ? '*,-babel*' : '*,-babel*,-*:debug,-*:*:debug,-*:*:*:debug,-*:*:*:*:debug,-*:*:*:*:*:debug');
debug_1.default.formatArgs = function (args) {
    args[0] = `['${this.namespace}'] ${args[0]}`;
};
debug_1.default.log = console.log.bind(console);
exports.default = debug_1.default('driver');
