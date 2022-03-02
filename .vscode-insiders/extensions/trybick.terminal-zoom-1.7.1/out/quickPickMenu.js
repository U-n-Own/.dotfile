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
function openQuickPick() {
    return __awaiter(this, void 0, void 0, function* () {
        const placeHolder = strings.quickPickPlaceholder;
        const optionsRange = [...Array(25).keys()].filter(i => i >= 8 && i % 2 === 0); // even numbers from 8-24
        const options = optionsRange.map(num => {
            return { label: `${num.toString()}-pt` };
        });
        const userSelection = yield vscode.window.showQuickPick(options, { placeHolder });
        const newFontSize = userSelection && userSelection.label.slice(0, -3);
        if (newFontSize) {
            setFontSize(Number(newFontSize));
        }
    });
}
//# sourceMappingURL=quickPickMenu.js.map