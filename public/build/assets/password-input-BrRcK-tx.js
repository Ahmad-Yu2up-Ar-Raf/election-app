import{r as o,j as s}from"./app-DD5dILCN.js";import{a as l,c,B as p}from"./button-DpV8H5g9.js";import{I as h}from"./label-BrTgKEKN.js";import{E as m}from"./form-BOzyVGVs.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],u=l("Eye",w),x=o.forwardRef(({className:r,...e},d)=>{const[a,i]=o.useState(!1),t=e.value===""||e.value===void 0||e.disabled;return s.jsxs("div",{className:"relative",children:[s.jsx(h,{type:a?"text":"password",className:c("hide-password-toggle pr-10",r),ref:d,autoComplete:"new-password",...e}),s.jsxs(p,{type:"button",variant:"ghost",size:"sm",className:"absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",onClick:()=>i(n=>!n),disabled:t,children:[a&&!t?s.jsx(u,{className:"h-4 w-4","aria-hidden":"true"}):s.jsx(m,{className:"h-4 w-4","aria-hidden":"true"}),s.jsx("span",{className:"sr-only",children:a?"Hide password":"Show password"})]}),s.jsx("style",{children:`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`})]})});x.displayName="PasswordInput";export{x as P};
