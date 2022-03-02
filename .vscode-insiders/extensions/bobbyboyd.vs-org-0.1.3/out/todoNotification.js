"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
const setMainDir_1 = require("./setMainDir");
const os = require("os");
const path = require("path");
module.exports = function () {
    let getDirectory = new setMainDir_1.SetDir().setMainDir();
    let todoArray = [];
    let getDateFromTaskText;
    let textWithoutUnicode;
    getScheduledTodos();
    function getScheduledTodos() {
        fs.readdir(getDirectory, (err, items) => {
            //loop through all of the files in the directory
            for (let i = 0; i < items.length; i++) {
                //make sure its a vsorg file
                if (items[i].includes(".vsorg")) {
                    //read the file and puth the text in an array
                    let fileText;
                    if (os.platform() === "darwin" || os.platform() === "linux") {
                        fileText = fs
                            .readFileSync(getDirectory + "/" + items[i])
                            .toString()
                            .split(/\r?\n/);
                    }
                    else {
                        fileText = fs
                            .readFileSync(getDirectory + "\\" + items[i])
                            .toString()
                            .split(/\r?\n/);
                    }
                    fileText.forEach(element => {
                        // for each element check for scheduled and not done
                        if (element.includes("SCHEDULED") && element.includes("TODO")) {
                            textWithoutUnicode = element.replace(/[⊙⊘⊖\?]/g, "").trim();
                            textWithoutUnicode = textWithoutUnicode.replace(/\b(SCHEDULED)\b(.*)/, "").trim();
                            ;
                            getDateFromTaskText = element.match(/\[(.*)\]/);
                            if (new Date(getDateFromTaskText[1]).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
                                todoArray.push(items[i] + ":" + " LATE " + textWithoutUnicode);
                            }
                            if (new Date(getDateFromTaskText[1]).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) {
                                todoArray.push(items[i] + ": " + textWithoutUnicode);
                            }
                        }
                    });
                }
            }
            if (todoArray.length !== 0) {
                //set status bar
                const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
                status.text = "⏲: " + todoArray.length.toString();
                status.show();
                status.command = 'extension.showTodos';
                vscode.commands.registerCommand('extension.showTodos', () => {
                    vscode.window.showQuickPick(todoArray).then(todo => {
                        let splitTodo = todo.split(":");
                        let selectedFile = splitTodo[0];
                        let fullpath = path.join(getDirectory, selectedFile);
                        vscode.workspace.openTextDocument(vscode.Uri.file(fullpath)).then(doc => {
                            vscode.window.showTextDocument(doc, vscode.ViewColumn.Active, true);
                        });
                    });
                });
                // show message
                vscode.window.showInformationMessage("You have " + todoArray.length + " items scheduled TODO for today. ⏲", ...["View TODOs"]).then(selection => {
                    vscode.window.showQuickPick(todoArray).then(todo => {
                        let splitTodo = todo.split(":");
                        let selectedFile = splitTodo[0];
                        let fullpath = path.join(getDirectory, selectedFile);
                        vscode.workspace.openTextDocument(vscode.Uri.file(fullpath)).then(doc => {
                            vscode.window.showTextDocument(doc, vscode.ViewColumn.Active, true);
                        });
                    });
                });
            }
            else {
                const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
                status.text = "⏲: " + todoArray.length.toString();
                status.show();
            }
        });
    }
};
//# sourceMappingURL=todoNotification.js.map