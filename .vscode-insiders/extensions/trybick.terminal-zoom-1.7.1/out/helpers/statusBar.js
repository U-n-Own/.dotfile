"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const constants_1 = require("./constants");
function getCurrentSize() {
    const config = vscode_1.workspace.getConfiguration();
    return config.get(constants_1.strings.terminalFontSize) || 12;
}
exports.getCurrentSize = getCurrentSize;
function _createStatusBarItem({ text, tooltip, command }) {
    const item = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Right);
    item.text = text;
    item.tooltip = tooltip;
    item.command = command;
    return item;
}
exports.statusBarItems = [
    _createStatusBarItem({
        text: '+',
        tooltip: constants_1.tooltips.increase,
        command: constants_1.cmds.increaseSize
    }),
    _createStatusBarItem({
        text: `Terminal ${getCurrentSize()}-pt`,
        tooltip: constants_1.tooltips.set,
        command: constants_1.cmds.setSize
    }),
    _createStatusBarItem({
        text: '-',
        tooltip: constants_1.tooltips.decrease,
        command: constants_1.cmds.decreaseSize
    })
];
function updateStatusBar() {
    exports.statusBarItems[1].text = `Terminal ${getCurrentSize()}-pt`;
}
exports.updateStatusBar = updateStatusBar;
//# sourceMappingURL=statusBar.js.map