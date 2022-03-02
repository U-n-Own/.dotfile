"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Units;
(function (Units) {
    Units[Units["B"] = 1] = "B";
    Units[Units["KB"] = 1024] = "KB";
    Units[Units["MB"] = 1048576] = "MB";
    Units[Units["GB"] = 1073741824] = "GB";
})(Units || (Units = {}));
// Got from https://github.com/Njanderson/resmon/blob/master/src/extension.ts
function convertBytesToLargestUnit(bytes, precision = 2) {
    let unit = Units.B;
    while (bytes / unit >= 1024 && unit < Units.GB) {
        unit *= 1024;
    }
    return `${(bytes / unit).toFixed(precision)} ${Units[unit]}`;
}
exports.convertBytesToLargestUnit = convertBytesToLargestUnit;
//# sourceMappingURL=utils.js.map