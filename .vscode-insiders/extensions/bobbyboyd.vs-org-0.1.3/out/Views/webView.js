"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getWebviewContent(callback) {
    callback(`
   <!DOCTYPE html>
   <html lang="en">
   
   <head>
   <title>Agenda View</title>
   </head>
   <body>
   <p>Hello</p>
   </body> 
   
   </html>
   `);
}
module.exports = {
    getWebviewContent
};
//# sourceMappingURL=webView.js.map