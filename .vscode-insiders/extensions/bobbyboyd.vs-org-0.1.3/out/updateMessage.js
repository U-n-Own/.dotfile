"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const opn = require('opn');
module.exports = function () {
    //show the changelog message, flip true and false every update 
    if (vscode.workspace.getConfiguration("vsorg").get("showChangeMessage") === true) {
        let config = vscode.workspace.getConfiguration("vsorg");
        config.update("showChangeMessage", false);
        vscode.window.showInformationMessage("VS-Org was just updated to v0.1.0, view the change log here.", ...['View Change log']).then(selection => {
            opn('https://github.com/robaboyd/vs-org/blob/master/CHANGELOG.md');
        });
    }
};
class WindowMessage {
    constructor(theType, theMessage, showButton, theButtonText, useUrl) {
        this.type = theType;
        this.message = theMessage;
        this.haveButton = showButton;
        this.buttonText = theButtonText;
        this.haveUrl = useUrl;
    }
    showMessage() {
        //information type
        if (this.type === "information") {
            //open in browswer
            if (this.haveUrl === true && this.haveButton === true) {
                vscode.window.showInformationMessage(this.message, ...[this.buttonText]).then(selection => {
                    opn(this.haveUrl);
                });
            }
            else {
                vscode.window.showErrorMessage(this.message);
            }
        }
        else if (this.type === "warning") {
            //open in browswer
            if (this.haveUrl === true && this.haveButton === true) {
                vscode.window.showWarningMessage(this.message, ...[this.buttonText]).then(selection => {
                    opn(this.haveUrl);
                });
            }
            else {
                vscode.window.showErrorMessage(this.message);
            }
        }
        else if (this.type === "error") {
            //open in browswer
            if (this.haveUrl === true && this.haveButton === true) {
                vscode.window.showErrorMessage(this.message, ...[this.buttonText]).then(selection => {
                    opn(this.haveUrl);
                });
            }
            else {
                vscode.window.showErrorMessage(this.message);
            }
        }
    }
}
"VS-Org was just updated to v0.1.0, view the change log here.", ;
['View Change log'];
//# sourceMappingURL=updateMessage.js.map