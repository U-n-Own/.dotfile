"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringArrayValidator = exports.makeEnumValidator = exports.MapEntry = exports.Entry = exports.applicationName = exports.properties = void 0;
const vscode = __importStar(require("vscode"));
const package_json_1 = __importDefault(require("../../package.json"));
const cache_1 = require("./cache");
exports.properties = Object.freeze(package_json_1.default.contributes.configuration[0].properties);
exports.applicationName = package_json_1.default.displayName;
//export const applicationKey = packageJson . name ;
class Entry {
    constructor(key, validator) {
        this.key = key;
        this.validator = validator;
        this.regulate = (rawKey, value) => {
            let result = value;
            if (this.validator && !this.validator(result)) {
                // settings.json をテキストとして直接編集してる時はともかく GUI での編集時に無駄にエラー表示が行われてしまうので、エンドユーザーに対するエラー表示は行わない。
                // vscode . window . showErrorMessage (`${ rawKey } setting value is invalid! Please check your settings.`);
                console.error(`"${rawKey}" setting value( ${JSON.stringify(value)} ) is invalid! Please check your settings.`);
                result = this.defaultValue;
            }
            else {
                if (undefined !== this.minValue && result < this.minValue) {
                    result = this.minValue;
                }
                else if (undefined !== this.maxValue && this.maxValue < result) {
                    result = this.maxValue;
                }
            }
            return result;
        };
        this.getApplicationKey = () => this.key.replace(/\..*/, "");
        this.getSection = () => this.key.replace(/[^.]+\./, "");
        this.cache = new cache_1.Cache((languageId) => {
            let result;
            if (undefined === languageId || null === languageId || 0 === languageId.length) {
                result = vscode.workspace.getConfiguration(this.getApplicationKey())[this.getSection()];
                if (undefined === result) {
                    result = this.defaultValue;
                }
                else {
                    result = this.regulate(this.key, result);
                }
            }
            else {
                const langSection = vscode.workspace.getConfiguration(`[${languageId}]`, null);
                result = langSection[this.key];
                if (undefined === result) {
                    result = this.get("");
                }
                else {
                    result = this.regulate(`[${languageId}].${this.key}`, result);
                }
            }
            return result;
        });
        this.set = (value, configurationTarget) => __awaiter(this, void 0, void 0, function* () {
            yield vscode.workspace.getConfiguration(this.getApplicationKey()).update(this.getSection(), value, configurationTarget);
            this.clear();
        });
        this.get = this.cache.get;
        this.getCache = this.cache.getCache;
        this.clear = this.cache.clear;
        this.onDidChangeConfiguration = (affectsConfiguration) => {
            const result = affectsConfiguration(this.key);
            if (result) {
                this.clear();
            }
            return result;
        };
        this.defaultValue = exports.properties[key].default;
        this.minValue = exports.properties[key].minimum;
        this.maxValue = exports.properties[key].maximum;
    }
}
exports.Entry = Entry;
class MapEntry {
    constructor(key, mapObject) {
        this.key = key;
        this.mapObject = mapObject;
        this.config = new Entry(this.key, exports.makeEnumValidator(this.mapObject));
        this.set = this.config.set;
        this.getKey = (languageId) => this.config.cache.get(languageId);
        this.get = (languageId) => this.mapObject[this.getKey(languageId)];
        this.getCache = (languageId) => this.mapObject[this.config.cache.getCache(languageId)];
        this.clear = this.config.cache.clear;
        this.onDidChangeConfiguration = this.config.onDidChangeConfiguration;
    }
}
exports.MapEntry = MapEntry;
const makeEnumValidator = (mapObject) => (value) => 0 <= Object.keys(mapObject).indexOf(value.toString());
exports.makeEnumValidator = makeEnumValidator;
const stringArrayValidator = (value) => "[object Array]" === Object.prototype.toString.call(value) &&
    value.map(i => "string" === typeof i).reduce((a, b) => a && b, true);
exports.stringArrayValidator = stringArrayValidator;
//# sourceMappingURL=config.js.map