"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusBar_1 = require("./statusBar");
const vscode_1 = require("vscode");
const constants_1 = require("./constants");
const extension_1 = require("../extension");
const placeHolder = constants_1.strings.quickPickPlaceholder;
const customInputLabel = constants_1.strings.customInputLabel;
function openQuickPick() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = _createQuickPickOptions();
        const userSelection = yield vscode_1.window.showQuickPick(options, {
            placeHolder
        });
        if (userSelection && userSelection.label === customInputLabel) {
            _openCustomInput();
            return;
        }
        const newFontSize = userSelection && userSelection.label.slice(13, -3);
        if (newFontSize) {
            extension_1.setFontSize(Number(newFontSize));
        }
    });
}
exports.openQuickPick = openQuickPick;
function _createQuickPickOptions() {
    const numbers = [...Array(27).keys()].filter(i => i >= 8).map(String);
    const options = numbers.map(num => {
        const opt = { label: `${constants_1.icons.typography} ${num}-pt` };
        if (num === statusBar_1.getCurrentSize().toString()) {
            opt.description = constants_1.strings.current;
        }
        return opt;
    });
    options.unshift({
        label: customInputLabel
    });
    return options;
}
function _openCustomInput() {
    return __awaiter(this, void 0, void 0, function* () {
        const enteredSize = yield vscode_1.window.showInputBox({
            prompt: constants_1.strings.customSizePrompt,
            value: String(statusBar_1.getCurrentSize())
        });
        if (enteredSize) {
            extension_1.setFontSize(Number(enteredSize));
        }
    });
}
//# sourceMappingURL=quickPickMenu.js.map