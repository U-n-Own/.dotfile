"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
let characterArray = ["⊖ ", "⊙ ", "⊘ "];
module.exports = function () {
    const { activeTextEditor } = vscode.window;
    if (activeTextEditor && activeTextEditor.document.languageId === "vso") {
        const { document } = activeTextEditor;
        let direction = "right";
        let position = activeTextEditor.selection.active.line;
        let char = characterDecode(characterArray);
        let getCurrentLine = document.lineAt(position);
        let currentLineText = getCurrentLine.text;
        let removeDate = currentLineText.substring(currentLineText.indexOf("["), currentLineText.indexOf("]"));
        let datelessText = currentLineText.replace(removeDate, "");
        let formattedText = datelessText.replace(/[^\w\s!?]/g, "").trim();
        let getLeadingSpace = currentLineText.substr(0, currentLineText.indexOf(char));
        let date = new Date().toLocaleString();
        if (currentLineText.includes(char)) {
            let edit = new vscode.WorkspaceEdit();
            let removeEdit = new vscode.WorkspaceEdit();
            edit.delete(document.uri, getCurrentLine.range);
            if (direction === "right") {
                if (currentLineText.includes("DONE")) {
                    let removedKeyword = formattedText.replace(/\b(DONE|TODO)\b/gi, "").trim();
                    removeEdit.delete(document.uri, getCurrentLine.range);
                    removeEdit.insert(document.uri, getCurrentLine.range.start, getLeadingSpace + char + removedKeyword);
                    return vscode.workspace.applyEdit(removeEdit);
                }
                else if (!currentLineText.includes("TODO")) {
                    edit.insert(document.uri, getCurrentLine.range.start, getLeadingSpace + char + "TODO " + formattedText);
                }
                else if (!currentLineText.includes("DONE")) {
                    let removeTodo = formattedText.replace(/\b(TODO)\b/gi, "").trim();
                    edit.insert(document.uri, getCurrentLine.range.start, getLeadingSpace + char + "DONE " + "[" + date + "] " + removeTodo);
                }
                vscode.workspace.applyEdit(edit);
            }
            else {
                if (currentLineText.includes(char)) {
                    let edit = new vscode.WorkspaceEdit();
                    let removeEdit = new vscode.WorkspaceEdit();
                    edit.delete(document.uri, getCurrentLine.range);
                    if (currentLineText.includes("TODO")) {
                        //remove the keyword
                        let removedKeyword = formattedText.replace(/\b(DONE|TODO)\b/gi, "").trim();
                        removeEdit.delete(document.uri, getCurrentLine.range);
                        removeEdit.insert(document.uri, getCurrentLine.range.start, getLeadingSpace + char + removedKeyword);
                        return vscode.workspace.applyEdit(removeEdit);
                    }
                    else if (!currentLineText.includes("DONE")) {
                        edit.insert(document.uri, getCurrentLine.range.start, getLeadingSpace + char + "DONE " + "[" + date + "] " + formattedText);
                    }
                    else if (!currentLineText.includes("TODO")) {
                        let removeDone = formattedText.replace(/\b(DONE)\b/gi, "").trim();
                        edit.insert(document.uri, getCurrentLine.range.start, getLeadingSpace + char + "TODO" + " " + removeDone);
                    }
                    vscode.workspace.applyEdit(edit);
                }
            }
        }
    }
    function characterDecode(characterArray) {
        const { activeTextEditor } = vscode.window;
        if (activeTextEditor && activeTextEditor.document.languageId === "vso") {
            const { document } = activeTextEditor;
            let position = activeTextEditor.selection.active.line;
            const getCurrentLine = document.lineAt(position);
            let currentLineText = getCurrentLine.text;
            for (let i = 0; i < characterArray.length; i++) {
                if (currentLineText.includes(characterArray[i])) {
                    return characterArray[i];
                }
            }
        }
    }
};
//# sourceMappingURL=keyword.js.map