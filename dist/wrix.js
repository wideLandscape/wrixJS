!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("wrix",[],e):"object"==typeof exports?exports.wrix=e():t.wrix=e()}(window,function(){return function(t){var e={};function r(o){if(e[o])return e[o].exports;var c=e[o]={i:o,l:!1,exports:{}};return t[o].call(c.exports,c,c.exports,r),c.l=!0,c.exports}return r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},r.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);const o=t=>null!==t&&null!==Object.getPrototypeOf(t),c=t=>"function"==typeof t,n=t=>e=>void 0===t[e],s=t=>{let e=u(t),r=Object.getPrototypeOf(t);do{e=e.concat(u(r).filter(t=>-1===e.indexOf(t))),r=Object.getPrototypeOf(r)}while(o(r));return e},i=(t,e=s(t),r={})=>e.reduce((e,o)=>(t=t,o=o,r=e,Object.defineProperty(r,o,{get:function(){return t[o]}}),e),r);var f,l,p;const u=t=>Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t).map(t=>t.toString())).filter(e=>!!Object.getOwnPropertyDescriptor(t,e).get),a=t=>{let e=y(t),r=Object.getPrototypeOf(t);do{e=e.concat(y(r).filter(t=>-1===e.indexOf(t))),r=Object.getPrototypeOf(r)}while(o(r));return e},y=t=>Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t).map(t=>t.toString())).filter(e=>!!Object.getOwnPropertyDescriptor(t,e).set),O=(t={})=>{let e=b(t),r=Object.getPrototypeOf(t);do{e=e.concat(b(r).filter(t=>-1===e.indexOf(t))),r=Object.getPrototypeOf(r)}while(o(r));return e},b=t=>Object.keys(t).filter(e=>d(e,t)),d=(t,e)=>{const r=Object.getOwnPropertyDescriptor(e,t);return!!g(r)&&!c(e[t])},g=t=>t.configurable&&!t.get&&!t.set,j=t=>a(t).concat(O(t)),w=(t,e=j(t),r={})=>e.reduce((e,r)=>(e[r]=((t,e,r)=>o=>(t[e]=o,r))(t,r,e),e),r),h=t=>{let e=x(t),r=Object.getPrototypeOf(t);do{e=e.concat(m(r).filter(t=>-1===e.indexOf(t))),r=Object.getPrototypeOf(r)}while(o(r));return e},m=t=>x(t).filter((t,e,r)=>0===e||t!==r[e-1]),x=t=>Object.getOwnPropertyNames(t).concat(Object.keys(t)).concat(Object.getOwnPropertySymbols(t).map(t=>t.toString())).filter(e=>c(t[e])&&"constructor"!==e&&!Object.getOwnPropertyDescriptor(t,e).get),P=({methods:t={},getters:e={},setters:r={},props:o={},configurables:c={}}={},f={},l=_)=>{let p={methods:t,getters:e,setters:r,props:o,configurables:c},u=Object.assign({},f);!0===l&&(l=v);let y=j(p.configurables).filter(l).filter(n(p.methods));u=w(p.configurables,y,u);let b=h(p.methods).filter(l).filter(n(u));u=((t,e=h(t),r={})=>e.reduce((e,r)=>(e[r]=((t,e,r)=>{const o=t[e];return function(...e){let c=o.apply(t,e);return void 0===c?r:c}})(t,r,e),e),r))(p.methods,b,u);let d=O(p.props).filter(l).filter(n(u));u=((t,e=O(t),r={})=>w(t,e,r))(p.props,d,u);let g=a(p.setters).filter(l).filter(n(u));u=((t,e=a(t),r={})=>w(t,e,r))(p.setters,g,u);let m=s(p.getters).filter(l).filter(n(u));return u=i(p.getters,m,u)},_=t=>"_"!==t.charAt(0),v=()=>!0,k=t=>{let e=Object.assign({},t),r={$consumed:e};return Object.keys(t).forEach(t=>{Object.defineProperty(r,t,{get:function(){let r=e[t];return e[t]=void 0,delete e[t],r}})}),r},E=(t,e=!0)=>t?A().wrap(e?Object.create(t):t).wrix():A(),S={wrapper:null,consume:k,wrix(){return this.wrapper},compose(t,e,r){this.wrapper=P(t,e,r)},set(t){((t,e)=>{Object.keys(e).reduce((t,r)=>t[r]&&"function"==typeof t[r]?t[r](e[r]):t,t)})(this.wrapper||{},t)},wrap(t,e,r){this.wrapper=((t,e,r)=>P({methods:t,props:t,setters:t,getters:t},e,r))(t,e,r)}},A=()=>P({methods:Object.create(S)}),D=(t=M,e,r)=>e?t(...F(e,r)):t(r),N={object:(t=M,e,r)=>Object.create(D(t,e,r)),prototype:(t=M,e,r)=>Object.create(D(t,e,r).prototype),class:(t=Object,e,r)=>e?new t(...F(e,r)):new t(r),static:D},F=(t=[],e)=>t.map(t=>e[t]).filter(t=>void 0!==t),M=()=>{},$=t=>t?z.create(t):z,C={_factories:{},create({key:t,type:e,factoryFn:r,factoryArgs:o,behaviours:c,keyContext:n}){this._factoryExists(t)||(this._factories[t]=q(r,e,n||t,o,c))},get(t,e){return this._factoryExists(t)?this._factories[t](e):null},destroy(t){this._factoryExists(t)&&(this._factories[t]=null,delete this._factories[t])},_factoryExists(t){return void 0!==this._factories[t]},get keys(){return Object.keys(this._factories)},destroyAll(){this.keys.forEach(t=>this.destroy(t))}},q=(t,e,r="_",o=null,c=null)=>(n={})=>{let s=k(n),i=((t,...e)=>N[t]?N[t](...e):N.object(...e))(e,t,o,s),f=G(r,i);return(Array.isArray(c)?E().compose({methods:B(c,i),configurables:i},f):E().wrap(i,f)).set(s.$consumed).wrix()},z=P({methods:C,getters:C},{factory:C}),B=(t,e)=>t.reduce((t,r)=>Object.assign(t,r(e,t)),{}),G=(t,e)=>{let r={};return"string"==typeof t&&t.length>0&&(r[t]=e),r};r.d(e,"wrix",function(){return E}),r.d(e,"wrixFactory",function(){return $})}])});