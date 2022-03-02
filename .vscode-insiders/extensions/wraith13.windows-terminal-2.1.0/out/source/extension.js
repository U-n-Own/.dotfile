"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.executeWindowsTerminal = exports.makeDirectoryParam = exports.makeProfileParam = exports.getProfileStartingDirectory = exports.getSettings = exports.getSettingsJsonDocument = exports.parseJsonWithComment = exports.getCurrentFolder = exports.getSettingsJsonPath = exports.getDocumentUri = exports.getStoreUri = void 0;
const vscode = __importStar(require("vscode"));
const process = __importStar(require("process"));
const child_process = __importStar(require("child_process"));
const vscel = __importStar(require("@wraith13/vscel"));
const package_json_1 = __importDefault(require("../package.json"));
const package_nls_json_1 = __importDefault(require("../package.nls.json"));
const package_nls_ja_json_1 = __importDefault(require("../package.nls.ja.json"));
const locale = vscel.locale.make(package_nls_json_1.default, { "ja": package_nls_ja_json_1.default });
const statusBarAlignmentObject = Object.freeze({
    "none": undefined,
    "left": vscode.StatusBarAlignment.Left,
    "right": vscode.StatusBarAlignment.Right,
});
const statusBarCommandObject = Object.freeze({
    "windowsTerminal.open": "Open Windows Terminal",
    "windowsTerminal.openProfile": "Open Windows Terminal with Profile",
    "windowsTerminal.openSettings": "Open Windows Terminal's settings.json"
});
const directoryOptionPriorityObject = Object.freeze({
    "No specified": (_getVscodeSettingValue, _getWindowsTerminalSettingValue) => __awaiter(void 0, void 0, void 0, function* () { return null; }),
    "Prioritize Windows Terminal's settings": (getVscodeSettingValue, getWindowsTerminalSettingValue) => __awaiter(void 0, void 0, void 0, function* () { var _a; return (_a = yield getWindowsTerminalSettingValue()) !== null && _a !== void 0 ? _a : yield getVscodeSettingValue(); }),
    "Prioritize VS Code's settings": (getVscodeSettingValue, getWindowsTerminalSettingValue) => __awaiter(void 0, void 0, void 0, function* () { var _b; return (_b = yield getVscodeSettingValue()) !== null && _b !== void 0 ? _b : yield getWindowsTerminalSettingValue(); }),
});
var Config;
(function (Config) {
    Config.root = vscel.config.makeRoot(package_json_1.default);
    Config.debug = Config.root.makeEntry("windowsTerminal.debug");
    Config.statusBarText = Config.root.makeEntry("windowsTerminal.statusBarText");
    Config.statusBarAlignment = Config.root.makeMapEntry("windowsTerminal.statusBarAlignment", statusBarAlignmentObject);
    Config.statusBarCommand = Config.root.makeMapEntry("windowsTerminal.statusBarCommand", statusBarCommandObject);
    Config.settingsJsonPath = Config.root.makeEntry("windowsTerminal.settingsJsonPath");
    Config.defaultProfile = Config.root.makeEntry("windowsTerminal.defaultProfile");
    Config.directoryOptionPriority = Config.root.makeMapEntry("windowsTerminal.directoryOptionPriority", directoryOptionPriorityObject);
    Config.defaultDirectory = Config.root.makeEntry("windowsTerminal.defaultDirectory");
    Config.defaultOptions = Config.root.makeEntry("windowsTerminal.defaultOptions");
})(Config || (Config = {}));
const debug = (output) => {
    if (Config.debug.get("")) {
        console.debug(output);
    }
    return output;
};
var StatusBarItem;
(function (StatusBarItem) {
    let statusBarItem;
    StatusBarItem.make = () => statusBarItem = vscel.statusbar.createItem({
        alignment: Config.statusBarAlignment.get(""),
        text: Config.statusBarText.get(""),
        command: Config.statusBarCommand.getKey(""),
        tooltip: Config.statusBarCommand.get(""),
        withShow: null !== Config.statusBarAlignment.get(""),
    });
    StatusBarItem.update = () => {
        statusBarItem.text = Config.statusBarText.get("");
        statusBarItem.command = Config.statusBarCommand.getKey("");
        statusBarItem.tooltip = Config.statusBarCommand.get("");
        statusBarItem.show();
    };
})(StatusBarItem || (StatusBarItem = {}));
const getStoreUri = () => vscode.Uri.parse("https://www.microsoft.com/p/windows-terminal/9n0dx20hk701");
exports.getStoreUri = getStoreUri;
const getDocumentUri = () => vscode.Uri.parse("https://github.com/microsoft/terminal/tree/master/doc/user-docs");
exports.getDocumentUri = getDocumentUri;
const getSettingsJsonPath = () => __awaiter(void 0, void 0, void 0, function* () {
    const config = Config.settingsJsonPath.get("");
    if (null !== config && "" !== config) {
        return config;
    }
    // settings.json のパスは決め打ちで良いっぽい。 https://github.com/microsoft/terminal/blob/master/doc/user-docs/UsingJsonSettings.md
    return `${process.env["LOCALAPPDATA"]}\\Packages\\Microsoft.WindowsTerminal_8wekyb3d8bbwe\\LocalState\\settings.json`;
});
exports.getSettingsJsonPath = getSettingsJsonPath;
const getCurrentFolder = () => vscode.workspace.workspaceFolders &&
    0 < vscode.workspace.workspaceFolders.length ?
    vscode.workspace.workspaceFolders[0].uri.fsPath :
    null;
