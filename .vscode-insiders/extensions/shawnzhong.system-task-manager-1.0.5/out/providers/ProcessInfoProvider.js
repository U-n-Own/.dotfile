"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const si = require("systeminformation");
const utils_1 = require("../utils");
const SysInfoProvider_1 = require("./SysInfoProvider");
class ProcessInfoProvider extends SysInfoProvider_1.SysInfoProvider {
    _getSysInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield si.processes();
            const processes = data.list
                .sort((p1, p2) => p1.pid - p2.pid)
                .map(process => {
                const { name, user, started, pid, command, params } = process;
                const id = pid.toString();
                const load = `${process.pcpu}%`;
                const mem = utils_1.convertBytesToLargestUnit(process.mem_rss);
                const label = `${name} (${load}, ${mem})`;
                const tooltip = [
                    `Process: ${name} (${pid})`,
                    `CPU Load: ${load}`,
                    `Memory: ${mem}`,
                    `User: ${user}`,
                    `Start Time: ${started}`,
                    `Command: ${command} ${params}`
                ].join("\n");
                return { id, pid, tooltip, label };
            });
            const root = {};
            root.children = processes;
            return root;
        });
    }
}
exports.ProcessInfoProvider = ProcessInfoProvider;
//# sourceMappingURL=ProcessInfoProvider.js.map