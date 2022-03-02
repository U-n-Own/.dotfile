"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const providers_1 = require("./providers");
function _createTreeView(id, treeDataProvider) {
    const treeView = vscode.window.createTreeView(id, { treeDataProvider });
    treeView.onDidChangeVisibility((e) => {
        if (e.visible) {
            treeDataProvider.startUpdate();
        }
        else {
            treeDataProvider.stopUpdate();
        }
    });
}
function activate(context) {
    const processInfoProvider = new providers_1.ProcessInfoProvider();
    const connectionInfoProvider = new providers_1.ConnectionInfoProvider();
    _createTreeView("system-task-manager.processViewer", processInfoProvider);
    _createTreeView("system-task-manager.networkViewer", connectionInfoProvider);
    context.subscriptions.push(vscode.commands.registerCommand("system-task-manager.forceKill", (item) => {
        if (!item.pid)
            return;
        process.kill(item.pid, "SIGKILL");
    }), vscode.commands.registerCommand("system-task-manager.kill", (item) => {
        if (!item.pid)
            return;
        process.kill(item.pid, "SIGTERM");
    }), vscode.commands.registerCommand("system-task-manager.refresh", () => {
        processInfoProvider.update();
        connectionInfoProvider.update();
    }));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map