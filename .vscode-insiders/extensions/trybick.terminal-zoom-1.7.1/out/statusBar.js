"use strict";
function createStatusBarItem({ text, tooltip, command }) {
    const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    item.text = text;
    item.tooltip = tooltip;
    item.command = command;
    item.show();
    return item;
}
const statusBarItems = [
    createStatusBarItem({
        text: '+',
        tooltip: tooltips.increase,
        command: cmds.increaseSize
    }),
    createStatusBarItem({
        text: 'Terminal',
        tooltip: tooltips.decrease,
        command: cmds.setSize
    }),
    createStatusBarItem({
        text: '-',
        tooltip: tooltips.set,
        command: cmds.decreaseSize
    })
];
//# sourceMappingURL=statusBar.js.map