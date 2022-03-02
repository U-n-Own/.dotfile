"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const constants_1 = require("./helpers/constants");
const statusBar_1 = require("./helpers/statusBar");
const quickPickMenu_1 = require("./helpers/quickPickMenu");
function increaseFontSize() {
    setFontSize(statusBar_1.getCurrentSize() + 1);
}
function decreaseFontSize() {
    setFontSize(statusBar_1.getCurrentSize() - 1);
}
function setFontSize(newSetting) {
    vscode_1.workspace.getConfiguration().update(constants_1.strings.terminalFontSize, newSetting, true);
}
exports.setFontSize = setFontSize;
function activate(context) {
    context.subscriptions.push(vscode_1.commands.registerCommand(constants_1.cmds.decreaseSize, () => decreaseFontSize()), vscode_1.commands.registerCommand(constants_1.cmds.increaseSize, () => increaseFontSize()), vscode_1.commands.registerCommand(constants_1.cmds.setSize, () => quickPickMenu_1.openQuickPick()), ...statusBar_1.statusBarItems);
    vscode_1.workspace.onDidChangeConfiguration(() => statusBar_1.updateStatusBar());
    statusBar_1.statusBarItems.forEach(item => {
        item.show();
    });
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map