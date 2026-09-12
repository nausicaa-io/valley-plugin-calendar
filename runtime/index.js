var aa="valley";var _s=`.${aa}`,zs=`app.${aa}`;function Vi(e){return e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(/^\.?\/+/,"").replace(/\/+$/,"")}var Hi=/^[a-zA-Z]:/;function mn(e){if(typeof e!="string")return"";let t=Vi(e);return!t||t==="."||Hi.test(t)||t.split("/").some(n=>n==="..")?"":t}function ga(e){if(typeof e=="string")return mn(e)||void 0}var Le=`.${aa}`,Ui="plugins",ha=`${Le}/${Ui}`,qi="external",Ks=`${ha}/${qi}`,Rs=`${ha}/data`;var Gs=`${ha}/plugin.json`,js=`${ha}/config.json`,nr=`${Le}/state`,Mt=`${Le}/settings`,ya=`${Le}/app`,ba=`${Le}/accounts`,Vs=`${ba}/providers`,Hs=`${ba}/providers.lock.json`,Us=`${Le}/trash`,fn=`${Le}/cache`,qs=`${fn}/accounts`,Bi=`${fn}/search`,Bs=`${fn}/providers`;var Ws=`${ya}/logs`,Ys=`${ya}/whats-new`,Xs=`${ya}/setup.json`,Zs=`${Bi}/index.jsonl`,Qs=`${nr}/journal`,Js=`${nr}/txjournal`;var fa="design";var ec={app:`${ya}/app.json`,appearance:`${Le}/${fa}/appearance.json`,pallette:`${Le}/${fa}/pallette.json`,group:`${Le}/${fa}/group.json`,metadata:`${Mt}/metadata.json`,notification:`${Mt}/notification.json`,preferences:`${Mt}/preferences.json`,markdown:`${Mt}/markdown.json`,files:`${Mt}/files.json`,search:`${Mt}/search.json`,design:`${Le}/${fa}/appearance.json`,accounts:`${ba}/accounts.json`},tc=`${ba}/secrets.json`;var rr=aa,or="open";var ir=["http:","https:","mailto:","obsidian:"];var rc=[Le,`${Le}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];var Yi=new Map;function pe(e,t,n,r,o,i,s,l,c="owner"){let u=Object.freeze({id:e,kind:t,version:n,cardinality:r,validate:o,identities:i,identityScope:c,serviceCalls:s,serviceMetadata:l});return Yi.set(`${t}:${e}@${n}`,u),u}var va="edit";function sr(e){let t=new Map(e.map(n=>[n.name,n]));return{tools:e.map(({run:n,...r})=>Object.freeze({...r})),execute:async(n,r,o)=>{let i=t.get(n);if(!i)throw new Error(`Unknown provider-owned agent tool: ${n}`);return i.run(r,o)}}}var $=e=>!!e&&typeof e=="object"&&!Array.isArray(e),le=(e,t)=>typeof e[t]=="function",gt=e=>e===void 0,Lt=e=>typeof e=="boolean",F=e=>typeof e=="string",Ae=e=>e===void 0||F(e),Xi=e=>e===void 0||typeof e=="number",Zi=e=>e===void 0||typeof e=="boolean",ee=(e,t)=>e.length===t.length&&t.every((n,r)=>n(e[r])),xe=e=>$(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),dr=e=>$(e),Qi=e=>$(e)&&F(e.id)&&F(e.title)&&F(e.date)&&(e.documentRef===void 0||$(e.documentRef)&&F(e.documentRef.pluginId)&&F(e.documentRef.sourceId)&&F(e.documentRef.itemId)),Ji=e=>$(e)&&F(e.date)&&Ae(e.startTime)&&Ae(e.endTime)&&Ae(e.sourceId)&&Ae(e.itemId),ed=e=>$(e)&&F(e.url)&&Ae(e.title)&&Zi(e.newTab),td=e=>$(e)&&F(e.query),cr=e=>$(e)&&F(e.name)&&Ae(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),ad=e=>Array.isArray(e)&&e.every(cr),nd=e=>e===null||cr(e),rd=e=>e===void 0||$(e)&&Ae(e.approvalToken)&&(e.cancellation===void 0||$(e.cancellation)),od=e=>typeof e=="string"||$(e)&&typeof e.text=="string",id=e=>$(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&$(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&Ae(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),ur=e=>$(e)&&F(e.id)&&F(e.label)&&Ae(e.labelKey)&&Ae(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(ur)),dd={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(Qi)},create:{args:e=>ee(e,[F,dr]),result:Lt},update:{args:e=>ee(e,[F,dr]),result:Lt},remove:{args:e=>ee(e,[F]),result:Lt},open:{args:e=>ee(e,[F]),result:gt},configure:{args:e=>e.length===0,result:gt},actions:{args:e=>ee(e,[F]),result:e=>Array.isArray(e)&&e.every(ur)},runAction:{args:e=>ee(e,[F,F]),result:Lt}},ld=e=>$(e)&&F(e.name)&&F(e.version)&&Ae(e.description)&&Ae(e.author)&&(e.localized===void 0||$(e.localized)&&Object.values(e.localized).every(t=>$(t)&&F(t.name)&&Ae(t.description))),Ot=pe("calendar.itemSource","service","1.3.0","many",e=>$(e)&&le(e,"list")&&(e.integration===void 0||ld(e.integration)),void 0,dd,e=>e.integration),pr=pe("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),mr=pe("calendar.navigator","service","1.0.0","one",e=>$(e)&&le(e,"openDate"),void 0,{openDate:{args:e=>ee(e,[Ji]),result:gt}}),_t=pe("calendar.panelSelection","state","1.0.0","one",e=>$(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),vc=pe("web.activeContext","state","1.0.0","one",e=>$(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function lr(e){return $(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(t=>$(t)&&typeof t.address=="string"&&(t.label===void 0||typeof t.label=="string"))}var wc=pe("contacts.directory","service","1.0.0","one",e=>$(e)&&["search","resolveEmails","open"].every(t=>le(e,t)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(lr)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(t=>typeof t=="string"&&t.length<=1e3),result:e=>Array.isArray(e)&&e.every(t=>$(t)&&typeof t.address=="string"&&Array.isArray(t.contacts)&&t.contacts.every(lr))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||$(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:gt}}),xc=pe("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),fr=pe("web.navigator","service","1.0.0","one",e=>$(e)&&le(e,"open"),void 0,{open:{args:e=>ee(e,[ed]),result:gt}}),kc=pe("selection.textAction","extension","1.0.0","many",e=>$(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&le(e,"run"),e=>[e.id]),gr=pe("geo.navigator","service","1.0.0","one",e=>$(e)&&le(e,"open"),void 0,{open:{args:e=>ee(e,[td]),result:gt}}),Cc=pe("geo.search","service","1.0.0","one",e=>$(e)&&le(e,"search")&&le(e,"reverse"),void 0,{search:{args:e=>ee(e,[F]),result:ad},reverse:{args:e=>ee(e,[t=>Number.isFinite(t),t=>Number.isFinite(t)]),result:nd}}),hr=pe("agent.toolProvider","service","1.0.0","many",e=>$(e)&&Array.isArray(e.tools)&&e.tools.every(id)&&le(e,"execute"),e=>e.tools.map(t=>t.name),{execute:{args:e=>ee(e,[F,$,rd]),result:od}},e=>({tools:e.tools}),"global"),Sc=pe("guard.runtime","service","1.0.0","one",e=>$(e)&&["resolve","requestApproval","consumeToken","audit"].every(t=>le(e,t)),void 0,{resolve:{args:e=>ee(e,[$]),result:$},requestApproval:{args:e=>ee(e,[$]),result:Lt},consumeToken:{args:e=>e.length>=1&&e.length<=2&&F(e[0])&&Ae(e[1]),result:Lt},audit:{args:e=>ee(e,[$]),result:gt}}),Ec=pe("browser.automation","service","1.0.0","one",e=>$(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(t=>le(e,t)),void 0,{list:{args:e=>e.length===0,result:xe},open:{args:e=>ee(e,[F]),result:xe},switch:{args:e=>ee(e,[F]),result:xe},close:{args:e=>ee(e,[F]),result:xe},snapshot:{args:e=>ee(e,[F]),result:xe},readText:{args:e=>e.length>=1&&e.length<=2&&F(e[0])&&Xi(e[1]),result:xe},readHtml:{args:e=>ee(e,[F]),result:xe},screenshot:{args:e=>ee(e,[F]),result:xe},click:{args:e=>ee(e,[F,t=>typeof t=="number"]),result:xe},type:{args:e=>e.length>=3&&e.length<=4&&F(e[0])&&typeof e[1]=="number"&&F(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:xe},select:{args:e=>ee(e,[F,t=>typeof t=="number",F]),result:xe},scroll:{args:e=>ee(e,[F,t=>typeof t=="number",t=>typeof t=="number"]),result:xe},pressKey:{args:e=>ee(e,[F,F]),result:xe},navigate:{args:e=>ee(e,[F,F]),result:xe},back:{args:e=>ee(e,[F]),result:xe},forward:{args:e=>ee(e,[F]),result:xe},reload:{args:e=>ee(e,[F]),result:xe}}),Ic=pe("fileTree.contextItem","extension","1.0.0","many",e=>$(e)&&typeof e.id=="string"&&typeof e.label=="string"&&Ae(e.labelKey)&&le(e,"run"),e=>[e.id]),Dc=pe("newTab.entry","extension","1.0.0","many",e=>$(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&le(e,"run"),e=>[e.id]),Ac=pe("search.resultCard","extension","1.0.0","many",e=>$(e)&&typeof e.cardKind=="string"&&le(e,"render")&&le(e,"open"),e=>[e.cardKind]),na=pe("metadataPanel.segment","extension","1.0.0","many",e=>$(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&le(e,"render"),e=>[e.id]),yr=pe("workspace.surface","extension","1.0.0","many",e=>$(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&le(e,"getSnapshot")&&le(e,"subscribe")&&le(e,"restore"),e=>[e.id]),Tc=pe("metadata.plugin","extension","1.0.0","many",e=>$(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&le(e,"facts"),e=>[e.id]),Nc=pe("workspace.viewState","extension","1.0.0","many",e=>$(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&le(e,"capture")&&le(e,"restore")&&le(e,"subscribe"),e=>[e.id]);function br(e,t){return new Date(e,t,0).getDate()}function zt(e,t,n){if(t<1||t>12||n<1||n>31)return!1;let r=new Date(e,t-1,n);return r.getFullYear()===e&&r.getMonth()===t-1&&r.getDate()===n}var sd=/^(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)(?:([^a-z])(dd|mm|yyyy))?$/;function gn(e){let t=sd.exec(e.trim().toLowerCase());if(!t)return null;let n=[t[1],t[3],t[5]].filter(Boolean),r=[t[2],t[4]].filter(o=>o!==void 0);return new Set(n).size!==n.length||!n.includes("dd")||!n.includes("mm")?null:{tokens:n,separators:r}}var cd={dd:"(\\d{1,2})",mm:"(\\d{1,2})",yyyy:"(\\d{4})"};function ud(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function vr(e,t){let n=gn(t);if(!n)return null;let{tokens:r,separators:o}=n,i=r.map((h,g)=>cd[h]+(g<o.length?ud(o[g]):"")).join(""),s=new RegExp(`^${i}$`).exec(e.trim());if(!s)return null;let l={};r.forEach((h,g)=>{l[h]=Number(s[g+1])});let c=l.dd,u=l.mm,f=l.yyyy;return zt(f??2e3,u,c)?f==null?{month:u,day:c}:{year:f,month:u,day:c}:null}function Qe(){let e=new Date;return{view:"month",cursor:`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-01`,selectedDate:null,rangeStart:null,rangeEnd:null,selectedTime:null,timeRange:null}}function Ft(e){if(typeof e!="string"||!/^\d{4}-\d{2}-\d{2}$/.test(e))return!1;let[t,n,r]=e.split("-").map(Number);return zt(t,n,r)}var hn=e=>typeof e=="string"&&/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(e);function yn(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let{start:t,end:n}=e;return hn(t)&&hn(n)&&t<n?{start:t,end:n}:null}function wr(e){let t=e&&typeof e=="object"?e:{},n=Qe();return{view:t.view==="week"||t.view==="year"||t.view==="month"?t.view:n.view,cursor:Ft(t.cursor)?`${t.cursor.slice(0,7)}-01`:n.cursor,selectedDate:Ft(t.selectedDate)?t.selectedDate:null,rangeStart:Ft(t.rangeStart)?t.rangeStart:null,rangeEnd:Ft(t.rangeEnd)?t.rangeEnd:null,selectedTime:hn(t.selectedTime)?t.selectedTime:null,timeRange:yn(t.timeRange)}}var a,m;function xr(e){m=e,a=e.React}function ht(){return m.runtime.getOrCreate("calendar.revealTarget",()=>{let e={value:null,listeners:new Set,get:()=>e.value,publish:t=>{e.value=t;for(let n of[...e.listeners])n()},subscribe:t=>(e.listeners.add(t),()=>e.listeners.delete(t))};return e})}var pd=2400;function kr(e,t){let n=m.runtime.getOrCreate("calendar.revealPulse",()=>({nonce:0,timer:null})),r=ht();if(m.workspace.patchTimeControl({...e.view?{view:e.view}:{},cursor:`${e.date.slice(0,7)}-01`,selectedDate:e.date,selectedTime:e.startTime??null,timeRange:yn({start:e.startTime,end:e.endTime}),rangeStart:null,rangeEnd:null}),n.timer&&clearTimeout(n.timer),r.publish(null),e.itemId){let o={surface:t,sourceId:e.sourceId??"",itemId:e.itemId,date:e.date,nonce:++n.nonce};r.publish(o),n.timer=setTimeout(()=>{r.get()?.nonce===o.nonce&&r.publish(null),n.timer=null},pd)}}function wa(e){kr(e,"main"),m.workspace.openMainTab()}function Cr(e){kr(e,"agenda"),m.workspace.revealOwnPanel("left_sidebar")}var md=`
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

/* \u2500\u2500 Calendar editor modal \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Item badges \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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

/* \u2500\u2500 Agenda panel header actions \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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
  gap: 8px;
  width: 100%;
  padding: 6px 8px;
  border: none;
  border-radius: var(--radius-sm, 6px);
  background: transparent;
  text-align: left;
  cursor: pointer;
}
.agenda-card:hover { background: var(--bg-hover, rgba(0, 0, 0, 0.04)); }
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

/* \u2500\u2500 Week time-grid \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Header filters (groups / sources) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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
  padding: var(--space-1);
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

/* Calendar's integration page starts with a bordered plugin card rather than a
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
.calendar-filter-inline-rows {
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

/* \u2500\u2500 Note-date source editor (Settings \u2192 Calendar \u2192 Note dates) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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
`,bn="notes-calendar-styles";function Sr(){let e=document.getElementById(bn);return e||(e=document.createElement("style"),e.id=bn,document.head.appendChild(e)),e.textContent=md,()=>{document.getElementById(bn)===e&&e.remove()}}var Er={"auto.02f17370b8d9":"Event tags","auto.04a212215ef9":"Confirm","auto.04f6b3ea183e":"Clock","auto.05d290d65a74":"Calendar: List events","auto.0623bfa38c8f":"Folder scope","auto.082bc378cd60":"Month","auto.0cd372226ee9":"Event title\u2026","auto.1389fda4dae3":"Recurring date range in years","auto.1780c4a5f967":"No sources yet","auto.1a29d1bf66f5":"Note\u2026","auto.1ac1ff7616a6":"all-day","auto.1cb00f4b1daf":"Synced calendar \xB7 read-only","auto.221ca63005ea":"Syncing\u2026","auto.22819a02167d":"Go to today","auto.240038c46892":"Remote events","auto.24345a14377f":"Today","auto.24bdcf2d51f8":"Range (years)","auto.257ff123e390":"No notes match {{p0}}: {{p1}}","auto.2a37335eebda":"Heart","auto.2ae8981158aa":"Read-only events from accounts connected in","auto.2b7d938e6787":"Sync now","auto.2bc9464d49e9":"Equals value","auto.2c924e308820":"Note","auto.33a5a701e541":"Todo title\u2026","auto.33ce417454bf":"Loading\u2026","auto.34d8b60fe253":"Hide","auto.35b023ecbb81":"Source name (e.g. Birthdays)","auto.3ae5b44a561f":"Recurrence exceptions","auto.408a0d16a8ba":"Show these entries \u2014 put this source back on the calendar.","auto.418713defbf7":"No events or todos","auto.46fbb53a9be2":"Day start hour","auto.475b6ce898d4":"Source name","auto.4869ac12717f":"Open week","auto.48a7b8889e15":"optional","auto.4cb741c63cbd":"Microsoft Calendar","auto.4d064726954a":"Advanced","auto.4da8c4eff514":"Source name \u2014 how this group is listed in the Upcoming section. Click to rename it.","auto.4fda04775bdc":"Remove this field","auto.50b47e47a104":"Sync {{p0}}","auto.50f94286ba30":"Previous","auto.519b42369442":"Optional frontmatter key holding a HH:MM start time. Empty \u21D2 an all-day entry.","auto.5210c5c047ea":"Append the number of years, e.g. \u201CAda (36)\u201D.","auto.5301648dcf6b":"Edit","auto.55f1c767a3b1":"Title property","auto.570374e4e4cc":"Google Calendar","auto.5d12631f0a8b":"Event links","auto.611f3791dc68":"Start time property","auto.61cc55aa0453":"Add","auto.65c01f7ba330":"Add one below, then fill in the frontmatter value it should match.","auto.691b674766e5":"Date property","auto.6d07b3164ac0":"Show recurring dates only within this many years before and after the current year.","auto.702e8114bce7":"Event attachments","auto.736a07e01797":"Hide these entries \u2014 keep the source but stop drawing it on the calendar.","auto.73d64a823b7d":"Add tag\u2026","auto.768e0c1c6957":"Title","auto.77dfd2135f4d":"Cancel","auto.7a3a9094b18c":"Open Calendar","auto.7a46866bc719":"TODAY","auto.7bf039eeb194":"Frontmatter key holding the date: 1990-05-04, or --05-04 when the year is unknown.","auto.7bf74c2d99d6":"Entry icon \u2014 drawn on every calendar entry from this source. Optional: leave it off for a plain chip.","auto.7c1496f9a7dc":"Delete \u201C{{p0}}\u201D?","auto.7eacb0e385b4":"No calendar accounts connected yet \u2014 add one in Settings \u2192 Accounts.","auto.7f852a5678f1":"Calendar: Set view","auto.7f8a6fad8b7c":"Add event","auto.808d7dca8a74":"Default","auto.8410192cbb1f":"Linked file path","auto.85a7de6e2705":"Star","auto.86c0a35ec883":"More options","auto.879e32326c52":"Year","auto.88d8206d586a":"Start time","auto.891e9d6d47f1":"Agenda","auto.8bbc96d44546":"How the date is written in the note \u2014 dd, mm and yyyy with any separators (dd.mm.yyyy, mm/dd/yyyy, or dd.mm without a year). Leave empty to detect it.","auto.8c41ae88467f":"Person","auto.8d0a32ed6339":"Gift","auto.92bcda7f379e":"Entry icon","auto.9444501818e6":"Calendars","auto.94ee88690828":"Date format","auto.95553ba8a405":"No icon","auto.958788fc103f":"Note dates","auto.981f473aa731":"Outline colour","auto.9acc52f8cf89":"Remove tag {{p0}}","auto.9ae33a7d0ecb":"Property","auto.9c6e5a3f44fc":"Cake","auto.9c918414710c":"Pin","auto.9ddab8990070":"Show count","auto.9eb56535c39a":"Calendar sync state","auto.9ee309dcedc9":"Open page","auto.9fa90b203761":"Entry colour","auto.a2590d497e7c":"No events in this window.","auto.a3cbb98ddf5e":"Filename","auto.a3fa4c4a4715":"Frontmatter value","auto.a774409a00c2":"Flag","auto.ad8919ace091":"Event","auto.ad980036b394":"Whole vault","auto.adab5090ac6a":"Calendar","auto.ae8a5b196587":"Yes, delete","auto.aee875c4edbf":"End time property","auto.b29a9852d77e":"Open Calendar page","auto.b2db10062979":"Note date sources","auto.b6f727f0c520":"Day (monthly)","auto.b82220d034e7":"Frontmatter key","auto.bc981983e7f5":"Next","auto.bf2660184858":"Calendar: Go to date","auto.c2b47c770575":"Synced calendars","auto.c5497bca5846":"Events","auto.c66a827e3397":"Open note","auto.c7f73bb54d92":"Settings","auto.c845e23963ef":'Delete the "{{p0}}" source \u2014 the notes themselves are untouched.',"auto.cd7800da7f4f":"End time","auto.cfbf9d49c1da":". Choose which calendars appear here.","auto.d4198662a72f":"Bell","auto.d4ea5b59b68b":"{{p0}} notes match \xB7 {{p1}} with a usable date","auto.d5e8ba205867":"Settings \u2192 Accounts","auto.d669db3f6b34":"No todos and events on this day","auto.d75a293ea22a":"Click again to delete this source.","auto.d97d1ee339e4":"Show","auto.dbed7864623f":"Calendar group","auto.dd4b99ddaf61":"Day + month (yearly)","auto.e0db2991e37a":"Add tag","auto.e10282ef1972":"Date match","auto.e16f07326a18":"Calendar: Add an event","auto.e6ffec68b5ae":"{{p0}} notes match \xB7 none has a usable {{p1}}","auto.e7de9576dc00":"Linked file (vault path)\u2026","auto.ec42f1f55523":"Add todo","auto.ee8581831b9c":"Calendar: Go to today","auto.ef5ea5a743b3":"Frontmatter key to show","auto.efc007a393f6":"Save","auto.f07b365f8502":"First hour shown in the week grid (0\u201323). Earlier hours scroll above it.","auto.f4a0d0857b02":"Clear {{p0}}","auto.f4e12416c6b8":"No items","auto.f6b2246c64fa":"No group","auto.f6fdbe48dc54":"Delete","auto.f82be68a7fb4":"Week","auto.fb3a16f382f8":"Copy Valley link","auto.fd303c72a405":"Exact date (day + month + year)","calendar.action.openAttachment":"Attachment","calendar.action.openLink":"Link","calendar.action.showOnMap":"Show on map","calendar.addAttachment":"Add attachment","calendar.addUrl":"Add link","calendar.agenda.clearSearch":"Clear search","calendar.agenda.searchLabel":"Search agenda","calendar.agenda.searchPlaceholder":"Search agenda\u2026","calendar.attachmentPath":"Attachment path","calendar.attachmentPlaceholder":"Attach a file\u2026","calendar.attachments":"Attachments","calendar.badge.attachment":"Attachment","calendar.badge.link":"Link","calendar.badge.location":"Location","calendar.badge.note":"Linked note","calendar.colorRule.folder":"Folder","calendar.colorRule.property":"Property","calendar.colorRule.tag":"Hashtag","calendar.command.delete":"Calendar: Delete item","calendar.command.editFields":"Calendar: Edit item fields","calendar.command.get":"Calendar: Get item","calendar.command.listItems":"Calendar: List all items","calendar.command.open":"Calendar: Open item","calendar.command.openCached":"Calendar: Open cached event","calendar.command.sourceAction":"Calendar: Run source item action","calendar.command.sourceActions":"Calendar: List source item actions","calendar.command.sourceCreate":"Calendar: Create source item","calendar.command.sources":"Calendar: List item sources","calendar.dayEndHour":"Day end hour","calendar.dayEndHourDesc":"Last hour shown in the week grid (1\u201324). Later hours scroll below it.","calendar.dayWindowGrows":"An item outside the window still shows \u2014 the grid grows to reach it.","calendar.editor.close":"Close","calendar.editor.retry":"Enable or reload the owning plugin, then try opening this item again.","calendar.editor.unavailable":"Item editor unavailable","calendar.error.changed":"This event changed elsewhere. Your draft is preserved. Cancel to load the latest version.","calendar.error.missing":"The calendar item no longer exists.","calendar.error.save":"Could not save the event. Your changes are preserved.","calendar.field.attachments":"Attachments","calendar.field.completed":"Completed","calendar.field.date":"Date","calendar.field.endDate":"End date","calendar.field.endTime":"End time","calendar.field.filePath":"Linked file","calendar.field.group":"Group","calendar.field.groupId":"Group","calendar.field.location":"Location","calendar.field.note":"Notes","calendar.field.priority":"Priority","calendar.field.startTime":"Start time","calendar.field.tags":"Tags","calendar.field.title":"Title","calendar.field.urls":"Links","calendar.filter.deselectAll":"Deselect all","calendar.filter.events":"Events","calendar.filter.groups":"Groups","calendar.filter.noGroups":"No groups yet","calendar.filter.noSources":"No sources","calendar.filter.noteDates":"Note dates","calendar.filter.selectAll":"Select all","calendar.filter.sources":"Sources","calendar.group.deleteBlocked":"Still used by {{p0}} events \u2014 empty the group to delete it","calendar.group.global":"Global","calendar.location":"Location","calendar.locationPlaceholder":"Location\u2026","calendar.noteDate.addField":"Add field","calendar.noteDate.addSource":"Add source","calendar.noteDatePreset.anniversaries":"Anniversaries","calendar.noteDatePreset.birthdays":"Birthdays","calendar.noteDatePreset.blank":"Blank source","calendar.noteDatePreset.deadlines":"Deadlines","calendar.openLocation":"Show on map","calendar.openLocationOf":"Show {{p0}} on map","calendar.overview.accounts":"Calendar accounts","calendar.overview.calendars":"Calendars","calendar.overview.disabled":"Sync disabled","calendar.overview.loading":"Loading calendar item\u2026","calendar.overview.month":"Month","calendar.overview.none":"None","calendar.overview.plugin":"Active plugin","calendar.overview.range":"Selected range","calendar.overview.selectedDate":"Selected date","calendar.overview.selectedTime":"Selected time","calendar.overview.sources":"Visible sources","calendar.overview.unavailable":"Calendar details could not be loaded. Reopen Properties to retry.","calendar.overview.view":"View","calendar.overview.week":"Week","calendar.overview.year":"Year","calendar.plugins.by":"By","calendar.plugins.configure":"Configure {{p0}}","calendar.plugins.disable":"Disable {{p0}} in Calendar","calendar.plugins.empty":"No calendar integrations are active.","calendar.plugins.enable":"Enable {{p0}} in Calendar","calendar.plugins.version":"Version:","calendar.priority.high":"High","calendar.priority.low":"Low","calendar.priority.medium":"Medium","calendar.priority.none":"None","calendar.properties.manageGroups":"Manage groups","calendar.quickadd.allDay":"All day","calendar.quickadd.details":"Details","calendar.quickadd.dueDate":"Due date","calendar.quickadd.editTitle":"Edit {{kind}}","calendar.quickadd.endDate":"End date","calendar.quickadd.kind":"What to add","calendar.quickadd.priority":"Priority","calendar.quickadd.startDate":"Start date","calendar.quickadd.when":"When","calendar.removeAttachment":"Remove attachment","calendar.removeAttachmentOf":"Remove attachment {{p0}}","calendar.removeLocation":"Remove location","calendar.removeUrl":"Remove link","calendar.removeUrlOf":"Remove link {{p0}}","calendar.settings.groups":"Groups","calendar.settings.groupsDesc":"Shared groups are created and managed in the central Groups settings.","calendar.settings.openItemsAgenda":"Calendar Agenda","calendar.settings.openItemsIn":"Open items in","calendar.settings.openItemsInDesc":"Choose where a normal click on Calendar content reveals the item.","calendar.settings.openItemsOwner":"Owning plugin","calendar.sync.account":"Sync this account","calendar.sync.accountsError":"Could not load accounts. Refresh to retry.","calendar.sync.back":"Back to accounts","calendar.sync.cached":"Previously synced events remain available.","calendar.sync.calendarsError":"Could not load calendars. Check the connection in Accounts and retry.","calendar.sync.connected":"Connected","calendar.sync.description":"Choose calendars from your existing accounts and assign each to a group. Events are read-only.","calendar.sync.failed":"Calendar sync failed.","calendar.sync.group":"Group for {{name}}","calendar.sync.last":"Last synced {{time}} \xB7 {{count}} events","calendar.sync.loadingAccounts":"Loading accounts\u2026","calendar.sync.loadingCalendars":"Loading calendars\u2026","calendar.sync.manage":"Manage accounts","calendar.sync.noCalendars":"No readable calendars found for this account.","calendar.sync.noGroup":"No group","calendar.sync.permission":"Calendar access is missing. Enable Calendar in Accounts.","calendar.sync.primary":"Default calendar","calendar.sync.readOnly":"Import selected calendars. Changes in Valley are not sent back to the provider.","calendar.sync.reconnect":"Reconnect this account in Accounts to restore access.","calendar.sync.refresh":"Refresh accounts and sync","calendar.sync.saveError":"Could not save the calendar selection.","calendar.sync.saved":"OAuth credentials are saved, but no account is connected yet. Open Accounts and choose Add connection to authorize access.","calendar.sync.savedShort":"Credentials saved \xB7 Account not connected","calendar.sync.select":"Sync {{name}}","calendar.sync.setup":"Set up this provider in Accounts, then authorize calendar access.","calendar.sync.setupShort":"Set up in Accounts","calendar.undo.addEvent":"Add event \u201C{{title}}\u201D","calendar.undo.deleteEvent":"Delete event \u201C{{title}}\u201D","calendar.undo.editEvent":"Edit event \u201C{{title}}\u201D","calendar.url":"Link","calendar.urlPlaceholder":"https://\u2026","error.commandFailed":"The command failed. Review the input and try again.","guard.preset.ask-for-writes":"Ask for writes","guard.preset.blocked":"Blocked","guard.preset.read-only":"Read-only","guard.preset.recommended":"Recommended","manifest.description":"Event and todo planner: left-sidebar agenda, right-sidebar compact calendar, and a full workspace page with month/week/year grids beside a live agenda column.","manifest.name":"Calendar","markdown.examples.agenda":"Agenda","markdown.examples.dateRange":"Date range","markdown.examples.day":"Today","markdown.examples.filtered":"Filtered results","markdown.examples.nextSeven":"Next seven days","markdown.examples.nextThirty":"Next thirty days","markdown.examples.week":"Week","plugin.calendar.section.dates":"Note dates","plugin.calendar.section.plugins":"Plugins","plugin.calendar.section.sync":"Synced calendars","backend.request":"Expected calendar request","backend.text":"Invalid calendar request text","backend.expired":"Calendar event page expired","backend.large":"Calendar event is too large","backend.account":"Unknown calendar account","backend.permission":"Calendar permission is missing. Reconnect in Settings \u2192 Accounts.","backend.endpoint":"Invalid calendar endpoint","backend.window":"Invalid calendar time window","backend.pending":"Too many pending calendar result sets","backend.pages":"Calendar pagination limit exceeded","backend.continuation":"Invalid Microsoft Graph continuation URL.","backend.microsoft":"Microsoft Graph calendar fetch failed: {{status}}","backend.googleList":"Google Calendar list failed: {{status}}","backend.googleFetch":"Google Calendar fetch failed: {{status}}"};var Ir={"auto.02f17370b8d9":"Ereignis-Tags","auto.04a212215ef9":"Best\xE4tigen","auto.04f6b3ea183e":"Uhr","auto.05d290d65a74":"Calendar: Ereignisse auflisten","auto.0623bfa38c8f":"Ordnerbereich","auto.082bc378cd60":"Monat","auto.0cd372226ee9":"Veranstaltungstitel\u2026","auto.1389fda4dae3":"Wiederkehrender Zeitraum in Jahren","auto.1780c4a5f967":"Noch keine Quellen","auto.1a29d1bf66f5":"Notiz\u2026","auto.1ac1ff7616a6":"den ganzen Tag","auto.1cb00f4b1daf":"Synchronisierter Kalender \xB7 schreibgesch\xFCtzt","auto.221ca63005ea":"Synchronisierung\u2026","auto.22819a02167d":"Gehe zu heute","auto.240038c46892":"Fernveranstaltungen","auto.24345a14377f":"Heute","auto.24bdcf2d51f8":"Zeitraum (Jahre)","auto.257ff123e390":"Keine Notizen stimmen mit {{p0}} \xFCberein: {{p1}}","auto.2a37335eebda":"Herz","auto.2ae8981158aa":"Schreibgesch\xFCtzte Ereignisse von verbundenen Konten","auto.2b7d938e6787":"Jetzt synchronisieren","auto.2bc9464d49e9":"Gleicher Wert","auto.2c924e308820":"Notiz","auto.33a5a701e541":"Todo-Titel\u2026","auto.33ce417454bf":"Laden\u2026","auto.34d8b60fe253":"Ausblenden","auto.35b023ecbb81":"Quellenname (z. B. Geburtstage)","auto.3ae5b44a561f":"Wiederholungsausnahmen","auto.408a0d16a8ba":"Diese Eintr\xE4ge anzeigen \u2013 die Quelle wieder im Kalender einblenden.","auto.418713defbf7":"Keine Ereignisse oder Aufgaben","auto.46fbb53a9be2":"Tagesstartstunde","auto.475b6ce898d4":"Quellenname","auto.4869ac12717f":"Woche der offenen T\xFCr","auto.48a7b8889e15":"optional","auto.4cb741c63cbd":"Microsoft Calendar","auto.4d064726954a":"Fortgeschritten","auto.4da8c4eff514":"Quellenname \u2013 so wird diese Gruppe im Abschnitt \u201EDemn\xE4chst\u201C aufgef\xFChrt. Zum Umbenennen klicken.","auto.4fda04775bdc":"Dieses Feld entfernen","auto.50b47e47a104":"Synchronisieren {{p0}}","auto.50f94286ba30":"Zur\xFCck","auto.519b42369442":"Optionaler Frontmatter-Schl\xFCssel mit einer Startzeit (HH:MM). Leer \u21D2 ein ganzt\xE4giger Eintrag.","auto.5210c5c047ea":"H\xE4ngen Sie die Anzahl der Jahre an, z.B. \u201EAda (36)\u201C.","auto.5301648dcf6b":"Bearbeiten","auto.55f1c767a3b1":"Titeleigentum","auto.570374e4e4cc":"Google Calendar","auto.5d12631f0a8b":"Veranstaltungslinks","auto.611f3791dc68":"Eigenschaft f\xFCr die Startzeit","auto.61cc55aa0453":"Hinzuf\xFCgen","auto.65c01f7ba330":"F\xFCgen Sie unten einen hinzu und geben Sie dann den Frontmatter-Wert ein, mit dem er \xFCbereinstimmen soll.","auto.691b674766e5":"Eigenschaft f\xFCr das Datum","auto.6d07b3164ac0":"Wiederkehrende Termine nur so viele Jahre vor und nach dem aktuellen Jahr anzeigen.","auto.702e8114bce7":"Ereignisanh\xE4nge","auto.736a07e01797":"Diese Eintr\xE4ge ausblenden \u2013 die Quelle bleibt erhalten, wird aber nicht mehr im Kalender gezeichnet.","auto.73d64a823b7d":"Tag hinzuf\xFCgen\u2026","auto.768e0c1c6957":"Titel","auto.77dfd2135f4d":"Abbrechen","auto.7a3a9094b18c":"Calendar \xF6ffnen","auto.7a46866bc719":"HEUTE","auto.7bf039eeb194":"Frontmatter-Schl\xFCssel mit dem Datum: 1990-05-04 oder --05-04, wenn das Jahr unbekannt ist.","auto.7bf74c2d99d6":"Eintragssymbol \u2013 wird auf jedem Kalendereintrag aus dieser Quelle gezeichnet. Optional: ohne Symbol bleibt der Chip schlicht.","auto.7c1496f9a7dc":"\u201E{{p0}}\u201C l\xF6schen?","auto.7eacb0e385b4":"Noch keine Kalenderkonten verbunden \u2013 f\xFCgen Sie eines unter Einstellungen \u2192 Konten hinzu.","auto.7f852a5678f1":"Calendar: Ansicht einstellen","auto.7f8a6fad8b7c":"Ereignis hinzuf\xFCgen","auto.808d7dca8a74":"Standard","auto.8410192cbb1f":"Pfad der verkn\xFCpften Datei","auto.85a7de6e2705":"Stern","auto.86c0a35ec883":"Weitere Optionen","auto.879e32326c52":"Jahr","auto.88d8206d586a":"Startzeit","auto.891e9d6d47f1":"Agenda","auto.8bbc96d44546":"Wie das Datum in der Notiz geschrieben wird \u2013 dd, mm und yyyy mit beliebigen Trennzeichen (dd.mm.yyyy, mm/dd/yyyy oder dd.mm ohne Jahr). Leer lassen, um es automatisch zu erkennen.","auto.8c41ae88467f":"Person","auto.8d0a32ed6339":"Geschenk","auto.92bcda7f379e":"Eintragssymbol","auto.9444501818e6":"Kalender","auto.94ee88690828":"Datumsformat","auto.95553ba8a405":"Kein Symbol","auto.958788fc103f":"Termine aus Notizen","auto.981f473aa731":"Randfarbe","auto.9acc52f8cf89":"Tag entfernen {{p0}}","auto.9ae33a7d0ecb":"Eigenschaft","auto.9c6e5a3f44fc":"Kuchen","auto.9c918414710c":"Stecknadel","auto.9ddab8990070":"Anzahl anzeigen","auto.9eb56535c39a":"Calendar Synchronisierungsstatus","auto.9ee309dcedc9":"Seite \xF6ffnen","auto.9fa90b203761":"Eintragsfarbe","auto.a2590d497e7c":"Keine Ereignisse in diesem Fenster.","auto.a3cbb98ddf5e":"Dateiname","auto.a3fa4c4a4715":"Frontmatter-Wert","auto.a774409a00c2":"Fahne","auto.ad8919ace091":"Ereignis","auto.ad980036b394":"Ganzer Tresor","auto.adab5090ac6a":"Kalender","auto.ae8a5b196587":"Ja, l\xF6schen","auto.aee875c4edbf":"Eigenschaft f\xFCr die Endzeit","auto.b29a9852d77e":"\xD6ffnen Sie die Seite Calendar","auto.b2db10062979":"Beachten Sie Datumsquellen","auto.b6f727f0c520":"Tag (monatlich)","auto.b82220d034e7":"Frontmatter-Schl\xFCssel","auto.bc981983e7f5":"Weiter","auto.bf2660184858":"Calendar: Zum Datum gehen","auto.c2b47c770575":"Synchronisierte Kalender","auto.c5497bca5846":"Veranstaltungen","auto.c66a827e3397":"Notiz \xF6ffnen","auto.c7f73bb54d92":"Einstellungen","auto.c845e23963ef":"Quelle \u201E{{p0}}\u201C l\xF6schen \u2013 die Notizen selbst bleiben unber\xFChrt.","auto.cd7800da7f4f":"Endzeit","auto.cfbf9d49c1da":". W\xE4hlen Sie aus, welche Kalender hier angezeigt werden.","auto.d4198662a72f":"Glocke","auto.d4ea5b59b68b":"{{p0}} Notizen stimmen \xFCberein \xB7 {{p1}} mit verwendbarem Datum","auto.d5e8ba205867":"Einstellungen \u2192 Konten","auto.d669db3f6b34":"An diesem Tag gibt es keine Aufgaben und Ereignisse","auto.d75a293ea22a":"Zum L\xF6schen erneut klicken.","auto.d97d1ee339e4":"Anzeigen","auto.dbed7864623f":"Calendar Gruppe","auto.dd4b99ddaf61":"Tag + Monat (j\xE4hrlich)","auto.e0db2991e37a":"Tag hinzuf\xFCgen","auto.e10282ef1972":"Datums\xFCbereinstimmung","auto.e16f07326a18":"Calendar: Ein Ereignis hinzuf\xFCgen","auto.e6ffec68b5ae":"{{p0}} Notizen stimmen \xFCberein \xB7 keine hat ein verwendbares {{p1}}","auto.e7de9576dc00":"Verkn\xFCpfte Datei (Tresorpfad)\u2026","auto.ec42f1f55523":"Aufgabe hinzuf\xFCgen","auto.ee8581831b9c":"Calendar: Zu heute springen","auto.ef5ea5a743b3":"Anzuzeigender Frontmatter-Schl\xFCssel","auto.efc007a393f6":"Speichern","auto.f07b365f8502":"Erste im Wochenraster angezeigte Stunde (0\u201323). Dar\xFCber scrollen fr\xFChere Stunden.","auto.f4a0d0857b02":"L\xF6schen {{p0}}","auto.f4e12416c6b8":"Keine Artikel","auto.f6b2246c64fa":"Keine Gruppe","auto.f6fdbe48dc54":"L\xF6schen","auto.f82be68a7fb4":"Woche","auto.fb3a16f382f8":"Valley-Link kopieren","auto.fd303c72a405":"Genaues Datum (Tag + Monat + Jahr)","calendar.action.openAttachment":"Anhang","calendar.action.openLink":"Link","calendar.action.showOnMap":"Auf Karte anzeigen","calendar.addAttachment":"Anhang hinzuf\xFCgen","calendar.addUrl":"Link hinzuf\xFCgen","calendar.agenda.clearSearch":"Suche l\xF6schen","calendar.agenda.searchLabel":"Agenda durchsuchen","calendar.agenda.searchPlaceholder":"Agenda durchsuchen\u2026","calendar.attachmentPath":"Pfad des Anhangs","calendar.attachmentPlaceholder":"Datei anh\xE4ngen\u2026","calendar.attachments":"Anh\xE4nge","calendar.badge.attachment":"Anhang","calendar.badge.link":"Link","calendar.badge.location":"Ort","calendar.badge.note":"Verkn\xFCpfte Notiz","calendar.colorRule.folder":"Ordner","calendar.colorRule.property":"Eigenschaft","calendar.colorRule.tag":"Hashtag","calendar.command.delete":"Kalender: Eintrag l\xF6schen","calendar.command.editFields":"Kalender: Felder bearbeiten","calendar.command.get":"Kalender: Eintrag abrufen","calendar.command.listItems":"Kalender: Alle Eintr\xE4ge auflisten","calendar.command.open":"Kalender: Eintrag \xF6ffnen","calendar.command.openCached":"Kalender: Zwischengespeicherten Termin \xF6ffnen","calendar.command.sourceAction":"Kalender: Quellenaktion ausf\xFChren","calendar.command.sourceActions":"Kalender: Quellenaktionen auflisten","calendar.command.sourceCreate":"Kalender: Eintrag in Quelle erstellen","calendar.command.sources":"Kalender: Quellen auflisten","calendar.dayEndHour":"Tagesendstunde","calendar.dayEndHourDesc":"Letzte im Wochenraster angezeigte Stunde (1\u201324). Darunter scrollen sp\xE4tere Stunden.","calendar.dayWindowGrows":"Ein Eintrag au\xDFerhalb des Fensters wird trotzdem angezeigt \u2014 das Raster w\xE4chst bis dorthin.","calendar.editor.close":"Schliessen","calendar.editor.retry":"Aktiviere oder lade das zust\xE4ndige Plugin neu und \xF6ffne den Eintrag erneut.","calendar.editor.unavailable":"Eintragseditor nicht verf\xFCgbar","calendar.error.changed":"Dieser Termin wurde anderweitig ge\xE4ndert. Dein Entwurf bleibt erhalten. Lade mit Abbrechen die neueste Version.","calendar.error.missing":"Der Kalendereintrag existiert nicht mehr.","calendar.error.save":"Der Termin konnte nicht gespeichert werden. Deine \xC4nderungen bleiben erhalten.","calendar.field.attachments":"Anh\xE4nge","calendar.field.completed":"Abgeschlossen","calendar.field.date":"Datum","calendar.field.endDate":"Enddatum","calendar.field.endTime":"Endzeit","calendar.field.filePath":"Verkn\xFCpfte Datei","calendar.field.group":"Gruppe","calendar.field.groupId":"Gruppe","calendar.field.location":"Ort","calendar.field.note":"Notizen","calendar.field.priority":"Priorit\xE4t","calendar.field.startTime":"Startzeit","calendar.field.tags":"Tags","calendar.field.title":"Titel","calendar.field.urls":"Links","calendar.filter.deselectAll":"Auswahl aufheben","calendar.filter.events":"Termine","calendar.filter.groups":"Gruppen","calendar.filter.noGroups":"Noch keine Gruppen","calendar.filter.noSources":"Keine Quellen","calendar.filter.noteDates":"Notizdaten","calendar.filter.selectAll":"Alle ausw\xE4hlen","calendar.filter.sources":"Quellen","calendar.group.deleteBlocked":"Wird noch von {{p0}} Terminen verwendet \u2014 Gruppe zuerst leeren","calendar.group.global":"Global","calendar.location":"Ort","calendar.locationPlaceholder":"Ort\u2026","calendar.noteDate.addField":"Feld hinzuf\xFCgen","calendar.noteDate.addSource":"Quelle hinzuf\xFCgen","calendar.noteDatePreset.anniversaries":"Jahrestage","calendar.noteDatePreset.birthdays":"Geburtstage","calendar.noteDatePreset.blank":"Leere Quelle","calendar.noteDatePreset.deadlines":"Fristen","calendar.openLocation":"Auf Karte anzeigen","calendar.openLocationOf":"{{p0}} auf Karte anzeigen","calendar.overview.accounts":"Kalenderkonten","calendar.overview.calendars":"Kalender","calendar.overview.disabled":"Synchronisierung deaktiviert","calendar.overview.loading":"Kalendereintrag wird geladen\u2026","calendar.overview.month":"Monat","calendar.overview.none":"Keine","calendar.overview.plugin":"Aktives Plugin","calendar.overview.range":"Ausgew\xE4hlter Zeitraum","calendar.overview.selectedDate":"Ausgew\xE4hltes Datum","calendar.overview.selectedTime":"Ausgew\xE4hlte Uhrzeit","calendar.overview.sources":"Sichtbare Quellen","calendar.overview.unavailable":"Die Kalenderdetails konnten nicht geladen werden. \xD6ffne Eigenschaften erneut, um es nochmals zu versuchen.","calendar.overview.view":"Ansicht","calendar.overview.week":"Woche","calendar.overview.year":"Jahr","calendar.plugins.by":"Von","calendar.plugins.configure":"{{p0}} konfigurieren","calendar.plugins.disable":"{{p0}} im Kalender deaktivieren","calendar.plugins.empty":"Keine Kalenderintegrationen aktiv.","calendar.plugins.enable":"{{p0}} im Kalender aktivieren","calendar.plugins.version":"Version:","calendar.priority.high":"Hoch","calendar.priority.low":"Niedrig","calendar.priority.medium":"Mittel","calendar.priority.none":"Keine","calendar.properties.manageGroups":"Gruppen verwalten","calendar.quickadd.allDay":"Ganzt\xE4gig","calendar.quickadd.details":"Details","calendar.quickadd.dueDate":"F\xE4lligkeitsdatum","calendar.quickadd.editTitle":"{{kind}} bearbeiten","calendar.quickadd.endDate":"Enddatum","calendar.quickadd.kind":"Was hinzuf\xFCgen","calendar.quickadd.priority":"Priorit\xE4t","calendar.quickadd.startDate":"Startdatum","calendar.quickadd.when":"Wann","calendar.removeAttachment":"Anhang entfernen","calendar.removeAttachmentOf":"Anhang {{p0}} entfernen","calendar.removeLocation":"Ort entfernen","calendar.removeUrl":"Link entfernen","calendar.removeUrlOf":"Link {{p0}} entfernen","calendar.settings.groups":"Gruppen","calendar.settings.groupsDesc":"Gemeinsame Gruppen werden in den zentralen Gruppeneinstellungen erstellt und verwaltet.","calendar.settings.openItemsAgenda":"Kalender-Agenda","calendar.settings.openItemsIn":"Elemente \xF6ffnen in","calendar.settings.openItemsInDesc":"Legt fest, wo ein normaler Klick auf Kalenderinhalte das Element anzeigt.","calendar.settings.openItemsOwner":"Zugeh\xF6riges Plugin","calendar.sync.account":"Dieses Konto synchronisieren","calendar.sync.accountsError":"Konten konnten nicht geladen werden. Versuche es mit Aktualisieren erneut.","calendar.sync.back":"Zur\xFCck zu den Konten","calendar.sync.cached":"Bereits synchronisierte Termine bleiben verf\xFCgbar.","calendar.sync.calendarsError":"Kalender konnten nicht geladen werden. Pr\xFCfe die Verbindung unter Konten und versuche es erneut.","calendar.sync.connected":"Verbunden","calendar.sync.description":"W\xE4hle Kalender deiner bestehenden Konten und ordne sie einer Gruppe zu. Termine sind schreibgesch\xFCtzt.","calendar.sync.failed":"Kalendersynchronisierung fehlgeschlagen.","calendar.sync.group":"Gruppe f\xFCr {{name}}","calendar.sync.last":"Zuletzt synchronisiert: {{time}} \xB7 {{count}} Termine","calendar.sync.loadingAccounts":"Konten werden geladen\u2026","calendar.sync.loadingCalendars":"Kalender werden geladen\u2026","calendar.sync.manage":"Konten verwalten","calendar.sync.noCalendars":"F\xFCr dieses Konto wurden keine lesbaren Kalender gefunden.","calendar.sync.noGroup":"Keine Gruppe","calendar.sync.permission":"Der Kalenderzugriff fehlt. Aktiviere Kalender unter Konten.","calendar.sync.primary":"Standardkalender","calendar.sync.readOnly":"Ausgew\xE4hlte Kalender importieren. \xC4nderungen in Valley werden nicht an den Anbieter gesendet.","calendar.sync.reconnect":"Verbinde dieses Konto unter Konten erneut, um den Zugriff wiederherzustellen.","calendar.sync.refresh":"Konten aktualisieren und synchronisieren","calendar.sync.saveError":"Die Kalenderauswahl konnte nicht gespeichert werden.","calendar.sync.saved":"Die OAuth-Zugangsdaten sind gespeichert, aber noch kein Konto ist verbunden. \xD6ffne Konten und w\xE4hle Verbindung hinzuf\xFCgen, um den Zugriff zu erlauben.","calendar.sync.savedShort":"Zugangsdaten gespeichert \xB7 Konto nicht verbunden","calendar.sync.select":"{{name}} synchronisieren","calendar.sync.setup":"Richte diesen Anbieter unter Konten ein und erlaube danach den Kalenderzugriff.","calendar.sync.setupShort":"Unter Konten einrichten","calendar.undo.addEvent":"Ereignis \u201E{{title}}\u201C hinzuf\xFCgen","calendar.undo.deleteEvent":"Ereignis \u201E{{title}}\u201C l\xF6schen","calendar.undo.editEvent":"Veranstaltung \u201E{{title}}\u201C bearbeiten","calendar.url":"Link","calendar.urlPlaceholder":"https://\u2026","error.commandFailed":"Der Befehl ist fehlgeschlagen. Pr\xFCfe die Eingabe und versuche es erneut.","guard.preset.ask-for-writes":"Bei \xC4nderungen fragen","guard.preset.blocked":"Blockiert","guard.preset.read-only":"Nur lesen","guard.preset.recommended":"Empfohlen","manifest.description":"Termin- und Aufgabenplaner: Agenda in der linken Seitenleiste, kompakter Kalender rechts und eine vollst\xE4ndige Arbeitsbereichsseite mit Monats-, Wochen- und Jahresraster neben einer Live-Agendaspalte.","manifest.name":"Kalender","markdown.examples.agenda":"Agenda","markdown.examples.dateRange":"Datumsbereich","markdown.examples.day":"Heute","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.nextSeven":"N\xE4chste sieben Tage","markdown.examples.nextThirty":"N\xE4chste dreissig Tage","markdown.examples.week":"Woche","plugin.calendar.section.dates":"Notizdaten","plugin.calendar.section.plugins":"Plugins","plugin.calendar.section.sync":"Synchronisierte Kalender","backend.request":"Kalenderanfrage erwartet","backend.text":"Ung\xFCltiger Text in der Kalenderanfrage","backend.expired":"Die Kalenderergebnisse sind abgelaufen","backend.large":"Der Kalendereintrag ist zu gross","backend.account":"Unbekanntes Kalenderkonto","backend.permission":"Die Kalenderberechtigung fehlt. Verbinde das Konto unter Einstellungen \u2192 Konten erneut.","backend.endpoint":"Ung\xFCltiger Kalender-Endpunkt","backend.window":"Ung\xFCltiger Kalenderzeitraum","backend.pending":"Zu viele ausstehende Kalenderabfragen","backend.pages":"Das Limit der Kalenderseiten wurde \xFCberschritten","backend.continuation":"Ung\xFCltige URL f\xFCr die n\xE4chste Microsoft-Graph-Seite.","backend.microsoft":"Microsoft-Graph-Kalender konnte nicht geladen werden: {{status}}","backend.googleList":"Google-Kalenderliste konnte nicht geladen werden: {{status}}","backend.googleFetch":"Google-Kalender konnte nicht geladen werden: {{status}}"};var Dr={"auto.02f17370b8d9":"Etiquetas de eventos","auto.04a212215ef9":"Confirmar","auto.04f6b3ea183e":"Reloj","auto.05d290d65a74":"Calendar: Listar eventos","auto.0623bfa38c8f":"Alcance de la carpeta","auto.082bc378cd60":"Mes","auto.0cd372226ee9":"T\xEDtulo del evento\u2026","auto.1389fda4dae3":"Intervalo de fechas recurrentes en a\xF1os","auto.1780c4a5f967":"A\xFAn no hay fuentes","auto.1a29d1bf66f5":"Nota\u2026","auto.1ac1ff7616a6":"todo el d\xEDa","auto.1cb00f4b1daf":"Calendario sincronizado \xB7 solo lectura","auto.221ca63005ea":"Sincronizando\u2026","auto.22819a02167d":"Ir a hoy","auto.240038c46892":"Eventos remotos","auto.24345a14377f":"Hoy","auto.24bdcf2d51f8":"Rango (a\xF1os)","auto.257ff123e390":"Ninguna nota coincide con {{p0}}: {{p1}}","auto.2a37335eebda":"Coraz\xF3n","auto.2ae8981158aa":"Eventos de solo lectura de cuentas conectadas en","auto.2b7d938e6787":"Sincronizar ahora","auto.2bc9464d49e9":"Es igual al valor","auto.2c924e308820":"Nota","auto.33a5a701e541":"T\xEDtulo de la tarea\u2026","auto.33ce417454bf":"Cargando\u2026","auto.34d8b60fe253":"Ocultar","auto.35b023ecbb81":"Nombre de la fuente (por ejemplo, cumplea\xF1os)","auto.3ae5b44a561f":"Excepciones de recurrencia","auto.408a0d16a8ba":"Muestre estas entradas: vuelva a colocar esta fuente en el calendario.","auto.418713defbf7":"No hay eventos ni tareas","auto.46fbb53a9be2":"Hora de inicio del d\xEDa","auto.475b6ce898d4":"Nombre de la fuente","auto.4869ac12717f":"Semana abierta","auto.48a7b8889e15":"opcional","auto.4cb741c63cbd":"Calendario de Microsoft","auto.4d064726954a":"Avanzado","auto.4da8c4eff514":"Nombre de la fuente: c\xF3mo aparece este grupo en la secci\xF3n Pr\xF3ximamente. Haga clic para cambiarle el nombre.","auto.4fda04775bdc":"Eliminar este campo","auto.50b47e47a104":"Sincronizar {{p0}}","auto.50f94286ba30":"Anterior","auto.519b42369442":"Tecla frontal opcional que contiene una hora de inicio HH:MM. Vac\xEDo \u21D2 una entrada para todo el d\xEDa.","auto.5210c5c047ea":"Agregue el n\xFAmero de a\xF1os, p.e. \u201CAda (36)\u201D.","auto.5301648dcf6b":"Editar","auto.55f1c767a3b1":"Propiedad de t\xEDtulo","auto.570374e4e4cc":"Calendario de Google","auto.5d12631f0a8b":"Enlaces de eventos","auto.611f3791dc68":"Propiedad de hora de inicio","auto.61cc55aa0453":"Agregar","auto.65c01f7ba330":"Agregue uno a continuaci\xF3n, luego complete el valor inicial con el que debe coincidir.","auto.691b674766e5":"Propiedad de fecha","auto.6d07b3164ac0":"Muestra fechas recurrentes solo dentro de esa cantidad de a\xF1os antes y despu\xE9s del a\xF1o actual.","auto.702e8114bce7":"Adjuntos de eventos","auto.736a07e01797":"Oculta estas entradas: conserva la fuente pero deja de dibujarla en el calendario.","auto.73d64a823b7d":"Agregar etiqueta\u2026","auto.768e0c1c6957":"T\xEDtulo","auto.77dfd2135f4d":"Cancelar","auto.7a3a9094b18c":"Calendario abierto","auto.7a46866bc719":"HOY","auto.7bf039eeb194":"Clave frontal que contiene la fecha: 1990-05-04, o --05-04 cuando se desconoce el a\xF1o.","auto.7bf74c2d99d6":"\xCDcono de entrada: dibujado en cada entrada del calendario de esta fuente. Opcional: d\xE9jelo as\xED para obtener un chip simple.","auto.7c1496f9a7dc":"\xBFEliminar \u201C{{p0}}\u201D?","auto.7eacb0e385b4":"A\xFAn no hay cuentas de calendario conectadas: agregue una en Configuraci\xF3n \u2192 Cuentas.","auto.7f852a5678f1":"Calendar: Establecer vista","auto.7f8a6fad8b7c":"Agregar evento","auto.808d7dca8a74":"Predeterminado","auto.8410192cbb1f":"Ruta del archivo vinculado","auto.85a7de6e2705":"Estrella","auto.86c0a35ec883":"M\xE1s opciones","auto.879e32326c52":"A\xF1o","auto.88d8206d586a":"Hora de inicio","auto.891e9d6d47f1":"Orden del d\xEDa","auto.8bbc96d44546":"C\xF3mo se escribe la fecha en la nota: dd, mm y yyyy con cualquier separador (dd.mm.yyyy, mm/dd/yyyy o dd.mm sin a\xF1o). D\xE9jalo vac\xEDo para detectarlo.","auto.8c41ae88467f":"Persona","auto.8d0a32ed6339":"Regalo","auto.92bcda7f379e":"Icono de entrada","auto.9444501818e6":"Calendarios","auto.94ee88690828":"Formato de fecha","auto.95553ba8a405":"Sin icono","auto.958788fc103f":"Fechas de notas","auto.981f473aa731":"color de contorno","auto.9acc52f8cf89":"Eliminar etiqueta {{p0}}","auto.9ae33a7d0ecb":"Propiedad","auto.9c6e5a3f44fc":"Pastel","auto.9c918414710c":"Alfiler","auto.9ddab8990070":"Mostrar recuento","auto.9eb56535c39a":"Calendar estado de sincronizaci\xF3n","auto.9ee309dcedc9":"Abrir p\xE1gina","auto.9fa90b203761":"Color de entrada","auto.a2590d497e7c":"No hay eventos en esta ventana.","auto.a3cbb98ddf5e":"Nombre de archivo","auto.a3fa4c4a4715":"Valor frontal","auto.a774409a00c2":"Bandera","auto.ad8919ace091":"Evento","auto.ad980036b394":"Toda la b\xF3veda","auto.adab5090ac6a":"Calendario","auto.ae8a5b196587":"S\xED, eliminar","auto.aee875c4edbf":"Propiedad del tiempo de finalizaci\xF3n","auto.b29a9852d77e":"Abrir p\xE1gina Calendar","auto.b2db10062979":"Anotar las fuentes de la fecha","auto.b6f727f0c520":"D\xEDa (mensual)","auto.b82220d034e7":"Clave frontal","auto.bc981983e7f5":"Siguiente","auto.bf2660184858":"Calendar: Ir a la fecha","auto.c2b47c770575":"calendarios sincronizados","auto.c5497bca5846":"Eventos","auto.c66a827e3397":"Abrir nota","auto.c7f73bb54d92":"Configuraci\xF3n","auto.c845e23963ef":'Elimina la fuente "{{p0}}": las notas en s\xED no se modifican.',"auto.cd7800da7f4f":"Hora de finalizaci\xF3n","auto.cfbf9d49c1da":". Elija qu\xE9 calendarios aparecen aqu\xED.","auto.d4198662a72f":"Campana","auto.d4ea5b59b68b":"{{p0}} notas coinciden \xB7 {{p1}} con una fecha utilizable","auto.d5e8ba205867":"Configuraci\xF3n \u2192 Cuentas","auto.d669db3f6b34":"No hay tareas ni eventos este d\xEDa","auto.d75a293ea22a":"Haga clic nuevamente para eliminar esta fuente.","auto.d97d1ee339e4":"Mostrar","auto.dbed7864623f":"Calendar grupo","auto.dd4b99ddaf61":"D\xEDa + mes (anual)","auto.e0db2991e37a":"Agregar etiqueta","auto.e10282ef1972":"Coincidencia de fecha","auto.e16f07326a18":"Calendar: agregar un evento","auto.e6ffec68b5ae":"{{p0}} notas coinciden \xB7 ninguna tiene un {{p1}} utilizable","auto.e7de9576dc00":"Archivo vinculado (ruta de la b\xF3veda)\u2026","auto.ec42f1f55523":"Agregar todo","auto.ee8581831b9c":"Calendar: Ir a hoy","auto.ef5ea5a743b3":"Clave frontal para mostrar","auto.efc007a393f6":"Guardar","auto.f07b365f8502":"Primera hora mostrada en la cuadr\xEDcula semanal (0\u201323). Las horas anteriores se desplazan encima.","auto.f4a0d0857b02":"Borrar {{p0}}","auto.f4e12416c6b8":"Sin art\xEDculos","auto.f6b2246c64fa":"Ning\xFAn grupo","auto.f6fdbe48dc54":"Eliminar","auto.f82be68a7fb4":"Semana","auto.fb3a16f382f8":"Copiar enlace de Valley","auto.fd303c72a405":"Fecha exacta (d\xEDa + mes + a\xF1o)","calendar.action.openAttachment":"Adjunto","calendar.action.openLink":"Enlace","calendar.action.showOnMap":"Mostrar en el mapa","calendar.addAttachment":"A\xF1adir adjunto","calendar.addUrl":"A\xF1adir enlace","calendar.agenda.clearSearch":"Borrar b\xFAsqueda","calendar.agenda.searchLabel":"Buscar en la agenda","calendar.agenda.searchPlaceholder":"Buscar en la agenda\u2026","calendar.attachmentPath":"Ruta del adjunto","calendar.attachmentPlaceholder":"Adjuntar un archivo\u2026","calendar.attachments":"Adjuntos","calendar.badge.attachment":"Adjunto","calendar.badge.link":"Enlace","calendar.badge.location":"Ubicaci\xF3n","calendar.badge.note":"Nota vinculada","calendar.colorRule.folder":"Carpeta","calendar.colorRule.property":"Propiedad","calendar.colorRule.tag":"Hashtag","calendar.command.delete":"Calendario: Eliminar elemento","calendar.command.editFields":"Calendario: Editar campos del elemento","calendar.command.get":"Calendario: Obtener elemento","calendar.command.listItems":"Calendario: Listar todos los elementos","calendar.command.open":"Calendario: Abrir elemento","calendar.command.openCached":"Calendario: Abrir evento en cach\xE9","calendar.command.sourceAction":"Calendario: Ejecutar acci\xF3n del elemento de origen","calendar.command.sourceActions":"Calendario: Listar acciones de los elementos de origen","calendar.command.sourceCreate":"Calendario: Crear elemento de origen","calendar.command.sources":"Calendario: Listar fuentes de elementos","calendar.dayEndHour":"Hora de fin del d\xEDa","calendar.dayEndHourDesc":"\xDAltima hora mostrada en la cuadr\xEDcula semanal (1\u201324). Las horas posteriores se desplazan debajo.","calendar.dayWindowGrows":"Un elemento fuera de la ventana se muestra igualmente: la cuadr\xEDcula crece para alcanzarlo.","calendar.editor.close":"Cerrar","calendar.editor.retry":"Activa o vuelve a cargar el plugin responsable y abre este elemento de nuevo.","calendar.editor.unavailable":"Editor no disponible","calendar.error.changed":"Este evento cambi\xF3 en otro lugar. Tu borrador se conserva. Cancela para cargar la \xFAltima versi\xF3n.","calendar.error.missing":"El elemento del calendario ya no existe.","calendar.error.save":"No se pudo guardar el evento. Tus cambios se conservan.","calendar.field.attachments":"Adjuntos","calendar.field.completed":"Completado","calendar.field.date":"Fecha","calendar.field.endDate":"Fecha de fin","calendar.field.endTime":"Hora de finalizaci\xF3n","calendar.field.filePath":"Archivo vinculado","calendar.field.group":"Grupo","calendar.field.groupId":"Grupo","calendar.field.location":"Ubicaci\xF3n","calendar.field.note":"Notas","calendar.field.priority":"Prioridad","calendar.field.startTime":"Hora de inicio","calendar.field.tags":"Etiquetas","calendar.field.title":"T\xEDtulo","calendar.field.urls":"Enlaces","calendar.filter.deselectAll":"Deseleccionar todo","calendar.filter.events":"Eventos","calendar.filter.groups":"Grupos","calendar.filter.noGroups":"A\xFAn no hay grupos","calendar.filter.noSources":"Sin fuentes","calendar.filter.noteDates":"Fechas de notas","calendar.filter.selectAll":"Seleccionar todo","calendar.filter.sources":"Fuentes","calendar.group.deleteBlocked":"Todav\xEDa lo usan {{p0}} eventos: vac\xEDa el grupo para eliminarlo","calendar.group.global":"Global","calendar.location":"Ubicaci\xF3n","calendar.locationPlaceholder":"Ubicaci\xF3n\u2026","calendar.noteDate.addField":"Agregar campo","calendar.noteDate.addSource":"Agregar fuente","calendar.noteDatePreset.anniversaries":"Aniversarios","calendar.noteDatePreset.birthdays":"Cumplea\xF1os","calendar.noteDatePreset.blank":"Fuente en blanco","calendar.noteDatePreset.deadlines":"Fechas l\xEDmite","calendar.openLocation":"Mostrar en el mapa","calendar.openLocationOf":"Mostrar {{p0}} en el mapa","calendar.overview.accounts":"Cuentas de calendario","calendar.overview.calendars":"Calendarios","calendar.overview.disabled":"Sincronizaci\xF3n desactivada","calendar.overview.loading":"Cargando elemento del calendario\u2026","calendar.overview.month":"Mes","calendar.overview.none":"Ninguna","calendar.overview.plugin":"Plugin activo","calendar.overview.range":"Intervalo seleccionado","calendar.overview.selectedDate":"Fecha seleccionada","calendar.overview.selectedTime":"Hora seleccionada","calendar.overview.sources":"Fuentes visibles","calendar.overview.unavailable":"No se pudieron cargar los detalles del calendario. Vuelve a abrir Propiedades para reintentar.","calendar.overview.view":"Vista","calendar.overview.week":"Semana","calendar.overview.year":"A\xF1o","calendar.plugins.by":"Por","calendar.plugins.configure":"Configurar {{p0}}","calendar.plugins.disable":"Desactivar {{p0}} en Calendario","calendar.plugins.empty":"No hay integraciones de calendario activas.","calendar.plugins.enable":"Activar {{p0}} en Calendario","calendar.plugins.version":"Versi\xF3n:","calendar.priority.high":"Alta","calendar.priority.low":"Baja","calendar.priority.medium":"Media","calendar.priority.none":"Ninguna","calendar.properties.manageGroups":"Gestionar grupos","calendar.quickadd.allDay":"Todo el d\xEDa","calendar.quickadd.details":"Detalles","calendar.quickadd.dueDate":"Fecha l\xEDmite","calendar.quickadd.editTitle":"Editar {{kind}}","calendar.quickadd.endDate":"Fecha de fin","calendar.quickadd.kind":"Qu\xE9 a\xF1adir","calendar.quickadd.priority":"Prioridad","calendar.quickadd.startDate":"Fecha de inicio","calendar.quickadd.when":"Cu\xE1ndo","calendar.removeAttachment":"Quitar adjunto","calendar.removeAttachmentOf":"Quitar adjunto {{p0}}","calendar.removeLocation":"Quitar ubicaci\xF3n","calendar.removeUrl":"Quitar enlace","calendar.removeUrlOf":"Quitar enlace {{p0}}","calendar.settings.groups":"Grupos","calendar.settings.groupsDesc":"Los grupos compartidos se crean y gestionan en la configuraci\xF3n central de Grupos.","calendar.settings.openItemsAgenda":"Agenda del calendario","calendar.settings.openItemsIn":"Abrir elementos en","calendar.settings.openItemsInDesc":"Elige d\xF3nde muestra el elemento un clic normal en el contenido del calendario.","calendar.settings.openItemsOwner":"Plugin propietario","calendar.sync.account":"Sincronizar esta cuenta","calendar.sync.accountsError":"No se pudieron cargar las cuentas. Actualiza para reintentar.","calendar.sync.back":"Volver a las cuentas","calendar.sync.cached":"Los eventos sincronizados anteriormente siguen disponibles.","calendar.sync.calendarsError":"No se pudieron cargar los calendarios. Revisa la conexi\xF3n en Cuentas y reintenta.","calendar.sync.connected":"Conectado","calendar.sync.description":"Elige calendarios de tus cuentas y asigna cada uno a un grupo. Los eventos son de solo lectura.","calendar.sync.failed":"Fall\xF3 la sincronizaci\xF3n del calendario.","calendar.sync.group":"Grupo de {{name}}","calendar.sync.last":"\xDAltima sincronizaci\xF3n: {{time}} \xB7 {{count}} eventos","calendar.sync.loadingAccounts":"Cargando cuentas\u2026","calendar.sync.loadingCalendars":"Cargando calendarios\u2026","calendar.sync.manage":"Administrar cuentas","calendar.sync.noCalendars":"No se encontraron calendarios accesibles para esta cuenta.","calendar.sync.noGroup":"Ning\xFAn grupo","calendar.sync.permission":"Falta el permiso de calendario. Activa Calendario en Cuentas.","calendar.sync.primary":"Calendario predeterminado","calendar.sync.readOnly":"Importa los calendarios seleccionados. Los cambios en Valley no se env\xEDan al proveedor.","calendar.sync.reconnect":"Vuelve a conectar esta cuenta en Cuentas para restaurar el acceso.","calendar.sync.refresh":"Actualizar cuentas y sincronizar","calendar.sync.saveError":"No se pudo guardar la selecci\xF3n de calendarios.","calendar.sync.saved":"Las credenciales OAuth est\xE1n guardadas, pero todav\xEDa no hay ninguna cuenta conectada. Abre Cuentas y elige A\xF1adir conexi\xF3n para autorizar el acceso.","calendar.sync.savedShort":"Credenciales guardadas \xB7 Cuenta sin conectar","calendar.sync.select":"Sincronizar {{name}}","calendar.sync.setup":"Configura este proveedor en Cuentas y autoriza el acceso al calendario.","calendar.sync.setupShort":"Configurar en Cuentas","calendar.undo.addEvent":"Agregar evento \u201C{{title}}\u201D","calendar.undo.deleteEvent":"Eliminar evento \u201C{{title}}\u201D","calendar.undo.editEvent":"Editar evento \u201C{{title}}\u201D","calendar.url":"Enlace","calendar.urlPlaceholder":"https://\u2026","error.commandFailed":"El comando ha fallado. Revisa la entrada e int\xE9ntalo de nuevo.","guard.preset.ask-for-writes":"Preguntar antes de escribir","guard.preset.blocked":"Bloqueado","guard.preset.read-only":"Solo lectura","guard.preset.recommended":"Recomendado","manifest.description":"Planificador de eventos y tareas: agenda en la barra lateral izquierda, calendario compacto a la derecha y una p\xE1gina completa con cuadr\xEDculas de mes/semana/a\xF1o junto a una columna de agenda en vivo.","manifest.name":"Calendario","markdown.examples.agenda":"Agenda","markdown.examples.dateRange":"Intervalo de fechas","markdown.examples.day":"Hoy","markdown.examples.filtered":"Resultados filtrados","markdown.examples.nextSeven":"Pr\xF3ximos siete d\xEDas","markdown.examples.nextThirty":"Pr\xF3ximos treinta d\xEDas","markdown.examples.week":"Semana","plugin.calendar.section.dates":"Fechas de notas","plugin.calendar.section.plugins":"Plugins","plugin.calendar.section.sync":"Calendarios sincronizados","backend.request":"Se esperaba una solicitud de calendario","backend.text":"Texto de solicitud de calendario no v\xE1lido","backend.expired":"La p\xE1gina de eventos del calendario ha caducado","backend.large":"El evento del calendario es demasiado grande","backend.account":"Cuenta de calendario desconocida","backend.permission":"Falta el permiso de calendario. Vuelve a conectar en Ajustes \u2192 Cuentas.","backend.endpoint":"Punto de conexi\xF3n del calendario no v\xE1lido","backend.window":"Intervalo de tiempo del calendario no v\xE1lido","backend.pending":"Demasiados resultados de calendario pendientes","backend.pages":"Se ha superado el l\xEDmite de p\xE1ginas del calendario","backend.continuation":"URL de continuaci\xF3n de Microsoft Graph no v\xE1lida.","backend.microsoft":"No se pudo obtener el calendario de Microsoft Graph: {{status}}","backend.googleList":"No se pudo obtener la lista de Google Calendar: {{status}}","backend.googleFetch":"No se pudo obtener Google Calendar: {{status}}"};var Ar={"auto.02f17370b8d9":"Balises d'\xE9v\xE9nement","auto.04a212215ef9":"Confirmer","auto.04f6b3ea183e":"Horloge","auto.05d290d65a74":"Calendar: lister les \xE9v\xE9nements","auto.0623bfa38c8f":"Port\xE9e du dossier","auto.082bc378cd60":"Mois","auto.0cd372226ee9":"Titre de l'\xE9v\xE9nement\u2026","auto.1389fda4dae3":"Plage de dates r\xE9currente en ann\xE9es","auto.1780c4a5f967":"Aucune source pour l'instant","auto.1a29d1bf66f5":"Noter\u2026","auto.1ac1ff7616a6":"toute la journ\xE9e","auto.1cb00f4b1daf":"Calendrier synchronis\xE9 \xB7 lecture seule","auto.221ca63005ea":"Synchronisation\u2026","auto.22819a02167d":"Allez \xE0 aujourd'hui","auto.240038c46892":"\xC9v\xE9nements \xE0 distance","auto.24345a14377f":"Aujourd'hui","auto.24bdcf2d51f8":"Plage (ann\xE9es)","auto.257ff123e390":"Aucune note ne correspond \xE0 {{p0}} : {{p1}}","auto.2a37335eebda":"C\u0153ur","auto.2ae8981158aa":"\xC9v\xE9nements en lecture seule des comptes connect\xE9s","auto.2b7d938e6787":"Synchroniser maintenant","auto.2bc9464d49e9":"Est \xE9gal \xE0 la valeur","auto.2c924e308820":"Note","auto.33a5a701e541":"Titre de la t\xE2che\u2026","auto.33ce417454bf":"Chargement\u2026","auto.34d8b60fe253":"Masquer","auto.35b023ecbb81":"Nom de la source (par exemple, anniversaires)","auto.3ae5b44a561f":"Exceptions de r\xE9currence","auto.408a0d16a8ba":"Affichez ces entr\xE9es \u2014 remettez cette source sur le calendrier.","auto.418713defbf7":"Aucun \xE9v\xE9nement ou t\xE2che","auto.46fbb53a9be2":"Heure de d\xE9but de journ\xE9e","auto.475b6ce898d4":"Nom de la source","auto.4869ac12717f":"Semaine portes ouvertes","auto.48a7b8889e15":"facultatif","auto.4cb741c63cbd":"Microsoft Calendar","auto.4d064726954a":"Avanc\xE9","auto.4da8c4eff514":"Nom de la source : comment ce groupe est r\xE9pertori\xE9 dans la section \xC0 venir. Cliquez pour le renommer.","auto.4fda04775bdc":"Supprimer ce champ","auto.50b47e47a104":"Synchroniser {{p0}}","auto.50f94286ba30":"Pr\xE9c\xE9dent","auto.519b42369442":"Cl\xE9 de front facultative contenant une heure de d\xE9but HH:MM. Vide \u21D2 une entr\xE9e toute la journ\xE9e.","auto.5210c5c047ea":`Ajoutez le nombre d'ann\xE9es, par ex. "Ada (36)".`,"auto.5301648dcf6b":"Modifier","auto.55f1c767a3b1":"Propri\xE9t\xE9 du titre","auto.570374e4e4cc":"Google Calendar","auto.5d12631f0a8b":"Liens d'\xE9v\xE9nements","auto.611f3791dc68":"Propri\xE9t\xE9 d'heure de d\xE9but","auto.61cc55aa0453":"Ajouter","auto.65c01f7ba330":"Ajoutez-en un ci-dessous, puis remplissez la valeur frontale \xE0 laquelle elle doit correspondre.","auto.691b674766e5":"Propri\xE9t\xE9 de date","auto.6d07b3164ac0":"Afficher les dates r\xE9currentes uniquement dans cette plage d\u2019ann\xE9es avant et apr\xE8s l\u2019ann\xE9e en cours.","auto.702e8114bce7":"Pi\xE8ces jointes \xE0 l'\xE9v\xE9nement","auto.736a07e01797":"Masquez ces entr\xE9es \u2013 conservez la source mais arr\xEAtez de la dessiner sur le calendrier.","auto.73d64a823b7d":"Ajouter une balise\u2026","auto.768e0c1c6957":"Titre","auto.77dfd2135f4d":"Annuler","auto.7a3a9094b18c":"Ouvrir Calendar","auto.7a46866bc719":"AUJOURD'HUI","auto.7bf039eeb194":"Cl\xE9 Frontmatter contenant la date : 1990-05-04, ou --05-04 lorsque l'ann\xE9e est inconnue.","auto.7bf74c2d99d6":"Ic\xF4ne d'entr\xE9e : dessin\xE9e sur chaque entr\xE9e de calendrier provenant de cette source. Facultatif : laissez-le de c\xF4t\xE9 pour une simple puce.","auto.7c1496f9a7dc":"Supprimer \xAB {{p0}} \xBB ?","auto.7eacb0e385b4":"Aucun compte de calendrier connect\xE9 pour le moment : ajoutez-en un dans Param\xE8tres \u2192 Comptes.","auto.7f852a5678f1":"Calendar: d\xE9finir la vue","auto.7f8a6fad8b7c":"Ajouter un \xE9v\xE9nement","auto.808d7dca8a74":"Par d\xE9faut","auto.8410192cbb1f":"Chemin du fichier li\xE9","auto.85a7de6e2705":"\xC9toile","auto.86c0a35ec883":"Plus d'options","auto.879e32326c52":"Ann\xE9e","auto.88d8206d586a":"Heure de d\xE9but","auto.891e9d6d47f1":"Ordre du jour","auto.8bbc96d44546":"Comment la date est \xE9crite dans la note : dd, mm et yyyy avec tous les s\xE9parateurs (dd.mm.yyyy, mm/dd/yyyy ou dd.mm sans ann\xE9e). Laissez vide pour le d\xE9tecter.","auto.8c41ae88467f":"Personne","auto.8d0a32ed6339":"Cadeau","auto.92bcda7f379e":"Ic\xF4ne d'entr\xE9e","auto.9444501818e6":"Calendriers","auto.94ee88690828":"Format des dates","auto.95553ba8a405":"Aucune ic\xF4ne","auto.958788fc103f":"Dates des notes","auto.981f473aa731":"Couleur du contour","auto.9acc52f8cf89":"Supprimer la balise {{p0}}","auto.9ae33a7d0ecb":"Propri\xE9t\xE9","auto.9c6e5a3f44fc":"G\xE2teau","auto.9c918414710c":"\xC9pingle","auto.9ddab8990070":"Afficher le d\xE9compte","auto.9eb56535c39a":"Calendar \xE9tat de synchronisation","auto.9ee309dcedc9":"Ouvrir la page","auto.9fa90b203761":"Couleur d'entr\xE9e","auto.a2590d497e7c":"Aucun \xE9v\xE9nement dans cette fen\xEAtre.","auto.a3cbb98ddf5e":"Nom de fichier","auto.a3fa4c4a4715":"Valeur avant-gardiste","auto.a774409a00c2":"Drapeau","auto.ad8919ace091":"\xC9v\xE9nement","auto.ad980036b394":"Coffre entier","auto.adab5090ac6a":"Calendrier","auto.ae8a5b196587":"Oui, supprimer","auto.aee875c4edbf":"Propri\xE9t\xE9 d'heure de fin","auto.b29a9852d77e":"Ouvrir la page Calendar","auto.b2db10062979":"Notez les sources de dates","auto.b6f727f0c520":"Jour (mensuel)","auto.b82220d034e7":"Cl\xE9 de front","auto.bc981983e7f5":"Suivant","auto.bf2660184858":"Calendar: Aller \xE0 la date","auto.c2b47c770575":"Calendriers synchronis\xE9s","auto.c5497bca5846":"\xC9v\xE9nements","auto.c66a827e3397":"Ouvrir la note","auto.c7f73bb54d92":"Param\xE8tres","auto.c845e23963ef":'Supprimez la source "{{p0}}" : les notes elles-m\xEAmes restent intactes.',"auto.cd7800da7f4f":"Heure de fin","auto.cfbf9d49c1da":". Choisissez les calendriers qui apparaissent ici.","auto.d4198662a72f":"Cloche","auto.d4ea5b59b68b":"{{p0}} notes correspondent \xB7 {{p1}} avec une date utilisable","auto.d5e8ba205867":"Param\xE8tres \u2192 Comptes","auto.d669db3f6b34":"Aucune t\xE2che ni \xE9v\xE9nement ce jour-l\xE0","auto.d75a293ea22a":"Cliquez \xE0 nouveau pour supprimer cette source.","auto.d97d1ee339e4":"Afficher","auto.dbed7864623f":"Calendar groupe","auto.dd4b99ddaf61":"Jour + mois (annuel)","auto.e0db2991e37a":"Ajouter une balise","auto.e10282ef1972":"Correspondance des dates","auto.e16f07326a18":"Calendar: ajouter un \xE9v\xE9nement","auto.e6ffec68b5ae":"{{p0}} notes correspondent \xB7 aucune n'a de {{p1}} utilisable","auto.e7de9576dc00":"Fichier li\xE9 (chemin du coffre-fort)\u2026","auto.ec42f1f55523":"Ajouter une t\xE2che","auto.ee8581831b9c":"Calendar: Acc\xE9dez \xE0 aujourd'hui","auto.ef5ea5a743b3":"Cl\xE9 de front \xE0 afficher","auto.efc007a393f6":"Enregistrer","auto.f07b365f8502":"Premi\xE8re heure affich\xE9e dans la grille hebdomadaire (0\u201323). Les heures pr\xE9c\xE9dentes d\xE9filent au-dessus.","auto.f4a0d0857b02":"Effacer {{p0}}","auto.f4e12416c6b8":"Aucun article","auto.f6b2246c64fa":"Aucun groupe","auto.f6fdbe48dc54":"Supprimer","auto.f82be68a7fb4":"Semaine","auto.fb3a16f382f8":"Copier le lien Valley","auto.fd303c72a405":"Date exacte (jour + mois + ann\xE9e)","calendar.action.openAttachment":"Pi\xE8ce jointe","calendar.action.openLink":"Lien","calendar.action.showOnMap":"Afficher sur la carte","calendar.addAttachment":"Ajouter une pi\xE8ce jointe","calendar.addUrl":"Ajouter un lien","calendar.agenda.clearSearch":"Effacer la recherche","calendar.agenda.searchLabel":"Rechercher dans l\u2019agenda","calendar.agenda.searchPlaceholder":"Rechercher dans l\u2019agenda\u2026","calendar.attachmentPath":"Chemin de la pi\xE8ce jointe","calendar.attachmentPlaceholder":"Joindre un fichier\u2026","calendar.attachments":"Pi\xE8ces jointes","calendar.badge.attachment":"Pi\xE8ce jointe","calendar.badge.link":"Lien","calendar.badge.location":"Lieu","calendar.badge.note":"Note li\xE9e","calendar.colorRule.folder":"Dossier","calendar.colorRule.property":"Propri\xE9t\xE9","calendar.colorRule.tag":"Hashtag","calendar.command.delete":"Calendrier : Supprimer un \xE9l\xE9ment","calendar.command.editFields":"Calendrier : Modifier les champs d\u2019un \xE9l\xE9ment","calendar.command.get":"Calendrier : Lire un \xE9l\xE9ment","calendar.command.listItems":"Calendrier : Lister tous les \xE9l\xE9ments","calendar.command.open":"Calendrier : Ouvrir un \xE9l\xE9ment","calendar.command.openCached":"Calendrier : Ouvrir un \xE9v\xE9nement en cache","calendar.command.sourceAction":"Calendrier : Ex\xE9cuter une action sur un \xE9l\xE9ment source","calendar.command.sourceActions":"Calendrier : Lister les actions des \xE9l\xE9ments sources","calendar.command.sourceCreate":"Calendrier : Cr\xE9er un \xE9l\xE9ment source","calendar.command.sources":"Calendrier : Lister les sources d\u2019\xE9l\xE9ments","calendar.dayEndHour":"Heure de fin de journ\xE9e","calendar.dayEndHourDesc":"Derni\xE8re heure affich\xE9e dans la grille hebdomadaire (1\u201324). Les heures suivantes d\xE9filent en dessous.","calendar.dayWindowGrows":"Un \xE9l\xE9ment hors de la plage reste affich\xE9 \u2014 la grille s\u2019\xE9tend jusqu\u2019\xE0 lui.","calendar.editor.close":"Fermer","calendar.editor.retry":"Activez ou rechargez le plugin concern\xE9, puis r\xE9essayez d\u2019ouvrir cet \xE9l\xE9ment.","calendar.editor.unavailable":"\xC9diteur indisponible","calendar.error.changed":"Cet \xE9v\xE9nement a \xE9t\xE9 modifi\xE9 ailleurs. Votre brouillon est conserv\xE9. Annulez pour charger la derni\xE8re version.","calendar.error.missing":"L\u2019\xE9l\xE9ment du calendrier n\u2019existe plus.","calendar.error.save":"Impossible d\u2019enregistrer l\u2019\xE9v\xE9nement. Vos modifications sont conserv\xE9es.","calendar.field.attachments":"Pi\xE8ces jointes","calendar.field.completed":"Termin\xE9","calendar.field.date":"Date","calendar.field.endDate":"Date de fin","calendar.field.endTime":"Heure de fin","calendar.field.filePath":"Fichier li\xE9","calendar.field.group":"Groupe","calendar.field.groupId":"Groupe","calendar.field.location":"Lieu","calendar.field.note":"Notes","calendar.field.priority":"Priorit\xE9","calendar.field.startTime":"Heure de d\xE9but","calendar.field.tags":"\xC9tiquettes","calendar.field.title":"Titre","calendar.field.urls":"Liens","calendar.filter.deselectAll":"Tout d\xE9s\xE9lectionner","calendar.filter.events":"\xC9v\xE9nements","calendar.filter.groups":"Groupes","calendar.filter.noGroups":"Aucun groupe","calendar.filter.noSources":"Aucune source","calendar.filter.noteDates":"Dates des notes","calendar.filter.selectAll":"Tout s\xE9lectionner","calendar.filter.sources":"Sources","calendar.group.deleteBlocked":"Encore utilis\xE9 par {{p0}} \xE9v\xE9nements \u2014 videz le groupe pour le supprimer","calendar.group.global":"Global","calendar.location":"Lieu","calendar.locationPlaceholder":"Lieu\u2026","calendar.noteDate.addField":"Ajouter un champ","calendar.noteDate.addSource":"Ajouter une source","calendar.noteDatePreset.anniversaries":"Anniversaires","calendar.noteDatePreset.birthdays":"Anniversaires de naissance","calendar.noteDatePreset.blank":"Source vierge","calendar.noteDatePreset.deadlines":"\xC9ch\xE9ances","calendar.openLocation":"Afficher sur la carte","calendar.openLocationOf":"Afficher {{p0}} sur la carte","calendar.overview.accounts":"Comptes de calendrier","calendar.overview.calendars":"Calendriers","calendar.overview.disabled":"Synchronisation d\xE9sactiv\xE9e","calendar.overview.loading":"Chargement de l\u2019\xE9l\xE9ment du calendrier\u2026","calendar.overview.month":"Mois","calendar.overview.none":"Aucune","calendar.overview.plugin":"Plugin actif","calendar.overview.range":"P\xE9riode s\xE9lectionn\xE9e","calendar.overview.selectedDate":"Date s\xE9lectionn\xE9e","calendar.overview.selectedTime":"Heure s\xE9lectionn\xE9e","calendar.overview.sources":"Sources visibles","calendar.overview.unavailable":"Impossible de charger les d\xE9tails du calendrier. Rouvrez Propri\xE9t\xE9s pour r\xE9essayer.","calendar.overview.view":"Vue","calendar.overview.week":"Semaine","calendar.overview.year":"Ann\xE9e","calendar.plugins.by":"Par","calendar.plugins.configure":"Configurer {{p0}}","calendar.plugins.disable":"D\xE9sactiver {{p0}} dans Calendrier","calendar.plugins.empty":"Aucune int\xE9gration de calendrier active.","calendar.plugins.enable":"Activer {{p0}} dans Calendrier","calendar.plugins.version":"Version :","calendar.priority.high":"Haute","calendar.priority.low":"Basse","calendar.priority.medium":"Moyenne","calendar.priority.none":"Aucune","calendar.properties.manageGroups":"G\xE9rer les groupes","calendar.quickadd.allDay":"Toute la journ\xE9e","calendar.quickadd.details":"D\xE9tails","calendar.quickadd.dueDate":"Date d'\xE9ch\xE9ance","calendar.quickadd.editTitle":"Modifier {{kind}}","calendar.quickadd.endDate":"Date de fin","calendar.quickadd.kind":"Que cr\xE9er","calendar.quickadd.priority":"Priorit\xE9","calendar.quickadd.startDate":"Date de d\xE9but","calendar.quickadd.when":"Quand","calendar.removeAttachment":"Supprimer la pi\xE8ce jointe","calendar.removeAttachmentOf":"Supprimer la pi\xE8ce jointe {{p0}}","calendar.removeLocation":"Supprimer le lieu","calendar.removeUrl":"Supprimer le lien","calendar.removeUrlOf":"Supprimer le lien {{p0}}","calendar.settings.groups":"Groupes","calendar.settings.groupsDesc":"Les groupes partag\xE9s sont cr\xE9\xE9s et g\xE9r\xE9s dans les r\xE9glages centraux des groupes.","calendar.settings.openItemsAgenda":"Agenda du calendrier","calendar.settings.openItemsIn":"Ouvrir les \xE9l\xE9ments dans","calendar.settings.openItemsInDesc":"Choisissez o\xF9 un clic normal sur le contenu du calendrier affiche l\u2019\xE9l\xE9ment.","calendar.settings.openItemsOwner":"Plugin propri\xE9taire","calendar.sync.account":"Synchroniser ce compte","calendar.sync.accountsError":"Impossible de charger les comptes. Actualisez pour r\xE9essayer.","calendar.sync.back":"Retour aux comptes","calendar.sync.cached":"Les \xE9v\xE9nements d\xE9j\xE0 synchronis\xE9s restent disponibles.","calendar.sync.calendarsError":"Impossible de charger les calendriers. V\xE9rifiez la connexion dans Comptes et r\xE9essayez.","calendar.sync.connected":"Connect\xE9","calendar.sync.description":"Choisissez des calendriers dans vos comptes et affectez chacun \xE0 un groupe. Les \xE9v\xE9nements sont en lecture seule.","calendar.sync.failed":"\xC9chec de la synchronisation du calendrier.","calendar.sync.group":"Groupe de {{name}}","calendar.sync.last":"Derni\xE8re synchronisation : {{time}} \xB7 {{count}} \xE9v\xE9nements","calendar.sync.loadingAccounts":"Chargement des comptes\u2026","calendar.sync.loadingCalendars":"Chargement des calendriers\u2026","calendar.sync.manage":"G\xE9rer les comptes","calendar.sync.noCalendars":"Aucun calendrier accessible trouv\xE9 pour ce compte.","calendar.sync.noGroup":"Aucun groupe","calendar.sync.permission":"L\u2019acc\xE8s au calendrier manque. Activez Calendrier dans Comptes.","calendar.sync.primary":"Calendrier par d\xE9faut","calendar.sync.readOnly":"Importez les calendriers s\xE9lectionn\xE9s. Les modifications dans Valley ne sont pas transmises au fournisseur.","calendar.sync.reconnect":"Reconnectez ce compte dans Comptes pour r\xE9tablir l\u2019acc\xE8s.","calendar.sync.refresh":"Actualiser les comptes et synchroniser","calendar.sync.saveError":"Impossible d\u2019enregistrer la s\xE9lection de calendriers.","calendar.sync.saved":"Les identifiants OAuth sont enregistr\xE9s, mais aucun compte n\u2019est encore connect\xE9. Ouvrez Comptes et choisissez Ajouter une connexion pour autoriser l\u2019acc\xE8s.","calendar.sync.savedShort":"Identifiants enregistr\xE9s \xB7 Compte non connect\xE9","calendar.sync.select":"Synchroniser {{name}}","calendar.sync.setup":"Configurez ce fournisseur dans Comptes, puis autorisez l\u2019acc\xE8s au calendrier.","calendar.sync.setupShort":"Configurer dans Comptes","calendar.undo.addEvent":`Ajouter l'\xE9v\xE9nement "{{title}}"`,"calendar.undo.deleteEvent":"Supprimer l'\xE9v\xE9nement \xAB\xA0{{title}}\xA0\xBB","calendar.undo.editEvent":`Modifier l'\xE9v\xE9nement "{{title}}"`,"calendar.url":"Lien","calendar.urlPlaceholder":"https://\u2026","error.commandFailed":"La commande a \xE9chou\xE9. V\xE9rifiez les param\xE8tres, puis r\xE9essayez.","guard.preset.ask-for-writes":"Demander avant d\u2019\xE9crire","guard.preset.blocked":"Bloqu\xE9","guard.preset.read-only":"Lecture seule","guard.preset.recommended":"Recommand\xE9","manifest.description":"Planificateur d\u2019\xE9v\xE9nements et de t\xE2ches : agenda dans la barre lat\xE9rale gauche, calendrier compact \xE0 droite et une page compl\xE8te avec des grilles mois/semaine/ann\xE9e \xE0 c\xF4t\xE9 d\u2019une colonne d\u2019agenda en direct.","manifest.name":"Calendrier","markdown.examples.agenda":"Agenda","markdown.examples.dateRange":"P\xE9riode","markdown.examples.day":"Aujourd\u2019hui","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.nextSeven":"Sept prochains jours","markdown.examples.nextThirty":"Trente prochains jours","markdown.examples.week":"Semaine","plugin.calendar.section.dates":"Dates des notes","plugin.calendar.section.plugins":"Plugins","plugin.calendar.section.sync":"Calendriers synchronis\xE9s","backend.request":"Une demande de calendrier est attendue","backend.text":"Texte de demande de calendrier invalide","backend.expired":"La page des \xE9v\xE9nements du calendrier a expir\xE9","backend.large":"L\u2019\xE9v\xE9nement du calendrier est trop volumineux","backend.account":"Compte de calendrier inconnu","backend.permission":"L\u2019autorisation du calendrier manque. Reconnectez-vous dans R\xE9glages \u2192 Comptes.","backend.endpoint":"Adresse du calendrier invalide","backend.window":"P\xE9riode du calendrier invalide","backend.pending":"Trop de r\xE9sultats de calendrier en attente","backend.pages":"La limite de pages du calendrier a \xE9t\xE9 d\xE9pass\xE9e","backend.continuation":"URL de continuation Microsoft Graph invalide.","backend.microsoft":"\xC9chec du chargement du calendrier Microsoft Graph : {{status}}","backend.googleList":"\xC9chec du chargement de la liste Google Agenda : {{status}}","backend.googleFetch":"\xC9chec du chargement de Google Agenda : {{status}}"};var Tr={"auto.02f17370b8d9":"\u4E8B\u4EF6\u6807\u7B7E","auto.04a212215ef9":"\u786E\u8BA4","auto.04f6b3ea183e":"\u65F6\u949F","auto.05d290d65a74":"Calendar\uFF1A\u5217\u51FA\u4E8B\u4EF6","auto.0623bfa38c8f":"\u6587\u4EF6\u5939\u8303\u56F4","auto.082bc378cd60":"\u6708","auto.0cd372226ee9":"\u6D3B\u52A8\u6807\u9898\u2026","auto.1389fda4dae3":"\u91CD\u590D\u65E5\u671F\u8303\u56F4\uFF08\u4EE5\u5E74\u4E3A\u5355\u4F4D\uFF09","auto.1780c4a5f967":"\u8FD8\u6CA1\u6709\u6765\u6E90","auto.1a29d1bf66f5":"\u5907\u6CE8\u2026","auto.1ac1ff7616a6":"\u5168\u5929","auto.1cb00f4b1daf":"\u540C\u6B65\u65E5\u5386\xB7\u53EA\u8BFB","auto.221ca63005ea":"\u6B63\u5728\u540C\u6B65\u2026","auto.22819a02167d":"\u8F6C\u5230\u4ECA\u5929","auto.240038c46892":"\u8FDC\u7A0B\u4E8B\u4EF6","auto.24345a14377f":"\u4ECA\u5929","auto.24bdcf2d51f8":"\u8303\u56F4\uFF08\u5E74\uFF09","auto.257ff123e390":"\u6CA1\u6709\u7B14\u8BB0\u5339\u914D {{p0}}\uFF1A{{p1}}","auto.2a37335eebda":"\u5FC3","auto.2ae8981158aa":"\u8FDE\u63A5\u5E10\u6237\u7684\u53EA\u8BFB\u4E8B\u4EF6","auto.2b7d938e6787":"\u7ACB\u5373\u540C\u6B65","auto.2bc9464d49e9":"\u7B49\u4E8E\u503C","auto.2c924e308820":"\u5907\u6CE8","auto.33a5a701e541":"\u5F85\u529E\u4E8B\u9879\u6807\u9898\u2026","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34d8b60fe253":"\u9690\u85CF","auto.35b023ecbb81":"\u6765\u6E90\u540D\u79F0\uFF08\u4F8B\u5982\u751F\u65E5\uFF09","auto.3ae5b44a561f":"\u91CD\u590D\u6027\u5F02\u5E38","auto.408a0d16a8ba":"\u663E\u793A\u8FD9\u4E9B\u6761\u76EE - \u5C06\u6B64\u6765\u6E90\u653E\u56DE\u5230\u65E5\u5386\u4E0A\u3002","auto.418713defbf7":"\u6CA1\u6709\u4E8B\u4EF6\u6216\u5F85\u529E\u4E8B\u9879","auto.46fbb53a9be2":"\u4E00\u5929\u5F00\u59CB\u65F6\u95F4","auto.475b6ce898d4":"\u6765\u6E90\u540D\u79F0","auto.4869ac12717f":"\u5F00\u653E\u5468","auto.48a7b8889e15":"\u9009\u4FEE\u7684","auto.4cb741c63cbd":"MicrosoftCalendar","auto.4d064726954a":"\u9AD8\u7EA7","auto.4da8c4eff514":"\u6E90\u540D\u79F0 \u2014 \u8BE5\u7EC4\u5728\u201C\u5373\u5C06\u53D1\u5E03\u201D\u90E8\u5206\u4E2D\u7684\u5217\u51FA\u65B9\u5F0F\u3002\u5355\u51FB\u5C06\u5176\u91CD\u547D\u540D\u3002","auto.4fda04775bdc":"\u5220\u9664\u8BE5\u5B57\u6BB5","auto.50b47e47a104":"\u540C\u6B65{{p0}}","auto.50f94286ba30":"\u4E0A\u4E00\u9875","auto.519b42369442":"\u53EF\u9009\u7684 frontmatter \u952E\u5305\u542B HH:MM \u5F00\u59CB\u65F6\u95F4\u3002\u7A7A\u21D2\u5168\u5929\u6761\u76EE\u3002","auto.5210c5c047ea":"\u9644\u52A0\u5E74\u6570\uFF0C\u4F8B\u5982\u201C\u827E\u8FBE\uFF0836\uFF09\u201D\u3002","auto.5301648dcf6b":"\u7F16\u8F91","auto.55f1c767a3b1":"\u4EA7\u6743\u8D22\u4EA7","auto.570374e4e4cc":"GoogleCalendar","auto.5d12631f0a8b":"\u6D3B\u52A8\u94FE\u63A5","auto.611f3791dc68":"\u5F00\u59CB\u65F6\u95F4\u5C5E\u6027","auto.61cc55aa0453":"\u6DFB\u52A0","auto.65c01f7ba330":"\u5728\u4E0B\u9762\u6DFB\u52A0\u4E00\u4E2A\uFF0C\u7136\u540E\u586B\u5199\u5B83\u5E94\u8BE5\u5339\u914D\u7684 frontmatter \u503C\u3002","auto.691b674766e5":"\u65E5\u671F\u5C5E\u6027","auto.6d07b3164ac0":"\u4EC5\u663E\u793A\u5F53\u524D\u5E74\u4EFD\u524D\u540E\u591A\u5E74\u5185\u7684\u91CD\u590D\u65E5\u671F\u3002","auto.702e8114bce7":"\u6D3B\u52A8\u9644\u4EF6","auto.736a07e01797":"\u9690\u85CF\u8FD9\u4E9B\u6761\u76EE\u2014\u2014\u4FDD\u7559\u6765\u6E90\uFF0C\u4F46\u505C\u6B62\u5728\u65E5\u5386\u4E0A\u7ED8\u5236\u5B83\u3002","auto.73d64a823b7d":"\u6DFB\u52A0\u6807\u7B7E\u2026","auto.768e0c1c6957":"\u6807\u9898","auto.77dfd2135f4d":"\u53D6\u6D88","auto.7a3a9094b18c":"\u6253\u5F00Calendar","auto.7a46866bc719":"\u4ECA\u5929","auto.7bf039eeb194":"Frontmatter \u952E\u4FDD\u5B58\u65E5\u671F\uFF1A1990-05-04\uFF0C\u6216 --05-04\uFF08\u5E74\u4EFD\u672A\u77E5\u65F6\uFF09\u3002","auto.7bf74c2d99d6":"\u6761\u76EE\u56FE\u6807 \u2014 \u7ED8\u5236\u5728\u8BE5\u6765\u6E90\u7684\u6BCF\u4E2A\u65E5\u5386\u6761\u76EE\u4E0A\u3002\u53EF\u9009\uFF1A\u5C06\u5176\u4FDD\u7559\u4E3A\u666E\u901A\u82AF\u7247\u3002","auto.7c1496f9a7dc":"\u5220\u9664\u201C{{p0}}\u201D\uFF1F","auto.7eacb0e385b4":"\u5C1A\u672A\u8FDE\u63A5\u65E5\u5386\u5E10\u6237 - \u5728\u201C\u8BBE\u7F6E\u201D\u2192\u201C\u5E10\u6237\u201D\u4E2D\u6DFB\u52A0\u4E00\u4E2A\u3002","auto.7f852a5678f1":"Calendar\uFF1A\u8BBE\u7F6E\u89C6\u56FE","auto.7f8a6fad8b7c":"\u6DFB\u52A0\u4E8B\u4EF6","auto.808d7dca8a74":"\u9ED8\u8BA4","auto.8410192cbb1f":"\u94FE\u63A5\u6587\u4EF6\u8DEF\u5F84","auto.85a7de6e2705":"\u661F\u661F","auto.86c0a35ec883":"\u66F4\u591A\u9009\u9879","auto.879e32326c52":"\u5E74","auto.88d8206d586a":"\u5F00\u59CB\u65F6\u95F4","auto.891e9d6d47f1":"\u65E5\u7A0B","auto.8bbc96d44546":"\u65E5\u671F\u5728\u7B14\u8BB0\u4E2D\u7684\u4E66\u5199\u65B9\u5F0F \u2014 dd\u3001mm \u548C yyyy\uFF0C\u5E26\u6709\u4EFB\u4F55\u5206\u9694\u7B26\uFF08dd.mm.yyyy\u3001mm/dd/yyyy \u6216\u4E0D\u5E26\u5E74\u4EFD\u7684 dd.mm\uFF09\u3002\u7559\u7A7A\u4EE5\u81EA\u52A8\u8BC6\u522B\u3002","auto.8c41ae88467f":"\u4EBA","auto.8d0a32ed6339":"\u793C\u7269","auto.92bcda7f379e":"\u6761\u76EE\u56FE\u6807","auto.9444501818e6":"\u65E5\u5386","auto.94ee88690828":"\u65E5\u671F\u683C\u5F0F","auto.95553ba8a405":"\u65E0\u56FE\u6807","auto.958788fc103f":"\u7B14\u8BB0\u65E5\u671F","auto.981f473aa731":"\u8F6E\u5ED3\u989C\u8272","auto.9acc52f8cf89":"\u5220\u9664\u6807\u7B7E {{p0}}","auto.9ae33a7d0ecb":"\u5C5E\u6027","auto.9c6e5a3f44fc":"\u86CB\u7CD5","auto.9c918414710c":"\u56FE\u9489","auto.9ddab8990070":"\u663E\u793A\u8BA1\u6570","auto.9eb56535c39a":"Calendar \u540C\u6B65\u72B6\u6001","auto.9ee309dcedc9":"\u6253\u5F00\u9875\u9762","auto.9fa90b203761":"\u53C2\u8D5B\u989C\u8272","auto.a2590d497e7c":"\u6B64\u7A97\u53E3\u4E2D\u6CA1\u6709\u4E8B\u4EF6\u3002","auto.a3cbb98ddf5e":"\u6587\u4EF6\u540D","auto.a3fa4c4a4715":"\u6807\u9898\u503C","auto.a774409a00c2":"\u65D7\u5E1C","auto.ad8919ace091":"\u4E8B\u4EF6","auto.ad980036b394":"\u6574\u4E2A\u91D1\u5E93","auto.adab5090ac6a":"\u65E5\u5386","auto.ae8a5b196587":"\u662F\u7684\uFF0C\u5220\u9664","auto.aee875c4edbf":"\u7ED3\u675F\u65F6\u95F4\u5C5E\u6027","auto.b29a9852d77e":"\u6253\u5F00Calendar\u9875\u9762","auto.b2db10062979":"\u6CE8\u610F\u65E5\u671F\u6765\u6E90","auto.b6f727f0c520":"\u65E5\uFF08\u6BCF\u6708\uFF09","auto.b82220d034e7":"Frontmatter \u952E","auto.bc981983e7f5":"\u4E0B\u4E00\u4E2A","auto.bf2660184858":"Calendar\uFF1A\u524D\u5F80\u7EA6\u4F1A","auto.c2b47c770575":"\u540C\u6B65\u65E5\u5386","auto.c5497bca5846":"\u6D3B\u52A8","auto.c66a827e3397":"\u6253\u5F00\u7B14\u8BB0","auto.c7f73bb54d92":"\u8BBE\u7F6E","auto.c845e23963ef":"\u5220\u9664\u201C{{p0}}\u201D\u6E90 - \u6CE8\u91CA\u672C\u8EAB\u4FDD\u6301\u4E0D\u53D8\u3002","auto.cd7800da7f4f":"\u7ED3\u675F\u65F6\u95F4","auto.cfbf9d49c1da":"\u3002\u9009\u62E9\u6B64\u5904\u663E\u793A\u7684\u65E5\u5386\u3002","auto.d4198662a72f":"\u949F","auto.d4ea5b59b68b":"{{p0}} \u6761\u7B14\u8BB0\u5339\u914D \xB7 {{p1}} \u6761\u6709\u53EF\u7528\u65E5\u671F","auto.d5e8ba205867":"\u8BBE\u7F6E \u2192 \u5E10\u6237","auto.d669db3f6b34":"\u8FD9\u4E00\u5929\u6CA1\u6709\u5F85\u529E\u4E8B\u9879\u548C\u6D3B\u52A8","auto.d75a293ea22a":"\u518D\u6B21\u5355\u51FB\u53EF\u5220\u9664\u8BE5\u6E90\u3002","auto.d97d1ee339e4":"\u663E\u793A","auto.dbed7864623f":"Calendar\u7EC4","auto.dd4b99ddaf61":"\u65E5+\u6708\uFF08\u6BCF\u5E74\uFF09","auto.e0db2991e37a":"\u6DFB\u52A0\u6807\u7B7E","auto.e10282ef1972":"\u65E5\u671F\u5339\u914D","auto.e16f07326a18":"Calendar\uFF1A\u6DFB\u52A0\u4E8B\u4EF6","auto.e6ffec68b5ae":"{{p0}} \u6761\u7B14\u8BB0\u5339\u914D \xB7 \u6CA1\u6709\u53EF\u7528\u7684 {{p1}}","auto.e7de9576dc00":"\u94FE\u63A5\u6587\u4EF6\uFF08\u5E93\u8DEF\u5F84\uFF09\u2026","auto.ec42f1f55523":"\u6DFB\u52A0\u5F85\u529E\u4E8B\u9879","auto.ee8581831b9c":"Calendar\uFF1A\u8F6C\u5230\u4ECA\u5929","auto.ef5ea5a743b3":"Frontmatter \u5173\u952E\u8981\u663E\u793A","auto.efc007a393f6":"\u4FDD\u5B58","auto.f07b365f8502":"\u5468\u7F51\u683C\u4E2D\u663E\u793A\u7684\u7B2C\u4E00\u4E2A\u5C0F\u65F6 (0\u201323)\u3002\u8F83\u65E9\u7684\u65F6\u95F4\u5728\u5176\u4E0A\u65B9\u6EDA\u52A8\u3002","auto.f4a0d0857b02":"\u6E05\u9664{{p0}}","auto.f4e12416c6b8":"\u6CA1\u6709\u9879\u76EE","auto.f6b2246c64fa":"\u65E0\u7EC4","auto.f6fdbe48dc54":"\u5220\u9664","auto.f82be68a7fb4":"\u5468","auto.fb3a16f382f8":"\u590D\u5236 Valley \u94FE\u63A5","auto.fd303c72a405":"\u786E\u5207\u65E5\u671F\uFF08\u65E5+\u6708+\u5E74\uFF09","calendar.action.openAttachment":"\u9644\u4EF6","calendar.action.openLink":"\u94FE\u63A5","calendar.action.showOnMap":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","calendar.addAttachment":"\u6DFB\u52A0\u9644\u4EF6","calendar.addUrl":"\u6DFB\u52A0\u94FE\u63A5","calendar.agenda.clearSearch":"\u6E05\u9664\u641C\u7D22","calendar.agenda.searchLabel":"\u641C\u7D22\u65E5\u7A0B","calendar.agenda.searchPlaceholder":"\u641C\u7D22\u65E5\u7A0B\u2026","calendar.attachmentPath":"\u9644\u4EF6\u8DEF\u5F84","calendar.attachmentPlaceholder":"\u9644\u52A0\u6587\u4EF6\u2026","calendar.attachments":"\u9644\u4EF6","calendar.badge.attachment":"\u9644\u4EF6","calendar.badge.link":"\u94FE\u63A5","calendar.badge.location":"\u4F4D\u7F6E","calendar.badge.note":"\u5173\u8054\u7B14\u8BB0","calendar.colorRule.folder":"\u6587\u4EF6\u5939","calendar.colorRule.property":"\u5C5E\u6027","calendar.colorRule.tag":"\u8BDD\u9898\u6807\u7B7E","calendar.command.delete":"\u65E5\u5386\uFF1A\u5220\u9664\u9879\u76EE","calendar.command.editFields":"\u65E5\u5386\uFF1A\u7F16\u8F91\u9879\u76EE\u5B57\u6BB5","calendar.command.get":"\u65E5\u5386\uFF1A\u83B7\u53D6\u9879\u76EE","calendar.command.listItems":"\u65E5\u5386\uFF1A\u5217\u51FA\u6240\u6709\u9879\u76EE","calendar.command.open":"\u65E5\u5386\uFF1A\u6253\u5F00\u9879\u76EE","calendar.command.openCached":"\u65E5\u5386\uFF1A\u6253\u5F00\u7F13\u5B58\u4E8B\u4EF6","calendar.command.sourceAction":"\u65E5\u5386\uFF1A\u6267\u884C\u6765\u6E90\u9879\u76EE\u64CD\u4F5C","calendar.command.sourceActions":"\u65E5\u5386\uFF1A\u5217\u51FA\u6765\u6E90\u9879\u76EE\u7684\u64CD\u4F5C","calendar.command.sourceCreate":"\u65E5\u5386\uFF1A\u521B\u5EFA\u6765\u6E90\u9879\u76EE","calendar.command.sources":"\u65E5\u5386\uFF1A\u5217\u51FA\u9879\u76EE\u6765\u6E90","calendar.dayEndHour":"\u4E00\u5929\u7ED3\u675F\u65F6\u95F4","calendar.dayEndHourDesc":"\u5468\u7F51\u683C\u4E2D\u663E\u793A\u7684\u6700\u540E\u4E00\u4E2A\u5C0F\u65F6 (1\u201324)\u3002\u8F83\u665A\u7684\u65F6\u95F4\u5728\u5176\u4E0B\u65B9\u6EDA\u52A8\u3002","calendar.dayWindowGrows":"\u8D85\u51FA\u6B64\u8303\u56F4\u7684\u6761\u76EE\u4ECD\u4F1A\u663E\u793A\u2014\u2014\u7F51\u683C\u4F1A\u6269\u5C55\u5230\u5B83\u3002","calendar.editor.close":"\u5173\u95ED","calendar.editor.retry":"\u542F\u7528\u6216\u91CD\u65B0\u52A0\u8F7D\u6240\u5C5E\u63D2\u4EF6\uFF0C\u7136\u540E\u518D\u6B21\u6253\u5F00\u6B64\u9879\u76EE\u3002","calendar.editor.unavailable":"\u9879\u76EE\u7F16\u8F91\u5668\u4E0D\u53EF\u7528","calendar.error.changed":"\u6B64\u4E8B\u4EF6\u5DF2\u5728\u5176\u4ED6\u4F4D\u7F6E\u66F4\u6539\u3002\u60A8\u7684\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002\u8BF7\u53D6\u6D88\u4EE5\u52A0\u8F7D\u6700\u65B0\u7248\u672C\u3002","calendar.error.missing":"\u8BE5\u65E5\u5386\u9879\u76EE\u5DF2\u4E0D\u5B58\u5728\u3002","calendar.error.save":"\u65E0\u6CD5\u4FDD\u5B58\u4E8B\u4EF6\u3002\u60A8\u7684\u66F4\u6539\u5DF2\u4FDD\u7559\u3002","calendar.field.attachments":"\u9644\u4EF6","calendar.field.completed":"\u5DF2\u5B8C\u6210","calendar.field.date":"\u65E5\u671F","calendar.field.endDate":"\u7ED3\u675F\u65E5\u671F","calendar.field.endTime":"\u7ED3\u675F\u65F6\u95F4","calendar.field.filePath":"\u94FE\u63A5\u7684\u6587\u4EF6","calendar.field.group":"\u5206\u7EC4","calendar.field.groupId":"\u5206\u7EC4","calendar.field.location":"\u5730\u70B9","calendar.field.note":"\u5907\u6CE8","calendar.field.priority":"\u4F18\u5148\u4E8B\u9879","calendar.field.startTime":"\u5F00\u59CB\u65F6\u95F4","calendar.field.tags":"\u6807\u7B7E","calendar.field.title":"\u6807\u9898","calendar.field.urls":"\u94FE\u63A5","calendar.filter.deselectAll":"\u53D6\u6D88\u5168\u9009","calendar.filter.events":"\u65E5\u7A0B","calendar.filter.groups":"\u5206\u7EC4","calendar.filter.noGroups":"\u6682\u65E0\u5206\u7EC4","calendar.filter.noSources":"\u6CA1\u6709\u6765\u6E90","calendar.filter.noteDates":"\u7B14\u8BB0\u65E5\u671F","calendar.filter.selectAll":"\u5168\u9009","calendar.filter.sources":"\u6765\u6E90","calendar.group.deleteBlocked":"\u4ECD\u6709 {{p0}} \u4E2A\u4E8B\u4EF6\u5728\u4F7F\u7528 \u2014 \u6E05\u7A7A\u540E\u624D\u80FD\u5220\u9664","calendar.group.global":"\u5168\u5C40","calendar.location":"\u4F4D\u7F6E","calendar.locationPlaceholder":"\u4F4D\u7F6E\u2026","calendar.noteDate.addField":"\u6DFB\u52A0\u5B57\u6BB5","calendar.noteDate.addSource":"\u6DFB\u52A0\u6E90","calendar.noteDatePreset.anniversaries":"\u7EAA\u5FF5\u65E5","calendar.noteDatePreset.birthdays":"\u751F\u65E5","calendar.noteDatePreset.blank":"\u7A7A\u767D\u6765\u6E90","calendar.noteDatePreset.deadlines":"\u622A\u6B62\u65E5\u671F","calendar.openLocation":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","calendar.openLocationOf":"\u5728\u5730\u56FE\u4E0A\u663E\u793A{{p0}}","calendar.overview.accounts":"\u65E5\u5386\u8D26\u6237","calendar.overview.calendars":"\u65E5\u5386","calendar.overview.disabled":"\u540C\u6B65\u5DF2\u7981\u7528","calendar.overview.loading":"\u6B63\u5728\u52A0\u8F7D\u65E5\u5386\u9879\u76EE\u2026","calendar.overview.month":"\u6708","calendar.overview.none":"\u65E0","calendar.overview.plugin":"\u6D3B\u52A8\u63D2\u4EF6","calendar.overview.range":"\u6240\u9009\u8303\u56F4","calendar.overview.selectedDate":"\u6240\u9009\u65E5\u671F","calendar.overview.selectedTime":"\u6240\u9009\u65F6\u95F4","calendar.overview.sources":"\u53EF\u89C1\u6765\u6E90","calendar.overview.unavailable":"\u65E0\u6CD5\u52A0\u8F7D\u65E5\u5386\u8BE6\u60C5\u3002\u8BF7\u91CD\u65B0\u6253\u5F00\u201C\u5C5E\u6027\u201D\u4EE5\u91CD\u8BD5\u3002","calendar.overview.view":"\u89C6\u56FE","calendar.overview.week":"\u5468","calendar.overview.year":"\u5E74","calendar.plugins.by":"\u4F5C\u8005","calendar.plugins.configure":"\u914D\u7F6E{{p0}}","calendar.plugins.disable":"\u5728\u65E5\u5386\u4E2D\u505C\u7528{{p0}}","calendar.plugins.empty":"\u6CA1\u6709\u542F\u7528\u7684\u65E5\u5386\u96C6\u6210\u3002","calendar.plugins.enable":"\u5728\u65E5\u5386\u4E2D\u542F\u7528{{p0}}","calendar.plugins.version":"\u7248\u672C\uFF1A","calendar.priority.high":"\u9AD8","calendar.priority.low":"\u4F4E","calendar.priority.medium":"\u4E2D","calendar.priority.none":"\u65E0","calendar.properties.manageGroups":"\u7BA1\u7406\u5206\u7EC4","calendar.quickadd.allDay":"\u5168\u5929","calendar.quickadd.details":"\u8BE6\u60C5","calendar.quickadd.dueDate":"\u622A\u6B62\u65E5\u671F","calendar.quickadd.editTitle":"\u7F16\u8F91{{kind}}","calendar.quickadd.endDate":"\u7ED3\u675F\u65E5\u671F","calendar.quickadd.kind":"\u6DFB\u52A0\u5185\u5BB9","calendar.quickadd.priority":"\u4F18\u5148\u7EA7","calendar.quickadd.startDate":"\u5F00\u59CB\u65E5\u671F","calendar.quickadd.when":"\u65F6\u95F4","calendar.removeAttachment":"\u79FB\u9664\u9644\u4EF6","calendar.removeAttachmentOf":"\u79FB\u9664\u9644\u4EF6{{p0}}","calendar.removeLocation":"\u79FB\u9664\u4F4D\u7F6E","calendar.removeUrl":"\u79FB\u9664\u94FE\u63A5","calendar.removeUrlOf":"\u79FB\u9664\u94FE\u63A5{{p0}}","calendar.settings.groups":"\u5206\u7EC4","calendar.settings.groupsDesc":"\u5171\u4EAB\u5206\u7EC4\u5728\u4E2D\u592E\u5206\u7EC4\u8BBE\u7F6E\u4E2D\u521B\u5EFA\u548C\u7BA1\u7406\u3002","calendar.settings.openItemsAgenda":"\u65E5\u5386\u8BAE\u7A0B","calendar.settings.openItemsIn":"\u6253\u5F00\u9879\u76EE\u7684\u4F4D\u7F6E","calendar.settings.openItemsInDesc":"\u9009\u62E9\u6B63\u5E38\u70B9\u51FB\u65E5\u5386\u5185\u5BB9\u65F6\u5728\u54EA\u4E2A\u4F4D\u7F6E\u663E\u793A\u8BE5\u9879\u76EE\u3002","calendar.settings.openItemsOwner":"\u6240\u5C5E\u63D2\u4EF6","calendar.sync.account":"\u540C\u6B65\u6B64\u8D26\u6237","calendar.sync.accountsError":"\u65E0\u6CD5\u52A0\u8F7D\u8D26\u6237\u3002\u8BF7\u5237\u65B0\u540E\u91CD\u8BD5\u3002","calendar.sync.back":"\u8FD4\u56DE\u8D26\u6237","calendar.sync.cached":"\u4E4B\u524D\u540C\u6B65\u7684\u4E8B\u4EF6\u4ECD\u53EF\u4F7F\u7528\u3002","calendar.sync.calendarsError":"\u65E0\u6CD5\u52A0\u8F7D\u65E5\u5386\u3002\u8BF7\u5728\u201C\u8D26\u6237\u201D\u4E2D\u68C0\u67E5\u8FDE\u63A5\u540E\u91CD\u8BD5\u3002","calendar.sync.connected":"\u5DF2\u8FDE\u63A5","calendar.sync.description":"\u9009\u62E9\u5DF2\u6709\u8D26\u6237\u4E2D\u7684\u65E5\u5386\uFF0C\u5E76\u4E3A\u6BCF\u4E2A\u65E5\u5386\u6307\u5B9A\u5206\u7EC4\u3002\u4E8B\u4EF6\u4E3A\u53EA\u8BFB\u3002","calendar.sync.failed":"\u65E5\u5386\u540C\u6B65\u5931\u8D25\u3002","calendar.sync.group":"{{name}}\u7684\u5206\u7EC4","calendar.sync.last":"\u4E0A\u6B21\u540C\u6B65\uFF1A{{time}} \xB7 {{count}} \u4E2A\u4E8B\u4EF6","calendar.sync.loadingAccounts":"\u6B63\u5728\u52A0\u8F7D\u8D26\u6237\u2026","calendar.sync.loadingCalendars":"\u6B63\u5728\u52A0\u8F7D\u65E5\u5386\u2026","calendar.sync.manage":"\u7BA1\u7406\u8D26\u6237","calendar.sync.noCalendars":"\u672A\u627E\u5230\u6B64\u8D26\u6237\u53EF\u8BFB\u53D6\u7684\u65E5\u5386\u3002","calendar.sync.noGroup":"\u65E0\u7EC4","calendar.sync.permission":"\u7F3A\u5C11\u65E5\u5386\u8BBF\u95EE\u6743\u9650\u3002\u8BF7\u5728\u201C\u8D26\u6237\u201D\u4E2D\u542F\u7528\u65E5\u5386\u3002","calendar.sync.primary":"\u9ED8\u8BA4\u65E5\u5386","calendar.sync.readOnly":"\u5BFC\u5165\u6240\u9009\u65E5\u5386\u3002\u5728 Valley \u4E2D\u6240\u505A\u7684\u66F4\u6539\u4E0D\u4F1A\u53D1\u9001\u7ED9\u670D\u52A1\u5546\u3002","calendar.sync.reconnect":"\u8BF7\u5728\u201C\u8D26\u6237\u201D\u4E2D\u91CD\u65B0\u8FDE\u63A5\u6B64\u8D26\u6237\u4EE5\u6062\u590D\u8BBF\u95EE\u3002","calendar.sync.refresh":"\u5237\u65B0\u8D26\u6237\u5E76\u540C\u6B65","calendar.sync.saveError":"\u65E0\u6CD5\u4FDD\u5B58\u65E5\u5386\u9009\u62E9\u3002","calendar.sync.saved":"OAuth \u51ED\u636E\u5DF2\u4FDD\u5B58\uFF0C\u4F46\u5C1A\u672A\u8FDE\u63A5\u8D26\u6237\u3002\u8BF7\u6253\u5F00\u201C\u8D26\u6237\u201D\uFF0C\u9009\u62E9\u201C\u6DFB\u52A0\u8FDE\u63A5\u201D\u4EE5\u6388\u6743\u8BBF\u95EE\u3002","calendar.sync.savedShort":"\u51ED\u636E\u5DF2\u4FDD\u5B58 \xB7 \u8D26\u6237\u672A\u8FDE\u63A5","calendar.sync.select":"\u540C\u6B65{{name}}","calendar.sync.setup":"\u8BF7\u5728\u201C\u8D26\u6237\u201D\u4E2D\u8BBE\u7F6E\u6B64\u670D\u52A1\u5546\uFF0C\u7136\u540E\u6388\u6743\u8BBF\u95EE\u65E5\u5386\u3002","calendar.sync.setupShort":"\u5728\u201C\u8D26\u6237\u201D\u4E2D\u8BBE\u7F6E","calendar.undo.addEvent":"\u6DFB\u52A0\u4E8B\u4EF6\u201C{{title}}\u201D","calendar.undo.deleteEvent":"\u5220\u9664\u6D3B\u52A8\u201C{{title}}\u201D","calendar.undo.editEvent":"\u7F16\u8F91\u6D3B\u52A8\u201C{{title}}\u201D","calendar.url":"\u94FE\u63A5","calendar.urlPlaceholder":"https://\u2026","error.commandFailed":"\u547D\u4EE4\u6267\u884C\u5931\u8D25\u3002\u8BF7\u68C0\u67E5\u8F93\u5165\u540E\u91CD\u8BD5\u3002","guard.preset.ask-for-writes":"\u5199\u5165\u524D\u8BE2\u95EE","guard.preset.blocked":"\u5DF2\u963B\u6B62","guard.preset.read-only":"\u53EA\u8BFB","guard.preset.recommended":"\u63A8\u8350","manifest.description":"\u4E8B\u4EF6\u4E0E\u5F85\u529E\u89C4\u5212\uFF1A\u5DE6\u4FA7\u680F\u8BAE\u7A0B\u3001\u53F3\u4FA7\u680F\u7D27\u51D1\u65E5\u5386\uFF0C\u4EE5\u53CA\u5305\u542B\u6708/\u5468/\u5E74\u7F51\u683C\u4E0E\u5B9E\u65F6\u8BAE\u7A0B\u680F\u7684\u5B8C\u6574\u5DE5\u4F5C\u533A\u9875\u9762\u3002","manifest.name":"\u65E5\u5386","markdown.examples.agenda":"\u65E5\u7A0B","markdown.examples.dateRange":"\u65E5\u671F\u8303\u56F4","markdown.examples.day":"\u4ECA\u5929","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.nextSeven":"\u672A\u6765\u4E03\u5929","markdown.examples.nextThirty":"\u672A\u6765\u4E09\u5341\u5929","markdown.examples.week":"\u5468","plugin.calendar.section.dates":"\u7B14\u8BB0\u65E5\u671F","plugin.calendar.section.plugins":"\u63D2\u4EF6","plugin.calendar.section.sync":"\u540C\u6B65\u65E5\u5386","backend.request":"\u9700\u8981\u65E5\u5386\u8BF7\u6C42","backend.text":"\u65E5\u5386\u8BF7\u6C42\u6587\u672C\u65E0\u6548","backend.expired":"\u65E5\u5386\u4E8B\u4EF6\u9875\u9762\u5DF2\u8FC7\u671F","backend.large":"\u65E5\u5386\u4E8B\u4EF6\u8FC7\u5927","backend.account":"\u672A\u77E5\u7684\u65E5\u5386\u8D26\u6237","backend.permission":"\u7F3A\u5C11\u65E5\u5386\u6743\u9650\u3002\u8BF7\u5728\u8BBE\u7F6E \u2192 \u8D26\u6237\u4E2D\u91CD\u65B0\u8FDE\u63A5\u3002","backend.endpoint":"\u65E5\u5386\u7AEF\u70B9\u65E0\u6548","backend.window":"\u65E5\u5386\u65F6\u95F4\u8303\u56F4\u65E0\u6548","backend.pending":"\u5F85\u5904\u7406\u7684\u65E5\u5386\u7ED3\u679C\u8FC7\u591A","backend.pages":"\u5DF2\u8D85\u51FA\u65E5\u5386\u5206\u9875\u9650\u5236","backend.continuation":"Microsoft Graph \u540E\u7EED\u9875\u9762 URL \u65E0\u6548\u3002","backend.microsoft":"Microsoft Graph \u65E5\u5386\u83B7\u53D6\u5931\u8D25\uFF1A{{status}}","backend.googleList":"Google \u65E5\u5386\u5217\u8868\u83B7\u53D6\u5931\u8D25\uFF1A{{status}}","backend.googleFetch":"Google \u65E5\u5386\u83B7\u53D6\u5931\u8D25\uFF1A{{status}}"};var Nr={en:Er,de:Ir,es:Dr,fr:Ar,"zh-CN":Tr};function Pr(e,t){return(Nr.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(r,o)=>String(t?.[o]??""))}var Mr=Pr;function Lr(e){e.ui.registerCatalogs(Nr),Mr=(t,n)=>{let r=e.ui.t(t,n);return r===t?Pr(t,n):r}}function d(e,t){return Mr(e,t)}function q(e,t=""){return typeof e=="string"?e:t}function Or(e,t=!1){return typeof e=="boolean"?e:t}function $t(e){let t=q(e).trim();return/^([01]\d|2[0-3]):[0-5]\d$/.test(t)?t:void 0}function _r(e){let t=q(e).trim().toLowerCase();return/^#[0-9a-f]{6}$/.test(t)?t:void 0}var vd=16384,wd=/^[A-Za-z0-9][A-Za-z0-9_-]*$/;function xd(e){if(!e||e.length>vd||!/^[A-Za-z0-9_-]+$/.test(e))return null;try{let t=e.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-e.length%4)%4),n=atob(t),r=Uint8Array.from(n,i=>i.charCodeAt(0)),o=JSON.parse(new TextDecoder().decode(r));return o.v!==1||!o.state||typeof o.state!="object"||Array.isArray(o.state)?null:o.state}catch{return null}}function kd(e){try{let t=new URL(e);if(t.protocol!==`${rr}:`||t.hostname!==or)return null;let n=mn(t.searchParams.get("file"));if(n)return{kind:"file",relPath:n};let r=t.searchParams.get("plugin")??"";if(!wd.test(r))return null;let o=xd(t.searchParams.get("state")??""),i=t.searchParams.get("surface");if(i&&!["main_workspace","left_sidebar","right_sidebar","footer"].includes(i))return null;let s=t.searchParams.get("instance");return s&&s.length>512?null:o?{kind:"plugin",pluginId:r,state:o,...i?{surface:i}:{},...s?{instanceId:s}:{}}:null}catch{return null}}function xa(e){let t=kd(e);return t?.kind==="file"?t.relPath:null}function zr(e){try{return ir.includes(new URL(e).protocol)}catch{return!1}}var Fr=new Date(2023,0,1,12);function Je(e,t,n="short"){let r=new Date(Fr);return r.setDate(Fr.getDate()+(e%7+7)%7),new Intl.DateTimeFormat(t,{weekday:n}).format(r)}function et(e,t,n="short"){return new Intl.DateTimeFormat(t,{month:n}).format(new Date(2023,e,1,12))}var ra={sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6};function yt(e){let t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),n=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-n);let r=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t.getTime()-r.getTime())/864e5+1)/7)}function Re(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function vn(e,t){return(e.getDay()-t+7)%7}function Kt(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()-vn(e,t))}function ka(e,t,n){let r=new Date(e,t,1),o=new Date(e,t,1-vn(r,n));return Array.from({length:42},(i,s)=>{let l=new Date(o);return l.setDate(o.getDate()+s),l})}function Ca(e){return Array.from({length:7},(t,n)=>(e+n)%7)}function Q(e){let t=String(e.getFullYear()),n=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${r}`}function me(e){let[t,n,r]=e.split("-").map(o=>parseInt(o,10));return new Date(t,(n||1)-1,r||1)}function $r(e){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}var Rt="calendar.events",xn="calendar.event_tags",Sa="calendar.event_links",Ea="calendar.event_attachments";function tt(e){let t=[Rt,xn,Sa,Ea].map(n=>m.data.dataset(n).subscribe(e));return()=>t.forEach(n=>n())}function Kr(e){return e===!0}function kn(e){if(typeof e!="string")return;let t=e.trim();if(t)return xa(t)||zr(t)?t:void 0}function Rr(e){let t=Array.isArray(e)?e:[],n=[];for(let r of t){let o=kn(r);o&&!n.includes(o)&&n.push(o)}return n.length>0?n:void 0}function Gr(e){let t=Array.isArray(e)?e:[],n=[];for(let r of t){let o=ga(r);o&&!n.includes(o)&&n.push(o)}return n.length>0?n:void 0}function Cd(e){if(!e||typeof e!="object")return;let t=e,n=q(t.name).trim();if(!n)return;let r=typeof t.lng=="number"&&Number.isFinite(t.lng)?t.lng:void 0,o=typeof t.lat=="number"&&Number.isFinite(t.lat)?t.lat:void 0;return r!==void 0&&o!==void 0?{name:n,lng:r,lat:o}:{name:n}}function jr(e,t){let n=q(t).slice(0,10);return n&&e&&n>e?n:void 0}function Vr(e){return e.startsWith("google:")||e.startsWith("microsoft:")}function Ia(e){let t=new Date().toISOString(),n=q(e.id,`event_${Date.now().toString(36)}`),r=q(e.createdAt,t),o=$t(e.startTime),i=$t(e.endTime),s=q(e.date).slice(0,10);return{id:n,title:q(e.title).trim(),date:s,endDate:jr(s,e.endDate),startTime:o,endTime:i,allDay:Kr(e.allDay)||!o&&!i,color:_r(e.color),category:q(e.category).trim()||void 0,groupId:q(e.groupId).trim()||void 0,group:q(e.group).trim()||void 0,location:Cd(e.location),urls:Rr(e.urls),attachments:Gr(e.attachments),tags:Array.isArray(e.tags)?e.tags.filter(l=>typeof l=="string"&&!!l.trim()).map(l=>l.trim()):[],note:q(e.note),filePath:ga(e.filePath),createdAt:r,updatedAt:q(e.updatedAt,r),source:q(e.source).trim()||void 0,accountId:q(e.accountId).trim()||void 0,readOnly:Kr(e.readOnly)||void 0}}function Hr(e){return{id:e.id,calendarId:null,providerId:null,title:e.title,date:e.date,endDate:e.endDate??null,startTime:e.startTime??null,endTime:e.endTime??null,allDay:e.allDay??null,timezone:null,color:e.color??null,category:e.category??null,groupId:e.groupId??null,group:e.group??null,location:e.location??null,note:e.note,filePath:e.filePath??null,createdAt:e.createdAt,updatedAt:e.updatedAt,source:e.source??null,accountId:e.accountId??null,readOnly:e.readOnly??null,recurrenceRule:null,recurrenceMasterId:null}}async function wn(e,t){let n=[],r;do{let o=await m.data.dataset(e).query({where:t,limit:1e3,cursor:r});n.push(...o.rows),r=o.cursor}while(r);return n}async function Ur(e,t=!0){let n=async s=>{if(!e)return wn(s);let l=[];for(let c=0;c<e.length;c+=100)l.push(...await wn(s,{eventId:{in:e.slice(c,c+100)}}));return l},[r,o,i]=await Promise.all([t?n(xn):[],n(Sa),n(Ea)]);return{tags:r,links:o,attachments:i}}function qr(e,t=!0){return[...t?e.tags.map(n=>({dataset:xn,operation:"insert",values:{eventId:e.id,tag:n}})):[],...(e.urls??[]).map((n,r)=>({dataset:Sa,operation:"insert",values:{eventId:e.id,position:r,url:n}})),...(e.attachments??[]).map((n,r)=>({dataset:Ea,operation:"insert",values:{eventId:e.id,position:r,path:n}}))]}function Br(e){return{...e,endDate:jr(e.date,e.endDate),filePath:ga(e.filePath),urls:Rr(e.urls),attachments:Gr(e.attachments)}}async function Oe(e,t){let n=e&&t?{date:{lte:t},or:[{endDate:{gte:e}},{endDate:{isNull:!0},date:{gte:e}}]}:void 0,r=await wn(Rt,n);if(!r.length)return[];let o=await Ur(n?r.map(u=>String(u.id)):void 0),i=(u,f=!1)=>{let h=new Map;for(let g of u){let w=h.get(g.eventId);w?w.push(g):h.set(g.eventId,[g])}if(f)for(let g of h.values())g.sort((w,S)=>Number(w.position)-Number(S.position));return h},s=i(o.tags),l=i(o.links,!0),c=i(o.attachments,!0);return r.map(u=>Ia({...u,tags:(s.get(u.id)??[]).map(f=>f.tag),urls:(l.get(u.id)??[]).map(f=>f.url),attachments:(c.get(u.id)??[]).map(f=>f.path)})).filter(u=>u.title&&u.date)}async function vt(e){let t=Br(e);try{return await m.data.transaction([{dataset:Rt,operation:"insert",values:Hr(t)},...qr(t)]),!0}catch{return!1}}async function bt(e,t,n,r){let o=Br({...t,id:e});try{let i={pluginId:m.pluginId,sourceId:"events",itemId:e},s=await m.documents.read(i);if(!s||n!==void 0&&(await m.data.dataset(Rt).get({id:e}))?.updatedAt!==n)return!1;let l=await Ur([e],!1),c=Hr(o);return delete c.id,delete c.note,await m.documents.update(i,{expectedRevision:r?.expectedRevision??s.revision,vaultGeneration:r?.vaultGeneration??s.vaultGeneration,body:o.note,explicitTags:o.tags??[],operations:[{dataset:Rt,operation:"update",key:{id:e},values:c},...l.links.map(u=>({dataset:Sa,operation:"delete",key:{eventId:e,position:Number(u.position)}})),...l.attachments.map(u=>({dataset:Ea,operation:"delete",key:{eventId:e,position:Number(u.position)}})),...qr(o,!1)]}),!0}catch{return!1}}async function Gt(e){try{return(await m.data.dataset(Rt).delete({id:e})).affected>0}catch{return!1}}async function Wr(e){if(!e.id||!e.title.trim()||!e.date)return!1;let t=await vt(e);return t&&m.undo.push({label:d("calendar.undo.addEvent",{title:e.title.trim()}),undo:async()=>({ok:await Gt(e.id)}),redo:async()=>({ok:await vt(e)})}),t}async function Da(e,t,n,r){if(!e||!t.title.trim()||Vr(e))return!1;let o=(await Oe()).find(s=>s.id===e),i=await bt(e,t,n,r);return i&&o&&m.undo.push({label:d("calendar.undo.editEvent",{title:o.title}),undo:async()=>({ok:await bt(e,o)}),redo:async()=>({ok:await bt(e,t)})}),i}async function Yr(e){if(Vr(e))return!1;let t=(await Oe()).find(r=>r.id===e),n=await Gt(e);return n&&t&&m.undo.push({label:d("calendar.undo.deleteEvent",{title:t.title}),undo:async()=>({ok:await vt(t)}),redo:async()=>({ok:await Gt(e)})}),n}function Aa(e,t,n){let r=new Date().toISOString();return{id:$r("event"),title:e.trim(),date:t,tags:[],note:"",allDay:!n?.startTime&&!n?.endTime,...n,createdAt:r,updatedAt:r}}var L="#12120f",N="#ffffff",Cn=[{id:"green",family:"semantic",labelKey:"color.green",light:"#247a52",reading:"#667a46",dark:"#65e6ad",onLight:N,onReading:N,onDark:L},{id:"red",family:"semantic",labelKey:"color.red",light:"#c93445",reading:"#a65a4a",dark:"#ff6b7a",onLight:N,onReading:N,onDark:L},{id:"amber",family:"semantic",labelKey:"color.amber",light:"#a85e00",reading:"#8c5900",dark:"#ffc45c",onLight:N,onReading:N,onDark:L},{id:"blue",family:"semantic",labelKey:"color.blue",light:"#0075b2",reading:"#2c69a3",dark:"#90cfff",onLight:N,onReading:N,onDark:L},{id:"yellow",family:"semantic",labelKey:"color.yellow",light:"#9b9000",reading:"#8a8215",dark:"#f2e664",onLight:L,onReading:L,onDark:L},{id:"orange",family:"semantic",labelKey:"color.orange",light:"#bf5200",reading:"#9b4801",dark:"#fc8c50",onLight:N,onReading:N,onDark:L},{id:"purple",family:"semantic",labelKey:"color.purple",light:"#8149c0",reading:"#7a4c97",dark:"#c095fc",onLight:N,onReading:N,onDark:L},{id:"pink",family:"semantic",labelKey:"color.pink",light:"#c33e78",reading:"#a85068",dark:"#ff9ec4",onLight:N,onReading:N,onDark:L},{id:"brown",family:"semantic",labelKey:"color.brown",light:"#78490b",reading:"#6d4619",dark:"#c7925c",onLight:N,onReading:N,onDark:L},{id:"black",family:"semantic",labelKey:"color.black",light:"#0d0d0f",reading:"#1c1712",dark:"#3a3a3c",onLight:N,onReading:N,onDark:N},{id:"white",family:"semantic",labelKey:"color.white",light:"#fbfbfd",reading:"#fdf8ee",dark:"#f4f4f6",onLight:L,onReading:L,onDark:L},{id:"gray",family:"semantic",labelKey:"color.gray",light:"#717881",reading:"#736e66",dark:"#c3cbd5",onLight:N,onReading:N,onDark:L},{id:"violet",family:"semantic",labelKey:"color.violet",light:"#873aa6",reading:"#76397c",dark:"#c17fde",onLight:N,onReading:N,onDark:L},{id:"cyan",family:"semantic",labelKey:"color.cyan",light:"#008e9b",reading:"#008282",dark:"#68dfed",onLight:L,onReading:N,onDark:L},{id:"magenta",family:"semantic",labelKey:"color.magenta",light:"#b02184",reading:"#983f6c",dark:"#ec7bc0",onLight:N,onReading:N,onDark:L},{id:"indigo",family:"semantic",labelKey:"color.indigo",light:"#5140b4",reading:"#583f94",dark:"#9b97f7",onLight:N,onReading:N,onDark:L},{id:"muted-green",family:"muted",labelKey:"color.mutedGreen",light:"#325c4c",reading:"#4f6148",dark:"#99ccaa",onLight:N,onReading:N,onDark:L},{id:"muted-red",family:"muted",labelKey:"color.mutedRed",light:"#9f5c54",reading:"#8b5b4f",dark:"#e4a197",onLight:N,onReading:N,onDark:L},{id:"muted-gold",family:"muted",labelKey:"color.mutedGold",light:"#918349",reading:"#7a6b3a",dark:"#ddce93",onLight:L,onReading:N,onDark:L},{id:"muted-blue",family:"muted",labelKey:"color.mutedBlue",light:"#5a7ea3",reading:"#5f7390",dark:"#84acd6",onLight:L,onReading:N,onDark:L},{id:"muted-violet",family:"muted",labelKey:"color.mutedViolet",light:"#826299",reading:"#7a5d80",dark:"#c7aade",onLight:N,onReading:N,onDark:L},{id:"primary-blue",family:"accent",labelKey:"color.primaryBlue",light:"#2a66db",reading:"#4b5fb0",dark:"#90b7ff",onLight:N,onReading:N,onDark:L},{id:"teal",family:"accent",labelKey:"color.teal",light:"#007066",reading:"#006b55",dark:"#5dcdbf",onLight:N,onReading:N,onDark:L},{id:"gold",family:"accent",labelKey:"color.gold",light:"#866200",reading:"#94711f",dark:"#d8b262",onLight:N,onReading:N,onDark:L},{id:"rose",family:"accent",labelKey:"color.rose",light:"#861a50",reading:"#762843",dark:"#dd7aa1",onLight:N,onReading:N,onDark:L},{id:"maroon",family:"categorical",labelKey:"color.maroon",light:"#75061c",reading:"#661e1b",dark:"#e66d71",onLight:N,onReading:N,onDark:L},{id:"coral",family:"categorical",labelKey:"color.coral",light:"#d6673f",reading:"#ba6742",dark:"#ffad90",onLight:L,onReading:L,onDark:L},{id:"sand",family:"categorical",labelKey:"color.sand",light:"#a8885e",reading:"#967b5a",dark:"#f2d6b1",onLight:L,onReading:L,onDark:L},{id:"olive",family:"categorical",labelKey:"color.olive",light:"#636d11",reading:"#63611b",dark:"#b0be60",onLight:N,onReading:N,onDark:L},{id:"lime",family:"categorical",labelKey:"color.lime",light:"#5b9a25",reading:"#597f27",dark:"#a8eb7a",onLight:L,onReading:N,onDark:L},{id:"forest",family:"categorical",labelKey:"color.forest",light:"#215e29",reading:"#355828",dark:"#6caa71",onLight:N,onReading:N,onDark:L},{id:"mint",family:"categorical",labelKey:"color.mint",light:"#2d9e87",reading:"#438e71",dark:"#a4f0dc",onLight:L,onReading:L,onDark:L},{id:"sky",family:"categorical",labelKey:"color.sky",light:"#3397c7",reading:"#4985b1",dark:"#aae0ff",onLight:L,onReading:L,onDark:L},{id:"navy",family:"categorical",labelKey:"color.navy",light:"#223f94",reading:"#333c77",dark:"#6f92e5",onLight:N,onReading:N,onDark:L},{id:"plum",family:"categorical",labelKey:"color.plum",light:"#a552a3",reading:"#9a5a90",dark:"#f1a6ee",onLight:N,onReading:N,onDark:L},{id:"slate",family:"categorical",labelKey:"color.slate",light:"#50627a",reading:"#4e586b",dark:"#aab9cc",onLight:N,onReading:N,onDark:L}],Sd=["semantic","muted","accent","categorical"];var pu=new Map(Cn.map(e=>[e.id,e])),Ed={semantic:"Semantic",muted:"Muted",accent:"Accent & brand",categorical:"Categorical"},Id=new Map(Cn.map(e=>[e.id,e.labelKey.replace(/^color\./,"").replace(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase())])),Dd=/^[a-z][a-z0-9-]{0,47}$/,Ad={version:4,families:Sd.map(e=>({id:e,name:Ed[e]})),colors:Cn.map(e=>({id:e.id,familyId:e.family,name:Id.get(e.id)??e.id,light:e.light,reading:e.reading,dark:e.dark})),archived:[]},Td=e=>({version:4,families:e.families.map(t=>({...t})),colors:e.colors.map(t=>({...t})),archived:e.archived.map(t=>({...t}))});var mu=Td(Ad);var Xr=["primary-blue","yellow","green","violet","orange","mint","rose","cyan","lime","brown","gold","blue","magenta","olive","navy","gray","teal","indigo","coral","sky","purple","forest","plum","sand","slate","pink","red"],Ta="palette:",Nd=/^#[0-9a-f]{6}$/i;function Zr(e){return e.startsWith(Ta)&&Dd.test(e.slice(Ta.length))}function Te(e){return`${Ta}${e}`}function Sn(e){return Zr(e)?e.slice(Ta.length):void 0}function Qr(e){if(typeof e!="string")return;let t=e.trim();return Zr(t)?t:Nd.test(t)?t.toLowerCase():void 0}function ce(e){let t=Sn(e);return t?`var(--color-${t})`:e}function Jr(e){let t=Sn(e);return t?`var(--color-${t}-on)`:"var(--title-color)"}function Na(e){let t=new Set(e.map(n=>Sn(n)??n.toLowerCase()));return Te(Xr.find(n=>!t.has(n))??Xr[0])}function Ge(e){return e.trim().toLowerCase()}function Pd(e,t,n){if(!Array.isArray(e))return[];let r=[];for(let o of e){let i=typeof o=="string"?o.trim():"",s=Ge(i);!s||s===Ge(t)||n.has(s)||(n.add(s),r.push(i))}return r}function Md(e){return`group_${Ge(e).replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"group"}`}function Pa(e){if(!Array.isArray(e))return[];let t=[],n=new Set;for(let r of e){if(!r||typeof r!="object")continue;let o=r,i=typeof o.name=="string"?o.name.trim():"",s=Ge(i);if(!i||n.has(s))continue;n.add(s);let l=typeof o.id=="string"&&o.id.trim()?o.id.trim():Md(i),c=Qr(o.color)??Na(t.map(f=>f.color)),u=Pd(o.aliases,i,n);t.push({id:l,name:i,color:c,...u.length?{aliases:u}:{}})}return t}function eo(e,t){let n=Ge(t??"");if(n)return e.find(r=>Ge(r.name)===n||(r.aliases??[]).some(o=>Ge(o)===n))}function to(e){let t={};for(let n of e){let r=Ge(n??"");r&&(t[r]=(t[r]??0)+1)}return t}function En(){return Pa(m.getState().groups)}function ao(){let e=!1,t=()=>{Oe().then(i=>{if(e)return;let s=En(),l=i.map(u=>s.find(f=>f.id===u.groupId)?.name),c=Object.values(be().remoteCalendars).flatMap(u=>Object.values(u).map(f=>s.find(h=>h.id===f.groupId)?.name));m.workspace.reportGroupUsage(to([...l,...c]))})};t();let n=tt(t),r=m.subscribe(t),o=m.settings.subscribe(t);return()=>{e=!0,n(),r(),o(),m.workspace.reportGroupUsage({})}}function no(e,t){return be().remoteCalendars[e]?.[t.id]?.enabled??t.primary}function Ld(e){return!e||typeof e!="object"||Array.isArray(e)?{}:Object.fromEntries(Object.entries(e).flatMap(([t,n])=>!n||typeof n!="object"||Array.isArray(n)?[]:[[t,Object.fromEntries(Object.entries(n).flatMap(([r,o])=>{if(!o||typeof o!="object"||Array.isArray(o))return[];let i=o;return[[r,{...typeof i.enabled=="boolean"?{enabled:i.enabled}:{},...typeof i.groupId=="string"?{groupId:i.groupId}:{}}]]}))]]))}var Ma="hiddenGroups",jt="hiddenSources",ro="itemClickTarget",wt="calendar:events",xt="calendar:noteDates",La=e=>`calendar:plugin:${e}`,Dn=7,An=22,Od="owner";function In(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function oo(e,t,n=23){return typeof e=="number"&&Number.isFinite(e)&&e>=0&&e<=n?Math.round(e):t}function _d(e){return e==="agenda"||e==="owner"?e:Od}function zd(e,t){let n=oo(e,An,24);return n>t?n:Math.min(t+1,24)}function be(){let e=m.settings.get(),t=oo(e.dayStartHour,Dn);return{groups:Pa(En()),dayStartHour:t,dayEndHour:zd(e.dayEndHour,t),disabledCalendarAccounts:In(e.disabledCalendarAccounts),remoteCalendars:Ld(e.remoteCalendars),hiddenGroups:In(e.hiddenGroups),hiddenSources:In(e.hiddenSources).filter(n=>!n.startsWith("provider-")),itemClickTarget:_d(e.itemClickTarget)}}function Fe(){let[e,t]=a.useState(be);return a.useEffect(()=>{let n=()=>t(be()),r=m.settings.subscribe(n),o=m.subscribe(n);return()=>{r(),o()}},[]),e}function Oa(e,t,n){let r=null,o=!1,i=!1;return{reload:()=>i?Promise.resolve():(o=!0,r||(r=(async()=>{for(;o&&!i;){o=!1;let s=await e();!o&&!i&&t(s)}})().finally(()=>{r=null}),n&&r.catch(n)),r),dispose:()=>{i=!0}}}function _a(){return m.interop.services.providers(Ot)}function Fd(e){if(!e||typeof e!="object"||Array.isArray(e))return!1;let t=e;return typeof t.name=="string"&&typeof t.version=="string"}function dt(){return _a().map(e=>({sourceId:e.providerId,sourceKey:La(e.owner),owner:e.owner,version:e.version,methods:e.methods,integration:Fd(e.metadata)?e.metadata:void 0}))}function Vt(){let[e,t]=a.useState(dt);return a.useEffect(()=>{let n=()=>t(dt()),r=m.interop.services.subscribe(Ot,n);return n(),r},[]),e}function za(e){return _a().find(t=>t.providerId===e)??null}function $d(e){if(!e||typeof e!="object"||Array.isArray(e))return!1;let t=e;return typeof t.id=="string"&&typeof t.title=="string"&&typeof t.date=="string"}async function Fa(e=!1){return(await Promise.all(_a().map(async n=>{let r=await n.invoke("list");if(!r.ok||!Array.isArray(r.value)){if(e)throw new Error(r.ok?`Calendar provider "${n.owner}" returned invalid items.`:r.error.message);return r.ok||console.error(`[calendar] item source "${n.owner}" failed: ${r.error.message}`),[]}return r.value.filter($d).map(o=>({sourceId:n.providerId,sourceOwner:n.owner,labelKey:`plugin.${n.owner}.name`,item:o,editable:!o.readOnly&&(n.methods.includes("update")||n.methods.includes("remove"))}))}))).flat()}function io(){let[e,t]=a.useState([]),n=a.useRef(null),r=a.useCallback(()=>{n.current?.reload()},[]);return a.useEffect(()=>{let o=Oa(Fa,t,l=>console.error("[calendar] item sources reload failed",l));n.current=o;let i=m.interop.services.subscribe(Ot,r),s=m.interop.state.subscribe(pr,r);return r(),()=>{o.dispose(),n.current===o&&(n.current=null),i(),s()}},[r]),{items:e,reload:r}}async function $a(e,t,n){let r=za(e);if(!r?.methods.includes(t))return!1;let o=await r.invoke(t,n);return o.ok&&o.value===!0}function Ka(e,t,n){return $a(e,"update",[t,n])}function Ra(e,t){return $a(e,"remove",[t])}function Ga(e,t,n){return $a(e,"create",[t,n])}async function lo(e,t){let n=za(e);return n?.methods.includes("open")?(await n.invoke("open",[t])).ok:!1}function Kd(e){if(!e||typeof e!="object"||Array.isArray(e))return!1;let t=e;return typeof t.id=="string"&&typeof t.label=="string"}async function ja(e,t){let n=za(e);if(!n?.methods.includes("actions"))return[];let r=await n.invoke("actions",[t]);return r.ok?Array.isArray(r.value)?r.value.filter(Kd):[]:(console.error(`[calendar] item source "${n.owner}" failed: ${r.error.message}`),[])}function oa(e,t,n){return $a(e,"runAction",[t,n])}async function Ht(e,t){await oa(e,t,va)||await m.ui.confirm({title:d("calendar.editor.unavailable"),message:d("calendar.editor.retry"),actions:[{label:d("calendar.editor.close"),value:"close"}]})}function so(){return _a().filter(e=>e.methods.includes("create")).map(e=>({id:e.providerId,labelKey:`plugin.${e.owner}.name`}))}async function co(e){let t=za(e);return t?.methods.includes("configure")?(await t.invoke("configure")).ok:!1}var uo=new WeakMap;function Rd(e){return{listAccounts:()=>e.backend.call("listAccounts"),listCalendarConnections:()=>e.backend.call("listCalendarConnections"),listCalendars:t=>e.backend.call("listCalendars",{accountId:t}),fetchCalendar:async(t,n,r,o)=>{let i=await e.backend.call("fetchCalendar",{accountId:t,timeMin:n,timeMax:r,calendarId:o}),s=[];for(;;){if(!i.ok||!i.data)return i;if(s.push(...i.data.events),!i.data.next)return{ok:!0,data:{events:s}};i=await e.backend.call("nextEvents",{cursor:i.data.next})}}}}function qe(e){let t=uo.get(e);return t||(t=Rd(e),uo.set(e,t)),t}var Gd="calendar.remote",Tn="calendar.remote_events",go=1e3,po=500;function jd(){let e=new Date,t=new Date(e.getFullYear(),e.getMonth()-1,1),n=new Date(e.getFullYear(),e.getMonth()+13,1);return{timeMin:t.toISOString(),timeMax:n.toISOString()}}function mo(e){let t=new Set(be().disabledCalendarAccounts);return e.filter(n=>n.capabilities.includes("calendar")&&!t.has(n.id))}function Vd(e){if(!e.event||typeof e.event!="object"||Array.isArray(e.event))return null;let t=e.event;return!t.id||!t.title||!t.date?null:{...t,id:String(e.id),accountId:String(e.accountId),readOnly:!0}}async function fo(e){if(e.length===0)return[];let t=m.data.dataset(Tn),n=[],r;do{let o=await t.query({where:{accountId:{in:e}},orderBy:[{field:"accountId",direction:"asc"},{field:"id",direction:"asc"}],limit:go,cursor:r});n.push(...o.rows),r=o.cursor}while(r);return n.flatMap(o=>{let i=Vd(o);return i?[i]:[]})}function Hd(e,t){let n={...t,accountId:e,readOnly:!0};return{accountId:e,id:n.id,date:n.date,endDate:n.endDate??null,event:JSON.parse(JSON.stringify(n))}}async function Ud(e,t){let n=m.data.dataset(Tn),r=[],o;do{let l=await n.query({where:{accountId:e},limit:go,cursor:o});r.push(...l.rows),o=l.cursor}while(o);let i=new Set(t.map(l=>l.id)),s=[...r.filter(l=>!i.has(String(l.id))).map(l=>({operation:"delete",key:{accountId:e,id:String(l.id)}})),...t.map(l=>({operation:"upsert",values:Hd(e,l)}))];for(let l=0;l<s.length;l+=po)await n.batch(s.slice(l,l+po))}function qd(){let e=[],t={syncing:!1,error:null,calendars:{},accounts:{}},n,r=!1,o,i=0,s=new Set,l=()=>s.forEach(g=>g()),c=g=>{let w=be();return g.flatMap(S=>{let _=S.accountId??"";if(w.disabledCalendarAccounts.includes(_))return[];let K=t.calendars[_]?.find(E=>E.id===S.calendarId||!S.calendarId&&E.primary),V=w.remoteCalendars[_]?.[S.calendarId??K?.id??""];if(!(V?.enabled??K?.primary??!0))return[];let z=w.groups.find(E=>E.id===V?.groupId);return[{...S,groupId:z?.id,group:z?.name,color:z?void 0:S.color}]})},u=async()=>{let g=++i;try{let w=await qe(m).listAccounts();if(!w.ok||!w.data)throw new Error(w.error||d("calendar.sync.accountsError"));let S=mo(w.data.accounts),_=await fo(S.map(K=>K.id));if(g!==i)return;e=c(_),l()}catch(w){if(g!==i)return;t={...t,error:w instanceof Error?w.message:d("calendar.sync.failed")},l()}},f=async()=>{++i,t={...t,syncing:!0,error:null},l();try{let g=await qe(m).listAccounts();if(!g.ok||!g.data)throw new Error(g.error||d("calendar.sync.accountsError"));let w=mo(g.data.accounts),S=await fo(w.map(E=>E.id)),{timeMin:_,timeMax:K}=jd(),V=[],z=[];for(let E of w){let v=S.filter(J=>J.accountId===E.id),y=[],O=[];try{let J=await qe(m).listCalendars(E.id);if(!J.ok||!J.data)throw new Error(J.error||d("calendar.sync.calendarsError"));let ne=J.data.calendars;t={...t,calendars:{...t.calendars,[E.id]:ne}},l();for(let te of ne.filter(B=>no(E.id,B)))try{let B=await qe(m).fetchCalendar(E.id,_,K,te.id);if(!B.ok||!B.data)throw new Error(B.error||d("calendar.sync.failed"));y.push(...B.data.events.map(fe=>({...fe,calendarId:te.id,category:te.name,color:fe.color||te.color,accountId:E.id,readOnly:!0})))}catch(B){y.push(...v.filter(fe=>fe.calendarId===te.id||!fe.calendarId&&te.primary)),O.push(`${te.name}: ${B instanceof Error?B.message:d("calendar.sync.failed")}`)}await Ud(E.id,y)}catch(J){y.splice(0,y.length,...v),O.push(J instanceof Error?J.message:d("calendar.sync.failed"))}V.push(...y);let D=O.length?`${O.join(" ")} ${d("calendar.sync.cached")}`:void 0;D&&z.push(`${E.displayName||E.address}: ${D}`),t={...t,accounts:{...t.accounts,[E.id]:{error:D,lastSyncAt:O.length?t.accounts[E.id]?.lastSyncAt:new Date().toISOString(),eventCount:c(y).length}}}}++i,e=c(V),t={...t,error:z.length?z.join(" "):null}}catch(g){t={...t,error:g instanceof Error?g.message:d("calendar.sync.failed")}}finally{t={...t,syncing:!1},l()}},h=()=>n?(r=!0,n):(n=(async()=>{do r=!1,await f();while(r)})().finally(()=>{n=void 0}),n);return{getEvents:()=>e,getStatus:()=>t,subscribe:g=>{if(s.add(g),!o){let w=m.data.dataset(Tn).subscribe(()=>{t.syncing||u()}),S=JSON.stringify([be().disabledCalendarAccounts,be().remoteCalendars]),_=m.settings.subscribe(()=>{let K=JSON.stringify([be().disabledCalendarAccounts,be().remoteCalendars]);K!==S&&(S=K,e=c(e),l(),h())});o=()=>{w(),_()},u().then(()=>{s.size&&h()})}return()=>{s.delete(g),s.size===0&&(o?.(),o=void 0)}},sync:h}}function kt(){return m.runtime.getOrCreate(Gd,qd)}var Yd=366;function Ut(e,t){let n=me(e);return n.setDate(n.getDate()+t),Q(n)}function Nn(e,t){let n=me(e),r=me(t);return n.setHours(12,0,0,0),r.setHours(12,0,0,0),Math.round((r.getTime()-n.getTime())/864e5)}function ho(e,t){if(!e)return[];if(!t||t<=e)return[e];let n=Math.min(Nn(e,t),Yd-1),r=[];for(let o=0;o<=n;o++)r.push(Ut(e,o));return r}function Ne(e){let[t,n]=e.split(":").map(r=>parseInt(r,10));return(t||0)*60+(n||0)}function _e(e){let t=Math.max(0,Math.min(1439,Math.round(e))),n=Math.floor(t/60),r=t%60;return`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}`}var Xd=[".csv"],Zd=[".base"],Qd=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],Jd=[".pdf"],el=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus"],tl=[".mp4",".mov",".m4v",".mkv",".webm",".ogv"],al=[".stl",".obj",".glb",".gltf"];function Pn(e){let t=e.split("/").pop()??e,n=t.lastIndexOf(".");return n>0?t.slice(n).toLowerCase():""}var nl={type:"core",id:"valley"},j=(e,t,n,r,o={})=>({kind:e,icon:t,viewer:n,preview:"full",information:["identity"],editable:e==="text"||e==="code",sortGroup:r,owner:nl,...o});function rl(e){let t={};for(let[n,r]of e)for(let o of n)t[o]=r;return t}var ol=rl([[[".md",".markdown"],j("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],j("text","text","text","notes")],[[".json"],j("json","json","json","data",{editable:!0})],[[".jsonl"],j("json","json","jsonl","data",{editable:!0})],[Xd,j("csv","csv","csv","data",{editable:!0})],[Zd,j("base","base","fallback","data")],[Qd,j("image","image","image","media",{information:["identity","dimensions","exif"]})],[Jd,j("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[el,j("audio","audio","audio","media",{information:["identity","media","audio-tags"]})],[tl,j("video","video","video","media",{information:["identity","media","video-codec"]})],[al,j("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".docx"],j("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".pptx"],j("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".ts",".mts",".cts"],j("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],j("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],j("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],j("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],j("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],j("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],j("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],j("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],j("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],j("code","code","code","code",{codeLanguage:"TOML"})],[[".xml"],j("code","code","code","code",{codeLanguage:"XML"})],[[".swift"],j("code","code","code","code",{codeLanguage:"Swift"})],[[".rs"],j("code","code","code","code",{codeLanguage:"Rust"})],[[".go"],j("code","code","code","code",{codeLanguage:"Go"})],[[".java"],j("code","code","code","code",{codeLanguage:"Java"})],[[".c",".h",".cpp"],j("code","code","code","code",{codeLanguage:"C++"})],[[".canvas"],j("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],j("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".doc"],j("unsupported","word","fallback","documents",{preview:"metadata",editable:!1})],[[".xlsx"],j("csv","excel","csv","data",{preview:"full",editable:!1})],[[".xls"],j("unsupported","excel","fallback","data",{preview:"metadata",editable:!1})],[[".ppt"],j("unsupported","powerpoint","fallback","documents",{preview:"metadata",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],j("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),il=j("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function dl(e){return ol[Pn(e)]??il}function yo(e){return dl(e).kind}var ae=e=>a.createElement("svg",{className:e.className,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?a.createElement("title",null,e.title):null,e.children),at=e=>a.createElement(ae,{...e},a.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),wo=e=>a.createElement(ae,{...e},a.createElement("circle",{cx:"11",cy:"11",r:"8"}),a.createElement("path",{d:"m21 21-4.3-4.3"})),Ct=e=>a.createElement(ae,{...e},a.createElement("path",{d:"m9 18 6-6-6-6"})),xo=e=>a.createElement(ae,{...e},a.createElement("path",{d:"m12 2 9 5-9 5-9-5 9-5Z"}),a.createElement("path",{d:"m3 12 9 5 9-5"}),a.createElement("path",{d:"m3 17 9 5 9-5"})),ko=e=>a.createElement(ae,{...e},a.createElement("path",{d:"M3 7V5c0-1.1.9-2 2-2h2M17 3h2c1.1 0 2 .9 2 2v2M21 17v2c0 1.1-.9 2-2 2h-2M7 21H5c-1.1 0-2-.9-2-2v-2"}),a.createElement("rect",{width:"7",height:"5",x:"7",y:"5",rx:"1"}),a.createElement("rect",{width:"7",height:"5",x:"10",y:"14",rx:"1"})),Co=e=>a.createElement(ae,{...e},a.createElement("path",{d:"M3 4.5A1.5 1.5 0 0 1 4.5 3h5.1a2 2 0 0 1 1.4.6l7.4 7.4a2 2 0 0 1 0 2.8l-5.1 5.1a2 2 0 0 1-2.8 0L3.6 11.5a2 2 0 0 1-.6-1.4V4.5Z"}),a.createElement("path",{d:"M7 7h.01"})),lt=e=>a.createElement(ae,{...e},a.createElement("path",{d:"M12 5v14M5 12h14"})),So=e=>a.createElement(ae,{...e},a.createElement("path",{d:"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"}),a.createElement("circle",{cx:"12",cy:"12",r:"3"})),Eo=e=>a.createElement(ae,{...e},a.createElement("path",{d:"m3 3 18 18"}),a.createElement("path",{d:"M10.6 6.1A9.7 9.7 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.3 3.9"}),a.createElement("path",{d:"M6.6 6.6A17 17 0 0 0 2 12s3.5 6 10 6a9.7 9.7 0 0 0 3.4-.6"}),a.createElement("path",{d:"M9.9 9.9a3 3 0 0 0 4.2 4.2"})),Va=e=>a.createElement(ae,{...e},a.createElement("path",{d:"M3 6h18"}),a.createElement("path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}),a.createElement("path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"})),st=e=>a.createElement(ae,{...e},a.createElement("path",{d:"M8 2v4M16 2v4"}),a.createElement("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2"}),a.createElement("path",{d:"M3 10h18"})),ia=e=>a.createElement(ae,{...e},a.createElement("circle",{cx:"12",cy:"12",r:"9"}),a.createElement("path",{d:"M12 7v5l3 2"})),Io=e=>a.createElement(ae,{...e},a.createElement("path",{d:"M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"})),Do=e=>a.createElement(ae,{...e},a.createElement("path",{d:"M4 22V4h11l-1 3h6l-2 4 2 4h-9l-1-3H4"})),Ha=e=>a.createElement(ae,{...e},a.createElement("path",{d:"M21.2 6.2a2.8 2.8 0 0 0-4-4L4 15.5 3 21l5.5-1L21.2 6.2Z"}),a.createElement("path",{d:"m15 5 4 4"})),Ao=e=>a.createElement(ae,{...e},a.createElement("path",{d:"m3 6 2 2 4-4M3 12l2 2 4-4M3 18l2 2 4-4"}),a.createElement("path",{d:"M13 6h8M13 12h8M13 18h8"})),St=e=>a.createElement(ae,{...e},a.createElement("path",{d:"M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"}),a.createElement("path",{d:"M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"})),da=e=>a.createElement(ae,{...e},a.createElement("path",{d:"M21.4 11.05 12.25 20.2a6 6 0 0 1-8.49-8.49l9.2-9.19a4 4 0 0 1 5.65 5.66l-9.2 9.19a2 2 0 0 1-2.82-2.83l8.49-8.48"})),qt=e=>a.createElement(ae,{...e},a.createElement("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"}),a.createElement("circle",{cx:"12",cy:"10",r:"3"})),To=e=>a.createElement(ae,{...e},a.createElement("path",{fill:"currentColor",stroke:"none",d:"M14 4v5c0 1.12.37 2.16 1 3H9c.65-.86 1-1.9 1-3V4zm3-2H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3V4h1c.55 0 1-.45 1-1s-.45-1-1-1"})),No=e=>a.createElement(ae,{...e},a.createElement("path",{d:"M3 11l19-9-9 19-2-8-8-2z"})),Bt=e=>a.createElement(ae,{...e},a.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),a.createElement("path",{d:"M14 2v6h6M9 13h6M9 17h4"})),Po=e=>a.createElement(ae,{...e},a.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),a.createElement("path",{d:"M14 2v6h6"})),Mo=e=>a.createElement(ae,{...e},a.createElement("rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}),a.createElement("circle",{cx:"9",cy:"9",r:"2"}),a.createElement("path",{d:"m21 15-4.6-4.6a2 2 0 0 0-2.8 0L3 21"})),Lo=e=>a.createElement(ae,{...e},a.createElement("path",{d:"M9 18V5l12-2v13"}),a.createElement("circle",{cx:"6",cy:"18",r:"3"}),a.createElement("circle",{cx:"18",cy:"16",r:"3"})),Oo=e=>a.createElement(ae,{...e},a.createElement("path",{d:"m22 8-6 4 6 4V8z"}),a.createElement("rect",{width:"14",height:"12",x:"2",y:"6",rx:"2"})),bo={note:Bt,attachment:da,link:St,location:qt},vo={note:"calendar.badge.note",attachment:"calendar.badge.attachment",link:"calendar.badge.link",location:"calendar.badge.location"};function _o(e){return(e??[]).filter(t=>t in vo).map(t=>d(vo[t]))}var Et=({badges:e,className:t})=>{let n=(e??[]).filter(r=>r in bo);return n.length===0?null:a.createElement("span",{className:t?`calendar-badges ${t}`:"calendar-badges","aria-hidden":"true"},n.map(r=>{let o=bo[r];return a.createElement(o,{key:r})}))},ll={"list-todo":()=>a.createElement("path",{fill:"currentColor",stroke:"none",d:"M3 6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm1.5 4.5h4v-4h-4Zm8.25-5a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5Zm0 6a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5Zm0 6a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5Zm-2.97-2.53a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47 2.97-2.97a.75.75 0 0 1 1.06 0Z"}),cake:()=>a.createElement(a.Fragment,null,a.createElement("path",{d:"M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"}),a.createElement("path",{d:"M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"}),a.createElement("path",{d:"M2 21h20M7 8v3M12 8v3M17 8v3M7 4h.01M12 4h.01M17 4h.01"})),gift:()=>a.createElement(a.Fragment,null,a.createElement("path",{d:"M20 12v10H4V12M2 7h20v5H2zM12 22V7"}),a.createElement("path",{d:"M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"})),heart:()=>a.createElement("path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"}),star:()=>a.createElement("path",{d:"m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01Z"}),flag:()=>a.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"}),bell:()=>a.createElement(a.Fragment,null,a.createElement("path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"}),a.createElement("path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"})),pin:()=>a.createElement(a.Fragment,null,a.createElement("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"}),a.createElement("circle",{cx:"12",cy:"10",r:"3"})),person:()=>a.createElement(a.Fragment,null,a.createElement("path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}),a.createElement("circle",{cx:"12",cy:"7",r:"4"})),clock:()=>a.createElement(a.Fragment,null,a.createElement("circle",{cx:"12",cy:"12",r:"10"}),a.createElement("path",{d:"M12 6v6l4 2"})),calendar:()=>a.createElement(a.Fragment,null,a.createElement("path",{d:"M8 2v4M16 2v4M3 10h18"}),a.createElement("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2"}))};function zo(){return[{id:"cake",label:d("auto.9c6e5a3f44fc")},{id:"gift",label:d("auto.8d0a32ed6339")},{id:"heart",label:d("auto.2a37335eebda")},{id:"star",label:d("auto.85a7de6e2705")},{id:"flag",label:d("auto.a774409a00c2")},{id:"bell",label:d("auto.d4198662a72f")},{id:"pin",label:d("auto.9c918414710c")},{id:"person",label:d("auto.8c41ae88467f")},{id:"clock",label:d("auto.04f6b3ea183e")},{id:"calendar",label:d("auto.adab5090ac6a")}]}var $e=({id:e,className:t})=>{let n=e?ll[e]:void 0;return n?a.createElement(ae,{className:t},n()):null};function Mn({value:e,onChange:t,disabled:n,placeholder:r,ariaLabel:o}){let i=m.ui.ResourcePicker;return a.createElement(i,{value:e,onChange:t,kinds:["attachment"],placeholder:r??d("auto.e7de9576dc00"),disabled:n,ariaLabel:o??d("auto.8410192cbb1f"),allowCustom:!1})}function sl(e){if(!Number.isFinite(e)||e<0)return"";let t=["B","KB","MB","GB","TB"],n=e,r=0;for(;n>=1024&&r<t.length-1;)n/=1024,r++;let o=r===0||n>=100?0:n>=10?1:2;return`${n.toFixed(o)} ${t[r]}`}var cl={image:Mo,audio:Lo,video:Oo},Fo=({relPath:e,onRemove:t})=>{let[n,r]=a.useState(null),o=yo(e),i=e.split("/").pop()??e,s=cl[o]??Po,l=Pn(e).replace(".","").toUpperCase();return a.useEffect(()=>{let c=!1;return m.vault.fileInfo(e).then(u=>{c||r(u?.size??null)}),()=>{c=!0}},[e]),a.createElement("div",{className:"calendar-attach-card"},a.createElement("button",{className:"calendar-attach-open",type:"button",onClick:c=>m.workspace.openFile(e,void 0,{newTab:m.ui.hasModKey(c)}),title:e},a.createElement("span",{className:"calendar-attach-thumb"},a.createElement(s,null)),a.createElement("span",{className:"calendar-attach-copy"},a.createElement("span",{className:"calendar-attach-name"},i),a.createElement("span",{className:"calendar-attach-meta"},l,n!==null&&`${l?" \xB7 ":""}${sl(n)}`))),t&&a.createElement("button",{className:"calendar-attach-remove",type:"button",onClick:t,title:d("calendar.removeAttachment"),"aria-label":d("calendar.removeAttachmentOf",{p0:i})},a.createElement(at,null)))};function $o(){try{return m.interop.services.providers(gr)[0]}catch{return}}function ul(){try{return m.interop.services.providers(fr)[0]}catch{return}}function Ko(){return!0}function Ro(e){let t=ul();t?t.invoke("open",[{url:e}]):m.files.openExternalUrl(e)}function Ln(e){let t=$o();if(!t)return;let n=e.lng!==void 0&&e.lat!==void 0?`${e.lat},${e.lng}`:e.name;t.invoke("open",[{query:n}])}function On(){return!!$o()}var Go=({value:e,onChange:t})=>{let n=m.ui.ResourcePicker;return a.createElement("div",{className:"calendar-location"},a.createElement("div",{className:"calendar-location-row"},a.createElement(n,{className:"calendar-quickadd-input calendar-location-input",value:e?.name??"",placeholder:d("calendar.locationPlaceholder"),ariaLabel:d("calendar.location"),kinds:["place"],allowCustom:!0,onChange:(r,o)=>{let i=Number(o?.metadata?.longitude),s=Number(o?.metadata?.latitude);t(r?{name:r,...Number.isFinite(i)&&Number.isFinite(s)?{lng:i,lat:s}:{}}:void 0)}}),e&&a.createElement(a.Fragment,null,On()&&a.createElement("button",{className:"calendar-field-btn",type:"button",title:d("calendar.openLocation"),"aria-label":d("calendar.openLocationOf",{p0:e.name}),onClick:()=>Ln(e)},a.createElement(No,null)),a.createElement("button",{className:"calendar-field-btn",type:"button",title:d("calendar.removeLocation"),"aria-label":d("calendar.removeLocation"),onClick:()=>{t(void 0)}},a.createElement(at,null)))))};function je(e){return`${e.sourceId??e.kind}:${e.id}:${e.occurrenceKey??e.date}`}function _n(){return m.runtime.getOrCreate("calendar.editRequest",()=>{let e={value:null,listeners:new Set,get:()=>e.value,publish:t=>{e.value=t;for(let n of[...e.listeners])n()},subscribe:t=>(e.listeners.add(t),()=>e.listeners.delete(t))};return e})}function zn(e){let t=_n();t.publish({item:e,nonce:(t.get()?.nonce??0)+1}),m.workspace.openMainTab()}function Fn(e){Cr({date:e.date,startTime:e.startTime,endTime:e.endTime,sourceId:e.sourceId,itemId:e.id})}function jo(e){wa({date:e.date,startTime:e.startTime,endTime:e.endTime,sourceId:e.sourceId,itemId:e.id})}function Wt({sourceId:e,sourceOwner:t,labelKey:n,item:r,editable:o}){return{kind:"sourced",id:r.id,title:r.title,date:r.date,startTime:r.startTime,endTime:r.endTime,completed:r.completed,filePath:r.filePath,sourceId:e,sourceOwner:t,sourceLabelKey:n,sourced:r,group:r.group,tags:r.tags,note:r.note,location:r.location,urls:r.urls,attachments:r.attachments,priority:r.priority,status:r.status,color:r.color,borderColor:r.borderColor,icon:r.icon,fields:r.fields,badges:r.badges,readOnly:r.readOnly||!o}}function pl(e){let t=[];return e.filePath&&t.push("note"),e.attachments?.length&&t.push("attachment"),e.urls?.length&&t.push("link"),e.location&&t.push("location"),t.length>0?t:void 0}function Be(e){return{kind:"event",id:e.id,title:e.title,date:e.date,endDate:e.endDate,startTime:e.startTime,endTime:e.endTime,filePath:e.filePath,event:e,tags:e.tags,note:e.note,location:e.location,urls:e.urls,attachments:e.attachments,category:e.category,groupId:e.groupId,group:e.group,badges:pl(e),readOnly:e.readOnly}}function Vo(e){return{kind:"noteDate",id:e.id,title:e.title,date:e.date,startTime:e.startTime,endTime:e.endTime,filePath:e.relPath,color:e.color,borderColor:e.borderColor,icon:e.icon,fields:e.fields,readOnly:!0}}function Yt(e){let t=(e.fields??[]).map(r=>`${r.key}: ${r.value}`),n=_o(e.badges);return[e.title,e.note?.trim(),...t,...n.length>0?[n.join(" \xB7 ")]:[]].filter(r=>!!r).join(`
`)}function ml(e){return e.startTime?e.endTime?`${e.startTime}\u2013${e.endTime}`:e.startTime:d("auto.1ac1ff7616a6")}function Ua({item:e,sourceId:t,color:n,revealNonce:r,onClick:o,onDoubleClick:i,onContextMenu:s}){return a.createElement("div",{role:"button",tabIndex:0,className:`agenda-card${e.completed?" completed":""}${e.filePath?" linked":""}${r!=null?" calendar-reveal-target":""}`,"data-calendar-source-id":t,"data-calendar-item-id":e.id,onClick:o,onDoubleClick:i,onContextMenu:s,onKeyDown:l=>{l.target!==l.currentTarget||l.key!=="Enter"&&l.key!==" "||(l.preventDefault(),o())},title:Yt(e)},a.createElement("span",{className:"agenda-card-dot",style:{background:ce(n)}}),a.createElement("span",{className:"agenda-card-body"},a.createElement("span",{className:"agenda-card-title"},e.icon&&a.createElement($e,{id:e.icon,className:"calendar-chip-glyph"}),e.title),a.createElement("span",{className:"agenda-card-time"},ml(e),a.createElement(Et,{badges:e.badges})),e.note?.trim()&&a.createElement(m.ui.MarkdownView,{className:"agenda-card-note",value:e.note,context:{sourcePath:e.filePath,ref:e.sourced?.documentRef??(e.kind==="event"&&!e.readOnly?{pluginId:"calendar",sourceId:"events",itemId:e.id}:void 0)}}),e.fields&&e.fields.length>0&&a.createElement("span",{className:"agenda-card-fields"},e.fields.map(l=>l.value).join(" \xB7 "))))}function fl(e){if(!e.labelKey)return e.label;let t=d(e.labelKey);return t===e.labelKey?e.label:t}function gl(e){switch(e){case"note":return a.createElement(Bt,null);case"attachment":return a.createElement(da,null);case"link":return a.createElement(St,null);case"map":return a.createElement(qt,null);case"edit":return a.createElement(Ha,null);case"open":return a.createElement(Ct,null);case"checklist":return a.createElement(Ao,null);default:return}}async function qa(e,t={}){let n=e.sourceId;if(e.kind!=="sourced"||!n)return[];let r=i=>({id:i.id,label:fl(i),description:i.description,icon:gl(i.icon),danger:i.danger,enabled:i.enabled,...i.submenu?.length?{submenu:i.submenu.map(r)}:{onSelect:i.id===va&&t.onEdit?t.onEdit:()=>{oa(n,e.id,i.id)}}}),o=new Set(t.skip??[]);return(await ja(n,e.id)).filter(i=>!o.has(i.id)).map(r)}function Ba(e){return(e.fields??[]).map(t=>({id:`field:${t.key}`,label:t.key,description:t.value,enabled:!1}))}function Xt(e){if(!e.filePath)return[];let t=e.filePath;return[{id:"open-note",label:d("auto.c66a827e3397"),icon:a.createElement(Bt,null),onSelect:()=>m.workspace.openFile(t)}]}function hl(e){let t=e.lastIndexOf("/");return t===-1?e:e.slice(t+1)}function Wa(e){let t=e.kind==="event"?e.event:void 0;if(!t)return[];let n=[...Xt(e)],r=t.attachments??[];r.length>0&&n.push({id:"open-attachment",label:d("calendar.action.openAttachment"),icon:a.createElement(da,null),submenu:r.map(i=>({id:`attachment:${i}`,label:hl(i),description:i,icon:a.createElement(da,null),onSelect:()=>m.workspace.openFile(i)}))});let o=t.urls??[];if(o.length>0&&Ko()&&n.push({id:"open-link",label:d("calendar.action.openLink"),icon:a.createElement(St,null),submenu:o.map(i=>({id:`url:${i}`,label:i,icon:a.createElement(St,null),onSelect:()=>Ro(i)}))}),t.location&&On()){let i=t.location;n.push({id:"show-on-map",label:d("calendar.action.showOnMap"),description:i.name,icon:a.createElement(qt,null),onSelect:()=>Ln(i)})}return n}async function Ho(e,t,n,r){let o=new Date().toISOString();if(!e.readOnly){if(e.kind==="sourced"&&e.sourced&&e.sourceId)await Ka(e.sourceId,e.sourced.id,{date:t,startTime:n,endTime:r});else if(e.kind==="event"&&e.event){let i=Nn(e.date,t);await Da(e.id,{...e.event,date:Ut(e.event.date,i),endDate:e.event.endDate?Ut(e.event.endDate,i):void 0,startTime:n,endTime:r,allDay:!n&&!r,updatedAt:o})}}}var Ce=e=>typeof e=="string"?e:"";function $n(e=new Date){let t=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${n}`}var Uo=e=>`${e.slice(0,7)}-01`,Zt=e=>e.match(/\d{4}-\d{2}-\d{2}/)?.[0],qo=e=>e.match(/\d{1,2}:\d{2}/)?.[0],Bo=["month","week","year"],ie={type:"string"},Kn={type:"object",additionalProperties:!1,properties:{...Object.fromEntries(["title","date","endDate","startTime","endTime","groupId","group","note","filePath","priority"].map(e=>[e,ie])),completed:{type:"boolean"},...Object.fromEntries(["tags","urls","attachments"].map(e=>[e,{type:"array",items:ie}])),location:{oneOf:[{type:"null"},{type:"object",required:["name"],additionalProperties:!1,properties:{name:ie,lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}}}]}}};function Qt(e){let t=e;if(!t||typeof t.id!="string"||!t.id.trim()||t.sourceId!==void 0&&typeof t.sourceId!="string")throw new Error("Expected a calendar item id and optional source id.");return{id:t.id,sourceId:typeof t.sourceId=="string"&&t.sourceId?t.sourceId:void 0}}function Wo(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Expected calendar item values.");let t=e;for(let[n,r]of Object.entries(t)){if(!(n in Kn.properties))throw new Error(`Unsupported calendar property "${n}".`);if(n==="completed"){if(typeof r!="boolean")throw new Error("Expected a completion flag.")}else if(["tags","urls","attachments"].includes(n)){if(!Array.isArray(r)||!r.every(o=>typeof o=="string"))throw new Error(`Expected a text list for "${n}".`)}else if(n==="location"){if(r!==null){if(!r||typeof r!="object"||Array.isArray(r))throw new Error("Invalid location.");let o=r;if(typeof o.name!="string"||Object.keys(o).some(i=>!["name","lng","lat"].includes(i))||o.lng!==void 0&&(typeof o.lng!="number"||!Number.isFinite(o.lng)||Math.abs(o.lng)>180)||o.lat!==void 0&&(typeof o.lat!="number"||!Number.isFinite(o.lat)||Math.abs(o.lat)>90)||o.lng===void 0!=(o.lat===void 0))throw new Error("Invalid location.")}}else if(typeof r!="string")throw new Error(`Expected text for "${n}".`)}if(typeof t.title=="string"&&!t.title.trim())throw new Error("An event title cannot be empty.");for(let n of["date","endDate"])if(t[n]&&!/^\d{4}-\d{2}-\d{2}$/.test(String(t[n])))throw new Error("Invalid calendar date.");for(let n of["startTime","endTime"])if(t[n]&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(t[n])))throw new Error("Invalid calendar time.");return t}async function Ve(e){if(e.sourceId){if(!dt().some(n=>n.sourceId===e.sourceId))throw new Error("The calendar item provider is unavailable.");let t=(await Fa(!0)).find(n=>n.sourceId===e.sourceId&&n.item.id===e.id);if(t)return Wt(t)}else{let t=(await Oe()).find(o=>o.id===e.id);if(t)return Be(t);let n=kt();!n.getEvents().some(o=>o.id===e.id)&&/^(google|microsoft):/.test(e.id)&&await n.sync();let r=n.getEvents().find(o=>o.id===e.id);if(r)return Be(r);if(n.getStatus().error)throw new Error("Remote calendar items are unavailable. Reconnect or refresh the calendar and retry.")}throw new Error("The calendar item no longer exists.")}async function yl(e,t,n){let r=await Ve(e);if(r.readOnly)throw new Error("This calendar item is read-only.");if(e.sourceId){if(t.endDate!==void 0||t.groupId!==void 0)throw new Error("This calendar source uses group names and single-day dates.");if(!await Ka(e.sourceId,e.id,t))throw new Error("Could not save the calendar source item.");return{value:await Ve(e),revert:null}}let o=r.event;if(n!==void 0&&o.updatedAt!==n)throw new Error("This event changed elsewhere. Reload it before saving; your draft is preserved.");if(t.completed!==void 0||t.priority!==void 0||t.group!==void 0)throw new Error("Events use groupId and do not have a task status or priority.");let i=Ia({...o,...t,allDay:!(t.startTime??o.startTime)&&!(t.endTime??o.endTime),updatedAt:new Date().toISOString()});if(!i.date||t.endDate&&t.endDate<i.date)throw new Error("The event end date must follow its start date.");if(t.filePath&&i.filePath!==t.filePath)throw new Error("Invalid event file path.");for(let s of["urls","attachments"])if(t[s]?.some(l=>!i[s]?.includes(l)))throw new Error(`Invalid event ${s}.`);if(!await bt(e.id,i,o.updatedAt))throw new Error("Could not save the event.");return{value:Be(i),revert:{label:`Edit \u201C${o.title}\u201D`,run:async()=>{if(!await bt(e.id,o))throw new Error("Could not restore the event.")},reapply:async()=>{if(!await bt(e.id,i))throw new Error("Could not reapply the event edit.")}}}}async function la(e){let t=e??{},n=t.target??(t.id?{id:t.id,sourceId:t.sourceId}:void 0);return n?Ve(n):t.sourceId?dt().find(r=>r.sourceId===t.sourceId)??null:{day:$n()}}function Yo(e){let t=[e.commands.register({id:"list-items",label:"Calendar: List all items",labelKey:"calendar.command.listItems",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{from:ie,to:ie,sourceId:ie},additionalProperties:!1},parse:n=>{let r=n??{};for(let o of["from","to","sourceId"])if(r[o]!==void 0&&typeof r[o]!="string")throw new Error("Expected calendar filter text.");return{from:Ce(r.from),to:Ce(r.to),sourceId:Ce(r.sourceId)}}},run:async({from:n,to:r,sourceId:o})=>{let i=(await Oe()).map(Be),s=(await Fa(!0)).map(Wt),l=kt().getEvents().map(Be);return[...i,...s,...l].filter(c=>(!n||(c.endDate??c.date)>=n)&&(!r||c.date<=r)&&(!o||c.sourceId===o))}}),e.commands.register({id:"source-actions",label:"Calendar: List source item actions",labelKey:"calendar.command.sourceActions",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:ie,sourceId:ie},required:["id","sourceId"],additionalProperties:!1},parse:n=>{let r=Qt(n);if(!r.sourceId)throw new Error("Expected a source id.");return{id:r.id,sourceId:r.sourceId}}},run:async({id:n,sourceId:r})=>(await Ve({id:n,sourceId:r}),ja(r,n))}),e.commands.register({id:"get",label:"Calendar: Get item",labelKey:"calendar.command.get",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:ie,sourceId:ie},required:["id"],additionalProperties:!1},parse:Qt},run:Ve}),e.commands.register({id:"open",label:"Calendar: Open item",labelKey:"calendar.command.open",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:ie,sourceId:ie},required:["id"],additionalProperties:!1},parse:Qt},run:async n=>{let r=await Ve(n);return zn(r),r}}),e.commands.register({id:"open-cached",label:"Calendar: Open cached event",labelKey:"calendar.command.openCached",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:ie,accountId:ie},required:["id","accountId"],additionalProperties:!1},parse:n=>{let r=n,o=Ce(r?.id),i=Ce(r?.accountId);if(!o||!i)throw new Error("Expected a cached calendar event and account.");return{id:o,accountId:i}}},run:async({id:n,accountId:r})=>{let o=await e.data.dataset("calendar.remote_events").get({id:n,accountId:r});if(!o?.event||typeof o.event!="object")throw new Error("The cached event is unavailable. Open Calendar to refresh its source.");let i=Be(Ia(o.event));return i.readOnly=!0,zn(i),i}}),e.commands.register({id:"edit-fields",label:"Calendar: Edit item fields",labelKey:"calendar.command.editFields",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{id:ie,sourceId:ie,values:Kn,expectedUpdatedAt:ie},required:["id","values"],additionalProperties:!1},parse:n=>{let r=n,o=Qt(n);if(r.expectedUpdatedAt!==void 0&&typeof r.expectedUpdatedAt!="string")throw new Error("Expected an event revision.");return{target:o,values:Wo(r.values),expectedUpdatedAt:r.expectedUpdatedAt}}},run:({target:n,values:r,expectedUpdatedAt:o})=>yl(n,r,o),revision:n=>la(n),preview:n=>({changes:n})}),e.commands.register({id:"delete",label:"Calendar: Delete item",labelKey:"calendar.command.delete",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{id:ie,sourceId:ie},required:["id"],additionalProperties:!1},parse:Qt},run:async n=>{let r=await Ve(n);if(r.readOnly)throw new Error("This calendar item is read-only.");if(n.sourceId){if(!await Ra(n.sourceId,n.id))throw new Error("Could not delete the calendar source item.");return{value:r,revert:null}}if(!await Gt(n.id))throw new Error("Could not delete the event.");return{value:r,revert:{label:`Delete \u201C${r.title}\u201D`,run:async()=>{if(!await vt(r.event))throw new Error("Could not restore the event.")}}}},revision:n=>la(n),preview:n=>({changes:n})}),e.commands.register({id:"sources",label:"Calendar: List item sources",labelKey:"calendar.command.sources",paletteSafe:!1,sideEffect:"read",run:()=>dt()}),e.commands.register({id:"source-create",label:"Calendar: Create source item",labelKey:"calendar.command.sourceCreate",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{sourceId:ie,date:ie,values:Kn},required:["sourceId","date","values"],additionalProperties:!1},parse:n=>{let r=n;if(typeof r?.sourceId!="string"||!r.sourceId||typeof r.date!="string"||!/^\d{4}-\d{2}-\d{2}$/.test(r.date))throw new Error("Expected a source id and date.");let o=Wo(r.values);if(!o.title?.trim()||o.endDate!==void 0||o.groupId!==void 0)throw new Error("Expected source item title and supported values.");return{sourceId:r.sourceId,date:r.date,values:o}}},run:async({sourceId:n,date:r,values:o})=>{if(!await Ga(n,r,o))throw new Error("Could not create the source item.");return{value:!0,revert:null}},revision:n=>la(n),preview:n=>({changes:n})}),e.commands.register({id:"source-action",label:"Calendar: Run source item action",labelKey:"calendar.command.sourceAction",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{sourceId:ie,id:ie,actionId:ie},required:["sourceId","id","actionId"],additionalProperties:!1},parse:n=>{let r=n,o=Qt(n);if(!o.sourceId||typeof r.actionId!="string"||!r.actionId)throw new Error("Expected a source and action id.");return{sourceId:o.sourceId,id:o.id,actionId:r.actionId}}},run:async({sourceId:n,id:r,actionId:o})=>{if(await Ve({sourceId:n,id:r}),!await oa(n,r,o))throw new Error("Could not run the source item action.");return{value:!0,revert:null}},revision:n=>la(n),preview:n=>({changes:n})}),e.commands.register({id:"open-page",label:"Open Calendar page",labelKey:"auto.b29a9852d77e",sideEffect:"read",run:()=>{e.workspace.openMainTab()},formatCli:()=>"Opened calendar page."}),e.commands.register({id:"add",label:"Calendar: Add an event",labelKey:"auto.e16f07326a18",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{title:{type:"string"},date:{type:"string"},start:{type:"string"},end:{type:"string"},group:{type:"string"}},required:["title"],additionalProperties:!1},parse:n=>{let r=n??{},o=Ce(r.title).trim();if(!o)throw new Error('Usage: calendar add "<title>" [--date --start --end --group]');return{title:o,date:Ce(r.date),start:Ce(r.start),end:Ce(r.end),group:Ce(r.group)}},fromCli:(n,r)=>({title:n.join(" ").trim(),date:r.date,start:r.start,end:r.end,group:r.group})},run:async({title:n,date:r,start:o,end:i,group:s})=>{let l=Zt(r)||Zt(o)||Zt(i)||$n(),c=Aa(n,l,{startTime:o?qo(o):void 0,endTime:i?qo(i):void 0,groupId:s||void 0});if(!await vt(c))throw new Error("Failed to add event.");return{value:c,revert:{label:`Add event \u201C${c.title}\u201D`,run:async()=>{await Gt(c.id)},reapply:async()=>{await vt(c)}}}},formatCli:n=>`Added event "${n.title}" on ${n.date}${n.startTime?` ${n.startTime}`:""}`,revision:n=>la(n),preview:n=>({changes:n})}),e.commands.register({id:"goto",label:"Calendar: Go to date",labelKey:"auto.bf2660184858",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{date:{type:"string"}},required:["date"],additionalProperties:!1},parse:n=>{let r=Zt(Ce(n?.date));if(!r)throw new Error("Usage: calendar goto <YYYY-MM-DD>");return{date:r}},fromCli:n=>({date:n[0]})},run:({date:n})=>e.workspace.patchTimeControl({cursor:Uo(n),selectedDate:n}),formatCli:n=>`Calendar at ${n.selectedDate??n.cursor} (${n.view})`}),e.commands.register({id:"set-view",label:"Calendar: Set view",labelKey:"auto.7f852a5678f1",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{view:{type:"string",enum:["month","week","year"]}},required:["view"],additionalProperties:!1},parse:n=>{let r=Ce(n?.view).toLowerCase();if(!Bo.includes(r))throw new Error(`Usage: calendar set-view ${Bo.join("|")}`);return{view:r}},fromCli:n=>({view:(n[0]??"").toLowerCase()})},run:({view:n})=>e.workspace.patchTimeControl({view:n}),formatCli:n=>`Calendar view: ${n.view}`}),e.commands.register({id:"today",label:"Calendar: Go to today",labelKey:"auto.ee8581831b9c",sideEffect:"read",run:()=>{let n=$n();return e.workspace.patchTimeControl({cursor:Uo(n),selectedDate:n})},formatCli:n=>`Calendar at ${n.selectedDate??n.cursor} (${n.view})`}),e.commands.register({id:"list",label:"Calendar: List events",labelKey:"auto.05d290d65a74",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{from:{type:"string"},to:{type:"string"}},required:[],additionalProperties:!1},parse:n=>{let r=n??{};return{from:Zt(Ce(r.from))??"",to:Zt(Ce(r.to))??""}},fromCli:(n,r)=>({from:Ce(r.from),to:Ce(r.to)})},run:async({from:n,to:r})=>(await Oe()).filter(s=>(!n||s.date>=n)&&(!r||s.date<=r)).sort((s,l)=>s.date.localeCompare(l.date)||(s.startTime??"").localeCompare(l.startTime??"")),formatCli:n=>n.length===0?"No events.":n.map(r=>`  ${r.date}${r.startTime?` ${r.startTime}`:""}  ${r.title}`).join(`
`)})];return()=>t.forEach(n=>n())}var Xo={calendar:[{id:"agenda",label:"Agenda",labelKey:"markdown.examples.agenda",code:`view-mode: agenda
range: this-week
limit: 20`},{id:"week",label:"Week",labelKey:"markdown.examples.week",code:`view-mode: week
range: this-week`},{id:"day",label:"Today",labelKey:"markdown.examples.day",code:"range: today"},{id:"nextSeven",label:"Next seven days",labelKey:"markdown.examples.nextSeven",code:"range: next-7"},{id:"nextThirty",label:"Next thirty days",labelKey:"markdown.examples.nextThirty",code:"range: next-30"},{id:"dateRange",label:"Date range",labelKey:"markdown.examples.dateRange",code:`start-date: 2026-09-01
end-date: 2026-09-30`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`view-mode: week
range: next-30
filter-tag: #focus
limit: 10`}]};var vl=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,wl=/^-\s+(.*)$/,xl=/^[A-Za-z][\w+.-]*:\/\//;function Zo(e){let t={bare:null,values:{},lists:{}},n=null;for(let r of e.split(`
`)){let o=r.trim();if(!o||o.startsWith("#"))continue;let i=o.match(wl);if(i){n?t.lists[n].push(i[1].trim()):t.bare===null&&(t.bare=i[1].trim());continue}let s=xl.test(o)?null:o.match(vl);if(s){let l=s[1].trim().toLowerCase(),c=s[2].trim();c===""?(n=l,t.lists[l]=t.lists[l]??[]):(n=null,t.values[l]=c);continue}n=null,t.bare===null&&(t.bare=o)}return t}function Qo(e,t,n=500){let r=e.values[t];if(r===void 0)return null;let o=Number.parseInt(r,10);return!Number.isFinite(o)||o<1?null:Math.min(o,n)}var Gn="notes-calendar-fence-styles";function kl(){if(document.getElementById(Gn))return;let e=document.createElement("style");e.id=Gn,e.textContent=`
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
`,document.head.appendChild(e)}var Jo=e=>String(e).padStart(2,"0"),sa=e=>`${e.getFullYear()}-${Jo(e.getMonth()+1)}-${Jo(e.getDate())}`,Rn=e=>{let t=new Date;return t.setDate(t.getDate()+e),sa(t)};function Cl(e){let t=e["start-date"]??e.start,n=e["end-date"]??e.end;if(t||n)return{start:t??sa(new Date),end:n??t??Rn(7)};let r=(e.range??"this-week").toLowerCase(),o=sa(new Date);if(r==="today")return{start:o,end:o};if(r==="next-30")return{start:o,end:Rn(30)};if(r==="this-week"){let i=new Date,s=(i.getDay()+6)%7,l=new Date(i);l.setDate(i.getDate()-s);let c=new Date(l);return c.setDate(l.getDate()+6),{start:sa(l),end:sa(c)}}return{start:o,end:Rn(7)}}function Sl(e,t,n,r,o){let i=n?n.replace(/^#/,"").toLowerCase():null,s=r?.toLowerCase()??null;return e.filter(l=>!(l.date<t.start||l.date>t.end||i&&!l.tags.some(c=>c.replace(/^#/,"").toLowerCase()===i)||s&&(l.category??"").toLowerCase()!==s)).sort((l,c)=>l.date.localeCompare(c.date)||(l.startTime??"").localeCompare(c.startTime??"")).slice(0,o)}var El=e=>{let[t,n,r]=e.split("-").map(Number);return new Date(t,(n??1)-1,r??1).toLocaleDateString(m.ui.language(),{weekday:"short",day:"numeric",month:"short"})},Il=({code:e})=>{let[t,n]=a.useState(null);a.useEffect(()=>{let g=!0,w=()=>{Oe().then(_=>{g&&n(_)})};w();let S=tt(w);return()=>{g=!1,S()}},[]);let r=Zo(e),o=Cl(r.values),i=(r.values["view-mode"]??r.values.view??"agenda").toLowerCase().startsWith("week"),s=Qo(r,"limit",200)??20;if(!t)return a.createElement("div",{className:"calendar-fence-empty"},d("auto.33ce417454bf"));let l=Sl(t,o,r.values["filter-tag"]??r.values.tag??null,r.values.category??null,s),c=()=>m.workspace.openMainTab(),u=g=>g.allDay||!g.startTime?d("auto.1ac1ff7616a6"):`${g.startTime}${g.endTime?`\u2013${g.endTime}`:""}`,f=(g,w)=>a.createElement("div",{key:g.id,className:"calendar-fence-row",onClick:c,title:g.note||g.title},a.createElement("span",{className:"dot",style:g.color?{background:ce(g.color)}:void 0}),a.createElement("span",{className:"time"},w?`${g.date.slice(5)} ${u(g)}`:u(g)),a.createElement("span",{className:"t"},g.title),g.category&&a.createElement("span",{className:"cat"},g.category)),h;if(l.length===0)h=a.createElement("div",{className:"calendar-fence-empty"},d("auto.a2590d497e7c"));else if(i){let g=new Map;for(let w of l){let S=g.get(w.date)??[];S.push(w),g.set(w.date,S)}h=a.createElement(a.Fragment,null,[...g.entries()].map(([w,S])=>a.createElement(a.Fragment,{key:w},a.createElement("div",{className:"calendar-fence-day"},El(w)),S.map(_=>f(_,!1)))))}else h=a.createElement(a.Fragment,null,l.map(g=>f(g,!0)));return a.createElement(a.Fragment,null,a.createElement("div",{className:"calendar-fence-head",onClick:c,title:d("auto.7a3a9094b18c")},a.createElement("span",{className:"t"},d("auto.adab5090ac6a")),a.createElement("span",{className:"c"},o.start," \u2192 ",o.end," \xB7 ",l.length)),h)};function ei(){let e=m.markdown.registerCodeBlockRenderer("calendar",(t,n)=>(kl(),n.classList.add("calendar-fence"),m.ui.renderReact(n,a.createElement(Il,{code:t}))),{examples:Xo.calendar});return()=>{e(),document.getElementById(Gn)?.remove()}}function jn(e){return{v:1,...e}}function ca(e){return e.v!==1||e.view!=="month"&&e.view!=="week"&&e.view!=="year"||!Ft(e.cursor)?null:wr(e)}function Ya(){let[e,t]=a.useState(Qe);a.useEffect(()=>{let r=!1,o=!1;m.workspace.getTimeControl().then(s=>{!r&&!o&&t(s)});let i=m.workspace.onTimeControlChanged(s=>{o=!0,t(s)});return()=>{r=!0,i()}},[]);let n=a.useCallback(r=>{t(m.workspace.patchTimeControl(r))},[]);return[e,n]}function ti(e,t){let n=new Date(`${e}T00:00:00`),r=new Date(`${t}T00:00:00`),o=n<=r?n:r,i=n<=r?r:n,s=[];for(let l=new Date(o);l<=i;l.setDate(l.getDate()+1)){let c=String(l.getMonth()+1).padStart(2,"0"),u=String(l.getDate()).padStart(2,"0");s.push(`${l.getFullYear()}-${c}-${u}`)}return s}function ct(){return a.useSyncExternalStore(m.subscribe,m.getState,m.getState)}var Dl=["exact","day-month","day"],Xa=100;function It(e){return e==null?"":Array.isArray(e)?e.map(It).filter(Boolean).join(", "):typeof e=="object"?"":String(e)}function Al(e){if(Array.isArray(e)){let t=e.find(n=>typeof n=="string"&&n.trim());return typeof t=="string"?t.trim():""}return q(e).trim()}function Tl(e){return e.split(/[\n,]+/).map(t=>t.trim()).filter(Boolean)}var ai=0;function Za(){return ai+=1,{id:`notedate-${Date.now().toString(36)}-${ai}`,title:"",matchKey:"type",matchValue:"",dateField:"date",match:"exact",showCount:!0,labelMode:"filename",showFields:[],visible:!0,hidden:!1}}var Hn=[{id:"birthdays",labelKey:"calendar.noteDatePreset.birthdays",label:"Birthdays",patch:{title:"Birthdays",matchKey:"type",matchValue:"contact",dateField:"birthdate",match:"day-month",showCount:!0,icon:"cake"}},{id:"anniversaries",labelKey:"calendar.noteDatePreset.anniversaries",label:"Anniversaries",patch:{title:"Anniversaries",matchKey:"type",matchValue:"anniversary",dateField:"date",match:"day-month",showCount:!0,icon:"heart"}},{id:"deadlines",labelKey:"calendar.noteDatePreset.deadlines",label:"Deadlines",patch:{title:"Deadlines",matchKey:"type",matchValue:"project",dateField:"due",match:"exact",showCount:!1,icon:"flag"}}];function ni(e,t){let n=Za(),r=Hn.find(i=>i.id===e);if(!r)return n;let o=t.map(i=>i.color).filter(i=>!!i);return{...n,...r.patch,color:Na(o)}}function Nl(e){if(!(typeof e!="number"||!Number.isFinite(e)))return Math.max(0,Math.min(Xa,Math.floor(e)))}function Pl(e,t){let n=q(e).trim();return Dl.includes(n)?n:t}function ri(e){let t=Za(),n=e.showFields??e.hoverFields;return{id:q(e.id,t.id),title:q(e.title).trim(),matchKey:q(e.matchKey,t.matchKey).trim(),matchValue:q(e.matchValue).trim(),folder:q(e.folder).trim()||void 0,dateField:q(e.dateField,t.dateField).trim()||t.dateField,dateFormat:q(e.dateFormat).trim()||void 0,startTimeField:q(e.startTimeField).trim()||void 0,endTimeField:q(e.endTimeField).trim()||void 0,match:Pl(e.match,t.match),recurrenceLimitYears:Nl(e.recurrenceLimitYears),showCount:Or(e.showCount,t.showCount),labelMode:e.labelMode==="property"||e.labelMode==null&&q(e.labelField).trim()?"property":"filename",labelField:q(e.labelField).trim()||void 0,showFields:Array.isArray(n)?n.map(r=>q(r).trim()).filter(Boolean):Tl(q(n)),color:q(e.color).trim()||void 0,borderColor:q(e.borderColor).trim()||void 0,icon:q(e.icon).trim()||void 0,visible:e.visible!==!1,hidden:e.hidden===!0}}function Ml(e,t){return t?e===t||e.startsWith(t.replace(/\/+$/,"")+"/"):!0}function Un(e){return!!(e.matchKey&&e.matchValue&&e.dateField)}function qn(e,t){if(!Un(t))return[];let n=t.matchKey,r=t.matchValue.trim().toLowerCase(),o=[];for(let i of e){if(i.excluded||i.kind!=="note"||!Ml(i.relPath,t.folder))continue;let s=i.frontmatter?.[n];String(s??"").trim().toLowerCase()===r&&o.push(i)}return o}function Qa(e,t){let n=qn(e,t),r=0;for(let o of n){let i=oi(o.frontmatter?.[t.dateField],t.dateFormat);i&&(t.match!=="exact"||i.year!=null)&&(r+=1)}return{matched:n.length,dated:r}}var Ll=/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T ].*)?$/,Ol=/^(?:--)?(\d{1,2})-(\d{1,2})$/;function oi(e,t){if(e instanceof Date)return Number.isNaN(e.getTime())?null:{year:e.getFullYear(),month:e.getMonth()+1,day:e.getDate()};let n=Al(e);if(!n)return null;if(t){let i=vr(n,t);if(i)return i}let r=Ll.exec(n);if(r){let[,i,s,l]=r,c={year:Number(i),month:Number(s),day:Number(l)};return zt(c.year,c.month,c.day)?c:null}let o=Ol.exec(n);if(o){let[,i,s]=o,l={month:Number(i),day:Number(s)};return zt(2e3,l.month,l.day)?l:null}return null}function Vn(e,t){return ii(t,e.month,e.day)}function ii(e,t,n){let r=Math.min(n,br(e,t));return`${e}-${String(t).padStart(2,"0")}-${String(r).padStart(2,"0")}`}function _l(e,t,n){if(t==="exact")return e.year==null?[]:[Vn(e,e.year)];if(t==="day-month")return n.map(o=>Vn(e,o));let r=[];for(let o of n)for(let i=1;i<=12;i+=1)r.push(ii(o,i,e.day));return r}function zl(e,t){if(e.year==null)return null;let n=t-e.year;return n<0?null:n}function di(e,t){let n=new Set,r=e.getFullYear();for(let o of[r-1,r,r+1,r+2])n.add(o);if(t!=null&&Number.isFinite(t))for(let o of[t-1,t,t+1,t+2])n.add(o);return[...n].sort((o,i)=>o-i)}function Fl(e,t){let n=[];for(let r of t.showFields){let o=It(e?.[r]);o&&n.push({key:r,value:o})}return n}function li(e,t){if(t.labelMode==="property"&&t.labelField){let n=It(e.frontmatter?.[t.labelField]);if(n)return n}return e.title}function $l(e,t,n,r){if(t.hidden||!t.visible)return[];let o=[];for(let i of qn(e,t)){let s=i.frontmatter,l=oi(s?.[t.dateField],t.dateFormat);if(!l)continue;let c=l.year==null?void 0:Vn(l,l.year),u=t.recurrenceLimitYears==null?void 0:r+t.recurrenceLimitYears,f=_l(l,t.match,n).filter(_=>{if(t.match==="exact")return!0;let K=Number(_.slice(0,4));return(u==null||K<=u)&&(c==null||_>=c)});if(!f.length)continue;let h=t.startTimeField?$t(s?.[t.startTimeField]):void 0,g=t.endTimeField?$t(s?.[t.endTimeField]):void 0,w=li(i,t),S=Fl(s,t);for(let _ of f){let K=zl(l,Number(_.slice(0,4))),V=t.match==="day-month"&&t.showCount&&K!=null;o.push({id:`notedate:${t.id}:${i.relPath}:${_}`,sourceId:t.id,relPath:i.relPath,date:_,startTime:h,endTime:g,title:V?`${w} (${K})`:w,count:K,color:t.color,borderColor:t.borderColor,icon:t.icon,fields:S})}}return o}function si(e,t,n,r){return t.flatMap(o=>$l(e,o,n,r))}function ci(e,t){let n=[];for(let r of t){n.push(`#${r.id}:${r.visible?1:0}:${r.hidden?1:0}:${r.color??""}:${r.borderColor??""}:${r.icon??""}:${r.matchKey}=${r.matchValue}:${r.folder??""}:${r.dateField}:${r.dateFormat??""}:${r.startTimeField??""}:${r.endTimeField??""}:${r.match}:${r.recurrenceLimitYears??""}:${r.showCount?1:0}:${r.labelMode}:${r.labelField??""}:${r.showFields.join(",")}`);for(let o of qn(e,r)){let i=o.frontmatter;n.push(o.relPath,It(i?.[r.dateField]),r.startTimeField?It(i?.[r.startTimeField]):"",r.endTimeField?It(i?.[r.endTimeField]):"",li(o,r));for(let s of r.showFields)n.push(It(i?.[s]))}}return n.join("")}var Kl="calendar.note_date_sources",Bn=()=>m.data.dataset(Kl);async function ua(){return(await Bn().query({orderBy:[{field:"position",direction:"asc"}],limit:1e3})).rows.map(t=>ri(t.definition&&typeof t.definition=="object"&&!Array.isArray(t.definition)?t.definition:{}))}async function Ja(e){let t=Bn(),n=(await t.query({limit:1e3})).rows;await t.batch([...n.map(r=>({operation:"delete",key:{id:typeof r.id=="string"?r.id:""}})),...e.map((r,o)=>({operation:"upsert",values:{id:r.id,position:o,definition:r}}))])}function en(){let[e,t]=a.useState([]);return a.useEffect(()=>{let n=!0,r=()=>{ua().then(i=>{n&&t(i)})};r();let o=Bn().subscribe(r);return()=>{n=!1,o()}},[]),e}function Rl(e){return e.kind==="event"?wt:e.kind==="noteDate"?xt:e.sourceOwner?La(e.sourceOwner):""}function Gl(e,t){if(e.groupId){let r=t.find(o=>o.id===e.groupId);if(r)return r}if(!e.group)return;let n=Ge(e.group);return t.find(r=>Ge(r.name)===n)}function ui(e,t,n,r){if(n.length===0&&r.length===0)return e;let o=new Set(n),i=new Set(r);return e.filter(s=>{if(i.has(Rl(s)))return!1;if(o.size===0)return!0;let l=Gl(s,t);return!l||!o.has(l.id)})}function pa({label:e,options:t,hidden:n,settingsKey:r,emptyText:o,onOpenSettings:i,saveHidden:s,embedded:l=!1}){let[c,u]=a.useState(()=>[...n]),[f,h]=a.useState(!1),[g,w]=a.useState(!1);a.useEffect(()=>u([...n]),[n]);let S=t.filter(v=>!c.includes(v.id)).length,_=t.map(v=>!c.includes(v.id)),K=(v,y)=>v?` active${_[y-1]?"":" selection-run-start"}${_[y+1]?"":" selection-run-end"}`:"",V=v=>{if(g)return;u(v),w(!0),(s?s(v):r?m.settings.set(r,v).then(O=>O.ok):Promise.resolve(!1)).then(O=>{O?h(!1):(u([...n]),h(!0))}).catch(()=>{u([...n]),h(!0)}).finally(()=>w(!1))},z=v=>V(c.includes(v)?c.filter(y=>y!==v):[...c,v]),E=()=>{let v=new Set(t.map(y=>y.id));V(S===t.length?[...new Set([...c,...v])]:c.filter(y=>!v.has(y)))};return l?a.createElement("div",{className:"props-info"},a.createElement("div",{className:"props-info-actions"},i&&a.createElement("button",{type:"button",onClick:i},d("calendar.properties.manageGroups")),t.length>0&&a.createElement("button",{type:"button",disabled:g,onClick:E},d(S===t.length?"calendar.filter.deselectAll":"calendar.filter.selectAll"))),a.createElement("dl",{className:"props-info-table calendar-filter-properties"},t.map(v=>a.createElement("div",{className:"props-info-row calendar-filter-property-row",key:v.id},a.createElement("dt",{className:"props-info-key"},v.icon&&a.createElement("span",{className:"calendar-filter-property-glyph",style:v.color?{color:ce(v.color)}:void 0},v.icon),!v.icon&&v.color&&a.createElement("span",{className:"props-info-dot",style:{background:ce(v.color)}}),v.label),a.createElement("dd",{className:"props-info-value calendar-filter-property-value"},v.count!==void 0&&a.createElement("span",{className:"calendar-filter-option-count"},v.count),a.createElement(m.ui.settings.Toggle,{label:v.label,checked:!c.includes(v.id),disabled:g,onChange:()=>z(v.id)}))))),t.length===0&&a.createElement("p",{className:"props-info-hint"},o),f&&a.createElement("p",{className:"props-info-hint",role:"alert"},m.ui.t("error.commandFailed"))):a.createElement("div",{className:"calendar-filter-popover-body"},a.createElement("div",{className:"calendar-filter-popover-head"},i?a.createElement("button",{type:"button",className:"calendar-filter-popover-title actionable",onClick:i},e):a.createElement("span",{className:"calendar-filter-popover-title"},e),t.length>0&&a.createElement("button",{type:"button",className:"calendar-filter-popover-all",onClick:E},d(S===t.length?"calendar.filter.deselectAll":"calendar.filter.selectAll"))),t.length===0?a.createElement("div",{className:"calendar-filter-empty"},o):a.createElement("div",{className:"calendar-filter-list"},t.map((v,y)=>{let O=!c.includes(v.id),D=_[y];return a.createElement("button",{key:v.id,type:"button",className:`calendar-filter-option${K(D,y)}`,"aria-pressed":O,onClick:()=>z(v.id)},a.createElement("span",{className:"calendar-filter-check","aria-hidden":"true"},O?"\u2713":""),v.icon?a.createElement("span",{className:"calendar-filter-option-glyph",style:v.color?{color:ce(v.color)}:void 0},v.icon):a.createElement("span",{className:"calendar-legend-dot",style:{background:v.color?ce(v.color):"var(--text-tertiary)"}}),a.createElement("span",{className:"calendar-filter-option-label"},v.label),v.count!==void 0&&a.createElement("span",{className:"calendar-filter-option-count"},v.count))})))}function tn({label:e,icon:t,options:n,hidden:r,settingsKey:o,emptyText:i,onOpenSettings:s,saveHidden:l}){let c=n.some(u=>r.includes(u.id));return a.createElement("button",{type:"button",className:`calendar-filter-btn${c?" active":""}`,"aria-label":e,"aria-haspopup":"dialog",title:e,onClick:u=>{let f=u.currentTarget;m.ui.openPopover(({close:h})=>a.createElement(pa,{label:e,options:n,hidden:r,settingsKey:o,emptyText:i,onOpenSettings:s?()=>{h(),s()}:void 0,saveHidden:l}),{anchor:f,align:"end"},{className:"calendar-filter-popover",ariaLabel:e})}},a.createElement("span",{className:"calendar-filter-icon"},t))}function pi(){let e=en(),{indexEntries:t}=ct(),n=a.useMemo(()=>e.filter(s=>!s.hidden),[e]),r=a.useMemo(()=>n.map(s=>({id:s.id,label:s.title||d("calendar.noteDatePreset.blank"),color:s.color,icon:a.createElement($e,{id:s.icon||"pin"}),count:Qa(t,s).dated})),[t,n]),o=a.useMemo(()=>n.filter(s=>!s.visible).map(s=>s.id),[n]),i=a.useCallback(async s=>{let l=new Set(s);try{return await Ja(e.map(c=>c.hidden?c:{...c,visible:!l.has(c.id)})),!0}catch{return!1}},[e]);return{options:r,hidden:o,saveHidden:i}}function mi({embedded:e=!1}){let t=pi();return a.createElement(pa,{embedded:e,label:d("calendar.filter.noteDates"),options:t.options,hidden:t.hidden,saveHidden:t.saveHidden,emptyText:d("calendar.filter.noSources")})}function fi(){let e=pi();return a.createElement(tn,{label:d("calendar.filter.noteDates"),icon:a.createElement(To,null),options:e.options,hidden:e.hidden,saveHidden:e.saveHidden,emptyText:d("calendar.filter.noSources")})}function Se(){return m.runtime.getOrCreate("calendar.surfaces",()=>({time:Qe(),selected:new Map,navigation:new Map,listeners:new Set}))}function Jt(){for(let e of Se().listeners)e()}function We(e,t){e?Se().selected.set(t,e):Se().selected.delete(t),Jt()}function an(e,t,n){a.useEffect(()=>{Se().time=t,n&&Se().navigation.set(e,n),Jt()},[e,t,n])}function jl(e){return{...jn(Se().time),itemId:e.id,kind:e.kind,date:e.date,sourceId:e.sourceId??"",filePath:e.filePath??""}}async function Wn(e){if(typeof e.itemId!="string")return null;if(e.kind==="event"||e.kind==="sourced")return Ve({id:e.itemId,sourceId:e.kind==="sourced"&&typeof e.sourceId=="string"?e.sourceId:void 0});if(e.kind==="noteDate"&&typeof e.filePath=="string"&&m.getState().indexEntries.some(t=>t.relPath===e.filePath))return{kind:"noteDate",id:e.itemId,title:e.filePath.split("/").pop()??e.filePath,date:String(e.date??""),filePath:e.filePath,readOnly:!0};throw new Error("The bookmarked calendar item is unavailable.")}function Vl(e){let t=Se().selected.get(e);return{title:d("manifest.name"),view:jn(Se().time),navigation:Se().navigation.get(e),...t?{item:{id:je(t),title:t.title,state:jl(t)}}:{}}}function Yn(e){let t=Se().listeners;return t.add(e),()=>{t.delete(e)}}function gi(e){let t=e?{...Qe(),...ca(e)}:Se().time,n=Kt(me(t.selectedDate??Q(new Date)),ra[m.getState().weekStart]??1);return Object.entries({plugin:"calendar",view:t.view,selectedDate:t.selectedDate,month:t.cursor.slice(0,7),week:{number:yt(n),start:Q(n),end:Ut(Q(n),6)},year:Number(t.cursor.slice(0,4)),...t.rangeStart&&t.rangeEnd?{range:[t.rangeStart,t.rangeEnd].sort()}:{},...t.selectedTime?{selectedTime:t.selectedTime}:{}}).map(([r,o])=>({id:r,label:d(`calendar.overview.${r}`),value:o,readOnly:!0}))}async function hi(){let e=be(),[t,n]=await Promise.all([qe(m).listAccounts(),(async()=>{let o=[],i;do{let s=await m.data.dataset("calendar.calendars").query({limit:100,cursor:i});o.push(...s.rows),i=s.cursor}while(i);return o})()]);if(!t.ok||!t.data)throw new Error(d("calendar.overview.unavailable"));let r=[{id:wt,name:d("calendar.filter.events")},{id:xt,name:d("calendar.filter.noteDates")},...dt().map(o=>({id:o.sourceKey,name:o.integration?.localized?.[m.ui.language()]?.name??o.integration?.name??o.owner}))].filter(o=>!e.hiddenSources.includes(o.id));return[{id:"sources",label:d("calendar.overview.sources"),value:r,readOnly:!0},{id:"calendars",label:d("calendar.overview.calendars"),value:n.map(o=>({id:String(o.id),name:String(o.name),accountId:o.accountId??null,provider:o.provider??null,timezone:o.timezone??null,readOnly:o.readOnly===!0})),readOnly:!0},{id:"accounts",label:d("calendar.overview.accounts"),value:t.data.accounts.filter(o=>o.capabilities.includes("calendar")).map(o=>({id:o.id,name:o.displayName||o.address,address:o.address,provider:o.provider,enabled:!e.disabledCalendarAccounts.includes(o.id)})),readOnly:!0}]}function Hl(e){if(e.id==="plugin")return d("auto.adab5090ac6a");if(e.id==="view")return d(e.value==="week"?"auto.f82be68a7fb4":e.value==="year"?"auto.879e32326c52":"auto.082bc378cd60");if(e.id==="month"){let t=me(`${e.value}-01`);return`${et(t.getMonth(),m.ui.language())} ${t.getFullYear()}`}return e.id==="week"&&e.value&&typeof e.value=="object"&&!Array.isArray(e.value)?`${e.value.number} \xB7 ${e.value.start} \u2013 ${e.value.end}`:Array.isArray(e.value)?e.value.length?e.value.map((t,n)=>{if(!t||typeof t!="object"||Array.isArray(t))return a.createElement("div",{key:n},String(t));let r=[t.address!==t.name?t.address:null,t.provider,t.timezone,t.enabled===!1?d("calendar.overview.disabled"):null].filter(Boolean).join(" \xB7 ");return a.createElement("div",{key:String(t.id)},String(t.name),r?a.createElement("small",null,r):null)}):d("calendar.overview.none"):e.value===null?d("calendar.overview.none"):String(e.value)}function yi({view:e,sources:t=!1}){let[,n]=a.useReducer(u=>u+1,0),[r,o]=a.useState([]),[i,s]=a.useState(!1),l=Fe(),c=Vt();return a.useEffect(()=>{if(!t)return Yn(n);let u=0,f=()=>{let g=++u;n(),hi().then(w=>{g===u&&(o(w),s(!1))}).catch(()=>{g===u&&s(!0)})},h=[Yn(n),m.subscribe(f),m.settings.subscribe(f),m.data.dataset("calendar.calendars").subscribe(f),m.interop.services.subscribe(Ot,f)];return f(),()=>{u++,h.forEach(g=>g())}},[t]),a.createElement("div",{className:"right-panel-body props-info"},t&&a.createElement(pa,{embedded:!0,label:d("calendar.filter.sources"),options:[{id:wt,label:d("calendar.filter.events")},{id:xt,label:d("calendar.filter.noteDates")},...c.map(u=>({id:u.sourceKey,label:u.integration?.localized?.[m.ui.language()]?.name??u.integration?.name??u.owner}))],hidden:l.hiddenSources,settingsKey:jt,emptyText:d("calendar.overview.none")}),a.createElement("dl",{className:"props-info-table"},(t?r.filter(u=>u.id!=="sources"):gi(e)).map(u=>a.createElement("div",{className:"props-info-row",key:u.id},a.createElement("dt",{className:"props-info-key"},u.label),a.createElement("dd",{className:"props-info-value"},Hl(u))))),i&&a.createElement("p",{role:"alert"},d("calendar.overview.unavailable")))}function Ul(){let e=Fe();return a.createElement("div",{className:"right-panel-body props-info"},a.createElement(pa,{embedded:!0,label:d("calendar.filter.groups"),options:e.groups.map(t=>({id:t.id,label:t.name,color:t.color})),hidden:e.hiddenGroups,settingsKey:Ma,emptyText:d("calendar.overview.none"),onOpenSettings:()=>m.workspace.openSettings("groups")}))}function ql({item:e,view:t}){let[n,r]=a.useState(null),[o,i]=a.useState("");return a.useEffect(()=>{let s=!1,l=()=>{if(!e){r(null),i("");return}Wn(e).then(u=>{s||(r(u),i(""))}).catch(u=>{s||(r(null),i(u instanceof Error?u.message:String(u)))})};l();let c=tt(l);return()=>{s=!0,c()}},[e]),o?a.createElement("div",{className:"right-panel-body",role:"alert"},o):e?n?a.createElement("div",{className:"right-panel-body props-info"},a.createElement("dl",{className:"props-info-table"},["title","date","endDate","startTime","endTime","group","note","filePath"].filter(s=>n[s]).map(s=>a.createElement("div",{className:"props-info-row",key:s},a.createElement("dt",{className:"props-info-key"},d(`calendar.field.${s}`)),a.createElement("dd",{className:"props-info-value"},n[s]))))):a.createElement("div",{className:"right-panel-body"},d("calendar.overview.loading")):a.createElement(yi,{view:t})}function bi(e){let t=!1;e.workspace.getTimeControl().then(l=>{t||(Se().time=l,Jt())});let n=e.workspace.onTimeControlChanged(l=>{Se().time=l,Jt()}),o=["main_workspace","left_sidebar","right_sidebar"].map(l=>e.interop.extensions.provide(yr,{id:`calendar.${l}`,surface:l,getSnapshot:()=>Vl(l),subscribe:Yn,restore:async c=>{let u=ca(c);if(!u)throw new Error("Unsupported Calendar bookmark.");let f=await Wn(c);e.workspace.patchTimeControl(u),We(f,l)}}));o.push(e.interop.extensions.provide(na,{id:"calendar.properties",label:"Calendar",labelKey:"manifest.name",icon:"calendar",pluginSurfaces:["main_workspace"],inspect:async({subject:l})=>{let c=l?.item?await Wn(l.item.state):null,u=c?.kind==="event"?["title","date","endDate","startTime","endTime","groupId","note","filePath","tags","urls","attachments","location"]:["title","date","startTime","endTime","group","note","filePath","priority","completed","tags","urls","attachments","location"];return c?u.map(f=>({id:f,label:d(`calendar.field.${f}`),value:c[f]??null,readOnly:!0})):gi(l?.view)},render:({subject:l})=>a.createElement(ql,{item:l?.item?.state,view:l?.view})})),o.push(e.interop.extensions.provide(na,{id:"calendar.groups",label:"Groups",labelKey:"calendar.filter.groups",icon:"group",pluginSurfaces:["main_workspace"],inspect:()=>{let l=be();return l.groups.map(c=>({id:c.id,label:c.name,value:!l.hiddenGroups.includes(c.id),type:"boolean"}))},render:()=>a.createElement(Ul,null)})),o.push(e.interop.extensions.provide(na,{id:"calendar.sources",label:"Sources",labelKey:"calendar.filter.sources",icon:"layers",pluginSurfaces:["main_workspace"],inspect:hi,render:()=>a.createElement(yi,{sources:!0})})),o.push(e.interop.extensions.provide(na,{id:"calendar.noteDates",label:"Note dates",labelKey:"calendar.filter.noteDates",icon:"push-pin",pluginSurfaces:["main_workspace"],inspect:async()=>(await ua()).filter(l=>!l.hidden).map(l=>({id:l.id,label:l.title||d("calendar.noteDatePreset.blank"),value:l.visible,type:"boolean"})),render:()=>a.createElement("div",{className:"right-panel-body"},a.createElement(mi,{embedded:!0}))}));let i=0,s=()=>{let l=++i;for(let[c,u]of Se().selected)u.kind!=="noteDate"&&Ve({id:u.id,sourceId:u.sourceId}).then(f=>{t||l!==i||Se().selected.get(c)?.id!==u.id||(Se().selected.set(c,f),Jt())}).catch(()=>{t||Jt()})};return o.push(tt(s)),()=>{t=!0,n(),o.forEach(l=>l())}}function Xn(e,t){let[n,r]=a.useState([]),{items:o,reload:i}=io(),s=kt(),l=a.useSyncExternalStore(s.subscribe,s.getEvents),c=a.useRef(null),u=a.useCallback(()=>{i(),c.current?.reload()},[i]);a.useEffect(()=>{let h=Oa(()=>Oe(e,t),r,S=>console.error("[calendar] events reload failed",S));c.current=h,h.reload();let g=tt(u),w=m.subscribe(u);return()=>{h.dispose(),c.current===h&&(c.current=null),g(),w()}},[t,u,e]);let f=a.useMemo(()=>[...n,...l],[n,l]);return{sourced:o,events:f,reload:u}}var vi={high:Te("red"),medium:Te("amber"),low:Te("green"),normal:Te("gray")},wi={active:Te("primary-blue"),paused:Te("amber"),suspended:Te("violet"),completed:Te("green"),open:Te("gray")},Bl=Te("gray");function xi(e){return e.priority&&vi[e.priority]?vi[e.priority]:e.status&&wi[e.status]?wi[e.status]:Bl}function Wl(e,t){if(e.color)return e.color;if(e.groupId){let n=t.find(r=>r.id===e.groupId);if(n)return n.color}return xi({priority:e.priority,status:e.status})}function Yl(e){return e.endDate?ho(e.date,e.endDate).map(t=>({...e,date:t,occurrenceKey:`${e.id}@${t}`})):[e]}function ki(e){return e.filePath?[e.filePath,e.date,e.endDate??e.date,e.startTime??"",e.endTime??""].join("\0"):null}function Xl(e){let t=new Set(e.filter(n=>n.kind==="sourced").map(ki).filter(n=>n!==null));return e.filter(n=>{if(n.kind!=="event"||n.event?.source||n.event?.endDate)return!0;let r=ki(n);return r===null||!t.has(r)})}function nn(e={}){let{focusYear:t}=e,{indexEntries:n}=ct(),{groups:r,hiddenGroups:o,hiddenSources:i}=Fe(),s=Vt(),l=en(),c=a.useMemo(()=>di(new Date,t),[t]),{sourced:u,events:f}=Xn(`${c[0]}-01-01`,`${c.at(-1)}-12-31`),h=a.useRef({signature:"",years:"",entries:[]}),g=a.useMemo(()=>{let E=ci(n,l),v=t??new Date().getFullYear(),y=`${v}:${c.join(",")}`,O=h.current;if(O.years===y&&O.signature===E)return O.entries;let D=si(n,l,c,v);return h.current={signature:E,years:y,entries:D},D},[t,n,l,c]),w=a.useMemo(()=>[...u.map(Wt),...f.map(Be),...g.map(Vo)],[u,f,g]),S=a.useMemo(()=>{let E=[];for(let v of w)E.push(...v.kind==="event"?Yl(v):[v]);return Xl(ui(E,r,o,i))},[w,r,o,i]),_=a.useMemo(()=>{let E=[{id:wt,label:d("calendar.filter.events"),count:f.length},{id:xt,label:d("calendar.filter.noteDates"),count:g.length}],v=new Set;for(let y of s){if(v.has(y.sourceKey))continue;v.add(y.sourceKey);let O=y.integration?.localized?.[m.ui.language()];E.push({id:y.sourceKey,label:O?.name??y.integration?.name??y.owner,count:u.filter(D=>D.sourceOwner===y.owner).length})}return E},[f.length,g.length,s,u]),K=a.useMemo(()=>{let E=Object.fromEntries(r.map(v=>[v.id,0]));for(let v of w){let y=v.groupId?r.find(O=>O.id===v.groupId):eo(r,v.group);y&&(E[y.id]=(E[y.id]??0)+1)}return E},[w,r]),V=a.useCallback(E=>Wl(E,r),[r]),z=a.useMemo(()=>{let E=new Map;for(let v of S){let y=E.get(v.date)??[];y.push(v),E.set(v.date,y)}for(let v of E.values())v.sort((y,O)=>(y.startTime??"99:99").localeCompare(O.startTime??"99:99"));return E},[S]);return{sourced:u,events:f,items:S,itemsByDay:z,noteDates:g,sourceOptions:_,groupCounts:K,colorFor:V}}var Zl=["normal","low","medium","high"],Ql={normal:"calendar.priority.none",low:"calendar.priority.low",medium:"calendar.priority.medium",high:"calendar.priority.high"};function rn(e){let t=m.runtime.getOrCreate("calendar.eventDrafts",()=>new Map),n=t.get(e);return n||(n={fields:new Map,listeners:new Set},t.set(e,n)),n}function ve(e,t,n){let r=rn(e),o=a.useRef(n);o.current=n;let i=a.useCallback(()=>{if(!r.fields.has(t)){let c=o.current;r.fields.set(t,typeof c=="function"?c():c)}return r.fields.get(t)},[r,t]),s=a.useSyncExternalStore(a.useCallback(c=>(r.listeners.add(c),()=>{r.listeners.delete(c)}),[r]),i,i),l=a.useCallback(c=>{r.fields.set(t,typeof c=="function"?c(i()):c);for(let u of r.listeners)u()},[r,t,i]);return[s,l]}function Zn({title:e,children:t}){return a.createElement("div",{className:"calendar-quickadd-section"},a.createElement("span",{className:"calendar-quickadd-section-label"},e),t)}function Dt({glyph:e,children:t}){return a.createElement("div",{className:"calendar-quickadd-row"},a.createElement("span",{className:"calendar-quickadd-row-glyph","aria-hidden":"true"},e),a.createElement("div",{className:"calendar-quickadd-row-body"},t))}function on(e){let t=e.state.editItem,n=t?.kind==="sourced",r=n?t.sourceId??"":"",o=n?t.id:"",i=a.useRef(e.onClose);return i.current=e.onClose,a.useEffect(()=>{n&&Ht(r,o).then(()=>i.current())},[n,r,o]),n?null:a.createElement(Jl,{...e})}function Jl({state:e,groups:t,indexEntries:n,onClose:r,onAdded:o}){let i=e.editItem,s=i?`${i.sourceId??i.kind}:${i.id}`:`new:${e.kind??""}:${e.date}:${e.startTime??""}`,[l]=a.useState(()=>so()),c=e.kind??l[0]?.id??"event",[u,f]=ve(s,"kind",i?.kind==="sourced"?i.sourceId??c:i?.kind==="event"?"event":c),[h,g]=ve(s,"title",i?.title??""),[w,S]=ve(s,"date",i?.date??e.date),[_,K]=ve(s,"endDate",i?.event?.endDate??""),[V,z]=ve(s,"start",i?.startTime??e.startTime??""),[E,v]=ve(s,"end",i?.endTime??e.endTime??""),[y,O]=ve(s,"groupId",()=>{let T=i?.event?.groupId??i?.sourced?.group??"";return t.find(Z=>Z.id===T)?.id??t.find(Z=>Z.name===T)?.id??""}),[D,J]=ve(s,"location",i?.event?.location??i?.sourced?.location),[ne,te]=ve(s,"note",i?.event?.note??i?.sourced?.note??""),[B,fe]=ve(s,"urls",i?.event?.urls??i?.sourced?.urls??[]),[we,Ee]=ve(s,"attachments",i?.event?.attachments??i?.sourced?.attachments??[]),[b,R]=a.useState(!1),[P,W]=a.useState(""),[de,C]=a.useState(!1),[H,U]=a.useState(""),[se,re]=ve(s,"priority",i?.sourced?.priority??"normal"),[ue,He]=ve(s,"tags",i?.sourced?.tags??i?.event?.tags??[]),[Pe,ze]=ve(s,"filePath",i?.sourced?.filePath??i?.event?.filePath??""),[Ke,Ye]=ve(s,"busy",!1),[Tt,Ie]=ve(s,"error",""),x=T=>{let Z=kn(T);Z&&!B.includes(Z)&&fe([...B,Z]),U(""),C(!1)},A=!V&&!E,Y=T=>{T?(z(""),v("")):(z(e.startTime??"09:00"),v(e.endTime??"10:00"))},[M]=ve(s,"expectedUpdatedAt",i?.event?.updatedAt),[k,oe]=ve(s,"documentRevision",void 0),X=i?.kind==="event"&&!i.readOnly?{pluginId:"calendar",sourceId:"events",itemId:i.id}:void 0,ge=async()=>{if(!Ke)try{X&&await m.documents.drafts.clear(X),rn(s).fields.clear(),r()}catch(T){Ie(T instanceof Error?T.message:String(T))}},he=async()=>{let T=h.trim();if(!(!T||rn(s).fields.get("busy")||i?.readOnly)){Ye(!0),Ie("");try{let Z=new Date().toISOString(),ot=w||e.date,cn=t.find(Ze=>Ze.id===y)?.name,it={location:D,urls:B.length>0?B:void 0,attachments:we.length>0?we:void 0,filePath:Pe.trim()||void 0,note:ne},ta={...it,groupId:y||void 0,tags:ue},un={...it,group:cn,tags:ue,priority:se};if(i){if(i.kind==="event"&&i.event){if(!k)throw new Error(d("calendar.error.save"));let Ze=(await Oe()).find(tr=>tr.id===i.id);if(!Ze)throw new Error(d("calendar.error.missing"));if(Ze.updatedAt!==M)throw new Error(d("calendar.error.changed"));if(!await Da(i.id,{...Ze,allDay:!V&&!E,title:T,date:ot,endDate:_||void 0,startTime:V||void 0,endTime:E||void 0,...ta,updatedAt:Z},M,k))throw new Error(d("calendar.error.save"))}}else if(u==="event"){if(!await Wr(Aa(T,ot,{endDate:_||void 0,startTime:V||void 0,endTime:E||void 0,...ta})))throw new Error(d("calendar.error.save"))}else if(!await Ga(u,ot,{title:T,startTime:V||void 0,endTime:E||void 0,...un,completed:!1}))throw new Error(d("calendar.error.save"));X&&await m.documents.drafts.clear(X),rn(s).fields.clear(),o(),r()}catch(Z){Ie(Z instanceof Error?Z.message:String(Z))}finally{Ye(!1)}}},Me=u==="event",ut=T=>T==="event"?d("auto.ad8919ace091"):m.ui.t(l.find(Z=>Z.id===T)?.labelKey??T),{SelectField:ea,DateField:pt,TimeField:rt,Segmented:Xe,Toggle:De}=m.ui.settings;return a.createElement(m.ui.Modal,{title:i?d("calendar.quickadd.editTitle",{kind:ut(u)}):d("auto.61cc55aa0453"),bodyClassName:"calendar-quickadd",onClose:()=>{ge()},footer:a.createElement(a.Fragment,null,a.createElement("button",{className:"calendar-quickadd-cancel",type:"button",disabled:Ke,onClick:()=>{ge()}},d("auto.77dfd2135f4d")),!i?.readOnly&&a.createElement("button",{className:"calendar-quickadd-save",type:"button",onClick:()=>{he()},disabled:!h.trim()||Ke||!!X&&!k},i?d("auto.efc007a393f6"):d("auto.61cc55aa0453")))},!i&&a.createElement("div",{className:"calendar-quickadd-head"},a.createElement(Xe,{value:u,onChange:f,ariaLabel:d("calendar.quickadd.kind"),options:[{value:"event",label:d("auto.ad8919ace091")},...l.map(T=>({value:T.id,label:m.ui.t(T.labelKey)}))]})),a.createElement("div",{className:"calendar-quickadd-body hidescrollbar"},a.createElement("fieldset",{disabled:!!i?.readOnly,style:{display:"contents"}},a.createElement("input",{"data-modal-initial-focus":"true","aria-label":d("auto.768e0c1c6957"),className:"calendar-quickadd-title",value:h,onChange:T=>g(T.target.value),onKeyDown:T=>{T.key==="Enter"&&he()},placeholder:Me?d("auto.0cd372226ee9"):d("auto.33a5a701e541")}),a.createElement(Zn,{title:d("calendar.quickadd.when")},a.createElement(Dt,{glyph:a.createElement(st,null)},a.createElement("div",{className:"calendar-quickadd-dates"},a.createElement(pt,{className:"calendar-quickadd-date",value:w,onChange:S,clearable:!1,ariaLabel:Me?d("calendar.quickadd.startDate"):d("calendar.quickadd.dueDate")}),Me&&a.createElement(a.Fragment,null,a.createElement("span",{className:"calendar-quickadd-dash","aria-hidden":"true"},"\u2192"),a.createElement(pt,{className:"calendar-quickadd-date",value:_,onChange:K,min:w,placeholder:d("calendar.quickadd.endDate"),ariaLabel:d("calendar.quickadd.endDate")})))),a.createElement(Dt,{glyph:a.createElement(ia,null)},a.createElement("div",{className:"calendar-quickadd-times"},a.createElement(rt,{value:V,disabled:A,onChange:z,ariaLabel:d("auto.88d8206d586a")}),a.createElement("span",{"aria-hidden":"true"},"\u2013"),a.createElement(rt,{value:E,disabled:A,onChange:v,ariaLabel:d("auto.cd7800da7f4f")}),a.createElement("span",{className:"calendar-quickadd-allday"},d("calendar.quickadd.allDay"),a.createElement(De,{checked:A,onChange:Y,label:d("calendar.quickadd.allDay")}))))),a.createElement(Zn,{title:d("calendar.quickadd.details")},t.length>0&&a.createElement(Dt,{glyph:a.createElement(Co,null)},a.createElement(ea,{className:"calendar-quickadd-select",value:y,onChange:O,ariaLabel:d("auto.dbed7864623f"),options:[{value:"",label:d("auto.f6b2246c64fa")},...t.map(T=>({value:T.id,label:T.name,color:T.color}))]})),a.createElement(Dt,{glyph:a.createElement(qt,null)},a.createElement(Go,{value:D,onChange:J})),a.createElement(Dt,{glyph:a.createElement(Bt,null)},a.createElement(Mn,{value:Pe,onChange:ze,indexEntries:n})),a.createElement(Dt,{glyph:a.createElement(Io,null)},a.createElement(m.ui.TagInput,{value:ue,onChange:He,readOnly:!!i?.readOnly})),!Me&&a.createElement(Dt,{glyph:a.createElement(Do,null)},a.createElement(Xe,{value:se,onChange:T=>re(T),ariaLabel:d("calendar.quickadd.priority"),options:Zl.map(T=>({value:T,label:d(Ql[T])}))}))),a.createElement(Zn,{title:d("calendar.attachments")},we.map(T=>a.createElement(Fo,{key:T,relPath:T,onRemove:()=>Ee(we.filter(Z=>Z!==T))})),B.map(T=>a.createElement("div",{className:"calendar-quickadd-url-row",key:T},a.createElement("button",{className:"calendar-quickadd-url",type:"button",onClick:Z=>{let ot=xa(T);ot?m.workspace.openFile(ot,void 0,{newTab:m.ui.hasModKey(Z)}):m.files.openExternalUrl(T)}},T),a.createElement("button",{className:"calendar-field-btn",type:"button",title:d("calendar.removeUrl"),"aria-label":d("calendar.removeUrlOf",{p0:T}),onClick:()=>fe(B.filter(Z=>Z!==T))},a.createElement(at,null)))),b?a.createElement(Mn,{value:P,placeholder:d("calendar.attachmentPlaceholder"),ariaLabel:d("calendar.attachmentPath"),onChange:T=>{W(T),n.some(Z=>Z.relPath===T)&&(we.includes(T)||Ee([...we,T]),W(""),R(!1))},indexEntries:n}):null,de?a.createElement("input",{className:"calendar-quickadd-input",value:H,autoFocus:!0,placeholder:d("calendar.urlPlaceholder"),"aria-label":d("calendar.url"),onChange:T=>U(T.target.value),onBlur:T=>x(T.target.value),onKeyDown:T=>{T.key==="Enter"&&(T.preventDefault(),x(T.currentTarget.value)),T.key==="Escape"&&(U(""),C(!1))}}):null,a.createElement("div",{className:"calendar-quickadd-adders"},!b&&a.createElement("button",{className:"calendar-quickadd-add",type:"button",onClick:()=>R(!0)},a.createElement(lt,null)," ",d("calendar.addAttachment")),!de&&a.createElement("button",{className:"calendar-quickadd-add",type:"button",onClick:()=>C(!0)},a.createElement(St,null)," ",d("calendar.addUrl"))),a.createElement(m.ui.NoteInput,{onRevisionChange:T=>oe(Z=>!Z||T.expectedRevision<Z.expectedRevision?T:Z),className:"calendar-quickadd-note",value:ne,onChange:te,context:{sourcePath:Pe||void 0,ref:X},tags:ue,onTagsChange:He,onSave:()=>{he()},onCancel:()=>{ge()},placeholder:d("auto.1a29d1bf66f5"),minHeight:100,maxHeight:340,readOnly:!!i?.readOnly}))),Tt&&a.createElement("div",{role:"alert"},Tt)))}function es(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function ts(e){let t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${r}`}function Ci(){let e=new Date,t=ts(e),[n,r]=Ya();an("left_sidebar",n);let{items:o,sourceOptions:i,groupCounts:s,colorFor:l}=nn(),{groups:c,hiddenGroups:u,hiddenSources:f}=Fe(),h=a.useRef(null),g=ht(),w=a.useSyncExternalStore(a.useCallback(b=>g.subscribe(b),[g]),a.useCallback(()=>{let b=g.get();return b?.surface==="agenda"?b:null},[g]),a.useCallback(()=>{let b=g.get();return b?.surface==="agenda"?b:null},[g])),S=a.useRef(new Map),_=a.useRef(!1),K=a.useRef(null),[V,z]=a.useState(!0),[E,v]=a.useState(""),[y,O]=a.useState(null),D=a.useRef(null),J=a.useCallback(b=>{We(b,"left_sidebar"),D.current&&clearTimeout(D.current),D.current=setTimeout(()=>{D.current=null,K.current=b.date,jo(b)},220)},[]),ne=a.useCallback(b=>{if(D.current&&(clearTimeout(D.current),D.current=null),We(b,"left_sidebar"),!b.readOnly){if(b.kind==="sourced"){Ht(b.sourceId??"",b.id);return}O({date:b.date,editItem:b})}},[]);a.useEffect(()=>()=>{D.current&&clearTimeout(D.current)},[]);let te=a.useMemo(()=>{let b=E.trim().toLowerCase();return b?o.filter(R=>[R.title,R.note,R.group,R.status,R.location?.name,...R.tags??[],...(R.fields??[]).flatMap(P=>[P.key,P.value])].some(P=>P?.toLowerCase().includes(b))):o},[o,E]),{days:B,byDay:fe}=a.useMemo(()=>{let b=new Map;for(let P of te){let W=b.get(P.date)??[];W.push(P),b.set(P.date,W)}for(let P of b.values())P.sort((W,de)=>(W.startTime??"99:99").localeCompare(de.startTime??"99:99"));return!E.trim()&&n.selectedDate&&!b.has(n.selectedDate)&&b.set(n.selectedDate,[]),{days:[...b.keys()].sort((P,W)=>W.localeCompare(P)),byDay:b}},[E,n.selectedDate,te]);a.useEffect(()=>{if(_.current||B.length===0)return;let b=B.includes(t)?t:[...B].reverse().find(P=>P>=t);if(!b){_.current=!0;return}let R=S.current.get(b);R&&typeof R.scrollIntoView=="function"&&(R.scrollIntoView({block:"start"}),_.current=!0)},[B,t]),a.useEffect(()=>{if(!n.selectedDate)return;if(K.current===n.selectedDate){K.current=null;return}let b=S.current.get(n.selectedDate);b&&typeof b.scrollIntoView=="function"&&b.scrollIntoView({behavior:"smooth",block:"start"})},[n.selectedDate]),a.useEffect(()=>{if(!w)return;let b=requestAnimationFrame(()=>{[...h.current?.querySelectorAll("[data-calendar-item-id]")??[]].find(W=>W.dataset.calendarItemId===w.itemId&&(W.dataset.calendarSourceId??"")===w.sourceId)?.scrollIntoView({behavior:"smooth",block:"center"})});return()=>cancelAnimationFrame(b)},[w]),a.useEffect(()=>{let b=h.current;if(!b)return;let R=()=>{let P=S.current.get(t);if(!P){z(!1);return}let W=b.getBoundingClientRect(),de=P.getBoundingClientRect();z(de.bottom>W.top&&de.top<W.bottom)};return b.addEventListener("scroll",R,{passive:!0}),R(),()=>b.removeEventListener("scroll",R)},[t,B]);function we(){let b=S.current.get(t);b&&b.scrollIntoView({behavior:"smooth",block:"start"})}let Ee=async(b,R)=>{R.preventDefault(),R.stopPropagation(),We(b,"left_sidebar");let P=await qa(b,{onEdit:()=>ne(b)}),W=Ba(b),de=Wa(b),C=[...P,...de],H=C.length>0?[]:Xt(b),U=[...C,...C.length>0&&(H.length>0||W.length>0)?[{type:"separator"}]:[],...H,...W];U.length!==0&&await m.ui.openMenu(U,{x:R.clientX,y:R.clientY})};return a.createElement("div",{className:"panel calendar-agenda-panel"},a.createElement("div",{className:"panel-header"},a.createElement("span",{className:"panel-title"},d("auto.891e9d6d47f1")),a.createElement("div",{className:"agenda-header-actions"},a.createElement(tn,{label:d("calendar.filter.sources"),icon:a.createElement(xo,null),options:i.map(b=>({...b,color:"palette:primary-blue"})),hidden:f,settingsKey:jt,emptyText:d("calendar.filter.noSources")}),a.createElement(tn,{label:d("calendar.filter.groups"),icon:a.createElement(ko,null),options:c.map(b=>({id:b.id,label:b.name,color:b.color,count:s[b.id]??0})),hidden:u,settingsKey:Ma,emptyText:d("calendar.filter.noGroups"),onOpenSettings:()=>m.workspace.openSettings("groups")}),a.createElement(fi,null),!V&&a.createElement("button",{className:"agenda-today-btn",onClick:we},d("auto.24345a14377f")),a.createElement("button",{className:"plugin-open-page",onClick:()=>m.workspace.openMainTab(),"aria-label":d("auto.9ee309dcedc9"),title:d("auto.9ee309dcedc9")}))),a.createElement("div",{className:"agenda-search search-field"},a.createElement(wo,{className:"search-field-icon"}),a.createElement("input",{className:"search-field-input",value:E,onChange:b=>v(b.target.value),onKeyDown:b=>{b.key==="Escape"&&v("")},placeholder:d("calendar.agenda.searchPlaceholder"),"aria-label":d("calendar.agenda.searchLabel")}),E&&a.createElement("button",{className:"search-field-action",type:"button",onClick:()=>v(""),"aria-label":d("calendar.agenda.clearSearch")},a.createElement(at,null))),a.createElement("div",{className:"panel-body agenda-body hidescrollbar",ref:h},B.length===0?a.createElement("div",{className:"tree-empty"},d("auto.418713defbf7")):B.map((b,R)=>{let P=me(b),W=fe.get(b)??[],de=es(P,e),C=n.selectedDate===b,H=P.getFullYear(),U=R>0?me(B[R-1]).getFullYear():null;return a.createElement("div",{key:b,className:"agenda-section",ref:re=>{re?S.current.set(b,re):S.current.delete(b)}},U!==null&&H!==U&&a.createElement("div",{className:"agenda-year-sep"},H),a.createElement("button",{type:"button",className:`agenda-day-header${de?" today":""}${C?" selected":""}`,onClick:()=>r({selectedDate:C?null:b,rangeStart:null,rangeEnd:null})},a.createElement("span",{className:"agenda-day-dow"},Je(P.getDay(),m.ui.language())),a.createElement("span",{className:"agenda-day-num"},P.getDate()),a.createElement("span",{className:"agenda-day-month"},et(P.getMonth(),m.ui.language()))),W.length===0?a.createElement("div",{className:"agenda-day-empty"},d("auto.f4e12416c6b8")):W.map(re=>{let ue=w?.itemId===re.id&&w.sourceId===(re.sourceId??"");return a.createElement(Ua,{key:`${re.occurrenceKey??re.id}:${ue?w?.nonce:0}`,item:re,sourceId:re.sourceId??"",color:l(re),revealNonce:ue?w?.nonce:void 0,onClick:()=>J(re),onDoubleClick:()=>ne(re),onContextMenu:He=>{Ee(re,He)}})}))})),y&&a.createElement(on,{key:`${y.editItem?.sourceId??y.editItem?.kind}:${y.editItem?.id}`,state:y,groups:c,indexEntries:m.getState().indexEntries,onClose:()=>O(null),onAdded:()=>O(null)}))}var as=60,ns=5,rs=.22;function os(e){let t=[];return e.forEach((n,r)=>{if(!n.startTime)return;let o=Ne(n.startTime),i=n.endTime?Ne(n.endTime):o+as;t.push({id:n.id,start:o,end:Math.max(i,o+ns),order:r})}),t.sort((n,r)=>n.start-r.start||r.end-n.end||n.order-r.order)}function is(e,t){return e.start<t.end&&t.start<e.end}function ds(e,t,n,r){return!e.some(o=>o.id!==r.id&&t.get(o.id)===n&&is(o,r))}function ls(e,t){let n=[],r=new Map;for(let s of e){let l=n.findIndex(c=>c<=s.start);l===-1&&(l=n.length),n[l]=s.end,r.set(s.id,l)}let o=n.length;if(o===1){for(let s of e)t.set(s.id,{left:0,width:1,z:1});return}let i=1/o;for(let s of e){let l=r.get(s.id)??0,c=1;for(;l+c<o&&ds(e,r,l+c,s);)c++;let u=l>0?rs*i:0;t.set(s.id,{left:l*i-u,width:c*i+u,z:l+1})}}function Si(e){let t=new Map,n=[],r=-1,o=()=>{n.length>0&&ls(n,t),n=[],r=-1};for(let i of os(e))n.length>0&&i.start>=r&&o(),n.push(i),r=Math.max(r,i.end);return o(),t}var ke=44,nt=15,Qn=24;function ss(e,t,n){let r=Math.max(0,Math.min(t,Qn-1)),o=Math.min(Qn,Math.max(n,r+1));for(let i of e){if(!i.startTime)continue;let s=Ne(i.startTime),l=i.endTime?Ne(i.endTime):s;r=Math.min(r,Math.max(0,Math.floor(s/60))),o=Math.max(o,Math.min(Qn,Math.ceil(l/60)))}return{startHour:r,endHour:o}}function Ii({days:e,items:t,dayStartHour:n,dayEndHour:r,colorFor:o,selectedItemKey:i,onSelectItem:s,onEditItem:l,onCommit:c,onCreate:u,onContextMenu:f,onItemAction:h,compact:g,weekDays:w,selectedDay:S,selectedTime:_,itemsByDay:K,onPickDay:V,revealTarget:z}){let E=new Date,v=a.useRef(null),[y,O]=a.useState(0),[D,J]=a.useState(null),ne=a.useRef(null);ne.current=D;let te=a.useRef(!1),[B,fe]=a.useState(()=>new Date);a.useEffect(()=>{let x=setInterval(()=>fe(new Date),6e4);return()=>clearInterval(x)},[]);let we=e.length;a.useEffect(()=>{let x=v.current,A=x?.ownerDocument.defaultView?.ResizeObserver??globalThis.ResizeObserver;if(!x||!A)return;let Y=new A(()=>{O(Math.max(0,(x.clientWidth-48)/we))});return Y.observe(x),()=>Y.disconnect()},[we]);let Ee=e.map(Q),{startHour:b,endHour:R}=a.useMemo(()=>ss(t,n,r),[t,n,r]),P=b*60,W=R*60,de=Array.from({length:R-b},(x,A)=>b+A);a.useEffect(()=>{let x=v.current;if(!x||!_)return;let A=Math.max(0,(Ne(_)-P)/60*ke-ke);typeof x.scrollTo=="function"?x.scrollTo({top:A,behavior:"smooth"}):x.scrollTop=A},[_,P]);let C=t.filter(x=>x.startTime),H=e,U=t.filter(x=>!x.startTime),se=a.useMemo(()=>{let x=new Map;for(let Y of t){if(!Y.startTime)continue;let M=x.get(Y.date)??[];M.push(Y),x.set(Y.date,M)}let A=new Map;for(let[Y,M]of x)for(let[k,oe]of Si(M))A.set(`${Y}:${k}`,oe);return A},[t]),re=B.getHours()*60+B.getMinutes(),ue=e.findIndex(x=>Re(x,B)),He=ue>=0&&re>=P&&re<=W,Pe=(re-P)/60*ke,ze=(x,A,Y)=>{if(x.preventDefault(),x.stopPropagation(),A.readOnly)return;let M=Ee.indexOf(A.date);if(M===-1)return;te.current=!1;let k=A.startTime?Ne(A.startTime):P,oe=A.endTime?Ne(A.endTime):k+60;J({id:A.id,mode:Y,startX:x.clientX,startY:x.clientY,origDateIndex:M,origStartMin:k,origEndMin:oe,dateIndex:M,startMin:k,endMin:oe}),x.target.setPointerCapture?.(x.pointerId)},Ke=x=>{let A=ne.current;if(!A)return;(Math.abs(x.clientX-A.startX)>3||Math.abs(x.clientY-A.startY)>3)&&(te.current=!0);let Y=x.clientY-A.startY,M=Math.round(Y/ke*60/nt)*nt;if(A.mode==="create"){let k=A.origStartMin+M,oe=Math.max(P,Math.min(A.origStartMin,k)),X=Math.min(W,Math.max(A.origStartMin,k));J({...A,startMin:oe,endMin:X>oe?X:oe+nt})}else if(A.mode==="move"){let k=x.clientX-A.startX,oe=y?Math.round(k/y):0,X=A.origEndMin-A.origStartMin,ge=Math.max(0,Math.min(we-1,A.origDateIndex+oe)),he=Math.max(P,Math.min(W-X,A.origStartMin+M));J({...A,dateIndex:ge,startMin:he,endMin:he+X})}else{let k=Math.max(A.origStartMin+nt,Math.min(W,A.origEndMin+M));J({...A,endMin:k})}},Ye=()=>{let x=ne.current;if(!x)return;if(J(null),x.mode==="create"){let M=Ee[x.dateIndex];u(M,_e(x.startMin),_e(x.endMin));return}let A=C.find(M=>M.id===x.id);if(!A)return;(x.dateIndex!==x.origDateIndex||x.startMin!==x.origStartMin||x.endMin!==x.origEndMin)&&c(A,Ee[x.dateIndex],_e(x.startMin),_e(x.endMin))},Tt=(x,A)=>{if(ne.current)return;x.preventDefault();let Y=x.currentTarget.getBoundingClientRect(),M=x.clientY-Y.top,k=P+M/ke*60,oe=Math.round(k/nt)*nt,X=Math.max(P,Math.min(W-nt,oe));te.current=!1,J({id:"__create__",mode:"create",startX:x.clientX,startY:x.clientY,origDateIndex:A,origStartMin:X,origEndMin:X+60,dateIndex:A,startMin:X,endMin:X+60}),x.target.setPointerCapture?.(x.pointerId)},Ie=(x,A)=>{let Y=A.getBoundingClientRect(),M=x.clientY-Y.top,k=P+M/ke*60;return _e(Math.round(k/nt)*nt)};return a.createElement("div",{className:"calendar-weekgrid",style:{"--week-cols":we}},g&&w&&V?a.createElement("div",{className:"calendar-weekgrid-daypicker"},w.map(x=>{let A=S?Re(x,S):!1,Y=Re(x,E),M=(K?.get(Q(x))?.length??0)>0;return a.createElement("button",{key:Q(x),type:"button",className:`calendar-daypick${A?" selected":""}${Y?" today":""}`,onClick:()=>V(x)},a.createElement("span",{className:"calendar-daypick-dow"},Je(x.getDay(),m.ui.language())),a.createElement("span",{className:"calendar-daypick-num"},x.getDate()),a.createElement("span",{className:`calendar-daypick-dot${M?" on":""}`}))})):a.createElement("div",{className:"calendar-weekgrid-head"},a.createElement("div",{className:"calendar-weekgrid-gutter calendar-weekgrid-headgutter"}),e.map(x=>{let A=S?Re(x,S):!1;return a.createElement("button",{key:Q(x),type:"button",className:`calendar-weekgrid-dayhead${Re(x,E)?" today":""}${A?" selected":""}`,onClick:()=>V?.(x)},a.createElement("span",{className:"calendar-weekgrid-dow"},Je(x.getDay(),m.ui.language())),a.createElement("span",{className:"calendar-weekgrid-dom"},x.getDate()))})),U.length>0&&a.createElement("div",{className:`calendar-weekgrid-allday${g?" calendar-weekgrid-allday--compact":""}`},a.createElement("div",{className:"calendar-weekgrid-gutter"},d("auto.1ac1ff7616a6")),H.map(x=>{let A=Q(x),Y=U.filter(M=>M.date===A);return a.createElement("div",{key:A,className:"calendar-weekgrid-alldaycol"},Y.map(M=>{let k=Ei(M,z),oe=je(M)===i;return a.createElement("button",{key:`${M.occurrenceKey??M.id}:${k?z?.nonce:0}`,className:`calendar-chip${M.borderColor?" outlined":""}${oe?" selected":""}${k?" calendar-reveal-target":""}`,"aria-pressed":oe,"data-calendar-source-id":M.sourceId,"data-calendar-item-id":M.id,style:{"--chip-color":ce(o(M)),...M.borderColor?{"--chip-border":ce(M.borderColor)}:{}},title:Yt(M),onClick:X=>{X.stopPropagation(),s(M)},onDoubleClick:X=>{X.stopPropagation(),l(M)},onContextMenu:X=>{X.preventDefault(),X.stopPropagation(),h?.(M,X)}},M.icon&&a.createElement($e,{id:M.icon,className:"calendar-chip-glyph"}),a.createElement("span",{className:"calendar-chip-title"},M.title),a.createElement(Et,{badges:M.badges}))}))})),a.createElement("div",{className:"calendar-weekgrid-body",ref:v,onPointerMove:Ke,onPointerUp:Ye,onPointerCancel:Ye},a.createElement("div",{className:"calendar-weekgrid-gutter calendar-weekgrid-hours"},de.map(x=>a.createElement("div",{key:x,className:"calendar-weekgrid-hour",style:{height:ke}},String(x).padStart(2,"0"),":00"))),e.map((x,A)=>{let Y=Q(x),M=C.filter(k=>k.date===Y);return a.createElement("div",{key:Y,className:"calendar-weekgrid-col",style:{height:de.length*ke},onPointerDown:k=>Tt(k,A),onContextMenu:k=>{k.preventDefault(),k.stopPropagation(),f?.(k,Y,Ie(k,k.currentTarget))}},de.map(k=>a.createElement("div",{key:k,className:"calendar-weekgrid-cell",style:{height:ke}})),M.map(k=>{let oe=Ei(k,z),X=je(k)===i,ge=D?.id===k.id,he=ge?D.startMin:Ne(k.startTime),Me=ge?D.endMin:k.endTime?Ne(k.endTime):he+60,ut=(he-P)/60*ke,ea=Math.max(18,(Me-he)/60*ke),pt=D?.mode==="move"&&D.id===k.id&&D.dateIndex===A,rt=D?.mode==="move"&&D.id===k.id&&D.dateIndex!==A,Xe=ge?void 0:se.get(`${Y}:${k.id}`);return a.createElement("div",{key:`${k.occurrenceKey??k.id}:${oe?z?.nonce:0}`,className:`calendar-weekgrid-block${k.borderColor?" outlined":""}${k.completed?" completed":""}${X?" selected":""}${ge&&D.mode!=="move"||pt?" dragging":""}${rt?" drag-ghost":""}${oe?" calendar-reveal-target":""}`,"aria-selected":X,"data-calendar-source-id":k.sourceId,"data-calendar-item-id":k.id,style:{top:rt?k.startTime?(Ne(k.startTime)-P)/60*ke:0:ut,height:rt?Math.max(18,((k.endTime?Ne(k.endTime):(k.startTime?Ne(k.startTime):0)+60)-(k.startTime?Ne(k.startTime):0))/60*ke):ea,"--chip-color":ce(o(k)),...k.borderColor?{"--chip-border":ce(k.borderColor)}:{},zIndex:ge&&D.mode!=="move"||pt?9:X?7:Xe?.z,...Xe?{"--block-left":`${Xe.left*100}%`,"--block-width":`${Xe.width*100}%`}:{}},onPointerDown:De=>ze(De,k,"move"),onClick:De=>{De.stopPropagation(),te.current||s(k)},onDoubleClick:De=>{De.stopPropagation(),te.current||l(k)},onContextMenu:De=>{De.preventDefault(),De.stopPropagation(),h?.(k,De)},title:`${Yt(k)} \xB7 ${_e(he)}\u2013${_e(Me)}`},a.createElement("span",{className:"calendar-weekgrid-block-time"},_e(he)),a.createElement("span",{className:"calendar-weekgrid-block-title"},k.icon&&a.createElement($e,{id:k.icon,className:"calendar-chip-glyph"}),a.createElement("span",{className:"calendar-weekgrid-block-name"},k.title),a.createElement(Et,{badges:k.badges})),!k.readOnly&&a.createElement("div",{className:"calendar-weekgrid-resize",onPointerDown:De=>ze(De,k,"resize")}))}),D?.mode==="create"&&D.dateIndex===A&&a.createElement("div",{className:"calendar-weekgrid-block calendar-weekgrid-block--create",style:{top:(D.startMin-P)/60*ke,height:Math.max(18,(D.endMin-D.startMin)/60*ke),"--chip-color":"var(--accent-color)"}},a.createElement("span",{className:"calendar-weekgrid-block-time"},_e(D.startMin)),a.createElement("span",{className:"calendar-weekgrid-block-title"},_e(D.startMin),"\u2013",_e(D.endMin))),D?.mode==="move"&&D.dateIndex===A&&D.id!=="__create__"&&(()=>{let k=C.find(he=>he.id===D.id);if(!k||Ee.indexOf(k.date)===A)return null;let oe=(D.startMin-P)/60*ke,X=D.endMin-D.startMin,ge=Math.max(18,X/60*ke);return a.createElement("div",{className:"calendar-weekgrid-block calendar-weekgrid-block--ghost",style:{top:oe,height:ge,"--chip-color":ce(o(k))}},a.createElement("span",{className:"calendar-weekgrid-block-time"},_e(D.startMin)),a.createElement("span",{className:"calendar-weekgrid-block-title"},k.title))})())}),He&&a.createElement("div",{className:"calendar-weekgrid-now",style:{top:Pe}},a.createElement("span",{className:"calendar-weekgrid-now-time"},_e(re)),a.createElement("span",{className:"calendar-weekgrid-now-line"}),a.createElement("span",{className:"calendar-weekgrid-now-line calendar-weekgrid-now-line--today",style:{left:48+ue*y,width:y}}),a.createElement("span",{className:"calendar-weekgrid-now-dot",style:{left:48+ue*y}}))))}function Ei(e,t){return!!t&&(e.sourceId??"")===t.sourceId&&e.id===t.itemId}function cs({items:e,colorFor:t,selectedItemKey:n,onSelectItem:r,onEditItem:o,onItemAction:i,revealTarget:s}){if(e.length===0)return null;let l=e.slice(0,3),c=e.length-l.length;return a.createElement("div",{className:"calendar-chips"},l.map(u=>{let f=dn(u,s),h=je(u)===n;return a.createElement("button",{key:`${u.occurrenceKey??u.id}:${f?s?.nonce:0}`,className:`calendar-chip${u.completed?" completed":""}${u.borderColor?" outlined":""}${h?" selected":""}${f?" calendar-reveal-target":""}`,"aria-pressed":h,"data-calendar-source-id":u.sourceId,"data-calendar-item-id":u.id,style:{"--chip-color":ce(t(u)),...u.borderColor?{"--chip-border":ce(u.borderColor)}:{}},title:Yt(u),onClick:g=>{g.stopPropagation(),r(u)},onDoubleClick:g=>{g.stopPropagation(),o(u)},onContextMenu:g=>{g.preventDefault(),g.stopPropagation(),i(u,g)}},u.icon&&a.createElement($e,{id:u.icon,className:"calendar-chip-glyph"}),u.startTime&&a.createElement("span",{className:"calendar-chip-time"},u.startTime),a.createElement("span",{className:"calendar-chip-title"},u.title),a.createElement(Et,{badges:u.badges}))}),c>0&&a.createElement("span",{className:"calendar-chip-more"},"+",c))}function Di({year:e,month:t,today:n,selected:r,weekStart:o,compact:i,itemsByDay:s,colorFor:l,onPick:c,onPickWeek:u,selectedItemKey:f,onSelectItem:h,onEditItem:g,onItemAction:w,inRange:S,onRangeStart:_,onRangeOver:K,onRangeEnd:V,onContextMenu:z,revealTarget:E}){let v=ka(e,t,o);return a.createElement("div",{className:"calendar-grid",onMouseUp:V},a.createElement("div",{className:"calendar-week-heading"},"W"),Ca(o).map(y=>a.createElement("div",{className:"calendar-day-heading",key:y},Je(y,m.ui.language()))),Array.from({length:6},(y,O)=>a.createElement(a.Fragment,{key:O},a.createElement("button",{type:"button",className:"calendar-week-number",onClick:()=>u(v[O*7]),title:d("auto.4869ac12717f")},yt(v[O*7])),v.slice(O*7,O*7+7).map(D=>{let J=s.get(Q(D))??[],ne=J.some(te=>dn(te,E));return a.createElement(us,{key:`${D.toISOString()}:${ne?E?.nonce:0}`,date:D,outside:D.getMonth()!==t,today:n,selected:r,compact:i,items:J,colorFor:l,inRange:S(D),onPick:c,selectedItemKey:f,onSelectItem:h,onEditItem:g,onItemAction:w,onRangeStart:_,onRangeOver:K,onContextMenu:z,revealTarget:E})}))))}function Ai({year:e,today:t,weekStart:n,onPickMonth:r,revealTarget:o}){let i=Ca(n);return a.createElement("div",{className:"calendar-year"},Array.from({length:12},(s,l)=>{let c=ka(e,l,n),u=et(l,m.ui.language());return a.createElement("button",{className:"calendar-mini",key:l,onClick:()=>r(l)},a.createElement("div",{className:"calendar-mini-name"},u),a.createElement("div",{className:"calendar-mini-grid"},i.map(f=>a.createElement("div",{className:"calendar-mini-heading",key:f},Je(f,m.ui.language(),"narrow"))),c.map(f=>{let h=f.getMonth()!==l,g=Re(f,t),w=!h&&Q(f)===o?.date;return a.createElement("div",{key:`${f.toISOString()}:${w?o?.nonce:0}`,className:`calendar-mini-day ${h?"outside":""} ${g?"today":""}${w?" calendar-reveal-target":""}`},f.getDate())})))}))}function us({date:e,outside:t,today:n,selected:r,compact:o,items:i,colorFor:s,inRange:l,onPick:c,selectedItemKey:u,onSelectItem:f,onEditItem:h,onItemAction:g,onRangeStart:w,onRangeOver:S,onContextMenu:_,revealTarget:K}){let V=Re(e,n),z=Re(e,r),E=i.findIndex(y=>dn(y,K)),v=E>=0&&(o||E>=3);return a.createElement("div",{className:`calendar-day-cell ${t?"outside":""} ${V?"today":""} ${z?"selected":""} ${l?"in-range":""}${v?" calendar-reveal-target calendar-reveal-day":""}`,onMouseDown:()=>w(e),onMouseEnter:()=>S(e),onContextMenu:y=>_(y,e),onClick:y=>{y.target.closest(".calendar-chip")||c(e,y)}},a.createElement("div",{className:"calendar-day-cell-head"},a.createElement("span",{className:"calendar-day-num"},e.getDate())),!o&&a.createElement(cs,{items:i,colorFor:s,selectedItemKey:u,onSelectItem:f,onEditItem:h,onItemAction:g,revealTarget:K}),o&&i.length>0&&a.createElement("div",{className:"calendar-day-dots"},i.slice(0,4).map(y=>a.createElement("span",{key:y.occurrenceKey??y.id,className:`calendar-day-dot${dn(y,K)?" calendar-reveal-dot":""}`,style:{background:ce(s(y))}}))))}function dn(e,t){return!!t&&(e.sourceId??"")===t.sourceId&&e.id===t.itemId}function At(){return{acc:0,fired:!1,peak:0,lastAbsX:0,decayFrames:0,coasting:!1,reswipeAcc:0,reswipeLastAbsX:0}}function Jn(e,t,n){if(Math.abs(t)<=Math.abs(n))return{gesture:e,step:0};let r=Math.abs(t);if(e.fired){if(e.reswipeAcc!==0&&Math.sign(e.reswipeAcc)===Math.sign(t)&&r>=e.reswipeLastAbsX+3){let g=e.reswipeAcc+t;return Math.abs(g)>=60?{gesture:{...At(),fired:!0,peak:r,lastAbsX:r},step:g>0?1:-1}:{gesture:{...At(),acc:g,peak:r,lastAbsX:r},step:0}}let s=Math.max(e.peak,r),l=r<e.lastAbsX?e.decayFrames+1:0,c=e.coasting||l>=3&&r<s*.5,u=c&&r>=e.lastAbsX+6;return{gesture:{...e,peak:s,lastAbsX:r,decayFrames:l,coasting:c,reswipeAcc:u?t:0,reswipeLastAbsX:u?r:0},step:0}}let i=(Math.sign(e.acc)===Math.sign(t)?e.acc:0)+t;return Math.abs(i)<60?{gesture:{...e,acc:i,peak:Math.max(e.peak,r),lastAbsX:r},step:0}:{gesture:{...At(),fired:!0,peak:r,lastAbsX:r},step:i>0?1:-1}}var ms=20;function fs(e,t){return!!(e&&e.view===t.view&&e.cursor===t.cursor&&e.selectedDate===t.selectedDate&&e.rangeStart===t.rangeStart&&e.rangeEnd===t.rangeEnd)}function gs(e){if(e.rangeStart&&e.rangeEnd){let[t,n]=e.rangeStart<=e.rangeEnd?[e.rangeStart,e.rangeEnd]:[e.rangeEnd,e.rangeStart];return{selectedDate:e.selectedDate,rangeStart:t,rangeEnd:n}}return e.selectedDate?{selectedDate:e.selectedDate,rangeStart:null,rangeEnd:null}:null}function hs(){let e=ht(),t=a.useCallback(r=>e.subscribe(r),[e]),n=a.useCallback(()=>{let r=e.get();return r?.surface==="main"?r:null},[e]);return a.useSyncExternalStore(t,n,n)}function ln({variant:e="main",navigation:t}){let n=new Date,{weekStart:r,indexEntries:o}=ct(),{groups:i,dayStartHour:s,dayEndHour:l,itemClickTarget:c}=Fe(),u=ra[r]??1,[f,h]=Ya(),g=hs(),w=a.useMemo(()=>Qe(),[]),[S,_]=a.useState(f.view??w.view),[K,V]=a.useState(f.cursor??w.cursor),[z,E]=a.useState(()=>({entries:[{view:f.view??w.view,cursor:f.cursor??w.cursor,selectedDate:f.selectedDate??null,rangeStart:f.rangeStart??null,rangeEnd:f.rangeEnd??null}],index:0})),v=a.useCallback(p=>{E(I=>{if(fs(I.entries[I.index],p))return I;let ye=[...I.entries.slice(0,I.index+1),p].slice(-ms);return{entries:ye,index:ye.length-1}})},[]),y=a.useCallback((p,I={})=>{let G={view:p.view??S,cursor:p.cursor??K,selectedDate:p.selectedDate===void 0?f.selectedDate??null:p.selectedDate,rangeStart:p.rangeStart===void 0?f.rangeStart??null:p.rangeStart,rangeEnd:p.rangeEnd===void 0?f.rangeEnd??null:p.rangeEnd};I.pushHistory!==!1&&v(G),p.view!==void 0&&_(p.view),p.cursor!==void 0&&V(p.cursor),Object.keys(p).length>0&&h(p)},[K,h,v,f.rangeEnd,f.rangeStart,f.selectedDate,S]),O=a.useCallback(p=>{let I=z.index+p;if(I<0||I>=z.entries.length)return;let G=z.entries[I];E({...z,index:I}),y(G,{pushHistory:!1})},[z,y]),D=e==="main"?"main_workspace":"right_sidebar";an(D,f,a.useMemo(()=>({canGoBack:z.index>0,canGoForward:z.index<z.entries.length-1,goBack:()=>O(-1),goForward:()=>O(1)}),[O,z.entries.length,z.index])),a.useEffect(()=>{if(!(e!=="main"||!t))return t.setController({canGoBack:z.index>0,canGoForward:z.index<z.entries.length-1,goBack:()=>O(-1),goForward:()=>O(1)}),()=>t.setController(null)},[O,z.entries.length,z.index,t,e]),a.useEffect(()=>{_(f.view??w.view),V(f.cursor??w.cursor)},[w.cursor,w.view,f.view,f.cursor]),a.useEffect(()=>{if(e==="right")return()=>m.interop.state.publish(_t,null)},[e]),a.useEffect(()=>{e==="right"&&m.interop.state.publish(_t,gs({view:S,cursor:K,selectedDate:f.selectedDate,rangeStart:f.rangeStart,rangeEnd:f.rangeEnd}))},[K,f.rangeEnd,f.rangeStart,f.selectedDate,e,S]);let J=me(K),ne=f.selectedDate?me(f.selectedDate):n,[te,B]=a.useState(!1),fe=e!=="main"||te,[we,Ee]=a.useState(1),b=a.useRef({...At(),idleTimer:null}),[R,P]=a.useState(null),[W,de]=a.useState(null),C=a.useRef(null),H=a.useRef(0),{items:U,itemsByDay:se,colorFor:re}=nn({focusYear:Number(K.slice(0,4))}),ue=a.useRef(null),He=a.useCallback(p=>{de(je(p)),We(p,D),ue.current&&clearTimeout(ue.current),ue.current=setTimeout(()=>{if(ue.current=null,c==="owner"&&p.kind==="sourced"&&p.sourceId){lo(p.sourceId,p.id).then(I=>{I||Fn(p)});return}Fn(p)},220)},[c,D]),Pe=a.useCallback(p=>{if(ue.current&&(clearTimeout(ue.current),ue.current=null),de(je(p)),We(p,D),!p.readOnly){if(p.kind==="sourced"){Ht(p.sourceId??"",p.id);return}P({date:p.date,editItem:p})}},[D]),ze=_n(),Ke=a.useSyncExternalStore(a.useCallback(p=>ze.subscribe(p),[ze]),a.useCallback(()=>ze.get(),[ze]),a.useCallback(()=>ze.get(),[ze]));a.useEffect(()=>{e!=="main"||!Ke||(Ke.item.readOnly?P({date:Ke.item.date,editItem:Ke.item}):Pe(Ke.item),ze.publish(null))},[Pe,Ke,ze,e]),a.useEffect(()=>()=>{ue.current&&clearTimeout(ue.current)},[]),a.useEffect(()=>{let p=C.current,I=p?.ownerDocument.defaultView?.ResizeObserver??globalThis.ResizeObserver;if(!p||!I)return;let G=new I(ye=>{let Ue=ye[0]?.contentRect.width??p.clientWidth;B(mt=>mt?Ue<=380:Ue<340)});return G.observe(p),()=>G.disconnect()},[]),a.useEffect(()=>()=>{b.current.idleTimer&&clearTimeout(b.current.idleTimer)},[]);let Ye=a.useCallback(async(p,I)=>{I.stopPropagation(),I.preventDefault(),de(je(p)),We(p,D),P(null);let G=++H.current,ye={x:I.clientX,y:I.clientY},Ue=await qa(p,{onEdit:()=>Pe(p)});if(G!==H.current)return;let mt=p.kind==="event"?Wa(p):p.kind==="sourced"&&Ue.length===0?Xt(p):[],ft=p.readOnly?[{label:d("auto.1cb00f4b1daf"),description:p.title,enabled:!1},...Ba(p),...Ue.length>0||mt.length>0?[]:Xt(p)]:[...p.kind==="sourced"&&Ue.some(ma=>ma.id==="edit")?[]:[{label:d("auto.5301648dcf6b"),icon:a.createElement(Ha,null),onSelect:()=>Pe(p)}],{label:d("auto.f6fdbe48dc54"),icon:a.createElement(Va,null),danger:!0,onSelect:()=>m.ui.openMenu([{label:d("auto.7c1496f9a7dc",{p0:p.title}),enabled:!1},{label:d("auto.77dfd2135f4d")},{label:d("auto.ae8a5b196587"),danger:!0,onSelect:()=>Tt(p)}],ye)}],Nt=[...Ue,...mt],Pt=Nt.length>0&&ft.length>0?[...Nt,{type:"separator"},...ft]:[...Nt,...ft];m.ui.openMenu(Pt,ye)},[Pe,D]),Tt=async p=>{p.kind!=="noteDate"&&(p.kind==="event"?await Yr(p.id):p.sourced&&p.sourceId&&await Ra(p.sourceId,p.sourced.id))},Ie=J.getFullYear(),x=J.getMonth(),A=p=>y({view:p}),Y=()=>{let p=new Date;y({selectedDate:Q(p),rangeStart:null,rangeEnd:null,cursor:`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}-01`})},M=p=>y({view:"week",selectedDate:Q(p),rangeStart:null,rangeEnd:null,cursor:`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}-01`}),k=p=>{if(Ee(p),S==="year")y({cursor:`${Ie+p}-${String(x+1).padStart(2,"0")}-01`});else if(S==="week"){let I=Kt(ne,u),G=new Date(I.getFullYear(),I.getMonth(),I.getDate()+p*7);y({selectedDate:Q(G),rangeStart:null,rangeEnd:null,cursor:`${G.getFullYear()}-${String(G.getMonth()+1).padStart(2,"0")}-01`})}else{let I=new Date(Ie,x+p,1);y({cursor:`${I.getFullYear()}-${String(I.getMonth()+1).padStart(2,"0")}-01`})}},oe=()=>{b.current.idleTimer&&clearTimeout(b.current.idleTimer),b.current.idleTimer=setTimeout(()=>{Object.assign(b.current,At()),b.current.idleTimer=null},80)},X=p=>{if(oe(),Math.abs(p.deltaX)<=Math.abs(p.deltaY))return;p.preventDefault();let I=Jn(b.current,p.deltaX,p.deltaY);Object.assign(b.current,I.gesture),I.step!==0&&k(I.step)},ge=a.useRef(null),he=a.useRef(!1),Me=a.useRef(0),ut=a.useRef(K);ut.current=K,a.useEffect(()=>{let p=()=>{ge.current=null,Me.current=0},I=C.current?.ownerDocument.defaultView;return I?.addEventListener("mouseup",p),()=>I?.removeEventListener("mouseup",p)},[]);let ea=p=>{if(!ge.current||S!=="month")return;let I=C.current?.querySelector(".calendar-grid");if(!I)return;let G=I.getBoundingClientRect(),ye=p.clientY<G.top+44,Ue=p.clientY>G.bottom-44;if(!ye&&!Ue){Me.current=0;return}let mt=Date.now();if(mt-Me.current<450)return;Me.current=mt;let ft=Ue?1:-1;Ee(ft);let Nt=me(ut.current),Pt=new Date(Nt.getFullYear(),Nt.getMonth()+ft,1),ma=`${Pt.getFullYear()}-${String(Pt.getMonth()+1).padStart(2,"0")}-01`,Ri=ft===1?ma:Q(new Date(Pt.getFullYear(),Pt.getMonth()+1,0));he.current=!0,y({cursor:ma,rangeStart:ge.current.anchor,rangeEnd:Ri})},pt=(p,I)=>{if(he.current){he.current=!1;return}de(null),We(null,D);let G=Q(p);if(I?.shiftKey&&f.selectedDate){y({rangeStart:f.selectedDate,rangeEnd:G});return}y({selectedDate:f.selectedDate===G?null:G,rangeStart:null,rangeEnd:null,cursor:`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}-01`})},rt=p=>{ge.current={anchor:Q(p)},he.current=!1},Xe=p=>{let I=ge.current;if(!I)return;let G=me(ut.current);if(p.getFullYear()!==G.getFullYear()||p.getMonth()!==G.getMonth())return;let ye=Q(p);ye!==I.anchor&&(he.current=!0,y({rangeStart:I.anchor,rangeEnd:ye}))},De=()=>{ge.current=null,Me.current=0},T=p=>{if(!f.rangeStart||!f.rangeEnd)return!1;let I=Q(p);return ti(f.rangeStart,f.rangeEnd).includes(I)},Z=(p,I,G,ye)=>{P({date:Q(p),startTime:I,endTime:G,kind:ye})},ot=(p,I)=>{if(p.preventDefault(),p.stopPropagation(),R)return;let G=Q(I);m.ui.openMenu([{label:d("auto.ec42f1f55523"),icon:a.createElement(lt,null),onSelect:()=>Z(I,void 0,void 0,"todo")},{label:d("auto.7f8a6fad8b7c"),icon:a.createElement(st,null),onSelect:()=>Z(I,void 0,void 0,"event")},{type:"separator"},{label:d("auto.22819a02167d"),icon:a.createElement(ia,null),onSelect:Y},{label:d("auto.4869ac12717f"),icon:a.createElement(Ct,null),onSelect:()=>M(me(G))}],{x:p.clientX,y:p.clientY})},cn=(p,I,G)=>{R||(p.preventDefault(),p.stopPropagation(),m.ui.openMenu([{label:d("auto.ec42f1f55523"),icon:a.createElement(lt,null),onSelect:()=>Z(me(I),G,void 0,"todo")},{label:d("auto.7f8a6fad8b7c"),icon:a.createElement(st,null),onSelect:()=>Z(me(I),G,void 0,"event")},{type:"separator"},{label:d("auto.22819a02167d"),icon:a.createElement(ia,null),onSelect:Y},{label:d("auto.4869ac12717f"),icon:a.createElement(Ct,null),onSelect:()=>M(me(I))}],{x:p.clientX,y:p.clientY}))},it=Kt(ne,u),ta=Array.from({length:7},(p,I)=>{let G=new Date(it);return G.setDate(it.getDate()+I),G}),un=S==="year"?`y-${Ie}`:S==="week"?`w-${Q(it)}`:`m-${Ie}-${x}`,Ze=S==="year"?a.createElement("h2",null,a.createElement("span",null,Ie)):S==="week"?a.createElement("h2",null,"W",yt(it)," ",a.createElement("span",null,it.getFullYear())):a.createElement("h2",null,et(x,m.ui.language())," ",a.createElement("span",null,Ie)),pn=f.selectedDate?U.filter(p=>p.date.slice(0,10)===f.selectedDate).sort((p,I)=>(p.startTime??"99:99").localeCompare(I.startTime??"99:99")):[],ar=fe&&S==="week"?[ne]:ta,Fi=p=>y({selectedDate:Q(p),rangeStart:null,rangeEnd:null,cursor:`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}-01`}),$i=["week","month","year"].map(p=>a.createElement("button",{key:p,role:"tab","aria-selected":S===p,className:`calendar-switcher-btn ${S===p?"active":""}`,onClick:()=>A(p)},p==="month"?d("auto.082bc378cd60"):p==="week"?d("auto.f82be68a7fb4"):d("auto.879e32326c52"))),Ki=a.createElement("div",{className:"calendar-actions"},a.createElement("button",{"aria-label":d("auto.50f94286ba30"),onClick:()=>k(-1)},"\u2039"),a.createElement("button",{"aria-label":d("auto.24345a14377f"),onClick:Y},d("auto.7a46866bc719")),a.createElement("button",{"aria-label":d("auto.bc981983e7f5"),onClick:()=>k(1)},"\u203A"));return a.createElement("div",{ref:C,className:`calendar-view ${e==="main"?"calendar-view-main":"calendar-view-sidebar"}${fe?" calendar-view-compact":""}`},a.createElement("div",{className:"calendar-topbar"},a.createElement("div",{className:"calendar-topbar-leading"},Ze),a.createElement("div",{className:"calendar-topbar-actions"},a.createElement("div",{className:"calendar-switcher calendar-switcher-inline",role:"tablist"},$i),Ki)),a.createElement("div",{className:"calendar-view-body"},a.createElement("div",{className:"calendar-scroll-area","data-view":S},a.createElement("div",{className:"calendar-stage",onWheel:X,onMouseMove:ea,onMouseLeave:()=>{Me.current=0}},a.createElement("div",{className:"calendar-grid-wrap",key:un,"data-dir":we},S==="month"&&a.createElement(Di,{year:Ie,month:x,today:n,selected:ne,weekStart:u,compact:fe,itemsByDay:se,colorFor:re,onPick:pt,onPickWeek:M,selectedItemKey:W,onSelectItem:He,onEditItem:Pe,onItemAction:Ye,inRange:T,onRangeStart:rt,onRangeOver:Xe,onRangeEnd:De,onContextMenu:ot,revealTarget:g}),S==="week"&&a.createElement(Ii,{days:ar,items:U.filter(p=>ar.some(I=>Q(I)===p.date)),dayStartHour:s,dayEndHour:l,colorFor:re,selectedItemKey:W,onSelectItem:He,onEditItem:Pe,onCommit:(p,I,G,ye)=>{Ho(p,I,G,ye)},onCreate:(p,I,G)=>P({date:p,startTime:I,endTime:G}),onContextMenu:cn,onItemAction:Ye,compact:fe,weekDays:ta,selectedDay:ne,selectedTime:f.selectedTime,itemsByDay:se,onPickDay:Fi,revealTarget:g}),S==="year"&&a.createElement(Ai,{year:Ie,today:n,weekStart:u,revealTarget:g,onPickMonth:p=>y({view:"month",cursor:`${Ie}-${String(p+1).padStart(2,"0")}-01`})}))),fe&&S==="month"&&f.selectedDate&&a.createElement("div",{className:"calendar-todos"},pn.length===0?a.createElement("div",{className:"agenda-day-empty"},d("auto.d669db3f6b34")):pn.map(p=>{let I=p.sourceId??p.kind,G=I===g?.sourceId&&p.id===g.itemId?g.nonce:void 0;return a.createElement(Ua,{key:`${I}:${p.id}:${p.occurrenceKey??p.date}:${G??0}`,item:p,sourceId:I,color:re(p),revealNonce:G,onClick:()=>He(p),onDoubleClick:()=>Pe(p),onContextMenu:ye=>{Ye(p,ye)}})})))),R&&a.createElement(on,{key:R.editItem?.id??`new:${R.kind??""}:${R.date}:${R.startTime??""}`,state:R,groups:i,indexEntries:o,onClose:()=>P(null),onAdded:()=>{}}))}function Ti(){return a.createElement(ln,{variant:"right"})}function Ni({navigation:e}){return a.createElement(ln,{variant:"main",navigation:e})}var sn=e=>a.createElement(m.ui.settings.Button,e),ys=({onDelete:e,label:t})=>{let[n,r]=a.useState(!1),o=a.useRef(null),i=a.useCallback(()=>{o.current!==null&&window.clearTimeout(o.current),o.current=null,r(!1)},[]);return a.useEffect(()=>i,[i]),a.createElement(sn,{className:"notedate-source-toggle",variant:n?"danger":"ghost",size:"small",onClick:()=>{if(n){i(),e();return}r(!0),o.current!==null&&window.clearTimeout(o.current),o.current=window.setTimeout(()=>r(!1),3500)},onBlur:i,title:n?d("auto.d75a293ea22a"):d("auto.c845e23963ef",{p0:t})},a.createElement(Va,null)," ",n?d("auto.04a212215ef9"):d("auto.f6fdbe48dc54"))},bs=({value:e,onCommit:t})=>{let[n,r]=a.useState(e.length?e:[""]),o=i=>i.map(s=>s.trim()).filter(Boolean);return a.createElement("div",{className:"notedate-source-show"},n.map((i,s)=>a.createElement("div",{className:"notedate-source-show-row",key:s},a.createElement("input",{className:"settings-path-input",value:i,"aria-label":d("auto.ef5ea5a743b3"),placeholder:"phone",onChange:l=>r(n.map((c,u)=>u===s?l.target.value:c)),onBlur:()=>t(o(n))}),a.createElement("button",{type:"button",className:"notedate-source-show-remove","aria-label":d("auto.4fda04775bdc"),onClick:()=>{let l=n.filter((c,u)=>u!==s);r(l.length?l:[""]),t(o(l))}},"\xD7"))),a.createElement(sn,{variant:"ghost",size:"small",className:"notedate-add-field",onClick:()=>r([...n,""])},a.createElement(lt,null)," ",d("calendar.noteDate.addField")))},Pi=({variant:e,value:t,label:n,onChange:r})=>{let{ColorField:o}=m.ui.settings;return a.createElement("span",{className:"notedate-color-wrap"},a.createElement(o,{variant:e,unset:!t,value:t??Te("primary-blue"),ariaLabel:n,onChange:r}),t&&a.createElement("button",{type:"button",className:"notedate-color-clear","aria-label":d("auto.f4a0d0857b02",{p0:n}),onClick:()=>r(void 0)},a.createElement(at,null)))},vs=({icon:e,color:t,borderColor:n,onChange:r})=>{let[o,i]=a.useState(!1),s=a.useRef(null);return a.useEffect(()=>{if(!o)return;let l=u=>{s.current&&!s.current.contains(u.target)&&i(!1)},c=s.current?.ownerDocument;return c?.addEventListener("mousedown",l,!0),()=>c?.removeEventListener("mousedown",l,!0)},[o]),a.createElement("div",{className:"notedate-glyph-picker",ref:s},a.createElement("button",{type:"button",className:e?"notedate-source-swatch":"notedate-source-swatch unset",style:{...t?{"--swatch-fill":ce(t),"--swatch-on":Jr(t)}:void 0,...n?{"--swatch-ring":ce(n)}:void 0},"aria-label":d("auto.92bcda7f379e"),title:d("auto.7bf74c2d99d6"),onClick:()=>i(l=>!l)},e?a.createElement($e,{id:e}):a.createElement("span",{className:"notedate-swatch-none"},"\u2014")),o&&a.createElement("div",{className:"notedate-glyph-grid"},a.createElement("button",{type:"button",className:e?"notedate-glyph-opt":"notedate-glyph-opt active","aria-label":d("auto.95553ba8a405"),title:d("auto.95553ba8a405"),onClick:()=>{r(void 0),i(!1)}},"\u2014"),zo().map(l=>a.createElement("button",{key:l.id,type:"button",className:l.id===e?"notedate-glyph-opt active":"notedate-glyph-opt","aria-label":l.label,title:l.label,onClick:()=>{r(l.id),i(!1)}},a.createElement($e,{id:l.id})))))},ws=({source:e,entries:t})=>{let n=a.useMemo(()=>Qa(t,e),[t,e.matchKey,e.matchValue,e.folder,e.dateField,e.dateFormat,e.match]);return Un(e)?n.matched===0?a.createElement("div",{className:"notedate-source-stats warn"},d("auto.257ff123e390",{p0:e.matchKey,p1:e.matchValue})):n.dated===0?a.createElement("div",{className:"notedate-source-stats warn"},d("auto.e6ffec68b5ae",{p0:n.matched,p1:e.dateField})):a.createElement("div",{className:"notedate-source-stats"},d("auto.d4ea5b59b68b",{p0:n.matched,p1:n.dated})):null},xs=({source:e,entries:t,onChange:n,onDelete:r})=>{let{VaultFolderField:o,SelectField:i,Toggle:s}=m.ui.settings,[l,c]=a.useState(!!e.folder),u=!e.dateFormat||gn(e.dateFormat)!==null,f=(h,g,w=!1)=>a.createElement("div",{className:w?"notedate-source-field wide":"notedate-source-field"},a.createElement("label",null,h),g);return a.createElement("div",{className:"notedate-source-row"},a.createElement("div",{className:"notedate-source-head"},a.createElement(vs,{icon:e.icon,color:e.color,borderColor:e.borderColor,onChange:h=>n({icon:h})}),a.createElement("input",{className:"settings-path-input notedate-source-title",defaultValue:e.title,placeholder:d("auto.35b023ecbb81"),"aria-label":d("auto.475b6ce898d4"),title:d("auto.4da8c4eff514"),onBlur:h=>n({title:h.target.value.trim()})}),a.createElement("div",{className:"notedate-source-color"},a.createElement(Pi,{variant:"fill",value:e.color,label:d("auto.9fa90b203761"),onChange:h=>n({color:h})}),a.createElement(Pi,{variant:"ring",value:e.borderColor,label:d("auto.981f473aa731"),onChange:h=>n({borderColor:h})})),a.createElement("div",{className:"notedate-source-actions"},a.createElement(sn,{className:"notedate-source-toggle",variant:"ghost",size:"small",onClick:()=>n({hidden:!e.hidden}),title:e.hidden?d("auto.408a0d16a8ba"):d("auto.736a07e01797")},e.hidden?a.createElement(So,null):a.createElement(Eo,null)," ",e.hidden?d("auto.d97d1ee339e4"):d("auto.34d8b60fe253")),a.createElement(ys,{label:e.title||"source",onDelete:r}))),a.createElement(ws,{source:e,entries:t}),a.createElement("div",{className:"notedate-source-grid"},f(d("auto.b82220d034e7"),a.createElement("input",{className:"settings-path-input",defaultValue:e.matchKey,placeholder:"type","aria-label":d("auto.b82220d034e7"),onBlur:h=>n({matchKey:h.target.value.trim()})})),f(d("auto.2bc9464d49e9"),a.createElement("input",{className:"settings-path-input",defaultValue:e.matchValue,placeholder:"contact","aria-label":d("auto.a3fa4c4a4715"),onBlur:h=>n({matchValue:h.target.value.trim()})})),f(d("auto.691b674766e5"),a.createElement("input",{className:"settings-path-input",defaultValue:e.dateField,placeholder:"birthdate","aria-label":d("auto.691b674766e5"),title:d("auto.7bf039eeb194"),onBlur:h=>n({dateField:h.target.value.trim()||"date"})})),f(d("auto.94ee88690828"),a.createElement("input",{className:u?"settings-path-input":"settings-path-input invalid",defaultValue:e.dateFormat??"",placeholder:"dd-mm-yyyy","aria-label":d("auto.94ee88690828"),title:d("auto.8bbc96d44546"),onBlur:h=>n({dateFormat:h.target.value.trim()||void 0})})),f(d("auto.e10282ef1972"),a.createElement("div",{className:"notedate-source-inline"},a.createElement(i,{value:e.match,onChange:h=>n({match:h==="day-month"||h==="day"?h:"exact"}),options:[{value:"exact",label:d("auto.fd303c72a405")},{value:"day-month",label:d("auto.dd4b99ddaf61")},{value:"day",label:d("auto.b6f727f0c520")}],ariaLabel:d("auto.e10282ef1972")}),e.match==="day-month"&&a.createElement("label",{className:"notedate-source-inline-toggle",title:d("auto.5210c5c047ea")},a.createElement(s,{checked:e.showCount,onChange:h=>n({showCount:h}),label:d("auto.9ddab8990070")}),a.createElement("span",null,d("auto.9ddab8990070"))))),e.match!=="exact"&&f(d("auto.24bdcf2d51f8"),a.createElement("input",{type:"number",min:0,max:Xa,className:"settings-path-input notedate-source-limit",defaultValue:e.recurrenceLimitYears??"",placeholder:d("auto.48a7b8889e15"),"aria-label":d("auto.1389fda4dae3"),title:d("auto.6d07b3164ac0"),onBlur:h=>{let g=h.target.value.trim();if(!g){h.currentTarget.value="",n({recurrenceLimitYears:void 0});return}let w=Math.max(0,Math.min(Xa,Math.floor(Number(g))));h.currentTarget.value=String(w),n({recurrenceLimitYears:w})}})),f(d("auto.611f3791dc68"),a.createElement("input",{className:"settings-path-input",defaultValue:e.startTimeField??"",placeholder:d("auto.48a7b8889e15"),"aria-label":d("auto.611f3791dc68"),title:d("auto.519b42369442"),onBlur:h=>n({startTimeField:h.target.value.trim()||void 0})})),f(d("auto.aee875c4edbf"),a.createElement("input",{className:"settings-path-input",defaultValue:e.endTimeField??"",placeholder:d("auto.48a7b8889e15"),"aria-label":d("auto.aee875c4edbf"),onBlur:h=>n({endTimeField:h.target.value.trim()||void 0})})),f(d("auto.768e0c1c6957"),a.createElement("div",{className:"notedate-source-inline"},a.createElement(i,{value:e.labelMode,onChange:h=>n({labelMode:h==="property"?"property":"filename"}),options:[{value:"filename",label:d("auto.a3cbb98ddf5e")},{value:"property",label:d("auto.9ae33a7d0ecb")}],ariaLabel:d("auto.768e0c1c6957")}),e.labelMode==="property"&&a.createElement("input",{className:"settings-path-input",defaultValue:e.labelField??"",placeholder:"firstName","aria-label":d("auto.55f1c767a3b1"),onBlur:h=>n({labelField:h.target.value.trim()||void 0})})),!0),f(d("auto.d97d1ee339e4"),a.createElement(bs,{value:e.showFields,onCommit:h=>n({showFields:h})}),!0)),a.createElement("button",{type:"button",className:"notedate-source-advanced-toggle","aria-expanded":l,onClick:()=>c(h=>!h)},a.createElement("span",{className:"notedate-caret","data-open":l},"\u25B8")," ",d("auto.4d064726954a")),l&&a.createElement("div",{className:"notedate-source-grid"},f(d("auto.0623bfa38c8f"),a.createElement(o,{value:e.folder??"",onChange:h=>n({folder:h.trim()||void 0}),onCommit:h=>n({folder:h.trim()||void 0}),placeholder:d("auto.ad980036b394"),ariaLabel:d("auto.0623bfa38c8f")}),!0)))},Mi=()=>{let{Row:e}=m.ui.settings,{indexEntries:t}=ct(),[n,r]=a.useState(null);if(a.useEffect(()=>{let l=!0;return ua().then(c=>{l&&r(c)}),()=>{l=!1}},[]),!n)return a.createElement("div",{className:"notedate-settings"});let o=l=>{r(l),Ja(l)},i=(l,c)=>o(n.map(u=>u.id===l?{...u,...c}:u)),s=l=>{m.ui.openMenu([...Hn.map(c=>({id:c.id,label:d(c.labelKey)||c.label,icon:a.createElement($e,{id:c.patch.icon}),onSelect:()=>o([...n,ni(c.id,n)])})),{type:"separator"},{id:"blank",label:d("calendar.noteDatePreset.blank"),onSelect:()=>o([...n,Za()])}],{anchor:l,align:"start"})};return a.createElement("div",{className:"notedate-settings"},a.createElement(e,{title:d("auto.958788fc103f"),description:"Each source puts a read-only calendar entry on every note whose frontmatter matches (e.g. type: contact), reading the date from the property you name \u2014 birthdays, deadlines, anniversaries. Match decides how much of the date has to line up: the exact date lands once, day + month comes round every year, day alone every month. Set a date format when the property is not written as 1990-05-04. Icon and colours are optional; an unset colour uses the normal calendar fallback."}),n.length===0&&a.createElement(e,{title:d("auto.1780c4a5f967"),description:d("auto.65c01f7ba330")}),n.map(l=>a.createElement(xs,{key:l.id,source:l,entries:t,onChange:c=>i(l.id,c),onDelete:()=>o(n.filter(c=>c.id!==l.id))})),a.createElement(sn,{variant:"secondary",className:"notedate-add-source","aria-haspopup":"menu",onClick:l=>s(l.currentTarget)},a.createElement(lt,null)," ",d("calendar.noteDate.addSource")))};function ks(){let e=Fe(),[t,n]=a.useState({accounts:[],providers:[]}),[r,o]=a.useState(null),[i,s]=a.useState(!0),[l,c]=a.useState(null),[u,f]=a.useState(!1),h=kt(),g=a.useSyncExternalStore(h.subscribe,h.getStatus),{Button:w,Row:S,Toggle:_,SelectField:K}=m.ui.settings,V=a.useCallback(async()=>{s(!0),c(null);try{let C=await qe(m).listCalendarConnections();if(!C.ok||!C.data)throw new Error(C.error||d("calendar.sync.accountsError"));n(C.data)}catch(C){c(C instanceof Error?C.message:d("calendar.sync.accountsError"))}finally{s(!1)}},[]);a.useEffect(()=>{V()},[V]);let z=async(C,H)=>{f(!0),c(null);try{let U=await m.settings.set(C,H);if(!U.ok)throw new Error(U.error||d("calendar.sync.saveError"))}catch(U){c(U instanceof Error?U.message:d("calendar.sync.saveError"))}finally{f(!1)}},E=(C,H,U)=>{let se=be().remoteCalendars;z("remoteCalendars",{...se,[C]:{...se[C],[H]:{...se[C]?.[H],...U}}})},v=(C,H)=>{let U=new Set(be().disabledCalendarAccounts);H?U.delete(C):U.add(C),z("disabledCalendarAccounts",[...U])},y=t.accounts.find(C=>C.id===r),O=t.providers.find(C=>C.id===(y?.oauthSetupId||y?.provider||r)),D=y?.displayName||y?.address||O?.label||O?.name||"",J=y?.capabilities.includes("calendar")&&(!y.secretState||y.secretState==="ok"),ne=!!y&&!e.disabledCalendarAccounts.includes(y.id),te=y?g.accounts[y.id]:void 0,[B,fe]=a.useState({}),[we,Ee]=a.useState(!1);a.useEffect(()=>{if(!y||!J)return;let C=!1;return Ee(!0),qe(m).listCalendars(y.id).then(H=>{C||(H.ok&&H.data?fe(U=>({...U,[y.id]:H.data.calendars})):c(H.error||d("calendar.sync.calendarsError")))}).catch(H=>{C||c(H instanceof Error?H.message:d("calendar.sync.calendarsError"))}).finally(()=>{C||Ee(!1)}),()=>{C=!0}},[y,J]);let b=y?g.calendars[y.id]??B[y.id]:void 0,R=()=>m.workspace.openSettings("accounts"),P=C=>C.secretState&&C.secretState!=="ok"?d("calendar.sync.reconnect"):C.capabilities.includes("calendar")?d(e.disabledCalendarAccounts.includes(C.id)?"calendar.overview.disabled":"calendar.sync.connected"):d("calendar.sync.permission"),W=(C,H,U,se)=>a.createElement("button",{key:C,type:"button",className:"settings-list-row calendar-account-row",onClick:()=>{o(C),c(null)}},a.createElement("span",{className:"settings-list-glyph"},a.createElement(st,null)),a.createElement("span",{className:"settings-list-meta"},a.createElement("span",{className:"settings-list-name"},H),U&&a.createElement("span",{className:"settings-list-sub"},U),a.createElement("span",{className:"settings-list-sub"},se)),a.createElement(Ct,null)),de=t.providers.filter(C=>!t.accounts.some(H=>(H.oauthSetupId||H.provider)===C.id));return a.createElement("div",{className:"calendar-sync-settings settings-listpage"},r&&(y||O)?a.createElement(a.Fragment,null,a.createElement("div",{className:"settings-listpage-crumbs"},a.createElement(w,{onClick:()=>{o(null),c(null)}},d("calendar.sync.back")),a.createElement("span",{className:"settings-crumb-current"},D)),a.createElement("div",{className:"calendar-account-identity"},a.createElement("span",{className:"settings-list-glyph"},a.createElement(st,null)),a.createElement("span",{className:"settings-list-meta"},a.createElement("span",{className:"settings-list-name"},D),(y?.address||O?.email)&&a.createElement("span",{className:"settings-list-sub"},y?.address||O?.email)),a.createElement(w,{onClick:R},d("calendar.sync.manage"))),J?y&&a.createElement(a.Fragment,null,a.createElement(S,{title:d("calendar.sync.account"),description:d("calendar.sync.readOnly")},a.createElement(_,{checked:ne,disabled:u,onChange:C=>v(y.id,C),label:d("calendar.sync.account")})),we&&!b&&a.createElement("p",{role:"status"},d("calendar.sync.loadingCalendars")),b?.length===0&&a.createElement("p",{className:"settings-empty-text"},d("calendar.sync.noCalendars")),b?.map(C=>{let H=e.remoteCalendars[y.id]?.[C.id],U=H?.enabled??C.primary;return a.createElement("div",{key:C.id,className:"calendar-sync-calendar"},a.createElement(S,{title:C.name,description:C.primary?d("calendar.sync.primary"):void 0},a.createElement(_,{checked:U,disabled:u||!ne,onChange:se=>E(y.id,C.id,{enabled:se}),label:d("calendar.sync.select",{name:C.name})})),U&&a.createElement(S,{title:d("calendar.field.groupId")},a.createElement(K,{value:H?.groupId??"",disabled:u||!ne,onChange:se=>E(y.id,C.id,{groupId:se}),options:[{value:"",label:d("calendar.sync.noGroup")},...e.groups.map(se=>({value:se.id,label:se.name,color:se.color}))],ariaLabel:d("calendar.sync.group",{name:C.name})})))}),te?.lastSyncAt&&a.createElement("p",{className:"settings-empty-text",role:"status"},d("calendar.sync.last",{time:new Date(te.lastSyncAt).toLocaleString(m.ui.language()),count:te.eventCount})),a.createElement(w,{disabled:g.syncing||u||!ne,onClick:()=>{h.sync()}},d(g.syncing?"auto.221ca63005ea":"auto.2b7d938e6787"))):a.createElement("p",{className:"settings-empty-text"},y?P(y):d(O?.configured?"calendar.sync.saved":"calendar.sync.setup"))):a.createElement(a.Fragment,null,a.createElement("div",{className:"settings-listpage-header"},a.createElement("h4",{className:"settings-label"},d("calendar.overview.accounts")),a.createElement(w,{onClick:R},d("calendar.sync.manage"))),a.createElement("p",{className:"settings-empty-text"},d("calendar.sync.description")),i?a.createElement("p",{role:"status"},d("calendar.sync.loadingAccounts")):a.createElement("div",{className:"settings-list"},t.accounts.map(C=>W(C.id,C.displayName||C.address,C.displayName?C.address:void 0,P(C))),de.map(C=>W(C.id,C.label||C.name,C.email,d(C.configured?"calendar.sync.savedShort":"calendar.sync.setupShort"))),!t.accounts.length&&!de.length&&a.createElement("p",{className:"settings-empty-text"},d("auto.7eacb0e385b4"))),a.createElement("div",{className:"settings-row-actions"},a.createElement(w,{disabled:i||g.syncing,onClick:()=>{V(),h.sync()}},d("calendar.sync.refresh")))),(l||te?.error||g.error)&&a.createElement("p",{className:"settings-path-error",role:"alert"},l||te?.error||g.error))}function Cs({dayStartHour:e,dayEndHour:t}){let{NumberField:n,Row:r}=m.ui.settings;return a.createElement(a.Fragment,null,a.createElement(r,{title:d("auto.46fbb53a9be2"),description:d("auto.f07b365f8502")},a.createElement(n,{min:0,max:23,value:e,onChange:()=>{},onCommit:o=>{o!=null&&m.settings.set("dayStartHour",o)},ariaLabel:d("auto.46fbb53a9be2")})),a.createElement(r,{title:d("calendar.dayEndHour"),description:d("calendar.dayEndHourDesc")},a.createElement(n,{min:1,max:24,value:t,onChange:()=>{},onCommit:o=>{o!=null&&m.settings.set("dayEndHour",o)},ariaLabel:d("calendar.dayEndHour")})),a.createElement("span",{className:"settings-empty-text"},d("auto.808d7dca8a74")," ",Dn,":00\u2013",An,":00."," ",d("calendar.dayWindowGrows")))}function Ss(){let{Button:e,Row:t,Section:n}=m.ui.settings;return a.createElement(n,{title:d("calendar.settings.groups")},a.createElement(t,{title:d("calendar.settings.groups"),description:d("calendar.settings.groupsDesc")},a.createElement(e,{onClick:()=>m.workspace.openSettings("groups")},d("calendar.settings.groups"))))}function Es(){let{dayStartHour:e,dayEndHour:t,itemClickTarget:n}=Fe(),{Row:r,Section:o,SelectField:i}=m.ui.settings;return a.createElement(a.Fragment,null,a.createElement(o,null,a.createElement(r,{title:d("calendar.settings.openItemsIn"),description:d("calendar.settings.openItemsInDesc")},a.createElement(i,{value:n,onChange:s=>{m.settings.set(ro,s)},options:[{value:"owner",label:d("calendar.settings.openItemsOwner")},{value:"agenda",label:d("calendar.settings.openItemsAgenda")}],ariaLabel:d("calendar.settings.openItemsIn")})),a.createElement(Cs,{dayStartHour:e,dayEndHour:t})),a.createElement(Ss,null))}function Is(){let{Section:e}=m.ui.settings;return a.createElement(e,null,a.createElement(ks,null))}function Ds(){let e=Vt(),{hiddenSources:t}=Fe(),{PluginCard:n,Section:r}=m.ui.settings,o=new Set(t),i=(s,l)=>{let c=new Set(o);l?c.delete(s):c.add(s),m.settings.set(jt,[...c])};return a.createElement(r,{className:"calendar-plugins-settings"},e.length===0?a.createElement("span",{className:"settings-empty-text"},d("calendar.plugins.empty")):a.createElement("div",{className:"settings-plugin-list"},e.map(s=>{let l=s.integration,c=l?.localized?.[m.ui.language()],u=c?.name??l?.name??s.owner,f=!o.has(s.sourceKey);return a.createElement(n,{key:s.sourceId,name:u,version:l?.version??s.version,versionLabel:d("calendar.plugins.version"),author:l?.author,authorLabel:d("calendar.plugins.by"),description:c?.description??l?.description,enabled:f,onChange:h=>i(s.sourceKey,h),toggleLabel:d(f?"calendar.plugins.disable":"calendar.plugins.enable",{p0:u}),onConfigure:s.methods.includes("configure")?()=>{co(s.sourceId)}:void 0,configureLabel:d("calendar.plugins.configure",{p0:u})})})))}function Li({section:e}){return e==="dates"?a.createElement(Mi,null):e==="sync"?a.createElement(Is,null):e==="plugins"?a.createElement(Ds,null):a.createElement(Es,null)}var Oi=(e,t=[])=>({type:"object",properties:e,required:t,additionalProperties:!1}),er=e=>({type:"string",description:e});async function _i(e,t,n,r){let o=await e.commands.executeOwn(t,n,{...r,autonomous:!0});if(!o.ok)throw new Error(o.error.message);return o.value}function zi(e){return sr([{name:"list_events",description:"List Calendar events, optionally filtered by a day or month.",parameters:Oi({on:er("Optional YYYY-MM-DD day or YYYY-MM month")}),sideEffect:"read",commandId:"list",run:async(t,n)=>{let r=String(t.on??"").trim(),o=/^\d{4}-\d{2}-\d{2}$/.test(r)?{from:r,to:r}:/^\d{4}-\d{2}$/.test(r)?{from:`${r}-01`,to:`${r}-31`}:{from:"",to:""},i=await _i(e,"list",o,n);return i.length?i.slice(0,40).map(s=>`- ${s.date??""}: ${s.title??""}`).join(`
`):"No events."}},{name:"add_event",description:"Add an event to the Calendar plugin.",parameters:Oi({title:er("Event title"),date:er("Date YYYY-MM-DD")},["title","date"]),sideEffect:"write",commandId:"add",run:async(t,n)=>{let r={title:String(t.title??""),date:String(t.date??"")},o=await _i(e,"add",r,n);return`Added event "${o.title||r.title}" on ${o.date||r.date}.`}}])}function As(e){Lr(e),xr(e);let t=Sr(),n=e.workspace.onOpenOwnLink(h=>{let g=ca(h);g&&e.workspace.patchTimeControl(g)});e.registerView("calendar.agenda",Ci),e.registerView("calendar.panel",Ti),e.registerView("calendar.page",Ni),e.registerView("calendar.settings",Li);let r=ao(),o=Yo(e),i=bi(e),s=e.interop.services.provide(hr,zi(e)),l=ei(),c=ht(),u={id:"calendar",labelKey:"manifest.name",openDate:h=>wa(h)},f=e.interop.services.provide(mr,u);return e.interop.state.publish(_t,null),c.publish(null),()=>{o(),i(),s(),l(),f(),r(),n(),t(),e.interop.state.publish(_t,null),c.publish(null)}}var Ts={register:As},Mg=Ts;export{Mg as default,As as register};
