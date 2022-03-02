"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
class TreeViewProvider {
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        let config = vscode.workspace.getConfiguration("vsorg");
        let folderPath = config.get("folderPath");
        let nFiles;
        if (!folderPath) {
            vscode.window.showWarningMessage("No folder path specified in the settings. Run VS-Org: Change VS-Org Directory.");
            return Promise.resolve([]);
        }
        if (element) {
            return Promise.resolve(this.getTodos);
        }
    }
    getTodos(filePath) {
        if (filePath) {
            fs.readdir(filePath, function (err, files) {
                if (err) {
                    return [];
                }
                files.forEach(function (file) {
                    fs.readFile(filePath + file, "utf-8", function (err, content) {
                        if (err) {
                            return [];
                        }
                        return new TreeItem(file, vscode.TreeItemCollapsibleState.Collapsed);
                    });
                });
            });
        }
        return [];
    }
}
exports.TreeViewProvider = TreeViewProvider;
class TreeItem extends vscode.TreeItem {
    constructor(label, collapsibleState, command) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.command = command;
    }
    getTooltip() {
        return `${this.label}`;
    }
}
//# sourceMappingURL=treeview.js.map