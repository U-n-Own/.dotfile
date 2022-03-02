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
const SysInfoProvider_1 = require("./SysInfoProvider");
class ConnectionInfoProvider extends SysInfoProvider_1.SysInfoProvider {
    _getSysInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield si.networkConnections();
            const processes = {};
            data.forEach(connection => {
                const { process, pid, localaddress, localport, peeraddress, peerport, state, protocol } = connection;
                const tooltip = [
                    process ? `Process: ${process} (${pid})` : `PID: ${pid}`,
                    `Local: ${localaddress}:${localport}`,
                    `Remote: ${peeraddress}:${peerport}`,
                    `Protocal: ${protocol}`,
                    `State: ${state}`
                ].join("\n");
                const label = `${localport} → ${peeraddress}:${peerport}`;
                const id = label;
                processes[connection.localport] = { id, pid, tooltip, label };
            });
            const root = {};
            root.children = Object.values(processes);
            return root;
        });
    }
}
exports.ConnectionInfoProvider = ConnectionInfoProvider;
//# sourceMappingURL=ConnectionInfoProvider.js.map