(this["webpackJsonpcrypto-bot"]=this["webpackJsonpcrypto-bot"]||[]).push([[0],{56:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(7),o=n.n(c),s=n(25),i=n.n(s),u=n(34),l=n(31),p=n(95),d=n(90),f=n(89),m=n(93),g=n(94),j=n(39),b=Object(j.a)({palette:{type:"dark",primary:{main:"#bb86fc"},secondary:{main:"#03dac6"},background:{default:"#121212",paper:"#121212"},error:{main:"#cf6679"}},props:{MuiTextField:{variant:"filled"}}}),h=n(10);function y(e){return Uint8Array.from({length:e.length},(function(t,n){return e.charCodeAt(n)}))}function v(e){return Array.from(new Uint8Array(e)).map((function(e){return e.toString(16).padStart(2,"0")})).join("")}function x(){var e=O(),t=Object(a.useState)(""),n=Object(l.a)(t,2),r=n[0],c=n[1],o=Object(a.useState)(""),s=Object(l.a)(o,2),m=s[0],j=s[1];function x(){return(x=Object(u.a)(i.a.mark((function e(){var t,n,a,c,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,crypto.subtle.importKey("raw",y(m),{name:"HMAC",hash:"SHA-256"},!0,["sign"]);case 2:return t=e.sent,n=Date.now(),a="timestamp=".concat(n),e.next=7,crypto.subtle.sign("HMAC",t,y(a));case 7:return c=e.sent,e.next=10,fetch("/api/v3/account?".concat(a,"&signature=").concat(v(c)),{headers:{"X-MBX-APIKEY":r}});case 10:return o=e.sent,e.t0=console,e.next=14,o.json();case 14:e.t1=e.sent,e.t0.log.call(e.t0,e.t1);case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(){return(w=Object(u.a)(i.a.mark((function e(){var t,n,a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/v3/exchangeInfo");case 2:return t=e.sent,e.t0=console,e.next=6,t.json();case 6:return e.t1=e.sent,e.t0.log.call(e.t0,e.t1),e.next=10,fetch("/api/v3/klines?symbol=ETHBUSD&interval=5m");case 10:return n=e.sent,e.next=13,n.json();case 13:a=e.sent,r=a.map((function(e){var t=Object(l.a)(e,11);return{openTime:t[0],open:t[1],high:t[2],low:t[3],close:t[4],volume:t[5],closeTime:t[6],quoteAssetVolume:t[7],tradesCount:t[8],takerBuyBaseAssetVolume:t[9],takerBuyQuoteAssetVolume:t[10]}})),console.log(r);case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(a.useEffect)((function(){var e,t;c(null!==(e=localStorage.getItem("apiKey"))&&void 0!==e?e:""),j(null!==(t=localStorage.getItem("secretKey"))&&void 0!==t?t:"")}),[]),Object(h.jsxs)(f.a,{theme:b,children:[Object(h.jsx)(d.a,{}),Object(h.jsxs)("div",{className:e.root,children:[Object(h.jsxs)("div",{className:e.account,children:[Object(h.jsx)(g.a,{id:"api-key",label:"API Key",type:"password",value:r,onChange:function(e){c(e.target.value),localStorage.setItem("apiKey",e.target.value)}}),Object(h.jsx)(g.a,{id:"api-secret",label:"Secret Key",type:"password",value:m,onChange:function(e){j(e.target.value),localStorage.setItem("secretKey",e.target.value)}}),Object(h.jsx)(p.a,{disabled:!(r&&m),onClick:function(){return x.apply(this,arguments)},children:"Get account information"})]}),Object(h.jsx)(p.a,{variant:"contained",color:"primary",onClick:function(){return w.apply(this,arguments)},children:"Test"})]})]})}var O=Object(m.a)((function(e){return{root:{margin:e.spacing(2),display:"grid",gridTemplateColumns:"auto 1fr",justifyItems:"center",alignItems:"center"},account:{display:"grid",rowGap:e.spacing(1)}}})),w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,96)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),a(e),r(e),c(e),o(e)}))};o.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(x,{})}),document.getElementById("root")),w()}},[[56,1,2]]]);
//# sourceMappingURL=main.d37239ae.chunk.js.map