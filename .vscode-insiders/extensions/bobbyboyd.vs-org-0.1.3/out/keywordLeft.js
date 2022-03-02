"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const moment = require("moment");
module.exports = function () {
    vscode.commands.executeCommand("workbench.action.files.save").then(() => {
        const { activeTextEditor } = vscode.window;
        if (activeTextEditor && activeTextEditor.document.languageId === "vso") {
            const { document } = activeTextEditor;
            let characterArray = ["⊖ ", "⊙ ", "⊘ "];
            let position = activeTextEditor.selection.active.line;
            let current_line = document.lineAt(position);
            let nextLine = document.lineAt(position + 1);
            let unicode_char = characterDecode(characterArray);
            let line_leading_spaces = current_line.text.substr(0, current_line.text.indexOf(unicode_char));
            let text_after_unicode_char = current_line.text.replace(/[⊙⊘⊖\?]/g, "").trim();
            let date;
            let workspaceEdit = new vscode.WorkspaceEdit();
            //check if the char exists on the line
            if (current_line.text.includes(unicode_char)) {
                if (current_line.text.includes("TODO")) {
                    //remove keywords if there are any
                    let remove_todo = text_after_unicode_char.replace(/\b(TODO)\b/, "").trim();
                    //delete the current line
                    workspaceEdit.delete(document.uri, current_line.range);
                    //delete the completed line and move all the text below up
                    //inset the new text
                    workspaceEdit.insert(document.uri, current_line.range.start, line_leading_spaces + unicode_char + remove_todo);
                    return vscode.workspace.applyEdit(workspaceEdit).then(() => {
                        vscode.commands.executeCommand("workbench.action.files.save");
                    });
                }
                else if (!current_line.text.includes("DONE")) {
                    date = moment().format('Do MMMM YYYY, h:mm:ss a');
                    //check if the line doesnt includes TODO
                    workspaceEdit.delete(document.uri, current_line.range);
                    workspaceEdit.insert(document.uri, current_line.range.start, line_leading_spaces + unicode_char + "DONE " + text_after_unicode_char + "\n    COMPLETED:" + "[" + date + "]");
                    return vscode.workspace.applyEdit(workspaceEdit).then(() => {
                        vscode.commands.executeCommand("workbench.action.files.save");
                    });
                }
                else if (!current_line.text.includes("TODO")) {
                    let removeDone = text_after_unicode_char.replace(/\b(DONE)\b/, "").trim();
                    let removeDate = removeDone.replace(/\b(COMPLETED)\b(.*)/, "").trim();
                    // remove todo from the line
                    //delete the current text on the line
                    workspaceEdit.delete(document.uri, current_line.range);
                    workspaceEdit.delete(document.uri, nextLine.range);
                    //insert a new line for the completed line
                    //need to append file
                    workspaceEdit.insert(document.uri, current_line.range.start, line_leading_spaces + unicode_char + "TODO " + removeDate);
                    workspaceEdit.replace(document.uri, new vscode.Range(current_line.range.end, nextLine.range.start), "");
                    return vscode.workspace.applyEdit(workspaceEdit).then(() => {
                        vscode.commands.executeCommand("workbench.action.files.save");
                    });
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
        }
    });
};
//# sourceMappingURL=keywordLeft.js.map