(()=>{var e={};e.id=104,e.ids=[104],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},9428:e=>{"use strict";e.exports=require("buffer")},5511:e=>{"use strict";e.exports=require("crypto")},4735:e=>{"use strict";e.exports=require("events")},1630:e=>{"use strict";e.exports=require("http")},5591:e=>{"use strict";e.exports=require("https")},1645:e=>{"use strict";e.exports=require("net")},3873:e=>{"use strict";e.exports=require("path")},1997:e=>{"use strict";e.exports=require("punycode")},7910:e=>{"use strict";e.exports=require("stream")},4631:e=>{"use strict";e.exports=require("tls")},9551:e=>{"use strict";e.exports=require("url")},4075:e=>{"use strict";e.exports=require("zlib")},8799:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>i.a,__next_app__:()=>u,pages:()=>c,routeModule:()=>m,tree:()=>d});var r=s(260),a=s(8203),n=s(5155),i=s.n(n),l=s(7292),o={};for(let e in l)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);s.d(t,o);let d=["",{children:["questions",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,14)),"/home/aj/code/extras/akaal/streamlit-ui/v2_app/app/questions/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,6055))).default(e)],apple:[],openGraph:[async e=>(await Promise.resolve().then(s.bind(s,253))).default(e)],twitter:[async e=>(await Promise.resolve().then(s.bind(s,9479))).default(e)],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,5181)),"/home/aj/code/extras/akaal/streamlit-ui/v2_app/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,9937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(s.t.bind(s,9116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(s.t.bind(s,1485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,6055))).default(e)],apple:[],openGraph:[async e=>(await Promise.resolve().then(s.bind(s,253))).default(e)],twitter:[async e=>(await Promise.resolve().then(s.bind(s,9479))).default(e)],manifest:void 0}}],c=["/home/aj/code/extras/akaal/streamlit-ui/v2_app/app/questions/page.tsx"],u={require:s,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:a.RouteKind.APP_PAGE,page:"/questions/page",pathname:"/questions",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},1540:(e,t,s)=>{Promise.resolve().then(s.bind(s,14))},4692:(e,t,s)=>{Promise.resolve().then(s.bind(s,5794))},5794:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>v});var r=s(5512),a=s(8009),n=s(7021);function i({defaultValue:e,onContinue:t}){let s=["Beginner","Intermediate","Advanced"],[i,l]=(0,a.useState)(e||s[0]);return(0,r.jsxs)("div",{children:[(0,r.jsx)("h2",{className:"question-header text-xl font-semibold mb-2",children:"What's your current skill level?"}),(0,r.jsx)("div",{className:"space-y-2",children:s.map((e,t)=>(0,r.jsxs)("label",{className:"block",children:[(0,r.jsx)("input",{type:"radio",name:"q1",value:e,checked:i===e,onChange:()=>l(e),className:"mr-2"}),e]},`${e}-${t}`))}),(0,r.jsxs)("div",{className:"flex justify-between mt-4",children:[(0,r.jsx)(n.$,{variant:"outline",onClick:()=>console.log("Back to Home"),children:"← Back"}),(0,r.jsx)(n.$,{onClick:()=>t(i),children:"Continue →"})]})]})}var l=s(6320);function o({subject:e,level:t,defaultValue:s,onContinue:i,onBack:o}){let[d,c]=(0,a.useState)([]),[u,m]=(0,a.useState)(!0),[p,h]=(0,a.useState)(s||[]),x=e=>{h(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])};return u?(0,r.jsx)("div",{children:"Loading options..."}):(0,r.jsxs)("div",{children:[(0,r.jsx)("h2",{className:"question-header text-xl font-semibold mb-2",children:"What specific areas interest you the most?"}),(0,r.jsxs)("p",{className:"text-muted-foreground mb-4",children:["Select one or more areas of ",e," that you'd like to focus on."]}),(0,r.jsx)("div",{className:"space-y-2",children:d.map((e,t)=>(0,r.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,r.jsx)(l.Checkbox,{id:e,checked:p.includes(e),onCheckedChange:()=>x(e)}),(0,r.jsx)("label",{htmlFor:e,className:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:e})]},`${e}-${t}`))}),(0,r.jsxs)("div",{className:"flex justify-between mt-4",children:[(0,r.jsx)(n.$,{variant:"outline",onClick:o,children:"← Back"}),(0,r.jsx)(n.$,{onClick:()=>i(p),disabled:0===p.length,children:"Continue →"})]})]})}function d({defaultValue:e,onContinue:t,onBack:s}){let i=["1-2 hours","3-5 hours","6-10 hours","10+ hours"],[l,o]=(0,a.useState)(e||i[0]);return(0,r.jsxs)("div",{children:[(0,r.jsx)("h2",{className:"question-header text-xl font-semibold mb-2",children:"How many hours can you dedicate weekly?"}),(0,r.jsx)("div",{className:"space-y-2",children:i.map((e,t)=>(0,r.jsxs)("label",{className:"block",children:[(0,r.jsx)("input",{type:"radio",name:"q3",value:e,checked:l===e,onChange:()=>o(e),className:"mr-2"}),e]},`${e}-${t}`))}),(0,r.jsxs)("div",{className:"flex justify-between mt-4",children:[(0,r.jsx)(n.$,{variant:"outline",onClick:s,children:"← Back"}),(0,r.jsx)(n.$,{onClick:()=>t(l),children:"Continue →"})]})]})}function c({subject:e,level:t,defaultValue:s,onContinue:i,onBack:l}){let[o,d]=(0,a.useState)([]),[c,u]=(0,a.useState)(!0),[m,p]=(0,a.useState)(s||"");return c?(0,r.jsx)("div",{children:"Loading options..."}):(0,r.jsxs)("div",{children:[(0,r.jsxs)("h2",{className:"question-header text-xl font-semibold mb-2",children:["What's your desired outcome from learning ",e,"?"]}),(0,r.jsx)("div",{className:"space-y-2",children:o.map((e,t)=>(0,r.jsxs)("label",{className:"block",children:[(0,r.jsx)("input",{type:"radio",name:"q4",value:e,checked:m===e,onChange:()=>p(e),className:"mr-2"}),e]},`${e}-${t}`))}),(0,r.jsxs)("div",{className:"flex justify-between mt-4",children:[(0,r.jsx)(n.$,{variant:"outline",onClick:l,children:"← Back"}),(0,r.jsx)(n.$,{onClick:()=>i(m),children:"Continue →"})]})]})}function u({subject:e,level:t,interests:s,time:i,goal:l,defaultValue:o,onContinue:d,onBack:c}){let[u,m]=(0,a.useState)([]),[p,h]=(0,a.useState)(!0),[x,f]=(0,a.useState)(o||"");return p?(0,r.jsx)("div",{children:"Loading options..."}):(0,r.jsxs)("div",{children:[(0,r.jsx)("h2",{className:"question-header text-xl font-semibold mb-2",children:"What's your biggest challenge when learning something new?"}),(0,r.jsx)("div",{className:"space-y-2",children:u.map((e,t)=>(0,r.jsxs)("label",{className:"block",children:[(0,r.jsx)("input",{type:"radio",name:"q5",value:e,checked:x===e,onChange:()=>f(e),className:"mr-2"}),e]},`${e}-${t}`))}),(0,r.jsxs)("div",{className:"flex justify-between mt-4",children:[(0,r.jsx)(n.$,{variant:"outline",onClick:c,children:"← Back"}),(0,r.jsx)(n.$,{onClick:()=>d(x),children:"Generate Learning Path →"})]})]})}var m=s(9334);function p({subject:e,answers:t,onRestart:s}){let a=(0,m.useRouter)(),i={subject:e,interests:Array.isArray(t[2])?t[2]:[t[2]],level:t[1],weekly_hours:t[3]};return(0,r.jsxs)("div",{className:"rounded-md border p-6 shadow-sm",children:[(0,r.jsx)("h2",{className:"text-xl font-semibold mb-4",children:"Your Learning Path Summary"}),(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"Subject:"})," ",e]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"Skill Level:"})," ",t[1]]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"Interests:"})," ",Array.isArray(t[2])?t[2].join(", "):t[2]]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"Time Commitment:"})," ",t[3]]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"Desired Outcome:"})," ",t[4]]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"Biggest Challenge:"})," ",t[5]]})]}),(0,r.jsxs)("div",{className:"mt-6",children:[(0,r.jsx)("h3",{className:"font-semibold mb-2",children:"API Request (JSON):"}),(0,r.jsx)("pre",{className:"bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-black dark:text-gray-200 text-sm font-mono",children:JSON.stringify(i,null,2)})]}),s&&(0,r.jsx)(n.$,{className:"mt-4",onClick:s,children:"Start Over"}),(0,r.jsxs)("div",{className:"mt-4 flex gap-2",children:[(0,r.jsx)(n.$,{onClick:()=>{localStorage.setItem("studyPlanRequest",JSON.stringify(i)),a.push("/study-plan")},children:"Generate Study Plan"}),(0,r.jsx)(n.$,{variant:"outline",onClick:()=>{localStorage.setItem("studyPlanRequest",JSON.stringify(i)),a.push("/study-plan-v2")},children:"Generate Enhanced Study Plan"})]})]})}var h=s(9462);let x=a.forwardRef(({className:e,type:t,...s},a)=>(0,r.jsx)("input",{type:t,className:(0,h.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",e),ref:a,...s}));function f({onSubmit:e}){let[t,s]=(0,a.useState)("");return(0,r.jsx)("div",{className:"max-w-2xl mx-auto p-4",children:(0,r.jsxs)("div",{className:"rounded-md border p-6 shadow-sm",children:[(0,r.jsx)("h1",{className:"text-2xl font-bold mb-4",children:"What do you want to learn today?"}),(0,r.jsxs)("form",{onSubmit:s=>{s.preventDefault(),e(t)},className:"space-y-4",children:[(0,r.jsx)(x,{type:"text",placeholder:"Enter your topic or interest...",value:t,onChange:e=>s(e.target.value)}),(0,r.jsx)(n.$,{type:"submit",className:"w-full",children:"Continue →"})]})]})})}function v(){let[e,t]=(0,a.useState)(""),[s,n]=(0,a.useState)(1),[l,m]=(0,a.useState)({});if(!e)return(0,r.jsx)(f,{onSubmit:e=>t(e)});let h=(e,t)=>{m(s=>({...s,[e]:t}))},x=e=>l[e];return(0,r.jsxs)("div",{className:"max-w-2xl mx-auto p-4",children:[(0,r.jsx)("h1",{className:"text-2xl font-bold mb-4",children:"Personalized Learning Path Questionnaire"}),(0,r.jsx)("div",{className:"mb-4",children:(0,r.jsx)("div",{className:"w-full bg-gray-200 rounded-full h-2.5",children:(0,r.jsx)("div",{className:"bg-blue-600 h-2.5 rounded-full",style:{width:`${s<=5?(s-1)/5*100:100}%`}})})}),(()=>{switch(s){case 1:return(0,r.jsx)(i,{defaultValue:x(1),onContinue:e=>{h(1,e),n(2)}});case 2:return(0,r.jsx)(o,{subject:e||"Python",level:x(1),defaultValue:x(2),onBack:()=>n(1),onContinue:e=>{h(2,e),n(3)}});case 3:return(0,r.jsx)(d,{defaultValue:x(3),onBack:()=>n(2),onContinue:e=>{h(3,e),n(4)}});case 4:return(0,r.jsx)(c,{subject:e||"Python",level:x(1),defaultValue:x(4),onBack:()=>n(3),onContinue:e=>{h(4,e),n(5)}});case 5:return(0,r.jsx)(u,{subject:e||"Python",level:x(1),interests:x(2),time:x(3),goal:x(4),defaultValue:x(5),onBack:()=>n(4),onContinue:e=>{h(5,e),n(6)}});case 6:return(0,r.jsx)(p,{subject:e||"Python",answers:l,onRestart:()=>{t(""),m({}),n(1)}});default:return(0,r.jsx)("div",{children:"Questionnaire Completed!"})}})()]})}x.displayName="Input"},6320:(e,t,s)=>{"use strict";s.d(t,{Checkbox:()=>C});var r=s(5512),a=s(8009),n=s(9952),i=s(6004),l=s(1412),o=s(3024),d=s(8762),c=s(8060),u=s(830),m="Checkbox",[p,h]=(0,i.A)(m),[x,f]=p(m),v=a.forwardRef((e,t)=>{let{__scopeCheckbox:s,name:i,checked:d,defaultChecked:c,required:m,disabled:p,value:h="on",onCheckedChange:f,form:v,...b}=e,[j,N]=a.useState(null),w=(0,n.s)(t,e=>N(e)),C=a.useRef(!1),q=!j||v||!!j.closest("form"),[P=!1,S]=(0,o.i)({prop:d,defaultProp:c,onChange:f}),$=a.useRef(P);return a.useEffect(()=>{let e=j?.form;if(e){let t=()=>S($.current);return e.addEventListener("reset",t),()=>e.removeEventListener("reset",t)}},[j,S]),(0,r.jsxs)(x,{scope:s,state:P,disabled:p,children:[(0,r.jsx)(u.sG.button,{type:"button",role:"checkbox","aria-checked":y(P)?"mixed":P,"aria-required":m,"data-state":k(P),"data-disabled":p?"":void 0,disabled:p,value:h,...b,ref:w,onKeyDown:(0,l.m)(e.onKeyDown,e=>{"Enter"===e.key&&e.preventDefault()}),onClick:(0,l.m)(e.onClick,e=>{S(e=>!!y(e)||!e),q&&(C.current=e.isPropagationStopped(),C.current||e.stopPropagation())})}),q&&(0,r.jsx)(g,{control:j,bubbles:!C.current,name:i,value:h,checked:P,required:m,disabled:p,form:v,style:{transform:"translateX(-100%)"},defaultChecked:!y(c)&&c})]})});v.displayName=m;var b="CheckboxIndicator",j=a.forwardRef((e,t)=>{let{__scopeCheckbox:s,forceMount:a,...n}=e,i=f(b,s);return(0,r.jsx)(c.C,{present:a||y(i.state)||!0===i.state,children:(0,r.jsx)(u.sG.span,{"data-state":k(i.state),"data-disabled":i.disabled?"":void 0,...n,ref:t,style:{pointerEvents:"none",...e.style}})})});j.displayName=b;var g=e=>{let{control:t,checked:s,bubbles:n=!0,defaultChecked:i,...l}=e,o=a.useRef(null),c=function(e){let t=a.useRef({value:e,previous:e});return a.useMemo(()=>(t.current.value!==e&&(t.current.previous=t.current.value,t.current.value=e),t.current.previous),[e])}(s),u=(0,d.X)(t);a.useEffect(()=>{let e=o.current,t=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"checked").set;if(c!==s&&t){let r=new Event("click",{bubbles:n});e.indeterminate=y(s),t.call(e,!y(s)&&s),e.dispatchEvent(r)}},[c,s,n]);let m=a.useRef(!y(s)&&s);return(0,r.jsx)("input",{type:"checkbox","aria-hidden":!0,defaultChecked:i??m.current,...l,tabIndex:-1,ref:o,style:{...e.style,...u,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function y(e){return"indeterminate"===e}function k(e){return y(e)?"indeterminate":e?"checked":"unchecked"}var N=s(4849),w=s(9462);let C=a.forwardRef(({className:e,...t},s)=>(0,r.jsx)(v,{ref:s,className:(0,w.cn)("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",e),...t,children:(0,r.jsx)(j,{className:(0,w.cn)("flex items-center justify-center text-current"),children:(0,r.jsx)(N.A,{className:"h-4 w-4"})})}));C.displayName=v.displayName},9334:(e,t,s)=>{"use strict";var r=s(8686);s.o(r,"useRouter")&&s.d(t,{useRouter:function(){return r.useRouter}})},14:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(6760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/aj/code/extras/akaal/streamlit-ui/v2_app/app/questions/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/aj/code/extras/akaal/streamlit-ui/v2_app/app/questions/page.tsx","default")},6055:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});var r=s(8077);let a=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,r.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},253:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});var r=s(8077);let a=async e=>[{type:"image/png",width:1200,height:600,url:(0,r.fillMetadataSegment)(".",await e.params,"opengraph-image.png")+"?2e0bc232e210f89d"}]},9479:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});var r=s(8077);let a=async e=>[{type:"image/png",width:1200,height:600,url:(0,r.fillMetadataSegment)(".",await e.params,"twitter-image.png")+"?2e0bc232e210f89d"}]}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[638,758,44,77,904],()=>s(8799));module.exports=r})();