'use strict';const a9_0x394a=['1MoabsC','name','getLevelData','version','push','done','1HIeJMW','1155431koDlli','completions','length','duration','parse','concat','246042gnJIsx','1246763wFWdxJ','GameSaveData','1012411cTnLvF','apply','./utilities','TaskSaveData','then','1396798YUKKIR','next','LevelSaveData','levels','reduce','lastLevel','log','615866mFDxwV','stringify','tasksData','1FdSkKG','defineProperty','moves','throw','save','data/save.json','4BBhBKd','1qfnPzQ','value','280691OTeLTi','datetime'];const a9_0x12e3=function(_0x3ccf12,_0x24949e){_0x3ccf12=_0x3ccf12-0xbd;let _0x394a51=a9_0x394a[_0x3ccf12];return _0x394a51;};const a9_0x11c0d1=a9_0x12e3;(function(_0x2bb01e,_0x2e6264){const _0x47fa04=a9_0x12e3;while(!![]){try{const _0x5efb9e=parseInt(_0x47fa04(0xc3))*parseInt(_0x47fa04(0xd5))+parseInt(_0x47fa04(0xcf))*parseInt(_0x47fa04(0xc8))+parseInt(_0x47fa04(0xce))*parseInt(_0x47fa04(0xd8))+parseInt(_0x47fa04(0xe4))+parseInt(_0x47fa04(0xbd))*-parseInt(_0x47fa04(0xc6))+-parseInt(_0x47fa04(0xdd))+-parseInt(_0x47fa04(0xd6))*parseInt(_0x47fa04(0xc4));if(_0x5efb9e===_0x2e6264)break;else _0x2bb01e['push'](_0x2bb01e['shift']());}catch(_0x2d6667){_0x2bb01e['push'](_0x2bb01e['shift']());}}}(a9_0x394a,0xcdf68));var __awaiter=this&&this['__awaiter']||function(_0x21b053,_0x2af030,_0x50b9db,_0x255759){function _0x3a7778(_0x4b7825){return _0x4b7825 instanceof _0x50b9db?_0x4b7825:new _0x50b9db(function(_0x457d99){_0x457d99(_0x4b7825);});}return new(_0x50b9db||(_0x50b9db=Promise))(function(_0x8bc497,_0x584739){const _0x3306ec=a9_0x12e3;function _0x4c7954(_0x29bf09){const _0x44d10b=a9_0x12e3;try{_0x18aee9(_0x255759[_0x44d10b(0xde)](_0x29bf09));}catch(_0x2120c0){_0x584739(_0x2120c0);}}function _0x1d2bb1(_0x1b8572){const _0x335b96=a9_0x12e3;try{_0x18aee9(_0x255759[_0x335b96(0xc0)](_0x1b8572));}catch(_0x21c13a){_0x584739(_0x21c13a);}}function _0x18aee9(_0x46ae9a){const _0x340db3=a9_0x12e3;_0x46ae9a[_0x340db3(0xcd)]?_0x8bc497(_0x46ae9a[_0x340db3(0xc5)]):_0x3a7778(_0x46ae9a['value'])[_0x340db3(0xdc)](_0x4c7954,_0x1d2bb1);}_0x18aee9((_0x255759=_0x255759[_0x3306ec(0xd9)](_0x21b053,_0x2af030||[]))['next']());});};Object[a9_0x11c0d1(0xbe)](exports,'__esModule',{'value':!![]}),exports[a9_0x11c0d1(0xdb)]=exports[a9_0x11c0d1(0xdf)]=exports[a9_0x11c0d1(0xd7)]=void 0x0;const utilities_1=require(a9_0x11c0d1(0xda)),moment=require('moment');class GameSaveData{constructor(){const _0xfbe80b=a9_0x11c0d1;this[_0xfbe80b(0xe0)]=[],this[_0xfbe80b(0xe2)]='',this['user']='',this[_0xfbe80b(0xcb)]='',this['vscode_version']='';}['load'](){return __awaiter(this,void 0x0,void 0x0,function*(){const _0x5db4e2=a9_0x12e3;try{let _0x52333b=JSON[_0x5db4e2(0xd3)](yield utilities_1['readFile']('data/save.json'));this[_0x5db4e2(0xe0)]=_0x52333b[_0x5db4e2(0xe0)],this[_0x5db4e2(0xe2)]=_0x52333b[_0x5db4e2(0xe2)];}catch(_0x3c7437){this['levels']=[];}});}[a9_0x11c0d1(0xc1)](_0x499fa2,_0x32e233){return __awaiter(this,void 0x0,void 0x0,function*(){const _0x24112d=a9_0x12e3;let _0x36919a=![];this[_0x24112d(0xe2)]=_0x499fa2;for(let _0x7ab8d6=0x0;_0x7ab8d6<this['levels']['length'];_0x7ab8d6++){let _0x277d1e=this[_0x24112d(0xe0)][_0x7ab8d6];_0x277d1e[_0x24112d(0xc9)]===_0x499fa2&&(_0x277d1e['completions']=_0x277d1e[_0x24112d(0xd0)]+0x1,_0x277d1e[_0x24112d(0xe6)]=_0x277d1e[_0x24112d(0xe6)][_0x24112d(0xd4)](_0x32e233),_0x36919a=!![]);}!_0x36919a&&this[_0x24112d(0xe0)][_0x24112d(0xcc)](new LevelSaveData(_0x499fa2,_0x32e233)),yield utilities_1['writeFile'](JSON[_0x24112d(0xe5)](this),_0x24112d(0xc2));});}[a9_0x11c0d1(0xca)](_0x5620d2){return __awaiter(this,void 0x0,void 0x0,function*(){const _0x429d08=a9_0x12e3;for(let _0x22d829=0x0;_0x22d829<this['levels']['length'];_0x22d829++){let _0x39cce5=this[_0x429d08(0xe0)][_0x22d829]['name'];if(_0x39cce5===_0x5620d2)return this[_0x429d08(0xe0)][_0x22d829];}return;});}['getLevelAvg'](){return __awaiter(this,void 0x0,void 0x0,function*(){const _0x2fd192=a9_0x12e3;function _0x115c55(_0x225728){return _0x225728['duration'];}function _0x242545(_0x38e016,_0x1f6c75){return _0x38e016+_0x1f6c75;}for(let _0x26a2d9=0x0;_0x26a2d9<this[_0x2fd192(0xe0)][_0x2fd192(0xd1)];_0x26a2d9++){let _0xb4992c=this[_0x2fd192(0xe0)][_0x26a2d9],_0x45bc2d=_0xb4992c['name'],_0x2cc4e2=_0xb4992c[_0x2fd192(0xe6)]['map'](_0x115c55)[_0x2fd192(0xe1)](_0x242545,0x0),_0x13b405=_0x2cc4e2/_0xb4992c[_0x2fd192(0xe6)]['length'];console[_0x2fd192(0xe3)](_0x45bc2d+'\x20'+_0x13b405);}});}}exports['GameSaveData']=GameSaveData;class LevelSaveData{constructor(_0x311fe4,_0x3f5c37){const _0xdd34c4=a9_0x11c0d1;this[_0xdd34c4(0xd0)]=0x1,this[_0xdd34c4(0xc9)]=_0x311fe4,this[_0xdd34c4(0xe6)]=_0x3f5c37;}}exports[a9_0x11c0d1(0xdf)]=LevelSaveData;class TaskSaveData{constructor(_0x2606c2,_0x54d328){const _0x16e2ef=a9_0x11c0d1;this[_0x16e2ef(0xc7)]=moment(),this[_0x16e2ef(0xbf)]=_0x2606c2,this[_0x16e2ef(0xd2)]=_0x54d328;}}exports[a9_0x11c0d1(0xdb)]=TaskSaveData;