var Cs=new Map;function pe(e,t,a,r,o,i,d,s,c="owner"){let u=Object.freeze({id:e,kind:t,version:a,cardinality:r,validate:o,identities:i,identityScope:c,serviceCalls:d,serviceMetadata:s});return Cs.set(`${t}:${e}@${a}`,u),u}var sa="edit",Rt=256,da=1e4;function kn(e){let t=new Map(e.map(a=>[a.name,a]));return{tools:e.map(({run:a,...r})=>Object.freeze({...r})),execute:async(a,r,o)=>{let i=t.get(a);if(!i)throw new Error(`Unknown provider-owned agent tool: ${a}`);return i.run(r,o)}}}var K=e=>!!e&&typeof e=="object"&&!Array.isArray(e),ce=(e,t)=>typeof e[t]=="function",bt=e=>e===void 0,$t=e=>typeof e=="boolean",G=e=>typeof e=="string",Ie=e=>e===void 0||G(e),Is=e=>e===void 0||typeof e=="number",Ds=e=>e===void 0||typeof e=="boolean",ae=(e,t)=>e.length===t.length&&t.every((a,r)=>a(e[r])),xe=e=>K(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),Er=e=>K(e),Ir=e=>K(e)&&G(e.id)&&G(e.title)&&G(e.date)&&(e.documentRef===void 0||K(e.documentRef)&&G(e.documentRef.pluginId)&&G(e.documentRef.sourceId)&&G(e.documentRef.itemId)),As=e=>K(e)&&G(e.date)&&Ie(e.startTime)&&Ie(e.endTime)&&Ie(e.sourceId)&&Ie(e.itemId),Ts=e=>K(e)&&G(e.url)&&Ie(e.title)&&Ds(e.newTab),Ns=e=>K(e)&&G(e.query),Dr=e=>K(e)&&G(e.name)&&Ie(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),Ps=e=>Array.isArray(e)&&e.every(Dr),Ms=e=>e===null||Dr(e),Os=e=>e===void 0||K(e)&&Ie(e.approvalToken)&&(e.cancellation===void 0||K(e.cancellation)),_s=e=>typeof e=="string"||K(e)&&typeof e.text=="string",Ls=e=>K(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&K(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&Ie(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),Ar=e=>K(e)&&G(e.id)&&G(e.label)&&Ie(e.labelKey)&&Ie(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(Ar)),Tr={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(Ir)},create:{args:e=>ae(e,[G,Er]),result:$t},update:{args:e=>ae(e,[G,Er]),result:$t},remove:{args:e=>ae(e,[G]),result:$t},open:{args:e=>ae(e,[G]),result:bt},configure:{args:e=>e.length===0,result:bt},actions:{args:e=>ae(e,[G]),result:e=>Array.isArray(e)&&e.every(Ar)},runAction:{args:e=>ae(e,[G,G]),result:$t}},Nr=e=>K(e)&&G(e.name)&&G(e.version)&&Ie(e.description)&&Ie(e.author)&&(e.localized===void 0||K(e.localized)&&Object.values(e.localized).every(t=>K(t)&&G(t.name)&&Ie(t.description))),la=pe("calendar.itemSource","service","1.3.0","many",e=>K(e)&&ce(e,"list")&&(e.integration===void 0||Nr(e.integration)),void 0,Tr,e=>e.integration),Ca=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e)&&Number.isFinite(Date.parse(`${e}T00:00:00Z`))&&new Date(`${e}T00:00:00Z`).toISOString().slice(0,10)===e,xn=e=>typeof e=="string"&&e.length>0&&e.length<=8192,zs=e=>K(e)&&Ca(e.startDate)&&Ca(e.endDate)&&e.startDate<=e.endDate&&typeof e.limit=="number"&&Number.isInteger(e.limit)&&e.limit>0&&e.limit<=Rt&&(e.cursor===void 0||xn(e.cursor)),Fs=e=>K(e)&&xn(e.revision)&&(e.cursor===void 0||xn(e.cursor))&&Array.isArray(e.items)&&e.items.length<=Rt&&e.items.every(t=>Ir(t)&&Ca(t.date)&&(t.endDate===void 0||Ca(t.endDate)&&t.endDate>=t.date))&&new Set(e.items.map(t=>t.id)).size===e.items.length,vt=pe("calendar.itemSource","service","2.0.0","many",e=>K(e)&&ce(e,"list")&&(e.integration===void 0||Nr(e.integration)),void 0,{...Tr,list:{args:e=>ae(e,[zs]),result:Fs}},e=>e.integration),Ia=pe("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),Sn=pe("calendar.navigator","service","1.0.0","one",e=>K(e)&&ce(e,"openDate"),void 0,{openDate:{args:e=>ae(e,[As]),result:bt}}),wt=pe("calendar.panelSelection","state","1.0.0","one",e=>K(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),$s=pe("web.activeContext","state","1.0.0","one",e=>K(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function Cr(e){return K(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(t=>K(t)&&typeof t.address=="string"&&(t.label===void 0||typeof t.label=="string"))}var Rs=pe("contacts.directory","service","1.0.0","one",e=>K(e)&&["search","resolveEmails","open"].every(t=>ce(e,t)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(Cr)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(t=>typeof t=="string"&&t.length<=1e3),result:e=>Array.isArray(e)&&e.every(t=>K(t)&&typeof t.address=="string"&&Array.isArray(t.contacts)&&t.contacts.every(Cr))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||K(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:bt}}),Ks=pe("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),En=pe("web.navigator","service","1.0.0","one",e=>K(e)&&ce(e,"open"),void 0,{open:{args:e=>ae(e,[Ts]),result:bt}}),Gs=pe("selection.textAction","extension","1.0.0","many",e=>K(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&ce(e,"run"),e=>[e.id]),Cn=pe("geo.navigator","service","1.0.0","one",e=>K(e)&&ce(e,"open"),void 0,{open:{args:e=>ae(e,[Ns]),result:bt}}),js=pe("geo.search","service","1.0.0","one",e=>K(e)&&ce(e,"search")&&ce(e,"reverse"),void 0,{search:{args:e=>ae(e,[G]),result:Ps},reverse:{args:e=>ae(e,[t=>Number.isFinite(t),t=>Number.isFinite(t)]),result:Ms}}),In=pe("agent.toolProvider","service","1.0.0","many",e=>K(e)&&Array.isArray(e.tools)&&e.tools.every(Ls)&&ce(e,"execute"),e=>e.tools.map(t=>t.name),{execute:{args:e=>ae(e,[G,K,Os]),result:_s}},e=>({tools:e.tools}),"global"),Vs=pe("guard.runtime","service","1.0.0","one",e=>K(e)&&["resolve","requestApproval","consumeToken","audit"].every(t=>ce(e,t)),void 0,{resolve:{args:e=>ae(e,[K]),result:K},requestApproval:{args:e=>ae(e,[K]),result:$t},consumeToken:{args:e=>e.length>=1&&e.length<=2&&G(e[0])&&Ie(e[1]),result:$t},audit:{args:e=>ae(e,[K]),result:bt}}),Us=pe("browser.automation","service","1.0.0","one",e=>K(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(t=>ce(e,t)),void 0,{list:{args:e=>e.length===0,result:xe},open:{args:e=>ae(e,[G]),result:xe},switch:{args:e=>ae(e,[G]),result:xe},close:{args:e=>ae(e,[G]),result:xe},snapshot:{args:e=>ae(e,[G]),result:xe},readText:{args:e=>e.length>=1&&e.length<=2&&G(e[0])&&Is(e[1]),result:xe},readHtml:{args:e=>ae(e,[G]),result:xe},screenshot:{args:e=>ae(e,[G]),result:xe},click:{args:e=>ae(e,[G,t=>typeof t=="number"]),result:xe},type:{args:e=>e.length>=3&&e.length<=4&&G(e[0])&&typeof e[1]=="number"&&G(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:xe},select:{args:e=>ae(e,[G,t=>typeof t=="number",G]),result:xe},scroll:{args:e=>ae(e,[G,t=>typeof t=="number",t=>typeof t=="number"]),result:xe},pressKey:{args:e=>ae(e,[G,G]),result:xe},navigate:{args:e=>ae(e,[G,G]),result:xe},back:{args:e=>ae(e,[G]),result:xe},forward:{args:e=>ae(e,[G]),result:xe},reload:{args:e=>ae(e,[G]),result:xe}}),Hs=pe("fileTree.contextItem","extension","1.0.0","many",e=>K(e)&&typeof e.id=="string"&&typeof e.label=="string"&&Ie(e.labelKey)&&ce(e,"run"),e=>[e.id]),qs=pe("newTab.entry","extension","1.0.0","many",e=>K(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&ce(e,"run"),e=>[e.id]),Bs=pe("search.resultCard","extension","1.0.0","many",e=>K(e)&&typeof e.cardKind=="string"&&ce(e,"render")&&ce(e,"open"),e=>[e.cardKind]),Kt=pe("metadataPanel.segment","extension","1.0.0","many",e=>K(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&ce(e,"render"),e=>[e.id]),Dn=pe("workspace.surface","extension","1.0.0","many",e=>K(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&ce(e,"getSnapshot")&&ce(e,"subscribe")&&ce(e,"restore"),e=>[e.id]),Ws=pe("metadata.plugin","extension","1.0.0","many",e=>K(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&ce(e,"facts"),e=>[e.id]),Ys=pe("workspace.viewState","extension","1.0.0","many",e=>K(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&ce(e,"capture")&&ce(e,"restore")&&ce(e,"subscribe"),e=>[e.id]);var Pr=["title","kind","aliases","frontmatter","mtimeMs","size","ctimeMs","links","linkPaths","embedPaths","tags","excluded"],Xs=new Set(["note","asset","view","other"]),Zs=e=>e.length>0&&e.length<=1024&&!["__proto__","constructor","prototype"].includes(e);function Mr(e){if(!e||typeof e!="object"||Array.isArray(e)||Object.keys(e).some(o=>!["kinds","extensions","pathPrefix","fields","frontmatterKeys"].includes(o)))throw new Error("Invalid index scope");let t=(o,i)=>{if(o!==void 0){if(!Array.isArray(o)||o.length>64||o.some(d=>typeof d!="string"||!i(d)))throw new Error("Invalid index scope selection");return[...new Set(o)].sort()}},a=e.pathPrefix;if(a!==void 0&&(typeof a!="string"||a.length>4096||a.startsWith("/")||a.includes("\\")||a.includes("\0")||a.split("/").some(o=>o==="."||o===".."||!o)))throw new Error("Invalid index path prefix");let r=t(e.fields,o=>Pr.includes(o))??[...Pr].sort();if(e.frontmatterKeys!==void 0&&!r.includes("frontmatter"))throw new Error("Frontmatter keys require the frontmatter field");return{fields:r,...e.kinds===void 0?{}:{kinds:t(e.kinds,o=>Xs.has(o))},...e.extensions===void 0?{}:{extensions:t(e.extensions,o=>/^\.[a-z0-9][a-z0-9._-]{0,31}$/.test(o))},...a===void 0?{}:{pathPrefix:a},...e.frontmatterKeys===void 0?{}:{frontmatterKeys:t(e.frontmatterKeys,Zs)}}}function Or(e,t){return e===t||!!(e&&t&&e.vaultGeneration===t.vaultGeneration&&e.scopeGeneration===t.scopeGeneration&&e.revision===t.revision)}function Tn(e,t){let a=Mr(t),r={status:"loading",version:null,entries:Object.freeze([])},o=new Map,i=!0,d=!1,s=!0,c=0,u,h,p,m=Promise.resolve(),y,S,I=new WeakMap,M=k=>{let q=I.get(k);return q||(q=k.dispose(),I.set(k,q)),q},L=new Set,R=k=>{if(i){r=Object.freeze(k);for(let q of[...L])if(L.has(q))try{q()}catch(z){console.error("Index observer listener failed",z)}}},N=new Error("Index revision changed during read"),b=(k,q)=>{if(!k||!["loading","ready","error"].includes(k.status)||!Array.isArray(k.entries)||!Array.isArray(k.missing)||!Number.isSafeInteger(k.count)||k.count<0||k.entries.some(z=>!z||typeof z.relPath!="string")||k.status==="ready"&&(!k.version||typeof k.version.scopeGeneration!="string"||!k.version.scopeGeneration||!Number.isSafeInteger(k.version.vaultGeneration)||!Number.isSafeInteger(k.version.revision)))throw new Error("Invalid index page");if(k.reset||q&&!Or(k.version,q))throw N;if(k.status==="error")throw new Error(k.error??"Index observation failed")},w=async()=>{if(d||!h||!i)return;d=!0;let k=0;try{for(;i&&s;){s=!1;let q=c,z=u;u=void 0;try{let U,B,ye="ready",de;if(z&&!z.reset&&r.status==="ready"&&r.version&&z.version&&z.version.vaultGeneration===r.version.vaultGeneration&&z.version.scopeGeneration===r.version.scopeGeneration&&z.previousRevision===r.version.revision&&z.version.revision===r.version.revision+1){U=new Map(o),B=z.version;let v=async D=>{if(!i||q!==c)throw N;let F;try{F=await h.read({version:B,keys:D})}catch(j){if(D.length>1&&j instanceof Error&&j.message==="Index keyed read exceeds page bounds; request fewer keys"){let E=Math.ceil(D.length/2);await v(D.slice(0,E)),await v(D.slice(E));return}throw j}if(b(F,B),F.missing.length||F.entries.length!==D.length||new Set(F.entries.map(j=>j.relPath)).size!==D.length||F.entries.some(j=>!D.includes(j.relPath)))throw N;for(let j of F.entries)U.set(j.relPath,j)};for(let D=0;D<z.changed.length;D+=128)await v(z.changed.slice(D,D+128));for(let D of z.deleted)U.delete(D);if(U.size!==z.count)throw N;de=Object.freeze({previousRevision:z.previousRevision,changed:Object.freeze(z.changed.map(D=>U.get(D)).filter(Boolean)),deleted:Object.freeze([...z.deleted])})}else{U=new Map,B=null;let v=0;for(;;){if(!i||q!==c)throw N;let D=await h.read({...B?{version:B}:{},offset:v,limit:128});b(D,B),B=D.version,ye=D.status;for(let F of D.entries){if(U.has(F.relPath))throw new Error("Duplicate index page entry");U.set(F.relPath,F)}if(D.next===null){if(U.size!==D.count)throw new Error("Incomplete index snapshot");break}if(!Number.isSafeInteger(D.next)||D.next<=v||!B)throw new Error("Invalid index page cursor");v=D.next}}if(!i||q!==c){s=i;continue}if(ye==="loading"){R({...r,status:ye,change:void 0});continue}let le=v=>{!v||typeof v!="object"||Object.isFrozen(v)||(Object.values(v).forEach(le),Object.freeze(v))};for(let v of U.values())le(v);o=U,R({status:ye,version:B,entries:Object.freeze([...U.values()]),...de?{change:de}:{}})}catch(U){if(!i)break;if((q!==c||U===N)&&++k<=3){s=!0,u=void 0;continue}s=!1,R({...r,status:"error",change:void 0,error:U instanceof Error?U.message:"Index observation failed"})}}}finally{d=!1}},P=()=>(!d&&i&&h&&(m=w()),m),_=()=>{p||!i||(p=Promise.resolve().then(()=>e.index.observe(a,k=>{i&&(c++,u=!s&&!d?k:void 0,s=!0,P())})).then(async k=>{if(!i){await M(k);return}h=k,await P()}).catch(k=>{if(!i)throw k;R({...r,status:"error",change:void 0,error:k instanceof Error?k.message:"Index observation failed"})}).finally(()=>{p=void 0}))};return _(),{getSnapshot:()=>r,subscribe(k){return L.add(k),()=>{L.delete(k)}},retry(){!i||y||(c++,u=void 0,s=!0,y=(async()=>{if(await p,await m,!i)return;let k=h;h=void 0,k&&await M(k),_()})().catch(k=>{if(!i)throw k;R({...r,status:"error",change:void 0,error:k instanceof Error?k.message:"Index observation failed"})}).finally(()=>{y=void 0}))},dispose(){return S||(i=!1,L.clear(),S=(async()=>{let q=(await Promise.allSettled([h?M(h):void 0,p,m,y])).find(z=>z.status==="rejected");if(q?.status==="rejected")throw q.reason})(),S)}}}var ca="valley";var Vc=`.${ca}`,Uc=`app.${ca}`;function Qs(e){return e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(/^\.?\/+/,"").replace(/\/+$/,"")}var Js=/^[a-zA-Z]:/;function Nn(e){if(typeof e!="string")return"";let t=Qs(e);return!t||t==="."||Js.test(t)||t.split("/").some(a=>a==="..")?"":t}function Aa(e){if(typeof e=="string")return Nn(e)||void 0}var Pe=`.${ca}`,ed="plugins",Ta=`${Pe}/${ed}`,td="external",Bc=`${Ta}/${td}`,Wc=`${Ta}/data`;var Yc=`${Ta}/plugin.json`,Xc=`${Ta}/config.json`,Zc=`${Pe}/state`,Gt=`${Pe}/settings`,jt=`${Pe}/app`,Na=`${Pe}/accounts`,Qc=`${Na}/providers`,Jc=`${Na}/providers.lock.json`,eu=`${Pe}/trash`,Pn=`${Pe}/cache`,tu=`${Pn}/accounts`,ad=`${Pn}/search`,au=`${Pn}/providers`;var nu=`${jt}/logs`,ru=`${jt}/whats-new`,ou=`${jt}/setup.json`,iu=`${ad}/index.jsonl`,su=`${jt}/recovery/drafts`,du=`${jt}/recovery/transactions`;var Da="design";var lu={app:`${jt}/app.json`,appearance:`${Pe}/${Da}/appearance.json`,pallette:`${Pe}/${Da}/pallette.json`,group:`${Pe}/${Da}/group.json`,metadata:`${Gt}/metadata.json`,notification:`${Gt}/notification.json`,preferences:`${Gt}/preferences.json`,markdown:`${Gt}/markdown.json`,files:`${Gt}/files.json`,search:`${Gt}/search.json`,design:`${Pe}/${Da}/appearance.json`,accounts:`${Na}/accounts.json`},cu=`${Na}/secrets.json`;var _r=ca,Lr="open";var zr=["http:","https:","mailto:","obsidian:"];var mu=[Pe,`${Pe}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];function Fr(e,t){return new Date(e,t,0).getDate()}function Vt(e,t,a){if(t<1||t>12||a<1||a>31)return!1;let r=new Date(e,t-1,a);return r.getFullYear()===e&&r.getMonth()===t-1&&r.getDate()===a}var rd=/^(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)(?:([^a-z])(dd|mm|yyyy))?$/;function Mn(e){let t=rd.exec(e.trim().toLowerCase());if(!t)return null;let a=[t[1],t[3],t[5]].filter(Boolean),r=[t[2],t[4]].filter(o=>o!==void 0);return new Set(a).size!==a.length||!a.includes("dd")||!a.includes("mm")?null:{tokens:a,separators:r}}var od={dd:"(\\d{1,2})",mm:"(\\d{1,2})",yyyy:"(\\d{4})"};function id(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function $r(e,t){let a=Mn(t);if(!a)return null;let{tokens:r,separators:o}=a,i=r.map((p,m)=>od[p]+(m<o.length?id(o[m]):"")).join(""),d=new RegExp(`^${i}$`).exec(e.trim());if(!d)return null;let s={};r.forEach((p,m)=>{s[p]=Number(d[m+1])});let c=s.dd,u=s.mm,h=s.yyyy;return Vt(h??2e3,u,c)?h==null?{month:u,day:c}:{year:h,month:u,day:c}:null}function Je(){let e=new Date;return{view:"month",cursor:`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-01`,selectedDate:null,rangeStart:null,rangeEnd:null,selectedTime:null,timeRange:null}}function dt(e){if(typeof e!="string"||!/^\d{4}-\d{2}-\d{2}$/.test(e))return!1;let[t,a,r]=e.split("-").map(Number);return Vt(t,a,r)}var On=e=>typeof e=="string"&&/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(e);function _n(e,t,a){if(!e||typeof e!="object"||Array.isArray(e))return null;let{start:r,end:o}=e;return!On(r)||!On(o)?null:(dt(t)&&dt(a)?`${t}T${r}`<`${a}T${o}`:r<o)?{start:r,end:o}:null}function Rr(e){let t=e&&typeof e=="object"?e:{},a=Je(),r=dt(t.rangeStart)?t.rangeStart:null,o=dt(t.rangeEnd)?t.rangeEnd:null;return{view:t.view==="week"||t.view==="year"||t.view==="month"?t.view:a.view,cursor:dt(t.cursor)?`${t.cursor.slice(0,7)}-01`:a.cursor,selectedDate:dt(t.selectedDate)?t.selectedDate:null,rangeStart:r,rangeEnd:o,selectedTime:On(t.selectedTime)?t.selectedTime:null,timeRange:_n(t.timeRange,r,o)}}var n,g,xt;function Kr(e){if(e.disposal)return e.disposal;e.disposed=!0,e.off?.();let t=[...e.values.values()];e.values.clear();let a=e.retired;return e.disposal=(async()=>{let o=(await Promise.allSettled([...t.map(i=>i.dispose()),a])).find(i=>i.status==="rejected");if(o?.status==="rejected")throw o.reason})(),e.disposal}function Gr(e){let t=g!==e&&xt?Kr(xt):void 0;t?.catch(()=>{}),g=e,n=e.React;let a=e.runtime.getOrCreate("calendar.readOwners",()=>({disposed:!1,epoch:0,values:new Map})),r=++a.epoch;a.retired=t??a.disposal??a.retired,a.disposal=void 0,a.disposed=!1,a.off?.();let o=e.getState().vault?.path;return a.off=e.subscribeState(["vault"],()=>{let i=e.getState().vault?.path;if(i!==o){o=i;for(let d of a.values.values())d.invalidate?.()}}),xt=a,()=>a.epoch===r?Kr(a):Promise.resolve()}function Ge(e,t){if(!xt||xt.disposed)throw new Error("Calendar read owner is disposed.");let a=xt.values.get(e);return a||(a=t(g),xt.values.set(e,a)),a}function kt(){return g.runtime.getOrCreate("calendar.revealTarget",()=>{let e={value:null,listeners:new Set,get:()=>e.value,publish:t=>{e.value=t;for(let a of[...e.listeners])a()},subscribe:t=>(e.listeners.add(t),()=>e.listeners.delete(t))};return e})}var sd=2400;function jr(e,t){let a=g.runtime.getOrCreate("calendar.revealPulse",()=>({nonce:0,timer:null})),r=kt();if(g.workspace.patchTimeControl({...e.view?{view:e.view}:{},cursor:`${e.date.slice(0,7)}-01`,selectedDate:e.date,selectedTime:e.startTime??null,timeRange:_n({start:e.startTime,end:e.endTime}),rangeStart:null,rangeEnd:null}),a.timer&&clearTimeout(a.timer),r.publish(null),e.itemId){let o={surface:t,sourceId:e.sourceId??"",itemId:e.itemId,date:e.date,nonce:++a.nonce};r.publish(o),a.timer=setTimeout(()=>{r.get()?.nonce===o.nonce&&r.publish(null),a.timer=null},sd)}}function Pa(e){jr(e,"main"),g.workspace.openMainTab()}function Vr(e){jr(e,"agenda"),g.workspace.revealOwnPanel("left_sidebar")}var Ur=`
/* \u2500\u2500 Calendar (ported from core App.css) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.calendar-view {
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
  height: 100%;
  color: var(--title-color);
  overflow: hidden;
}

.calendar-view.calendar-view-main,
.calendar-view.calendar-view-sidebar {
  gap: 0;
  padding: 0;
}

.calendar-view-main {
  container: calendar-main / inline-size;
}

/* Calendar top bar \u2014 37px content invariant (see CLAUDE.md). Full-bleed,
   sits above the padded body so the grid keeps its own inset. */
.calendar-topbar {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
  flex: 0 0 auto;
  height: var(--app-bar-height);
  box-sizing: border-box;
  padding: 0 10px;
  border-bottom: 1px solid var(--border-light);
  background: var(--container-color-alt);
}
.calendar-view-main .calendar-topbar {
  display: flex;
}
.calendar-view-main .calendar-topbar-actions {
  margin-right: var(--plugin-actions-offset, 0px);
}
.calendar-topbar-leading {
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
  min-width: 0;
  margin-left: var(--plugin-navigation-offset, 0px);
}
.calendar-topbar h2 {
  margin: 0;
  min-width: 0;
  font-size: 0.82rem;
  font-weight: var(--font-semi-bold);
  color: var(--title-color);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.calendar-view-main .calendar-topbar h2 {
  flex: 0 1 auto;
  text-align: left;
}
.calendar-topbar-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-2, 8px);
  margin-left: auto;
  min-width: 0;
  z-index: 1;
}
.calendar-topbar .calendar-filter-actions { flex: 0 0 auto; }
.calendar-topbar .calendar-switcher-inline { flex: 0 0 auto; }
.calendar-topbar .calendar-actions { flex: 0 0 auto; }
.calendar-view-main .calendar-topbar .calendar-switcher {
  align-self: center;
  height: 24px;
}
.calendar-view-main .calendar-topbar .calendar-switcher-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  padding: 0 8px;
  font-size: 0.72rem;
  line-height: 1;
}
.calendar-view-main .calendar-topbar .calendar-actions button {
  height: 24px;
  min-width: 24px;
  font-size: 0.7rem;
  line-height: 1;
}

@container calendar-main (max-width: 520px) {
  .calendar-view-main .calendar-topbar {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    height: auto;
  }
  .calendar-view-main .calendar-topbar-leading {
    min-height: var(--app-bar-height);
    margin-right: var(--plugin-actions-offset, 0px);
  }
  .calendar-view-main .calendar-topbar-actions {
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 0 var(--space-2, 8px);
  }
}

.calendar-view-sidebar .calendar-topbar {
  gap: 4px;
  padding: 0 6px;
}
.calendar-view-sidebar .calendar-topbar h2 {
  flex: 0 1 auto;
  font-size: 0.72rem;
  text-align: left;
}
.calendar-view-sidebar .calendar-topbar-actions {
  gap: 2px;
}
.calendar-view-sidebar .calendar-topbar .calendar-switcher {
  gap: 0;
  height: 22px;
}
.calendar-view-sidebar .calendar-topbar .calendar-switcher-btn {
  display: flex;
  align-items: center;
  height: 22px;
  padding: 0 5px;
  border-radius: 6px;
  font-size: 0.64rem;
  line-height: 1;
}
.calendar-view-sidebar .calendar-topbar .calendar-actions {
  gap: 0;
}
.calendar-view-sidebar .calendar-topbar .calendar-actions button {
  height: 22px;
  min-width: 20px;
  padding: 0 3px;
  font-size: 0.62rem;
  line-height: 1;
}

.calendar-view-body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-6);
  overflow: hidden;
}

.calendar-view-compact .calendar-view-body {
  gap: var(--space-4);
  padding: var(--space-4) var(--space-3);
  overflow-x: visible;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.calendar-header h2 {
  flex: 1;
  margin: 0;
  color: var(--title-color);
  font-size: 1.75rem;
  line-height: 1;
  font-weight: var(--font-semi-bold);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.calendar-view-main .calendar-header h2 {
  font-size: 1.75rem;
  flex: 1;
}
.calendar-view-main .calendar-header .calendar-switcher-inline {
  flex: 0 0 auto;
}
.calendar-view-main .calendar-header .calendar-actions {
  flex: 1;
  justify-content: flex-end;
}

.calendar-header h2 span,
.calendar-topbar h2 span {
  color: var(--accent-color);
}

.calendar-actions {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.calendar-actions button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  min-width: 28px;
  padding: 0 5px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-secondary);
  font-size: var(--smaller-font-size);
  font-weight: var(--font-semi-bold);
}

.calendar-actions button:hover {
  background: var(--hover-bg);
  color: var(--title-color);
}

/* Scrollable area below the view switcher \u2014 header + tabs stay pinned. */
.calendar-scroll-area {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}
.calendar-view-compact .calendar-scroll-area {
  gap: var(--space-4);
}
.calendar-view-compact .calendar-scroll-area[data-view='month'] {
  overflow-x: visible;
}
/* Month/year: stage must not shrink \u2014 its content height drives the scroll-area overflow. */
.calendar-scroll-area .calendar-stage {
  flex-shrink: 0;
}
/* Week view: grid handles its own internal scroll, no external overflow. */
.calendar-scroll-area[data-view='week'] {
  overflow: hidden;
}
.calendar-scroll-area[data-view='week'] .calendar-stage {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.calendar-scroll-area[data-view='week'] .calendar-grid-wrap {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.calendar-scroll-area[data-view='week'] .calendar-weekgrid {
  flex: 1 1 auto;
}

/* Animated stage that pages between months/weeks/years. The stage clips the
   horizontal slide; the inner wrap replays the keyframe on each period change
   (it remounts via a changing React key). */
.calendar-stage {
  overflow: hidden;
}
.calendar-grid-wrap {
  animation: cal-slide-in-right 0.26s cubic-bezier(0.22, 0.61, 0.36, 1) both;
}
.calendar-grid-wrap[data-dir='-1'] {
  animation-name: cal-slide-in-left;
}
@keyframes cal-slide-in-right {
  from { transform: translateX(35%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
@keyframes cal-slide-in-left {
  from { transform: translateX(-35%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .calendar-grid-wrap { animation: none; }
}

.calendar-grid {
  display: grid;
  grid-template-columns: 36px repeat(7, minmax(0, 1fr));
  row-gap: var(--space-3);
  align-items: center;
}

.calendar-view-compact .calendar-grid {
  grid-template-columns: 30px repeat(7, minmax(0, 1fr));
  column-gap: 1px;
  row-gap: var(--space-2);
}

.calendar-week-heading,
.calendar-day-heading,
.calendar-week-number {
  color: var(--text-secondary);
  font-size: var(--small-font-size);
  font-weight: var(--font-semi-bold);
  line-height: 1;
}

.calendar-view-compact .calendar-week-heading,
.calendar-view-compact .calendar-day-heading,
.calendar-view-compact .calendar-week-number {
  font-size: 0.68rem;
}

.calendar-week-heading {
  text-align: right;
  padding-right: var(--space-3);
}

.calendar-day-heading {
  text-align: center;
  letter-spacing: 0;
}

.calendar-week-number {
  padding-right: var(--space-3);
  border: none;
  border-right: 1px solid var(--border-medium);
  background: transparent;
  font: inherit;
  text-align: right;
  cursor: pointer;
}

.calendar-week-number:hover {
  color: var(--title-color);
}

.calendar-day {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  min-width: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--title-color);
  font-size: var(--normal-font-size);
  font-weight: var(--font-medium);
}

.calendar-view-main .calendar-day {
  width: 100%;
  max-width: 64px;
  justify-self: center;
}

.calendar-day:hover {
  background: var(--hover-bg);
}

.calendar-day.outside {
  color: color-mix(in srgb, var(--text-tertiary) 45%, transparent);
}

.calendar-day.today {
  color: var(--accent-color);
}

.calendar-day.selected {
  background: color-mix(in srgb, var(--accent-color) 20%, transparent);
  color: var(--title-color);
  border-radius: 50%;
}

.calendar-day.today.selected {
  color: var(--accent-color);
}

/* View switcher (Month / Week / Year) */
.calendar-switcher {
  display: flex;
  gap: 2px;
  align-self: center;
}
.calendar-switcher-inline { flex: 0 0 auto; }

.calendar-switcher-btn {
  padding: var(--space-1) var(--space-2);
  border: none;
  border-radius: var(--radius-lg);
  background: transparent;
  color: var(--text-secondary);
  font-size: var(--small-font-size);
  font-weight: var(--font-semi-bold);
}

.calendar-switcher-btn:hover {
  color: var(--title-color);
}

.calendar-switcher-btn.active {
  background: var(--accent-color);
  color: #fff;
  border-radius: var(--radius-lg);
}

/* Week view \u2014 single row of the 7 days */
.calendar-week-row {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: var(--space-2);
}

.calendar-week-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.calendar-week-cell .calendar-day {
  width: 100%;
  aspect-ratio: 1;
}

/* Year view \u2014 12 mini-month grids */
.calendar-year {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--space-4);
}

.calendar-view-compact .calendar-year {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
}

.calendar-mini {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-2);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  text-align: left;
}

.calendar-mini:hover {
  background: var(--hover-bg);
}

.calendar-mini-name {
  color: var(--title-color);
  font-size: var(--small-font-size);
  font-weight: var(--font-semi-bold);
}

.calendar-mini-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
}

.calendar-mini-heading {
  color: var(--text-tertiary);
  font-size: 0.55rem;
  text-align: center;
  line-height: 1.4;
}

.calendar-mini-day {
  color: var(--title-color);
  font-size: 0.62rem;
  text-align: center;
  line-height: 1.4;
}

.calendar-mini-day.outside {
  color: color-mix(in srgb, var(--text-tertiary) 40%, transparent);
}

.calendar-mini-day.today {
  color: var(--accent-color);
  font-weight: var(--font-semi-bold);
}

/* Selected-day Agenda section below the compact month grid. */
.calendar-todos {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1 1 auto;
  min-height: 0;
  box-sizing: border-box;
  margin-top: var(--space-3);
  margin-right: calc(-1 * var(--space-3));
  margin-left: calc(-1 * var(--space-3));
  padding: var(--space-2) 5px var(--space-4);
  border-top: 1px solid var(--border-light);
  background: transparent;
  overflow-y: auto;
}

.calendar-selected {
  margin-top: auto;
  padding-top: var(--space-3);
  color: var(--text-secondary);
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
}

/* \u2500\u2500 Planner: month day-cells with chips \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.calendar-view-main .calendar-grid {
  align-items: stretch;
  row-gap: 0;
  column-gap: 0;
  grid-auto-rows: auto;
  grid-template-rows: auto repeat(6, 1fr);
  border-right: 1px solid var(--border-light);
  border-bottom: 1px solid var(--border-light);
}

/* Header: W cell right-border + day headings left-border extend vertical lines into header row */
.calendar-view-main .calendar-week-heading {
  border-right: 1px solid var(--border-light);
}

.calendar-view-main .calendar-day-heading {
  border-left: 1px solid var(--border-light);
  padding: 6px 0;
}

.calendar-view-main .calendar-week-number {
  border-top: 1px solid var(--border-light);
  border-right: 1px solid var(--border-light);
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding-top: 6px;
}

.calendar-day-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  padding: 4px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  user-select: none;
}
.calendar-view-main .calendar-day-cell {
  min-height: 78px;
  align-items: stretch;
  border-top: 1px solid var(--border-light);
  border-left: 1px solid var(--border-light);
  border-radius: 0;
  padding: 1px 1px;
}
.calendar-day-cell:hover { background: var(--hover-bg); }
.calendar-day-cell.in-range { background: color-mix(in srgb, var(--accent-color) 14%, transparent); }
.calendar-day-cell.outside .calendar-day-num {
  color: color-mix(in srgb, var(--text-tertiary) 45%, transparent);
}

.calendar-day-cell-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}
.calendar-view-compact .calendar-day-cell {
  align-items: center;
  aspect-ratio: 1;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.calendar-view-compact .calendar-day-cell-head { justify-content: center; }

.calendar-day-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: var(--normal-font-size);
  font-weight: var(--font-medium);
  color: var(--title-color);
  transition: background 0.12s ease, color 0.12s ease;
}
.calendar-day-cell.today .calendar-day-num { color: var(--accent-color); }
.calendar-day-cell.selected .calendar-day-num {
  background: color-mix(in srgb, var(--accent-color) 22%, transparent);
  color: var(--accent-color);
}

.calendar-chips {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.calendar-chip {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  padding: 1px 6px;
  border: none;
  border-radius: 1px;
  background: color-mix(in srgb, var(--chip-color, var(--accent-color)) 20%, transparent);
  color: var(--title-color);
  font-size: 0.72rem;
  font-weight: var(--font-medium);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.calendar-chip.completed { opacity: 0.55; text-decoration: line-through; }
.calendar-chip.selected {
  background: color-mix(in srgb, var(--chip-color, var(--accent-color)) 58%, var(--container-color));
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--chip-color, var(--accent-color)) 72%, var(--title-color));
}
/* The title takes the slack and truncates; the badges keep their width, so what
   an item carries survives a long title instead of being ellipsed away. */
.calendar-chip-title { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.calendar-chip-glyph { flex: 0 0 auto; font-size: 0.85em; color: var(--chip-color, currentColor); }
.calendar-chip-time { color: var(--text-secondary); font-variant-numeric: tabular-nums; }
.calendar-chip-more { font-size: 0.68rem; color: var(--text-tertiary); padding-left: 4px; }

.calendar-day-dots { position: absolute; bottom: 3px; left: 0; right: 0; display: flex; gap: 3px; justify-content: center; }
.calendar-day-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
.calendar-reveal-dot { box-shadow: 0 0 0 2px var(--container-color), 0 0 0 4px var(--accent-color); }

@keyframes calendar-reveal-pulse {
  0%, 100% {
    outline-color: transparent;
    box-shadow: 0 0 0 0 transparent;
    filter: brightness(1);
  }
  14%, 48% {
    outline-color: var(--accent-color);
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--accent-color) 24%, transparent);
    filter: brightness(1.08);
  }
  30%, 68% {
    outline-color: color-mix(in srgb, var(--accent-color) 45%, transparent);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent-color) 12%, transparent);
    filter: brightness(1.02);
  }
}

@keyframes calendar-reveal-fill-pulse {
  0%, 100% { opacity: 0; }
  14%, 48% { opacity: 0.2; }
  30%, 68% { opacity: 0.08; }
}

/* The ring's corner radius is the target's own radius plus its outline-offset,
   so an offset visibly rounds it beyond the block it is marking. Zero keeps the
   ring on the border box, where it traces the shape exactly. */
.calendar-reveal-target {
  position: relative;
  z-index: 8;
  outline: 2px solid transparent;
  outline-offset: 0;
  animation: calendar-reveal-pulse 1.8s ease-out;
}
.calendar-reveal-target::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--accent-color);
  opacity: 0;
  pointer-events: none;
  animation: calendar-reveal-fill-pulse 1.8s ease-out;
}
.calendar-reveal-day { outline-offset: -3px; }

@media (prefers-reduced-motion: reduce) {
  .calendar-reveal-target {
    animation: none;
    outline-color: var(--accent-color);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent-color) 20%, transparent);
  }
  .calendar-reveal-target::after {
    animation: none;
    opacity: 0.14;
  }
}

`;var Hr=`/* \u2500\u2500 Calendar editor modal \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.modal-body.calendar-quickadd {
  min-height: 0;
  padding: 0;
  gap: 0;
  overflow: hidden;
}
/* The head and the actions are bands, not part of the scrolling field list \u2014
   hence their own padding and rules rather than a gap on the container. */
.calendar-quickadd-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--border-light);
}
.calendar-quickadd-title {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-sm);
  background: var(--body-color);
  color: var(--title-color);
  font-family: var(--interface-font);
  font-size: var(--normal-font-size);
  font-weight: var(--font-medium);
}

/* \u2500\u2500 Sections and rows \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
/* A titled block of fields. The label is what turns a stack of grey boxes into
   a form you can skim; the glyph column keeps every control on one left edge. */
.calendar-quickadd-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  min-width: 0;
}
.calendar-quickadd-section-label {
  color: var(--text-tertiary);
  font-size: var(--smaller-font-size);
  font-weight: var(--font-semi-bold);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.calendar-quickadd-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
}
.calendar-quickadd-row-glyph {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 16px;
  color: var(--text-tertiary);
}
.calendar-quickadd-row-glyph svg { width: 14px; height: 14px; }
.calendar-quickadd-row-body { flex: 1; min-width: 0; }

.calendar-quickadd-dates { display: flex; align-items: center; gap: var(--space-2); min-width: 0; }
.calendar-quickadd-dates .calendar-quickadd-date { flex: 1; min-width: 0; }
.calendar-quickadd-dash { flex: none; color: var(--text-tertiary); font-size: var(--small-font-size); }
.calendar-quickadd-times { display: flex; align-items: center; gap: var(--space-2); }
.calendar-quickadd-times .time-field { flex: 1; min-width: 92px; }
.calendar-quickadd-allday {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-inline-start: auto;
  color: var(--text-secondary);
  font-size: var(--small-font-size);
  white-space: nowrap;
}

/* \u2500\u2500 Actions \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
/* These used to be the To-Do plugin's .todo-save-btn / .todo-cancel-btn. Plugin
   CSS is injected globally, so borrowing them worked right up until someone
   disabled To-Do and the popover lost its buttons. */
.calendar-quickadd-save,
.calendar-quickadd-cancel {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 30px;
  padding: 0 var(--space-4);
  border-radius: var(--radius-sm);
  font: inherit;
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
  cursor: pointer;
}
.calendar-quickadd-save { border: none; background: var(--accent-color); color: #fff; }
.calendar-quickadd-save:disabled { opacity: 0.5; cursor: default; }
.calendar-quickadd-cancel {
  border: 1px solid var(--border-light);
  background: transparent;
  color: var(--text-secondary);
}
.calendar-quickadd-cancel:hover { background: var(--hover-bg); color: var(--title-color); }

/* Shared SelectField: it draws the frame, this only sizes it for the compact row. */
.calendar-quickadd-select.select-field {
  width: 100%;
  min-height: 28px;
  font-size: var(--small-font-size);
}
.calendar-quickadd-input {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-sm);
  background: var(--body-color);
  color: var(--title-color);
  font-size: var(--small-font-size);
}
.calendar-quickadd-note {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-sm);
  background: var(--body-color);
  color: var(--title-color);
  font-size: var(--small-font-size);
  resize: vertical;
  font-family: inherit;
}

/* The fields scroll; the head and the actions do not. An event with three
   attachments must never push Save past the bottom of the window. */
.calendar-quickadd-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  min-height: 0;
  padding: var(--space-4);
  overflow-y: auto;
}
.calendar-quickadd-adders { display: flex; gap: var(--space-4); }
.calendar-quickadd-add {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  align-self: flex-start;
  padding: 2px 0;
  border: none;
  background: transparent;
  color: var(--accent-color);
  font-family: var(--interface-font);
  font-size: var(--small-font-size);
  cursor: pointer;
}
.calendar-quickadd-add svg { width: 12px; height: 12px; }

/* \u2500\u2500 Tags \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
/* Restated here rather than borrowed from the To-Do plugin's stylesheet: its
   .todo-tag-* rules only reached this popover because plugin CSS is global. */
.calendar-tag-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-1);
  min-width: 0;
}
.calendar-tag-pill {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 2px var(--space-2);
  border-radius: var(--radius-lg);
  background: var(--accent-soft-bg);
  color: var(--accent-color);
  font-size: var(--smaller-font-size);
}
.calendar-tag-remove {
  display: inline-flex;
  align-items: center;
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  opacity: 0.6;
  cursor: pointer;
}
.calendar-tag-remove:hover { opacity: 1; }
.calendar-tag-remove svg { width: 10px; height: 10px; }
.calendar-tag-input {
  flex: 1;
  min-width: 80px;
  padding: 2px 0;
  border: none;
  background: transparent;
  color: var(--title-color);
  font-family: var(--interface-font);
  font-size: var(--small-font-size);
  outline: none;
}
.calendar-tag-input::placeholder { color: var(--text-tertiary); }
.calendar-quickadd-url-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
}
.calendar-quickadd-url {
  padding: 0;
  border: none;
  background: transparent;
  flex: 1;
  min-width: 0;
  color: var(--accent-color);
  font-size: var(--smaller-font-size);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  cursor: pointer;
}
/* The small round action beside a field \u2014 remove, open on the map. */
.calendar-field-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
}
.calendar-field-btn:hover { background: var(--hover-bg); color: var(--title-color); }
.calendar-field-btn svg { width: 13px; height: 13px; }

/* Location: the query field, its two actions, and the geocoder's hits below.
   Ported from the Todo detail view \u2014 a plugin may not import another plugin, so
   the class names travel with the markup and the rules are restated here. */
.calendar-location { position: relative; display: flex; flex-direction: column; gap: var(--space-2); }
.calendar-location-row { display: flex; align-items: center; gap: var(--space-2); min-width: 0; }
.calendar-location-input { flex: 1; min-width: 0; }
.calendar-location-hits {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: var(--space-1);
  list-style: none;
  border: 1px solid var(--border-medium);
  border-radius: var(--radius);
  background: var(--container-color);
}
.calendar-location-hit {
  display: flex;
  flex-direction: column;
  gap: 1px;
  width: 100%;
  padding: 5px var(--space-2);
  border: none;
  border-radius: var(--radius-sm);
  background: none;
  color: var(--title-color);
  font-family: var(--interface-font);
  font-size: var(--small-font-size);
  text-align: left;
  cursor: pointer;
}
.calendar-location-hit:hover { background: var(--hover-bg); }
.calendar-location-hit-name { color: var(--title-color); font-weight: var(--font-medium); }
.calendar-location-hit-context { color: var(--text-tertiary); font-size: var(--smaller-font-size); }

/* One attachment, as a card. Same shape as the Todo detail view's, minus the
   thumbnail column \u2014 this one lives in a 360px popover. */
.calendar-attach-card { position: relative; display: flex; align-items: stretch; }
.calendar-attach-open {
  display: flex;
  flex: 1;
  min-width: 0;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border: none;
  border-radius: var(--radius);
  background: var(--surface-color-alt);
  color: var(--text-color);
  font-family: var(--interface-font);
  text-align: left;
  cursor: pointer;
}
.calendar-attach-open:hover { background: var(--hover-bg); }
.calendar-attach-copy { display: flex; flex: 1; min-width: 0; flex-direction: column; gap: 2px; }
.calendar-attach-name {
  color: var(--title-color);
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.calendar-attach-meta { color: var(--text-secondary); font-size: var(--smaller-font-size); }
.calendar-attach-thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: var(--text-tertiary);
  font-size:0.9375rem;
}
/* Revealed on hover so a resting list of attachments is just the cards. */
.calendar-attach-remove {
  position: absolute;
  top: -6px;
  right: -6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 1px solid var(--border-medium);
  border-radius: 50%;
  background: var(--container-color);
  color: var(--text-tertiary);
  cursor: pointer;
  opacity: 0;
}
.calendar-attach-card:hover .calendar-attach-remove,
.calendar-attach-remove:focus-visible { opacity: 1; }
.calendar-attach-remove:hover { color: var(--negative-color); border-color: var(--negative-color); }
.calendar-attach-remove svg { width: 12px; height: 12px; }

`;var qr=`/* \u2500\u2500 Item badges \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   What an item carries, drawn on the item. Tertiary and small on purpose: they
   are a hint that something is there, never a second title. */
.calendar-badges {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  flex: 0 0 auto;
  color: var(--text-tertiary);
}
.calendar-badges svg { width: 11px; height: 11px; }

/* A group that comes from Preferences is shared with every other plugin \u2014 the
   tag says so, because editing that row changes it everywhere. */
.calendar-group-scope {
  flex-shrink: 0;
  padding: 1px 6px;
  border-radius: var(--radius-sm);
  background: var(--surface-color-alt);
  color: var(--text-tertiary);
  font-size: var(--smaller-font-size);
}

/* \u2500\u2500 Calendar context menu \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.cal-ctx-backdrop {
  position: fixed;
  inset: 0;
  z-index: calc(var(--z-modal) - 1);
}
.calendar-context-menu {
  position: fixed;
  z-index: var(--z-modal);
  min-width: 160px;
  padding: var(--space-1);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--container-color);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2);
}
.calendar-context-menu button {
  display: flex;
  align-items: center;
  width: 100%;
  height: 28px;
  padding: 0 var(--space-2);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-color);
  font-size: var(--small-font-size);
  text-align: left;
  cursor: pointer;
}
.calendar-context-menu button:hover { background: var(--hover-bg); color: var(--title-color); }
.calendar-context-menu button.calendar-context-menu-danger { color: var(--negative-color); }
.calendar-context-menu button.calendar-context-menu-danger:hover { background: color-mix(in srgb, var(--negative-color) 12%, transparent); color: var(--negative-color); }
.calendar-context-menu-label { display: block; padding: 4px var(--space-2) 2px; font-size: var(--small-font-size); color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px; }
.calendar-context-menu-sep { height: 1px; margin: var(--space-1) 0; background: var(--border-light); }

`;var Br=`/* \u2500\u2500 Agenda panel header actions \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.agenda-header-actions { display:inline-flex; align-items:center; gap:5px; }
.agenda-today-btn { display:inline-flex; align-items:center;
  padding:3px 8px; font-size:0.6875rem; font-weight:600; cursor:pointer; border-radius:5px;
  border:1px solid var(--accent-color); background:var(--accent-tint-bg);
  color:var(--accent-tint-text); -webkit-app-region:no-drag;
  transition:opacity 0.15s; }
.agenda-today-btn:hover { opacity:0.8; }

/* \u2500\u2500 Agenda panel (left sidebar) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.calendar-agenda-panel { width: 100%; height: 100%; min-height: 0; }
.calendar-agenda-panel .panel-header { width: 100%; }
.agenda-search {
  width: auto;
  flex: none;
  margin: var(--space-2) var(--space-1);
}
.agenda-body { display: flex; flex: 1 1 auto; min-height: 0; flex-direction: column; padding: 0 5px var(--space-4); }
.agenda-section { display: flex; flex-direction: column; gap: 4px; }
.agenda-section + .agenda-section { margin-top: var(--space-3); }
.agenda-year-sep {
  font-size: var(--small-font-size);
  font-weight: var(--font-semi-bold);
  color: var(--text-secondary);
  padding: var(--space-2) var(--space-2) var(--space-1);
  letter-spacing: 0.05em;
}
.agenda-day-header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: baseline;
  gap: 6px;
  padding: var(--space-1) 4px;
  margin-bottom: 2px;
  border: none;
  background: var(--container-color);
  cursor: pointer;
  text-align: left;
}
.agenda-day-dow { font-size: 0.62rem; font-weight: var(--font-semi-bold); color: var(--text-secondary); letter-spacing: 0.04em; }
.agenda-day-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 5px;
  border-radius: 11px;
  font-size: var(--small-font-size);
  font-weight: var(--font-semi-bold);
  color: var(--title-color);
}
.agenda-day-month { font-size: 0.68rem; font-weight: var(--font-medium); color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.03em; }
.agenda-day-header:hover .agenda-day-num { background: var(--bg-hover, rgba(0, 0, 0, 0.04)); }
.agenda-day-header.today .agenda-day-num { color: var(--accent-color); }
.agenda-day-header.selected .agenda-day-num {
  background: color-mix(in srgb, var(--accent-color) 22%, transparent);
  color: var(--accent-color);
}
.agenda-day-empty { padding: 2px 8px 4px; font-size: var(--small-font-size); color: var(--text-tertiary); }
.agenda-card {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-button) var(--space-2);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  text-align: left;
  cursor: pointer;
}
.agenda-card:hover,
.agenda-card:has([data-plugin-widget-hover]),
.agenda-card:focus-visible { background: var(--hover-bg); }
.agenda-card-dot { flex: 0 0 auto; width: 8px; height: 8px; border-radius: 50%; align-self: flex-start; margin-top: 4px; }
.agenda-card-body {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.agenda-card-title {
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
  color: var(--title-color);
  overflow-wrap: anywhere;
}
.agenda-card-time {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: calc(var(--small-font-size) - 1px);
  font-variant-numeric: tabular-nums;
  color: var(--text-secondary);
}
.agenda-card.completed { opacity: 0.55; }
.agenda-card.completed .agenda-card-title { text-decoration: line-through; }

.agenda-card-title { display: flex; align-items: flex-start; gap: 5px; }
.agenda-card-title > .calendar-chip-glyph { align-self: flex-start; margin-top: 0.15em; }
.agenda-card-fields {
  font-size: calc(var(--small-font-size) - 1px);
  color: var(--text-tertiary, var(--text-secondary));
  overflow-wrap: anywhere;
}
.agenda-card-note {
  color: var(--text-tertiary, var(--text-secondary));
  font-size: calc(var(--small-font-size) - 1px);
  line-height: 1.35;
  overflow-wrap: anywhere;
}

`;var Wr=`/* \u2500\u2500 Week time-grid \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.calendar-weekgrid { display: flex; flex-direction: column; min-height: 0; }
.calendar-weekgrid-allday,
.calendar-weekgrid-body {
  display: grid;
  grid-template-columns: 48px repeat(var(--week-cols, 7), minmax(0, 1fr));
}
.calendar-weekgrid-head {
  display: grid;
  grid-template-columns: 48px repeat(var(--week-cols, 7), minmax(0, 1fr));
  border-bottom: 1px solid var(--border-medium);
}
.calendar-weekgrid-headgutter { border: none; }
.calendar-weekgrid-gutter {
  color: var(--text-tertiary);
  font-size: 0.68rem;
  text-align: right;
  padding-right: var(--space-2);
}
.calendar-weekgrid-dayhead {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-2) 0;
  gap: 3px;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
}
.calendar-weekgrid-dow { font-size: 0.68rem; color: var(--text-secondary); font-weight: var(--font-semi-bold); }
.calendar-weekgrid-dom {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: var(--h3-font-size);
  font-weight: var(--font-semi-bold);
  color: var(--title-color);
  transition: background 0.12s ease, color 0.12s ease;
}
.calendar-weekgrid-dayhead:hover .calendar-weekgrid-dom { background: var(--bg-hover, rgba(0, 0, 0, 0.04)); }
.calendar-weekgrid-dayhead.today .calendar-weekgrid-dom { color: var(--accent-color); }
.calendar-weekgrid-dayhead.selected .calendar-weekgrid-dom {
  background: color-mix(in srgb, var(--accent-color) 22%, transparent);
  color: var(--accent-color);
}

/* Compact (sidebar) week: a row of 7 day pills above the single-day grid. */
.calendar-weekgrid-daypicker {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 2px;
  padding: var(--space-1) 0 var(--space-2);
  border-bottom: 1px solid var(--border-medium);
}
.calendar-daypick {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 4px 0 2px;
  border: none;
  background: transparent;
  cursor: pointer;
}
.calendar-daypick-dow {
  font-size: 0.6rem;
  font-weight: var(--font-semi-bold);
  color: var(--text-secondary);
}
.calendar-daypick-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
  color: var(--title-color);
}
.calendar-daypick.today .calendar-daypick-num { color: var(--accent-color); }
.calendar-daypick.selected .calendar-daypick-num {
  background: color-mix(in srgb, var(--accent-color) 22%, transparent);
  color: var(--accent-color);
}
.calendar-daypick-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: transparent;
}
.calendar-daypick-dot.on { background: var(--text-tertiary); }
.calendar-daypick.selected .calendar-daypick-dot.on { background: var(--accent-color); }

/* The all-day strip owns its height: as a flex item it must never be shrunk
   below its content, or the chips paint over its bottom border and into the hour
   grid. It grows with its chips and scrolls internally once it would claim a
   third of the view; the hour grid below absorbs the rest (flex: 1 1 auto). */
.calendar-weekgrid-allday {
  border-bottom: 1px solid var(--border-light);
  min-height: 24px;
  flex: 0 0 auto;
  max-height: 33vh;
  overflow-y: auto;
}
/* Compact (sidebar) week: one column, matching the single-day hour grid below \u2014
   a chip in a seventh of a sidebar is three letters wide. */
.calendar-weekgrid-allday--compact { grid-template-columns: 30px minmax(0, 1fr); }
.calendar-weekgrid-alldaycol { display: flex; flex-direction: column; gap: 2px; padding: 2px; }
/* Chips keep their own height too \u2014 a squeezed column must scroll, not squash. */
.calendar-weekgrid-alldaycol .calendar-chip { flex: 0 0 auto; }

.calendar-weekgrid-body { position: relative; overflow-y: auto; flex: 1 1 auto; min-height: 0; }
.calendar-weekgrid-hours { display: flex; flex-direction: column; }
.calendar-weekgrid-hour {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding-right: var(--space-2);
  padding-top: 2px;
  color: var(--text-tertiary);
  font-size: 0.66rem;
  font-variant-numeric: tabular-nums;
  border-top: 1px solid var(--border-light);
}
.calendar-weekgrid-col { position: relative; border-left: 1px solid var(--border-light); }
.calendar-weekgrid-cell { border-top: 1px solid var(--border-light); }

/* Horizontal geometry comes from overlap.ts, never from here: the custom
   properties default to the full column, so the create- and move-preview blocks
   \u2014 which set neither \u2014 keep painting exactly as they always did. */
.calendar-weekgrid-block {
  position: absolute;
  left: calc(var(--block-left, 0%) + 2px);
  width: calc(var(--block-width, 100%) - 4px);
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 2px 5px 2px 8px;
  border-radius: 1px;
  background: color-mix(in srgb, var(--chip-color, var(--accent-color)) 22%, var(--container-color));
  color: var(--title-color);
  font-size: 0.72rem;
  overflow: hidden;
  cursor: grab;
  user-select: none;
}
/* The colour rail is drawn, not bordered, so it keeps square corners while the
   block itself carries the 1px radius: a left border would inherit that radius
   and round the rail with it. */
.calendar-weekgrid-block::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  border-radius: 0;
  background: var(--chip-color, var(--accent-color));
}
.calendar-weekgrid-block.selected {
  background: color-mix(in srgb, var(--chip-color, var(--accent-color)) 58%, var(--container-color));
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--chip-color, var(--accent-color)) 72%, var(--title-color));
}
.calendar-weekgrid-block.selected .calendar-weekgrid-block-time { color: var(--title-color); }
.calendar-weekgrid-block.dragging { cursor: grabbing; opacity: 0.85; box-shadow: var(--shadow-md, 0 6px 16px rgba(0,0,0,0.2)); z-index: 5; }
.calendar-weekgrid-block.drag-ghost { opacity: 0.35; pointer-events: none; }
.calendar-weekgrid-block--create { opacity: 0.7; pointer-events: none; border: 1px dashed var(--chip-color, var(--accent-color)); z-index: 3; }
.calendar-weekgrid-block--ghost { opacity: 0.6; pointer-events: none; border: 1px dashed var(--chip-color, var(--accent-color)); z-index: 3; }
.calendar-weekgrid-block.completed { opacity: 0.55; text-decoration: line-through; }
.calendar-weekgrid-block-time { color: var(--text-secondary); font-variant-numeric: tabular-nums; }
.calendar-weekgrid-block-title {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  white-space: nowrap;
  font-weight: var(--font-medium);
}
.calendar-weekgrid-block-name { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.calendar-weekgrid-resize {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 6px;
  cursor: ns-resize;
}

/* \u2500\u2500 Current-time indicator (Apple Calendar "now line") \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.calendar-weekgrid-now {
  position: absolute;
  left: 0;
  right: 0;
  height: 0;
  pointer-events: none;
  z-index: 6;
}
.calendar-weekgrid-now-time {
  position: absolute;
  left: 0;
  width: 46px;
  transform: translateY(-50%);
  text-align: center;
  font-size: 0.62rem;
  font-weight: var(--font-semi-bold);
  font-variant-numeric: tabular-nums;
  line-height: 1.4;
  color: #fff;
  background: var(--tint-red-text);
  border-radius: var(--radius-sm);
}
.calendar-weekgrid-now-line {
  position: absolute;
  left: 48px;
  right: 0;
  top: 0;
  height: 1px;
  background: var(--tint-red-text);
  opacity: 0.3;
}
.calendar-weekgrid-now-line--today {
  right: auto;
  opacity: 1;
}
.calendar-weekgrid-now-dot {
  position: absolute;
  top: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--tint-red-text);
  transform: translate(-50%, -50%);
}




/* \u2500\u2500 Linked-file input with autocomplete (QuickAdd) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

/* \u2500\u2500 Todo: file-path input with autocomplete \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

`;var Yr=`/* \u2500\u2500 Header filters (groups / sources) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
/* The chips are unchanged \u2014 they simply moved out of the Calendar's top bar,
   where they only fitted on a wide window and were missing from the Agenda
   entirely, into a popover behind one icon on both surfaces. */
.calendar-filter-actions { display: inline-flex; align-items: center; gap: 2px; }
.calendar-filter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary, var(--text-secondary));
  font-size:0.9375rem;
  cursor: pointer;
  -webkit-app-region: no-drag;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}
.calendar-filter-btn:hover { background: var(--hover-bg); color: var(--title-color); }
.calendar-filter-btn.active { background: var(--tree-active-bg); color: var(--accent-color); }
.calendar-filter-icon { display: inline-flex; font-size: 0.9rem; }
.calendar-filter-icon svg { width: 15px; height: 15px; }
.calendar-filter-popover {
  width: min(244px, calc(100vw - 16px));
  padding: calc(var(--space-3) / 2);
  border-color: var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--container-color);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2);
}
.calendar-filter-popover-body { display: flex; flex-direction: column; }
.calendar-filter-popover-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 28px;
  padding: 0 var(--space-2) var(--space-1);
  border-bottom: 1px solid var(--border-light);
}
.calendar-filter-popover-title,
.calendar-filter-popover-all {
  padding: 2px 4px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  font: inherit;
  font-size: var(--small-font-size);
}
.calendar-filter-popover-title { color: var(--text-secondary); font-weight: var(--font-semi-bold); }
.calendar-filter-popover-title.actionable { color: var(--accent-color); cursor: pointer; }
.calendar-filter-popover-all { color: var(--text-tertiary); font-size: var(--smaller-font-size); cursor: pointer; }
.calendar-filter-popover-title.actionable:hover,
.calendar-filter-popover-all:hover { background: var(--hover-bg); color: var(--title-color); }
.calendar-filter-list {
  display: flex;
  flex-direction: column;
  padding-top: var(--space-1);
  max-height: 320px;
  overflow-y: auto;
  min-width: 148px;
}
.calendar-filter-option {
  display: flex;
  align-items: center;
  gap: 7px;
  width: 100%;
  min-height: 28px;
  padding: 0 var(--space-2);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-color);
  font: inherit;
  font-size: var(--small-font-size);
  text-align: left;
  cursor: pointer;
}
.calendar-filter-option:hover,
.calendar-filter-option.active { background: var(--hover-bg); color: var(--title-color); }
.calendar-filter-option.active { border-radius: 0; }
.calendar-filter-option.active.selection-run-start {
  border-top-left-radius: var(--radius-sm);
  border-top-right-radius: var(--radius-sm);
}
.calendar-filter-option.active.selection-run-end {
  border-bottom-right-radius: var(--radius-sm);
  border-bottom-left-radius: var(--radius-sm);
}
.calendar-filter-option.active:hover {
  background: color-mix(in srgb, var(--title-color) 14%, transparent);
}
.calendar-filter-option.active:has(+ .calendar-filter-option:hover),
.calendar-filter-option:hover:has(+ .calendar-filter-option.active) {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.calendar-filter-option.active + .calendar-filter-option:hover,
.calendar-filter-option:hover + .calendar-filter-option.active {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.calendar-filter-check {
  display: grid;
  place-items: center;
  width: 14px;
  height: 14px;
  flex: 0 0 14px;
  color: var(--accent-color);
  font-size: 0.75rem;
  font-weight: var(--font-semi-bold);
}
.calendar-filter-option .calendar-legend-dot { flex: 0 0 auto; width: 8px; height: 8px; }
.calendar-filter-option-glyph,
.calendar-filter-property-glyph {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
}
.calendar-filter-option-glyph { width: 14px; height: 14px; }
.calendar-filter-property-glyph { width: 1em; height: 1em; margin-right: var(--space-2); vertical-align: -0.15em; }
.calendar-filter-option-glyph svg,
.calendar-filter-property-glyph svg { width: 100%; height: 100%; }
.calendar-filter-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.calendar-filter-option-count {
  flex: 0 0 auto;
  color: var(--text-tertiary);
  font-variant-numeric: tabular-nums;
}
.calendar-filter-property-row {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
}
.calendar-filter-property-value {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-2);
}
.calendar-filter-empty {
  padding: 6px 8px;
  color: var(--text-tertiary, var(--text-secondary));
  font-size: var(--smaller-font-size);
}

`,Xr=`.calendar-filter-inline-rows {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 4px 6px 6px;
  border-bottom: 1px solid var(--border-light);
}
.calendar-filter-inline-row { display: flex; flex-direction: column; min-width: 0; }
.calendar-filter-inline-head {
  display: flex;
  align-items: center;
  border-radius: var(--radius-sm);
  transition: background-color var(--duration-fast, 120ms) var(--ease-out, ease);
}
.calendar-filter-inline-head:hover { background: var(--hover-bg); }
.calendar-filter-inline-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 30px;
  padding: 4px 6px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary);
  font: inherit;
  text-align: left;
  cursor: pointer;
}
/* The header stays quieter than the rows it opens \u2014 section label first, its
   contents second. */
.calendar-filter-inline-head:hover .calendar-filter-inline-trigger { color: var(--text-secondary); }
.calendar-filter-inline-row.active .calendar-filter-inline-count { color: var(--accent-color); }
.calendar-filter-inline-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  color: var(--text-tertiary);
}
.calendar-filter-inline-icon svg { width: 16px; height: 16px; }
.calendar-filter-inline-title {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.calendar-filter-inline-count {
  flex: 0 0 auto;
  color: var(--text-tertiary);
  font-variant-numeric: tabular-nums;
  font-weight: 400;
}
.calendar-filter-inline-chevron {
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
  color: var(--text-tertiary);
  transition: transform var(--duration-fast, 120ms) var(--ease-out, ease);
}
.calendar-filter-inline-chevron.open { transform: rotate(90deg); }
.calendar-filter-inline-clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 22px;
  height: 22px;
  margin-right: 4px;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
}
.calendar-filter-inline-clear svg { width: 14px; height: 14px; }
.calendar-filter-inline-clear:hover { background: var(--hover-bg); color: var(--title-color); }
/* Rows sit flush under their header \u2014 no rail, no second indent level: the dot
   column alone is enough to read them as belonging to the section above. */
.calendar-filter-inline-list {
  display: flex;
  flex-direction: column;
  max-height: 260px;
  padding-bottom: 2px;
  overflow-y: auto;
  overscroll-behavior: contain;
}
.calendar-filter-inline-option {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  min-height: 28px;
  padding: 3px 6px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-secondary);
  font: inherit;
  text-align: left;
  cursor: pointer;
}
/* Dot sits in the same 18px slot the header icon uses, so every label in the
   block starts on one line. */
.calendar-filter-inline-option .calendar-legend-dot { width: 8px; height: 8px; margin: 0 5px; }
.calendar-filter-inline-option:hover { background: var(--hover-bg); color: var(--title-color); }
/* Off: hollow dot and struck-through label, so a hidden row reads as switched
   off from either the colour column or the text. */
.calendar-filter-inline-option.off { color: var(--text-tertiary); text-decoration: line-through; }
.calendar-filter-inline-option.off .calendar-legend-dot {
  background: transparent !important;
  box-shadow: inset 0 0 0 1.5px var(--text-tertiary);
}
.calendar-filter-inline-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.calendar-legend-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1, 4px);
  padding: 2px var(--space-2, 8px);
  border: 1px solid var(--border-medium);
  border-radius: 999px;
  background: var(--container-color);
  color: var(--text-secondary);
  font-size: var(--smaller-font-size);
  cursor: pointer;
}
.calendar-legend-chip:hover { color: var(--text-color); }
.calendar-legend-chip.off { opacity: 0.4; text-decoration: line-through; }
.calendar-legend-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }

`;var Zr=`/* Calendar's integration page starts with a bordered plugin card rather than a
   labeled row, so it needs its own air beneath the Settings breadcrumb. */
.calendar-sync-settings { gap: var(--space-3); }
.calendar-account-row { width: 100%; text-align: left; font: inherit; color: inherit; }
.calendar-account-row > svg { flex-shrink: 0; }
.calendar-account-identity { display: flex; align-items: center; gap: var(--space-3); padding-block: var(--space-3); border-bottom: 1px solid var(--border-light); }
.calendar-account-identity .settings-list-meta { flex: 1; min-width: 0; }
.calendar-sync-calendar { border-bottom: 1px solid var(--border-light); }
.calendar-plugins-settings {
  margin-top: var(--space-3);
}
`,Qr=`/* \u2500\u2500 Note-date source editor (Settings \u2192 Calendar \u2192 Note dates) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.notedate-source-row {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 10px 0;
  padding: 14px 16px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  background: var(--container-color-alt);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.notedate-source-row:hover { border-color: var(--border-medium); box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); }
.notedate-source-head { display: flex; align-items: center; gap: 10px; }
.notedate-source-swatch {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 2px solid var(--swatch-ring, transparent);
  border-radius: var(--radius);
  background: var(--swatch-fill, var(--accent-color));
  color: var(--swatch-on, var(--accent-contrast, var(--title-color)));
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  cursor: pointer;
  transition: transform 0.12s ease;
}
.notedate-source-swatch:hover { transform: scale(1.06); }
.notedate-source-swatch.unset {
  border: 1px dashed var(--border-medium);
  background: none;
  box-shadow: none;
  color: var(--text-tertiary, var(--text-secondary));
}
.notedate-swatch-none { font-size:13px; line-height: 1; }
.notedate-glyph-picker { position: relative; flex: 0 0 auto; }
.notedate-glyph-grid {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 30;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  padding: 6px;
  border: 1px solid var(--border-medium);
  border-radius: var(--radius);
  background: var(--surface-color);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
}
.notedate-glyph-opt {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid transparent;
  border-radius: var(--radius);
  background: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.12s ease, color 0.12s ease, border-color 0.12s ease;
}
.notedate-glyph-opt:hover { background: var(--hover-bg); color: var(--text-color); }
.notedate-glyph-opt.active { border-color: var(--accent-color); color: var(--accent-color); }
.notedate-source-title {
  flex: 1;
  min-width: 0;
  border-color: transparent;
  background: transparent;
  font-size:0.875rem;
  font-weight: var(--font-semi-bold, 600);
}
.notedate-source-title:hover { background: var(--hover-bg); }
.notedate-source-title:focus { border-color: var(--border-medium); background: var(--surface-color); }
/* Layout only \u2014 the kit's ColorField owns the chip itself, including the
   fill/ring/unset drawing. Sizing it up from the kit's default 20px is the only
   thing this surface asks of it, and the Map's pin-source row asks for the same
   26px, so the pair read as one control in both places. */
.notedate-source-color { display: flex; align-items: center; gap: 6px; flex: 0 0 auto; }
.notedate-source-color .settings-color-swatch { width: 26px; height: 26px; }
.notedate-color-wrap { position: relative; display: inline-flex; }
.notedate-color-clear {
  position: absolute;
  top: -4px;
  right: -4px;
  display: grid;
  place-items: center;
  width: 14px;
  height: 14px;
  padding: 0;
  border: 1px solid var(--border-medium);
  border-radius: 50%;
  background: var(--surface-color);
  color: var(--text-secondary);
  font-size:0.5625rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.12s ease;
}
.notedate-color-wrap:hover .notedate-color-clear { opacity: 1; }
.notedate-color-clear:hover { color: var(--text-color); }
.notedate-source-actions { display: flex; align-items: center; gap: 6px; flex: 0 0 auto; }
.notedate-source-toggle { gap: 5px; }
.notedate-source-toggle svg { width: 14px; height: 14px; }
.notedate-source-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 12px; }
.notedate-source-field { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.notedate-source-field.wide { grid-column: 1 / -1; }
.notedate-source-field > label {
  font-size:0.625rem;
  font-weight: var(--font-semi-bold, 600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary, var(--text-secondary));
}
.notedate-source-field .settings-path-input { width: 100%; }
.notedate-source-field .notedate-source-limit { max-width: 100px; }
.notedate-source-inline { display: flex; align-items: center; gap: 8px; }
.notedate-source-inline .settings-path-input { flex: 1; min-width: 0; }
.notedate-source-inline-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;
  font-size:0.71875rem;
  color: var(--text-secondary);
  cursor: pointer;
}
/* What the rule currently finds \u2014 a rule matching nothing must not stay silent. */
.notedate-source-stats {
  margin: -2px 0 8px;
  font-size:0.71875rem;
  font-variant-numeric: tabular-nums;
  color: var(--text-tertiary, var(--text-secondary));
}
.notedate-source-stats.warn { color: var(--tint-red-text, #b91c1c); }

.notedate-source-show { display: flex; flex-direction: column; align-items: stretch; gap: 6px; }
.notedate-source-show-row { display: flex; align-items: center; gap: 6px; width: 100%; }
.notedate-source-show-row .settings-path-input { flex: 1; min-width: 0; }
.notedate-source-show-remove {
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: var(--radius);
  background: none;
  color: var(--text-tertiary, var(--text-secondary));
  font-size:1.0625rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.12s ease, background 0.12s ease;
}
.notedate-source-show-row:hover .notedate-source-show-remove { opacity: 1; }
.notedate-source-show-remove:hover { background: var(--hover-bg); color: var(--text-color); }
.notedate-add-field { gap: 5px; align-self: flex-start; border: 1px dashed var(--border-medium); }
.notedate-add-field svg { width: 13px; height: 13px; }
.notedate-add-field:hover { border-color: var(--text-tertiary, var(--text-secondary)); }
.notedate-source-advanced-toggle {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: -2px;
  padding: 2px;
  border: none;
  background: none;
  color: var(--text-tertiary, var(--text-secondary));
  font-size:0.65625rem;
  font-weight: var(--font-semi-bold, 600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: color 0.12s ease;
}
.notedate-source-advanced-toggle:hover { color: var(--text-color); }
.notedate-caret { display: inline-block; font-size:9px; line-height: 1; transition: transform 0.15s ease; }
.notedate-caret[data-open='true'] { transform: rotate(90deg); }
.notedate-add-source {
  display: flex;
  justify-content: center;
  gap: 7px;
  width: 100%;
  margin: 14px 0 4px;
  padding: 12px;
  border: 1.5px dashed var(--border-medium);
  background: none;
}
.notedate-add-source svg { width: 16px; height: 16px; }
.notedate-add-source:hover { border-color: var(--accent-color); color: var(--accent-color); background: var(--hover-bg); }
`;var dd=Ur+Hr+qr+Br+Wr+Yr+Zr+Xr+Qr,Ln="notes-calendar-styles";function Jr(){let e=document.getElementById(Ln);return e||(e=document.createElement("style"),e.id=Ln,document.head.appendChild(e)),e.textContent=dd,()=>{document.getElementById(Ln)===e&&e.remove()}}var eo={"auto.02f17370b8d9":"Event tags","auto.04a212215ef9":"Confirm","auto.04f6b3ea183e":"Clock","auto.05d290d65a74":"Calendar: List events","auto.0623bfa38c8f":"Folder scope","auto.082bc378cd60":"Month","auto.0cd372226ee9":"Event title\u2026","auto.1389fda4dae3":"Recurring date range in years","auto.1780c4a5f967":"No sources yet","auto.1a29d1bf66f5":"Note\u2026","auto.1ac1ff7616a6":"all-day","auto.1cb00f4b1daf":"Synced calendar \xB7 read-only","auto.221ca63005ea":"Syncing\u2026","auto.22819a02167d":"Go to today","auto.240038c46892":"Remote events","auto.24345a14377f":"Today","auto.24bdcf2d51f8":"Range (years)","auto.257ff123e390":"No notes match {{p0}}: {{p1}}","auto.2a37335eebda":"Heart","auto.2ae8981158aa":"Read-only events from accounts connected in","auto.2b7d938e6787":"Sync now","auto.2bc9464d49e9":"Equals value","auto.2c924e308820":"Note","auto.33a5a701e541":"Todo title\u2026","auto.33ce417454bf":"Loading\u2026","auto.34d8b60fe253":"Hide","auto.35b023ecbb81":"Source name (e.g. Birthdays)","auto.3ae5b44a561f":"Recurrence exceptions","auto.408a0d16a8ba":"Show these entries \u2014 put this source back on the calendar.","auto.418713defbf7":"No events or todos","auto.46fbb53a9be2":"Day start hour","auto.475b6ce898d4":"Source name","auto.4869ac12717f":"Open week","auto.48a7b8889e15":"optional","auto.4cb741c63cbd":"Microsoft Calendar","auto.4d064726954a":"Advanced","auto.4da8c4eff514":"Source name \u2014 how this group is listed in the Upcoming section. Click to rename it.","auto.4fda04775bdc":"Remove this field","auto.50b47e47a104":"Sync {{p0}}","auto.50f94286ba30":"Previous","auto.519b42369442":"Optional frontmatter key holding a HH:MM start time. Empty \u21D2 an all-day entry.","auto.5210c5c047ea":"Append the number of years, e.g. \u201CAda (36)\u201D.","auto.5301648dcf6b":"Edit","auto.55f1c767a3b1":"Title property","auto.570374e4e4cc":"Google Calendar","auto.5d12631f0a8b":"Event links","auto.611f3791dc68":"Start time property","auto.61cc55aa0453":"Add","auto.65c01f7ba330":"Add one below, then fill in the frontmatter value it should match.","auto.691b674766e5":"Date property","auto.6d07b3164ac0":"Show recurring dates only within this many years before and after the current year.","auto.702e8114bce7":"Event attachments","auto.736a07e01797":"Hide these entries \u2014 keep the source but stop drawing it on the calendar.","auto.73d64a823b7d":"Add tag\u2026","auto.768e0c1c6957":"Title","auto.77dfd2135f4d":"Cancel","auto.7a3a9094b18c":"Open Calendar","auto.7a46866bc719":"TODAY","auto.7bf039eeb194":"Frontmatter key holding the date: 1990-05-04, or --05-04 when the year is unknown.","auto.7bf74c2d99d6":"Entry icon \u2014 drawn on every calendar entry from this source. Optional: leave it off for a plain chip.","auto.7c1496f9a7dc":"Delete \u201C{{p0}}\u201D?","auto.7eacb0e385b4":"No calendar accounts connected yet \u2014 add one in Settings \u2192 Accounts.","auto.7f852a5678f1":"Calendar: Set view","auto.7f8a6fad8b7c":"Add event","auto.808d7dca8a74":"Default","auto.8410192cbb1f":"Linked file path","auto.85a7de6e2705":"Star","auto.86c0a35ec883":"More options","auto.879e32326c52":"Year","auto.88d8206d586a":"Start time","auto.891e9d6d47f1":"Agenda","auto.8bbc96d44546":"How the date is written in the note \u2014 dd, mm and yyyy with any separators (dd.mm.yyyy, mm/dd/yyyy, or dd.mm without a year). Leave empty to detect it.","auto.8c41ae88467f":"Person","auto.8d0a32ed6339":"Gift","auto.92bcda7f379e":"Entry icon","auto.9444501818e6":"Calendars","auto.94ee88690828":"Date format","auto.95553ba8a405":"No icon","auto.958788fc103f":"Note dates","auto.981f473aa731":"Outline colour","auto.9acc52f8cf89":"Remove tag {{p0}}","auto.9ae33a7d0ecb":"Property","auto.9c6e5a3f44fc":"Cake","auto.9c918414710c":"Pin","auto.9ddab8990070":"Show count","auto.9eb56535c39a":"Calendar sync state","auto.9ee309dcedc9":"Open page","auto.9fa90b203761":"Entry colour","auto.a2590d497e7c":"No events in this window.","auto.a3cbb98ddf5e":"Filename","auto.a3fa4c4a4715":"Frontmatter value","auto.a774409a00c2":"Flag","auto.ad8919ace091":"Event","auto.ad980036b394":"Whole vault","auto.adab5090ac6a":"Calendar","auto.ae8a5b196587":"Yes, delete","auto.aee875c4edbf":"End time property","auto.b29a9852d77e":"Open Calendar page","auto.b2db10062979":"Note date sources","auto.b6f727f0c520":"Day (monthly)","auto.b82220d034e7":"Frontmatter key","auto.bc981983e7f5":"Next","auto.bf2660184858":"Calendar: Go to date","auto.c2b47c770575":"Synced calendars","auto.c5497bca5846":"Events","auto.c66a827e3397":"Open note","auto.c7f73bb54d92":"Settings","auto.c845e23963ef":'Delete the "{{p0}}" source \u2014 the notes themselves are untouched.',"auto.cd7800da7f4f":"End time","auto.cfbf9d49c1da":". Choose which calendars appear here.","auto.d4198662a72f":"Bell","auto.d4ea5b59b68b":"{{p0}} notes match \xB7 {{p1}} with a usable date","auto.d5e8ba205867":"Settings \u2192 Accounts","auto.d669db3f6b34":"No todos and events on this day","auto.d75a293ea22a":"Click again to delete this source.","auto.d97d1ee339e4":"Show","auto.dbed7864623f":"Calendar group","auto.dd4b99ddaf61":"Day + month (yearly)","auto.e0db2991e37a":"Add tag","auto.e10282ef1972":"Date match","auto.e16f07326a18":"Calendar: Add an event","auto.e6ffec68b5ae":"{{p0}} notes match \xB7 none has a usable {{p1}}","auto.e7de9576dc00":"Linked file (vault path)\u2026","auto.ec42f1f55523":"Add todo","auto.ee8581831b9c":"Calendar: Go to today","auto.ef5ea5a743b3":"Frontmatter key to show","auto.efc007a393f6":"Save","auto.f07b365f8502":"First hour shown in the week grid (0\u201323). Earlier hours scroll above it.","auto.f4a0d0857b02":"Clear {{p0}}","auto.f4e12416c6b8":"No items","auto.f6b2246c64fa":"No group","auto.f6fdbe48dc54":"Delete","auto.f82be68a7fb4":"Week","auto.fb3a16f382f8":"Copy Valley link","auto.fd303c72a405":"Exact date (day + month + year)","calendar.action.openAttachment":"Attachment","calendar.action.openLink":"Link","calendar.action.showOnMap":"Show on map","calendar.addAttachment":"Add attachment","calendar.addUrl":"Add link","calendar.agenda.clearSearch":"Clear search","calendar.agenda.searchLabel":"Search agenda","calendar.agenda.searchPlaceholder":"Search agenda\u2026","calendar.attachmentPath":"Attachment path","calendar.attachmentPlaceholder":"Attach a file\u2026","calendar.attachments":"Attachments","calendar.badge.attachment":"Attachment","calendar.badge.link":"Link","calendar.badge.location":"Location","calendar.badge.note":"Linked note","calendar.colorRule.folder":"Folder","calendar.colorRule.property":"Property","calendar.colorRule.tag":"Hashtag","calendar.command.delete":"Calendar: Delete item","calendar.command.editFields":"Calendar: Edit item fields","calendar.command.get":"Calendar: Get item","calendar.command.listItems":"Calendar: List all items","calendar.command.open":"Calendar: Open item","calendar.command.openCached":"Calendar: Open cached event","calendar.command.sourceAction":"Calendar: Run source item action","calendar.command.sourceActions":"Calendar: List source item actions","calendar.command.sourceCreate":"Calendar: Create source item","calendar.command.sources":"Calendar: List item sources","calendar.dayEndHour":"Day end hour","calendar.dayEndHourDesc":"Last hour shown in the week grid (1\u201324). Later hours scroll below it.","calendar.dayWindowGrows":"An item outside the window still shows \u2014 the grid grows to reach it.","calendar.editor.close":"Close","calendar.editor.retry":"Enable or reload the owning plugin, then try opening this item again.","calendar.editor.unavailable":"Item editor unavailable","calendar.error.changed":"This event changed elsewhere. Your draft is preserved. Cancel to load the latest version.","calendar.error.missing":"The calendar item no longer exists.","calendar.error.save":"Could not save the event. Your changes are preserved.","calendar.field.attachments":"Attachments","calendar.field.completed":"Completed","calendar.field.date":"Date","calendar.field.endDate":"End date","calendar.field.endTime":"End time","calendar.field.filePath":"Linked file","calendar.field.group":"Group","calendar.field.groupId":"Group","calendar.field.location":"Location","calendar.field.note":"Notes","calendar.field.priority":"Priority","calendar.field.startTime":"Start time","calendar.field.tags":"Tags","calendar.field.title":"Title","calendar.field.urls":"Links","calendar.filter.deselectAll":"Deselect all","calendar.filter.events":"Events","calendar.filter.groups":"Groups","calendar.filter.noGroups":"No groups yet","calendar.filter.noSources":"No sources","calendar.filter.noteDates":"Note dates","calendar.filter.selectAll":"Select all","calendar.filter.sources":"Sources","calendar.group.deleteBlocked":"Still used by {{p0}} events \u2014 empty the group to delete it","calendar.group.global":"Global","calendar.location":"Location","calendar.locationPlaceholder":"Location\u2026","calendar.noteDate.addField":"Add field","calendar.noteDate.addSource":"Add source","calendar.noteDatePreset.anniversaries":"Anniversaries","calendar.noteDatePreset.birthdays":"Birthdays","calendar.noteDatePreset.blank":"Blank source","calendar.noteDatePreset.deadlines":"Deadlines","calendar.openLocation":"Show on map","calendar.openLocationOf":"Show {{p0}} on map","calendar.overview.accounts":"Calendar accounts","calendar.overview.calendars":"Calendars","calendar.overview.disabled":"Sync disabled","calendar.overview.loading":"Loading calendar item\u2026","calendar.overview.month":"Month","calendar.overview.none":"None","calendar.overview.plugin":"Active plugin","calendar.overview.range":"Selected range","calendar.overview.selectedDate":"Selected date","calendar.overview.selectedTime":"Selected time","calendar.overview.sources":"Visible sources","calendar.overview.unavailable":"Calendar details could not be loaded. Reopen Properties to retry.","calendar.overview.view":"View","calendar.overview.week":"Week","calendar.overview.year":"Year","calendar.plugins.by":"By","calendar.plugins.configure":"Configure {{p0}}","calendar.plugins.disable":"Disable {{p0}} in Calendar","calendar.plugins.empty":"No calendar integrations are active.","calendar.plugins.enable":"Enable {{p0}} in Calendar","calendar.plugins.version":"Version:","calendar.priority.high":"High","calendar.priority.low":"Low","calendar.priority.medium":"Medium","calendar.priority.none":"None","calendar.properties.manageGroups":"Manage groups","calendar.quickadd.allDay":"All day","calendar.quickadd.details":"Details","calendar.quickadd.dueDate":"Due date","calendar.quickadd.editTitle":"Edit {{kind}}","calendar.quickadd.endDate":"End date","calendar.quickadd.kind":"What to add","calendar.quickadd.priority":"Priority","calendar.quickadd.startDate":"Start date","calendar.quickadd.when":"When","calendar.removeAttachment":"Remove attachment","calendar.removeAttachmentOf":"Remove attachment {{p0}}","calendar.removeLocation":"Remove location","calendar.removeUrl":"Remove link","calendar.removeUrlOf":"Remove link {{p0}}","calendar.settings.groups":"Groups","calendar.settings.groupsDesc":"Shared groups are created and managed in the central Groups settings.","calendar.settings.openItemsAgenda":"Calendar Agenda","calendar.settings.openItemsIn":"Open items in","calendar.settings.openItemsInDesc":"Choose where a normal click on Calendar content reveals the item.","calendar.settings.openItemsOwner":"Owning plugin","calendar.sync.account":"Sync this account","calendar.sync.accountsError":"Could not load accounts. Refresh to retry.","calendar.sync.back":"Back to accounts","calendar.sync.cached":"Previously synced events remain available.","calendar.sync.calendarsError":"Could not load calendars. Check the connection in Accounts and retry.","calendar.sync.connected":"Connected","calendar.sync.description":"Choose calendars from your existing accounts and assign each to a group. Events are read-only.","calendar.sync.failed":"Calendar sync failed.","calendar.sync.group":"Group for {{name}}","calendar.sync.last":"Last synced {{time}} \xB7 {{count}} events","calendar.sync.loadingAccounts":"Loading accounts\u2026","calendar.sync.loadingCalendars":"Loading calendars\u2026","calendar.sync.manage":"Manage accounts","calendar.sync.noCalendars":"No readable calendars found for this account.","calendar.sync.noGroup":"No group","calendar.sync.permission":"Calendar access is missing. Enable Calendar in Accounts.","calendar.sync.primary":"Default calendar","calendar.sync.readOnly":"Import selected calendars. Changes in Valley are not sent back to the provider.","calendar.sync.reconnect":"Reconnect this account in Accounts to restore access.","calendar.sync.refresh":"Refresh accounts and sync","calendar.sync.saveError":"Could not save the calendar selection.","calendar.sync.saved":"OAuth credentials are saved, but no account is connected yet. Open Accounts and choose Add connection to authorize access.","calendar.sync.savedShort":"Credentials saved \xB7 Account not connected","calendar.sync.select":"Sync {{name}}","calendar.sync.setup":"Set up this provider in Accounts, then authorize calendar access.","calendar.sync.setupShort":"Set up in Accounts","calendar.undo.addEvent":"Add event \u201C{{title}}\u201D","calendar.undo.deleteEvent":"Delete event \u201C{{title}}\u201D","calendar.undo.editEvent":"Edit event \u201C{{title}}\u201D","calendar.url":"Link","calendar.urlPlaceholder":"https://\u2026","error.commandFailed":"The command failed. Review the input and try again.","guard.preset.ask-for-writes":"Ask for writes","guard.preset.blocked":"Blocked","guard.preset.read-only":"Read-only","guard.preset.recommended":"Recommended","manifest.description":"Event and todo planner: left-sidebar agenda, right-sidebar compact calendar, and a full workspace page with month/week/year grids beside a live agenda column.","manifest.name":"Calendar","markdown.examples.agenda":"Agenda","markdown.examples.dateRange":"Date range","markdown.examples.day":"Today","markdown.examples.filtered":"Filtered results","markdown.examples.nextSeven":"Next seven days","markdown.examples.nextThirty":"Next thirty days","markdown.examples.week":"Week","plugin.calendar.section.dates":"Note dates","plugin.calendar.section.plugins":"Plugins","plugin.calendar.section.sync":"Synced calendars","backend.request":"Expected calendar request","backend.text":"Invalid calendar request text","backend.expired":"Calendar event page expired","backend.large":"Calendar event is too large","backend.account":"Unknown calendar account","backend.permission":"Calendar permission is missing. Reconnect in Settings \u2192 Accounts.","backend.endpoint":"Invalid calendar endpoint","backend.window":"Invalid calendar time window","backend.pending":"Too many pending calendar result sets","backend.pages":"Calendar pagination limit exceeded","backend.continuation":"Invalid Microsoft Graph continuation URL.","backend.microsoft":"Microsoft Graph calendar fetch failed: {{status}}","backend.googleList":"Google Calendar list failed: {{status}}","backend.googleFetch":"Google Calendar fetch failed: {{status}}","calendar.error.atomicLimit":"This change exceeds the atomic limit of 1000 operations. Remove fewer sources at once.","calendar.source.incompatible":"Calendar source \u201C{{owner}}\u201D uses an incompatible version. Update it to support dated, paged requests (v2).","calendar.source.failed":"Calendar source \u201C{{owner}}\u201D: {{message}}","calendar.source.pageRevision":"The source returned an invalid or changed page revision.","calendar.source.rangeLimit":"The requested range exceeds {{limit}} items. Choose a smaller range.","calendar.source.invalidItems":"The source returned duplicate or out-of-range items.","calendar.source.cursor":"The source returned a page cursor that does not advance.","calendar.source.pageBudget":"The requested range exceeds the page budget.","calendar.source.unavailable":"The source is unavailable."};var to={"auto.02f17370b8d9":"Ereignis-Tags","auto.04a212215ef9":"Best\xE4tigen","auto.04f6b3ea183e":"Uhr","auto.05d290d65a74":"Calendar: Ereignisse auflisten","auto.0623bfa38c8f":"Ordnerbereich","auto.082bc378cd60":"Monat","auto.0cd372226ee9":"Veranstaltungstitel\u2026","auto.1389fda4dae3":"Wiederkehrender Zeitraum in Jahren","auto.1780c4a5f967":"Noch keine Quellen","auto.1a29d1bf66f5":"Notiz\u2026","auto.1ac1ff7616a6":"den ganzen Tag","auto.1cb00f4b1daf":"Synchronisierter Kalender \xB7 schreibgesch\xFCtzt","auto.221ca63005ea":"Synchronisierung\u2026","auto.22819a02167d":"Gehe zu heute","auto.240038c46892":"Fernveranstaltungen","auto.24345a14377f":"Heute","auto.24bdcf2d51f8":"Zeitraum (Jahre)","auto.257ff123e390":"Keine Notizen stimmen mit {{p0}} \xFCberein: {{p1}}","auto.2a37335eebda":"Herz","auto.2ae8981158aa":"Schreibgesch\xFCtzte Ereignisse von verbundenen Konten","auto.2b7d938e6787":"Jetzt synchronisieren","auto.2bc9464d49e9":"Gleicher Wert","auto.2c924e308820":"Notiz","auto.33a5a701e541":"Todo-Titel\u2026","auto.33ce417454bf":"Laden\u2026","auto.34d8b60fe253":"Ausblenden","auto.35b023ecbb81":"Quellenname (z. B. Geburtstage)","auto.3ae5b44a561f":"Wiederholungsausnahmen","auto.408a0d16a8ba":"Diese Eintr\xE4ge anzeigen \u2013 die Quelle wieder im Kalender einblenden.","auto.418713defbf7":"Keine Ereignisse oder Aufgaben","auto.46fbb53a9be2":"Tagesstartstunde","auto.475b6ce898d4":"Quellenname","auto.4869ac12717f":"Woche der offenen T\xFCr","auto.48a7b8889e15":"optional","auto.4cb741c63cbd":"Microsoft Calendar","auto.4d064726954a":"Fortgeschritten","auto.4da8c4eff514":"Quellenname \u2013 so wird diese Gruppe im Abschnitt \u201EDemn\xE4chst\u201C aufgef\xFChrt. Zum Umbenennen klicken.","auto.4fda04775bdc":"Dieses Feld entfernen","auto.50b47e47a104":"Synchronisieren {{p0}}","auto.50f94286ba30":"Zur\xFCck","auto.519b42369442":"Optionaler Frontmatter-Schl\xFCssel mit einer Startzeit (HH:MM). Leer \u21D2 ein ganzt\xE4giger Eintrag.","auto.5210c5c047ea":"H\xE4ngen Sie die Anzahl der Jahre an, z.B. \u201EAda (36)\u201C.","auto.5301648dcf6b":"Bearbeiten","auto.55f1c767a3b1":"Titeleigentum","auto.570374e4e4cc":"Google Calendar","auto.5d12631f0a8b":"Veranstaltungslinks","auto.611f3791dc68":"Eigenschaft f\xFCr die Startzeit","auto.61cc55aa0453":"Hinzuf\xFCgen","auto.65c01f7ba330":"F\xFCgen Sie unten einen hinzu und geben Sie dann den Frontmatter-Wert ein, mit dem er \xFCbereinstimmen soll.","auto.691b674766e5":"Eigenschaft f\xFCr das Datum","auto.6d07b3164ac0":"Wiederkehrende Termine nur so viele Jahre vor und nach dem aktuellen Jahr anzeigen.","auto.702e8114bce7":"Ereignisanh\xE4nge","auto.736a07e01797":"Diese Eintr\xE4ge ausblenden \u2013 die Quelle bleibt erhalten, wird aber nicht mehr im Kalender gezeichnet.","auto.73d64a823b7d":"Tag hinzuf\xFCgen\u2026","auto.768e0c1c6957":"Titel","auto.77dfd2135f4d":"Abbrechen","auto.7a3a9094b18c":"Calendar \xF6ffnen","auto.7a46866bc719":"HEUTE","auto.7bf039eeb194":"Frontmatter-Schl\xFCssel mit dem Datum: 1990-05-04 oder --05-04, wenn das Jahr unbekannt ist.","auto.7bf74c2d99d6":"Eintragssymbol \u2013 wird auf jedem Kalendereintrag aus dieser Quelle gezeichnet. Optional: ohne Symbol bleibt der Chip schlicht.","auto.7c1496f9a7dc":"\u201E{{p0}}\u201C l\xF6schen?","auto.7eacb0e385b4":"Noch keine Kalenderkonten verbunden \u2013 f\xFCgen Sie eines unter Einstellungen \u2192 Konten hinzu.","auto.7f852a5678f1":"Calendar: Ansicht einstellen","auto.7f8a6fad8b7c":"Ereignis hinzuf\xFCgen","auto.808d7dca8a74":"Standard","auto.8410192cbb1f":"Pfad der verkn\xFCpften Datei","auto.85a7de6e2705":"Stern","auto.86c0a35ec883":"Weitere Optionen","auto.879e32326c52":"Jahr","auto.88d8206d586a":"Startzeit","auto.891e9d6d47f1":"Agenda","auto.8bbc96d44546":"Wie das Datum in der Notiz geschrieben wird \u2013 dd, mm und yyyy mit beliebigen Trennzeichen (dd.mm.yyyy, mm/dd/yyyy oder dd.mm ohne Jahr). Leer lassen, um es automatisch zu erkennen.","auto.8c41ae88467f":"Person","auto.8d0a32ed6339":"Geschenk","auto.92bcda7f379e":"Eintragssymbol","auto.9444501818e6":"Kalender","auto.94ee88690828":"Datumsformat","auto.95553ba8a405":"Kein Symbol","auto.958788fc103f":"Termine aus Notizen","auto.981f473aa731":"Randfarbe","auto.9acc52f8cf89":"Tag entfernen {{p0}}","auto.9ae33a7d0ecb":"Eigenschaft","auto.9c6e5a3f44fc":"Kuchen","auto.9c918414710c":"Stecknadel","auto.9ddab8990070":"Anzahl anzeigen","auto.9eb56535c39a":"Calendar Synchronisierungsstatus","auto.9ee309dcedc9":"Seite \xF6ffnen","auto.9fa90b203761":"Eintragsfarbe","auto.a2590d497e7c":"Keine Ereignisse in diesem Fenster.","auto.a3cbb98ddf5e":"Dateiname","auto.a3fa4c4a4715":"Frontmatter-Wert","auto.a774409a00c2":"Fahne","auto.ad8919ace091":"Ereignis","auto.ad980036b394":"Ganzer Tresor","auto.adab5090ac6a":"Kalender","auto.ae8a5b196587":"Ja, l\xF6schen","auto.aee875c4edbf":"Eigenschaft f\xFCr die Endzeit","auto.b29a9852d77e":"\xD6ffnen Sie die Seite Calendar","auto.b2db10062979":"Beachten Sie Datumsquellen","auto.b6f727f0c520":"Tag (monatlich)","auto.b82220d034e7":"Frontmatter-Schl\xFCssel","auto.bc981983e7f5":"Weiter","auto.bf2660184858":"Calendar: Zum Datum gehen","auto.c2b47c770575":"Synchronisierte Kalender","auto.c5497bca5846":"Veranstaltungen","auto.c66a827e3397":"Notiz \xF6ffnen","auto.c7f73bb54d92":"Einstellungen","auto.c845e23963ef":"Quelle \u201E{{p0}}\u201C l\xF6schen \u2013 die Notizen selbst bleiben unber\xFChrt.","auto.cd7800da7f4f":"Endzeit","auto.cfbf9d49c1da":". W\xE4hlen Sie aus, welche Kalender hier angezeigt werden.","auto.d4198662a72f":"Glocke","auto.d4ea5b59b68b":"{{p0}} Notizen stimmen \xFCberein \xB7 {{p1}} mit verwendbarem Datum","auto.d5e8ba205867":"Einstellungen \u2192 Konten","auto.d669db3f6b34":"An diesem Tag gibt es keine Aufgaben und Ereignisse","auto.d75a293ea22a":"Zum L\xF6schen erneut klicken.","auto.d97d1ee339e4":"Anzeigen","auto.dbed7864623f":"Calendar Gruppe","auto.dd4b99ddaf61":"Tag + Monat (j\xE4hrlich)","auto.e0db2991e37a":"Tag hinzuf\xFCgen","auto.e10282ef1972":"Datums\xFCbereinstimmung","auto.e16f07326a18":"Calendar: Ein Ereignis hinzuf\xFCgen","auto.e6ffec68b5ae":"{{p0}} Notizen stimmen \xFCberein \xB7 keine hat ein verwendbares {{p1}}","auto.e7de9576dc00":"Verkn\xFCpfte Datei (Tresorpfad)\u2026","auto.ec42f1f55523":"Aufgabe hinzuf\xFCgen","auto.ee8581831b9c":"Calendar: Zu heute springen","auto.ef5ea5a743b3":"Anzuzeigender Frontmatter-Schl\xFCssel","auto.efc007a393f6":"Speichern","auto.f07b365f8502":"Erste im Wochenraster angezeigte Stunde (0\u201323). Dar\xFCber scrollen fr\xFChere Stunden.","auto.f4a0d0857b02":"L\xF6schen {{p0}}","auto.f4e12416c6b8":"Keine Artikel","auto.f6b2246c64fa":"Keine Gruppe","auto.f6fdbe48dc54":"L\xF6schen","auto.f82be68a7fb4":"Woche","auto.fb3a16f382f8":"Valley-Link kopieren","auto.fd303c72a405":"Genaues Datum (Tag + Monat + Jahr)","calendar.action.openAttachment":"Anhang","calendar.action.openLink":"Link","calendar.action.showOnMap":"Auf Karte anzeigen","calendar.addAttachment":"Anhang hinzuf\xFCgen","calendar.addUrl":"Link hinzuf\xFCgen","calendar.agenda.clearSearch":"Suche l\xF6schen","calendar.agenda.searchLabel":"Agenda durchsuchen","calendar.agenda.searchPlaceholder":"Agenda durchsuchen\u2026","calendar.attachmentPath":"Pfad des Anhangs","calendar.attachmentPlaceholder":"Datei anh\xE4ngen\u2026","calendar.attachments":"Anh\xE4nge","calendar.badge.attachment":"Anhang","calendar.badge.link":"Link","calendar.badge.location":"Ort","calendar.badge.note":"Verkn\xFCpfte Notiz","calendar.colorRule.folder":"Ordner","calendar.colorRule.property":"Eigenschaft","calendar.colorRule.tag":"Hashtag","calendar.command.delete":"Kalender: Eintrag l\xF6schen","calendar.command.editFields":"Kalender: Felder bearbeiten","calendar.command.get":"Kalender: Eintrag abrufen","calendar.command.listItems":"Kalender: Alle Eintr\xE4ge auflisten","calendar.command.open":"Kalender: Eintrag \xF6ffnen","calendar.command.openCached":"Kalender: Zwischengespeicherten Termin \xF6ffnen","calendar.command.sourceAction":"Kalender: Quellenaktion ausf\xFChren","calendar.command.sourceActions":"Kalender: Quellenaktionen auflisten","calendar.command.sourceCreate":"Kalender: Eintrag in Quelle erstellen","calendar.command.sources":"Kalender: Quellen auflisten","calendar.dayEndHour":"Tagesendstunde","calendar.dayEndHourDesc":"Letzte im Wochenraster angezeigte Stunde (1\u201324). Darunter scrollen sp\xE4tere Stunden.","calendar.dayWindowGrows":"Ein Eintrag au\xDFerhalb des Fensters wird trotzdem angezeigt \u2014 das Raster w\xE4chst bis dorthin.","calendar.editor.close":"Schliessen","calendar.editor.retry":"Aktiviere oder lade das zust\xE4ndige Plugin neu und \xF6ffne den Eintrag erneut.","calendar.editor.unavailable":"Eintragseditor nicht verf\xFCgbar","calendar.error.changed":"Dieser Termin wurde anderweitig ge\xE4ndert. Dein Entwurf bleibt erhalten. Lade mit Abbrechen die neueste Version.","calendar.error.missing":"Der Kalendereintrag existiert nicht mehr.","calendar.error.save":"Der Termin konnte nicht gespeichert werden. Deine \xC4nderungen bleiben erhalten.","calendar.field.attachments":"Anh\xE4nge","calendar.field.completed":"Abgeschlossen","calendar.field.date":"Datum","calendar.field.endDate":"Enddatum","calendar.field.endTime":"Endzeit","calendar.field.filePath":"Verkn\xFCpfte Datei","calendar.field.group":"Gruppe","calendar.field.groupId":"Gruppe","calendar.field.location":"Ort","calendar.field.note":"Notizen","calendar.field.priority":"Priorit\xE4t","calendar.field.startTime":"Startzeit","calendar.field.tags":"Tags","calendar.field.title":"Titel","calendar.field.urls":"Links","calendar.filter.deselectAll":"Auswahl aufheben","calendar.filter.events":"Termine","calendar.filter.groups":"Gruppen","calendar.filter.noGroups":"Noch keine Gruppen","calendar.filter.noSources":"Keine Quellen","calendar.filter.noteDates":"Notizdaten","calendar.filter.selectAll":"Alle ausw\xE4hlen","calendar.filter.sources":"Quellen","calendar.group.deleteBlocked":"Wird noch von {{p0}} Terminen verwendet \u2014 Gruppe zuerst leeren","calendar.group.global":"Global","calendar.location":"Ort","calendar.locationPlaceholder":"Ort\u2026","calendar.noteDate.addField":"Feld hinzuf\xFCgen","calendar.noteDate.addSource":"Quelle hinzuf\xFCgen","calendar.noteDatePreset.anniversaries":"Jahrestage","calendar.noteDatePreset.birthdays":"Geburtstage","calendar.noteDatePreset.blank":"Leere Quelle","calendar.noteDatePreset.deadlines":"Fristen","calendar.openLocation":"Auf Karte anzeigen","calendar.openLocationOf":"{{p0}} auf Karte anzeigen","calendar.overview.accounts":"Kalenderkonten","calendar.overview.calendars":"Kalender","calendar.overview.disabled":"Synchronisierung deaktiviert","calendar.overview.loading":"Kalendereintrag wird geladen\u2026","calendar.overview.month":"Monat","calendar.overview.none":"Keine","calendar.overview.plugin":"Aktives Plugin","calendar.overview.range":"Ausgew\xE4hlter Zeitraum","calendar.overview.selectedDate":"Ausgew\xE4hltes Datum","calendar.overview.selectedTime":"Ausgew\xE4hlte Uhrzeit","calendar.overview.sources":"Sichtbare Quellen","calendar.overview.unavailable":"Die Kalenderdetails konnten nicht geladen werden. \xD6ffne Eigenschaften erneut, um es nochmals zu versuchen.","calendar.overview.view":"Ansicht","calendar.overview.week":"Woche","calendar.overview.year":"Jahr","calendar.plugins.by":"Von","calendar.plugins.configure":"{{p0}} konfigurieren","calendar.plugins.disable":"{{p0}} im Kalender deaktivieren","calendar.plugins.empty":"Keine Kalenderintegrationen aktiv.","calendar.plugins.enable":"{{p0}} im Kalender aktivieren","calendar.plugins.version":"Version:","calendar.priority.high":"Hoch","calendar.priority.low":"Niedrig","calendar.priority.medium":"Mittel","calendar.priority.none":"Keine","calendar.properties.manageGroups":"Gruppen verwalten","calendar.quickadd.allDay":"Ganzt\xE4gig","calendar.quickadd.details":"Details","calendar.quickadd.dueDate":"F\xE4lligkeitsdatum","calendar.quickadd.editTitle":"{{kind}} bearbeiten","calendar.quickadd.endDate":"Enddatum","calendar.quickadd.kind":"Was hinzuf\xFCgen","calendar.quickadd.priority":"Priorit\xE4t","calendar.quickadd.startDate":"Startdatum","calendar.quickadd.when":"Wann","calendar.removeAttachment":"Anhang entfernen","calendar.removeAttachmentOf":"Anhang {{p0}} entfernen","calendar.removeLocation":"Ort entfernen","calendar.removeUrl":"Link entfernen","calendar.removeUrlOf":"Link {{p0}} entfernen","calendar.settings.groups":"Gruppen","calendar.settings.groupsDesc":"Gemeinsame Gruppen werden in den zentralen Gruppeneinstellungen erstellt und verwaltet.","calendar.settings.openItemsAgenda":"Kalender-Agenda","calendar.settings.openItemsIn":"Elemente \xF6ffnen in","calendar.settings.openItemsInDesc":"Legt fest, wo ein normaler Klick auf Kalenderinhalte das Element anzeigt.","calendar.settings.openItemsOwner":"Zugeh\xF6riges Plugin","calendar.sync.account":"Dieses Konto synchronisieren","calendar.sync.accountsError":"Konten konnten nicht geladen werden. Versuche es mit Aktualisieren erneut.","calendar.sync.back":"Zur\xFCck zu den Konten","calendar.sync.cached":"Bereits synchronisierte Termine bleiben verf\xFCgbar.","calendar.sync.calendarsError":"Kalender konnten nicht geladen werden. Pr\xFCfe die Verbindung unter Konten und versuche es erneut.","calendar.sync.connected":"Verbunden","calendar.sync.description":"W\xE4hle Kalender deiner bestehenden Konten und ordne sie einer Gruppe zu. Termine sind schreibgesch\xFCtzt.","calendar.sync.failed":"Kalendersynchronisierung fehlgeschlagen.","calendar.sync.group":"Gruppe f\xFCr {{name}}","calendar.sync.last":"Zuletzt synchronisiert: {{time}} \xB7 {{count}} Termine","calendar.sync.loadingAccounts":"Konten werden geladen\u2026","calendar.sync.loadingCalendars":"Kalender werden geladen\u2026","calendar.sync.manage":"Konten verwalten","calendar.sync.noCalendars":"F\xFCr dieses Konto wurden keine lesbaren Kalender gefunden.","calendar.sync.noGroup":"Keine Gruppe","calendar.sync.permission":"Der Kalenderzugriff fehlt. Aktiviere Kalender unter Konten.","calendar.sync.primary":"Standardkalender","calendar.sync.readOnly":"Ausgew\xE4hlte Kalender importieren. \xC4nderungen in Valley werden nicht an den Anbieter gesendet.","calendar.sync.reconnect":"Verbinde dieses Konto unter Konten erneut, um den Zugriff wiederherzustellen.","calendar.sync.refresh":"Konten aktualisieren und synchronisieren","calendar.sync.saveError":"Die Kalenderauswahl konnte nicht gespeichert werden.","calendar.sync.saved":"Die OAuth-Zugangsdaten sind gespeichert, aber noch kein Konto ist verbunden. \xD6ffne Konten und w\xE4hle Verbindung hinzuf\xFCgen, um den Zugriff zu erlauben.","calendar.sync.savedShort":"Zugangsdaten gespeichert \xB7 Konto nicht verbunden","calendar.sync.select":"{{name}} synchronisieren","calendar.sync.setup":"Richte diesen Anbieter unter Konten ein und erlaube danach den Kalenderzugriff.","calendar.sync.setupShort":"Unter Konten einrichten","calendar.undo.addEvent":"Ereignis \u201E{{title}}\u201C hinzuf\xFCgen","calendar.undo.deleteEvent":"Ereignis \u201E{{title}}\u201C l\xF6schen","calendar.undo.editEvent":"Veranstaltung \u201E{{title}}\u201C bearbeiten","calendar.url":"Link","calendar.urlPlaceholder":"https://\u2026","error.commandFailed":"Der Befehl ist fehlgeschlagen. Pr\xFCfe die Eingabe und versuche es erneut.","guard.preset.ask-for-writes":"Bei \xC4nderungen fragen","guard.preset.blocked":"Blockiert","guard.preset.read-only":"Nur lesen","guard.preset.recommended":"Empfohlen","manifest.description":"Termin- und Aufgabenplaner: Agenda in der linken Seitenleiste, kompakter Kalender rechts und eine vollst\xE4ndige Arbeitsbereichsseite mit Monats-, Wochen- und Jahresraster neben einer Live-Agendaspalte.","manifest.name":"Kalender","markdown.examples.agenda":"Agenda","markdown.examples.dateRange":"Datumsbereich","markdown.examples.day":"Heute","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.nextSeven":"N\xE4chste sieben Tage","markdown.examples.nextThirty":"N\xE4chste dreissig Tage","markdown.examples.week":"Woche","plugin.calendar.section.dates":"Notizdaten","plugin.calendar.section.plugins":"Plugins","plugin.calendar.section.sync":"Synchronisierte Kalender","backend.request":"Kalenderanfrage erwartet","backend.text":"Ung\xFCltiger Text in der Kalenderanfrage","backend.expired":"Die Kalenderergebnisse sind abgelaufen","backend.large":"Der Kalendereintrag ist zu gross","backend.account":"Unbekanntes Kalenderkonto","backend.permission":"Die Kalenderberechtigung fehlt. Verbinde das Konto unter Einstellungen \u2192 Konten erneut.","backend.endpoint":"Ung\xFCltiger Kalender-Endpunkt","backend.window":"Ung\xFCltiger Kalenderzeitraum","backend.pending":"Zu viele ausstehende Kalenderabfragen","backend.pages":"Das Limit der Kalenderseiten wurde \xFCberschritten","backend.continuation":"Ung\xFCltige URL f\xFCr die n\xE4chste Microsoft-Graph-Seite.","backend.microsoft":"Microsoft-Graph-Kalender konnte nicht geladen werden: {{status}}","backend.googleList":"Google-Kalenderliste konnte nicht geladen werden: {{status}}","backend.googleFetch":"Google-Kalender konnte nicht geladen werden: {{status}}","calendar.error.atomicLimit":"Diese \xC4nderung \xFCberschreitet das atomare Limit von 1000 Vorg\xE4ngen. Entferne weniger Quellen auf einmal.","calendar.source.incompatible":"Die Kalenderquelle \u201E{{owner}}\u201C verwendet eine inkompatible Version. Aktualisiere sie f\xFCr datumsbezogene, seitenweise Abfragen (v2).","calendar.source.failed":"Kalenderquelle \u201E{{owner}}\u201C: {{message}}","calendar.source.pageRevision":"Die Quelle hat eine ung\xFCltige oder ge\xE4nderte Seitenrevision zur\xFCckgegeben.","calendar.source.rangeLimit":"Der angeforderte Zeitraum umfasst mehr als {{limit}} Eintr\xE4ge. W\xE4hle einen kleineren Zeitraum.","calendar.source.invalidItems":"Die Quelle hat doppelte Eintr\xE4ge oder Eintr\xE4ge au\xDFerhalb des Zeitraums zur\xFCckgegeben.","calendar.source.cursor":"Die Quelle hat einen Seitencursor zur\xFCckgegeben, der nicht weiterf\xFChrt.","calendar.source.pageBudget":"Der angeforderte Zeitraum \xFCberschreitet die zul\xE4ssige Seitenanzahl.","calendar.source.unavailable":"Die Quelle ist nicht verf\xFCgbar."};var ao={"auto.02f17370b8d9":"Etiquetas de eventos","auto.04a212215ef9":"Confirmar","auto.04f6b3ea183e":"Reloj","auto.05d290d65a74":"Calendar: Listar eventos","auto.0623bfa38c8f":"Alcance de la carpeta","auto.082bc378cd60":"Mes","auto.0cd372226ee9":"T\xEDtulo del evento\u2026","auto.1389fda4dae3":"Intervalo de fechas recurrentes en a\xF1os","auto.1780c4a5f967":"A\xFAn no hay fuentes","auto.1a29d1bf66f5":"Nota\u2026","auto.1ac1ff7616a6":"todo el d\xEDa","auto.1cb00f4b1daf":"Calendario sincronizado \xB7 solo lectura","auto.221ca63005ea":"Sincronizando\u2026","auto.22819a02167d":"Ir a hoy","auto.240038c46892":"Eventos remotos","auto.24345a14377f":"Hoy","auto.24bdcf2d51f8":"Rango (a\xF1os)","auto.257ff123e390":"Ninguna nota coincide con {{p0}}: {{p1}}","auto.2a37335eebda":"Coraz\xF3n","auto.2ae8981158aa":"Eventos de solo lectura de cuentas conectadas en","auto.2b7d938e6787":"Sincronizar ahora","auto.2bc9464d49e9":"Es igual al valor","auto.2c924e308820":"Nota","auto.33a5a701e541":"T\xEDtulo de la tarea\u2026","auto.33ce417454bf":"Cargando\u2026","auto.34d8b60fe253":"Ocultar","auto.35b023ecbb81":"Nombre de la fuente (por ejemplo, cumplea\xF1os)","auto.3ae5b44a561f":"Excepciones de recurrencia","auto.408a0d16a8ba":"Muestre estas entradas: vuelva a colocar esta fuente en el calendario.","auto.418713defbf7":"No hay eventos ni tareas","auto.46fbb53a9be2":"Hora de inicio del d\xEDa","auto.475b6ce898d4":"Nombre de la fuente","auto.4869ac12717f":"Semana abierta","auto.48a7b8889e15":"opcional","auto.4cb741c63cbd":"Calendario de Microsoft","auto.4d064726954a":"Avanzado","auto.4da8c4eff514":"Nombre de la fuente: c\xF3mo aparece este grupo en la secci\xF3n Pr\xF3ximamente. Haga clic para cambiarle el nombre.","auto.4fda04775bdc":"Eliminar este campo","auto.50b47e47a104":"Sincronizar {{p0}}","auto.50f94286ba30":"Anterior","auto.519b42369442":"Tecla frontal opcional que contiene una hora de inicio HH:MM. Vac\xEDo \u21D2 una entrada para todo el d\xEDa.","auto.5210c5c047ea":"Agregue el n\xFAmero de a\xF1os, p.e. \u201CAda (36)\u201D.","auto.5301648dcf6b":"Editar","auto.55f1c767a3b1":"Propiedad de t\xEDtulo","auto.570374e4e4cc":"Calendario de Google","auto.5d12631f0a8b":"Enlaces de eventos","auto.611f3791dc68":"Propiedad de hora de inicio","auto.61cc55aa0453":"Agregar","auto.65c01f7ba330":"Agregue uno a continuaci\xF3n, luego complete el valor inicial con el que debe coincidir.","auto.691b674766e5":"Propiedad de fecha","auto.6d07b3164ac0":"Muestra fechas recurrentes solo dentro de esa cantidad de a\xF1os antes y despu\xE9s del a\xF1o actual.","auto.702e8114bce7":"Adjuntos de eventos","auto.736a07e01797":"Oculta estas entradas: conserva la fuente pero deja de dibujarla en el calendario.","auto.73d64a823b7d":"Agregar etiqueta\u2026","auto.768e0c1c6957":"T\xEDtulo","auto.77dfd2135f4d":"Cancelar","auto.7a3a9094b18c":"Calendario abierto","auto.7a46866bc719":"HOY","auto.7bf039eeb194":"Clave frontal que contiene la fecha: 1990-05-04, o --05-04 cuando se desconoce el a\xF1o.","auto.7bf74c2d99d6":"\xCDcono de entrada: dibujado en cada entrada del calendario de esta fuente. Opcional: d\xE9jelo as\xED para obtener un chip simple.","auto.7c1496f9a7dc":"\xBFEliminar \u201C{{p0}}\u201D?","auto.7eacb0e385b4":"A\xFAn no hay cuentas de calendario conectadas: agregue una en Configuraci\xF3n \u2192 Cuentas.","auto.7f852a5678f1":"Calendar: Establecer vista","auto.7f8a6fad8b7c":"Agregar evento","auto.808d7dca8a74":"Predeterminado","auto.8410192cbb1f":"Ruta del archivo vinculado","auto.85a7de6e2705":"Estrella","auto.86c0a35ec883":"M\xE1s opciones","auto.879e32326c52":"A\xF1o","auto.88d8206d586a":"Hora de inicio","auto.891e9d6d47f1":"Orden del d\xEDa","auto.8bbc96d44546":"C\xF3mo se escribe la fecha en la nota: dd, mm y yyyy con cualquier separador (dd.mm.yyyy, mm/dd/yyyy o dd.mm sin a\xF1o). D\xE9jalo vac\xEDo para detectarlo.","auto.8c41ae88467f":"Persona","auto.8d0a32ed6339":"Regalo","auto.92bcda7f379e":"Icono de entrada","auto.9444501818e6":"Calendarios","auto.94ee88690828":"Formato de fecha","auto.95553ba8a405":"Sin icono","auto.958788fc103f":"Fechas de notas","auto.981f473aa731":"color de contorno","auto.9acc52f8cf89":"Eliminar etiqueta {{p0}}","auto.9ae33a7d0ecb":"Propiedad","auto.9c6e5a3f44fc":"Pastel","auto.9c918414710c":"Alfiler","auto.9ddab8990070":"Mostrar recuento","auto.9eb56535c39a":"Calendar estado de sincronizaci\xF3n","auto.9ee309dcedc9":"Abrir p\xE1gina","auto.9fa90b203761":"Color de entrada","auto.a2590d497e7c":"No hay eventos en esta ventana.","auto.a3cbb98ddf5e":"Nombre de archivo","auto.a3fa4c4a4715":"Valor frontal","auto.a774409a00c2":"Bandera","auto.ad8919ace091":"Evento","auto.ad980036b394":"Toda la b\xF3veda","auto.adab5090ac6a":"Calendario","auto.ae8a5b196587":"S\xED, eliminar","auto.aee875c4edbf":"Propiedad del tiempo de finalizaci\xF3n","auto.b29a9852d77e":"Abrir p\xE1gina Calendar","auto.b2db10062979":"Anotar las fuentes de la fecha","auto.b6f727f0c520":"D\xEDa (mensual)","auto.b82220d034e7":"Clave frontal","auto.bc981983e7f5":"Siguiente","auto.bf2660184858":"Calendar: Ir a la fecha","auto.c2b47c770575":"calendarios sincronizados","auto.c5497bca5846":"Eventos","auto.c66a827e3397":"Abrir nota","auto.c7f73bb54d92":"Configuraci\xF3n","auto.c845e23963ef":'Elimina la fuente "{{p0}}": las notas en s\xED no se modifican.',"auto.cd7800da7f4f":"Hora de finalizaci\xF3n","auto.cfbf9d49c1da":". Elija qu\xE9 calendarios aparecen aqu\xED.","auto.d4198662a72f":"Campana","auto.d4ea5b59b68b":"{{p0}} notas coinciden \xB7 {{p1}} con una fecha utilizable","auto.d5e8ba205867":"Configuraci\xF3n \u2192 Cuentas","auto.d669db3f6b34":"No hay tareas ni eventos este d\xEDa","auto.d75a293ea22a":"Haga clic nuevamente para eliminar esta fuente.","auto.d97d1ee339e4":"Mostrar","auto.dbed7864623f":"Calendar grupo","auto.dd4b99ddaf61":"D\xEDa + mes (anual)","auto.e0db2991e37a":"Agregar etiqueta","auto.e10282ef1972":"Coincidencia de fecha","auto.e16f07326a18":"Calendar: agregar un evento","auto.e6ffec68b5ae":"{{p0}} notas coinciden \xB7 ninguna tiene un {{p1}} utilizable","auto.e7de9576dc00":"Archivo vinculado (ruta de la b\xF3veda)\u2026","auto.ec42f1f55523":"Agregar todo","auto.ee8581831b9c":"Calendar: Ir a hoy","auto.ef5ea5a743b3":"Clave frontal para mostrar","auto.efc007a393f6":"Guardar","auto.f07b365f8502":"Primera hora mostrada en la cuadr\xEDcula semanal (0\u201323). Las horas anteriores se desplazan encima.","auto.f4a0d0857b02":"Borrar {{p0}}","auto.f4e12416c6b8":"Sin art\xEDculos","auto.f6b2246c64fa":"Ning\xFAn grupo","auto.f6fdbe48dc54":"Eliminar","auto.f82be68a7fb4":"Semana","auto.fb3a16f382f8":"Copiar enlace de Valley","auto.fd303c72a405":"Fecha exacta (d\xEDa + mes + a\xF1o)","calendar.action.openAttachment":"Adjunto","calendar.action.openLink":"Enlace","calendar.action.showOnMap":"Mostrar en el mapa","calendar.addAttachment":"A\xF1adir adjunto","calendar.addUrl":"A\xF1adir enlace","calendar.agenda.clearSearch":"Borrar b\xFAsqueda","calendar.agenda.searchLabel":"Buscar en la agenda","calendar.agenda.searchPlaceholder":"Buscar en la agenda\u2026","calendar.attachmentPath":"Ruta del adjunto","calendar.attachmentPlaceholder":"Adjuntar un archivo\u2026","calendar.attachments":"Adjuntos","calendar.badge.attachment":"Adjunto","calendar.badge.link":"Enlace","calendar.badge.location":"Ubicaci\xF3n","calendar.badge.note":"Nota vinculada","calendar.colorRule.folder":"Carpeta","calendar.colorRule.property":"Propiedad","calendar.colorRule.tag":"Hashtag","calendar.command.delete":"Calendario: Eliminar elemento","calendar.command.editFields":"Calendario: Editar campos del elemento","calendar.command.get":"Calendario: Obtener elemento","calendar.command.listItems":"Calendario: Listar todos los elementos","calendar.command.open":"Calendario: Abrir elemento","calendar.command.openCached":"Calendario: Abrir evento en cach\xE9","calendar.command.sourceAction":"Calendario: Ejecutar acci\xF3n del elemento de origen","calendar.command.sourceActions":"Calendario: Listar acciones de los elementos de origen","calendar.command.sourceCreate":"Calendario: Crear elemento de origen","calendar.command.sources":"Calendario: Listar fuentes de elementos","calendar.dayEndHour":"Hora de fin del d\xEDa","calendar.dayEndHourDesc":"\xDAltima hora mostrada en la cuadr\xEDcula semanal (1\u201324). Las horas posteriores se desplazan debajo.","calendar.dayWindowGrows":"Un elemento fuera de la ventana se muestra igualmente: la cuadr\xEDcula crece para alcanzarlo.","calendar.editor.close":"Cerrar","calendar.editor.retry":"Activa o vuelve a cargar el plugin responsable y abre este elemento de nuevo.","calendar.editor.unavailable":"Editor no disponible","calendar.error.changed":"Este evento cambi\xF3 en otro lugar. Tu borrador se conserva. Cancela para cargar la \xFAltima versi\xF3n.","calendar.error.missing":"El elemento del calendario ya no existe.","calendar.error.save":"No se pudo guardar el evento. Tus cambios se conservan.","calendar.field.attachments":"Adjuntos","calendar.field.completed":"Completado","calendar.field.date":"Fecha","calendar.field.endDate":"Fecha de fin","calendar.field.endTime":"Hora de finalizaci\xF3n","calendar.field.filePath":"Archivo vinculado","calendar.field.group":"Grupo","calendar.field.groupId":"Grupo","calendar.field.location":"Ubicaci\xF3n","calendar.field.note":"Notas","calendar.field.priority":"Prioridad","calendar.field.startTime":"Hora de inicio","calendar.field.tags":"Etiquetas","calendar.field.title":"T\xEDtulo","calendar.field.urls":"Enlaces","calendar.filter.deselectAll":"Deseleccionar todo","calendar.filter.events":"Eventos","calendar.filter.groups":"Grupos","calendar.filter.noGroups":"A\xFAn no hay grupos","calendar.filter.noSources":"Sin fuentes","calendar.filter.noteDates":"Fechas de notas","calendar.filter.selectAll":"Seleccionar todo","calendar.filter.sources":"Fuentes","calendar.group.deleteBlocked":"Todav\xEDa lo usan {{p0}} eventos: vac\xEDa el grupo para eliminarlo","calendar.group.global":"Global","calendar.location":"Ubicaci\xF3n","calendar.locationPlaceholder":"Ubicaci\xF3n\u2026","calendar.noteDate.addField":"Agregar campo","calendar.noteDate.addSource":"Agregar fuente","calendar.noteDatePreset.anniversaries":"Aniversarios","calendar.noteDatePreset.birthdays":"Cumplea\xF1os","calendar.noteDatePreset.blank":"Fuente en blanco","calendar.noteDatePreset.deadlines":"Fechas l\xEDmite","calendar.openLocation":"Mostrar en el mapa","calendar.openLocationOf":"Mostrar {{p0}} en el mapa","calendar.overview.accounts":"Cuentas de calendario","calendar.overview.calendars":"Calendarios","calendar.overview.disabled":"Sincronizaci\xF3n desactivada","calendar.overview.loading":"Cargando elemento del calendario\u2026","calendar.overview.month":"Mes","calendar.overview.none":"Ninguna","calendar.overview.plugin":"Plugin activo","calendar.overview.range":"Intervalo seleccionado","calendar.overview.selectedDate":"Fecha seleccionada","calendar.overview.selectedTime":"Hora seleccionada","calendar.overview.sources":"Fuentes visibles","calendar.overview.unavailable":"No se pudieron cargar los detalles del calendario. Vuelve a abrir Propiedades para reintentar.","calendar.overview.view":"Vista","calendar.overview.week":"Semana","calendar.overview.year":"A\xF1o","calendar.plugins.by":"Por","calendar.plugins.configure":"Configurar {{p0}}","calendar.plugins.disable":"Desactivar {{p0}} en Calendario","calendar.plugins.empty":"No hay integraciones de calendario activas.","calendar.plugins.enable":"Activar {{p0}} en Calendario","calendar.plugins.version":"Versi\xF3n:","calendar.priority.high":"Alta","calendar.priority.low":"Baja","calendar.priority.medium":"Media","calendar.priority.none":"Ninguna","calendar.properties.manageGroups":"Gestionar grupos","calendar.quickadd.allDay":"Todo el d\xEDa","calendar.quickadd.details":"Detalles","calendar.quickadd.dueDate":"Fecha l\xEDmite","calendar.quickadd.editTitle":"Editar {{kind}}","calendar.quickadd.endDate":"Fecha de fin","calendar.quickadd.kind":"Qu\xE9 a\xF1adir","calendar.quickadd.priority":"Prioridad","calendar.quickadd.startDate":"Fecha de inicio","calendar.quickadd.when":"Cu\xE1ndo","calendar.removeAttachment":"Quitar adjunto","calendar.removeAttachmentOf":"Quitar adjunto {{p0}}","calendar.removeLocation":"Quitar ubicaci\xF3n","calendar.removeUrl":"Quitar enlace","calendar.removeUrlOf":"Quitar enlace {{p0}}","calendar.settings.groups":"Grupos","calendar.settings.groupsDesc":"Los grupos compartidos se crean y gestionan en la configuraci\xF3n central de Grupos.","calendar.settings.openItemsAgenda":"Agenda del calendario","calendar.settings.openItemsIn":"Abrir elementos en","calendar.settings.openItemsInDesc":"Elige d\xF3nde muestra el elemento un clic normal en el contenido del calendario.","calendar.settings.openItemsOwner":"Plugin propietario","calendar.sync.account":"Sincronizar esta cuenta","calendar.sync.accountsError":"No se pudieron cargar las cuentas. Actualiza para reintentar.","calendar.sync.back":"Volver a las cuentas","calendar.sync.cached":"Los eventos sincronizados anteriormente siguen disponibles.","calendar.sync.calendarsError":"No se pudieron cargar los calendarios. Revisa la conexi\xF3n en Cuentas y reintenta.","calendar.sync.connected":"Conectado","calendar.sync.description":"Elige calendarios de tus cuentas y asigna cada uno a un grupo. Los eventos son de solo lectura.","calendar.sync.failed":"Fall\xF3 la sincronizaci\xF3n del calendario.","calendar.sync.group":"Grupo de {{name}}","calendar.sync.last":"\xDAltima sincronizaci\xF3n: {{time}} \xB7 {{count}} eventos","calendar.sync.loadingAccounts":"Cargando cuentas\u2026","calendar.sync.loadingCalendars":"Cargando calendarios\u2026","calendar.sync.manage":"Administrar cuentas","calendar.sync.noCalendars":"No se encontraron calendarios accesibles para esta cuenta.","calendar.sync.noGroup":"Ning\xFAn grupo","calendar.sync.permission":"Falta el permiso de calendario. Activa Calendario en Cuentas.","calendar.sync.primary":"Calendario predeterminado","calendar.sync.readOnly":"Importa los calendarios seleccionados. Los cambios en Valley no se env\xEDan al proveedor.","calendar.sync.reconnect":"Vuelve a conectar esta cuenta en Cuentas para restaurar el acceso.","calendar.sync.refresh":"Actualizar cuentas y sincronizar","calendar.sync.saveError":"No se pudo guardar la selecci\xF3n de calendarios.","calendar.sync.saved":"Las credenciales OAuth est\xE1n guardadas, pero todav\xEDa no hay ninguna cuenta conectada. Abre Cuentas y elige A\xF1adir conexi\xF3n para autorizar el acceso.","calendar.sync.savedShort":"Credenciales guardadas \xB7 Cuenta sin conectar","calendar.sync.select":"Sincronizar {{name}}","calendar.sync.setup":"Configura este proveedor en Cuentas y autoriza el acceso al calendario.","calendar.sync.setupShort":"Configurar en Cuentas","calendar.undo.addEvent":"Agregar evento \u201C{{title}}\u201D","calendar.undo.deleteEvent":"Eliminar evento \u201C{{title}}\u201D","calendar.undo.editEvent":"Editar evento \u201C{{title}}\u201D","calendar.url":"Enlace","calendar.urlPlaceholder":"https://\u2026","error.commandFailed":"El comando ha fallado. Revisa la entrada e int\xE9ntalo de nuevo.","guard.preset.ask-for-writes":"Preguntar antes de escribir","guard.preset.blocked":"Bloqueado","guard.preset.read-only":"Solo lectura","guard.preset.recommended":"Recomendado","manifest.description":"Planificador de eventos y tareas: agenda en la barra lateral izquierda, calendario compacto a la derecha y una p\xE1gina completa con cuadr\xEDculas de mes/semana/a\xF1o junto a una columna de agenda en vivo.","manifest.name":"Calendario","markdown.examples.agenda":"Agenda","markdown.examples.dateRange":"Intervalo de fechas","markdown.examples.day":"Hoy","markdown.examples.filtered":"Resultados filtrados","markdown.examples.nextSeven":"Pr\xF3ximos siete d\xEDas","markdown.examples.nextThirty":"Pr\xF3ximos treinta d\xEDas","markdown.examples.week":"Semana","plugin.calendar.section.dates":"Fechas de notas","plugin.calendar.section.plugins":"Plugins","plugin.calendar.section.sync":"Calendarios sincronizados","backend.request":"Se esperaba una solicitud de calendario","backend.text":"Texto de solicitud de calendario no v\xE1lido","backend.expired":"La p\xE1gina de eventos del calendario ha caducado","backend.large":"El evento del calendario es demasiado grande","backend.account":"Cuenta de calendario desconocida","backend.permission":"Falta el permiso de calendario. Vuelve a conectar en Ajustes \u2192 Cuentas.","backend.endpoint":"Punto de conexi\xF3n del calendario no v\xE1lido","backend.window":"Intervalo de tiempo del calendario no v\xE1lido","backend.pending":"Demasiados resultados de calendario pendientes","backend.pages":"Se ha superado el l\xEDmite de p\xE1ginas del calendario","backend.continuation":"URL de continuaci\xF3n de Microsoft Graph no v\xE1lida.","backend.microsoft":"No se pudo obtener el calendario de Microsoft Graph: {{status}}","backend.googleList":"No se pudo obtener la lista de Google Calendar: {{status}}","backend.googleFetch":"No se pudo obtener Google Calendar: {{status}}","calendar.error.atomicLimit":"Este cambio supera el l\xEDmite at\xF3mico de 1000 operaciones. Elimina menos fuentes a la vez.","calendar.source.incompatible":"La fuente de calendario \xAB{{owner}}\xBB usa una versi\xF3n incompatible. Actual\xEDzala para admitir consultas por fecha y por p\xE1ginas (v2).","calendar.source.failed":"Fuente de calendario \xAB{{owner}}\xBB: {{message}}","calendar.source.pageRevision":"La fuente devolvi\xF3 una revisi\xF3n de p\xE1gina no v\xE1lida o modificada.","calendar.source.rangeLimit":"El intervalo solicitado supera los {{limit}} elementos. Elige un intervalo menor.","calendar.source.invalidItems":"La fuente devolvi\xF3 elementos duplicados o fuera del intervalo.","calendar.source.cursor":"La fuente devolvi\xF3 un cursor de p\xE1gina que no avanza.","calendar.source.pageBudget":"El intervalo solicitado supera el l\xEDmite de p\xE1ginas.","calendar.source.unavailable":"La fuente no est\xE1 disponible."};var no={"auto.02f17370b8d9":"Balises d'\xE9v\xE9nement","auto.04a212215ef9":"Confirmer","auto.04f6b3ea183e":"Horloge","auto.05d290d65a74":"Calendar: lister les \xE9v\xE9nements","auto.0623bfa38c8f":"Port\xE9e du dossier","auto.082bc378cd60":"Mois","auto.0cd372226ee9":"Titre de l'\xE9v\xE9nement\u2026","auto.1389fda4dae3":"Plage de dates r\xE9currente en ann\xE9es","auto.1780c4a5f967":"Aucune source pour l'instant","auto.1a29d1bf66f5":"Noter\u2026","auto.1ac1ff7616a6":"toute la journ\xE9e","auto.1cb00f4b1daf":"Calendrier synchronis\xE9 \xB7 lecture seule","auto.221ca63005ea":"Synchronisation\u2026","auto.22819a02167d":"Allez \xE0 aujourd'hui","auto.240038c46892":"\xC9v\xE9nements \xE0 distance","auto.24345a14377f":"Aujourd'hui","auto.24bdcf2d51f8":"Plage (ann\xE9es)","auto.257ff123e390":"Aucune note ne correspond \xE0 {{p0}} : {{p1}}","auto.2a37335eebda":"C\u0153ur","auto.2ae8981158aa":"\xC9v\xE9nements en lecture seule des comptes connect\xE9s","auto.2b7d938e6787":"Synchroniser maintenant","auto.2bc9464d49e9":"Est \xE9gal \xE0 la valeur","auto.2c924e308820":"Note","auto.33a5a701e541":"Titre de la t\xE2che\u2026","auto.33ce417454bf":"Chargement\u2026","auto.34d8b60fe253":"Masquer","auto.35b023ecbb81":"Nom de la source (par exemple, anniversaires)","auto.3ae5b44a561f":"Exceptions de r\xE9currence","auto.408a0d16a8ba":"Affichez ces entr\xE9es \u2014 remettez cette source sur le calendrier.","auto.418713defbf7":"Aucun \xE9v\xE9nement ou t\xE2che","auto.46fbb53a9be2":"Heure de d\xE9but de journ\xE9e","auto.475b6ce898d4":"Nom de la source","auto.4869ac12717f":"Semaine portes ouvertes","auto.48a7b8889e15":"facultatif","auto.4cb741c63cbd":"Microsoft Calendar","auto.4d064726954a":"Avanc\xE9","auto.4da8c4eff514":"Nom de la source : comment ce groupe est r\xE9pertori\xE9 dans la section \xC0 venir. Cliquez pour le renommer.","auto.4fda04775bdc":"Supprimer ce champ","auto.50b47e47a104":"Synchroniser {{p0}}","auto.50f94286ba30":"Pr\xE9c\xE9dent","auto.519b42369442":"Cl\xE9 de front facultative contenant une heure de d\xE9but HH:MM. Vide \u21D2 une entr\xE9e toute la journ\xE9e.","auto.5210c5c047ea":`Ajoutez le nombre d'ann\xE9es, par ex. "Ada (36)".`,"auto.5301648dcf6b":"Modifier","auto.55f1c767a3b1":"Propri\xE9t\xE9 du titre","auto.570374e4e4cc":"Google Calendar","auto.5d12631f0a8b":"Liens d'\xE9v\xE9nements","auto.611f3791dc68":"Propri\xE9t\xE9 d'heure de d\xE9but","auto.61cc55aa0453":"Ajouter","auto.65c01f7ba330":"Ajoutez-en un ci-dessous, puis remplissez la valeur frontale \xE0 laquelle elle doit correspondre.","auto.691b674766e5":"Propri\xE9t\xE9 de date","auto.6d07b3164ac0":"Afficher les dates r\xE9currentes uniquement dans cette plage d\u2019ann\xE9es avant et apr\xE8s l\u2019ann\xE9e en cours.","auto.702e8114bce7":"Pi\xE8ces jointes \xE0 l'\xE9v\xE9nement","auto.736a07e01797":"Masquez ces entr\xE9es \u2013 conservez la source mais arr\xEAtez de la dessiner sur le calendrier.","auto.73d64a823b7d":"Ajouter une balise\u2026","auto.768e0c1c6957":"Titre","auto.77dfd2135f4d":"Annuler","auto.7a3a9094b18c":"Ouvrir Calendar","auto.7a46866bc719":"AUJOURD'HUI","auto.7bf039eeb194":"Cl\xE9 Frontmatter contenant la date : 1990-05-04, ou --05-04 lorsque l'ann\xE9e est inconnue.","auto.7bf74c2d99d6":"Ic\xF4ne d'entr\xE9e : dessin\xE9e sur chaque entr\xE9e de calendrier provenant de cette source. Facultatif : laissez-le de c\xF4t\xE9 pour une simple puce.","auto.7c1496f9a7dc":"Supprimer \xAB {{p0}} \xBB ?","auto.7eacb0e385b4":"Aucun compte de calendrier connect\xE9 pour le moment : ajoutez-en un dans Param\xE8tres \u2192 Comptes.","auto.7f852a5678f1":"Calendar: d\xE9finir la vue","auto.7f8a6fad8b7c":"Ajouter un \xE9v\xE9nement","auto.808d7dca8a74":"Par d\xE9faut","auto.8410192cbb1f":"Chemin du fichier li\xE9","auto.85a7de6e2705":"\xC9toile","auto.86c0a35ec883":"Plus d'options","auto.879e32326c52":"Ann\xE9e","auto.88d8206d586a":"Heure de d\xE9but","auto.891e9d6d47f1":"Ordre du jour","auto.8bbc96d44546":"Comment la date est \xE9crite dans la note : dd, mm et yyyy avec tous les s\xE9parateurs (dd.mm.yyyy, mm/dd/yyyy ou dd.mm sans ann\xE9e). Laissez vide pour le d\xE9tecter.","auto.8c41ae88467f":"Personne","auto.8d0a32ed6339":"Cadeau","auto.92bcda7f379e":"Ic\xF4ne d'entr\xE9e","auto.9444501818e6":"Calendriers","auto.94ee88690828":"Format des dates","auto.95553ba8a405":"Aucune ic\xF4ne","auto.958788fc103f":"Dates des notes","auto.981f473aa731":"Couleur du contour","auto.9acc52f8cf89":"Supprimer la balise {{p0}}","auto.9ae33a7d0ecb":"Propri\xE9t\xE9","auto.9c6e5a3f44fc":"G\xE2teau","auto.9c918414710c":"\xC9pingle","auto.9ddab8990070":"Afficher le d\xE9compte","auto.9eb56535c39a":"Calendar \xE9tat de synchronisation","auto.9ee309dcedc9":"Ouvrir la page","auto.9fa90b203761":"Couleur d'entr\xE9e","auto.a2590d497e7c":"Aucun \xE9v\xE9nement dans cette fen\xEAtre.","auto.a3cbb98ddf5e":"Nom de fichier","auto.a3fa4c4a4715":"Valeur avant-gardiste","auto.a774409a00c2":"Drapeau","auto.ad8919ace091":"\xC9v\xE9nement","auto.ad980036b394":"Coffre entier","auto.adab5090ac6a":"Calendrier","auto.ae8a5b196587":"Oui, supprimer","auto.aee875c4edbf":"Propri\xE9t\xE9 d'heure de fin","auto.b29a9852d77e":"Ouvrir la page Calendar","auto.b2db10062979":"Notez les sources de dates","auto.b6f727f0c520":"Jour (mensuel)","auto.b82220d034e7":"Cl\xE9 de front","auto.bc981983e7f5":"Suivant","auto.bf2660184858":"Calendar: Aller \xE0 la date","auto.c2b47c770575":"Calendriers synchronis\xE9s","auto.c5497bca5846":"\xC9v\xE9nements","auto.c66a827e3397":"Ouvrir la note","auto.c7f73bb54d92":"Param\xE8tres","auto.c845e23963ef":'Supprimez la source "{{p0}}" : les notes elles-m\xEAmes restent intactes.',"auto.cd7800da7f4f":"Heure de fin","auto.cfbf9d49c1da":". Choisissez les calendriers qui apparaissent ici.","auto.d4198662a72f":"Cloche","auto.d4ea5b59b68b":"{{p0}} notes correspondent \xB7 {{p1}} avec une date utilisable","auto.d5e8ba205867":"Param\xE8tres \u2192 Comptes","auto.d669db3f6b34":"Aucune t\xE2che ni \xE9v\xE9nement ce jour-l\xE0","auto.d75a293ea22a":"Cliquez \xE0 nouveau pour supprimer cette source.","auto.d97d1ee339e4":"Afficher","auto.dbed7864623f":"Calendar groupe","auto.dd4b99ddaf61":"Jour + mois (annuel)","auto.e0db2991e37a":"Ajouter une balise","auto.e10282ef1972":"Correspondance des dates","auto.e16f07326a18":"Calendar: ajouter un \xE9v\xE9nement","auto.e6ffec68b5ae":"{{p0}} notes correspondent \xB7 aucune n'a de {{p1}} utilisable","auto.e7de9576dc00":"Fichier li\xE9 (chemin du coffre-fort)\u2026","auto.ec42f1f55523":"Ajouter une t\xE2che","auto.ee8581831b9c":"Calendar: Acc\xE9dez \xE0 aujourd'hui","auto.ef5ea5a743b3":"Cl\xE9 de front \xE0 afficher","auto.efc007a393f6":"Enregistrer","auto.f07b365f8502":"Premi\xE8re heure affich\xE9e dans la grille hebdomadaire (0\u201323). Les heures pr\xE9c\xE9dentes d\xE9filent au-dessus.","auto.f4a0d0857b02":"Effacer {{p0}}","auto.f4e12416c6b8":"Aucun article","auto.f6b2246c64fa":"Aucun groupe","auto.f6fdbe48dc54":"Supprimer","auto.f82be68a7fb4":"Semaine","auto.fb3a16f382f8":"Copier le lien Valley","auto.fd303c72a405":"Date exacte (jour + mois + ann\xE9e)","calendar.action.openAttachment":"Pi\xE8ce jointe","calendar.action.openLink":"Lien","calendar.action.showOnMap":"Afficher sur la carte","calendar.addAttachment":"Ajouter une pi\xE8ce jointe","calendar.addUrl":"Ajouter un lien","calendar.agenda.clearSearch":"Effacer la recherche","calendar.agenda.searchLabel":"Rechercher dans l\u2019agenda","calendar.agenda.searchPlaceholder":"Rechercher dans l\u2019agenda\u2026","calendar.attachmentPath":"Chemin de la pi\xE8ce jointe","calendar.attachmentPlaceholder":"Joindre un fichier\u2026","calendar.attachments":"Pi\xE8ces jointes","calendar.badge.attachment":"Pi\xE8ce jointe","calendar.badge.link":"Lien","calendar.badge.location":"Lieu","calendar.badge.note":"Note li\xE9e","calendar.colorRule.folder":"Dossier","calendar.colorRule.property":"Propri\xE9t\xE9","calendar.colorRule.tag":"Hashtag","calendar.command.delete":"Calendrier : Supprimer un \xE9l\xE9ment","calendar.command.editFields":"Calendrier : Modifier les champs d\u2019un \xE9l\xE9ment","calendar.command.get":"Calendrier : Lire un \xE9l\xE9ment","calendar.command.listItems":"Calendrier : Lister tous les \xE9l\xE9ments","calendar.command.open":"Calendrier : Ouvrir un \xE9l\xE9ment","calendar.command.openCached":"Calendrier : Ouvrir un \xE9v\xE9nement en cache","calendar.command.sourceAction":"Calendrier : Ex\xE9cuter une action sur un \xE9l\xE9ment source","calendar.command.sourceActions":"Calendrier : Lister les actions des \xE9l\xE9ments sources","calendar.command.sourceCreate":"Calendrier : Cr\xE9er un \xE9l\xE9ment source","calendar.command.sources":"Calendrier : Lister les sources d\u2019\xE9l\xE9ments","calendar.dayEndHour":"Heure de fin de journ\xE9e","calendar.dayEndHourDesc":"Derni\xE8re heure affich\xE9e dans la grille hebdomadaire (1\u201324). Les heures suivantes d\xE9filent en dessous.","calendar.dayWindowGrows":"Un \xE9l\xE9ment hors de la plage reste affich\xE9 \u2014 la grille s\u2019\xE9tend jusqu\u2019\xE0 lui.","calendar.editor.close":"Fermer","calendar.editor.retry":"Activez ou rechargez le plugin concern\xE9, puis r\xE9essayez d\u2019ouvrir cet \xE9l\xE9ment.","calendar.editor.unavailable":"\xC9diteur indisponible","calendar.error.changed":"Cet \xE9v\xE9nement a \xE9t\xE9 modifi\xE9 ailleurs. Votre brouillon est conserv\xE9. Annulez pour charger la derni\xE8re version.","calendar.error.missing":"L\u2019\xE9l\xE9ment du calendrier n\u2019existe plus.","calendar.error.save":"Impossible d\u2019enregistrer l\u2019\xE9v\xE9nement. Vos modifications sont conserv\xE9es.","calendar.field.attachments":"Pi\xE8ces jointes","calendar.field.completed":"Termin\xE9","calendar.field.date":"Date","calendar.field.endDate":"Date de fin","calendar.field.endTime":"Heure de fin","calendar.field.filePath":"Fichier li\xE9","calendar.field.group":"Groupe","calendar.field.groupId":"Groupe","calendar.field.location":"Lieu","calendar.field.note":"Notes","calendar.field.priority":"Priorit\xE9","calendar.field.startTime":"Heure de d\xE9but","calendar.field.tags":"\xC9tiquettes","calendar.field.title":"Titre","calendar.field.urls":"Liens","calendar.filter.deselectAll":"Tout d\xE9s\xE9lectionner","calendar.filter.events":"\xC9v\xE9nements","calendar.filter.groups":"Groupes","calendar.filter.noGroups":"Aucun groupe","calendar.filter.noSources":"Aucune source","calendar.filter.noteDates":"Dates des notes","calendar.filter.selectAll":"Tout s\xE9lectionner","calendar.filter.sources":"Sources","calendar.group.deleteBlocked":"Encore utilis\xE9 par {{p0}} \xE9v\xE9nements \u2014 videz le groupe pour le supprimer","calendar.group.global":"Global","calendar.location":"Lieu","calendar.locationPlaceholder":"Lieu\u2026","calendar.noteDate.addField":"Ajouter un champ","calendar.noteDate.addSource":"Ajouter une source","calendar.noteDatePreset.anniversaries":"Anniversaires","calendar.noteDatePreset.birthdays":"Anniversaires de naissance","calendar.noteDatePreset.blank":"Source vierge","calendar.noteDatePreset.deadlines":"\xC9ch\xE9ances","calendar.openLocation":"Afficher sur la carte","calendar.openLocationOf":"Afficher {{p0}} sur la carte","calendar.overview.accounts":"Comptes de calendrier","calendar.overview.calendars":"Calendriers","calendar.overview.disabled":"Synchronisation d\xE9sactiv\xE9e","calendar.overview.loading":"Chargement de l\u2019\xE9l\xE9ment du calendrier\u2026","calendar.overview.month":"Mois","calendar.overview.none":"Aucune","calendar.overview.plugin":"Plugin actif","calendar.overview.range":"P\xE9riode s\xE9lectionn\xE9e","calendar.overview.selectedDate":"Date s\xE9lectionn\xE9e","calendar.overview.selectedTime":"Heure s\xE9lectionn\xE9e","calendar.overview.sources":"Sources visibles","calendar.overview.unavailable":"Impossible de charger les d\xE9tails du calendrier. Rouvrez Propri\xE9t\xE9s pour r\xE9essayer.","calendar.overview.view":"Vue","calendar.overview.week":"Semaine","calendar.overview.year":"Ann\xE9e","calendar.plugins.by":"Par","calendar.plugins.configure":"Configurer {{p0}}","calendar.plugins.disable":"D\xE9sactiver {{p0}} dans Calendrier","calendar.plugins.empty":"Aucune int\xE9gration de calendrier active.","calendar.plugins.enable":"Activer {{p0}} dans Calendrier","calendar.plugins.version":"Version :","calendar.priority.high":"Haute","calendar.priority.low":"Basse","calendar.priority.medium":"Moyenne","calendar.priority.none":"Aucune","calendar.properties.manageGroups":"G\xE9rer les groupes","calendar.quickadd.allDay":"Toute la journ\xE9e","calendar.quickadd.details":"D\xE9tails","calendar.quickadd.dueDate":"Date d'\xE9ch\xE9ance","calendar.quickadd.editTitle":"Modifier {{kind}}","calendar.quickadd.endDate":"Date de fin","calendar.quickadd.kind":"Que cr\xE9er","calendar.quickadd.priority":"Priorit\xE9","calendar.quickadd.startDate":"Date de d\xE9but","calendar.quickadd.when":"Quand","calendar.removeAttachment":"Supprimer la pi\xE8ce jointe","calendar.removeAttachmentOf":"Supprimer la pi\xE8ce jointe {{p0}}","calendar.removeLocation":"Supprimer le lieu","calendar.removeUrl":"Supprimer le lien","calendar.removeUrlOf":"Supprimer le lien {{p0}}","calendar.settings.groups":"Groupes","calendar.settings.groupsDesc":"Les groupes partag\xE9s sont cr\xE9\xE9s et g\xE9r\xE9s dans les r\xE9glages centraux des groupes.","calendar.settings.openItemsAgenda":"Agenda du calendrier","calendar.settings.openItemsIn":"Ouvrir les \xE9l\xE9ments dans","calendar.settings.openItemsInDesc":"Choisissez o\xF9 un clic normal sur le contenu du calendrier affiche l\u2019\xE9l\xE9ment.","calendar.settings.openItemsOwner":"Plugin propri\xE9taire","calendar.sync.account":"Synchroniser ce compte","calendar.sync.accountsError":"Impossible de charger les comptes. Actualisez pour r\xE9essayer.","calendar.sync.back":"Retour aux comptes","calendar.sync.cached":"Les \xE9v\xE9nements d\xE9j\xE0 synchronis\xE9s restent disponibles.","calendar.sync.calendarsError":"Impossible de charger les calendriers. V\xE9rifiez la connexion dans Comptes et r\xE9essayez.","calendar.sync.connected":"Connect\xE9","calendar.sync.description":"Choisissez des calendriers dans vos comptes et affectez chacun \xE0 un groupe. Les \xE9v\xE9nements sont en lecture seule.","calendar.sync.failed":"\xC9chec de la synchronisation du calendrier.","calendar.sync.group":"Groupe de {{name}}","calendar.sync.last":"Derni\xE8re synchronisation : {{time}} \xB7 {{count}} \xE9v\xE9nements","calendar.sync.loadingAccounts":"Chargement des comptes\u2026","calendar.sync.loadingCalendars":"Chargement des calendriers\u2026","calendar.sync.manage":"G\xE9rer les comptes","calendar.sync.noCalendars":"Aucun calendrier accessible trouv\xE9 pour ce compte.","calendar.sync.noGroup":"Aucun groupe","calendar.sync.permission":"L\u2019acc\xE8s au calendrier manque. Activez Calendrier dans Comptes.","calendar.sync.primary":"Calendrier par d\xE9faut","calendar.sync.readOnly":"Importez les calendriers s\xE9lectionn\xE9s. Les modifications dans Valley ne sont pas transmises au fournisseur.","calendar.sync.reconnect":"Reconnectez ce compte dans Comptes pour r\xE9tablir l\u2019acc\xE8s.","calendar.sync.refresh":"Actualiser les comptes et synchroniser","calendar.sync.saveError":"Impossible d\u2019enregistrer la s\xE9lection de calendriers.","calendar.sync.saved":"Les identifiants OAuth sont enregistr\xE9s, mais aucun compte n\u2019est encore connect\xE9. Ouvrez Comptes et choisissez Ajouter une connexion pour autoriser l\u2019acc\xE8s.","calendar.sync.savedShort":"Identifiants enregistr\xE9s \xB7 Compte non connect\xE9","calendar.sync.select":"Synchroniser {{name}}","calendar.sync.setup":"Configurez ce fournisseur dans Comptes, puis autorisez l\u2019acc\xE8s au calendrier.","calendar.sync.setupShort":"Configurer dans Comptes","calendar.undo.addEvent":`Ajouter l'\xE9v\xE9nement "{{title}}"`,"calendar.undo.deleteEvent":"Supprimer l'\xE9v\xE9nement \xAB\xA0{{title}}\xA0\xBB","calendar.undo.editEvent":`Modifier l'\xE9v\xE9nement "{{title}}"`,"calendar.url":"Lien","calendar.urlPlaceholder":"https://\u2026","error.commandFailed":"La commande a \xE9chou\xE9. V\xE9rifiez les param\xE8tres, puis r\xE9essayez.","guard.preset.ask-for-writes":"Demander avant d\u2019\xE9crire","guard.preset.blocked":"Bloqu\xE9","guard.preset.read-only":"Lecture seule","guard.preset.recommended":"Recommand\xE9","manifest.description":"Planificateur d\u2019\xE9v\xE9nements et de t\xE2ches : agenda dans la barre lat\xE9rale gauche, calendrier compact \xE0 droite et une page compl\xE8te avec des grilles mois/semaine/ann\xE9e \xE0 c\xF4t\xE9 d\u2019une colonne d\u2019agenda en direct.","manifest.name":"Calendrier","markdown.examples.agenda":"Agenda","markdown.examples.dateRange":"P\xE9riode","markdown.examples.day":"Aujourd\u2019hui","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.nextSeven":"Sept prochains jours","markdown.examples.nextThirty":"Trente prochains jours","markdown.examples.week":"Semaine","plugin.calendar.section.dates":"Dates des notes","plugin.calendar.section.plugins":"Plugins","plugin.calendar.section.sync":"Calendriers synchronis\xE9s","backend.request":"Une demande de calendrier est attendue","backend.text":"Texte de demande de calendrier invalide","backend.expired":"La page des \xE9v\xE9nements du calendrier a expir\xE9","backend.large":"L\u2019\xE9v\xE9nement du calendrier est trop volumineux","backend.account":"Compte de calendrier inconnu","backend.permission":"L\u2019autorisation du calendrier manque. Reconnectez-vous dans R\xE9glages \u2192 Comptes.","backend.endpoint":"Adresse du calendrier invalide","backend.window":"P\xE9riode du calendrier invalide","backend.pending":"Trop de r\xE9sultats de calendrier en attente","backend.pages":"La limite de pages du calendrier a \xE9t\xE9 d\xE9pass\xE9e","backend.continuation":"URL de continuation Microsoft Graph invalide.","backend.microsoft":"\xC9chec du chargement du calendrier Microsoft Graph : {{status}}","backend.googleList":"\xC9chec du chargement de la liste Google Agenda : {{status}}","backend.googleFetch":"\xC9chec du chargement de Google Agenda : {{status}}","calendar.error.atomicLimit":"Cette modification d\xE9passe la limite atomique de 1000 op\xE9rations. Supprimez moins de sources \xE0 la fois.","calendar.source.incompatible":"La source de calendrier \xAB {{owner}} \xBB utilise une version incompatible. Mettez-la \xE0 jour pour les requ\xEAtes dat\xE9es et pagin\xE9es (v2).","calendar.source.failed":"Source de calendrier \xAB {{owner}} \xBB : {{message}}","calendar.source.pageRevision":"La source a renvoy\xE9 une r\xE9vision de page invalide ou modifi\xE9e.","calendar.source.rangeLimit":"La p\xE9riode demand\xE9e d\xE9passe {{limit}} \xE9l\xE9ments. Choisissez une p\xE9riode plus courte.","calendar.source.invalidItems":"La source a renvoy\xE9 des \xE9l\xE9ments en double ou hors de la p\xE9riode.","calendar.source.cursor":"La source a renvoy\xE9 un curseur de page qui ne progresse pas.","calendar.source.pageBudget":"La p\xE9riode demand\xE9e d\xE9passe le nombre de pages autoris\xE9.","calendar.source.unavailable":"La source est indisponible."};var ro={"auto.02f17370b8d9":"\u4E8B\u4EF6\u6807\u7B7E","auto.04a212215ef9":"\u786E\u8BA4","auto.04f6b3ea183e":"\u65F6\u949F","auto.05d290d65a74":"Calendar\uFF1A\u5217\u51FA\u4E8B\u4EF6","auto.0623bfa38c8f":"\u6587\u4EF6\u5939\u8303\u56F4","auto.082bc378cd60":"\u6708","auto.0cd372226ee9":"\u6D3B\u52A8\u6807\u9898\u2026","auto.1389fda4dae3":"\u91CD\u590D\u65E5\u671F\u8303\u56F4\uFF08\u4EE5\u5E74\u4E3A\u5355\u4F4D\uFF09","auto.1780c4a5f967":"\u8FD8\u6CA1\u6709\u6765\u6E90","auto.1a29d1bf66f5":"\u5907\u6CE8\u2026","auto.1ac1ff7616a6":"\u5168\u5929","auto.1cb00f4b1daf":"\u540C\u6B65\u65E5\u5386\xB7\u53EA\u8BFB","auto.221ca63005ea":"\u6B63\u5728\u540C\u6B65\u2026","auto.22819a02167d":"\u8F6C\u5230\u4ECA\u5929","auto.240038c46892":"\u8FDC\u7A0B\u4E8B\u4EF6","auto.24345a14377f":"\u4ECA\u5929","auto.24bdcf2d51f8":"\u8303\u56F4\uFF08\u5E74\uFF09","auto.257ff123e390":"\u6CA1\u6709\u7B14\u8BB0\u5339\u914D {{p0}}\uFF1A{{p1}}","auto.2a37335eebda":"\u5FC3","auto.2ae8981158aa":"\u8FDE\u63A5\u5E10\u6237\u7684\u53EA\u8BFB\u4E8B\u4EF6","auto.2b7d938e6787":"\u7ACB\u5373\u540C\u6B65","auto.2bc9464d49e9":"\u7B49\u4E8E\u503C","auto.2c924e308820":"\u5907\u6CE8","auto.33a5a701e541":"\u5F85\u529E\u4E8B\u9879\u6807\u9898\u2026","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34d8b60fe253":"\u9690\u85CF","auto.35b023ecbb81":"\u6765\u6E90\u540D\u79F0\uFF08\u4F8B\u5982\u751F\u65E5\uFF09","auto.3ae5b44a561f":"\u91CD\u590D\u6027\u5F02\u5E38","auto.408a0d16a8ba":"\u663E\u793A\u8FD9\u4E9B\u6761\u76EE - \u5C06\u6B64\u6765\u6E90\u653E\u56DE\u5230\u65E5\u5386\u4E0A\u3002","auto.418713defbf7":"\u6CA1\u6709\u4E8B\u4EF6\u6216\u5F85\u529E\u4E8B\u9879","auto.46fbb53a9be2":"\u4E00\u5929\u5F00\u59CB\u65F6\u95F4","auto.475b6ce898d4":"\u6765\u6E90\u540D\u79F0","auto.4869ac12717f":"\u5F00\u653E\u5468","auto.48a7b8889e15":"\u9009\u4FEE\u7684","auto.4cb741c63cbd":"MicrosoftCalendar","auto.4d064726954a":"\u9AD8\u7EA7","auto.4da8c4eff514":"\u6E90\u540D\u79F0 \u2014 \u8BE5\u7EC4\u5728\u201C\u5373\u5C06\u53D1\u5E03\u201D\u90E8\u5206\u4E2D\u7684\u5217\u51FA\u65B9\u5F0F\u3002\u5355\u51FB\u5C06\u5176\u91CD\u547D\u540D\u3002","auto.4fda04775bdc":"\u5220\u9664\u8BE5\u5B57\u6BB5","auto.50b47e47a104":"\u540C\u6B65{{p0}}","auto.50f94286ba30":"\u4E0A\u4E00\u9875","auto.519b42369442":"\u53EF\u9009\u7684 frontmatter \u952E\u5305\u542B HH:MM \u5F00\u59CB\u65F6\u95F4\u3002\u7A7A\u21D2\u5168\u5929\u6761\u76EE\u3002","auto.5210c5c047ea":"\u9644\u52A0\u5E74\u6570\uFF0C\u4F8B\u5982\u201C\u827E\u8FBE\uFF0836\uFF09\u201D\u3002","auto.5301648dcf6b":"\u7F16\u8F91","auto.55f1c767a3b1":"\u4EA7\u6743\u8D22\u4EA7","auto.570374e4e4cc":"GoogleCalendar","auto.5d12631f0a8b":"\u6D3B\u52A8\u94FE\u63A5","auto.611f3791dc68":"\u5F00\u59CB\u65F6\u95F4\u5C5E\u6027","auto.61cc55aa0453":"\u6DFB\u52A0","auto.65c01f7ba330":"\u5728\u4E0B\u9762\u6DFB\u52A0\u4E00\u4E2A\uFF0C\u7136\u540E\u586B\u5199\u5B83\u5E94\u8BE5\u5339\u914D\u7684 frontmatter \u503C\u3002","auto.691b674766e5":"\u65E5\u671F\u5C5E\u6027","auto.6d07b3164ac0":"\u4EC5\u663E\u793A\u5F53\u524D\u5E74\u4EFD\u524D\u540E\u591A\u5E74\u5185\u7684\u91CD\u590D\u65E5\u671F\u3002","auto.702e8114bce7":"\u6D3B\u52A8\u9644\u4EF6","auto.736a07e01797":"\u9690\u85CF\u8FD9\u4E9B\u6761\u76EE\u2014\u2014\u4FDD\u7559\u6765\u6E90\uFF0C\u4F46\u505C\u6B62\u5728\u65E5\u5386\u4E0A\u7ED8\u5236\u5B83\u3002","auto.73d64a823b7d":"\u6DFB\u52A0\u6807\u7B7E\u2026","auto.768e0c1c6957":"\u6807\u9898","auto.77dfd2135f4d":"\u53D6\u6D88","auto.7a3a9094b18c":"\u6253\u5F00Calendar","auto.7a46866bc719":"\u4ECA\u5929","auto.7bf039eeb194":"Frontmatter \u952E\u4FDD\u5B58\u65E5\u671F\uFF1A1990-05-04\uFF0C\u6216 --05-04\uFF08\u5E74\u4EFD\u672A\u77E5\u65F6\uFF09\u3002","auto.7bf74c2d99d6":"\u6761\u76EE\u56FE\u6807 \u2014 \u7ED8\u5236\u5728\u8BE5\u6765\u6E90\u7684\u6BCF\u4E2A\u65E5\u5386\u6761\u76EE\u4E0A\u3002\u53EF\u9009\uFF1A\u5C06\u5176\u4FDD\u7559\u4E3A\u666E\u901A\u82AF\u7247\u3002","auto.7c1496f9a7dc":"\u5220\u9664\u201C{{p0}}\u201D\uFF1F","auto.7eacb0e385b4":"\u5C1A\u672A\u8FDE\u63A5\u65E5\u5386\u5E10\u6237 - \u5728\u201C\u8BBE\u7F6E\u201D\u2192\u201C\u5E10\u6237\u201D\u4E2D\u6DFB\u52A0\u4E00\u4E2A\u3002","auto.7f852a5678f1":"Calendar\uFF1A\u8BBE\u7F6E\u89C6\u56FE","auto.7f8a6fad8b7c":"\u6DFB\u52A0\u4E8B\u4EF6","auto.808d7dca8a74":"\u9ED8\u8BA4","auto.8410192cbb1f":"\u94FE\u63A5\u6587\u4EF6\u8DEF\u5F84","auto.85a7de6e2705":"\u661F\u661F","auto.86c0a35ec883":"\u66F4\u591A\u9009\u9879","auto.879e32326c52":"\u5E74","auto.88d8206d586a":"\u5F00\u59CB\u65F6\u95F4","auto.891e9d6d47f1":"\u65E5\u7A0B","auto.8bbc96d44546":"\u65E5\u671F\u5728\u7B14\u8BB0\u4E2D\u7684\u4E66\u5199\u65B9\u5F0F \u2014 dd\u3001mm \u548C yyyy\uFF0C\u5E26\u6709\u4EFB\u4F55\u5206\u9694\u7B26\uFF08dd.mm.yyyy\u3001mm/dd/yyyy \u6216\u4E0D\u5E26\u5E74\u4EFD\u7684 dd.mm\uFF09\u3002\u7559\u7A7A\u4EE5\u81EA\u52A8\u8BC6\u522B\u3002","auto.8c41ae88467f":"\u4EBA","auto.8d0a32ed6339":"\u793C\u7269","auto.92bcda7f379e":"\u6761\u76EE\u56FE\u6807","auto.9444501818e6":"\u65E5\u5386","auto.94ee88690828":"\u65E5\u671F\u683C\u5F0F","auto.95553ba8a405":"\u65E0\u56FE\u6807","auto.958788fc103f":"\u7B14\u8BB0\u65E5\u671F","auto.981f473aa731":"\u8F6E\u5ED3\u989C\u8272","auto.9acc52f8cf89":"\u5220\u9664\u6807\u7B7E {{p0}}","auto.9ae33a7d0ecb":"\u5C5E\u6027","auto.9c6e5a3f44fc":"\u86CB\u7CD5","auto.9c918414710c":"\u56FE\u9489","auto.9ddab8990070":"\u663E\u793A\u8BA1\u6570","auto.9eb56535c39a":"Calendar \u540C\u6B65\u72B6\u6001","auto.9ee309dcedc9":"\u6253\u5F00\u9875\u9762","auto.9fa90b203761":"\u53C2\u8D5B\u989C\u8272","auto.a2590d497e7c":"\u6B64\u7A97\u53E3\u4E2D\u6CA1\u6709\u4E8B\u4EF6\u3002","auto.a3cbb98ddf5e":"\u6587\u4EF6\u540D","auto.a3fa4c4a4715":"\u6807\u9898\u503C","auto.a774409a00c2":"\u65D7\u5E1C","auto.ad8919ace091":"\u4E8B\u4EF6","auto.ad980036b394":"\u6574\u4E2A\u91D1\u5E93","auto.adab5090ac6a":"\u65E5\u5386","auto.ae8a5b196587":"\u662F\u7684\uFF0C\u5220\u9664","auto.aee875c4edbf":"\u7ED3\u675F\u65F6\u95F4\u5C5E\u6027","auto.b29a9852d77e":"\u6253\u5F00Calendar\u9875\u9762","auto.b2db10062979":"\u6CE8\u610F\u65E5\u671F\u6765\u6E90","auto.b6f727f0c520":"\u65E5\uFF08\u6BCF\u6708\uFF09","auto.b82220d034e7":"Frontmatter \u952E","auto.bc981983e7f5":"\u4E0B\u4E00\u4E2A","auto.bf2660184858":"Calendar\uFF1A\u524D\u5F80\u7EA6\u4F1A","auto.c2b47c770575":"\u540C\u6B65\u65E5\u5386","auto.c5497bca5846":"\u6D3B\u52A8","auto.c66a827e3397":"\u6253\u5F00\u7B14\u8BB0","auto.c7f73bb54d92":"\u8BBE\u7F6E","auto.c845e23963ef":"\u5220\u9664\u201C{{p0}}\u201D\u6E90 - \u6CE8\u91CA\u672C\u8EAB\u4FDD\u6301\u4E0D\u53D8\u3002","auto.cd7800da7f4f":"\u7ED3\u675F\u65F6\u95F4","auto.cfbf9d49c1da":"\u3002\u9009\u62E9\u6B64\u5904\u663E\u793A\u7684\u65E5\u5386\u3002","auto.d4198662a72f":"\u949F","auto.d4ea5b59b68b":"{{p0}} \u6761\u7B14\u8BB0\u5339\u914D \xB7 {{p1}} \u6761\u6709\u53EF\u7528\u65E5\u671F","auto.d5e8ba205867":"\u8BBE\u7F6E \u2192 \u5E10\u6237","auto.d669db3f6b34":"\u8FD9\u4E00\u5929\u6CA1\u6709\u5F85\u529E\u4E8B\u9879\u548C\u6D3B\u52A8","auto.d75a293ea22a":"\u518D\u6B21\u5355\u51FB\u53EF\u5220\u9664\u8BE5\u6E90\u3002","auto.d97d1ee339e4":"\u663E\u793A","auto.dbed7864623f":"Calendar\u7EC4","auto.dd4b99ddaf61":"\u65E5+\u6708\uFF08\u6BCF\u5E74\uFF09","auto.e0db2991e37a":"\u6DFB\u52A0\u6807\u7B7E","auto.e10282ef1972":"\u65E5\u671F\u5339\u914D","auto.e16f07326a18":"Calendar\uFF1A\u6DFB\u52A0\u4E8B\u4EF6","auto.e6ffec68b5ae":"{{p0}} \u6761\u7B14\u8BB0\u5339\u914D \xB7 \u6CA1\u6709\u53EF\u7528\u7684 {{p1}}","auto.e7de9576dc00":"\u94FE\u63A5\u6587\u4EF6\uFF08\u5E93\u8DEF\u5F84\uFF09\u2026","auto.ec42f1f55523":"\u6DFB\u52A0\u5F85\u529E\u4E8B\u9879","auto.ee8581831b9c":"Calendar\uFF1A\u8F6C\u5230\u4ECA\u5929","auto.ef5ea5a743b3":"Frontmatter \u5173\u952E\u8981\u663E\u793A","auto.efc007a393f6":"\u4FDD\u5B58","auto.f07b365f8502":"\u5468\u7F51\u683C\u4E2D\u663E\u793A\u7684\u7B2C\u4E00\u4E2A\u5C0F\u65F6 (0\u201323)\u3002\u8F83\u65E9\u7684\u65F6\u95F4\u5728\u5176\u4E0A\u65B9\u6EDA\u52A8\u3002","auto.f4a0d0857b02":"\u6E05\u9664{{p0}}","auto.f4e12416c6b8":"\u6CA1\u6709\u9879\u76EE","auto.f6b2246c64fa":"\u65E0\u7EC4","auto.f6fdbe48dc54":"\u5220\u9664","auto.f82be68a7fb4":"\u5468","auto.fb3a16f382f8":"\u590D\u5236 Valley \u94FE\u63A5","auto.fd303c72a405":"\u786E\u5207\u65E5\u671F\uFF08\u65E5+\u6708+\u5E74\uFF09","calendar.action.openAttachment":"\u9644\u4EF6","calendar.action.openLink":"\u94FE\u63A5","calendar.action.showOnMap":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","calendar.addAttachment":"\u6DFB\u52A0\u9644\u4EF6","calendar.addUrl":"\u6DFB\u52A0\u94FE\u63A5","calendar.agenda.clearSearch":"\u6E05\u9664\u641C\u7D22","calendar.agenda.searchLabel":"\u641C\u7D22\u65E5\u7A0B","calendar.agenda.searchPlaceholder":"\u641C\u7D22\u65E5\u7A0B\u2026","calendar.attachmentPath":"\u9644\u4EF6\u8DEF\u5F84","calendar.attachmentPlaceholder":"\u9644\u52A0\u6587\u4EF6\u2026","calendar.attachments":"\u9644\u4EF6","calendar.badge.attachment":"\u9644\u4EF6","calendar.badge.link":"\u94FE\u63A5","calendar.badge.location":"\u4F4D\u7F6E","calendar.badge.note":"\u5173\u8054\u7B14\u8BB0","calendar.colorRule.folder":"\u6587\u4EF6\u5939","calendar.colorRule.property":"\u5C5E\u6027","calendar.colorRule.tag":"\u8BDD\u9898\u6807\u7B7E","calendar.command.delete":"\u65E5\u5386\uFF1A\u5220\u9664\u9879\u76EE","calendar.command.editFields":"\u65E5\u5386\uFF1A\u7F16\u8F91\u9879\u76EE\u5B57\u6BB5","calendar.command.get":"\u65E5\u5386\uFF1A\u83B7\u53D6\u9879\u76EE","calendar.command.listItems":"\u65E5\u5386\uFF1A\u5217\u51FA\u6240\u6709\u9879\u76EE","calendar.command.open":"\u65E5\u5386\uFF1A\u6253\u5F00\u9879\u76EE","calendar.command.openCached":"\u65E5\u5386\uFF1A\u6253\u5F00\u7F13\u5B58\u4E8B\u4EF6","calendar.command.sourceAction":"\u65E5\u5386\uFF1A\u6267\u884C\u6765\u6E90\u9879\u76EE\u64CD\u4F5C","calendar.command.sourceActions":"\u65E5\u5386\uFF1A\u5217\u51FA\u6765\u6E90\u9879\u76EE\u7684\u64CD\u4F5C","calendar.command.sourceCreate":"\u65E5\u5386\uFF1A\u521B\u5EFA\u6765\u6E90\u9879\u76EE","calendar.command.sources":"\u65E5\u5386\uFF1A\u5217\u51FA\u9879\u76EE\u6765\u6E90","calendar.dayEndHour":"\u4E00\u5929\u7ED3\u675F\u65F6\u95F4","calendar.dayEndHourDesc":"\u5468\u7F51\u683C\u4E2D\u663E\u793A\u7684\u6700\u540E\u4E00\u4E2A\u5C0F\u65F6 (1\u201324)\u3002\u8F83\u665A\u7684\u65F6\u95F4\u5728\u5176\u4E0B\u65B9\u6EDA\u52A8\u3002","calendar.dayWindowGrows":"\u8D85\u51FA\u6B64\u8303\u56F4\u7684\u6761\u76EE\u4ECD\u4F1A\u663E\u793A\u2014\u2014\u7F51\u683C\u4F1A\u6269\u5C55\u5230\u5B83\u3002","calendar.editor.close":"\u5173\u95ED","calendar.editor.retry":"\u542F\u7528\u6216\u91CD\u65B0\u52A0\u8F7D\u6240\u5C5E\u63D2\u4EF6\uFF0C\u7136\u540E\u518D\u6B21\u6253\u5F00\u6B64\u9879\u76EE\u3002","calendar.editor.unavailable":"\u9879\u76EE\u7F16\u8F91\u5668\u4E0D\u53EF\u7528","calendar.error.changed":"\u6B64\u4E8B\u4EF6\u5DF2\u5728\u5176\u4ED6\u4F4D\u7F6E\u66F4\u6539\u3002\u60A8\u7684\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002\u8BF7\u53D6\u6D88\u4EE5\u52A0\u8F7D\u6700\u65B0\u7248\u672C\u3002","calendar.error.missing":"\u8BE5\u65E5\u5386\u9879\u76EE\u5DF2\u4E0D\u5B58\u5728\u3002","calendar.error.save":"\u65E0\u6CD5\u4FDD\u5B58\u4E8B\u4EF6\u3002\u60A8\u7684\u66F4\u6539\u5DF2\u4FDD\u7559\u3002","calendar.field.attachments":"\u9644\u4EF6","calendar.field.completed":"\u5DF2\u5B8C\u6210","calendar.field.date":"\u65E5\u671F","calendar.field.endDate":"\u7ED3\u675F\u65E5\u671F","calendar.field.endTime":"\u7ED3\u675F\u65F6\u95F4","calendar.field.filePath":"\u94FE\u63A5\u7684\u6587\u4EF6","calendar.field.group":"\u5206\u7EC4","calendar.field.groupId":"\u5206\u7EC4","calendar.field.location":"\u5730\u70B9","calendar.field.note":"\u5907\u6CE8","calendar.field.priority":"\u4F18\u5148\u4E8B\u9879","calendar.field.startTime":"\u5F00\u59CB\u65F6\u95F4","calendar.field.tags":"\u6807\u7B7E","calendar.field.title":"\u6807\u9898","calendar.field.urls":"\u94FE\u63A5","calendar.filter.deselectAll":"\u53D6\u6D88\u5168\u9009","calendar.filter.events":"\u65E5\u7A0B","calendar.filter.groups":"\u5206\u7EC4","calendar.filter.noGroups":"\u6682\u65E0\u5206\u7EC4","calendar.filter.noSources":"\u6CA1\u6709\u6765\u6E90","calendar.filter.noteDates":"\u7B14\u8BB0\u65E5\u671F","calendar.filter.selectAll":"\u5168\u9009","calendar.filter.sources":"\u6765\u6E90","calendar.group.deleteBlocked":"\u4ECD\u6709 {{p0}} \u4E2A\u4E8B\u4EF6\u5728\u4F7F\u7528 \u2014 \u6E05\u7A7A\u540E\u624D\u80FD\u5220\u9664","calendar.group.global":"\u5168\u5C40","calendar.location":"\u4F4D\u7F6E","calendar.locationPlaceholder":"\u4F4D\u7F6E\u2026","calendar.noteDate.addField":"\u6DFB\u52A0\u5B57\u6BB5","calendar.noteDate.addSource":"\u6DFB\u52A0\u6E90","calendar.noteDatePreset.anniversaries":"\u7EAA\u5FF5\u65E5","calendar.noteDatePreset.birthdays":"\u751F\u65E5","calendar.noteDatePreset.blank":"\u7A7A\u767D\u6765\u6E90","calendar.noteDatePreset.deadlines":"\u622A\u6B62\u65E5\u671F","calendar.openLocation":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","calendar.openLocationOf":"\u5728\u5730\u56FE\u4E0A\u663E\u793A{{p0}}","calendar.overview.accounts":"\u65E5\u5386\u8D26\u6237","calendar.overview.calendars":"\u65E5\u5386","calendar.overview.disabled":"\u540C\u6B65\u5DF2\u7981\u7528","calendar.overview.loading":"\u6B63\u5728\u52A0\u8F7D\u65E5\u5386\u9879\u76EE\u2026","calendar.overview.month":"\u6708","calendar.overview.none":"\u65E0","calendar.overview.plugin":"\u6D3B\u52A8\u63D2\u4EF6","calendar.overview.range":"\u6240\u9009\u8303\u56F4","calendar.overview.selectedDate":"\u6240\u9009\u65E5\u671F","calendar.overview.selectedTime":"\u6240\u9009\u65F6\u95F4","calendar.overview.sources":"\u53EF\u89C1\u6765\u6E90","calendar.overview.unavailable":"\u65E0\u6CD5\u52A0\u8F7D\u65E5\u5386\u8BE6\u60C5\u3002\u8BF7\u91CD\u65B0\u6253\u5F00\u201C\u5C5E\u6027\u201D\u4EE5\u91CD\u8BD5\u3002","calendar.overview.view":"\u89C6\u56FE","calendar.overview.week":"\u5468","calendar.overview.year":"\u5E74","calendar.plugins.by":"\u4F5C\u8005","calendar.plugins.configure":"\u914D\u7F6E{{p0}}","calendar.plugins.disable":"\u5728\u65E5\u5386\u4E2D\u505C\u7528{{p0}}","calendar.plugins.empty":"\u6CA1\u6709\u542F\u7528\u7684\u65E5\u5386\u96C6\u6210\u3002","calendar.plugins.enable":"\u5728\u65E5\u5386\u4E2D\u542F\u7528{{p0}}","calendar.plugins.version":"\u7248\u672C\uFF1A","calendar.priority.high":"\u9AD8","calendar.priority.low":"\u4F4E","calendar.priority.medium":"\u4E2D","calendar.priority.none":"\u65E0","calendar.properties.manageGroups":"\u7BA1\u7406\u5206\u7EC4","calendar.quickadd.allDay":"\u5168\u5929","calendar.quickadd.details":"\u8BE6\u60C5","calendar.quickadd.dueDate":"\u622A\u6B62\u65E5\u671F","calendar.quickadd.editTitle":"\u7F16\u8F91{{kind}}","calendar.quickadd.endDate":"\u7ED3\u675F\u65E5\u671F","calendar.quickadd.kind":"\u6DFB\u52A0\u5185\u5BB9","calendar.quickadd.priority":"\u4F18\u5148\u7EA7","calendar.quickadd.startDate":"\u5F00\u59CB\u65E5\u671F","calendar.quickadd.when":"\u65F6\u95F4","calendar.removeAttachment":"\u79FB\u9664\u9644\u4EF6","calendar.removeAttachmentOf":"\u79FB\u9664\u9644\u4EF6{{p0}}","calendar.removeLocation":"\u79FB\u9664\u4F4D\u7F6E","calendar.removeUrl":"\u79FB\u9664\u94FE\u63A5","calendar.removeUrlOf":"\u79FB\u9664\u94FE\u63A5{{p0}}","calendar.settings.groups":"\u5206\u7EC4","calendar.settings.groupsDesc":"\u5171\u4EAB\u5206\u7EC4\u5728\u4E2D\u592E\u5206\u7EC4\u8BBE\u7F6E\u4E2D\u521B\u5EFA\u548C\u7BA1\u7406\u3002","calendar.settings.openItemsAgenda":"\u65E5\u5386\u8BAE\u7A0B","calendar.settings.openItemsIn":"\u6253\u5F00\u9879\u76EE\u7684\u4F4D\u7F6E","calendar.settings.openItemsInDesc":"\u9009\u62E9\u6B63\u5E38\u70B9\u51FB\u65E5\u5386\u5185\u5BB9\u65F6\u5728\u54EA\u4E2A\u4F4D\u7F6E\u663E\u793A\u8BE5\u9879\u76EE\u3002","calendar.settings.openItemsOwner":"\u6240\u5C5E\u63D2\u4EF6","calendar.sync.account":"\u540C\u6B65\u6B64\u8D26\u6237","calendar.sync.accountsError":"\u65E0\u6CD5\u52A0\u8F7D\u8D26\u6237\u3002\u8BF7\u5237\u65B0\u540E\u91CD\u8BD5\u3002","calendar.sync.back":"\u8FD4\u56DE\u8D26\u6237","calendar.sync.cached":"\u4E4B\u524D\u540C\u6B65\u7684\u4E8B\u4EF6\u4ECD\u53EF\u4F7F\u7528\u3002","calendar.sync.calendarsError":"\u65E0\u6CD5\u52A0\u8F7D\u65E5\u5386\u3002\u8BF7\u5728\u201C\u8D26\u6237\u201D\u4E2D\u68C0\u67E5\u8FDE\u63A5\u540E\u91CD\u8BD5\u3002","calendar.sync.connected":"\u5DF2\u8FDE\u63A5","calendar.sync.description":"\u9009\u62E9\u5DF2\u6709\u8D26\u6237\u4E2D\u7684\u65E5\u5386\uFF0C\u5E76\u4E3A\u6BCF\u4E2A\u65E5\u5386\u6307\u5B9A\u5206\u7EC4\u3002\u4E8B\u4EF6\u4E3A\u53EA\u8BFB\u3002","calendar.sync.failed":"\u65E5\u5386\u540C\u6B65\u5931\u8D25\u3002","calendar.sync.group":"{{name}}\u7684\u5206\u7EC4","calendar.sync.last":"\u4E0A\u6B21\u540C\u6B65\uFF1A{{time}} \xB7 {{count}} \u4E2A\u4E8B\u4EF6","calendar.sync.loadingAccounts":"\u6B63\u5728\u52A0\u8F7D\u8D26\u6237\u2026","calendar.sync.loadingCalendars":"\u6B63\u5728\u52A0\u8F7D\u65E5\u5386\u2026","calendar.sync.manage":"\u7BA1\u7406\u8D26\u6237","calendar.sync.noCalendars":"\u672A\u627E\u5230\u6B64\u8D26\u6237\u53EF\u8BFB\u53D6\u7684\u65E5\u5386\u3002","calendar.sync.noGroup":"\u65E0\u7EC4","calendar.sync.permission":"\u7F3A\u5C11\u65E5\u5386\u8BBF\u95EE\u6743\u9650\u3002\u8BF7\u5728\u201C\u8D26\u6237\u201D\u4E2D\u542F\u7528\u65E5\u5386\u3002","calendar.sync.primary":"\u9ED8\u8BA4\u65E5\u5386","calendar.sync.readOnly":"\u5BFC\u5165\u6240\u9009\u65E5\u5386\u3002\u5728 Valley \u4E2D\u6240\u505A\u7684\u66F4\u6539\u4E0D\u4F1A\u53D1\u9001\u7ED9\u670D\u52A1\u5546\u3002","calendar.sync.reconnect":"\u8BF7\u5728\u201C\u8D26\u6237\u201D\u4E2D\u91CD\u65B0\u8FDE\u63A5\u6B64\u8D26\u6237\u4EE5\u6062\u590D\u8BBF\u95EE\u3002","calendar.sync.refresh":"\u5237\u65B0\u8D26\u6237\u5E76\u540C\u6B65","calendar.sync.saveError":"\u65E0\u6CD5\u4FDD\u5B58\u65E5\u5386\u9009\u62E9\u3002","calendar.sync.saved":"OAuth \u51ED\u636E\u5DF2\u4FDD\u5B58\uFF0C\u4F46\u5C1A\u672A\u8FDE\u63A5\u8D26\u6237\u3002\u8BF7\u6253\u5F00\u201C\u8D26\u6237\u201D\uFF0C\u9009\u62E9\u201C\u6DFB\u52A0\u8FDE\u63A5\u201D\u4EE5\u6388\u6743\u8BBF\u95EE\u3002","calendar.sync.savedShort":"\u51ED\u636E\u5DF2\u4FDD\u5B58 \xB7 \u8D26\u6237\u672A\u8FDE\u63A5","calendar.sync.select":"\u540C\u6B65{{name}}","calendar.sync.setup":"\u8BF7\u5728\u201C\u8D26\u6237\u201D\u4E2D\u8BBE\u7F6E\u6B64\u670D\u52A1\u5546\uFF0C\u7136\u540E\u6388\u6743\u8BBF\u95EE\u65E5\u5386\u3002","calendar.sync.setupShort":"\u5728\u201C\u8D26\u6237\u201D\u4E2D\u8BBE\u7F6E","calendar.undo.addEvent":"\u6DFB\u52A0\u4E8B\u4EF6\u201C{{title}}\u201D","calendar.undo.deleteEvent":"\u5220\u9664\u6D3B\u52A8\u201C{{title}}\u201D","calendar.undo.editEvent":"\u7F16\u8F91\u6D3B\u52A8\u201C{{title}}\u201D","calendar.url":"\u94FE\u63A5","calendar.urlPlaceholder":"https://\u2026","error.commandFailed":"\u547D\u4EE4\u6267\u884C\u5931\u8D25\u3002\u8BF7\u68C0\u67E5\u8F93\u5165\u540E\u91CD\u8BD5\u3002","guard.preset.ask-for-writes":"\u5199\u5165\u524D\u8BE2\u95EE","guard.preset.blocked":"\u5DF2\u963B\u6B62","guard.preset.read-only":"\u53EA\u8BFB","guard.preset.recommended":"\u63A8\u8350","manifest.description":"\u4E8B\u4EF6\u4E0E\u5F85\u529E\u89C4\u5212\uFF1A\u5DE6\u4FA7\u680F\u8BAE\u7A0B\u3001\u53F3\u4FA7\u680F\u7D27\u51D1\u65E5\u5386\uFF0C\u4EE5\u53CA\u5305\u542B\u6708/\u5468/\u5E74\u7F51\u683C\u4E0E\u5B9E\u65F6\u8BAE\u7A0B\u680F\u7684\u5B8C\u6574\u5DE5\u4F5C\u533A\u9875\u9762\u3002","manifest.name":"\u65E5\u5386","markdown.examples.agenda":"\u65E5\u7A0B","markdown.examples.dateRange":"\u65E5\u671F\u8303\u56F4","markdown.examples.day":"\u4ECA\u5929","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.nextSeven":"\u672A\u6765\u4E03\u5929","markdown.examples.nextThirty":"\u672A\u6765\u4E09\u5341\u5929","markdown.examples.week":"\u5468","plugin.calendar.section.dates":"\u7B14\u8BB0\u65E5\u671F","plugin.calendar.section.plugins":"\u63D2\u4EF6","plugin.calendar.section.sync":"\u540C\u6B65\u65E5\u5386","backend.request":"\u9700\u8981\u65E5\u5386\u8BF7\u6C42","backend.text":"\u65E5\u5386\u8BF7\u6C42\u6587\u672C\u65E0\u6548","backend.expired":"\u65E5\u5386\u4E8B\u4EF6\u9875\u9762\u5DF2\u8FC7\u671F","backend.large":"\u65E5\u5386\u4E8B\u4EF6\u8FC7\u5927","backend.account":"\u672A\u77E5\u7684\u65E5\u5386\u8D26\u6237","backend.permission":"\u7F3A\u5C11\u65E5\u5386\u6743\u9650\u3002\u8BF7\u5728\u8BBE\u7F6E \u2192 \u8D26\u6237\u4E2D\u91CD\u65B0\u8FDE\u63A5\u3002","backend.endpoint":"\u65E5\u5386\u7AEF\u70B9\u65E0\u6548","backend.window":"\u65E5\u5386\u65F6\u95F4\u8303\u56F4\u65E0\u6548","backend.pending":"\u5F85\u5904\u7406\u7684\u65E5\u5386\u7ED3\u679C\u8FC7\u591A","backend.pages":"\u5DF2\u8D85\u51FA\u65E5\u5386\u5206\u9875\u9650\u5236","backend.continuation":"Microsoft Graph \u540E\u7EED\u9875\u9762 URL \u65E0\u6548\u3002","backend.microsoft":"Microsoft Graph \u65E5\u5386\u83B7\u53D6\u5931\u8D25\uFF1A{{status}}","backend.googleList":"Google \u65E5\u5386\u5217\u8868\u83B7\u53D6\u5931\u8D25\uFF1A{{status}}","backend.googleFetch":"Google \u65E5\u5386\u83B7\u53D6\u5931\u8D25\uFF1A{{status}}","calendar.error.atomicLimit":"\u6B64\u66F4\u6539\u8D85\u51FA\u4E86 1000 \u6B21\u64CD\u4F5C\u7684\u539F\u5B50\u9650\u5236\u3002\u8BF7\u4E00\u6B21\u5220\u9664\u8F83\u5C11\u7684\u6765\u6E90\u3002","calendar.source.incompatible":"\u65E5\u5386\u6765\u6E90\u201C{{owner}}\u201D\u4F7F\u7528\u4E0D\u517C\u5BB9\u7684\u7248\u672C\u3002\u8BF7\u66F4\u65B0\u4EE5\u652F\u6301\u6309\u65E5\u671F\u5206\u9875\u67E5\u8BE2\uFF08v2\uFF09\u3002","calendar.source.failed":"\u65E5\u5386\u6765\u6E90\u201C{{owner}}\u201D\uFF1A{{message}}","calendar.source.pageRevision":"\u6765\u6E90\u8FD4\u56DE\u4E86\u65E0\u6548\u6216\u5DF2\u66F4\u6539\u7684\u9875\u9762\u7248\u672C\u3002","calendar.source.rangeLimit":"\u8BF7\u6C42\u7684\u65E5\u671F\u8303\u56F4\u8D85\u8FC7 {{limit}} \u4E2A\u9879\u76EE\u3002\u8BF7\u9009\u62E9\u66F4\u5C0F\u7684\u8303\u56F4\u3002","calendar.source.invalidItems":"\u6765\u6E90\u8FD4\u56DE\u4E86\u91CD\u590D\u6216\u8D85\u51FA\u65E5\u671F\u8303\u56F4\u7684\u9879\u76EE\u3002","calendar.source.cursor":"\u6765\u6E90\u8FD4\u56DE\u7684\u5206\u9875\u6E38\u6807\u672A\u5411\u524D\u63A8\u8FDB\u3002","calendar.source.pageBudget":"\u8BF7\u6C42\u7684\u65E5\u671F\u8303\u56F4\u8D85\u51FA\u4E86\u9875\u9762\u6570\u91CF\u9650\u5236\u3002","calendar.source.unavailable":"\u6765\u6E90\u4E0D\u53EF\u7528\u3002"};var oo={en:eo,de:to,es:ao,fr:no,"zh-CN":ro};function io(e,t){return(oo.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(r,o)=>String(t?.[o]??""))}var so=io;function lo(e){e.ui.registerCatalogs(oo),so=(t,a)=>{let r=e.ui.t(t,a);return r===t?io(t,a):r}}function l(e,t){return so(e,t)}function X(e,t=""){return typeof e=="string"?e:t}function co(e,t=!1){return typeof e=="boolean"?e:t}function lt(e){let t=X(e).trim();return/^([01]\d|2[0-3]):[0-5]\d$/.test(t)?t:void 0}function uo(e){let t=X(e).trim().toLowerCase();return/^#[0-9a-f]{6}$/.test(t)?t:void 0}var fd=16384,gd=/^[A-Za-z0-9][A-Za-z0-9_-]*$/;function hd(e){if(!e||e.length>fd||!/^[A-Za-z0-9_-]+$/.test(e))return null;try{let t=e.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-e.length%4)%4),a=atob(t),r=Uint8Array.from(a,i=>i.charCodeAt(0)),o=JSON.parse(new TextDecoder().decode(r));return o.v!==1||!o.state||typeof o.state!="object"||Array.isArray(o.state)?null:o.state}catch{return null}}function yd(e){try{let t=new URL(e);if(t.protocol!==`${_r}:`||t.hostname!==Lr)return null;let a=Nn(t.searchParams.get("file"));if(a)return{kind:"file",relPath:a};let r=t.searchParams.get("plugin")??"";if(!gd.test(r))return null;let o=hd(t.searchParams.get("state")??""),i=t.searchParams.get("surface");if(i&&!["main_workspace","left_sidebar","right_sidebar","footer"].includes(i))return null;let d=t.searchParams.get("instance");return d&&d.length>512?null:o?{kind:"plugin",pluginId:r,state:o,...i?{surface:i}:{},...d?{instanceId:d}:{}}:null}catch{return null}}function Ma(e){let t=yd(e);return t?.kind==="file"?t.relPath:null}function po(e){try{return zr.includes(new URL(e).protocol)}catch{return!1}}var mo=new Date(2023,0,1,12);function et(e,t,a="short"){let r=new Date(mo);return r.setDate(mo.getDate()+(e%7+7)%7),new Intl.DateTimeFormat(t,{weekday:a}).format(r)}function tt(e,t,a="short"){return new Intl.DateTimeFormat(t,{month:a}).format(new Date(2023,e,1,12))}var ua={sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6};function St(e){let t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),a=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-a);let r=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t.getTime()-r.getTime())/864e5+1)/7)}function je(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function zn(e,t){return(e.getDay()-t+7)%7}function Ut(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()-zn(e,t))}function Oa(e,t,a){let r=new Date(e,t,1),o=new Date(e,t,1-zn(r,a));return Array.from({length:42},(i,d)=>{let s=new Date(o);return s.setDate(o.getDate()+d),s})}function _a(e){return Array.from({length:7},(t,a)=>(e+a)%7)}function J(e){let t=String(e.getFullYear()),a=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${r}`}function ge(e){let[t,a,r]=e.split("-").map(o=>parseInt(o,10));return new Date(t,(a||1)-1,r||1)}function fo(e){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Ht(e,t,a){let r=null,o=!1,i=!1;return{reload:()=>i?Promise.resolve():(o=!0,r||(r=(async()=>{for(;o&&!i;){o=!1;let d=await e();!o&&!i&&t(d)}})().finally(()=>{r=null}),a&&r.catch(d=>{i||a(d)})),r),dispose:()=>{i=!0}}}function qt(e,t=32,a=()=>!0){let r=new Map,o=new Set,i=0,d=!1,s=()=>{for(let[c,u]of r){if(r.size<=t)break;u.pending||r.delete(c)}};return{read:c=>{if(d)return Promise.reject(new Error("Calendar read owner is disposed."));let u=r.get(c);if(u){if(r.delete(c),r.set(c,u),u.pending)return u.pending;if(u.revision===i)return Promise.resolve(u.value)}else{if(r.size>=t){let p=[...r].find(([,m])=>!m.pending);if(!p)return Promise.reject(new Error("Calendar has too many pending read ranges."));r.delete(p[0])}u={revision:-1},r.set(c,u)}let h=u;return h.pending=(async()=>{for(;!d;){let p=i,m;try{m=await e(c,()=>{if(d)throw new Error("Calendar read owner is disposed.");if(p!==i)throw new Error("Calendar read was superseded.")})}catch(y){if(!d&&p!==i)continue;throw y}if(d)break;if(p===i)return a(m)&&(h.value=m,h.revision=p),m}throw new Error("Calendar read owner is disposed.")})().finally(()=>{h.pending=void 0,s()}),s(),h.pending},invalidate:()=>{if(!d){i++;for(let c of[...o])c()}},subscribe:c=>(d||o.add(c),()=>{o.delete(c)}),dispose:()=>{d=!0,r.clear(),o.clear()}}}function La(e,t,a){let r=-1,o=new Map,i=t.map(d=>e.data.dataset(d).subscribe(s=>{s.vaultGeneration<r||(s.vaultGeneration!==r&&(r=s.vaultGeneration,o.clear()),!((o.get(d)??-1)>=s.revision)&&(o.set(d,s.revision),a()))}));return()=>i.forEach(d=>d())}var Bt="calendar.events",$n="calendar.event_tags",za="calendar.event_links",Fa="calendar.event_attachments";function at(e){return ho().subscribe(e)}function ho(){return Ge("events",e=>{let t=qt((r,o)=>{let[i,d]=JSON.parse(r);return vd(e,o,i??void 0,d??void 0)}),a=La(e,[Bt,$n,za,Fa],t.invalidate);return{...t,dispose:()=>{a(),t.dispose()}}})}function go(e){return e===!0}function Rn(e){if(typeof e!="string")return;let t=e.trim();if(t)return Ma(t)||po(t)?t:void 0}function yo(e){let t=Array.isArray(e)?e:[],a=[];for(let r of t){let o=Rn(r);o&&!a.includes(o)&&a.push(o)}return a.length>0?a:void 0}function bo(e){let t=Array.isArray(e)?e:[],a=[];for(let r of t){let o=Aa(r);o&&!a.includes(o)&&a.push(o)}return a.length>0?a:void 0}function bd(e){if(!e||typeof e!="object")return;let t=e,a=X(t.name).trim();if(!a)return;let r=typeof t.lng=="number"&&Number.isFinite(t.lng)?t.lng:void 0,o=typeof t.lat=="number"&&Number.isFinite(t.lat)?t.lat:void 0;return r!==void 0&&o!==void 0?{name:a,lng:r,lat:o}:{name:a}}function vo(e,t){let a=X(t).slice(0,10);return a&&e&&a>e?a:void 0}function wo(e){return e.startsWith("google:")||e.startsWith("microsoft:")}function $a(e){let t=new Date().toISOString(),a=X(e.id,`event_${Date.now().toString(36)}`),r=X(e.createdAt,t),o=lt(e.startTime),i=lt(e.endTime),d=X(e.date).slice(0,10);return{id:a,title:X(e.title).trim(),date:d,endDate:vo(d,e.endDate),startTime:o,endTime:i,allDay:go(e.allDay)||!o&&!i,color:uo(e.color),category:X(e.category).trim()||void 0,groupId:X(e.groupId).trim()||void 0,group:X(e.group).trim()||void 0,location:bd(e.location),urls:yo(e.urls),attachments:bo(e.attachments),tags:Array.isArray(e.tags)?e.tags.filter(s=>typeof s=="string"&&!!s.trim()).map(s=>s.trim()):[],note:X(e.note),filePath:Aa(e.filePath),createdAt:r,updatedAt:X(e.updatedAt,r),source:X(e.source).trim()||void 0,accountId:X(e.accountId).trim()||void 0,readOnly:go(e.readOnly)||void 0}}function xo(e){return{id:e.id,calendarId:null,providerId:null,title:e.title,date:e.date,endDate:e.endDate??null,startTime:e.startTime??null,endTime:e.endTime??null,allDay:e.allDay??null,timezone:null,color:e.color??null,category:e.category??null,groupId:e.groupId??null,group:e.group??null,location:e.location??null,note:e.note,filePath:e.filePath??null,createdAt:e.createdAt,updatedAt:e.updatedAt,source:e.source??null,accountId:e.accountId??null,readOnly:e.readOnly??null,recurrenceRule:null,recurrenceMasterId:null}}async function Fn(e,t,a=g,r=()=>{}){let o=[],i;do{r();let d=await a.data.dataset(e).query({where:t,limit:1e3,cursor:i});r(),o.push(...d.rows),i=d.cursor}while(i);return o}async function ko(e,t=!0,a=g,r=()=>{}){let o=async u=>{if(!e)return Fn(u,void 0,a,r);let h=[];for(let p=0;p<e.length;p+=100)h.push(...await Fn(u,{eventId:{in:e.slice(p,p+100)}},a,r));return h},i=await Promise.allSettled([t?o($n):[],o(za),o(Fa)]),[d,s,c]=i.map(u=>{if(u.status==="rejected")throw u.reason;return u.value});return{tags:d,links:s,attachments:c}}function So(e,t=!0){return[...t?e.tags.map(a=>({dataset:$n,operation:"insert",values:{eventId:e.id,tag:a}})):[],...(e.urls??[]).map((a,r)=>({dataset:za,operation:"insert",values:{eventId:e.id,position:r,url:a}})),...(e.attachments??[]).map((a,r)=>({dataset:Fa,operation:"insert",values:{eventId:e.id,position:r,path:a}}))]}function Eo(e){return{...e,endDate:vo(e.date,e.endDate),filePath:Aa(e.filePath),urls:yo(e.urls),attachments:bo(e.attachments)}}function Me(e,t){return ho().read(JSON.stringify([e??null,t??null]))}async function vd(e,t,a,r){let o=a&&r?{date:{lte:r},or:[{endDate:{gte:a}},{endDate:{isNull:!0},date:{gte:a}}]}:void 0,i=await Fn(Bt,o,e,t);if(!i.length)return[];let d=await ko(o?i.map(p=>String(p.id)):void 0,!0,e,t),s=(p,m=!1)=>{let y=new Map;for(let S of p){let I=y.get(S.eventId);I?I.push(S):y.set(S.eventId,[S])}if(m)for(let S of y.values())S.sort((I,M)=>Number(I.position)-Number(M.position));return y},c=s(d.tags),u=s(d.links,!0),h=s(d.attachments,!0);return i.map(p=>$a({...p,tags:(c.get(p.id)??[]).map(m=>m.tag),urls:(u.get(p.id)??[]).map(m=>m.url),attachments:(h.get(p.id)??[]).map(m=>m.path)})).filter(p=>p.title&&p.date)}async function Ct(e){let t=Eo(e);try{return await g.data.transaction([{dataset:Bt,operation:"insert",values:xo(t)},...So(t)]),!0}catch{return!1}}async function Et(e,t,a,r){let o=Eo({...t,id:e});try{let i={pluginId:g.pluginId,sourceId:"events",itemId:e},d=await g.documents.read(i);if(!d||a!==void 0&&(await g.data.dataset(Bt).get({id:e}))?.updatedAt!==a)return!1;let s=await ko([e],!1),c=xo(o);return delete c.id,delete c.note,await g.documents.update(i,{expectedRevision:r?.expectedRevision??d.revision,vaultGeneration:r?.vaultGeneration??d.vaultGeneration,body:o.note,explicitTags:o.tags??[],operations:[{dataset:Bt,operation:"update",key:{id:e},values:c},...s.links.map(u=>({dataset:za,operation:"delete",key:{eventId:e,position:Number(u.position)}})),...s.attachments.map(u=>({dataset:Fa,operation:"delete",key:{eventId:e,position:Number(u.position)}})),...So(o,!1)]}),!0}catch{return!1}}async function Wt(e){try{return(await g.data.dataset(Bt).delete({id:e})).affected>0}catch{return!1}}async function Co(e){if(!e.id||!e.title.trim()||!e.date)return!1;let t=await Ct(e);return t&&g.undo.push({label:l("calendar.undo.addEvent",{title:e.title.trim()}),undo:async()=>({ok:await Wt(e.id)}),redo:async()=>({ok:await Ct(e)})}),t}async function Ra(e,t,a,r){if(!e||!t.title.trim()||wo(e))return!1;let o=(await Me()).find(d=>d.id===e),i=await Et(e,t,a,r);return i&&o&&g.undo.push({label:l("calendar.undo.editEvent",{title:o.title}),undo:async()=>({ok:await Et(e,o)}),redo:async()=>({ok:await Et(e,t)})}),i}async function Io(e){if(wo(e))return!1;let t=(await Me()).find(r=>r.id===e),a=await Wt(e);return a&&t&&g.undo.push({label:l("calendar.undo.deleteEvent",{title:t.title}),undo:async()=>({ok:await Ct(t)}),redo:async()=>({ok:await Wt(e)})}),a}function Ka(e,t,a){let r=new Date().toISOString();return{id:fo("event"),title:e.trim(),date:t,tags:[],note:"",allDay:!a?.startTime&&!a?.endTime,...a,createdAt:r,updatedAt:r}}var V="#12120f",ie="#ffffff",Kn=[{id:"green",family:"semantic",labelKey:"color.green",light:"#247a52",dark:"#65e6ad",onLight:ie,onDark:V},{id:"red",family:"semantic",labelKey:"color.red",light:"#c93445",dark:"#ff6b7a",onLight:ie,onDark:V},{id:"amber",family:"semantic",labelKey:"color.amber",light:"#a85e00",dark:"#ffc45c",onLight:ie,onDark:V},{id:"blue",family:"semantic",labelKey:"color.blue",light:"#0075b2",dark:"#90cfff",onLight:ie,onDark:V},{id:"yellow",family:"semantic",labelKey:"color.yellow",light:"#9b9000",dark:"#f2e664",onLight:V,onDark:V},{id:"orange",family:"semantic",labelKey:"color.orange",light:"#bf5200",dark:"#fc8c50",onLight:ie,onDark:V},{id:"purple",family:"semantic",labelKey:"color.purple",light:"#8149c0",dark:"#c095fc",onLight:ie,onDark:V},{id:"pink",family:"semantic",labelKey:"color.pink",light:"#c33e78",dark:"#ff9ec4",onLight:ie,onDark:V},{id:"brown",family:"semantic",labelKey:"color.brown",light:"#78490b",dark:"#c7925c",onLight:ie,onDark:V},{id:"black",family:"semantic",labelKey:"color.black",light:"#0d0d0f",dark:"#3a3a3c",onLight:ie,onDark:ie},{id:"white",family:"semantic",labelKey:"color.white",light:"#fbfbfd",dark:"#f4f4f6",onLight:V,onDark:V},{id:"gray",family:"semantic",labelKey:"color.gray",light:"#717881",dark:"#c3cbd5",onLight:ie,onDark:V},{id:"violet",family:"semantic",labelKey:"color.violet",light:"#873aa6",dark:"#c17fde",onLight:ie,onDark:V},{id:"cyan",family:"semantic",labelKey:"color.cyan",light:"#008e9b",dark:"#68dfed",onLight:V,onDark:V},{id:"magenta",family:"semantic",labelKey:"color.magenta",light:"#b02184",dark:"#ec7bc0",onLight:ie,onDark:V},{id:"indigo",family:"semantic",labelKey:"color.indigo",light:"#5140b4",dark:"#9b97f7",onLight:ie,onDark:V},{id:"muted-green",family:"muted",labelKey:"color.mutedGreen",light:"#325c4c",dark:"#99ccaa",onLight:ie,onDark:V},{id:"muted-red",family:"muted",labelKey:"color.mutedRed",light:"#9f5c54",dark:"#e4a197",onLight:ie,onDark:V},{id:"muted-gold",family:"muted",labelKey:"color.mutedGold",light:"#918349",dark:"#ddce93",onLight:V,onDark:V},{id:"muted-blue",family:"muted",labelKey:"color.mutedBlue",light:"#5a7ea3",dark:"#84acd6",onLight:V,onDark:V},{id:"muted-violet",family:"muted",labelKey:"color.mutedViolet",light:"#826299",dark:"#c7aade",onLight:ie,onDark:V},{id:"primary-blue",family:"accent",labelKey:"color.primaryBlue",light:"#2a66db",dark:"#90b7ff",onLight:ie,onDark:V},{id:"teal",family:"accent",labelKey:"color.teal",light:"#007066",dark:"#5dcdbf",onLight:ie,onDark:V},{id:"gold",family:"accent",labelKey:"color.gold",light:"#866200",dark:"#d8b262",onLight:ie,onDark:V},{id:"rose",family:"accent",labelKey:"color.rose",light:"#861a50",dark:"#dd7aa1",onLight:ie,onDark:V},{id:"maroon",family:"categorical",labelKey:"color.maroon",light:"#75061c",dark:"#e66d71",onLight:ie,onDark:V},{id:"coral",family:"categorical",labelKey:"color.coral",light:"#d6673f",dark:"#ffad90",onLight:V,onDark:V},{id:"sand",family:"categorical",labelKey:"color.sand",light:"#a8885e",dark:"#f2d6b1",onLight:V,onDark:V},{id:"olive",family:"categorical",labelKey:"color.olive",light:"#636d11",dark:"#b0be60",onLight:ie,onDark:V},{id:"lime",family:"categorical",labelKey:"color.lime",light:"#5b9a25",dark:"#a8eb7a",onLight:V,onDark:V},{id:"forest",family:"categorical",labelKey:"color.forest",light:"#215e29",dark:"#6caa71",onLight:ie,onDark:V},{id:"mint",family:"categorical",labelKey:"color.mint",light:"#2d9e87",dark:"#a4f0dc",onLight:V,onDark:V},{id:"sky",family:"categorical",labelKey:"color.sky",light:"#3397c7",dark:"#aae0ff",onLight:V,onDark:V},{id:"navy",family:"categorical",labelKey:"color.navy",light:"#223f94",dark:"#6f92e5",onLight:ie,onDark:V},{id:"plum",family:"categorical",labelKey:"color.plum",light:"#a552a3",dark:"#f1a6ee",onLight:ie,onDark:V},{id:"slate",family:"categorical",labelKey:"color.slate",light:"#50627a",dark:"#aab9cc",onLight:ie,onDark:V}],wd=["semantic","muted","accent","categorical"];var Op=new Map(Kn.map(e=>[e.id,e])),xd={semantic:"Semantic",muted:"Muted",accent:"Accent & brand",categorical:"Categorical"},kd=new Map(Kn.map(e=>[e.id,e.labelKey.replace(/^color\./,"").replace(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase())])),Sd=/^[a-z][a-z0-9-]{0,47}$/,Ed={version:4,families:wd.map(e=>({id:e,name:xd[e]})),colors:Kn.map(e=>({id:e.id,familyId:e.family,name:kd.get(e.id)??e.id,light:e.light,dark:e.dark})),archived:[]},Cd=e=>({version:4,families:e.families.map(t=>({...t})),colors:e.colors.map(t=>({...t})),archived:e.archived.map(t=>({...t}))});var _p=Cd(Ed);var Do=["primary-blue","yellow","green","violet","orange","mint","rose","cyan","lime","brown","gold","blue","magenta","olive","navy","gray","teal","indigo","coral","sky","purple","forest","plum","sand","slate","pink","red"],Ga="palette:",Id=/^#[0-9a-f]{6}$/i;function Ao(e){return e.startsWith(Ga)&&Sd.test(e.slice(Ga.length))}function De(e){return`${Ga}${e}`}function Gn(e){return Ao(e)?e.slice(Ga.length):void 0}function To(e){if(typeof e!="string")return;let t=e.trim();return Ao(t)?t:Id.test(t)?t.toLowerCase():void 0}function me(e){let t=Gn(e);return t?`var(--color-${t})`:e}function No(e){let t=Gn(e);return t?`var(--color-${t}-on)`:"var(--title-color)"}function ja(e){let t=new Set(e.map(a=>Gn(a)??a.toLowerCase()));return De(Do.find(a=>!t.has(a))??Do[0])}function Ve(e){return e.trim().toLowerCase()}function Dd(e,t,a){if(!Array.isArray(e))return[];let r=[];for(let o of e){let i=typeof o=="string"?o.trim():"",d=Ve(i);!d||d===Ve(t)||a.has(d)||(a.add(d),r.push(i))}return r}function Ad(e){return`group_${Ve(e).replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"group"}`}function Va(e){if(!Array.isArray(e))return[];let t=[],a=new Set;for(let r of e){if(!r||typeof r!="object")continue;let o=r,i=typeof o.name=="string"?o.name.trim():"",d=Ve(i);if(!i||a.has(d))continue;a.add(d);let s=typeof o.id=="string"&&o.id.trim()?o.id.trim():Ad(i),c=To(o.color)??ja(t.map(h=>h.color)),u=Dd(o.aliases,i,a);t.push({id:s,name:i,color:c,...u.length?{aliases:u}:{}})}return t}function Po(e,t){let a=Ve(t??"");if(a)return e.find(r=>Ve(r.name)===a||(r.aliases??[]).some(o=>Ve(o)===a))}function Mo(e){let t={};for(let a of e){let r=Ve(a??"");r&&(t[r]=(t[r]??0)+1)}return t}function It(e,t){let a=g,r=a.getState()[e];return a.subscribeState([e],()=>{let o=a.getState()[e];Object.is(r,o)||(r=o,t())})}function Oo(e){let t=n.useCallback(r=>It(e,r),[e]),a=n.useCallback(()=>g.getState()[e],[e]);return n.useSyncExternalStore(t,a,a)}function _o(){let e=Ge("year",()=>{let t=new Date().getFullYear(),a,r=new Set,o=()=>{let d=new Date;if(t!==d.getFullYear()){t=d.getFullYear();for(let s of[...r])s()}a&&clearTimeout(a),r.size&&(a=setTimeout(o,new Date(d.getFullYear(),d.getMonth(),d.getDate()+1).getTime()-d.getTime()))},i=()=>{a&&clearTimeout(a),a=void 0,globalThis.removeEventListener("focus",o)};return{get:()=>t,subscribe:d=>(r.add(d),r.size===1&&globalThis.addEventListener("focus",o),o(),()=>{r.delete(d),r.size||i()}),dispose:()=>{i(),r.clear()}}});return n.useSyncExternalStore(e.subscribe,e.get,e.get)}function jn(){return Va(g.getState().groups)}function Lo(){let e=!1,t=()=>{Me().then(i=>{if(e)return;let d=jn(),s=i.map(u=>d.find(h=>h.id===u.groupId)?.name),c=Object.values(ve().remoteCalendars).flatMap(u=>Object.values(u).map(h=>d.find(p=>p.id===h.groupId)?.name));g.workspace.reportGroupUsage(Mo([...s,...c]))}).catch(i=>{e||console.error("[calendar] group usage read failed",i)})};t();let a=at(t),r=It("groups",t),o=g.settings.subscribe(t);return()=>{e=!0,a(),r(),o(),g.workspace.reportGroupUsage({})}}function zo(e,t){return ve().remoteCalendars[e]?.[t.id]?.enabled??t.primary}function Td(e){return!e||typeof e!="object"||Array.isArray(e)?{}:Object.fromEntries(Object.entries(e).flatMap(([t,a])=>!a||typeof a!="object"||Array.isArray(a)?[]:[[t,Object.fromEntries(Object.entries(a).flatMap(([r,o])=>{if(!o||typeof o!="object"||Array.isArray(o))return[];let i=o;return[[r,{...typeof i.enabled=="boolean"?{enabled:i.enabled}:{},...typeof i.groupId=="string"?{groupId:i.groupId}:{}}]]}))]]))}var Ua="hiddenGroups",Yt="hiddenSources",Fo="itemClickTarget",Dt="calendar:events",At="calendar:noteDates",Ha=e=>`calendar:plugin:${e}`,Un=7,Hn=22,Nd="owner";function Vn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function $o(e,t,a=23){return typeof e=="number"&&Number.isFinite(e)&&e>=0&&e<=a?Math.round(e):t}function Pd(e){return e==="agenda"||e==="owner"?e:Nd}function Md(e,t){let a=$o(e,Hn,24);return a>t?a:Math.min(t+1,24)}function ve(){let e=g.settings.get(),t=$o(e.dayStartHour,Un);return{groups:Va(jn()),dayStartHour:t,dayEndHour:Md(e.dayEndHour,t),disabledCalendarAccounts:Vn(e.disabledCalendarAccounts),remoteCalendars:Td(e.remoteCalendars),hiddenGroups:Vn(e.hiddenGroups),hiddenSources:Vn(e.hiddenSources).filter(a=>!a.startsWith("provider-")),itemClickTarget:Pd(e.itemClickTarget)}}function _e(){let[e,t]=n.useState(ve);return n.useEffect(()=>{let a=()=>t(ve()),r=g.settings.subscribe(a),o=It("groups",a);return()=>{r(),o()}},[]),e}function pa(e=g){return e.interop.services.providers(vt)}function Od(e){if(!e||typeof e!="object"||Array.isArray(e))return!1;let t=e;return typeof t.name=="string"&&typeof t.version=="string"}function ct(){return pa().map(e=>({sourceId:e.providerId,sourceKey:Ha(e.owner),owner:e.owner,version:e.version,methods:e.methods,integration:Od(e.metadata)?e.metadata:void 0}))}function Xt(){let[e,t]=n.useState(ct);return n.useEffect(()=>{let a=()=>t(ct()),r=g.interop.services.subscribe(vt,a);return a(),r},[]),e}function qa(e){return pa().find(t=>t.providerId===e)??null}function _d(e){if(!e||typeof e!="object"||Array.isArray(e))return!1;let t=e;return typeof t.id=="string"&&typeof t.title=="string"&&typeof t.date=="string"}var Ro={items:[],errors:[],complete:!1};function qn(e=!1,t="0001-01-01",a="9999-12-31"){return Bn().read(JSON.stringify([e,t,a])).then(r=>r.items)}function Bn(){return Ge("sources",e=>{let t=qt((d,s)=>{let[c,u,h]=JSON.parse(d);return Ld(e,c,u,h,s)},32,d=>d.complete),a=()=>JSON.stringify([[...pa(e),...e.interop.services.providers(la)].map(({providerId:d,owner:s,sessionId:c,version:u,methods:h,metadata:p})=>[d,s,c,u,h,p]),e.interop.state.providers(Ia).map(({providerId:d,owner:s,sessionId:c,version:u,value:h})=>[d,s,c,u,h])]),r=a(),o=()=>{let d=a();d!==r&&(r=d,t.invalidate())},i=[e.interop.services.subscribe(la,o),e.interop.services.subscribe(vt,o),e.interop.state.subscribe(Ia,o)];return{...t,dispose:()=>{i.forEach(d=>d()),t.dispose()}}})}async function Ld(e,t,a,r,o){o();let i=pa(e),d=new Set(i.map(p=>p.owner)),s=e.interop.services.providers(la).filter(p=>!d.has(p.owner)).map(p=>({owner:p.owner,message:l("calendar.source.incompatible",{owner:p.owner})})),c=0,u=await Promise.allSettled(i.map(async p=>{let m=[],y=new Set,S=new Set,I,M;for(let L=0;L<da;L++){o();let R=await p.invoke("list",[{startDate:a,endDate:r,limit:Rt,...I?{cursor:I}:{}}]);if(o(),!R.ok)throw new Error(R.error.message);let N=R.value;if(!N||!Array.isArray(N.items)||N.items.length>Rt||typeof N.revision!="string"||!N.revision||M!==void 0&&M!==N.revision)throw new Error(l("calendar.source.pageRevision"));if(M=N.revision,c+N.items.length>da)throw new Error(l("calendar.source.rangeLimit",{limit:da}));c+=N.items.length;for(let b of N.items){if(!_d(b)||y.has(b.id)||b.date>r||(b.endDate??b.date)<a)throw new Error(l("calendar.source.invalidItems"));y.add(b.id),m.push({sourceId:p.providerId,sourceOwner:p.owner,labelKey:`plugin.${p.owner}.name`,item:b,editable:!b.readOnly&&(p.methods.includes("update")||p.methods.includes("remove"))})}if(!N.cursor)return m;if(typeof N.cursor!="string"||S.has(N.cursor)||!N.items.length)throw new Error(l("calendar.source.cursor"));S.add(N.cursor),I=N.cursor}throw new Error(l("calendar.source.pageBudget"))}));o();let h=u.flatMap((p,m)=>p.status==="fulfilled"?p.value:(s.push({owner:i[m].owner,message:l("calendar.source.failed",{owner:i[m].owner,message:p.reason instanceof Error?p.reason.message:l("calendar.source.unavailable")})}),[]));if(t&&s.length)throw new Error(s.map(p=>p.message).join(" "));return{items:h,errors:s,complete:!s.length}}function Ko(e="0001-01-01",t="9999-12-31"){let a=JSON.stringify([!1,e,t]),[r,o]=n.useState({key:a,value:Ro}),i=n.useRef(null),d=n.useCallback(()=>{i.current?.invalidate()},[]);n.useEffect(()=>{let c=Bn(),u=Ht(()=>c.read(a),p=>o({key:a,value:p}),p=>console.error("[calendar] item sources reload failed",p));i.current=c;let h=c.subscribe(()=>{u.reload()});return u.reload(),()=>{u.dispose(),i.current===c&&(i.current=null),h()}},[d,a]);let s=r.key===a?r.value:Ro;return{items:s.items,errors:s.errors,reload:d}}async function Ba(e,t,a){let r=qa(e);if(!r?.methods.includes(t))return!1;let o=Bn(),i=await r.invoke(t,a);return i.ok&&i.value===!0&&o.invalidate(),i.ok&&i.value===!0}function Wa(e,t,a){return Ba(e,"update",[t,a])}function Ya(e,t){return Ba(e,"remove",[t])}function Xa(e,t,a){return Ba(e,"create",[t,a])}async function Go(e,t){let a=qa(e);return a?.methods.includes("open")?(await a.invoke("open",[t])).ok:!1}function zd(e){if(!e||typeof e!="object"||Array.isArray(e))return!1;let t=e;return typeof t.id=="string"&&typeof t.label=="string"}async function Za(e,t){let a=qa(e);if(!a?.methods.includes("actions"))return[];let r=await a.invoke("actions",[t]);return r.ok?Array.isArray(r.value)?r.value.filter(zd):[]:(console.error(`[calendar] item source "${a.owner}" failed: ${r.error.message}`),[])}function ma(e,t,a){return Ba(e,"runAction",[t,a])}async function Zt(e,t){await ma(e,t,sa)||await g.ui.confirm({title:l("calendar.editor.unavailable"),message:l("calendar.editor.retry"),actions:[{label:l("calendar.editor.close"),value:"close"}]})}function jo(){return pa().filter(e=>e.methods.includes("create")).map(e=>({id:e.providerId,labelKey:`plugin.${e.owner}.name`}))}async function Vo(e){let t=qa(e);return t?.methods.includes("configure")?(await t.invoke("configure")).ok:!1}var Uo=new WeakMap;function Fd(e){return{listAccounts:()=>e.backend.call("listAccounts"),listCalendarConnections:()=>e.backend.call("listCalendarConnections"),listCalendars:t=>e.backend.call("listCalendars",{accountId:t}),fetchCalendar:async(t,a,r,o)=>{let i=await e.backend.call("fetchCalendar",{accountId:t,timeMin:a,timeMax:r,calendarId:o}),d=[];for(;;){if(!i.ok||!i.data)return i;if(d.push(...i.data.events),!i.data.next)return{ok:!0,data:{events:d}};i=await e.backend.call("nextEvents",{cursor:i.data.next})}}}}function Be(e){let t=Uo.get(e);return t||(t=Fd(e),Uo.set(e,t)),t}var $d="calendar.remote",Wn="calendar.remote_events",Wo=1e3,Ho=500;function Rd(){let e=new Date,t=new Date(e.getFullYear(),e.getMonth()-1,1),a=new Date(e.getFullYear(),e.getMonth()+13,1);return{timeMin:t.toISOString(),timeMax:a.toISOString()}}function qo(e){let t=new Set(ve().disabledCalendarAccounts);return e.filter(a=>a.capabilities.includes("calendar")&&!t.has(a.id))}function Kd(e){if(!e.event||typeof e.event!="object"||Array.isArray(e.event))return null;let t=e.event;return!t.id||!t.title||!t.date?null:{...t,id:String(e.id),accountId:String(e.accountId),readOnly:!0}}async function Bo(e){if(e.length===0)return[];let t=g.data.dataset(Wn),a=[],r;do{let o=await t.query({where:{accountId:{in:e}},orderBy:[{field:"accountId",direction:"asc"},{field:"id",direction:"asc"}],limit:Wo,cursor:r});a.push(...o.rows),r=o.cursor}while(r);return a.flatMap(o=>{let i=Kd(o);return i?[i]:[]})}function Gd(e,t){let a={...t,accountId:e,readOnly:!0};return{accountId:e,id:a.id,date:a.date,endDate:a.endDate??null,event:JSON.parse(JSON.stringify(a))}}async function jd(e,t){let a=g.data.dataset(Wn),r=[],o;do{let s=await a.query({where:{accountId:e},limit:Wo,cursor:o});r.push(...s.rows),o=s.cursor}while(o);let i=new Set(t.map(s=>s.id)),d=[...r.filter(s=>!i.has(String(s.id))).map(s=>({operation:"delete",key:{accountId:e,id:String(s.id)}})),...t.map(s=>({operation:"upsert",values:Gd(e,s)}))];for(let s=0;s<d.length;s+=Ho)await a.batch(d.slice(s,s+Ho))}function Vd(){let e=[],t={syncing:!1,error:null,calendars:{},accounts:{}},a,r=!1,o,i=0,d=new Set,s=()=>d.forEach(m=>m()),c=m=>{let y=ve();return m.flatMap(S=>{let I=S.accountId??"";if(y.disabledCalendarAccounts.includes(I))return[];let M=t.calendars[I]?.find(N=>N.id===S.calendarId||!S.calendarId&&N.primary),L=y.remoteCalendars[I]?.[S.calendarId??M?.id??""];if(!(L?.enabled??M?.primary??!0))return[];let R=y.groups.find(N=>N.id===L?.groupId);return[{...S,groupId:R?.id,group:R?.name,color:R?void 0:S.color}]})},u=async()=>{let m=++i;try{let y=await Be(g).listAccounts();if(!y.ok||!y.data)throw new Error(y.error||l("calendar.sync.accountsError"));let S=qo(y.data.accounts),I=await Bo(S.map(M=>M.id));if(m!==i)return;e=c(I),s()}catch(y){if(m!==i)return;t={...t,error:y instanceof Error?y.message:l("calendar.sync.failed")},s()}},h=async()=>{++i,t={...t,syncing:!0,error:null},s();try{let m=await Be(g).listAccounts();if(!m.ok||!m.data)throw new Error(m.error||l("calendar.sync.accountsError"));let y=qo(m.data.accounts),S=await Bo(y.map(N=>N.id)),{timeMin:I,timeMax:M}=Rd(),L=[],R=[];for(let N of y){let b=S.filter(k=>k.accountId===N.id),w=[],P=[];try{let k=await Be(g).listCalendars(N.id);if(!k.ok||!k.data)throw new Error(k.error||l("calendar.sync.calendarsError"));let q=k.data.calendars;t={...t,calendars:{...t.calendars,[N.id]:q}},s();for(let z of q.filter(U=>zo(N.id,U)))try{let U=await Be(g).fetchCalendar(N.id,I,M,z.id);if(!U.ok||!U.data)throw new Error(U.error||l("calendar.sync.failed"));w.push(...U.data.events.map(B=>({...B,calendarId:z.id,category:z.name,color:B.color||z.color,accountId:N.id,readOnly:!0})))}catch(U){w.push(...b.filter(B=>B.calendarId===z.id||!B.calendarId&&z.primary)),P.push(`${z.name}: ${U instanceof Error?U.message:l("calendar.sync.failed")}`)}await jd(N.id,w)}catch(k){w.splice(0,w.length,...b),P.push(k instanceof Error?k.message:l("calendar.sync.failed"))}L.push(...w);let _=P.length?`${P.join(" ")} ${l("calendar.sync.cached")}`:void 0;_&&R.push(`${N.displayName||N.address}: ${_}`),t={...t,accounts:{...t.accounts,[N.id]:{error:_,lastSyncAt:P.length?t.accounts[N.id]?.lastSyncAt:new Date().toISOString(),eventCount:c(w).length}}}}++i,e=c(L),t={...t,error:R.length?R.join(" "):null}}catch(m){t={...t,error:m instanceof Error?m.message:l("calendar.sync.failed")}}finally{t={...t,syncing:!1},s()}},p=()=>a?(r=!0,a):(a=(async()=>{do r=!1,await h();while(r)})().finally(()=>{a=void 0}),a);return{getEvents:()=>e,getStatus:()=>t,subscribe:m=>{if(d.add(m),!o){let y=g.data.dataset(Wn).subscribe(()=>{t.syncing||u()}),S=JSON.stringify([ve().disabledCalendarAccounts,ve().remoteCalendars]),I=g.settings.subscribe(()=>{let M=JSON.stringify([ve().disabledCalendarAccounts,ve().remoteCalendars]);M!==S&&(S=M,e=c(e),s(),p())});o=()=>{y(),I()},u().then(()=>{d.size&&p()})}return()=>{d.delete(m),d.size===0&&(o?.(),o=void 0)}},sync:p}}function Tt(){return g.runtime.getOrCreate($d,Vd)}var qd=366;function We(e,t){let a=ge(e);return a.setDate(a.getDate()+t),J(a)}function Qt(e,t){let a=ge(e),r=ge(t);return a.setHours(12,0,0,0),r.setHours(12,0,0,0),Math.round((r.getTime()-a.getTime())/864e5)}function Yo(e,t){if(!e)return[];if(!t||t<=e)return[e];let a=Math.min(Qt(e,t),qd-1),r=[];for(let o=0;o<=a;o++)r.push(We(e,o));return r}function Ae(e){let[t,a]=e.split(":").map(r=>parseInt(r,10));return(t||0)*60+(a||0)}function Oe(e){let t=Math.max(0,Math.min(1439,Math.round(e))),a=Math.floor(t/60),r=t%60;return`${String(a).padStart(2,"0")}:${String(r).padStart(2,"0")}`}var Bd=[".csv"],Wd=[".base"],Yd=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],Xd=[".pdf"],Zd=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus"],Qd=[".mp4",".mov",".m4v",".mkv",".webm",".ogv"],Jd=[".stl",".obj",".glb",".gltf"];function Yn(e){let t=e.split("/").pop()??e,a=t.lastIndexOf(".");return a>0?t.slice(a).toLowerCase():""}var el={type:"core",id:"valley"},Y=(e,t,a,r,o={})=>({kind:e,icon:t,viewer:a,preview:"full",information:["identity"],editable:e==="text"||e==="code",sortGroup:r,owner:el,...o});function tl(e){let t={};for(let[a,r]of e)for(let o of a)t[o]=r;return t}var al=tl([[[".md",".markdown"],Y("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],Y("text","text","text","notes")],[[".json"],Y("json","json","json","data",{editable:!0})],[[".jsonl"],Y("json","json","jsonl","data",{editable:!0})],[Bd,Y("csv","csv","csv","data",{editable:!0})],[Wd,Y("base","base","fallback","data")],[Yd,Y("image","image","image","media",{information:["identity","dimensions","exif"]})],[Xd,Y("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[Zd,Y("audio","audio","audio","media",{information:["identity","media","audio-tags"]})],[Qd,Y("video","video","video","media",{information:["identity","media","video-codec"]})],[Jd,Y("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".docx"],Y("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".pptx"],Y("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".ts",".mts",".cts"],Y("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],Y("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],Y("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],Y("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],Y("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],Y("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],Y("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],Y("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],Y("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],Y("code","code","code","code",{codeLanguage:"TOML"})],[[".xml"],Y("code","code","code","code",{codeLanguage:"XML"})],[[".swift"],Y("code","code","code","code",{codeLanguage:"Swift"})],[[".rs"],Y("code","code","code","code",{codeLanguage:"Rust"})],[[".go"],Y("code","code","code","code",{codeLanguage:"Go"})],[[".java"],Y("code","code","code","code",{codeLanguage:"Java"})],[[".c",".h",".cpp"],Y("code","code","code","code",{codeLanguage:"C++"})],[[".canvas"],Y("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],Y("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".doc"],Y("unsupported","word","fallback","documents",{preview:"metadata",editable:!1})],[[".xlsx"],Y("csv","excel","csv","data",{preview:"full",editable:!1})],[[".xls"],Y("unsupported","excel","fallback","data",{preview:"metadata",editable:!1})],[[".ppt"],Y("unsupported","powerpoint","fallback","documents",{preview:"metadata",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],Y("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),nl=Y("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function rl(e){return al[Yn(e)]??nl}function Xo(e){return rl(e).kind}var se=e=>n.createElement("svg",{className:e.className,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?n.createElement("title",null,e.title):null,e.children),nt=e=>n.createElement(se,{...e},n.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),Jo=e=>n.createElement(se,{...e},n.createElement("circle",{cx:"11",cy:"11",r:"8"}),n.createElement("path",{d:"m21 21-4.3-4.3"})),Nt=e=>n.createElement(se,{...e},n.createElement("path",{d:"m9 18 6-6-6-6"})),ei=e=>n.createElement(se,{...e},n.createElement("path",{d:"m12 2 9 5-9 5-9-5 9-5Z"}),n.createElement("path",{d:"m3 12 9 5 9-5"}),n.createElement("path",{d:"m3 17 9 5 9-5"})),ti=e=>n.createElement(se,{...e},n.createElement("path",{d:"M3 7V5c0-1.1.9-2 2-2h2M17 3h2c1.1 0 2 .9 2 2v2M21 17v2c0 1.1-.9 2-2 2h-2M7 21H5c-1.1 0-2-.9-2-2v-2"}),n.createElement("rect",{width:"7",height:"5",x:"7",y:"5",rx:"1"}),n.createElement("rect",{width:"7",height:"5",x:"10",y:"14",rx:"1"})),ai=e=>n.createElement(se,{...e},n.createElement("path",{d:"M3 4.5A1.5 1.5 0 0 1 4.5 3h5.1a2 2 0 0 1 1.4.6l7.4 7.4a2 2 0 0 1 0 2.8l-5.1 5.1a2 2 0 0 1-2.8 0L3.6 11.5a2 2 0 0 1-.6-1.4V4.5Z"}),n.createElement("path",{d:"M7 7h.01"})),ut=e=>n.createElement(se,{...e},n.createElement("path",{d:"M12 5v14M5 12h14"})),ni=e=>n.createElement(se,{...e},n.createElement("path",{d:"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"}),n.createElement("circle",{cx:"12",cy:"12",r:"3"})),ri=e=>n.createElement(se,{...e},n.createElement("path",{d:"m3 3 18 18"}),n.createElement("path",{d:"M10.6 6.1A9.7 9.7 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.3 3.9"}),n.createElement("path",{d:"M6.6 6.6A17 17 0 0 0 2 12s3.5 6 10 6a9.7 9.7 0 0 0 3.4-.6"}),n.createElement("path",{d:"M9.9 9.9a3 3 0 0 0 4.2 4.2"})),Qa=e=>n.createElement(se,{...e},n.createElement("path",{d:"M3 6h18"}),n.createElement("path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}),n.createElement("path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"})),pt=e=>n.createElement(se,{...e},n.createElement("path",{d:"M8 2v4M16 2v4"}),n.createElement("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2"}),n.createElement("path",{d:"M3 10h18"})),fa=e=>n.createElement(se,{...e},n.createElement("circle",{cx:"12",cy:"12",r:"9"}),n.createElement("path",{d:"M12 7v5l3 2"})),oi=e=>n.createElement(se,{...e},n.createElement("path",{d:"M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"})),ii=e=>n.createElement(se,{...e},n.createElement("path",{d:"M4 22V4h11l-1 3h6l-2 4 2 4h-9l-1-3H4"})),Ja=e=>n.createElement(se,{...e},n.createElement("path",{d:"M21.2 6.2a2.8 2.8 0 0 0-4-4L4 15.5 3 21l5.5-1L21.2 6.2Z"}),n.createElement("path",{d:"m15 5 4 4"})),si=e=>n.createElement(se,{...e},n.createElement("path",{d:"m3 6 2 2 4-4M3 12l2 2 4-4M3 18l2 2 4-4"}),n.createElement("path",{d:"M13 6h8M13 12h8M13 18h8"})),Pt=e=>n.createElement(se,{...e},n.createElement("path",{d:"M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"}),n.createElement("path",{d:"M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"})),ga=e=>n.createElement(se,{...e},n.createElement("path",{d:"M21.4 11.05 12.25 20.2a6 6 0 0 1-8.49-8.49l9.2-9.19a4 4 0 0 1 5.65 5.66l-9.2 9.19a2 2 0 0 1-2.82-2.83l8.49-8.48"})),Jt=e=>n.createElement(se,{...e},n.createElement("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"}),n.createElement("circle",{cx:"12",cy:"10",r:"3"})),di=e=>n.createElement(se,{...e},n.createElement("path",{fill:"currentColor",stroke:"none",d:"M14 4v5c0 1.12.37 2.16 1 3H9c.65-.86 1-1.9 1-3V4zm3-2H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3V4h1c.55 0 1-.45 1-1s-.45-1-1-1"})),li=e=>n.createElement(se,{...e},n.createElement("path",{d:"M3 11l19-9-9 19-2-8-8-2z"})),Xn=e=>n.createElement(se,{...e},n.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),n.createElement("path",{d:"M14 2v6h6M9 13h6M9 17h4"})),ci=e=>n.createElement(se,{...e},n.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),n.createElement("path",{d:"M14 2v6h6"})),ui=e=>n.createElement(se,{...e},n.createElement("rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}),n.createElement("circle",{cx:"9",cy:"9",r:"2"}),n.createElement("path",{d:"m21 15-4.6-4.6a2 2 0 0 0-2.8 0L3 21"})),pi=e=>n.createElement(se,{...e},n.createElement("path",{d:"M9 18V5l12-2v13"}),n.createElement("circle",{cx:"6",cy:"18",r:"3"}),n.createElement("circle",{cx:"18",cy:"16",r:"3"})),mi=e=>n.createElement(se,{...e},n.createElement("path",{d:"m22 8-6 4 6 4V8z"}),n.createElement("rect",{width:"14",height:"12",x:"2",y:"6",rx:"2"})),Zo={note:Xn,attachment:ga,link:Pt,location:Jt},Qo={note:"calendar.badge.note",attachment:"calendar.badge.attachment",link:"calendar.badge.link",location:"calendar.badge.location"};function fi(e){return(e??[]).filter(t=>t in Qo).map(t=>l(Qo[t]))}var Mt=({badges:e,className:t})=>{let a=(e??[]).filter(r=>r in Zo);return a.length===0?null:n.createElement("span",{className:t?`calendar-badges ${t}`:"calendar-badges","aria-hidden":"true"},a.map(r=>{let o=Zo[r];return n.createElement(o,{key:r})}))},ol={"list-todo":()=>n.createElement("path",{fill:"currentColor",stroke:"none",d:"M3 6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm1.5 4.5h4v-4h-4Zm8.25-5a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5Zm0 6a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5Zm0 6a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5Zm-2.97-2.53a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47 2.97-2.97a.75.75 0 0 1 1.06 0Z"}),cake:()=>n.createElement(n.Fragment,null,n.createElement("path",{d:"M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"}),n.createElement("path",{d:"M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"}),n.createElement("path",{d:"M2 21h20M7 8v3M12 8v3M17 8v3M7 4h.01M12 4h.01M17 4h.01"})),gift:()=>n.createElement(n.Fragment,null,n.createElement("path",{d:"M20 12v10H4V12M2 7h20v5H2zM12 22V7"}),n.createElement("path",{d:"M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"})),heart:()=>n.createElement("path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"}),star:()=>n.createElement("path",{d:"m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01Z"}),flag:()=>n.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"}),bell:()=>n.createElement(n.Fragment,null,n.createElement("path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"}),n.createElement("path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"})),pin:()=>n.createElement(n.Fragment,null,n.createElement("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"}),n.createElement("circle",{cx:"12",cy:"10",r:"3"})),person:()=>n.createElement(n.Fragment,null,n.createElement("path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}),n.createElement("circle",{cx:"12",cy:"7",r:"4"})),clock:()=>n.createElement(n.Fragment,null,n.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.createElement("path",{d:"M12 6v6l4 2"})),calendar:()=>n.createElement(n.Fragment,null,n.createElement("path",{d:"M8 2v4M16 2v4M3 10h18"}),n.createElement("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2"}))};function gi(){return[{id:"cake",label:l("auto.9c6e5a3f44fc")},{id:"gift",label:l("auto.8d0a32ed6339")},{id:"heart",label:l("auto.2a37335eebda")},{id:"star",label:l("auto.85a7de6e2705")},{id:"flag",label:l("auto.a774409a00c2")},{id:"bell",label:l("auto.d4198662a72f")},{id:"pin",label:l("auto.9c918414710c")},{id:"person",label:l("auto.8c41ae88467f")},{id:"clock",label:l("auto.04f6b3ea183e")},{id:"calendar",label:l("auto.adab5090ac6a")}]}var Le=({id:e,className:t})=>{let a=e?ol[e]:void 0;return a?n.createElement(se,{className:t},a()):null},Zn=e=>n.createElement("svg",{className:e.className,width:"1em",height:"1em",viewBox:"0 0 24 24","aria-hidden":"true",style:{mask:"var(--icon-open-in-new) center / contain no-repeat"}},e.title?n.createElement("title",null,e.title):null,n.createElement("rect",{width:"24",height:"24",fill:"currentColor"}));function Qn({value:e,onChange:t,disabled:a,placeholder:r,ariaLabel:o}){let i=g.ui.ResourcePicker;return n.createElement(i,{value:e,onChange:t,kinds:["attachment"],placeholder:r??l("auto.e7de9576dc00"),disabled:a,ariaLabel:o??l("auto.8410192cbb1f"),allowCustom:!1})}function il(e){if(!Number.isFinite(e)||e<0)return"";let t=["B","KB","MB","GB","TB"],a=e,r=0;for(;a>=1024&&r<t.length-1;)a/=1024,r++;let o=r===0||a>=100?0:a>=10?1:2;return`${a.toFixed(o)} ${t[r]}`}var sl={image:ui,audio:pi,video:mi},hi=({relPath:e,onRemove:t})=>{let[a,r]=n.useState(null),o=Xo(e),i=e.split("/").pop()??e,d=sl[o]??ci,s=Yn(e).replace(".","").toUpperCase();return n.useEffect(()=>{let c=!1;return g.vault.fileInfo(e).then(u=>{c||r(u?.size??null)}),()=>{c=!0}},[e]),n.createElement("div",{className:"calendar-attach-card"},n.createElement("button",{className:"calendar-attach-open",type:"button",onClick:c=>g.workspace.openFile(e,void 0,{newTab:g.ui.hasModKey(c)}),title:e},n.createElement("span",{className:"calendar-attach-thumb"},n.createElement(d,null)),n.createElement("span",{className:"calendar-attach-copy"},n.createElement("span",{className:"calendar-attach-name"},i),n.createElement("span",{className:"calendar-attach-meta"},s,a!==null&&`${s?" \xB7 ":""}${il(a)}`))),t&&n.createElement("button",{className:"calendar-attach-remove",type:"button",onClick:t,title:l("calendar.removeAttachment"),"aria-label":l("calendar.removeAttachmentOf",{p0:i})},n.createElement(nt,null)))};function yi(){try{return g.interop.services.providers(Cn)[0]}catch{return}}function dl(){try{return g.interop.services.providers(En)[0]}catch{return}}function bi(){return!0}function vi(e){let t=dl();t?t.invoke("open",[{url:e}]):g.files.openExternalUrl(e)}function Jn(e){let t=yi();if(!t)return;let a=e.lng!==void 0&&e.lat!==void 0?`${e.lat},${e.lng}`:e.name;t.invoke("open",[{query:a}])}function er(){return!!yi()}var wi=({value:e,onChange:t})=>{let a=g.ui.ResourcePicker;return n.createElement("div",{className:"calendar-location"},n.createElement("div",{className:"calendar-location-row"},n.createElement(a,{className:"calendar-quickadd-input calendar-location-input",value:e?.name??"",placeholder:l("calendar.locationPlaceholder"),ariaLabel:l("calendar.location"),kinds:["place"],allowCustom:!0,onChange:(r,o)=>{let i=Number(o?.metadata?.longitude),d=Number(o?.metadata?.latitude);t(r?{name:r,...Number.isFinite(i)&&Number.isFinite(d)?{lng:i,lat:d}:{}}:void 0)}}),e&&n.createElement(n.Fragment,null,er()&&n.createElement("button",{className:"calendar-field-btn",type:"button",title:l("calendar.openLocation"),"aria-label":l("calendar.openLocationOf",{p0:e.name}),onClick:()=>Jn(e)},n.createElement(li,null)),n.createElement("button",{className:"calendar-field-btn",type:"button",title:l("calendar.removeLocation"),"aria-label":l("calendar.removeLocation"),onClick:()=>{t(void 0)}},n.createElement(nt,null)))))};function Ue(e){return`${e.sourceId??e.kind}:${e.id}:${e.occurrenceKey??e.date}`}function tr(){return g.runtime.getOrCreate("calendar.editRequest",()=>{let e={value:null,listeners:new Set,get:()=>e.value,publish:t=>{e.value=t;for(let a of[...e.listeners])a()},subscribe:t=>(e.listeners.add(t),()=>e.listeners.delete(t))};return e})}function ar(e){let t=tr();t.publish({item:e,nonce:(t.get()?.nonce??0)+1}),g.workspace.openMainTab()}function nr(e){Vr({date:e.date,startTime:e.startTime,endTime:e.endTime,sourceId:e.sourceId,itemId:e.id})}function xi(e){Pa({date:e.date,startTime:e.startTime,endTime:e.endTime,sourceId:e.sourceId,itemId:e.id})}function ea({sourceId:e,sourceOwner:t,labelKey:a,item:r,editable:o}){return{kind:"sourced",id:r.id,title:r.title,date:r.date,...r.endDate?{endDate:r.endDate}:{},startTime:r.startTime,endTime:r.endTime,completed:r.completed,filePath:r.filePath,sourceId:e,sourceOwner:t,sourceLabelKey:a,sourced:r,group:r.group,tags:r.tags,note:r.note,location:r.location,urls:r.urls,attachments:r.attachments,priority:r.priority,status:r.status,color:r.color,borderColor:r.borderColor,icon:r.icon,fields:r.fields,badges:r.badges,readOnly:r.readOnly||!o}}function ll(e){let t=[];return e.filePath&&t.push("note"),e.attachments?.length&&t.push("attachment"),e.urls?.length&&t.push("link"),e.location&&t.push("location"),t.length>0?t:void 0}function Ye(e){return{kind:"event",id:e.id,title:e.title,date:e.date,endDate:e.endDate,startTime:e.startTime,endTime:e.endTime,filePath:e.filePath,event:e,tags:e.tags,note:e.note,location:e.location,urls:e.urls,attachments:e.attachments,category:e.category,groupId:e.groupId,group:e.group,badges:ll(e),readOnly:e.readOnly}}function ki(e){return{kind:"noteDate",id:e.id,title:e.title,date:e.date,startTime:e.startTime,endTime:e.endTime,filePath:e.relPath,color:e.color,borderColor:e.borderColor,icon:e.icon,fields:e.fields,readOnly:!0}}function ta(e){let t=(e.fields??[]).map(r=>`${r.key}: ${r.value}`),a=fi(e.badges);return[e.title,e.note?.trim(),...t,...a.length>0?[a.join(" \xB7 ")]:[]].filter(r=>!!r).join(`
`)}function cl(e){return e.startTime?e.endTime?`${e.startTime}\u2013${e.endTime}`:e.startTime:l("auto.1ac1ff7616a6")}function en({item:e,sourceId:t,color:a,revealNonce:r,onClick:o,onDoubleClick:i,onContextMenu:d}){return n.createElement("div",{role:"button",tabIndex:0,className:`agenda-card${e.completed?" completed":""}${e.filePath?" linked":""}${r!=null?" calendar-reveal-target":""}`,"data-calendar-source-id":t,"data-calendar-item-id":e.id,onClick:o,onDoubleClick:i,onContextMenu:d,onKeyDown:s=>{s.target!==s.currentTarget||s.key!=="Enter"&&s.key!==" "||(s.preventDefault(),o())},title:ta(e)},n.createElement("span",{className:"agenda-card-dot",style:{background:me(a)}}),n.createElement("span",{className:"agenda-card-body"},n.createElement("span",{className:"agenda-card-title"},e.icon&&n.createElement(Le,{id:e.icon,className:"calendar-chip-glyph"}),e.title),n.createElement("span",{className:"agenda-card-time"},cl(e),n.createElement(Mt,{badges:e.badges})),e.note?.trim()&&n.createElement(g.ui.MarkdownView,{className:"agenda-card-note",value:e.note,context:{sourcePath:e.filePath,ref:e.sourced?.documentRef??(e.kind==="event"&&!e.readOnly?{pluginId:"calendar",sourceId:"events",itemId:e.id}:void 0)}}),e.fields&&e.fields.length>0&&n.createElement("span",{className:"agenda-card-fields"},e.fields.map(s=>s.value).join(" \xB7 "))))}function ul(e){if(!e.labelKey)return e.label;let t=l(e.labelKey);return t===e.labelKey?e.label:t}function pl(e){switch(e){case"note":return n.createElement(Zn,null);case"attachment":return n.createElement(ga,null);case"link":return n.createElement(Pt,null);case"map":return n.createElement(Jt,null);case"edit":return n.createElement(Ja,null);case"open":return n.createElement(Nt,null);case"checklist":return n.createElement(si,null);default:return}}async function tn(e,t={}){let a=e.sourceId;if(e.kind!=="sourced"||!a)return[];let r=i=>({id:i.id,label:ul(i),description:i.description,icon:pl(i.icon),danger:i.danger,enabled:i.enabled,...i.submenu?.length?{submenu:i.submenu.map(r)}:{onSelect:i.id===sa&&t.onEdit?t.onEdit:()=>{ma(a,e.id,i.id)}}}),o=new Set(t.skip??[]);return(await Za(a,e.id)).filter(i=>!o.has(i.id)).map(r)}function an(e){return(e.fields??[]).map(t=>({id:`field:${t.key}`,label:t.key,description:t.value,enabled:!1}))}function aa(e){if(!e.filePath)return[];let t=e.filePath;return[{id:"open-note",label:l("auto.c66a827e3397"),icon:n.createElement(Zn,null),onSelect:()=>g.workspace.openFile(t)}]}function ml(e){let t=e.lastIndexOf("/");return t===-1?e:e.slice(t+1)}function nn(e){let t=e.kind==="event"?e.event:void 0;if(!t)return[];let a=[...aa(e)],r=t.attachments??[];r.length>0&&a.push({id:"open-attachment",label:l("calendar.action.openAttachment"),icon:n.createElement(ga,null),submenu:r.map(i=>({id:`attachment:${i}`,label:ml(i),description:i,icon:n.createElement(ga,null),onSelect:()=>g.workspace.openFile(i)}))});let o=t.urls??[];if(o.length>0&&bi()&&a.push({id:"open-link",label:l("calendar.action.openLink"),icon:n.createElement(Pt,null),submenu:o.map(i=>({id:`url:${i}`,label:i,icon:n.createElement(Pt,null),onSelect:()=>vi(i)}))}),t.location&&er()){let i=t.location;a.push({id:"show-on-map",label:l("calendar.action.showOnMap"),description:i.name,icon:n.createElement(Jt,null),onSelect:()=>Jn(i)})}return a}async function Si(e,t,a,r){let o=new Date().toISOString();if(!e.readOnly){if(e.kind==="sourced"&&e.sourced&&e.sourceId){let i=Qt(e.date,t);await Wa(e.sourceId,e.sourced.id,{date:We(e.sourced.date,i),...e.sourced.endDate?{endDate:We(e.sourced.endDate,i)}:{},startTime:a,endTime:r})}else if(e.kind==="event"&&e.event){let i=Qt(e.date,t);await Ra(e.id,{...e.event,date:We(e.event.date,i),endDate:e.event.endDate?We(e.event.endDate,i):void 0,startTime:a,endTime:r,allDay:!a&&!r,updatedAt:o})}}}var Se=e=>typeof e=="string"?e:"";function rr(e=new Date){let t=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${a}`}var Ei=e=>`${e.slice(0,7)}-01`,na=e=>e.match(/\d{4}-\d{2}-\d{2}/)?.[0],Ci=e=>e.match(/\d{1,2}:\d{2}/)?.[0],Ii=["month","week","year"],ue={type:"string"},or={type:"object",additionalProperties:!1,properties:{...Object.fromEntries(["title","date","endDate","startTime","endTime","groupId","group","note","filePath","priority"].map(e=>[e,ue])),completed:{type:"boolean"},...Object.fromEntries(["tags","urls","attachments"].map(e=>[e,{type:"array",items:ue}])),location:{oneOf:[{type:"null"},{type:"object",required:["name"],additionalProperties:!1,properties:{name:ue,lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}}}]}}};function ra(e){let t=e;if(!t||typeof t.id!="string"||!t.id.trim()||t.sourceId!==void 0&&typeof t.sourceId!="string")throw new Error("Expected a calendar item id and optional source id.");return{id:t.id,sourceId:typeof t.sourceId=="string"&&t.sourceId?t.sourceId:void 0}}function Di(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Expected calendar item values.");let t=e;for(let[a,r]of Object.entries(t)){if(!(a in or.properties))throw new Error(`Unsupported calendar property "${a}".`);if(a==="completed"){if(typeof r!="boolean")throw new Error("Expected a completion flag.")}else if(["tags","urls","attachments"].includes(a)){if(!Array.isArray(r)||!r.every(o=>typeof o=="string"))throw new Error(`Expected a text list for "${a}".`)}else if(a==="location"){if(r!==null){if(!r||typeof r!="object"||Array.isArray(r))throw new Error("Invalid location.");let o=r;if(typeof o.name!="string"||Object.keys(o).some(i=>!["name","lng","lat"].includes(i))||o.lng!==void 0&&(typeof o.lng!="number"||!Number.isFinite(o.lng)||Math.abs(o.lng)>180)||o.lat!==void 0&&(typeof o.lat!="number"||!Number.isFinite(o.lat)||Math.abs(o.lat)>90)||o.lng===void 0!=(o.lat===void 0))throw new Error("Invalid location.")}}else if(typeof r!="string")throw new Error(`Expected text for "${a}".`)}if(typeof t.title=="string"&&!t.title.trim())throw new Error("An event title cannot be empty.");for(let a of["date","endDate"])if(t[a]&&!/^\d{4}-\d{2}-\d{2}$/.test(String(t[a])))throw new Error("Invalid calendar date.");for(let a of["startTime","endTime"])if(t[a]&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(t[a])))throw new Error("Invalid calendar time.");return t}async function He(e){if(e.sourceId){if(!ct().some(a=>a.sourceId===e.sourceId))throw new Error("The calendar item provider is unavailable.");let t=(await qn(!0)).find(a=>a.sourceId===e.sourceId&&a.item.id===e.id);if(t)return ea(t)}else{let t=(await Me()).find(o=>o.id===e.id);if(t)return Ye(t);let a=Tt();!a.getEvents().some(o=>o.id===e.id)&&/^(google|microsoft):/.test(e.id)&&await a.sync();let r=a.getEvents().find(o=>o.id===e.id);if(r)return Ye(r);if(a.getStatus().error)throw new Error("Remote calendar items are unavailable. Reconnect or refresh the calendar and retry.")}throw new Error("The calendar item no longer exists.")}async function fl(e,t,a){let r=await He(e);if(r.readOnly)throw new Error("This calendar item is read-only.");if(e.sourceId){if(t.groupId!==void 0)throw new Error("This calendar source uses group names.");let d=r.sourced?.endDate&&t.date!==void 0&&t.endDate===void 0?{...t,endDate:We(r.sourced.endDate,Qt(r.sourced.date,t.date))}:t;if(!await Wa(e.sourceId,e.id,d))throw new Error("Could not save the calendar source item.");return{value:await He(e),revert:null}}let o=r.event;if(a!==void 0&&o.updatedAt!==a)throw new Error("This event changed elsewhere. Reload it before saving; your draft is preserved.");if(t.completed!==void 0||t.priority!==void 0||t.group!==void 0)throw new Error("Events use groupId and do not have a task status or priority.");let i=$a({...o,...t,allDay:!(t.startTime??o.startTime)&&!(t.endTime??o.endTime),updatedAt:new Date().toISOString()});if(!i.date||t.endDate&&t.endDate<i.date)throw new Error("The event end date must follow its start date.");if(t.filePath&&i.filePath!==t.filePath)throw new Error("Invalid event file path.");for(let d of["urls","attachments"])if(t[d]?.some(s=>!i[d]?.includes(s)))throw new Error(`Invalid event ${d}.`);if(!await Et(e.id,i,o.updatedAt))throw new Error("Could not save the event.");return{value:Ye(i),revert:{label:`Edit \u201C${o.title}\u201D`,run:async()=>{if(!await Et(e.id,o))throw new Error("Could not restore the event.")},reapply:async()=>{if(!await Et(e.id,i))throw new Error("Could not reapply the event edit.")}}}}async function ha(e){let t=e??{},a=t.target??(t.id?{id:t.id,sourceId:t.sourceId}:void 0);return a?He(a):t.sourceId?ct().find(r=>r.sourceId===t.sourceId)??null:{day:rr()}}function Ai(e){let t=[e.commands.register({id:"list-items",label:"Calendar: List all items",labelKey:"calendar.command.listItems",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{from:ue,to:ue,sourceId:ue},additionalProperties:!1},parse:a=>{let r=a??{};for(let o of["from","to","sourceId"])if(r[o]!==void 0&&typeof r[o]!="string")throw new Error("Expected calendar filter text.");return{from:Se(r.from),to:Se(r.to),sourceId:Se(r.sourceId)}}},run:async({from:a,to:r,sourceId:o})=>{let i=(await Me()).map(Ye),d=(await qn(!0,a||"0001-01-01",r||"9999-12-31")).map(ea),s=Tt().getEvents().map(Ye);return[...i,...d,...s].filter(c=>(!a||(c.endDate??c.date)>=a)&&(!r||c.date<=r)&&(!o||c.sourceId===o))}}),e.commands.register({id:"source-actions",label:"Calendar: List source item actions",labelKey:"calendar.command.sourceActions",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:ue,sourceId:ue},required:["id","sourceId"],additionalProperties:!1},parse:a=>{let r=ra(a);if(!r.sourceId)throw new Error("Expected a source id.");return{id:r.id,sourceId:r.sourceId}}},run:async({id:a,sourceId:r})=>(await He({id:a,sourceId:r}),Za(r,a))}),e.commands.register({id:"get",label:"Calendar: Get item",labelKey:"calendar.command.get",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:ue,sourceId:ue},required:["id"],additionalProperties:!1},parse:ra},run:He}),e.commands.register({id:"open",label:"Calendar: Open item",labelKey:"calendar.command.open",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:ue,sourceId:ue},required:["id"],additionalProperties:!1},parse:ra},run:async a=>{let r=await He(a);return ar(r),r}}),e.commands.register({id:"open-cached",label:"Calendar: Open cached event",labelKey:"calendar.command.openCached",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:ue,accountId:ue},required:["id","accountId"],additionalProperties:!1},parse:a=>{let r=a,o=Se(r?.id),i=Se(r?.accountId);if(!o||!i)throw new Error("Expected a cached calendar event and account.");return{id:o,accountId:i}}},run:async({id:a,accountId:r})=>{let o=await e.data.dataset("calendar.remote_events").get({id:a,accountId:r});if(!o?.event||typeof o.event!="object")throw new Error("The cached event is unavailable. Open Calendar to refresh its source.");let i=Ye($a(o.event));return i.readOnly=!0,ar(i),i}}),e.commands.register({id:"edit-fields",label:"Calendar: Edit item fields",labelKey:"calendar.command.editFields",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{id:ue,sourceId:ue,values:or,expectedUpdatedAt:ue},required:["id","values"],additionalProperties:!1},parse:a=>{let r=a,o=ra(a);if(r.expectedUpdatedAt!==void 0&&typeof r.expectedUpdatedAt!="string")throw new Error("Expected an event revision.");return{target:o,values:Di(r.values),expectedUpdatedAt:r.expectedUpdatedAt}}},run:({target:a,values:r,expectedUpdatedAt:o})=>fl(a,r,o),revision:a=>ha(a),preview:a=>({changes:a})}),e.commands.register({id:"delete",label:"Calendar: Delete item",labelKey:"calendar.command.delete",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{id:ue,sourceId:ue},required:["id"],additionalProperties:!1},parse:ra},run:async a=>{let r=await He(a);if(r.readOnly)throw new Error("This calendar item is read-only.");if(a.sourceId){if(!await Ya(a.sourceId,a.id))throw new Error("Could not delete the calendar source item.");return{value:r,revert:null}}if(!await Wt(a.id))throw new Error("Could not delete the event.");return{value:r,revert:{label:`Delete \u201C${r.title}\u201D`,run:async()=>{if(!await Ct(r.event))throw new Error("Could not restore the event.")}}}},revision:a=>ha(a),preview:a=>({changes:a})}),e.commands.register({id:"sources",label:"Calendar: List item sources",labelKey:"calendar.command.sources",paletteSafe:!1,sideEffect:"read",run:()=>ct()}),e.commands.register({id:"source-create",label:"Calendar: Create source item",labelKey:"calendar.command.sourceCreate",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{sourceId:ue,date:ue,values:or},required:["sourceId","date","values"],additionalProperties:!1},parse:a=>{let r=a;if(typeof r?.sourceId!="string"||!r.sourceId||typeof r.date!="string"||!/^\d{4}-\d{2}-\d{2}$/.test(r.date))throw new Error("Expected a source id and date.");let o=Di(r.values);if(!o.title?.trim()||o.endDate!==void 0||o.groupId!==void 0)throw new Error("Expected source item title and supported values.");return{sourceId:r.sourceId,date:r.date,values:o}}},run:async({sourceId:a,date:r,values:o})=>{if(!await Xa(a,r,o))throw new Error("Could not create the source item.");return{value:!0,revert:null}},revision:a=>ha(a),preview:a=>({changes:a})}),e.commands.register({id:"source-action",label:"Calendar: Run source item action",labelKey:"calendar.command.sourceAction",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{sourceId:ue,id:ue,actionId:ue},required:["sourceId","id","actionId"],additionalProperties:!1},parse:a=>{let r=a,o=ra(a);if(!o.sourceId||typeof r.actionId!="string"||!r.actionId)throw new Error("Expected a source and action id.");return{sourceId:o.sourceId,id:o.id,actionId:r.actionId}}},run:async({sourceId:a,id:r,actionId:o})=>{if(await He({sourceId:a,id:r}),!await ma(a,r,o))throw new Error("Could not run the source item action.");return{value:!0,revert:null}},revision:a=>ha(a),preview:a=>({changes:a})}),e.commands.register({id:"open-page",label:"Open Calendar page",labelKey:"auto.b29a9852d77e",sideEffect:"read",run:()=>{e.workspace.openMainTab()},formatCli:()=>"Opened calendar page."}),e.commands.register({id:"add",label:"Calendar: Add an event",labelKey:"auto.e16f07326a18",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{title:{type:"string"},date:{type:"string"},start:{type:"string"},end:{type:"string"},group:{type:"string"}},required:["title"],additionalProperties:!1},parse:a=>{let r=a??{},o=Se(r.title).trim();if(!o)throw new Error('Usage: calendar add "<title>" [--date --start --end --group]');return{title:o,date:Se(r.date),start:Se(r.start),end:Se(r.end),group:Se(r.group)}},fromCli:(a,r)=>({title:a.join(" ").trim(),date:r.date,start:r.start,end:r.end,group:r.group})},run:async({title:a,date:r,start:o,end:i,group:d})=>{let s=na(r)||na(o)||na(i)||rr(),c=Ka(a,s,{startTime:o?Ci(o):void 0,endTime:i?Ci(i):void 0,groupId:d||void 0});if(!await Ct(c))throw new Error("Failed to add event.");return{value:c,revert:{label:`Add event \u201C${c.title}\u201D`,run:async()=>{await Wt(c.id)},reapply:async()=>{await Ct(c)}}}},formatCli:a=>`Added event "${a.title}" on ${a.date}${a.startTime?` ${a.startTime}`:""}`,revision:a=>ha(a),preview:a=>({changes:a})}),e.commands.register({id:"goto",label:"Calendar: Go to date",labelKey:"auto.bf2660184858",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{date:{type:"string"}},required:["date"],additionalProperties:!1},parse:a=>{let r=na(Se(a?.date));if(!r)throw new Error("Usage: calendar goto <YYYY-MM-DD>");return{date:r}},fromCli:a=>({date:a[0]})},run:({date:a})=>e.workspace.patchTimeControl({cursor:Ei(a),selectedDate:a}),formatCli:a=>`Calendar at ${a.selectedDate??a.cursor} (${a.view})`}),e.commands.register({id:"set-view",label:"Calendar: Set view",labelKey:"auto.7f852a5678f1",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{view:{type:"string",enum:["month","week","year"]}},required:["view"],additionalProperties:!1},parse:a=>{let r=Se(a?.view).toLowerCase();if(!Ii.includes(r))throw new Error(`Usage: calendar set-view ${Ii.join("|")}`);return{view:r}},fromCli:a=>({view:(a[0]??"").toLowerCase()})},run:({view:a})=>e.workspace.patchTimeControl({view:a}),formatCli:a=>`Calendar view: ${a.view}`}),e.commands.register({id:"today",label:"Calendar: Go to today",labelKey:"auto.ee8581831b9c",sideEffect:"read",run:()=>{let a=rr();return e.workspace.patchTimeControl({cursor:Ei(a),selectedDate:a})},formatCli:a=>`Calendar at ${a.selectedDate??a.cursor} (${a.view})`}),e.commands.register({id:"list",label:"Calendar: List events",labelKey:"auto.05d290d65a74",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{from:{type:"string"},to:{type:"string"}},required:[],additionalProperties:!1},parse:a=>{let r=a??{};return{from:na(Se(r.from))??"",to:na(Se(r.to))??""}},fromCli:(a,r)=>({from:Se(r.from),to:Se(r.to)})},run:async({from:a,to:r})=>(await Me()).filter(d=>(!a||d.date>=a)&&(!r||d.date<=r)).sort((d,s)=>d.date.localeCompare(s.date)||(d.startTime??"").localeCompare(s.startTime??"")),formatCli:a=>a.length===0?"No events.":a.map(r=>`  ${r.date}${r.startTime?` ${r.startTime}`:""}  ${r.title}`).join(`
`)})];return()=>t.forEach(a=>a())}var Ti={calendar:[{id:"agenda",label:"Agenda",labelKey:"markdown.examples.agenda",code:`view-mode: agenda
range: this-week
limit: 20`},{id:"week",label:"Week",labelKey:"markdown.examples.week",code:`view-mode: week
range: this-week`},{id:"day",label:"Today",labelKey:"markdown.examples.day",code:"range: today"},{id:"nextSeven",label:"Next seven days",labelKey:"markdown.examples.nextSeven",code:"range: next-7"},{id:"nextThirty",label:"Next thirty days",labelKey:"markdown.examples.nextThirty",code:"range: next-30"},{id:"dateRange",label:"Date range",labelKey:"markdown.examples.dateRange",code:`start-date: 2026-09-01
end-date: 2026-09-30`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`view-mode: week
range: next-30
filter-tag: #focus
limit: 10`}]};var hl=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,yl=/^-\s+(.*)$/,bl=/^[A-Za-z][\w+.-]*:\/\//;function Ni(e){let t={bare:null,values:{},lists:{}},a=null;for(let r of e.split(`
`)){let o=r.trim();if(!o||o.startsWith("#"))continue;let i=o.match(yl);if(i){a?t.lists[a].push(i[1].trim()):t.bare===null&&(t.bare=i[1].trim());continue}let d=bl.test(o)?null:o.match(hl);if(d){let s=d[1].trim().toLowerCase(),c=d[2].trim();c===""?(a=s,t.lists[s]=t.lists[s]??[]):(a=null,t.values[s]=c);continue}a=null,t.bare===null&&(t.bare=o)}return t}function Pi(e,t,a=500){let r=e.values[t];if(r===void 0)return null;let o=Number.parseInt(r,10);return!Number.isFinite(o)||o<1?null:Math.min(o,a)}var sr="notes-calendar-fence-styles";function vl(){if(document.getElementById(sr))return;let e=document.createElement("style");e.id=sr,e.textContent=`
.calendar-fence { margin: 0.75em 0; border: 1px solid var(--border-light); border-radius: var(--radius); background: var(--container-color); overflow: hidden; }
.calendar-fence-head { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border-bottom: 1px solid var(--border-light); cursor: pointer; }
.calendar-fence-head .t { font-weight: 600; color: var(--title-color); }
.calendar-fence-head .c { font-size: var(--small-font-size); color: var(--text-secondary); }
.calendar-fence-day { padding: 6px 12px 2px; font-size:0.6875rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-secondary); }
.calendar-fence-row { display: flex; align-items: center; gap: 8px; padding: 5px 12px; cursor: pointer; }
.calendar-fence-row:hover { background: var(--hover-bg); }
.calendar-fence-row .dot { flex: none; width: 8px; height: 8px; border-radius: 50%; background: var(--accent-color); }
.calendar-fence-row .time { flex: none; width: 6.5em; font-variant-numeric: tabular-nums; font-size: var(--small-font-size); color: var(--text-secondary); }
.calendar-fence-row .t { flex: 1; min-width: 0; color: var(--text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.calendar-fence-row .cat { flex: none; font-size:0.6875rem; padding: 0 6px; border-radius: 999px; background: var(--accent-tint-bg); color: var(--accent-tint-text); }
.calendar-fence-empty { padding: 10px 12px; color: var(--text-secondary); font-size: var(--small-font-size); }
`,document.head.appendChild(e)}var Mi=e=>String(e).padStart(2,"0"),ya=e=>`${e.getFullYear()}-${Mi(e.getMonth()+1)}-${Mi(e.getDate())}`,ir=e=>{let t=new Date;return t.setDate(t.getDate()+e),ya(t)};function wl(e){let t=e["start-date"]??e.start,a=e["end-date"]??e.end;if(t||a)return{start:t??ya(new Date),end:a??t??ir(7)};let r=(e.range??"this-week").toLowerCase(),o=ya(new Date);if(r==="today")return{start:o,end:o};if(r==="next-30")return{start:o,end:ir(30)};if(r==="this-week"){let i=new Date,d=(i.getDay()+6)%7,s=new Date(i);s.setDate(i.getDate()-d);let c=new Date(s);return c.setDate(s.getDate()+6),{start:ya(s),end:ya(c)}}return{start:o,end:ir(7)}}function xl(e,t,a,r,o){let i=a?a.replace(/^#/,"").toLowerCase():null,d=r?.toLowerCase()??null;return e.filter(s=>!(s.date<t.start||s.date>t.end||i&&!s.tags.some(c=>c.replace(/^#/,"").toLowerCase()===i)||d&&(s.category??"").toLowerCase()!==d)).sort((s,c)=>s.date.localeCompare(c.date)||(s.startTime??"").localeCompare(c.startTime??"")).slice(0,o)}var kl=e=>{let[t,a,r]=e.split("-").map(Number);return new Date(t,(a??1)-1,r??1).toLocaleDateString(g.ui.language(),{weekday:"short",day:"numeric",month:"short"})},Sl=({code:e})=>{let[t,a]=n.useState(null);n.useEffect(()=>{let m=!0,y=()=>{Me().then(I=>{m&&a(I)})};y();let S=at(y);return()=>{m=!1,S()}},[]);let r=Ni(e),o=wl(r.values),i=(r.values["view-mode"]??r.values.view??"agenda").toLowerCase().startsWith("week"),d=Pi(r,"limit",200)??20;if(!t)return n.createElement("div",{className:"calendar-fence-empty"},l("auto.33ce417454bf"));let s=xl(t,o,r.values["filter-tag"]??r.values.tag??null,r.values.category??null,d),c=()=>g.workspace.openMainTab(),u=m=>m.allDay||!m.startTime?l("auto.1ac1ff7616a6"):`${m.startTime}${m.endTime?`\u2013${m.endTime}`:""}`,h=(m,y)=>n.createElement("div",{key:m.id,className:"calendar-fence-row",onClick:c,title:m.note||m.title},n.createElement("span",{className:"dot",style:m.color?{background:me(m.color)}:void 0}),n.createElement("span",{className:"time"},y?`${m.date.slice(5)} ${u(m)}`:u(m)),n.createElement("span",{className:"t"},m.title),m.category&&n.createElement("span",{className:"cat"},m.category)),p;if(s.length===0)p=n.createElement("div",{className:"calendar-fence-empty"},l("auto.a2590d497e7c"));else if(i){let m=new Map;for(let y of s){let S=m.get(y.date)??[];S.push(y),m.set(y.date,S)}p=n.createElement(n.Fragment,null,[...m.entries()].map(([y,S])=>n.createElement(n.Fragment,{key:y},n.createElement("div",{className:"calendar-fence-day"},kl(y)),S.map(I=>h(I,!1)))))}else p=n.createElement(n.Fragment,null,s.map(m=>h(m,!0)));return n.createElement(n.Fragment,null,n.createElement("div",{className:"calendar-fence-head",onClick:c,title:l("auto.7a3a9094b18c")},n.createElement("span",{className:"t"},l("auto.adab5090ac6a")),n.createElement("span",{className:"c"},o.start," \u2192 ",o.end," \xB7 ",s.length)),p)};function Oi(){let e=g.markdown.registerCodeBlockRenderer("calendar",(t,a)=>(vl(),a.classList.add("calendar-fence"),g.ui.renderReact(a,n.createElement(Sl,{code:t}))),{examples:Ti.calendar});return()=>{e(),document.getElementById(sr)?.remove()}}function dr(e){return{v:1,...e}}function ba(e){return e.v!==1||e.view!=="month"&&e.view!=="week"&&e.view!=="year"||!dt(e.cursor)?null:Rr(e)}function rn(){let[e,t]=n.useState(Je);n.useEffect(()=>{let r=!1,o=!1;g.workspace.getTimeControl().then(d=>{!r&&!o&&t(d)});let i=g.workspace.onTimeControlChanged(d=>{o=!0,t(d)});return()=>{r=!0,i()}},[]);let a=n.useCallback(r=>{t(g.workspace.patchTimeControl(r))},[]);return[e,a]}function _i(e,t){let a=new Date(`${e}T00:00:00`),r=new Date(`${t}T00:00:00`),o=a<=r?a:r,i=a<=r?r:a,d=[];for(let s=new Date(o);s<=i;s.setDate(s.getDate()+1)){let c=String(s.getMonth()+1).padStart(2,"0"),u=String(s.getDate()).padStart(2,"0");d.push(`${s.getFullYear()}-${c}-${u}`)}return d}function El(e){let t=["title","kind","excluded","frontmatter"];if(!e)return{kinds:["note"],fields:t};if(!e.length)return{kinds:[],fields:[]};let a=[...new Set(e.flatMap(r=>[r.matchKey,r.dateField,r.startTimeField,r.endTimeField,r.labelField,...r.showFields]).filter(r=>!!r))].sort();return{kinds:["note"],fields:t,...a.length<=64&&a.every(r=>r.length<=1024&&!["__proto__","constructor","prototype"].includes(r))?{frontmatterKeys:a}:{}}}function Cl(){return Ge("noteIndex",e=>{let t=new Map,a=new Set,r=!1,o=d=>{let s=d.dispose();a.add(s),s.then(()=>a.delete(s),()=>{})};function i(d,s){let c,u,h={status:"loading",version:null,entries:[]},p=[],m=new Set,y=()=>{u?.(),u=void 0,c&&o(c),c=void 0},S=()=>{if(r||c)return;let M=Tn(e,d);c=M;let L=()=>{if(c===M){h=M.getSnapshot(),h.status==="ready"&&(p=h.entries.filter(R=>typeof R.title=="string"&&R.kind==="note"));for(let R of m)R()}};u=M.subscribe(L),L()},I={get:()=>{if(h.status==="error")throw new Error(h.error??"Calendar note index is unavailable.");return p},subscribe(M){return t.has(s)||t.set(s,I),m.add(M),S(),()=>{m.delete(M),m.size||(y(),p=[],t.get(s)===I&&t.delete(s))}},invalidate:()=>{y(),p=[],h={status:"loading",version:null,entries:p},m.size&&S()},dispose:()=>{y(),m.clear()}};return I}return{get(d){let s=t.get(d);return s||(s=i(JSON.parse(d),d),t.set(d,s)),s},invalidate:()=>{for(let d of t.values())d.invalidate()},dispose:async()=>{r=!0;for(let c of t.values())c.dispose();t.clear();let s=(await Promise.allSettled([...a])).find(c=>c.status==="rejected");if(s?.status==="rejected")throw s.reason}}})}function oa(e){let t=Cl().get(JSON.stringify(El(e)));return n.useSyncExternalStore(t.subscribe,t.get,t.get)}var Il=["exact","day-month","day"],on=100;function sn(e){return e==null?"":Array.isArray(e)?e.map(sn).filter(Boolean).join(", "):typeof e=="object"?"":String(e)}function Dl(e){if(Array.isArray(e)){let t=e.find(a=>typeof a=="string"&&a.trim());return typeof t=="string"?t.trim():""}return X(e).trim()}function Al(e){return e.split(/[\n,]+/).map(t=>t.trim()).filter(Boolean)}var Li=0;function dn(){return Li+=1,{id:`notedate-${Date.now().toString(36)}-${Li}`,title:"",matchKey:"type",matchValue:"",dateField:"date",match:"exact",showCount:!0,labelMode:"filename",showFields:[],visible:!0,hidden:!1}}var cr=[{id:"birthdays",labelKey:"calendar.noteDatePreset.birthdays",label:"Birthdays",patch:{title:"Birthdays",matchKey:"type",matchValue:"contact",dateField:"birthdate",match:"day-month",showCount:!0,icon:"cake"}},{id:"anniversaries",labelKey:"calendar.noteDatePreset.anniversaries",label:"Anniversaries",patch:{title:"Anniversaries",matchKey:"type",matchValue:"anniversary",dateField:"date",match:"day-month",showCount:!0,icon:"heart"}},{id:"deadlines",labelKey:"calendar.noteDatePreset.deadlines",label:"Deadlines",patch:{title:"Deadlines",matchKey:"type",matchValue:"project",dateField:"due",match:"exact",showCount:!1,icon:"flag"}}];function zi(e,t){let a=dn(),r=cr.find(i=>i.id===e);if(!r)return a;let o=t.map(i=>i.color).filter(i=>!!i);return{...a,...r.patch,color:ja(o)}}function Tl(e){if(!(typeof e!="number"||!Number.isFinite(e)))return Math.max(0,Math.min(on,Math.floor(e)))}function Nl(e,t){let a=X(e).trim();return Il.includes(a)?a:t}function Fi(e){let t=dn(),a=e.showFields??e.hoverFields;return{id:X(e.id,t.id),title:X(e.title).trim(),matchKey:X(e.matchKey,t.matchKey).trim(),matchValue:X(e.matchValue).trim(),folder:X(e.folder).trim()||void 0,dateField:X(e.dateField,t.dateField).trim()||t.dateField,dateFormat:X(e.dateFormat).trim()||void 0,startTimeField:X(e.startTimeField).trim()||void 0,endTimeField:X(e.endTimeField).trim()||void 0,match:Nl(e.match,t.match),recurrenceLimitYears:Tl(e.recurrenceLimitYears),showCount:co(e.showCount,t.showCount),labelMode:e.labelMode==="property"||e.labelMode==null&&X(e.labelField).trim()?"property":"filename",labelField:X(e.labelField).trim()||void 0,showFields:Array.isArray(a)?a.map(r=>X(r).trim()).filter(Boolean):Al(X(a)),color:X(e.color).trim()||void 0,borderColor:X(e.borderColor).trim()||void 0,icon:X(e.icon).trim()||void 0,visible:e.visible!==!1,hidden:e.hidden===!0}}function Pl(e,t){return t?e===t||e.startsWith(t.replace(/\/+$/,"")+"/"):!0}function ur(e){return!!(e.matchKey&&e.matchValue&&e.dateField)}function pr(e,t){if(!ur(t))return[];let a=t.matchKey,r=t.matchValue.trim().toLowerCase(),o=[];for(let i of e){if(i.excluded||i.kind!=="note"||!Pl(i.relPath,t.folder))continue;let d=i.frontmatter?.[a];String(d??"").trim().toLowerCase()===r&&o.push(i)}return o}function ln(e,t){let a=pr(e,t),r=0;for(let o of a){let i=mr(o.frontmatter?.[t.dateField],t.dateFormat);i&&(t.match!=="exact"||i.year!=null)&&(r+=1)}return{matched:a.length,dated:r}}var Ml=/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T ].*)?$/,Ol=/^(?:--)?(\d{1,2})-(\d{1,2})$/;function mr(e,t){if(e instanceof Date)return Number.isNaN(e.getTime())?null:{year:e.getFullYear(),month:e.getMonth()+1,day:e.getDate()};let a=Dl(e);if(!a)return null;if(t){let i=$r(a,t);if(i)return i}let r=Ml.exec(a);if(r){let[,i,d,s]=r,c={year:Number(i),month:Number(d),day:Number(s)};return Vt(c.year,c.month,c.day)?c:null}let o=Ol.exec(a);if(o){let[,i,d]=o,s={month:Number(i),day:Number(d)};return Vt(2e3,s.month,s.day)?s:null}return null}function lr(e,t){return $i(t,e.month,e.day)}function $i(e,t,a){let r=Math.min(a,Fr(e,t));return`${e}-${String(t).padStart(2,"0")}-${String(r).padStart(2,"0")}`}function _l(e,t,a){if(t==="exact")return e.year==null?[]:[lr(e,e.year)];if(t==="day-month")return a.map(o=>lr(e,o));let r=[];for(let o of a)for(let i=1;i<=12;i+=1)r.push($i(o,i,e.day));return r}function Ll(e,t){if(e.year==null)return null;let a=t-e.year;return a<0?null:a}function Ri(e,t){let a=new Set,r=e.getFullYear();for(let o of[r-1,r,r+1,r+2])a.add(o);if(t!=null&&Number.isFinite(t))for(let o of[t-1,t,t+1,t+2])a.add(o);return[...a].sort((o,i)=>o-i)}function zl(e,t){let a=[];for(let r of t.showFields){let o=sn(e?.[r]);o&&a.push({key:r,value:o})}return a}function Ki(e,t){if(t.labelMode==="property"&&t.labelField){let a=sn(e.frontmatter?.[t.labelField]);if(a)return a}return e.title}function Fl(e,t,a,r){if(t.hidden||!t.visible)return[];let o=[];for(let i of pr(e,t)){let d=i.frontmatter,s=mr(d?.[t.dateField],t.dateFormat);if(!s)continue;let c=s.year==null?void 0:lr(s,s.year),u=t.recurrenceLimitYears==null?void 0:r+t.recurrenceLimitYears,h=_l(s,t.match,a).filter(I=>{if(t.match==="exact")return!0;let M=Number(I.slice(0,4));return(u==null||M<=u)&&(c==null||I>=c)});if(!h.length)continue;let p=t.startTimeField?lt(d?.[t.startTimeField]):void 0,m=t.endTimeField?lt(d?.[t.endTimeField]):void 0,y=Ki(i,t),S=zl(d,t);for(let I of h){let M=Ll(s,Number(I.slice(0,4))),L=t.match==="day-month"&&t.showCount&&M!=null;o.push({id:`notedate:${t.id}:${i.relPath}:${I}`,sourceId:t.id,relPath:i.relPath,date:I,startTime:p,endTime:m,title:L?`${y} (${M})`:y,count:M,color:t.color,borderColor:t.borderColor,icon:t.icon,fields:S})}}return o}function Gi(e,t,a,r){return t.flatMap(o=>Fl(e,o,a,r))}function ji(e,t){let a=[];for(let r of t){a.push(JSON.stringify(r));for(let o of pr(e,r)){let i=o.frontmatter;a.push(o.relPath,mr(i?.[r.dateField],r.dateFormat),r.startTimeField?lt(i?.[r.startTimeField]):null,r.endTimeField?lt(i?.[r.endTimeField]):null,Ki(o,r));for(let d of r.showFields)a.push(sn(i?.[d]))}}return JSON.stringify(a)}var fr="calendar.note_date_sources",Vi=()=>g.data.dataset(fr);async function Ui(e=Vi(),t=()=>{}){let a=[],r;do{t();let o=await e.query({orderBy:[{field:"position",direction:"asc"}],limit:1e3,cursor:r});t(),a.push(...o.rows),r=o.cursor}while(r);return a}function va(){return Hi().read("sources")}function Hi(){return Ge("noteDateSources",e=>{let t=qt(async(r,o)=>(await Ui(e.data.dataset(fr),o)).map(d=>Fi(d.definition&&typeof d.definition=="object"&&!Array.isArray(d.definition)?d.definition:{})),1),a=La(e,[fr],t.invalidate);return{...t,dispose:()=>{a(),t.dispose()}}})}async function cn(e){let t=Vi(),a=await Ui(t),r=new Set(e.map(s=>s.id)),o=new Map(a.map(s=>[s.id,s])),i=e.map((s,c)=>{let u={};for(let[h,p]of Object.entries(s))p!==void 0&&(u[h]=p);return{id:s.id,position:c,definition:u}}).filter(s=>o.get(s.id)?.position!==s.position||JSON.stringify(o.get(s.id)?.definition)!==JSON.stringify(s.definition)),d=a.filter(s=>!r.has(String(s.id))).map(s=>({operation:"delete",key:{id:String(s.id)}}));if(i.length&&d.push({operation:"upsert",values:i}),d.length>1e3)throw new Error(l("calendar.error.atomicLimit"));d.length&&await t.batch(d)}function un(){let[e,t]=n.useState([]);return n.useEffect(()=>{let a=Ht(va,t,o=>console.error("[calendar] note-date sources reload failed",o)),r=Hi().subscribe(()=>{a.reload()});return a.reload(),()=>{a.dispose(),r()}},[]),e}function qi(e,t,a,r){return Ge("noteDateProjection",()=>{let i,d,s="",c=new Map,u=()=>{i=void 0,d=void 0,s="",c.clear()};return{project:(h,p,m,y)=>{if(h!==i||p!==d){let M=ji(h,p);i=h,d=p,s!==M&&(s=M,c.clear())}let S=JSON.stringify([y,m]),I=c.get(S);return I||(I=Gi(h,p,m,y),c.size>=16&&c.delete(c.keys().next().value)),c.delete(S),c.set(S,I),I},invalidate:u,dispose:u}}).project(e,t,a,r)}function $l(e){return e.kind==="event"?Dt:e.kind==="noteDate"?At:e.sourceOwner?Ha(e.sourceOwner):""}function Rl(e,t){if(e.groupId){let r=t.find(o=>o.id===e.groupId);if(r)return r}if(!e.group)return;let a=Ve(e.group);return t.find(r=>Ve(r.name)===a)}function Bi(e,t,a,r){if(a.length===0&&r.length===0)return e;let o=new Set(a),i=new Set(r);return e.filter(d=>{if(i.has($l(d)))return!1;if(o.size===0)return!0;let s=Rl(d,t);return!s||!o.has(s.id)})}function wa({label:e,options:t,hidden:a,settingsKey:r,emptyText:o,onOpenSettings:i,saveHidden:d,embedded:s=!1}){let[c,u]=n.useState(()=>[...a]),[h,p]=n.useState(!1),[m,y]=n.useState(!1);n.useEffect(()=>u([...a]),[a]);let S=t.filter(b=>!c.includes(b.id)).length,I=t.map(b=>!c.includes(b.id)),M=(b,w)=>b?` active${I[w-1]?"":" selection-run-start"}${I[w+1]?"":" selection-run-end"}`:"",L=b=>{if(m)return;u(b),y(!0),(d?d(b):r?g.settings.set(r,b).then(P=>P.ok):Promise.resolve(!1)).then(P=>{P?p(!1):(u([...a]),p(!0))}).catch(()=>{u([...a]),p(!0)}).finally(()=>y(!1))},R=b=>L(c.includes(b)?c.filter(w=>w!==b):[...c,b]),N=()=>{let b=new Set(t.map(w=>w.id));L(S===t.length?[...new Set([...c,...b])]:c.filter(w=>!b.has(w)))};return s?n.createElement("div",{className:"props-info"},n.createElement("div",{className:"props-info-actions"},i&&n.createElement("button",{type:"button",onClick:i},l("calendar.properties.manageGroups")),t.length>0&&n.createElement("button",{type:"button",disabled:m,onClick:N},l(S===t.length?"calendar.filter.deselectAll":"calendar.filter.selectAll"))),n.createElement("dl",{className:"props-info-table calendar-filter-properties"},t.map(b=>n.createElement("div",{className:"props-info-row calendar-filter-property-row",key:b.id},n.createElement("dt",{className:"props-info-key"},b.icon&&n.createElement("span",{className:"calendar-filter-property-glyph",style:b.color?{color:me(b.color)}:void 0},b.icon),!b.icon&&b.color&&n.createElement("span",{className:"props-info-dot",style:{background:me(b.color)}}),b.label),n.createElement("dd",{className:"props-info-value calendar-filter-property-value"},b.count!==void 0&&n.createElement("span",{className:"calendar-filter-option-count"},b.count),n.createElement(g.ui.settings.Toggle,{label:b.label,checked:!c.includes(b.id),disabled:m,onChange:()=>R(b.id)}))))),t.length===0&&n.createElement("p",{className:"props-info-hint"},o),h&&n.createElement("p",{className:"props-info-hint",role:"alert"},g.ui.t("error.commandFailed"))):n.createElement("div",{className:"calendar-filter-popover-body"},n.createElement("div",{className:"calendar-filter-popover-head"},i?n.createElement("button",{type:"button",className:"calendar-filter-popover-title actionable",onClick:i},e):n.createElement("span",{className:"calendar-filter-popover-title"},e),t.length>0&&n.createElement("button",{type:"button",className:"calendar-filter-popover-all",onClick:N},l(S===t.length?"calendar.filter.deselectAll":"calendar.filter.selectAll"))),t.length===0?n.createElement("div",{className:"calendar-filter-empty"},o):n.createElement("div",{className:"calendar-filter-list"},t.map((b,w)=>{let P=!c.includes(b.id),_=I[w];return n.createElement("button",{key:b.id,type:"button",className:`calendar-filter-option${M(_,w)}`,"aria-pressed":P,onClick:()=>R(b.id)},n.createElement("span",{className:"calendar-filter-check","aria-hidden":"true"},P?"\u2713":""),b.icon?n.createElement("span",{className:"calendar-filter-option-glyph",style:b.color?{color:me(b.color)}:void 0},b.icon):n.createElement("span",{className:"calendar-legend-dot",style:{background:b.color?me(b.color):"var(--text-tertiary)"}}),n.createElement("span",{className:"calendar-filter-option-label"},b.label),b.count!==void 0&&n.createElement("span",{className:"calendar-filter-option-count"},b.count))})))}function pn({label:e,icon:t,options:a,hidden:r,settingsKey:o,emptyText:i,onOpenSettings:d,saveHidden:s}){let c=a.some(u=>r.includes(u.id));return n.createElement("button",{type:"button",className:`calendar-filter-btn${c?" active":""}`,"aria-label":e,"aria-haspopup":"dialog",title:e,onClick:u=>{let h=u.currentTarget;g.ui.openPopover(({close:p})=>n.createElement(wa,{label:e,options:a,hidden:r,settingsKey:o,emptyText:i,onOpenSettings:d?()=>{p(),d()}:void 0,saveHidden:s}),{anchor:h,align:"end"},{className:"calendar-filter-popover",ariaLabel:e})}},n.createElement("span",{className:"calendar-filter-icon"},t))}function Wi(){let e=un(),t=oa(e),a=n.useMemo(()=>e.filter(d=>!d.hidden),[e]),r=n.useMemo(()=>a.map(d=>({id:d.id,label:d.title||l("calendar.noteDatePreset.blank"),color:d.color,icon:n.createElement(Le,{id:d.icon||"pin"}),count:ln(t,d).dated})),[t,a]),o=n.useMemo(()=>a.filter(d=>!d.visible).map(d=>d.id),[a]),i=n.useCallback(async d=>{let s=new Set(d);try{return await cn(e.map(c=>c.hidden?c:{...c,visible:!s.has(c.id)})),!0}catch{return!1}},[e]);return{options:r,hidden:o,saveHidden:i}}function Yi({embedded:e=!1}){let t=Wi();return n.createElement(wa,{embedded:e,label:l("calendar.filter.noteDates"),options:t.options,hidden:t.hidden,saveHidden:t.saveHidden,emptyText:l("calendar.filter.noSources")})}function Xi(){let e=Wi();return n.createElement(pn,{label:l("calendar.filter.noteDates"),icon:n.createElement(di,null),options:e.options,hidden:e.hidden,saveHidden:e.saveHidden,emptyText:l("calendar.filter.noSources")})}function Ee(){return g.runtime.getOrCreate("calendar.surfaces",()=>({time:Je(),selected:new Map,navigation:new Map,listeners:new Set}))}function ia(){for(let e of Ee().listeners)e()}function Xe(e,t){e?Ee().selected.set(t,e):Ee().selected.delete(t),ia()}function mn(e,t,a){n.useEffect(()=>{Ee().time=t,a&&Ee().navigation.set(e,a),ia()},[e,t,a])}function Kl(e){return{...dr(Ee().time),itemId:e.id,kind:e.kind,date:e.date,sourceId:e.sourceId??"",filePath:e.filePath??""}}async function gr(e){if(typeof e.itemId!="string")return null;if(e.kind==="event"||e.kind==="sourced")return He({id:e.itemId,sourceId:e.kind==="sourced"&&typeof e.sourceId=="string"?e.sourceId:void 0});if(e.kind==="noteDate"&&typeof e.filePath=="string"&&await g.documents.resolve(e.filePath))return{kind:"noteDate",id:e.itemId,title:e.filePath.split("/").pop()??e.filePath,date:String(e.date??""),filePath:e.filePath,readOnly:!0};throw new Error("The bookmarked calendar item is unavailable.")}function Gl(e){let t=Ee().selected.get(e);return{title:l("manifest.name"),view:dr(Ee().time),navigation:Ee().navigation.get(e),...t?{item:{id:Ue(t),title:t.title,state:Kl(t)}}:{}}}function hr(e){let t=Ee().listeners;return t.add(e),()=>{t.delete(e)}}function Zi(e){let t=e?{...Je(),...ba(e)}:Ee().time,a=Ut(ge(t.selectedDate??J(new Date)),ua[g.getState().weekStart]??1);return Object.entries({plugin:"calendar",view:t.view,selectedDate:t.selectedDate,month:t.cursor.slice(0,7),week:{number:St(a),start:J(a),end:We(J(a),6)},year:Number(t.cursor.slice(0,4)),...t.rangeStart&&t.rangeEnd?{range:[t.rangeStart,t.rangeEnd].sort()}:{},...t.selectedTime?{selectedTime:t.selectedTime}:{}}).map(([r,o])=>({id:r,label:l(`calendar.overview.${r}`),value:o,readOnly:!0}))}async function Qi(){let e=ve(),[t,a]=await Promise.all([Be(g).listAccounts(),(async()=>{let o=[],i;do{let d=await g.data.dataset("calendar.calendars").query({limit:100,cursor:i});o.push(...d.rows),i=d.cursor}while(i);return o})()]);if(!t.ok||!t.data)throw new Error(l("calendar.overview.unavailable"));let r=[{id:Dt,name:l("calendar.filter.events")},{id:At,name:l("calendar.filter.noteDates")},...ct().map(o=>({id:o.sourceKey,name:o.integration?.localized?.[g.ui.language()]?.name??o.integration?.name??o.owner}))].filter(o=>!e.hiddenSources.includes(o.id));return[{id:"sources",label:l("calendar.overview.sources"),value:r,readOnly:!0},{id:"calendars",label:l("calendar.overview.calendars"),value:a.map(o=>({id:String(o.id),name:String(o.name),accountId:o.accountId??null,provider:o.provider??null,timezone:o.timezone??null,readOnly:o.readOnly===!0})),readOnly:!0},{id:"accounts",label:l("calendar.overview.accounts"),value:t.data.accounts.filter(o=>o.capabilities.includes("calendar")).map(o=>({id:o.id,name:o.displayName||o.address,address:o.address,provider:o.provider,enabled:!e.disabledCalendarAccounts.includes(o.id)})),readOnly:!0}]}function jl(e){if(e.id==="plugin")return l("auto.adab5090ac6a");if(e.id==="view")return l(e.value==="week"?"auto.f82be68a7fb4":e.value==="year"?"auto.879e32326c52":"auto.082bc378cd60");if(e.id==="month"){let t=ge(`${e.value}-01`);return`${tt(t.getMonth(),g.ui.language())} ${t.getFullYear()}`}return e.id==="week"&&e.value&&typeof e.value=="object"&&!Array.isArray(e.value)?`${e.value.number} \xB7 ${e.value.start} \u2013 ${e.value.end}`:Array.isArray(e.value)?e.value.length?e.value.map((t,a)=>{if(!t||typeof t!="object"||Array.isArray(t))return n.createElement("div",{key:a},String(t));let r=[t.address!==t.name?t.address:null,t.provider,t.timezone,t.enabled===!1?l("calendar.overview.disabled"):null].filter(Boolean).join(" \xB7 ");return n.createElement("div",{key:String(t.id)},String(t.name),r?n.createElement("small",null,r):null)}):l("calendar.overview.none"):e.value===null?l("calendar.overview.none"):String(e.value)}function Ji({view:e,sources:t=!1}){let[,a]=n.useReducer(u=>u+1,0),[r,o]=n.useState([]),[i,d]=n.useState(!1),s=_e(),c=Xt();return n.useEffect(()=>{if(!t)return hr(a);let u=0,h=()=>{let m=++u;a(),Qi().then(y=>{m===u&&(o(y),d(!1))}).catch(()=>{m===u&&d(!0)})},p=[hr(a),It("vault",h),g.settings.subscribe(h),g.data.dataset("calendar.calendars").subscribe(h),g.interop.services.subscribe(vt,h)];return h(),()=>{u++,p.forEach(m=>m())}},[t]),n.createElement("div",{className:"right-panel-body props-info"},t&&n.createElement(wa,{embedded:!0,label:l("calendar.filter.sources"),options:[{id:Dt,label:l("calendar.filter.events")},{id:At,label:l("calendar.filter.noteDates")},...c.map(u=>({id:u.sourceKey,label:u.integration?.localized?.[g.ui.language()]?.name??u.integration?.name??u.owner}))],hidden:s.hiddenSources,settingsKey:Yt,emptyText:l("calendar.overview.none")}),n.createElement("dl",{className:"props-info-table"},(t?r.filter(u=>u.id!=="sources"):Zi(e)).map(u=>n.createElement("div",{className:"props-info-row",key:u.id},n.createElement("dt",{className:"props-info-key"},u.label),n.createElement("dd",{className:"props-info-value"},jl(u))))),i&&n.createElement("p",{role:"alert"},l("calendar.overview.unavailable")))}function Vl(){let e=_e();return n.createElement("div",{className:"right-panel-body props-info"},n.createElement(wa,{embedded:!0,label:l("calendar.filter.groups"),options:e.groups.map(t=>({id:t.id,label:t.name,color:t.color})),hidden:e.hiddenGroups,settingsKey:Ua,emptyText:l("calendar.overview.none"),onOpenSettings:()=>g.workspace.openSettings("groups")}))}function Ul({item:e,view:t}){let[a,r]=n.useState(null),[o,i]=n.useState("");return n.useEffect(()=>{let d=!1,s=()=>{if(!e){r(null),i("");return}gr(e).then(u=>{d||(r(u),i(""))}).catch(u=>{d||(r(null),i(u instanceof Error?u.message:String(u)))})};s();let c=at(s);return()=>{d=!0,c()}},[e]),o?n.createElement("div",{className:"right-panel-body",role:"alert"},o):e?a?n.createElement("div",{className:"right-panel-body props-info"},n.createElement("dl",{className:"props-info-table"},["title","date","endDate","startTime","endTime","group","note","filePath"].filter(d=>a[d]).map(d=>n.createElement("div",{className:"props-info-row",key:d},n.createElement("dt",{className:"props-info-key"},l(`calendar.field.${d}`)),n.createElement("dd",{className:"props-info-value"},a[d]))))):n.createElement("div",{className:"right-panel-body"},l("calendar.overview.loading")):n.createElement(Ji,{view:t})}function es(e){let t=!1;e.workspace.getTimeControl().then(s=>{t||(Ee().time=s,ia())});let a=e.workspace.onTimeControlChanged(s=>{Ee().time=s,ia()}),o=["main_workspace","left_sidebar","right_sidebar"].map(s=>e.interop.extensions.provide(Dn,{id:`calendar.${s}`,surface:s,getSnapshot:()=>Gl(s),subscribe:hr,restore:async c=>{let u=ba(c);if(!u)throw new Error("Unsupported Calendar bookmark.");let h=await gr(c);e.workspace.patchTimeControl(u),Xe(h,s)}}));o.push(e.interop.extensions.provide(Kt,{id:"calendar.properties",label:"Calendar",labelKey:"manifest.name",icon:"calendar",pluginSurfaces:["main_workspace"],inspect:async({subject:s})=>{let c=s?.item?await gr(s.item.state):null,u=c?.kind==="event"?["title","date","endDate","startTime","endTime","groupId","note","filePath","tags","urls","attachments","location"]:["title","date","startTime","endTime","group","note","filePath","priority","completed","tags","urls","attachments","location"];return c?u.map(h=>({id:h,label:l(`calendar.field.${h}`),value:c[h]??null,readOnly:!0})):Zi(s?.view)},render:({subject:s})=>n.createElement(Ul,{item:s?.item?.state,view:s?.view})})),o.push(e.interop.extensions.provide(Kt,{id:"calendar.groups",label:"Groups",labelKey:"calendar.filter.groups",icon:"group",pluginSurfaces:["main_workspace"],inspect:()=>{let s=ve();return s.groups.map(c=>({id:c.id,label:c.name,value:!s.hiddenGroups.includes(c.id),type:"boolean"}))},render:()=>n.createElement(Vl,null)})),o.push(e.interop.extensions.provide(Kt,{id:"calendar.sources",label:"Sources",labelKey:"calendar.filter.sources",icon:"layers",pluginSurfaces:["main_workspace"],inspect:Qi,render:()=>n.createElement(Ji,{sources:!0})})),o.push(e.interop.extensions.provide(Kt,{id:"calendar.noteDates",label:"Note dates",labelKey:"calendar.filter.noteDates",icon:"push-pin",pluginSurfaces:["main_workspace"],inspect:async()=>(await va()).filter(s=>!s.hidden).map(s=>({id:s.id,label:s.title||l("calendar.noteDatePreset.blank"),value:s.visible,type:"boolean"})),render:()=>n.createElement("div",{className:"right-panel-body"},n.createElement(Yi,{embedded:!0}))}));let i=0,d=()=>{let s=++i;for(let[c,u]of Ee().selected)u.kind!=="noteDate"&&He({id:u.id,sourceId:u.sourceId}).then(h=>{t||s!==i||Ee().selected.get(c)?.id!==u.id||(Ee().selected.set(c,h),ia())}).catch(()=>{t||ia()})};return o.push(at(d)),()=>{t=!0,a(),o.forEach(s=>s())}}function yr(e,t){let[a,r]=n.useState([]),{items:o,errors:i,reload:d}=Ko(e,t),s=Tt(),c=n.useSyncExternalStore(s.subscribe,s.getEvents),u=n.useRef(null),h=n.useCallback(()=>{d(),u.current?.reload()},[d]);n.useEffect(()=>{let m=Ht(()=>Me(e,t),r,S=>console.error("[calendar] events reload failed",S));u.current=m,m.reload();let y=at(()=>{m.reload()});return()=>{m.dispose(),u.current===m&&(u.current=null),y()}},[t,h,e]);let p=n.useMemo(()=>[...a,...c],[a,c]);return{sourced:o,events:p,sourceErrors:i,reload:h}}var ts={high:De("red"),medium:De("amber"),low:De("green"),normal:De("gray")},as={active:De("primary-blue"),paused:De("amber"),suspended:De("violet"),completed:De("green"),open:De("gray")},Hl=De("gray");function ns(e){return e.priority&&ts[e.priority]?ts[e.priority]:e.status&&as[e.status]?as[e.status]:Hl}function ql(e,t){if(e.color)return e.color;if(e.groupId){let a=t.find(r=>r.id===e.groupId);if(a)return a.color}return ns({priority:e.priority,status:e.status})}function Bl(e,t,a){return e.endDate?Yo(e.date<t?t:e.date,e.endDate>a?a:e.endDate).map(r=>({...e,date:r,occurrenceKey:`${e.id}@${r}`})):[e]}function rs(e){return e.filePath?[e.filePath,e.date,e.endDate??e.date,e.startTime??"",e.endTime??""].join("\0"):null}function Wl(e){let t=new Set(e.filter(a=>a.kind==="sourced").map(rs).filter(a=>a!==null));return e.filter(a=>{if(a.kind!=="event"||a.event?.source||a.event?.endDate)return!0;let r=rs(a);return r===null||!t.has(r)})}function fn(e={}){let{focusYear:t}=e,a=_o(),{groups:r,hiddenGroups:o,hiddenSources:i}=_e(),d=Xt(),s=un(),c=oa(s),u=n.useMemo(()=>Ri(new Date(a,0,1),t),[a,t]),{sourced:h,events:p,sourceErrors:m}=yr(`${u[0]}-01-01`,`${u.at(-1)}-12-31`),y=n.useMemo(()=>qi(c,s,u,t??a),[a,t,c,s,u]),S=n.useMemo(()=>[...h.map(ea),...p.map(Ye),...y.map(ki)],[h,p,y]),I=n.useMemo(()=>{let b=[];for(let w of S)b.push(...w.kind==="event"||w.kind==="sourced"?Bl(w,`${u[0]}-01-01`,`${u.at(-1)}-12-31`):[w]);return Wl(Bi(b,r,o,i))},[S,r,o,i,u]),M=n.useMemo(()=>{let b=[{id:Dt,label:l("calendar.filter.events"),count:p.length},{id:At,label:l("calendar.filter.noteDates"),count:y.length}],w=new Set;for(let P of d){if(w.has(P.sourceKey))continue;w.add(P.sourceKey);let _=P.integration?.localized?.[g.ui.language()];b.push({id:P.sourceKey,label:_?.name??P.integration?.name??P.owner,count:h.filter(k=>k.sourceOwner===P.owner).length})}return b},[p.length,y.length,d,h]),L=n.useMemo(()=>{let b=Object.fromEntries(r.map(w=>[w.id,0]));for(let w of S){let P=w.groupId?r.find(_=>_.id===w.groupId):Po(r,w.group);P&&(b[P.id]=(b[P.id]??0)+1)}return b},[S,r]),R=n.useCallback(b=>ql(b,r),[r]),N=n.useMemo(()=>{let b=new Map;for(let w of I){let P=b.get(w.date)??[];P.push(w),b.set(w.date,P)}for(let w of b.values())w.sort((P,_)=>(P.startTime??"99:99").localeCompare(_.startTime??"99:99"));return b},[I]);return{sourced:h,events:p,sourceErrors:m,items:I,itemsByDay:N,noteDates:y,sourceOptions:M,groupCounts:L,colorFor:R}}var Yl=["normal","low","medium","high"],Xl={normal:"calendar.priority.none",low:"calendar.priority.low",medium:"calendar.priority.medium",high:"calendar.priority.high"};function gn(e){let t=g.runtime.getOrCreate("calendar.eventDrafts",()=>new Map),a=t.get(e);return a||(a={fields:new Map,listeners:new Set},t.set(e,a)),a}function we(e,t,a){let r=gn(e),o=n.useRef(a);o.current=a;let i=n.useCallback(()=>{if(!r.fields.has(t)){let c=o.current;r.fields.set(t,typeof c=="function"?c():c)}return r.fields.get(t)},[r,t]),d=n.useSyncExternalStore(n.useCallback(c=>(r.listeners.add(c),()=>{r.listeners.delete(c)}),[r]),i,i),s=n.useCallback(c=>{r.fields.set(t,typeof c=="function"?c(i()):c);for(let u of r.listeners)u()},[r,t,i]);return[d,s]}function br({title:e,children:t}){return n.createElement("div",{className:"calendar-quickadd-section"},n.createElement("span",{className:"calendar-quickadd-section-label"},e),t)}function Ot({glyph:e,children:t}){return n.createElement("div",{className:"calendar-quickadd-row"},n.createElement("span",{className:"calendar-quickadd-row-glyph","aria-hidden":"true"},e),n.createElement("div",{className:"calendar-quickadd-row-body"},t))}function hn(e){let t=e.state.editItem,a=t?.kind==="sourced",r=a?t.sourceId??"":"",o=a?t.id:"",i=n.useRef(e.onClose);return i.current=e.onClose,n.useEffect(()=>{a&&Zt(r,o).then(()=>i.current())},[a,r,o]),a?null:n.createElement(Zl,{...e})}function Zl({state:e,groups:t,onClose:a,onAdded:r}){let o=e.editItem,i=o?`${o.sourceId??o.kind}:${o.id}`:`new:${e.kind??""}:${e.date}:${e.startTime??""}`,[d]=n.useState(()=>jo()),s=e.kind??d[0]?.id??"event",[c,u]=we(i,"kind",o?.kind==="sourced"?o.sourceId??s:o?.kind==="event"?"event":s),[h,p]=we(i,"title",o?.title??""),[m,y]=we(i,"date",o?.date??e.date),[S,I]=we(i,"endDate",o?.event?.endDate??""),[M,L]=we(i,"start",o?.startTime??e.startTime??""),[R,N]=we(i,"end",o?.endTime??e.endTime??""),[b,w]=we(i,"groupId",()=>{let A=o?.event?.groupId??o?.sourced?.group??"";return t.find(oe=>oe.id===A)?.id??t.find(oe=>oe.name===A)?.id??""}),[P,_]=we(i,"location",o?.event?.location??o?.sourced?.location),[k,q]=we(i,"note",o?.event?.note??o?.sourced?.note??""),[z,U]=we(i,"urls",o?.event?.urls??o?.sourced?.urls??[]),[B,ye]=we(i,"attachments",o?.event?.attachments??o?.sourced?.attachments??[]),[de,le]=n.useState(!1),[v,D]=n.useState(""),[F,j]=n.useState(!1),[E,W]=n.useState(""),[Z,re]=we(i,"priority",o?.sourced?.priority??"normal"),[ze,ee]=we(i,"tags",o?.sourced?.tags??o?.event?.tags??[]),[Fe,Te]=we(i,"filePath",o?.sourced?.filePath??o?.event?.filePath??""),[Ce,$e]=we(i,"busy",!1),[Ze,mt]=we(i,"error",""),Ne=A=>{let oe=Rn(A);oe&&!z.includes(oe)&&U([...z,oe]),W(""),j(!1)},x=!M&&!R,O=A=>{A?(L(""),N("")):(L(e.startTime??"09:00"),N(e.endTime??"10:00"))},[Q]=we(i,"expectedUpdatedAt",o?.event?.updatedAt),[$,C]=we(i,"documentRevision",void 0),ne=o?.kind==="event"&&!o.readOnly?{pluginId:"calendar",sourceId:"events",itemId:o.id}:void 0,te=async()=>{if(!Ce)try{ne&&await g.documents.drafts.clear(ne),gn(i).fields.clear(),a()}catch(A){mt(A instanceof Error?A.message:String(A))}},he=async()=>{let A=h.trim();if(!(!A||gn(i).fields.get("busy")||o?.readOnly)){$e(!0),mt("");try{let oe=new Date().toISOString(),Ke=m||e.date,wn=t.find(Qe=>Qe.id===b)?.name,xa={location:P,urls:z.length>0?z:void 0,attachments:B.length>0?B:void 0,filePath:Fe.trim()||void 0,note:k},st={...xa,groupId:b||void 0,tags:ze},ka={...xa,group:wn,tags:ze,priority:Z};if(o){if(o.kind==="event"&&o.event){if(!$)throw new Error(l("calendar.error.save"));let Qe=(await Me()).find(Sa=>Sa.id===o.id);if(!Qe)throw new Error(l("calendar.error.missing"));if(Qe.updatedAt!==Q)throw new Error(l("calendar.error.changed"));if(!await Ra(o.id,{...Qe,allDay:!M&&!R,title:A,date:Ke,endDate:S||void 0,startTime:M||void 0,endTime:R||void 0,...st,updatedAt:oe},Q,$))throw new Error(l("calendar.error.save"))}}else if(c==="event"){if(!await Co(Ka(A,Ke,{endDate:S||void 0,startTime:M||void 0,endTime:R||void 0,...st})))throw new Error(l("calendar.error.save"))}else if(!await Xa(c,Ke,{title:A,startTime:M||void 0,endTime:R||void 0,...ka,completed:!1}))throw new Error(l("calendar.error.save"));ne&&await g.documents.drafts.clear(ne),gn(i).fields.clear(),r(),a()}catch(oe){mt(oe instanceof Error?oe.message:String(oe))}finally{$e(!1)}}},fe=c==="event",Re=A=>A==="event"?l("auto.ad8919ace091"):g.ui.t(d.find(oe=>oe.id===A)?.labelKey??A),{SelectField:ft,DateField:Lt,TimeField:gt,Segmented:ot,Toggle:it}=g.ui.settings;return n.createElement(g.ui.Modal,{title:o?l("calendar.quickadd.editTitle",{kind:Re(c)}):l("auto.61cc55aa0453"),bodyClassName:"calendar-quickadd",onClose:()=>{te()},footer:n.createElement(n.Fragment,null,n.createElement("button",{className:"calendar-quickadd-cancel",type:"button",disabled:Ce,onClick:()=>{te()}},l("auto.77dfd2135f4d")),!o?.readOnly&&n.createElement("button",{className:"calendar-quickadd-save",type:"button",onClick:()=>{he()},disabled:!h.trim()||Ce||!!ne&&!$},o?l("auto.efc007a393f6"):l("auto.61cc55aa0453")))},!o&&n.createElement("div",{className:"calendar-quickadd-head"},n.createElement(ot,{value:c,onChange:u,ariaLabel:l("calendar.quickadd.kind"),options:[{value:"event",label:l("auto.ad8919ace091")},...d.map(A=>({value:A.id,label:g.ui.t(A.labelKey)}))]})),n.createElement("div",{className:"calendar-quickadd-body hidescrollbar"},n.createElement("fieldset",{disabled:!!o?.readOnly,style:{display:"contents"}},n.createElement("input",{"data-modal-initial-focus":"true","aria-label":l("auto.768e0c1c6957"),className:"calendar-quickadd-title",value:h,onChange:A=>p(A.target.value),onKeyDown:A=>{A.key==="Enter"&&he()},placeholder:fe?l("auto.0cd372226ee9"):l("auto.33a5a701e541")}),n.createElement(br,{title:l("calendar.quickadd.when")},n.createElement(Ot,{glyph:n.createElement(pt,null)},n.createElement("div",{className:"calendar-quickadd-dates"},n.createElement(Lt,{className:"calendar-quickadd-date",value:m,onChange:y,clearable:!1,ariaLabel:fe?l("calendar.quickadd.startDate"):l("calendar.quickadd.dueDate")}),fe&&n.createElement(n.Fragment,null,n.createElement("span",{className:"calendar-quickadd-dash","aria-hidden":"true"},"\u2192"),n.createElement(Lt,{className:"calendar-quickadd-date",value:S,onChange:I,min:m,placeholder:l("calendar.quickadd.endDate"),ariaLabel:l("calendar.quickadd.endDate")})))),n.createElement(Ot,{glyph:n.createElement(fa,null)},n.createElement("div",{className:"calendar-quickadd-times"},n.createElement(gt,{value:M,disabled:x,onChange:L,ariaLabel:l("auto.88d8206d586a")}),n.createElement("span",{"aria-hidden":"true"},"\u2013"),n.createElement(gt,{value:R,disabled:x,onChange:N,ariaLabel:l("auto.cd7800da7f4f")}),n.createElement("span",{className:"calendar-quickadd-allday"},l("calendar.quickadd.allDay"),n.createElement(it,{checked:x,onChange:O,label:l("calendar.quickadd.allDay")}))))),n.createElement(br,{title:l("calendar.quickadd.details")},t.length>0&&n.createElement(Ot,{glyph:n.createElement(ai,null)},n.createElement(ft,{className:"calendar-quickadd-select",value:b,onChange:w,ariaLabel:l("auto.dbed7864623f"),options:[{value:"",label:l("auto.f6b2246c64fa")},...t.map(A=>({value:A.id,label:A.name,color:A.color}))]})),n.createElement(Ot,{glyph:n.createElement(Jt,null)},n.createElement(wi,{value:P,onChange:_})),n.createElement(Ot,{glyph:n.createElement(Xn,null)},n.createElement(Qn,{value:Fe,onChange:Te})),n.createElement(Ot,{glyph:n.createElement(oi,null)},n.createElement(g.ui.TagInput,{value:ze,onChange:ee,readOnly:!!o?.readOnly})),!fe&&n.createElement(Ot,{glyph:n.createElement(ii,null)},n.createElement(ot,{value:Z,onChange:A=>re(A),ariaLabel:l("calendar.quickadd.priority"),options:Yl.map(A=>({value:A,label:l(Xl[A])}))}))),n.createElement(br,{title:l("calendar.attachments")},B.map(A=>n.createElement(hi,{key:A,relPath:A,onRemove:()=>ye(B.filter(oe=>oe!==A))})),z.map(A=>n.createElement("div",{className:"calendar-quickadd-url-row",key:A},n.createElement("button",{className:"calendar-quickadd-url",type:"button",onClick:oe=>{let Ke=Ma(A);Ke?g.workspace.openFile(Ke,void 0,{newTab:g.ui.hasModKey(oe)}):g.files.openExternalUrl(A)}},A),n.createElement("button",{className:"calendar-field-btn",type:"button",title:l("calendar.removeUrl"),"aria-label":l("calendar.removeUrlOf",{p0:A}),onClick:()=>U(z.filter(oe=>oe!==A))},n.createElement(nt,null)))),de?n.createElement(Qn,{value:v,placeholder:l("calendar.attachmentPlaceholder"),ariaLabel:l("calendar.attachmentPath"),onChange:A=>{D(A),A&&(B.includes(A)||ye([...B,A]),D(""),le(!1))}}):null,F?n.createElement("input",{className:"calendar-quickadd-input",value:E,autoFocus:!0,placeholder:l("calendar.urlPlaceholder"),"aria-label":l("calendar.url"),onChange:A=>W(A.target.value),onBlur:A=>Ne(A.target.value),onKeyDown:A=>{A.key==="Enter"&&(A.preventDefault(),Ne(A.currentTarget.value)),A.key==="Escape"&&(W(""),j(!1))}}):null,n.createElement("div",{className:"calendar-quickadd-adders"},!de&&n.createElement("button",{className:"calendar-quickadd-add",type:"button",onClick:()=>le(!0)},n.createElement(ut,null)," ",l("calendar.addAttachment")),!F&&n.createElement("button",{className:"calendar-quickadd-add",type:"button",onClick:()=>j(!0)},n.createElement(Pt,null)," ",l("calendar.addUrl"))),n.createElement(g.ui.NoteInput,{onRevisionChange:A=>C(oe=>!oe||A.expectedRevision<oe.expectedRevision?A:oe),className:"calendar-quickadd-note",value:k,onChange:q,context:{sourcePath:Fe||void 0,ref:ne},tags:ze,onTagsChange:ee,onSave:()=>{he()},onCancel:()=>{te()},placeholder:l("auto.1a29d1bf66f5"),minHeight:100,maxHeight:340,readOnly:!!o?.readOnly}))),Ze&&n.createElement("div",{role:"alert"},Ze)))}function Ql(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function Jl(e){let t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${r}`}function os(){let e=new Date,t=Jl(e),[a,r]=rn();mn("left_sidebar",a);let{items:o,sourceOptions:i,groupCounts:d,colorFor:s,sourceErrors:c}=fn(),{groups:u,hiddenGroups:h,hiddenSources:p}=_e(),m=n.useRef(null),y=kt(),S=n.useSyncExternalStore(n.useCallback(v=>y.subscribe(v),[y]),n.useCallback(()=>{let v=y.get();return v?.surface==="agenda"?v:null},[y]),n.useCallback(()=>{let v=y.get();return v?.surface==="agenda"?v:null},[y])),I=n.useRef(new Map),M=n.useRef(!1),L=n.useRef(null),[R,N]=n.useState(!0),[b,w]=n.useState(""),[P,_]=n.useState(null),k=n.useRef(null),q=n.useCallback(v=>{Xe(v,"left_sidebar"),k.current&&clearTimeout(k.current),k.current=setTimeout(()=>{k.current=null,L.current=v.date,xi(v)},220)},[]),z=n.useCallback(v=>{if(k.current&&(clearTimeout(k.current),k.current=null),Xe(v,"left_sidebar"),!v.readOnly){if(v.kind==="sourced"){Zt(v.sourceId??"",v.id);return}_({date:v.date,editItem:v})}},[]);n.useEffect(()=>()=>{k.current&&clearTimeout(k.current)},[]);let U=n.useMemo(()=>{let v=b.trim().toLowerCase();return v?o.filter(D=>[D.title,D.note,D.group,D.status,D.location?.name,...D.tags??[],...(D.fields??[]).flatMap(F=>[F.key,F.value])].some(F=>F?.toLowerCase().includes(v))):o},[o,b]),{days:B,byDay:ye}=n.useMemo(()=>{let v=new Map;for(let F of U){let j=v.get(F.date)??[];j.push(F),v.set(F.date,j)}for(let F of v.values())F.sort((j,E)=>(j.startTime??"99:99").localeCompare(E.startTime??"99:99"));return!b.trim()&&a.selectedDate&&!v.has(a.selectedDate)&&v.set(a.selectedDate,[]),{days:[...v.keys()].sort((F,j)=>j.localeCompare(F)),byDay:v}},[b,a.selectedDate,U]);n.useEffect(()=>{if(M.current||B.length===0)return;let v=B.includes(t)?t:[...B].reverse().find(F=>F>=t);if(!v){M.current=!0;return}let D=I.current.get(v);D&&typeof D.scrollIntoView=="function"&&(D.scrollIntoView({block:"start"}),M.current=!0)},[B,t]),n.useEffect(()=>{if(!a.selectedDate)return;if(L.current===a.selectedDate){L.current=null;return}let v=I.current.get(a.selectedDate);v&&typeof v.scrollIntoView=="function"&&v.scrollIntoView({behavior:"smooth",block:"start"})},[a.selectedDate]),n.useEffect(()=>{if(!S)return;let v=requestAnimationFrame(()=>{[...m.current?.querySelectorAll("[data-calendar-item-id]")??[]].find(j=>j.dataset.calendarItemId===S.itemId&&(j.dataset.calendarSourceId??"")===S.sourceId)?.scrollIntoView({behavior:"smooth",block:"center"})});return()=>cancelAnimationFrame(v)},[S]),n.useEffect(()=>{let v=m.current;if(!v)return;let D=()=>{let F=I.current.get(t);if(!F){N(!1);return}let j=v.getBoundingClientRect(),E=F.getBoundingClientRect();N(E.bottom>j.top&&E.top<j.bottom)};return v.addEventListener("scroll",D,{passive:!0}),D(),()=>v.removeEventListener("scroll",D)},[t,B]);function de(){let v=I.current.get(t);v&&v.scrollIntoView({behavior:"smooth",block:"start"})}let le=async(v,D)=>{D.preventDefault(),D.stopPropagation(),Xe(v,"left_sidebar");let F=await tn(v,{onEdit:()=>z(v)}),j=an(v),E=nn(v),W=[...F,...E],Z=W.length>0?[]:aa(v),re=[...W,...W.length>0&&(Z.length>0||j.length>0)?[{type:"separator"}]:[],...Z,...j];re.length!==0&&await g.ui.openMenu(re,{x:D.clientX,y:D.clientY})};return n.createElement("div",{className:"panel calendar-agenda-panel"},c.map(v=>n.createElement("div",{key:v.owner,className:"agenda-day-empty",role:"status"},v.message)),n.createElement("div",{className:"panel-header"},n.createElement("span",{className:"panel-title"},l("auto.891e9d6d47f1")),n.createElement("div",{className:"agenda-header-actions"},n.createElement(pn,{label:l("calendar.filter.sources"),icon:n.createElement(ei,null),options:i.map(v=>({...v,color:"palette:primary-blue"})),hidden:p,settingsKey:Yt,emptyText:l("calendar.filter.noSources")}),n.createElement(pn,{label:l("calendar.filter.groups"),icon:n.createElement(ti,null),options:u.map(v=>({id:v.id,label:v.name,color:v.color,count:d[v.id]??0})),hidden:h,settingsKey:Ua,emptyText:l("calendar.filter.noGroups"),onOpenSettings:()=>g.workspace.openSettings("groups")}),n.createElement(Xi,null),!R&&n.createElement("button",{className:"agenda-today-btn",onClick:de},l("auto.24345a14377f")),n.createElement("button",{className:"plugin-open-page",onClick:()=>g.workspace.openMainTab(),"aria-label":l("auto.9ee309dcedc9"),title:l("auto.9ee309dcedc9")}))),n.createElement("div",{className:"agenda-search search-field"},n.createElement(Jo,{className:"search-field-icon"}),n.createElement("input",{className:"search-field-input",value:b,onChange:v=>w(v.target.value),onKeyDown:v=>{v.key==="Escape"&&w("")},placeholder:l("calendar.agenda.searchPlaceholder"),"aria-label":l("calendar.agenda.searchLabel")}),b&&n.createElement("button",{className:"search-field-action",type:"button",onClick:()=>w(""),"aria-label":l("calendar.agenda.clearSearch")},n.createElement(nt,null))),n.createElement("div",{className:"panel-body agenda-body hidescrollbar",ref:m},B.length===0?n.createElement("div",{className:"tree-empty"},l("auto.418713defbf7")):B.map((v,D)=>{let F=ge(v),j=ye.get(v)??[],E=Ql(F,e),W=a.selectedDate===v,Z=F.getFullYear(),re=D>0?ge(B[D-1]).getFullYear():null;return n.createElement("div",{key:v,className:"agenda-section",ref:ee=>{ee?I.current.set(v,ee):I.current.delete(v)}},re!==null&&Z!==re&&n.createElement("div",{className:"agenda-year-sep"},Z),n.createElement("button",{type:"button",className:`agenda-day-header${E?" today":""}${W?" selected":""}`,onClick:()=>r({selectedDate:W?null:v,rangeStart:null,rangeEnd:null})},n.createElement("span",{className:"agenda-day-dow"},et(F.getDay(),g.ui.language())),n.createElement("span",{className:"agenda-day-num"},F.getDate()),n.createElement("span",{className:"agenda-day-month"},tt(F.getMonth(),g.ui.language()))),j.length===0?n.createElement("div",{className:"agenda-day-empty"},l("auto.f4e12416c6b8")):j.map(ee=>{let Fe=S?.itemId===ee.id&&S.sourceId===(ee.sourceId??"");return n.createElement(en,{key:`${ee.occurrenceKey??ee.id}:${Fe?S?.nonce:0}`,item:ee,sourceId:ee.sourceId??"",color:s(ee),revealNonce:Fe?S?.nonce:void 0,onClick:()=>q(ee),onDoubleClick:()=>z(ee),onContextMenu:Te=>{le(ee,Te)}})}))})),P&&n.createElement(hn,{key:`${P.editItem?.sourceId??P.editItem?.kind}:${P.editItem?.id}`,state:P,groups:u,onClose:()=>_(null),onAdded:()=>_(null)}))}var ec=60,tc=5,ac=.22;function nc(e){let t=[];return e.forEach((a,r)=>{if(!a.startTime)return;let o=Ae(a.startTime),i=a.endTime?Ae(a.endTime):o+ec;t.push({id:a.id,start:o,end:Math.max(i,o+tc),order:r})}),t.sort((a,r)=>a.start-r.start||r.end-a.end||a.order-r.order)}function rc(e,t){return e.start<t.end&&t.start<e.end}function oc(e,t,a,r){return!e.some(o=>o.id!==r.id&&t.get(o.id)===a&&rc(o,r))}function ic(e,t){let a=[],r=new Map;for(let d of e){let s=a.findIndex(c=>c<=d.start);s===-1&&(s=a.length),a[s]=d.end,r.set(d.id,s)}let o=a.length;if(o===1){for(let d of e)t.set(d.id,{left:0,width:1,z:1});return}let i=1/o;for(let d of e){let s=r.get(d.id)??0,c=1;for(;s+c<o&&oc(e,r,s+c,d);)c++;let u=s>0?ac*i:0;t.set(d.id,{left:s*i-u,width:c*i+u,z:s+1})}}function is(e){let t=new Map,a=[],r=-1,o=()=>{a.length>0&&ic(a,t),a=[],r=-1};for(let i of nc(e))a.length>0&&i.start>=r&&o(),a.push(i),r=Math.max(r,i.end);return o(),t}var ke=44,rt=15,vr=24;function sc(e,t,a){let r=Math.max(0,Math.min(t,vr-1)),o=Math.min(vr,Math.max(a,r+1));for(let i of e){if(!i.startTime)continue;let d=Ae(i.startTime),s=i.endTime?Ae(i.endTime):d;r=Math.min(r,Math.max(0,Math.floor(d/60))),o=Math.max(o,Math.min(vr,Math.ceil(s/60)))}return{startHour:r,endHour:o}}function ds({days:e,items:t,dayStartHour:a,dayEndHour:r,colorFor:o,selectedItemKey:i,onSelectItem:d,onEditItem:s,onCommit:c,onCreate:u,onContextMenu:h,onItemAction:p,compact:m,weekDays:y,selectedDay:S,selectedTime:I,itemsByDay:M,onPickDay:L,revealTarget:R}){let N=new Date,b=n.useRef(null),[w,P]=n.useState(0),[_,k]=n.useState(null),q=n.useRef(null);q.current=_;let z=n.useRef(!1),[U,B]=n.useState(()=>new Date);n.useEffect(()=>{let x=setInterval(()=>B(new Date),6e4);return()=>clearInterval(x)},[]);let ye=e.length;n.useEffect(()=>{let x=b.current,O=x?.ownerDocument.defaultView?.ResizeObserver??globalThis.ResizeObserver;if(!x||!O)return;let Q=new O(()=>{P(Math.max(0,(x.clientWidth-48)/ye))});return Q.observe(x),()=>Q.disconnect()},[ye]);let de=e.map(J),{startHour:le,endHour:v}=n.useMemo(()=>sc(t,a,r),[t,a,r]),D=le*60,F=v*60,j=Array.from({length:v-le},(x,O)=>le+O);n.useEffect(()=>{let x=b.current;if(!x||!I)return;let O=Math.max(0,(Ae(I)-D)/60*ke-ke);typeof x.scrollTo=="function"?x.scrollTo({top:O,behavior:"smooth"}):x.scrollTop=O},[I,D]);let E=t.filter(x=>x.startTime),W=e,Z=t.filter(x=>!x.startTime),re=n.useMemo(()=>{let x=new Map;for(let Q of t){if(!Q.startTime)continue;let $=x.get(Q.date)??[];$.push(Q),x.set(Q.date,$)}let O=new Map;for(let[Q,$]of x)for(let[C,ne]of is($))O.set(`${Q}:${C}`,ne);return O},[t]),ze=U.getHours()*60+U.getMinutes(),ee=e.findIndex(x=>je(x,U)),Fe=ee>=0&&ze>=D&&ze<=F,Te=(ze-D)/60*ke,Ce=(x,O,Q)=>{if(x.preventDefault(),x.stopPropagation(),O.readOnly)return;let $=de.indexOf(O.date);if($===-1)return;z.current=!1;let C=O.startTime?Ae(O.startTime):D,ne=O.endTime?Ae(O.endTime):C+60;k({id:O.id,mode:Q,startX:x.clientX,startY:x.clientY,origDateIndex:$,origStartMin:C,origEndMin:ne,dateIndex:$,startMin:C,endMin:ne}),x.target.setPointerCapture?.(x.pointerId)},$e=x=>{let O=q.current;if(!O)return;(Math.abs(x.clientX-O.startX)>3||Math.abs(x.clientY-O.startY)>3)&&(z.current=!0);let Q=x.clientY-O.startY,$=Math.round(Q/ke*60/rt)*rt;if(O.mode==="create"){let C=O.origStartMin+$,ne=Math.max(D,Math.min(O.origStartMin,C)),te=Math.min(F,Math.max(O.origStartMin,C));k({...O,startMin:ne,endMin:te>ne?te:ne+rt})}else if(O.mode==="move"){let C=x.clientX-O.startX,ne=w?Math.round(C/w):0,te=O.origEndMin-O.origStartMin,he=Math.max(0,Math.min(ye-1,O.origDateIndex+ne)),fe=Math.max(D,Math.min(F-te,O.origStartMin+$));k({...O,dateIndex:he,startMin:fe,endMin:fe+te})}else{let C=Math.max(O.origStartMin+rt,Math.min(F,O.origEndMin+$));k({...O,endMin:C})}},Ze=()=>{let x=q.current;if(!x)return;if(k(null),x.mode==="create"){let $=de[x.dateIndex];u($,Oe(x.startMin),Oe(x.endMin));return}let O=E.find($=>$.id===x.id);if(!O)return;(x.dateIndex!==x.origDateIndex||x.startMin!==x.origStartMin||x.endMin!==x.origEndMin)&&c(O,de[x.dateIndex],Oe(x.startMin),Oe(x.endMin))},mt=(x,O)=>{if(q.current)return;x.preventDefault();let Q=x.currentTarget.getBoundingClientRect(),$=x.clientY-Q.top,C=D+$/ke*60,ne=Math.round(C/rt)*rt,te=Math.max(D,Math.min(F-rt,ne));z.current=!1,k({id:"__create__",mode:"create",startX:x.clientX,startY:x.clientY,origDateIndex:O,origStartMin:te,origEndMin:te+60,dateIndex:O,startMin:te,endMin:te+60}),x.target.setPointerCapture?.(x.pointerId)},Ne=(x,O)=>{let Q=O.getBoundingClientRect(),$=x.clientY-Q.top,C=D+$/ke*60;return Oe(Math.round(C/rt)*rt)};return n.createElement("div",{className:"calendar-weekgrid",style:{"--week-cols":ye}},m&&y&&L?n.createElement("div",{className:"calendar-weekgrid-daypicker"},y.map(x=>{let O=S?je(x,S):!1,Q=je(x,N),$=(M?.get(J(x))?.length??0)>0;return n.createElement("button",{key:J(x),type:"button",className:`calendar-daypick${O?" selected":""}${Q?" today":""}`,onClick:()=>L(x)},n.createElement("span",{className:"calendar-daypick-dow"},et(x.getDay(),g.ui.language())),n.createElement("span",{className:"calendar-daypick-num"},x.getDate()),n.createElement("span",{className:`calendar-daypick-dot${$?" on":""}`}))})):n.createElement("div",{className:"calendar-weekgrid-head"},n.createElement("div",{className:"calendar-weekgrid-gutter calendar-weekgrid-headgutter"}),e.map(x=>{let O=S?je(x,S):!1;return n.createElement("button",{key:J(x),type:"button",className:`calendar-weekgrid-dayhead${je(x,N)?" today":""}${O?" selected":""}`,onClick:()=>L?.(x)},n.createElement("span",{className:"calendar-weekgrid-dow"},et(x.getDay(),g.ui.language())),n.createElement("span",{className:"calendar-weekgrid-dom"},x.getDate()))})),Z.length>0&&n.createElement("div",{className:`calendar-weekgrid-allday${m?" calendar-weekgrid-allday--compact":""}`},n.createElement("div",{className:"calendar-weekgrid-gutter"},l("auto.1ac1ff7616a6")),W.map(x=>{let O=J(x),Q=Z.filter($=>$.date===O);return n.createElement("div",{key:O,className:"calendar-weekgrid-alldaycol"},Q.map($=>{let C=ss($,R),ne=Ue($)===i;return n.createElement("button",{key:`${$.occurrenceKey??$.id}:${C?R?.nonce:0}`,className:`calendar-chip${$.borderColor?" outlined":""}${ne?" selected":""}${C?" calendar-reveal-target":""}`,"aria-pressed":ne,"data-calendar-source-id":$.sourceId,"data-calendar-item-id":$.id,style:{"--chip-color":me(o($)),...$.borderColor?{"--chip-border":me($.borderColor)}:{}},title:ta($),onClick:te=>{te.stopPropagation(),d($)},onDoubleClick:te=>{te.stopPropagation(),s($)},onContextMenu:te=>{te.preventDefault(),te.stopPropagation(),p?.($,te)}},$.icon&&n.createElement(Le,{id:$.icon,className:"calendar-chip-glyph"}),n.createElement("span",{className:"calendar-chip-title"},$.title),n.createElement(Mt,{badges:$.badges}))}))})),n.createElement("div",{className:"calendar-weekgrid-body",ref:b,onPointerMove:$e,onPointerUp:Ze,onPointerCancel:Ze},n.createElement("div",{className:"calendar-weekgrid-gutter calendar-weekgrid-hours"},j.map(x=>n.createElement("div",{key:x,className:"calendar-weekgrid-hour",style:{height:ke}},String(x).padStart(2,"0"),":00"))),e.map((x,O)=>{let Q=J(x),$=E.filter(C=>C.date===Q);return n.createElement("div",{key:Q,className:"calendar-weekgrid-col",style:{height:j.length*ke},onPointerDown:C=>mt(C,O),onContextMenu:C=>{C.preventDefault(),C.stopPropagation(),h?.(C,Q,Ne(C,C.currentTarget))}},j.map(C=>n.createElement("div",{key:C,className:"calendar-weekgrid-cell",style:{height:ke}})),$.map(C=>{let ne=ss(C,R),te=Ue(C)===i,he=_?.id===C.id,fe=he?_.startMin:Ae(C.startTime),Re=he?_.endMin:C.endTime?Ae(C.endTime):fe+60,ft=(fe-D)/60*ke,Lt=Math.max(18,(Re-fe)/60*ke),gt=_?.mode==="move"&&_.id===C.id&&_.dateIndex===O,ot=_?.mode==="move"&&_.id===C.id&&_.dateIndex!==O,it=he?void 0:re.get(`${Q}:${C.id}`);return n.createElement("div",{key:`${C.occurrenceKey??C.id}:${ne?R?.nonce:0}`,className:`calendar-weekgrid-block${C.borderColor?" outlined":""}${C.completed?" completed":""}${te?" selected":""}${he&&_.mode!=="move"||gt?" dragging":""}${ot?" drag-ghost":""}${ne?" calendar-reveal-target":""}`,"aria-selected":te,"data-calendar-source-id":C.sourceId,"data-calendar-item-id":C.id,style:{top:ot?C.startTime?(Ae(C.startTime)-D)/60*ke:0:ft,height:ot?Math.max(18,((C.endTime?Ae(C.endTime):(C.startTime?Ae(C.startTime):0)+60)-(C.startTime?Ae(C.startTime):0))/60*ke):Lt,"--chip-color":me(o(C)),...C.borderColor?{"--chip-border":me(C.borderColor)}:{},zIndex:he&&_.mode!=="move"||gt?9:te?7:it?.z,...it?{"--block-left":`${it.left*100}%`,"--block-width":`${it.width*100}%`}:{}},onPointerDown:A=>Ce(A,C,"move"),onClick:A=>{A.stopPropagation(),z.current||d(C)},onDoubleClick:A=>{A.stopPropagation(),z.current||s(C)},onContextMenu:A=>{A.preventDefault(),A.stopPropagation(),p?.(C,A)},title:`${ta(C)} \xB7 ${Oe(fe)}\u2013${Oe(Re)}`},n.createElement("span",{className:"calendar-weekgrid-block-time"},Oe(fe)),n.createElement("span",{className:"calendar-weekgrid-block-title"},C.icon&&n.createElement(Le,{id:C.icon,className:"calendar-chip-glyph"}),n.createElement("span",{className:"calendar-weekgrid-block-name"},C.title),n.createElement(Mt,{badges:C.badges})),!C.readOnly&&n.createElement("div",{className:"calendar-weekgrid-resize",onPointerDown:A=>Ce(A,C,"resize")}))}),_?.mode==="create"&&_.dateIndex===O&&n.createElement("div",{className:"calendar-weekgrid-block calendar-weekgrid-block--create",style:{top:(_.startMin-D)/60*ke,height:Math.max(18,(_.endMin-_.startMin)/60*ke),"--chip-color":"var(--accent-color)"}},n.createElement("span",{className:"calendar-weekgrid-block-time"},Oe(_.startMin)),n.createElement("span",{className:"calendar-weekgrid-block-title"},Oe(_.startMin),"\u2013",Oe(_.endMin))),_?.mode==="move"&&_.dateIndex===O&&_.id!=="__create__"&&(()=>{let C=E.find(fe=>fe.id===_.id);if(!C||de.indexOf(C.date)===O)return null;let ne=(_.startMin-D)/60*ke,te=_.endMin-_.startMin,he=Math.max(18,te/60*ke);return n.createElement("div",{className:"calendar-weekgrid-block calendar-weekgrid-block--ghost",style:{top:ne,height:he,"--chip-color":me(o(C))}},n.createElement("span",{className:"calendar-weekgrid-block-time"},Oe(_.startMin)),n.createElement("span",{className:"calendar-weekgrid-block-title"},C.title))})())}),Fe&&n.createElement("div",{className:"calendar-weekgrid-now",style:{top:Te}},n.createElement("span",{className:"calendar-weekgrid-now-time"},Oe(ze)),n.createElement("span",{className:"calendar-weekgrid-now-line"}),n.createElement("span",{className:"calendar-weekgrid-now-line calendar-weekgrid-now-line--today",style:{left:48+ee*w,width:w}}),n.createElement("span",{className:"calendar-weekgrid-now-dot",style:{left:48+ee*w}}))))}function ss(e,t){return!!t&&(e.sourceId??"")===t.sourceId&&e.id===t.itemId}function dc({items:e,colorFor:t,selectedItemKey:a,onSelectItem:r,onEditItem:o,onItemAction:i,revealTarget:d}){if(e.length===0)return null;let s=e.slice(0,3),c=e.length-s.length;return n.createElement("div",{className:"calendar-chips"},s.map(u=>{let h=yn(u,d),p=Ue(u)===a;return n.createElement("button",{key:`${u.occurrenceKey??u.id}:${h?d?.nonce:0}`,className:`calendar-chip${u.completed?" completed":""}${u.borderColor?" outlined":""}${p?" selected":""}${h?" calendar-reveal-target":""}`,"aria-pressed":p,"data-calendar-source-id":u.sourceId,"data-calendar-item-id":u.id,style:{"--chip-color":me(t(u)),...u.borderColor?{"--chip-border":me(u.borderColor)}:{}},title:ta(u),onClick:m=>{m.stopPropagation(),r(u)},onDoubleClick:m=>{m.stopPropagation(),o(u)},onContextMenu:m=>{m.preventDefault(),m.stopPropagation(),i(u,m)}},u.icon&&n.createElement(Le,{id:u.icon,className:"calendar-chip-glyph"}),u.startTime&&n.createElement("span",{className:"calendar-chip-time"},u.startTime),n.createElement("span",{className:"calendar-chip-title"},u.title),n.createElement(Mt,{badges:u.badges}))}),c>0&&n.createElement("span",{className:"calendar-chip-more"},"+",c))}function ls({year:e,month:t,today:a,selected:r,weekStart:o,compact:i,itemsByDay:d,colorFor:s,onPick:c,onPickWeek:u,selectedItemKey:h,onSelectItem:p,onEditItem:m,onItemAction:y,inRange:S,onRangeStart:I,onRangeOver:M,onRangeEnd:L,onContextMenu:R,revealTarget:N}){let b=Oa(e,t,o);return n.createElement("div",{className:"calendar-grid",onMouseUp:L},n.createElement("div",{className:"calendar-week-heading"},"W"),_a(o).map(w=>n.createElement("div",{className:"calendar-day-heading",key:w},et(w,g.ui.language()))),Array.from({length:6},(w,P)=>n.createElement(n.Fragment,{key:P},n.createElement("button",{type:"button",className:"calendar-week-number",onClick:()=>u(b[P*7]),title:l("auto.4869ac12717f")},St(b[P*7])),b.slice(P*7,P*7+7).map(_=>{let k=d.get(J(_))??[],q=k.some(z=>yn(z,N));return n.createElement(lc,{key:`${_.toISOString()}:${q?N?.nonce:0}`,date:_,outside:_.getMonth()!==t,today:a,selected:r,compact:i,items:k,colorFor:s,inRange:S(_),onPick:c,selectedItemKey:h,onSelectItem:p,onEditItem:m,onItemAction:y,onRangeStart:I,onRangeOver:M,onContextMenu:R,revealTarget:N})}))))}function cs({year:e,today:t,weekStart:a,onPickMonth:r,revealTarget:o}){let i=_a(a);return n.createElement("div",{className:"calendar-year"},Array.from({length:12},(d,s)=>{let c=Oa(e,s,a),u=tt(s,g.ui.language());return n.createElement("button",{className:"calendar-mini",key:s,onClick:()=>r(s)},n.createElement("div",{className:"calendar-mini-name"},u),n.createElement("div",{className:"calendar-mini-grid"},i.map(h=>n.createElement("div",{className:"calendar-mini-heading",key:h},et(h,g.ui.language(),"narrow"))),c.map(h=>{let p=h.getMonth()!==s,m=je(h,t),y=!p&&J(h)===o?.date;return n.createElement("div",{key:`${h.toISOString()}:${y?o?.nonce:0}`,className:`calendar-mini-day ${p?"outside":""} ${m?"today":""}${y?" calendar-reveal-target":""}`},h.getDate())})))}))}function lc({date:e,outside:t,today:a,selected:r,compact:o,items:i,colorFor:d,inRange:s,onPick:c,selectedItemKey:u,onSelectItem:h,onEditItem:p,onItemAction:m,onRangeStart:y,onRangeOver:S,onContextMenu:I,revealTarget:M}){let L=je(e,a),R=je(e,r),N=i.findIndex(w=>yn(w,M)),b=N>=0&&(o||N>=3);return n.createElement("div",{className:`calendar-day-cell ${t?"outside":""} ${L?"today":""} ${R?"selected":""} ${s?"in-range":""}${b?" calendar-reveal-target calendar-reveal-day":""}`,onMouseDown:()=>y(e),onMouseEnter:()=>S(e),onContextMenu:w=>I(w,e),onClick:w=>{w.target.closest(".calendar-chip")||c(e,w)}},n.createElement("div",{className:"calendar-day-cell-head"},n.createElement("span",{className:"calendar-day-num"},e.getDate())),!o&&n.createElement(dc,{items:i,colorFor:d,selectedItemKey:u,onSelectItem:h,onEditItem:p,onItemAction:m,revealTarget:M}),o&&i.length>0&&n.createElement("div",{className:"calendar-day-dots"},i.slice(0,4).map(w=>n.createElement("span",{key:w.occurrenceKey??w.id,className:`calendar-day-dot${yn(w,M)?" calendar-reveal-dot":""}`,style:{background:me(d(w))}}))))}function yn(e,t){return!!t&&(e.sourceId??"")===t.sourceId&&e.id===t.itemId}function _t(){return{acc:0,fired:!1,peak:0,lastAbsX:0,decayFrames:0,coasting:!1,reswipeAcc:0,reswipeLastAbsX:0}}function wr(e,t,a){if(Math.abs(t)<=Math.abs(a))return{gesture:e,step:0};let r=Math.abs(t);if(e.fired){if(e.reswipeAcc!==0&&Math.sign(e.reswipeAcc)===Math.sign(t)&&r>=e.reswipeLastAbsX+3){let m=e.reswipeAcc+t;return Math.abs(m)>=60?{gesture:{..._t(),fired:!0,peak:r,lastAbsX:r},step:m>0?1:-1}:{gesture:{..._t(),acc:m,peak:r,lastAbsX:r},step:0}}let d=Math.max(e.peak,r),s=r<e.lastAbsX?e.decayFrames+1:0,c=e.coasting||s>=3&&r<d*.5,u=c&&r>=e.lastAbsX+6;return{gesture:{...e,peak:d,lastAbsX:r,decayFrames:s,coasting:c,reswipeAcc:u?t:0,reswipeLastAbsX:u?r:0},step:0}}let i=(Math.sign(e.acc)===Math.sign(t)?e.acc:0)+t;return Math.abs(i)<60?{gesture:{...e,acc:i,peak:Math.max(e.peak,r),lastAbsX:r},step:0}:{gesture:{..._t(),fired:!0,peak:r,lastAbsX:r},step:i>0?1:-1}}var uc=20;function pc(e,t){return!!(e&&e.view===t.view&&e.cursor===t.cursor&&e.selectedDate===t.selectedDate&&e.rangeStart===t.rangeStart&&e.rangeEnd===t.rangeEnd)}function mc(e){if(e.rangeStart&&e.rangeEnd){let[t,a]=e.rangeStart<=e.rangeEnd?[e.rangeStart,e.rangeEnd]:[e.rangeEnd,e.rangeStart];return{selectedDate:e.selectedDate,rangeStart:t,rangeEnd:a}}return e.selectedDate?{selectedDate:e.selectedDate,rangeStart:null,rangeEnd:null}:null}function fc(){let e=kt(),t=n.useCallback(r=>e.subscribe(r),[e]),a=n.useCallback(()=>{let r=e.get();return r?.surface==="main"?r:null},[e]);return n.useSyncExternalStore(t,a,a)}function bn({variant:e="main",navigation:t}){let a=new Date,r=Oo("weekStart"),{groups:o,dayStartHour:i,dayEndHour:d,itemClickTarget:s}=_e(),c=ua[r]??1,[u,h]=rn(),p=fc(),m=n.useMemo(()=>Je(),[]),[y,S]=n.useState(u.view??m.view),[I,M]=n.useState(u.cursor??m.cursor),[L,R]=n.useState(()=>({entries:[{view:u.view??m.view,cursor:u.cursor??m.cursor,selectedDate:u.selectedDate??null,rangeStart:u.rangeStart??null,rangeEnd:u.rangeEnd??null}],index:0})),N=n.useCallback(f=>{R(T=>{if(pc(T.entries[T.index],f))return T;let be=[...T.entries.slice(0,T.index+1),f].slice(-uc);return{entries:be,index:be.length-1}})},[]),b=n.useCallback((f,T={})=>{let H={view:f.view??y,cursor:f.cursor??I,selectedDate:f.selectedDate===void 0?u.selectedDate??null:f.selectedDate,rangeStart:f.rangeStart===void 0?u.rangeStart??null:f.rangeStart,rangeEnd:f.rangeEnd===void 0?u.rangeEnd??null:f.rangeEnd};T.pushHistory!==!1&&N(H),f.view!==void 0&&S(f.view),f.cursor!==void 0&&M(f.cursor),Object.keys(f).length>0&&h(f)},[I,h,N,u.rangeEnd,u.rangeStart,u.selectedDate,y]),w=n.useCallback(f=>{let T=L.index+f;if(T<0||T>=L.entries.length)return;let H=L.entries[T];R({...L,index:T}),b(H,{pushHistory:!1})},[L,b]),P=e==="main"?"main_workspace":"right_sidebar";mn(P,u,n.useMemo(()=>({canGoBack:L.index>0,canGoForward:L.index<L.entries.length-1,goBack:()=>w(-1),goForward:()=>w(1)}),[w,L.entries.length,L.index])),n.useEffect(()=>{if(!(e!=="main"||!t))return t.setController({canGoBack:L.index>0,canGoForward:L.index<L.entries.length-1,goBack:()=>w(-1),goForward:()=>w(1)}),()=>t.setController(null)},[w,L.entries.length,L.index,t,e]),n.useEffect(()=>{S(u.view??m.view),M(u.cursor??m.cursor)},[m.cursor,m.view,u.view,u.cursor]),n.useEffect(()=>{if(e==="right")return()=>g.interop.state.publish(wt,null)},[e]),n.useEffect(()=>{e==="right"&&g.interop.state.publish(wt,mc({view:y,cursor:I,selectedDate:u.selectedDate,rangeStart:u.rangeStart,rangeEnd:u.rangeEnd}))},[I,u.rangeEnd,u.rangeStart,u.selectedDate,e,y]);let _=ge(I),k=u.selectedDate?ge(u.selectedDate):a,[q,z]=n.useState(!1),U=e!=="main"||q,[B,ye]=n.useState(1),de=n.useRef({..._t(),idleTimer:null}),[le,v]=n.useState(null),[D,F]=n.useState(null),j=n.useRef(null),E=n.useRef(0),{items:W,itemsByDay:Z,colorFor:re,sourceErrors:ze}=fn({focusYear:Number(I.slice(0,4))}),ee=n.useRef(null),Fe=n.useCallback(f=>{F(Ue(f)),Xe(f,P),ee.current&&clearTimeout(ee.current),ee.current=setTimeout(()=>{if(ee.current=null,s==="owner"&&f.kind==="sourced"&&f.sourceId){Go(f.sourceId,f.id).then(T=>{T||nr(f)});return}nr(f)},220)},[s,P]),Te=n.useCallback(f=>{if(ee.current&&(clearTimeout(ee.current),ee.current=null),F(Ue(f)),Xe(f,P),!f.readOnly){if(f.kind==="sourced"){Zt(f.sourceId??"",f.id);return}v({date:f.date,editItem:f})}},[P]),Ce=tr(),$e=n.useSyncExternalStore(n.useCallback(f=>Ce.subscribe(f),[Ce]),n.useCallback(()=>Ce.get(),[Ce]),n.useCallback(()=>Ce.get(),[Ce]));n.useEffect(()=>{e!=="main"||!$e||($e.item.readOnly?v({date:$e.item.date,editItem:$e.item}):Te($e.item),Ce.publish(null))},[Te,$e,Ce,e]),n.useEffect(()=>()=>{ee.current&&clearTimeout(ee.current)},[]),n.useEffect(()=>{let f=j.current,T=f?.ownerDocument.defaultView?.ResizeObserver??globalThis.ResizeObserver;if(!f||!T)return;let H=new T(be=>{let qe=be[0]?.contentRect.width??f.clientWidth;z(ht=>ht?qe<=380:qe<340)});return H.observe(f),()=>H.disconnect()},[]),n.useEffect(()=>()=>{de.current.idleTimer&&clearTimeout(de.current.idleTimer)},[]);let Ze=n.useCallback(async(f,T)=>{T.stopPropagation(),T.preventDefault(),F(Ue(f)),Xe(f,P),v(null);let H=++E.current,be={x:T.clientX,y:T.clientY},qe=await tn(f,{onEdit:()=>Te(f)});if(H!==E.current)return;let ht=f.kind==="event"?nn(f):f.kind==="sourced"&&qe.length===0?aa(f):[],yt=f.readOnly?[{label:l("auto.1cb00f4b1daf"),description:f.title,enabled:!1},...an(f),...qe.length>0||ht.length>0?[]:aa(f)]:[...f.kind==="sourced"&&qe.some(Ea=>Ea.id==="edit")?[]:[{label:l("auto.5301648dcf6b"),icon:n.createElement(Ja,null),onSelect:()=>Te(f)}],{label:l("auto.f6fdbe48dc54"),icon:n.createElement(Qa,null),danger:!0,onSelect:()=>g.ui.openMenu([{label:l("auto.7c1496f9a7dc",{p0:f.title}),enabled:!1},{label:l("auto.77dfd2135f4d")},{label:l("auto.ae8a5b196587"),danger:!0,onSelect:()=>mt(f)}],be)}],zt=[...qe,...ht],Ft=zt.length>0&&yt.length>0?[...zt,{type:"separator"},...yt]:[...zt,...yt];g.ui.openMenu(Ft,be)},[Te,P]),mt=async f=>{f.kind!=="noteDate"&&(f.kind==="event"?await Io(f.id):f.sourced&&f.sourceId&&await Ya(f.sourceId,f.sourced.id))},Ne=_.getFullYear(),x=_.getMonth(),O=f=>b({view:f}),Q=()=>{let f=new Date;b({selectedDate:J(f),rangeStart:null,rangeEnd:null,cursor:`${f.getFullYear()}-${String(f.getMonth()+1).padStart(2,"0")}-01`})},$=f=>b({view:"week",selectedDate:J(f),rangeStart:null,rangeEnd:null,cursor:`${f.getFullYear()}-${String(f.getMonth()+1).padStart(2,"0")}-01`}),C=f=>{if(ye(f),y==="year")b({cursor:`${Ne+f}-${String(x+1).padStart(2,"0")}-01`});else if(y==="week"){let T=Ut(k,c),H=new Date(T.getFullYear(),T.getMonth(),T.getDate()+f*7);b({selectedDate:J(H),rangeStart:null,rangeEnd:null,cursor:`${H.getFullYear()}-${String(H.getMonth()+1).padStart(2,"0")}-01`})}else{let T=new Date(Ne,x+f,1);b({cursor:`${T.getFullYear()}-${String(T.getMonth()+1).padStart(2,"0")}-01`})}},ne=()=>{de.current.idleTimer&&clearTimeout(de.current.idleTimer),de.current.idleTimer=setTimeout(()=>{Object.assign(de.current,_t()),de.current.idleTimer=null},80)},te=f=>{if(ne(),Math.abs(f.deltaX)<=Math.abs(f.deltaY))return;f.preventDefault();let T=wr(de.current,f.deltaX,f.deltaY);Object.assign(de.current,T.gesture),T.step!==0&&C(T.step)},he=n.useRef(null),fe=n.useRef(!1),Re=n.useRef(0),ft=n.useRef(I);ft.current=I,n.useEffect(()=>{let f=()=>{he.current=null,Re.current=0},T=j.current?.ownerDocument.defaultView;return T?.addEventListener("mouseup",f),()=>T?.removeEventListener("mouseup",f)},[]);let Lt=f=>{if(!he.current||y!=="month")return;let T=j.current?.querySelector(".calendar-grid");if(!T)return;let H=T.getBoundingClientRect(),be=f.clientY<H.top+44,qe=f.clientY>H.bottom-44;if(!be&&!qe){Re.current=0;return}let ht=Date.now();if(ht-Re.current<450)return;Re.current=ht;let yt=qe?1:-1;ye(yt);let zt=ge(ft.current),Ft=new Date(zt.getFullYear(),zt.getMonth()+yt,1),Ea=`${Ft.getFullYear()}-${String(Ft.getMonth()+1).padStart(2,"0")}-01`,ks=yt===1?Ea:J(new Date(Ft.getFullYear(),Ft.getMonth()+1,0));fe.current=!0,b({cursor:Ea,rangeStart:he.current.anchor,rangeEnd:ks})},gt=(f,T)=>{if(fe.current){fe.current=!1;return}F(null),Xe(null,P);let H=J(f);if(T?.shiftKey&&u.selectedDate){b({rangeStart:u.selectedDate,rangeEnd:H});return}b({selectedDate:u.selectedDate===H?null:H,rangeStart:null,rangeEnd:null,cursor:`${f.getFullYear()}-${String(f.getMonth()+1).padStart(2,"0")}-01`})},ot=f=>{he.current={anchor:J(f)},fe.current=!1},it=f=>{let T=he.current;if(!T)return;let H=ge(ft.current);if(f.getFullYear()!==H.getFullYear()||f.getMonth()!==H.getMonth())return;let be=J(f);be!==T.anchor&&(fe.current=!0,b({rangeStart:T.anchor,rangeEnd:be}))},A=()=>{he.current=null,Re.current=0},oe=f=>{if(!u.rangeStart||!u.rangeEnd)return!1;let T=J(f);return _i(u.rangeStart,u.rangeEnd).includes(T)},Ke=(f,T,H,be)=>{v({date:J(f),startTime:T,endTime:H,kind:be})},wn=(f,T)=>{if(f.preventDefault(),f.stopPropagation(),le)return;let H=J(T);g.ui.openMenu([{label:l("auto.ec42f1f55523"),icon:n.createElement(ut,null),onSelect:()=>Ke(T,void 0,void 0,"todo")},{label:l("auto.7f8a6fad8b7c"),icon:n.createElement(pt,null),onSelect:()=>Ke(T,void 0,void 0,"event")},{type:"separator"},{label:l("auto.22819a02167d"),icon:n.createElement(fa,null),onSelect:Q},{label:l("auto.4869ac12717f"),icon:n.createElement(Nt,null),onSelect:()=>$(ge(H))}],{x:f.clientX,y:f.clientY})},xa=(f,T,H)=>{le||(f.preventDefault(),f.stopPropagation(),g.ui.openMenu([{label:l("auto.ec42f1f55523"),icon:n.createElement(ut,null),onSelect:()=>Ke(ge(T),H,void 0,"todo")},{label:l("auto.7f8a6fad8b7c"),icon:n.createElement(pt,null),onSelect:()=>Ke(ge(T),H,void 0,"event")},{type:"separator"},{label:l("auto.22819a02167d"),icon:n.createElement(fa,null),onSelect:Q},{label:l("auto.4869ac12717f"),icon:n.createElement(Nt,null),onSelect:()=>$(ge(T))}],{x:f.clientX,y:f.clientY}))},st=Ut(k,c),ka=Array.from({length:7},(f,T)=>{let H=new Date(st);return H.setDate(st.getDate()+T),H}),Qe=y==="year"?`y-${Ne}`:y==="week"?`w-${J(st)}`:`m-${Ne}-${x}`,kr=y==="year"?n.createElement("h2",null,n.createElement("span",null,Ne)):y==="week"?n.createElement("h2",null,"W",St(st)," ",n.createElement("span",null,st.getFullYear())):n.createElement("h2",null,tt(x,g.ui.language())," ",n.createElement("span",null,Ne)),Sa=u.selectedDate?W.filter(f=>f.date.slice(0,10)===u.selectedDate).sort((f,T)=>(f.startTime??"99:99").localeCompare(T.startTime??"99:99")):[],Sr=U&&y==="week"?[k]:ka,vs=f=>b({selectedDate:J(f),rangeStart:null,rangeEnd:null,cursor:`${f.getFullYear()}-${String(f.getMonth()+1).padStart(2,"0")}-01`}),ws=["week","month","year"].map(f=>n.createElement("button",{key:f,role:"tab","aria-selected":y===f,className:`calendar-switcher-btn ${y===f?"active":""}`,onClick:()=>O(f)},f==="month"?l("auto.082bc378cd60"):f==="week"?l("auto.f82be68a7fb4"):l("auto.879e32326c52"))),xs=n.createElement("div",{className:"calendar-actions"},n.createElement("button",{"aria-label":l("auto.50f94286ba30"),onClick:()=>C(-1)},"\u2039"),n.createElement("button",{"aria-label":l("auto.24345a14377f"),onClick:Q},l("auto.7a46866bc719")),n.createElement("button",{"aria-label":l("auto.bc981983e7f5"),onClick:()=>C(1)},"\u203A"));return n.createElement("div",{ref:j,className:`calendar-view ${e==="main"?"calendar-view-main":"calendar-view-sidebar"}${U?" calendar-view-compact":""}`},n.createElement("div",{className:"calendar-topbar"},n.createElement("div",{className:"calendar-topbar-leading"},kr),n.createElement("div",{className:"calendar-topbar-actions"},n.createElement("div",{className:"calendar-switcher calendar-switcher-inline",role:"tablist"},ws),xs)),ze.map(f=>n.createElement("div",{key:f.owner,className:"agenda-day-empty",role:"status"},f.message)),n.createElement("div",{className:"calendar-view-body"},n.createElement("div",{className:"calendar-scroll-area","data-view":y},n.createElement("div",{className:"calendar-stage",onWheel:te,onMouseMove:Lt,onMouseLeave:()=>{Re.current=0}},n.createElement("div",{className:"calendar-grid-wrap",key:Qe,"data-dir":B},y==="month"&&n.createElement(ls,{year:Ne,month:x,today:a,selected:k,weekStart:c,compact:U,itemsByDay:Z,colorFor:re,onPick:gt,onPickWeek:$,selectedItemKey:D,onSelectItem:Fe,onEditItem:Te,onItemAction:Ze,inRange:oe,onRangeStart:ot,onRangeOver:it,onRangeEnd:A,onContextMenu:wn,revealTarget:p}),y==="week"&&n.createElement(ds,{days:Sr,items:W.filter(f=>Sr.some(T=>J(T)===f.date)),dayStartHour:i,dayEndHour:d,colorFor:re,selectedItemKey:D,onSelectItem:Fe,onEditItem:Te,onCommit:(f,T,H,be)=>{Si(f,T,H,be)},onCreate:(f,T,H)=>v({date:f,startTime:T,endTime:H}),onContextMenu:xa,onItemAction:Ze,compact:U,weekDays:ka,selectedDay:k,selectedTime:u.selectedTime,itemsByDay:Z,onPickDay:vs,revealTarget:p}),y==="year"&&n.createElement(cs,{year:Ne,today:a,weekStart:c,revealTarget:p,onPickMonth:f=>b({view:"month",cursor:`${Ne}-${String(f+1).padStart(2,"0")}-01`})}))),U&&y==="month"&&u.selectedDate&&n.createElement("div",{className:"calendar-todos"},Sa.length===0?n.createElement("div",{className:"agenda-day-empty"},l("auto.d669db3f6b34")):Sa.map(f=>{let T=f.sourceId??f.kind,H=T===p?.sourceId&&f.id===p.itemId?p.nonce:void 0;return n.createElement(en,{key:`${T}:${f.id}:${f.occurrenceKey??f.date}:${H??0}`,item:f,sourceId:T,color:re(f),revealNonce:H,onClick:()=>Fe(f),onDoubleClick:()=>Te(f),onContextMenu:be=>{Ze(f,be)}})})))),le&&n.createElement(hn,{key:le.editItem?.id??`new:${le.kind??""}:${le.date}:${le.startTime??""}`,state:le,groups:o,onClose:()=>v(null),onAdded:()=>{}}))}function us(){return n.createElement(bn,{variant:"right"})}function ps({navigation:e}){return n.createElement(bn,{variant:"main",navigation:e})}var vn=e=>n.createElement(g.ui.settings.Button,e),gc=({onDelete:e,label:t})=>{let[a,r]=n.useState(!1),o=n.useRef(null),i=n.useCallback(()=>{o.current!==null&&window.clearTimeout(o.current),o.current=null,r(!1)},[]);return n.useEffect(()=>i,[i]),n.createElement(vn,{className:"notedate-source-toggle",variant:a?"danger":"ghost",size:"small",onClick:()=>{if(a){i(),e();return}r(!0),o.current!==null&&window.clearTimeout(o.current),o.current=window.setTimeout(()=>r(!1),3500)},onBlur:i,title:a?l("auto.d75a293ea22a"):l("auto.c845e23963ef",{p0:t})},n.createElement(Qa,null)," ",a?l("auto.04a212215ef9"):l("auto.f6fdbe48dc54"))},hc=({value:e,onCommit:t})=>{let[a,r]=n.useState(e.length?e:[""]),o=i=>i.map(d=>d.trim()).filter(Boolean);return n.createElement("div",{className:"notedate-source-show"},a.map((i,d)=>n.createElement("div",{className:"notedate-source-show-row",key:d},n.createElement("input",{className:"settings-path-input",value:i,"aria-label":l("auto.ef5ea5a743b3"),placeholder:"phone",onChange:s=>r(a.map((c,u)=>u===d?s.target.value:c)),onBlur:()=>t(o(a))}),n.createElement("button",{type:"button",className:"notedate-source-show-remove","aria-label":l("auto.4fda04775bdc"),onClick:()=>{let s=a.filter((c,u)=>u!==d);r(s.length?s:[""]),t(o(s))}},"\xD7"))),n.createElement(vn,{variant:"ghost",size:"small",className:"notedate-add-field",onClick:()=>r([...a,""])},n.createElement(ut,null)," ",l("calendar.noteDate.addField")))},ms=({variant:e,value:t,label:a,onChange:r})=>{let{ColorField:o}=g.ui.settings;return n.createElement("span",{className:"notedate-color-wrap"},n.createElement(o,{variant:e,unset:!t,value:t??De("primary-blue"),ariaLabel:a,onChange:r}),t&&n.createElement("button",{type:"button",className:"notedate-color-clear","aria-label":l("auto.f4a0d0857b02",{p0:a}),onClick:()=>r(void 0)},n.createElement(nt,null)))},yc=({icon:e,color:t,borderColor:a,onChange:r})=>{let[o,i]=n.useState(!1),d=n.useRef(null);return n.useEffect(()=>{if(!o)return;let s=u=>{d.current&&!d.current.contains(u.target)&&i(!1)},c=d.current?.ownerDocument;return c?.addEventListener("mousedown",s,!0),()=>c?.removeEventListener("mousedown",s,!0)},[o]),n.createElement("div",{className:"notedate-glyph-picker",ref:d},n.createElement("button",{type:"button",className:e?"notedate-source-swatch":"notedate-source-swatch unset",style:{...t?{"--swatch-fill":me(t),"--swatch-on":No(t)}:void 0,...a?{"--swatch-ring":me(a)}:void 0},"aria-label":l("auto.92bcda7f379e"),title:l("auto.7bf74c2d99d6"),onClick:()=>i(s=>!s)},e?n.createElement(Le,{id:e}):n.createElement("span",{className:"notedate-swatch-none"},"\u2014")),o&&n.createElement("div",{className:"notedate-glyph-grid"},n.createElement("button",{type:"button",className:e?"notedate-glyph-opt":"notedate-glyph-opt active","aria-label":l("auto.95553ba8a405"),title:l("auto.95553ba8a405"),onClick:()=>{r(void 0),i(!1)}},"\u2014"),gi().map(s=>n.createElement("button",{key:s.id,type:"button",className:s.id===e?"notedate-glyph-opt active":"notedate-glyph-opt","aria-label":s.label,title:s.label,onClick:()=>{r(s.id),i(!1)}},n.createElement(Le,{id:s.id})))))},bc=({source:e,entries:t})=>{let a=n.useMemo(()=>ln(t,e),[t,e.matchKey,e.matchValue,e.folder,e.dateField,e.dateFormat,e.match]);return ur(e)?a.matched===0?n.createElement("div",{className:"notedate-source-stats warn"},l("auto.257ff123e390",{p0:e.matchKey,p1:e.matchValue})):a.dated===0?n.createElement("div",{className:"notedate-source-stats warn"},l("auto.e6ffec68b5ae",{p0:a.matched,p1:e.dateField})):n.createElement("div",{className:"notedate-source-stats"},l("auto.d4ea5b59b68b",{p0:a.matched,p1:a.dated})):null},vc=({source:e,entries:t,onChange:a,onDelete:r})=>{let{VaultFolderField:o,SelectField:i,Toggle:d}=g.ui.settings,[s,c]=n.useState(!!e.folder),u=!e.dateFormat||Mn(e.dateFormat)!==null,h=(p,m,y=!1)=>n.createElement("div",{className:y?"notedate-source-field wide":"notedate-source-field"},n.createElement("label",null,p),m);return n.createElement("div",{className:"notedate-source-row"},n.createElement("div",{className:"notedate-source-head"},n.createElement(yc,{icon:e.icon,color:e.color,borderColor:e.borderColor,onChange:p=>a({icon:p})}),n.createElement("input",{className:"settings-path-input notedate-source-title",defaultValue:e.title,placeholder:l("auto.35b023ecbb81"),"aria-label":l("auto.475b6ce898d4"),title:l("auto.4da8c4eff514"),onBlur:p=>a({title:p.target.value.trim()})}),n.createElement("div",{className:"notedate-source-color"},n.createElement(ms,{variant:"fill",value:e.color,label:l("auto.9fa90b203761"),onChange:p=>a({color:p})}),n.createElement(ms,{variant:"ring",value:e.borderColor,label:l("auto.981f473aa731"),onChange:p=>a({borderColor:p})})),n.createElement("div",{className:"notedate-source-actions"},n.createElement(vn,{className:"notedate-source-toggle",variant:"ghost",size:"small",onClick:()=>a({hidden:!e.hidden}),title:e.hidden?l("auto.408a0d16a8ba"):l("auto.736a07e01797")},e.hidden?n.createElement(ni,null):n.createElement(ri,null)," ",e.hidden?l("auto.d97d1ee339e4"):l("auto.34d8b60fe253")),n.createElement(gc,{label:e.title||"source",onDelete:r}))),n.createElement(bc,{source:e,entries:t}),n.createElement("div",{className:"notedate-source-grid"},h(l("auto.b82220d034e7"),n.createElement("input",{className:"settings-path-input",defaultValue:e.matchKey,placeholder:"type","aria-label":l("auto.b82220d034e7"),onBlur:p=>a({matchKey:p.target.value.trim()})})),h(l("auto.2bc9464d49e9"),n.createElement("input",{className:"settings-path-input",defaultValue:e.matchValue,placeholder:"contact","aria-label":l("auto.a3fa4c4a4715"),onBlur:p=>a({matchValue:p.target.value.trim()})})),h(l("auto.691b674766e5"),n.createElement("input",{className:"settings-path-input",defaultValue:e.dateField,placeholder:"birthdate","aria-label":l("auto.691b674766e5"),title:l("auto.7bf039eeb194"),onBlur:p=>a({dateField:p.target.value.trim()||"date"})})),h(l("auto.94ee88690828"),n.createElement("input",{className:u?"settings-path-input":"settings-path-input invalid",defaultValue:e.dateFormat??"",placeholder:"dd-mm-yyyy","aria-label":l("auto.94ee88690828"),title:l("auto.8bbc96d44546"),onBlur:p=>a({dateFormat:p.target.value.trim()||void 0})})),h(l("auto.e10282ef1972"),n.createElement("div",{className:"notedate-source-inline"},n.createElement(i,{value:e.match,onChange:p=>a({match:p==="day-month"||p==="day"?p:"exact"}),options:[{value:"exact",label:l("auto.fd303c72a405")},{value:"day-month",label:l("auto.dd4b99ddaf61")},{value:"day",label:l("auto.b6f727f0c520")}],ariaLabel:l("auto.e10282ef1972")}),e.match==="day-month"&&n.createElement("label",{className:"notedate-source-inline-toggle",title:l("auto.5210c5c047ea")},n.createElement(d,{checked:e.showCount,onChange:p=>a({showCount:p}),label:l("auto.9ddab8990070")}),n.createElement("span",null,l("auto.9ddab8990070"))))),e.match!=="exact"&&h(l("auto.24bdcf2d51f8"),n.createElement("input",{type:"number",min:0,max:on,className:"settings-path-input notedate-source-limit",defaultValue:e.recurrenceLimitYears??"",placeholder:l("auto.48a7b8889e15"),"aria-label":l("auto.1389fda4dae3"),title:l("auto.6d07b3164ac0"),onBlur:p=>{let m=p.target.value.trim();if(!m){p.currentTarget.value="",a({recurrenceLimitYears:void 0});return}let y=Math.max(0,Math.min(on,Math.floor(Number(m))));p.currentTarget.value=String(y),a({recurrenceLimitYears:y})}})),h(l("auto.611f3791dc68"),n.createElement("input",{className:"settings-path-input",defaultValue:e.startTimeField??"",placeholder:l("auto.48a7b8889e15"),"aria-label":l("auto.611f3791dc68"),title:l("auto.519b42369442"),onBlur:p=>a({startTimeField:p.target.value.trim()||void 0})})),h(l("auto.aee875c4edbf"),n.createElement("input",{className:"settings-path-input",defaultValue:e.endTimeField??"",placeholder:l("auto.48a7b8889e15"),"aria-label":l("auto.aee875c4edbf"),onBlur:p=>a({endTimeField:p.target.value.trim()||void 0})})),h(l("auto.768e0c1c6957"),n.createElement("div",{className:"notedate-source-inline"},n.createElement(i,{value:e.labelMode,onChange:p=>a({labelMode:p==="property"?"property":"filename"}),options:[{value:"filename",label:l("auto.a3cbb98ddf5e")},{value:"property",label:l("auto.9ae33a7d0ecb")}],ariaLabel:l("auto.768e0c1c6957")}),e.labelMode==="property"&&n.createElement("input",{className:"settings-path-input",defaultValue:e.labelField??"",placeholder:"firstName","aria-label":l("auto.55f1c767a3b1"),onBlur:p=>a({labelField:p.target.value.trim()||void 0})})),!0),h(l("auto.d97d1ee339e4"),n.createElement(hc,{value:e.showFields,onCommit:p=>a({showFields:p})}),!0)),n.createElement("button",{type:"button",className:"notedate-source-advanced-toggle","aria-expanded":s,onClick:()=>c(p=>!p)},n.createElement("span",{className:"notedate-caret","data-open":s},"\u25B8")," ",l("auto.4d064726954a")),s&&n.createElement("div",{className:"notedate-source-grid"},h(l("auto.0623bfa38c8f"),n.createElement(o,{value:e.folder??"",onChange:p=>a({folder:p.trim()||void 0}),onCommit:p=>a({folder:p.trim()||void 0}),placeholder:l("auto.ad980036b394"),ariaLabel:l("auto.0623bfa38c8f")}),!0)))},fs=()=>{let{Row:e}=g.ui.settings,t=oa(),[a,r]=n.useState(null);if(n.useEffect(()=>{let s=!0;return va().then(c=>{s&&r(c)}),()=>{s=!1}},[]),!a)return n.createElement("div",{className:"notedate-settings"});let o=s=>{r(s),cn(s)},i=(s,c)=>o(a.map(u=>u.id===s?{...u,...c}:u)),d=s=>{g.ui.openMenu([...cr.map(c=>({id:c.id,label:l(c.labelKey)||c.label,icon:n.createElement(Le,{id:c.patch.icon}),onSelect:()=>o([...a,zi(c.id,a)])})),{type:"separator"},{id:"blank",label:l("calendar.noteDatePreset.blank"),onSelect:()=>o([...a,dn()])}],{anchor:s,align:"start"})};return n.createElement("div",{className:"notedate-settings"},n.createElement(e,{title:l("auto.958788fc103f"),description:"Each source puts a read-only calendar entry on every note whose frontmatter matches (e.g. type: contact), reading the date from the property you name \u2014 birthdays, deadlines, anniversaries. Match decides how much of the date has to line up: the exact date lands once, day + month comes round every year, day alone every month. Set a date format when the property is not written as 1990-05-04. Icon and colours are optional; an unset colour uses the normal calendar fallback."}),a.length===0&&n.createElement(e,{title:l("auto.1780c4a5f967"),description:l("auto.65c01f7ba330")}),a.map(s=>n.createElement(vc,{key:s.id,source:s,entries:t,onChange:c=>i(s.id,c),onDelete:()=>o(a.filter(c=>c.id!==s.id))})),n.createElement(vn,{variant:"secondary",className:"notedate-add-source","aria-haspopup":"menu",onClick:s=>d(s.currentTarget)},n.createElement(ut,null)," ",l("calendar.noteDate.addSource")))};function wc(){let e=_e(),[t,a]=n.useState({accounts:[],providers:[]}),[r,o]=n.useState(null),[i,d]=n.useState(!0),[s,c]=n.useState(null),[u,h]=n.useState(!1),p=Tt(),m=n.useSyncExternalStore(p.subscribe,p.getStatus),{Button:y,Row:S,Toggle:I,SelectField:M}=g.ui.settings,L=n.useCallback(async()=>{d(!0),c(null);try{let E=await Be(g).listCalendarConnections();if(!E.ok||!E.data)throw new Error(E.error||l("calendar.sync.accountsError"));a(E.data)}catch(E){c(E instanceof Error?E.message:l("calendar.sync.accountsError"))}finally{d(!1)}},[]);n.useEffect(()=>{L()},[L]);let R=async(E,W)=>{h(!0),c(null);try{let Z=await g.settings.set(E,W);if(!Z.ok)throw new Error(Z.error||l("calendar.sync.saveError"))}catch(Z){c(Z instanceof Error?Z.message:l("calendar.sync.saveError"))}finally{h(!1)}},N=(E,W,Z)=>{let re=ve().remoteCalendars;R("remoteCalendars",{...re,[E]:{...re[E],[W]:{...re[E]?.[W],...Z}}})},b=(E,W)=>{let Z=new Set(ve().disabledCalendarAccounts);W?Z.delete(E):Z.add(E),R("disabledCalendarAccounts",[...Z])},w=t.accounts.find(E=>E.id===r),P=t.providers.find(E=>E.id===(w?.oauthSetupId||w?.provider||r)),_=w?.displayName||w?.address||P?.label||P?.name||"",k=w?.capabilities.includes("calendar")&&(!w.secretState||w.secretState==="ok"),q=!!w&&!e.disabledCalendarAccounts.includes(w.id),z=w?m.accounts[w.id]:void 0,[U,B]=n.useState({}),[ye,de]=n.useState(!1);n.useEffect(()=>{if(!w||!k)return;let E=!1;return de(!0),Be(g).listCalendars(w.id).then(W=>{E||(W.ok&&W.data?B(Z=>({...Z,[w.id]:W.data.calendars})):c(W.error||l("calendar.sync.calendarsError")))}).catch(W=>{E||c(W instanceof Error?W.message:l("calendar.sync.calendarsError"))}).finally(()=>{E||de(!1)}),()=>{E=!0}},[w,k]);let le=w?m.calendars[w.id]??U[w.id]:void 0,v=()=>g.workspace.openSettings("accounts"),D=E=>E.secretState&&E.secretState!=="ok"?l("calendar.sync.reconnect"):E.capabilities.includes("calendar")?l(e.disabledCalendarAccounts.includes(E.id)?"calendar.overview.disabled":"calendar.sync.connected"):l("calendar.sync.permission"),F=(E,W,Z,re)=>n.createElement("button",{key:E,type:"button",className:"settings-list-row calendar-account-row",onClick:()=>{o(E),c(null)}},n.createElement("span",{className:"settings-list-glyph"},n.createElement(pt,null)),n.createElement("span",{className:"settings-list-meta"},n.createElement("span",{className:"settings-list-name"},W),Z&&n.createElement("span",{className:"settings-list-sub"},Z),n.createElement("span",{className:"settings-list-sub"},re)),n.createElement(Nt,null)),j=t.providers.filter(E=>!t.accounts.some(W=>(W.oauthSetupId||W.provider)===E.id));return n.createElement("div",{className:"calendar-sync-settings settings-listpage"},r&&(w||P)?n.createElement(n.Fragment,null,n.createElement("div",{className:"settings-listpage-crumbs"},n.createElement(y,{onClick:()=>{o(null),c(null)}},l("calendar.sync.back")),n.createElement("span",{className:"settings-crumb-current"},_)),n.createElement("div",{className:"calendar-account-identity"},n.createElement("span",{className:"settings-list-glyph"},n.createElement(pt,null)),n.createElement("span",{className:"settings-list-meta"},n.createElement("span",{className:"settings-list-name"},_),(w?.address||P?.email)&&n.createElement("span",{className:"settings-list-sub"},w?.address||P?.email)),n.createElement(y,{onClick:v},l("calendar.sync.manage"))),k?w&&n.createElement(n.Fragment,null,n.createElement(S,{title:l("calendar.sync.account"),description:l("calendar.sync.readOnly")},n.createElement(I,{checked:q,disabled:u,onChange:E=>b(w.id,E),label:l("calendar.sync.account")})),ye&&!le&&n.createElement("p",{role:"status"},l("calendar.sync.loadingCalendars")),le?.length===0&&n.createElement("p",{className:"settings-empty-text"},l("calendar.sync.noCalendars")),le?.map(E=>{let W=e.remoteCalendars[w.id]?.[E.id],Z=W?.enabled??E.primary;return n.createElement("div",{key:E.id,className:"calendar-sync-calendar"},n.createElement(S,{title:E.name,description:E.primary?l("calendar.sync.primary"):void 0},n.createElement(I,{checked:Z,disabled:u||!q,onChange:re=>N(w.id,E.id,{enabled:re}),label:l("calendar.sync.select",{name:E.name})})),Z&&n.createElement(S,{title:l("calendar.field.groupId")},n.createElement(M,{value:W?.groupId??"",disabled:u||!q,onChange:re=>N(w.id,E.id,{groupId:re}),options:[{value:"",label:l("calendar.sync.noGroup")},...e.groups.map(re=>({value:re.id,label:re.name,color:re.color}))],ariaLabel:l("calendar.sync.group",{name:E.name})})))}),z?.lastSyncAt&&n.createElement("p",{className:"settings-empty-text",role:"status"},l("calendar.sync.last",{time:new Date(z.lastSyncAt).toLocaleString(g.ui.language()),count:z.eventCount})),n.createElement(y,{disabled:m.syncing||u||!q,onClick:()=>{p.sync()}},l(m.syncing?"auto.221ca63005ea":"auto.2b7d938e6787"))):n.createElement("p",{className:"settings-empty-text"},w?D(w):l(P?.configured?"calendar.sync.saved":"calendar.sync.setup"))):n.createElement(n.Fragment,null,n.createElement("div",{className:"settings-listpage-header"},n.createElement("h4",{className:"settings-label"},l("calendar.overview.accounts")),n.createElement(y,{onClick:v},l("calendar.sync.manage"))),n.createElement("p",{className:"settings-empty-text"},l("calendar.sync.description")),i?n.createElement("p",{role:"status"},l("calendar.sync.loadingAccounts")):n.createElement("div",{className:"settings-list"},t.accounts.map(E=>F(E.id,E.displayName||E.address,E.displayName?E.address:void 0,D(E))),j.map(E=>F(E.id,E.label||E.name,E.email,l(E.configured?"calendar.sync.savedShort":"calendar.sync.setupShort"))),!t.accounts.length&&!j.length&&n.createElement("p",{className:"settings-empty-text"},l("auto.7eacb0e385b4"))),n.createElement("div",{className:"settings-row-actions"},n.createElement(y,{disabled:i||m.syncing,onClick:()=>{L(),p.sync()}},l("calendar.sync.refresh")))),(s||z?.error||m.error)&&n.createElement("p",{className:"settings-path-error",role:"alert"},s||z?.error||m.error))}function xc({dayStartHour:e,dayEndHour:t}){let{NumberField:a,Row:r}=g.ui.settings;return n.createElement(n.Fragment,null,n.createElement(r,{title:l("auto.46fbb53a9be2"),description:l("auto.f07b365f8502")},n.createElement(a,{min:0,max:23,value:e,onChange:()=>{},onCommit:o=>{o!=null&&g.settings.set("dayStartHour",o)},ariaLabel:l("auto.46fbb53a9be2")})),n.createElement(r,{title:l("calendar.dayEndHour"),description:l("calendar.dayEndHourDesc")},n.createElement(a,{min:1,max:24,value:t,onChange:()=>{},onCommit:o=>{o!=null&&g.settings.set("dayEndHour",o)},ariaLabel:l("calendar.dayEndHour")})),n.createElement("span",{className:"settings-empty-text"},l("auto.808d7dca8a74")," ",Un,":00\u2013",Hn,":00."," ",l("calendar.dayWindowGrows")))}function kc(){let{Button:e,Row:t,Section:a}=g.ui.settings;return n.createElement(a,{title:l("calendar.settings.groups")},n.createElement(t,{title:l("calendar.settings.groups"),description:l("calendar.settings.groupsDesc")},n.createElement(e,{onClick:()=>g.workspace.openSettings("groups")},l("calendar.settings.groups"))))}function Sc(){let{dayStartHour:e,dayEndHour:t,itemClickTarget:a}=_e(),{Row:r,Section:o,SelectField:i}=g.ui.settings;return n.createElement(n.Fragment,null,n.createElement(o,null,n.createElement(r,{title:l("calendar.settings.openItemsIn"),description:l("calendar.settings.openItemsInDesc")},n.createElement(i,{value:a,onChange:d=>{g.settings.set(Fo,d)},options:[{value:"owner",label:l("calendar.settings.openItemsOwner")},{value:"agenda",label:l("calendar.settings.openItemsAgenda")}],ariaLabel:l("calendar.settings.openItemsIn")})),n.createElement(xc,{dayStartHour:e,dayEndHour:t})),n.createElement(kc,null))}function Ec(){let{Section:e}=g.ui.settings;return n.createElement(e,null,n.createElement(wc,null))}function Cc(){let e=Xt(),{hiddenSources:t}=_e(),{PluginCard:a,Section:r}=g.ui.settings,o=new Set(t),i=(d,s)=>{let c=new Set(o);s?c.delete(d):c.add(d),g.settings.set(Yt,[...c])};return n.createElement(r,{className:"calendar-plugins-settings"},e.length===0?n.createElement("span",{className:"settings-empty-text"},l("calendar.plugins.empty")):n.createElement("div",{className:"settings-plugin-list"},e.map(d=>{let s=d.integration,c=s?.localized?.[g.ui.language()],u=c?.name??s?.name??d.owner,h=!o.has(d.sourceKey);return n.createElement(a,{key:d.sourceId,name:u,version:s?.version??d.version,versionLabel:l("calendar.plugins.version"),author:s?.author,authorLabel:l("calendar.plugins.by"),description:c?.description??s?.description,enabled:h,onChange:p=>i(d.sourceKey,p),toggleLabel:l(h?"calendar.plugins.disable":"calendar.plugins.enable",{p0:u}),onConfigure:d.methods.includes("configure")?()=>{Vo(d.sourceId)}:void 0,configureLabel:l("calendar.plugins.configure",{p0:u})})})))}function gs({section:e}){return e==="dates"?n.createElement(fs,null):e==="sync"?n.createElement(Ec,null):e==="plugins"?n.createElement(Cc,null):n.createElement(Sc,null)}var hs=(e,t=[])=>({type:"object",properties:e,required:t,additionalProperties:!1}),xr=e=>({type:"string",description:e});async function ys(e,t,a,r){let o=await e.commands.executeOwn(t,a,{...r,autonomous:!0});if(!o.ok)throw new Error(o.error.message);return o.value}function bs(e){return kn([{name:"list_events",description:"List Calendar events, optionally filtered by a day or month.",parameters:hs({on:xr("Optional YYYY-MM-DD day or YYYY-MM month")}),sideEffect:"read",commandId:"list",run:async(t,a)=>{let r=String(t.on??"").trim(),o=/^\d{4}-\d{2}-\d{2}$/.test(r)?{from:r,to:r}:/^\d{4}-\d{2}$/.test(r)?{from:`${r}-01`,to:`${r}-31`}:{from:"",to:""},i=await ys(e,"list",o,a);return i.length?i.slice(0,40).map(d=>`- ${d.date??""}: ${d.title??""}`).join(`
`):"No events."}},{name:"add_event",description:"Add an event to the Calendar plugin.",parameters:hs({title:xr("Event title"),date:xr("Date YYYY-MM-DD")},["title","date"]),sideEffect:"write",commandId:"add",run:async(t,a)=>{let r={title:String(t.title??""),date:String(t.date??"")},o=await ys(e,"add",r,a);return`Added event "${o.title||r.title}" on ${o.date||r.date}.`}}])}function Ic(e){lo(e);let t=Gr(e),a=Jr(),r=e.workspace.onOpenOwnLink(m=>{let y=ba(m);y&&e.workspace.patchTimeControl(y)});e.registerView("calendar.agenda",os),e.registerView("calendar.panel",us),e.registerView("calendar.page",ps),e.registerView("calendar.settings",gs);let o=Lo(),i=Ai(e),d=es(e),s=e.interop.services.provide(In,bs(e)),c=Oi(),u=kt(),h={id:"calendar",labelKey:"manifest.name",openDate:m=>Pa(m)},p=e.interop.services.provide(Sn,h);return e.interop.state.publish(wt,null),u.publish(null),async()=>{try{i(),d(),s(),c(),p(),o(),r(),a(),e.interop.state.publish(wt,null),u.publish(null)}finally{await t()}}}var Dc={register:Ic},dy=Dc;export{dy as default,Ic as register};
