"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[930],{1930:(e,t,n)=>{n.r(t),n.d(t,{default:()=>g});var r=n(5155),s=n(2115),a=n(4521),i=n(3093),o=n(337),l=n(5952);function d(e){let{width:t=100,depth:n=100,tileSize:a=8,portalPositions:i=[]}=e,d=(0,l.F)(o.Tap,"/textures/grass.jpg");d.wrapS=d.wrapT=o.GJx,d.repeat.set(1,1);let p=1.5*a,u=(0,s.useMemo)(()=>{let e=[],r=a*Math.sqrt(3),s=1.5*a;for(let a=-t/2;a<t/2;a+=r)for(let t=-n/2;t<n/2;t+=s){let l=Math.floor((t+n/2)/s)%2==0?0:r/2,d=new o.Pq0(a+l,0,t);i.some(e=>d.distanceTo(e)<p)||e.push(d)}return e},[t,n,a,i]);return(0,r.jsx)("group",{children:u.map((e,t)=>(0,r.jsxs)("mesh",{position:e,receiveShadow:!0,children:[(0,r.jsx)("cylinderGeometry",{args:[a,a,-.1,6]}),(0,r.jsx)("meshStandardMaterial",{map:d})]},t))})}function p(e){let{questPoints:t}=e,n=(0,l.F)(o.Tap,"/textures/medieval_blocks.jpg");n.wrapS=n.wrapT=o.GJx,n.repeat.set(1,10),n.needsUpdate=!0;let a=(0,s.useMemo)(()=>{let e=[];for(let n=0;n<t.length-1;n++){let r=t[n],s=t[n+1],a=r.clone().lerp(s,.5),i=r.distanceTo(s),o=Math.atan2(s.z-r.z,s.x-r.x);e.push({mid:a,length:i,angle:o})}return e},[t]);return(0,r.jsx)("group",{children:a.map((e,t)=>{let s=function(e,t,n){let r=e/2,s=new Float32Array([-r,0,-1.5,r,0,-1.5,r,0,1.5,-r,0,1.5]);if(0!==n){let e=Math.cos(n),t=Math.sin(n);for(let n=0;n<s.length;n+=3){let r=s[n],a=s[n+2];s[n]=r*e-a*t,s[n+2]=r*t+a*e}}let a=new o.LoY;a.setAttribute("position",new o.THS(s,3));let i=new Float32Array([0,0,1,0,1,1,0,1]);return a.setAttribute("uv",new o.THS(i,2)),a.setIndex([0,1,2,2,3,0]),a.computeVertexNormals(),a}(e.length,0,e.angle);return(0,r.jsx)("mesh",{geometry:s,position:[e.mid.x,.01,e.mid.z],renderOrder:1,children:(0,r.jsx)("meshStandardMaterial",{map:n,transparent:!0,depthTest:!1,polygonOffset:!0,polygonOffsetFactor:-1})},t)})})}var u=n(9693),h=n(9884);let c={reading:"orange",video:"purple","hands-on":"green",team:"blue",live:"red"};function m(e){let{quests:t=[],points:n=[]}=e,[a,i]=(0,s.useState)(null),{scene:l}=(0,u.p)("/models/portal.glb");return n&&0!==n.length?(0,r.jsxs)(r.Fragment,{children:[t.map((e,t)=>{let s=n[t]||new o.Pq0(0,1.5,0),a=c[e.type]||"white";return(0,r.jsx)(x,{position:s,quest:e,scene:l,color:a,setHoveredQuest:i},e.id)}),a&&(0,r.jsx)(h.E,{position:a.position,center:!0,children:(0,r.jsx)("div",{style:{background:"rgba(0, 0, 0, 0.8)",padding:"5px 10px",color:"white",fontWeight:"bold",borderRadius:"5px"},children:a.name})})]}):(console.warn("No points available for quest markers."),null)}function x(e){let{position:t,quest:n,scene:a,color:i,setHoveredQuest:o}=e,d=(0,s.useRef)(null),p=a.clone();return(0,l.C)(()=>{d.current&&(d.current.rotation.y+=.001)}),(0,r.jsxs)("group",{position:[t.x,t.y+.2,t.z+.02],ref:d,renderOrder:2,children:[(0,r.jsxs)("mesh",{rotation:[Math.PI/2,0,0],children:[" ",(0,r.jsx)("ringGeometry",{args:[2,2.5,32]})," ",(0,r.jsx)("meshStandardMaterial",{color:i,emissive:i,emissiveIntensity:1.5,transparent:!0,opacity:.8})]}),(0,r.jsx)("primitive",{object:p,scale:2.5,rotation:[Math.PI/2,0,0]})]})}function g(){let e=(0,s.useMemo)(()=>[{id:1,type:"reading",name:"Read Chapter 1"},{id:2,type:"video",name:"Watch Intro Video"},{id:3,type:"hands-on",name:"Try Interactive Exercise"},{id:4,type:"team",name:"Join Group Discussion"},{id:5,type:"live",name:"Attend Live Webinar"}],[]),t=(0,s.useMemo)(()=>e.map(()=>{let e=(Math.random()-.5)*80,t=(Math.random()-.5)*80;return new o.Pq0(e,.314,t)}),[e]);return(0,r.jsxs)(a.Hl,{camera:{position:[0,5,5],fov:50},style:{width:"100vw",height:"100vh"},children:[(0,r.jsx)("ambientLight",{intensity:.8}),(0,r.jsx)("directionalLight",{position:[50,100,50],intensity:1.5}),(0,r.jsxs)(s.Suspense,{fallback:null,children:[(0,r.jsx)(d,{width:100,depth:100,tileSize:8}),(0,r.jsx)(p,{questPoints:t}),(0,r.jsx)(m,{quests:e,points:t})]}),(0,r.jsx)(i.N,{minPolarAngle:Math.PI/2-.1,maxPolarAngle:Math.PI/2-.1,minDistance:50,maxDistance:150,enablePan:!0})]})}}}]);