"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class SysInfoTreeItem extends vscode_1.TreeItem {
    constructor(parent, pid, id) {
        super("", vscode_1.TreeItemCollapsibleState.None);
        this._parent = parent;
        this._pid = pid;
        this.id = id;
    }
    getChildren() {
        return this._children || [];
    }
    /*
     * Update this item with the information from the given ProcessItem.
     * Returns the elementId of the subtree that needs to be refreshed or undefined if nothing has changed.
     */
    merge(process, newItems) {
        if (!process) {
            return undefined;
        }
        // update item's name
        const oldLabel = this.label;
        const oldTooltip = this.tooltip;
        this.tooltip = process.tooltip;
        this.label = process.label;
        let changed = this.label !== oldLabel || this.tooltip !== oldTooltip;
        // update children
        const childChanges = [];
        const nextChildren = [];
        if (process) {
            process.children = process.children || [];
            for (const child of process.children) {
                let found = this._children
                    ? this._children.find(c => child.id === c.id)
                    : undefined;
                if (!found) {
                    found = new SysInfoTreeItem(this, child.pid, child.id);
                    if (newItems) {
                        newItems.push(found);
                    }
                    changed = true;
                }
                const changedChild = found.merge(child, newItems);
                if (changedChild) {
                    childChanges.push(changedChild);
                }
                nextChildren.push(found);
            }
            if (this._children) {
                for (const child of this._children) {
                    const found = process.children.find(c => child.id === c.id);
                    if (!found) {
                        changed = true;
                    }
                }
            }
        }
        this._children = nextChildren;
        // update collapsible state
        const oldCollapsibleState = this.collapsibleState;
        // custom explorer bug: https://github.com/Microsoft/vscode/issues/40179
        this.collapsibleState =
            this._children.length > 0
                ? vscode_1.TreeItemCollapsibleState.Expanded
                : vscode_1.TreeItemCollapsibleState.None;
        if (this.collapsibleState !== oldCollapsibleState) {
            changed = true;
        }
        // attribute changes or changes in more than one child
        if (changed || childChanges.length > 1) {
            return this;
        }
        // changes only in one child -> propagate that child for refresh
        if (childChanges.length === 1) {
            return childChanges[0];
        }
        // no changes
        return undefined;
    }
}
exports.SysInfoTreeItem = SysInfoTreeItem;
//# sourceMappingURL=ProcessTreeItem.js.map