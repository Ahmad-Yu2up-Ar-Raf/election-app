import{r,j as s}from"./app-DUQzFXgz.js";import{c as n,B as p}from"./button-DEvrd_XY.js";import{I as m}from"./label-D7mJGirO.js";import{E as h}from"./eye-CI_TmWu8.js";import{E as c}from"./form-7oZyEVE0.js";const w=r.forwardRef(({className:o,...e},i)=>{const[a,d]=r.useState(!1),t=e.value===""||e.value===void 0||e.disabled;return s.jsxs("div",{className:"relative",children:[s.jsx(m,{type:a?"text":"password",className:n("hide-password-toggle pr-10",o),ref:i,autoComplete:"new-password",...e}),s.jsxs(p,{type:"button",variant:"ghost",size:"sm",className:"absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",onClick:()=>d(l=>!l),disabled:t,children:[a&&!t?s.jsx(h,{className:"h-4 w-4","aria-hidden":"true"}):s.jsx(c,{className:"h-4 w-4","aria-hidden":"true"}),s.jsx("span",{className:"sr-only",children:a?"Hide password":"Show password"})]}),s.jsx("style",{children:`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`})]})});w.displayName="PasswordInput";export{w as P};
