(()=>{var e={};e.id=152,e.ids=[152],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},190:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>x,routeModule:()=>u,serverHooks:()=>l,workAsyncStorage:()=>d,workUnitAsyncStorage:()=>c});var s={};r.r(s),r.d(s,{POST:()=>i});var a=r(2706),n=r(8203),o=r(5994),p=r(9187);async function i(e){try{let t=await e.json(),r=await fetch("https://p9sb21llkoan3k-8000.proxy.runpod.net/study-plans/v2",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});if(!r.ok)throw Error(`FastAPI responded with status: ${r.status}`);let s=await r.json();return p.NextResponse.json(s)}catch(e){return console.error("Error in study plan V2 API route:",e),p.NextResponse.json({error:"Failed to generate enhanced study plan"},{status:500})}}let u=new a.AppRouteRouteModule({definition:{kind:n.RouteKind.APP_ROUTE,page:"/api/study-plan-v2/route",pathname:"/api/study-plan-v2",filename:"route",bundlePath:"app/api/study-plan-v2/route"},resolvedPagePath:"/home/aj/code/extras/akaal/streamlit-ui/v2_app/app/api/study-plan-v2/route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:d,workUnitAsyncStorage:c,serverHooks:l}=u;function x(){return(0,o.patchFetch)({workAsyncStorage:d,workUnitAsyncStorage:c})}},6487:()=>{},8335:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,452],()=>r(190));module.exports=s})();