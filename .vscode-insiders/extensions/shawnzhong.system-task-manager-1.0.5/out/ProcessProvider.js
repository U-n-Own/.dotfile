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
const vscode_1 = require("vscode");
const systeminformation_1 = require("systeminformation");
const ProcessTreeItem_1 = require("./ProcessTreeItem");
const utils_1 = require("./utils");
const POLL_INTERVAL = 1000;
class SysInfoProvider {
    constructor() {
        this._emitter = new vscode_1.EventEmitter();
        this.onDidChangeTreeData = this._emitter.event;
    }
    getTreeItem(processTreeItem) {
        return processTreeItem;
    }
    getParent(element) {
        return element._parent;
    }
    getChildren(element) {
        if (element) {
            return [];
        }
        if (this._root) {
            return this._root.getChildren();
        }
        this._root = new ProcessTreeItem_1.SysInfoTreeItem(undefined, 0);
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
class ProcessProvider extends SysInfoProvider {
    _getSysInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield systeminformation_1.processes();
            const processes = data.list
                .sort((p1, p2) => p1.pid - p2.pid)
                .map(process => {
                const { name, user, started, pid } = process;
                const load = `${process.pcpu}%`;
                const mem = utils_1.convertBytesToLargestUnit(process.mem_rss);
                const tooltip = [
                    `PID: ${pid}`,
                    `Name: ${name}`,
                    `CPU Load: ${load}`,
                    `Memory: ${mem}`,
                    `User: ${user}`,
                    `Start Time: ${started}`
                ].join("\n");
                const label = `${name} (${load}, ${mem})`;
                return { pid, tooltip, label };
            });
            const root = {};
            root.children = processes;
            return root;
        });
    }
}
exports.ProcessProvider = ProcessProvider;
//# sourceMappingURL=ProcessInfoProvider.js.map