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
const vscode = require("vscode");
const SysInfoTreeItem_1 = require("../SysInfoTreeItem");
const POLL_INTERVAL = 5000;
// Modified from https://github.com/weinand/vscode-processes/blob/master/src/extension.ts
class SysInfoProvider {
    constructor() {
        this._emitter = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._emitter
            .event;
    }
    getTreeItem(processTreeItem) {
        return processTreeItem;
    }
    getChildren(element) {
        if (element) {
            return [];
        }
        if (this._root) {
            return this._root.getChildren();
        }
        this._root = new SysInfoTreeItem_1.SysInfoTreeItem(0, "");
        return this._getSysInfo().then(root => {
            this._root.merge(root);
            return this._root.getChildren();
        });
    }
    stopUpdate() {
        clearTimeout(this._updateTimeoutId);
    }
    startUpdate() {
        this.update();
        this._updateTimeoutId = setTimeout(() => this.startUpdate(), POLL_INTERVAL);
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Updated ${new Date().toLocaleTimeString()}`);
            const root = yield this._getSysInfo();
            let processTreeItem = this._root.merge(root);
            if (processTreeItem) {
                // workaround for https://github.com/Microsoft/vscode/issues/40185
                if (processTreeItem === this._root) {
                    processTreeItem = undefined;
                }
                this._emitter.fire(processTreeItem);
            }
        });
    }
}
exports.SysInfoProvider = SysInfoProvider;
//# sourceMappingURL=SysInfoProvider.js.map