import{a as h}from"./button-DEvrd_XY.js";import{r as n}from"./app-DUQzFXgz.js";import{u}from"./index-DwsjWl-G.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],g=h("Check",b);function p(r){const[d,e]=n.useState(void 0);return u(()=>{if(r){e({width:r.offsetWidth,height:r.offsetHeight});const f=new ResizeObserver(o=>{if(!Array.isArray(o)||!o.length)return;const c=o[0];let i,t;if("borderBoxSize"in c){const s=c.borderBoxSize,a=Array.isArray(s)?s[0]:s;i=a.inlineSize,t=a.blockSize}else i=r.offsetWidth,t=r.offsetHeight;e({width:i,height:t})});return f.observe(r,{box:"border-box"}),()=>f.unobserve(r)}else e(void 0)},[r]),d}export{g as C,p as u};
