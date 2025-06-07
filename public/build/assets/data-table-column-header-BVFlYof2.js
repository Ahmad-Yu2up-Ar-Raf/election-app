import{j as e}from"./app-DzHLUL2G.js";import{c as a,B as c}from"./button-Ty7zUxSx.js";import{e as p,f as h,g as x,h as o,o as l}from"./site-header-D65uIcHh.js";import{c as r}from"./createLucideIcon-Dp6y3OUS.js";import{a as g}from"./data-B-EJ7-2R.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]],i=r("ArrowDown",j);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],d=r("ArrowUp",m);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]],w=r("ChevronsUpDown",f);function y({column:s,title:t,className:n}){return s.getCanSort()?e.jsx("div",{className:a("flex items-center gap-2",n),children:e.jsxs(p,{children:[e.jsx(h,{asChild:!0,children:e.jsxs(c,{variant:"ghost",size:"sm",className:"data-[state=open]:bg-accent -ml-3 h-8",children:[e.jsx("span",{children:t}),s.getIsSorted()==="desc"?e.jsx(i,{}):s.getIsSorted()==="asc"?e.jsx(d,{}):e.jsx(w,{})]})}),e.jsxs(x,{align:"start",children:[e.jsxs(o,{onClick:()=>s.toggleSorting(!1),children:[e.jsx(d,{}),"Asc"]}),e.jsxs(o,{onClick:()=>s.toggleSorting(!0),children:[e.jsx(i,{}),"Desc"]}),e.jsx(l,{}),e.jsxs(o,{onClick:()=>s.toggleVisibility(!1),children:[e.jsx(g,{}),"Hide"]})]})]})}):e.jsx("div",{className:a(n),children:t})}export{y as D};
