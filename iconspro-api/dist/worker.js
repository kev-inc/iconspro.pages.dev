!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t){e.exports={Router:({base:e="",routes:t=[]}={})=>({__proto__:new Proxy({},{get:(r,n,o)=>(r,...a)=>t.push([n.toUpperCase(),RegExp(`^${(e+r).replace(/(\/?)\*/g,"($1.*)?").replace(/\/$/,"").replace(/:(\w+)(\?)?(\.)?/g,"$2(?<$1>[^/]+)$2$3").replace(/\.(?=[\w(])/,"\\.")}/*$`),a])&&o}),routes:t,async handle(e,...r){let n,o,a=new URL(e.url);for(var[u,s,l]of(e.query=Object.fromEntries(a.searchParams),t))if((u===e.method||"ALL"===u)&&(o=a.pathname.match(s)))for(var c of(e.params=o.groups,l))if(void 0!==(n=await c(e.proxy||e,...r)))return n}})}},function(e,t,r){"use strict";r.r(t);var n=r(0);const o=Object(n.Router)();o.get("/search",async({query:e})=>{const{term:t,amount:r,offset:n}=e;if(null==t||null==r||null==n)return new Response("Missing term, amount, or offset query parameters",{status:400});const o=`https://search.icons8.com/api/iconsets/v5/search?term=${t}&amount=${r}&offset=${n}&platform=all&language=en-US&authors=all`,a=await fetch(o).then(e=>e.json());return new Response(JSON.stringify(a,null,2),{headers:{"Access-Control-Allow-Origin":"*","Content-type":"application/json"}})}),o.all("*",()=>new Response("404, not found!",{status:404})),addEventListener("fetch",e=>{e.respondWith(o.handle(e.request))})}]);