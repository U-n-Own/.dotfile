"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeableMap = exports.map = exports.string = void 0;
const package_nls_json_1 = __importDefault(require("../../package.nls.json"));
const package_nls_ja_json_1 = __importDefault(require("../../package.nls.ja.json"));
const localeTableKey = JSON.parse(process.env.VSCODE_NLS_CONFIG).locale;
const localeTable = Object.assign(JSON.parse(JSON.stringify(package_nls_json_1.default)), ({
    ja: package_nls_ja_json_1.default
}[localeTableKey] || {}));
const isTypealbeLocale = [
    "ja",
].indexOf(localeTableKey) < 0;
const string = (key) => localeTable[key] || key;
exports.string = string;
const map = (key) => exports.string(key);
exports.map = map;
const typeableMap = (key) => isTypealbeLocale ? exports.string(key) : `${exports.string(key)} ( ${package_nls_json_1.default[key]} )`;
exports.typeableMap = typeableMap;
//# sourceMappingURL=locale.js.map