"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const os = require("os");
class SetDir {
    constructor() {
        this.config = vscode.workspace.getConfiguration("vsorg");
        this.folderPath = this.config.get("folderPath");
    }
    setMainDir() {
        if (this.folderPath === "") {
            let homeDir = os.homedir();
            if (os.platform() === "darwin" || os.platform() === "linux") {
                this.folder = homeDir + "/VSOrgFiles";
            }
            else {
                this.folder = homeDir + "\\VSOrgFiles";
            }
        }
        else {
            this.folder = this.folderPath;
        }
        return this.folder;
    }
}
exports.SetDir = SetDir;
//# sourceMappingURL=setMainDir.js.map