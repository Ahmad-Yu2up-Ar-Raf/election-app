import{u as d,j as e,$ as m}from"./app-DUQzFXgz.js";import{a as t,c as s}from"./button-DEvrd_XY.js";import{S as h,H as x}from"./layout-DqJF-sUH.js";import{S as u,A as y,a as k,b as g}from"./site-header-BpFTrSEk.js";import"./index-DwsjWl-G.js";import"./index-C6v8-8dx.js";import"./index-XM0x3siv.js";import"./index-C0p3u0G_.js";import"./package-Dvwlyt0r.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],j=t("Monitor",b);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],S=t("Moon",v);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],A=t("Sun",f);function M({className:n="",...r}){const{appearance:i,updateAppearance:c}=d(),o=[{value:"light",icon:A,label:"Light"},{value:"dark",icon:S,label:"Dark"},{value:"system",icon:j,label:"System"}];return e.jsx("div",{className:s("inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800",n),...r,children:o.map(({value:a,icon:p,label:l})=>e.jsxs("button",{onClick:()=>c(a),className:s("flex items-center rounded-md px-3.5 py-1.5 transition-colors",i===a?"bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100":"text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60"),children:[e.jsx(p,{className:"-ml-1 h-4 w-4"}),e.jsx("span",{className:"ml-1.5 text-sm",children:l})]},a))})}function T(){return e.jsxs(u,{style:{"--sidebar-width":"calc(var(--spacing) * 72)","--header-height":"calc(var(--spacing) * 12)"},children:[e.jsx(y,{variant:"inset"}),e.jsxs(k,{children:[e.jsx(g,{siteName:"Appearance"}),e.jsx(m,{title:"Appearance settings"}),e.jsx(h,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsx(x,{title:"Appearance settings",description:"Update your account's appearance settings"}),e.jsx(M,{})]})})]})]})}export{T as default};