exports.getCurrentFolder = getCurrentFolder;
const parseJsonWithComment = (json) => JSON.parse(json.replace(/^\s*(\/\/.*)$/gm, ""));
exports.parseJsonWithComment = parseJsonWithComment;
const getSettingsJsonDocument = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield vscode.workspace.openTextDocument(yield exports.getSettingsJsonPath());
});
exports.getSettingsJsonDocument = getSettingsJsonDocument;
const getSettings = () => __awaiter(void 0, void 0, void 0, function* () {
    return exports.parseJsonWithComment((yield exports.getSettingsJsonDocument())
        .getText());
});
exports.getSettings = getSettings;
const getProfileStartingDirectory = (profile) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const settings = yield exports.getSettings();
    profile = profile !== null && profile !== void 0 ? profile : settings.defaultProfile;
    return (_d = (_c = settings.profiles.list
        .filter(i => i.guid === profile)[0]) === null || _c === void 0 ? void 0 : _c.startingDirectory) !== null && _d !== void 0 ? _d : null;
});
exports.getProfileStartingDirectory = getProfileStartingDirectory;
const makeProfileParam = (profile) => profile ? ` -p ${profile}` : "";
exports.makeProfileParam = makeProfileParam;
const makeDirectoryParam = (directory) => directory ? ` -d \"${directory}\"` : "";
exports.makeDirectoryParam = makeDirectoryParam;
const executeWindowsTerminal = (data = {}) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g;
    return child_process.exec(debug([
        "wt",
        (_e = Config.defaultOptions.get("")) !== null && _e !== void 0 ? _e : "",
        exports.makeProfileParam((_f = data.profile) !== null && _f !== void 0 ? _f : Config.defaultProfile.get("")),
        exports.makeDirectoryParam((_g = data.directory) !== null && _g !== void 0 ? _g : yield Config.directoryOptionPriority.get("")(() => __awaiter(void 0, void 0, void 0, function* () { var _h; return ((_h = Config.defaultDirectory.get("")) !== null && _h !== void 0 ? _h : exports.getCurrentFolder()); }), () => __awaiter(void 0, void 0, void 0, function* () { var _j; return yield exports.getProfileStartingDirectory((_j = data.profile) !== null && _j !== void 0 ? _j : Config.defaultProfile.get("")); }))),
    ]
        .join("")));
});
exports.executeWindowsTerminal = executeWindowsTerminal;
const activate = (context) => context.subscriptions.push(vscode.commands.registerCommand('windowsTerminal.showStore', () => __awaiter(void 0, void 0, void 0, function* () { return yield vscode.env.openExternal(exports.getStoreUri()); })), vscode.commands.registerCommand('windowsTerminal.showDocument', () => __awaiter(void 0, void 0, void 0, function* () { return yield vscode.env.openExternal(exports.getDocumentUri()); })), vscode.commands.registerCommand('windowsTerminal.open', () => __awaiter(void 0, void 0, void 0, function* () { return yield exports.executeWindowsTerminal(); })), vscode.commands.registerCommand('windowsTerminal.openProfile', () => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    const settings = yield exports.getSettings();
    (_k = (yield vscode.window.showQuickPick(settings.profiles.list
        .filter(p => !p.hidden)
        .map(p => ({
        label: p.name,
        description: settings.defaultProfile === p.guid ? "default" : undefined,
        detail: p.guid,
        command: () => __awaiter(void 0, void 0, void 0, function* () { return yield exports.executeWindowsTerminal({ profile: p.guid }); }),
    })), {
        placeHolder: locale.map("selectProfile"),
        matchOnDescription: true,
        matchOnDetail: true,
    }))) === null || _k === void 0 ? void 0 : _k.command();
})), vscode.commands.registerCommand('windowsTerminal.openSettings', () => __awaiter(void 0, void 0, void 0, function* () { return yield vscode.window.showTextDocument(yield exports.getSettingsJsonDocument()); })), vscode.workspace.onDidChangeConfiguration((event) => __awaiter(void 0, void 0, void 0, function* () {
    if (event.affectsConfiguration("windowsTerminal")) {
        Config.root.entries.forEach(i => i.clear());
        StatusBarItem.update();
    }
})), StatusBarItem.make());
exports.activate = activate;
const deactivate = () => { };
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map