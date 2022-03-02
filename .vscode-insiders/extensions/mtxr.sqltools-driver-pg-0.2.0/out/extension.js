var a=Object.defineProperty,m=Object.prototype.hasOwnProperty,n=Object.assign,y=(s,r)=>()=>(r||(r={exports:{}},s(r.exports,r)),r.exports),p=s=>a(s,"__esModule",{value:!0}),b=(s,r)=>{p(s);for(var i in r)a(s,i,{get:r[i],enumerable:!0})},f=(s,r)=>{if(p(s),typeof r=="object"||typeof r=="function")for(let i in r)!m.call(s,i)&&i!=="default"&&a(s,i,{get:()=>r[i],enumerable:!0});return s},P=s=>s&&s.__esModule?s:f(a({},"default",{value:s,enumerable:!0}),s);var d=y((A,c)=>{c.exports={name:"sqltools-driver-pg",displayName:"SQLTools PostgreSQL/Redshift Driver",description:"SQLTools PostgreSQL/Redshift Driver",version:"0.2.0",engines:{vscode:"^1.42.0"},publisher:"mtxr",license:"MIT",private:!0,repository:{type:"git",url:"https://github.com/mtxr/vscode-sqltools.git",directory:"packages/drivers.pg"},bugs:{url:"https://github.com/mtxr/vscode-sqltools/labels/pg"},keywords:["sqltools-driver","postgre","postgres","postgresql","redshift","aws redshift"],galleryBanner:{theme:"dark",color:"#333333"},icon:"icon.png",categories:["Programming Languages","Snippets","Formatters","Other"],extensionDependencies:["mtxr.sqltools"],activationEvents:["*","onLanguage:sql","onCommand:sqltools.*"],main:"./out/extension.js",scripts:{clean:"rimraf -rf out dist *.vsix",predev:"yarn run clean",dev:'concurrently -k "npm:dev:*"',prebuild:"yarn run clean && yarn run tsc-check",build:'NODE_ENV=production concurrently "npm:build:*"',"build:ext":`yarn run compile:ext --define:process.env.NODE_ENV="'production'" --minify`,"build:ls":`yarn run compile:ls --define:process.env.NODE_ENV="'production'" --minify`,esbuild:"esbuild --platform=node --tsconfig=./tsconfig.json --external:vscode --log-level=error --color=true --format=cjs",prepackage:"yarn run build",package:"vsce package --yarn -o .","compile:ext":`yarn run esbuild --bundle ./src/extension.ts --outfile=./out/extension.js --target=es2017 --define:process.env.PRODUCT="'ext'"`,"compile:ls":`yarn run esbuild --bundle ./src/ls/plugin.ts --outfile=./out/ls/plugin.js --target=es2015 --define:process.env.PRODUCT="'ls'"`,"tsc-check":"yarn run ts --noEmit --preserveWatchOutput",watch:'concurrently "npm:watch:*"',"watch:ext":`yarn run compile:ext --define:process.env.NODE_ENV="'development'" --sourcemap`,"watch:ls":`yarn run compile:ls --define:process.env.NODE_ENV="'development'" --sourcemap`,"dev:tsc":"yarn run tsc-check -w","dev:fw":'chokidar "src/**/*" "*.json" --initial --silent -c "yarn run watch"',ts:"tsc -p ."},devDependencies:{"@sqltools/base-driver":"latest","@types/lodash":"^4.14.123","@types/pg":"^7.14.3","@types/vscode":"^1.42.0",concurrently:"^5.2.0","chokidar-cli":"^2.1.0",esbuild:"0.6.26",lodash:"^4.17.19",pg:"^8.2.1",rimraf:"^3.0.2",typescript:"^3.7.3",vsce:"1.77.0"}}});const o=[{displayName:"PostgreSQL",value:"PostgreSQL"},{displayName:"AWS Redshift",value:"AWS Redshift"}];b(exports,{activate:()=>O,deactivate:()=>S});const u=P(require("vscode")),{publisher:w,name:E}=d(),g="PostgreSQL/Redshift";async function O(s){const r=u.extensions.getExtension("mtxr.sqltools");if(!r)throw new Error("SQLTools not installed");await r.activate();const i=r.exports,l=`${w}.${E}`,v={extensionId:l,name:`${g} Plugin`,type:"driver",async register(e){e.resourcesMap().set(`driver/${o[0].value}/icons`,{active:s.asAbsolutePath("icons/pg/active.png"),default:s.asAbsolutePath("icons/pg/default.png"),inactive:s.asAbsolutePath("icons/pg/inactive.png")}),e.resourcesMap().set(`driver/${o[1].value}/icons`,{active:s.asAbsolutePath("icons/redshift/active.png"),default:s.asAbsolutePath("icons/redshift/default.png"),inactive:s.asAbsolutePath("icons/redshift/inactive.png")}),o.forEach(({value:t})=>{e.resourcesMap().set(`driver/${t}/extension-id`,l),e.resourcesMap().set(`driver/${t}/connection-schema`,s.asAbsolutePath("connection.schema.json")),e.resourcesMap().set(`driver/${t}/ui-schema`,s.asAbsolutePath("ui.schema.json"))}),await e.client.sendRequest("ls/RegisterPlugin",{path:s.asAbsolutePath("out/ls/plugin.js")})}};return i.registerPlugin(v),{driverName:g,parseBeforeSaveConnection:({connInfo:e})=>{const t=["connectionMethod","id","usePassword"];return e.usePassword&&(e.usePassword.toString().toLowerCase().includes("ask")?t.push("password"):e.usePassword.toString().toLowerCase().includes("empty")?(e.password="",t.push("askForPassword")):e.usePassword.toString().toLowerCase().includes("save")&&t.push("askForPassword")),t.forEach(h=>delete e[h]),e.pgOptions=e.pgOptions||{},e.pgOptions.enableSsl==="Enabled"?typeof e.pgOptions.ssl=="object"&&Object.keys(e.pgOptions.ssl).length===0&&(e.pgOptions.ssl=!0):e.pgOptions.enableSsl==="Disabled"&&delete e.pgOptions.ssl,delete e.pgOptions.enableSsl,Object.keys(e.pgOptions).length===0&&delete e.pgOptions,e},parseBeforeEditConnection:({connInfo:e})=>{const t=n(n({},e),{connectionMethod:"Server and Port"});return e.socketPath?t.connectionMethod="Socket File":e.connectString&&(t.connectionMethod="Connection String"),e.askForPassword?(t.usePassword="Ask on connect",delete t.password):typeof e.password=="string"&&(delete t.askForPassword,t.usePassword=e.password?"Save password":"Use empty password"),t.pgOptions=t.pgOptions||{},t.pgOptions.ssl?(t.pgOptions.enableSsl="Enabled",typeof t.pgOptions.ssl=="boolean"&&(t.pgOptions.ssl={})):t.pgOptions.enableSsl="Disabled",t},driverAliases:o}}function S(){}
