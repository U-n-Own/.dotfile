"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const newFile = require("./newFile");
const changeDirectory = require("./changeDirectory");
const keywordRight = require("./keywordRight");
const keywordLeft = require("./keywordLeft");
const moveUp = require("./moveUp");
const moveDown = require("./moveDown");
const getTags = require("./tags");
const titles = require("./titles");
const increment = require("./incrementHeadings");
const decrement = require("./decrementHeadings");
const scheduling = require("./scheduling");
const agenda = require("./agenda/agenda");
const updateDates = require("./updateDate");
const GO_MODE = { language: "vso", scheme: "file" };
class GoOnTypingFormatter {
    provideOnTypeFormattingEdits(document, position, ch, options, token) {
        return new Promise((resolve, reject) => {
            const { activeTextEditor } = vscode.window;
            if (activeTextEditor && activeTextEditor.document.languageId === "vso") {
                const { document } = activeTextEditor;
                let currentLine = document.lineAt(position);
                if (currentLine.text.indexOf("⊙") === -1 && currentLine.text.indexOf("⊘") === -1 && currentLine.text.indexOf("⊖") === -1) {
                    console.log(currentLine.text.indexOf("⊙"));
                    if (currentLine.text.indexOf("*") > -1) {
                        let numOfAsterisk = currentLine.text.split("*").length - 1;
                        for (var i = 0; i < currentLine.text.length; i++) {
                            // TODO clean this up
                            resolve(textEdit(setUnicodeChar(numOfAsterisk), position, document, numOfSpaces(numOfAsterisk)));
                        }
                    }
                }
            }
        });
    }
}
/**
 * Get the number of asterisks that are on the line and return
 * the corrisponding unicode character
 *
 * @param asterisks Get the number of asterisks
 *
 * @returns {array} the first item in the characters array
 */
function setUnicodeChar(asterisks) {
    let characters = ["⊖ ", "⊙ ", "⊘ "];
    for (let i = 0; i < asterisks; i++) {
        characters.push(characters.shift());
    }
    return characters[0];
}
// text edit function
function textEdit(char, position, document, spaces) {
    const getRange = document.lineAt(position).range;
    let removeText = vscode.TextEdit.delete(getRange);
    let insertText = vscode.TextEdit.insert(position, spaces + char);
    return [removeText, insertText];
}
// number of spaces to add function
function numOfSpaces(asterisk) {
    let spacesArray = [];
    for (let i = 1; i < asterisk; i++) {
        spacesArray.push(" ");
    }
    return spacesArray.join("");
}
//activate function, format on space bar press
function activate(ctx) {
    vscode.commands.registerCommand("extension.viewAgenda", agenda);
    //run updateDates on config change
    vscode.commands.registerCommand("extension.updateDates", updateDates);
    vscode.workspace.onDidChangeConfiguration((event) => {
        let settingChanged = event.affectsConfiguration("vsorg.dateFormat");
        if (settingChanged) {
            vscode.commands.executeCommand('extension.updateDates');
        }
    });
    //add a folder path
    vscode.commands.registerCommand("extension.setFolderPath", changeDirectory);
    //create a new file
    vscode.commands.registerCommand("extension.createVsoFile", newFile);
    //list tags
    vscode.commands.registerCommand("extension.getTags", getTags);
    vscode.commands.registerCommand("extension.getTitles", titles);
    //add TODO or DONE right
    vscode.commands.registerCommand("extension.toggleStatusRight", keywordRight);
    //add TODO or DONE left
    vscode.commands.registerCommand("extension.toggleStatusLeft", keywordLeft);
    //schedule
    vscode.commands.registerCommand("extension.scheduling", scheduling);
    //alt + shift + up
    vscode.commands.registerCommand("extension.moveBlockUp", moveUp);
    //alt + shift + down
    vscode.commands.registerCommand("extension.moveBlockDown", moveDown);
    //alt+right
    vscode.commands.registerCommand("extension.increment", increment);
    //alt+left
    vscode.commands.registerCommand("extension.decrement", decrement);
    ctx.subscriptions.push(vscode.languages.registerOnTypeFormattingEditProvider(GO_MODE, new GoOnTypingFormatter(), " "));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map