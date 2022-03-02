'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require('fs');
const commands_1 = require("./Basic/commands");
const buttons_1 = require("./Basic/buttons");
const InteroSpawn_1 = require("./Providers/InteroSpawn");
const index_1 = require("./Providers/Completion/index");
const Definition_1 = require("./Providers/Definition");
const Reference_1 = require("./Providers/Reference");
const index_2 = require("./Providers/Type/index");
function activate(context) {
    const config = vscode.workspace.getConfiguration('haskelly');
    const documentPath = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.document.uri.fsPath
        : vscode.workspace.textDocuments[0].uri.fsPath;
    /* Init commands */
    commands_1.default(context);
    /* Init bottom buttons */
    buttons_1.default(context);
    /* Init Intero process */
    InteroSpawn_1.default.getInstance().tryNewIntero(documentPath)
        .catch(error => console.log(error));
    const sel = [
        { language: 'haskell', scheme: 'file' },
        { language: 'haskell', scheme: 'untitled' }
    ];
    /* Type hover */
    context.subscriptions.push(vscode.languages.registerHoverProvider(sel, new index_2.default()));
    /* Code completion */
    if (config['codeCompletion'] === false) {
        console.log('Disabled code completion');
    }
    else {
        context.subscriptions.push(vscode.languages.registerCompletionItemProvider(sel, new index_1.default(context), '.', '\"'));
    }
    /* Definition */
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(sel, new Definition_1.default(InteroSpawn_1.default.getInstance())));
    /* Reference */
    context.subscriptions.push(vscode.languages.registerReferenceProvider(sel, new Reference_1.default(InteroSpawn_1.default.getInstance())));
    /* Custom snippets */
    const snippetsFilePath = `${context.extensionPath}/languages/snippets/haskell.json`;
    fs.readFile(snippetsFilePath, 'utf8', (err, data) => {
        if (err)
            console.log(err);
        else {
            const snippets = JSON.parse(data);
            const mergedSnippets = Object.assign({}, snippets, config['snippets']['custom']);
            // Modify the snippets file
            fs.writeFile(snippetsFilePath, JSON.stringify(mergedSnippets, null, 4), function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
}
exports.activate = activate;
function deactivate() {
    // Cleanup of Spawn process
    InteroSpawn_1.default.getInstance().killCurrentShell();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map