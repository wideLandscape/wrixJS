!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.wrix=e():t.wrix=e()}(window,function(){return function(t){var e={};function r(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},r.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);const o=t=>null!==t&&null!==Object.getPrototypeOf(t),n=t=>"function"==typeof t,c=t=>e=>void 0===t[e],s=t=>{let e=u(t),r=Object.getPrototypeOf(t);do{e=e.concat(u(r).filter(t=>-1===e.indexOf(t))),r=Object.getPrototypeOf(r)}while(o(r));return e},i=(t,e=s(t),r={})=>e.reduce((e,o)=>(t=t,o=o,r=e,Object.defineProperty(r,o,{get:function(){return t[o]}}),e),r);var f,p,l;const u=t=>Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t).map(t=>t.toString())).filter(e=>!!Object.getOwnPropertyDescriptor(t,e).get),a=t=>{let e=O(t),r=Object.getPrototypeOf(t);do{e=e.concat(O(r).filter(t=>-1===e.indexOf(t))),r=Object.getPrototypeOf(r)}while(o(r));return e},O=t=>Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t).map(t=>t.toString())).filter(e=>!!Object.getOwnPropertyDescriptor(t,e).set),y=(t={})=>{let e=d(t),r=Object.getPrototypeOf(t);do{e=e.concat(d(r).filter(t=>-1===e.indexOf(t))),r=Object.getPrototypeOf(r)}while(o(r));return e},d=t=>Object.keys(t).filter(e=>g(e,t)),g=(t,e)=>{const r=Object.getOwnPropertyDescriptor(e,t);return!!b(r)&&!n(e[t])},b=t=>t.configurable&&!t.get&&!t.set,j=t=>a(t).concat(y(t)),w=(t,e=j(t),r={})=>e.reduce((e,r)=>(e[r]=((t,e,r)=>o=>(t[e]=o,r))(t,r,e),e),r),h=t=>{let e=P(t),r=Object.getPrototypeOf(t);do{e=e.concat(m(r).filter(t=>-1===e.indexOf(t))),r=Object.getPrototypeOf(r)}while(o(r));return e},m=t=>P(t).filter((t,e,r)=>0===e||t!==r[e-1]),P=t=>Object.getOwnPropertyNames(t).concat(Object.keys(t)).concat(Object.getOwnPropertySymbols(t).map(t=>t.toString())).filter(e=>n(t[e])&&"constructor"!==e&&!Object.getOwnPropertyDescriptor(t,e).get),x=({methods:t={},getters:e={},setters:r={},props:o={},configurables:n={}}={},f={},p=_)=>{let l={methods:t,getters:e,setters:r,props:o,configurables:n},u=Object.assign({},f);!0===p&&(p=v);let O=j(l.configurables).filter(p).filter(c(l.methods));u=w(l.configurables,O,u);let d=h(l.methods).filter(p).filter(c(u));u=((t,e=h(t),r={})=>e.reduce((e,r)=>(e[r]=((t,e,r)=>{const o=t[e];return function(...e){let n=o.apply(t,e);return void 0===n?r:n}})(t,r,e),e),r))(l.methods,d,u);let g=y(l.props).filter(p).filter(c(u));u=((t,e=y(t),r={})=>w(t,e,r))(l.props,g,u);let b=a(l.setters).filter(p).filter(c(u));u=((t,e=a(t),r={})=>w(t,e,r))(l.setters,b,u);let m=s(l.getters).filter(p).filter(c(u));return u=i(l.getters,m,u)},_=t=>"_"!==t.charAt(0),v=()=>!0,k=t=>{let e=Object.assign({},t),r={$consumed:e};return Object.keys(t).forEach(t=>{Object.defineProperty(r,t,{get:function(){let r=e[t];return e[t]=void 0,delete e[t],r}})}),r};r.d(e,"wrix",function(){return $});const S={_factories:{},create({key:t,factoryFn:e,args:r,keyContext:o}){this._factoryExists(t)||(this._factories[t]=D(e,r,o))},get(t,e){if(this._factoryExists(t))return this._factories[t](e)},_factoryExists(t){return void 0!==this._factories[t]}},E={wrapper:null,wrix(){return this.wrapper},consume:k,compose(t,e,r){this.wrapper=x(t,e,r)},set(t){((t,e)=>{Object.keys(e).reduce((t,r)=>t[r]&&"function"==typeof t[r]?t[r](e[r]):t,t)})(this.wrapper||{},t)},wrap(t,e,r){this.wrapper=((t,e,r)=>x({methods:t,props:t,setters:t,getters:t},e,r))(t,e,r)}},D=(t,e,r)=>o=>{let n=k(o),c=t(...M(e,n));return $.wrap(c,N(r,c)).set(n.$consumed).wrix()},N=(t="",e)=>{let r={};return"string"==typeof t&&t.length>0&&(r[t]=e),r},M=(t=[],e)=>{let r,o=[];return t.forEach(t=>{r=e[t],o.push(void 0===r?null:r)}),o},$=(()=>x({methods:E},{factory:x({methods:S})}))()}])});