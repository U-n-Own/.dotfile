"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class InteroLocationDecoder {
    decode(interoLocation) {
        return this.buildLocation(interoLocation);
    }
    buildLocation(interoLocation) {
        const { filePath, rangeInFile } = this.splitPathAndRange(interoLocation);
        const uri = vscode.Uri.file(filePath);
        const range = this.extractRange(rangeInFile);
        return new vscode.Location(uri, range);
    }
    splitPathAndRange(interoLocation) {
        const separatorIndex = interoLocation.lastIndexOf(':');
        return {
            filePath: interoLocation.slice(0, separatorIndex),
            rangeInFile: interoLocation.slice(separatorIndex + 1)
        };
    }
    extractRange(symbolLoc) {
        const [line1, column1, line2, column2] = symbolLoc
            .match(/^\((\d+),(\d+)\)-\((\d+),(\d+)\)$/)
            .slice(1, 5)
            .map(num => parseInt(num, 10) - 1);
        return new vscode.Range(line1, column1, line2, column2);
    }
}
exports.default = InteroLocationDecoder;
//# sourceMappingURL=InteroLocationDecoder.js.map