'use strict';const a1_0xa933=['_onDidWriteText','writeTextInternal','readText','defaultClipboard','VSCodeClipboard','8skFXwc','__esModule','233594audWZY','then','thread\x20\x27main\x27\x20panicked\x20at\x20\x27Error:\x20Could\x20not\x20paste\x20from\x20clipboard:\x20Error\x20{\x20repr:\x20Os\x20{\x20code:\x200,\x20message:','readTextInternal','EventEmitter','done','7DmodPG','env','BaseClipboard','push','vscode','30908lGluMn','stderr','defineProperty','next','clipboardy','forEach','clipboard','onDidWriteText','56mZXuSp','ClipboardyClipboard','22052NvdybP','_onDidWillWriteText','onDidWillWriteText','value','read','startsWith','platform','1872DUWZIC','writeText','32623vRrEMY','fire','815595iJLVCb','dispose','847774uTwjzm','_disposables','__awaiter'];const a1_0x22a3=function(_0x1da0e8,_0x2718d6){_0x1da0e8=_0x1da0e8-0x121;let _0xa93304=a1_0xa933[_0x1da0e8];return _0xa93304;};const a1_0x540c73=a1_0x22a3;(function(_0x4ddb4a,_0x4fa15c){const _0x34cda9=a1_0x22a3;while(!![]){try{const _0x1fc64e=parseInt(_0x34cda9(0x128))+-parseInt(_0x34cda9(0x14a))+-parseInt(_0x34cda9(0x126))*-parseInt(_0x34cda9(0x133))+parseInt(_0x34cda9(0x148))+-parseInt(_0x34cda9(0x13d))+parseInt(_0x34cda9(0x12e))*parseInt(_0x34cda9(0x146))+parseInt(_0x34cda9(0x13b))*-parseInt(_0x34cda9(0x144));if(_0x1fc64e===_0x4fa15c)break;else _0x4ddb4a['push'](_0x4ddb4a['shift']());}catch(_0x4fdaf5){_0x4ddb4a['push'](_0x4ddb4a['shift']());}}}(a1_0xa933,0x8650c));var __awaiter=this&&this[a1_0x540c73(0x14c)]||function(_0x2c667f,_0x356ec7,_0x435232,_0x14e5b4){function _0x4e8849(_0x25dba5){return _0x25dba5 instanceof _0x435232?_0x25dba5:new _0x435232(function(_0x15edbe){_0x15edbe(_0x25dba5);});}return new(_0x435232||(_0x435232=Promise))(function(_0xe6340f,_0x5e36e9){const _0x5bbe5d=a1_0x22a3;function _0x35fe87(_0x4b08b1){const _0x29190e=a1_0x22a3;try{_0x26b72c(_0x14e5b4[_0x29190e(0x136)](_0x4b08b1));}catch(_0x2f0546){_0x5e36e9(_0x2f0546);}}function _0xacb640(_0x56ef6f){try{_0x26b72c(_0x14e5b4['throw'](_0x56ef6f));}catch(_0xd2c61a){_0x5e36e9(_0xd2c61a);}}function _0x26b72c(_0x4b8c0f){const _0x4ee594=a1_0x22a3;_0x4b8c0f[_0x4ee594(0x12d)]?_0xe6340f(_0x4b8c0f[_0x4ee594(0x140)]):_0x4e8849(_0x4b8c0f[_0x4ee594(0x140)])[_0x4ee594(0x129)](_0x35fe87,_0xacb640);}_0x26b72c((_0x14e5b4=_0x14e5b4['apply'](_0x2c667f,_0x356ec7||[]))[_0x5bbe5d(0x136)]());});};Object[a1_0x540c73(0x135)](exports,a1_0x540c73(0x127),{'value':!![]}),exports[a1_0x540c73(0x124)]=exports['getNewDefaultInstance']=exports[a1_0x540c73(0x13c)]=exports[a1_0x540c73(0x125)]=exports[a1_0x540c73(0x130)]=void 0x0;const clipboardy=require(a1_0x540c73(0x137)),vscode=require(a1_0x540c73(0x132));class BaseClipboard{constructor(){const _0x1340ce=a1_0x540c73;this['_disposables']=[],this[_0x1340ce(0x13e)]=new vscode['EventEmitter'](),this[_0x1340ce(0x13f)]=this['_onDidWillWriteText']['event'],this[_0x1340ce(0x121)]=new vscode[(_0x1340ce(0x12c))](),this[_0x1340ce(0x13a)]=this[_0x1340ce(0x121)]['event'],this[_0x1340ce(0x14b)][_0x1340ce(0x131)](this[_0x1340ce(0x13e)]),this[_0x1340ce(0x14b)][_0x1340ce(0x131)](this[_0x1340ce(0x121)]);}[a1_0x540c73(0x123)](){const _0x4edb59=a1_0x540c73;return this[_0x4edb59(0x12b)]();}[a1_0x540c73(0x145)](_0x4a8373){return __awaiter(this,void 0x0,void 0x0,function*(){const _0x346874=a1_0x22a3;this[_0x346874(0x13e)][_0x346874(0x147)](_0x4a8373),yield this[_0x346874(0x122)](_0x4a8373),this[_0x346874(0x121)]['fire'](_0x4a8373);});}['dispose'](){const _0x49f5de=a1_0x540c73;this[_0x49f5de(0x14b)][_0x49f5de(0x138)](_0x2fbd0f=>_0x2fbd0f[_0x49f5de(0x149)]());}}exports[a1_0x540c73(0x130)]=BaseClipboard;class VSCodeClipboard extends BaseClipboard{['readTextInternal'](){const _0x29bacc=a1_0x540c73;return vscode[_0x29bacc(0x12f)][_0x29bacc(0x139)][_0x29bacc(0x123)]();}['writeTextInternal'](_0x260094){const _0x278b77=a1_0x540c73;return vscode[_0x278b77(0x12f)][_0x278b77(0x139)][_0x278b77(0x145)](_0x260094);}}exports[a1_0x540c73(0x125)]=VSCodeClipboard;class ClipboardyClipboard extends BaseClipboard{[a1_0x540c73(0x12b)](){const _0x28f5cb=a1_0x540c73;let _0x51ea94=clipboardy[_0x28f5cb(0x141)]();return process[_0x28f5cb(0x143)]==='win32'&&(_0x51ea94=_0x51ea94[_0x28f5cb(0x129)](null,_0x4806db=>{const _0x167592=_0x28f5cb,_0x46cb56=_0x167592(0x12a);if(_0x4806db[_0x167592(0x134)]&&_0x4806db[_0x167592(0x134)][_0x167592(0x142)](_0x46cb56))return'';throw _0x4806db;})),_0x51ea94;}[a1_0x540c73(0x122)](_0x1eed82){return clipboardy['write'](_0x1eed82);}}exports[a1_0x540c73(0x13c)]=ClipboardyClipboard;function getNewDefaultInstance(){const _0xb75b97=a1_0x540c73;let _0x4d5bcd;try{vscode[_0xb75b97(0x12f)][_0xb75b97(0x139)][_0xb75b97(0x123)](),_0x4d5bcd=new VSCodeClipboard();}catch(_0x1260b9){}return!_0x4d5bcd&&(_0x4d5bcd=new ClipboardyClipboard()),_0x4d5bcd;}exports['getNewDefaultInstance']=getNewDefaultInstance,exports[a1_0x540c73(0x124)]=getNewDefaultInstance();