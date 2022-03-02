"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const other_1 = require("../../utils/other");
const document_1 = require("../../utils/document");
const InteroLocationDecoder_1 = require("../InteroLocationDecoder");
class HaskellDefinitionProvider {
    constructor(interoSpawn) {
        this.interoSpawn = interoSpawn;
        this.interoLocationDecoder = new InteroLocationDecoder_1.default();
    }
    provideDefinition(document, position, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const wordInfo = other_1.getNearWord(position, document.getText());
            const filePath = document_1.normalizePath(document.uri.fsPath);
            const definitionLocation = yield this.interoSpawn.requestDefinition(filePath, position, wordInfo);
            return this.interoLocationDecoder.decode(definitionLocation);
        });
    }
}
exports.default = HaskellDefinitionProvider;
//# sourceMappingURL=index.js.map