(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"+y9Y":function(t,e,n){"use strict";n("dRSK"),n("AphP"),n("RW0V"),n("rGqo"),n("yt8O"),n("Btvt"),n("8+KV"),n("f3/d"),n("DNiP"),n("0l/t"),n("HAE/"),n("91GP");var r=this&&this.__assign||function(){return(r=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var i=n("q1tI"),o=n("MEpN"),a=n("fwbU"),u=n("ABBN"),s=n("81GO"),c=n("TSYQ"),l=n("xk4V"),f=n("UXRv"),h=n("81jY"),d=n("HiHN"),p=n("5/KJ"),m=n("ossU"),v=n("EOM4"),g=n("346+"),y=n("rNiN"),b=n("9Ojb"),w=i.useState,E=i.useEffect,k=i.useRef,O=function(t){return t.filter((function(t){return"mark"===t.group}))},_=function(t){var e=function(t){return t.filter((function(t){return!(!t.schema||"block"!==t.schema.group)})).reduce((function(t,e,n){var i,o=((i={})[e.name]=r({},e.schema),i);return r({},t,o)}),{})}(t),n=function(t){return t.reduce((function(t,e){return e.schemaDependencies?Object.assign({},t,e.schemaDependencies):t}),{})}(t);e=r({},e,{doc:{content:"block+"},text:{group:"inline"},hard_break:{inline:!0,group:"inline",selectable:!1,parseDOM:[{tag:"br"}],toDOM:function(){return["br"]}}},n);var i=function(t){return O(t).reduce((function(t,e,n){var i,o=((i={})[e.name]=r({},e.schema),i);return r({},t,o)}),{})}(t);return new o.Schema({nodes:e,marks:i})},M=function(t){return t.filter((function(t){return t.showMenu}))},C=function(t,e){var n=[];t.forEach((function(t){t.plugins&&(n=n.concat(t.plugins))}));var r=function(t,e){var n={};t.forEach((function(t){if(t.keys){var r=t.keys(e);Object.keys(r).forEach((function(t){n[t]||(n[t]=[]),n[t].push(r[t])}))}}));var r={};return Object.keys(n).forEach((function(t){r[t]=u.chainCommands.apply(void 0,n[t])})),a.keymap(r)}(t,e);return n.concat([r])};e.default=function(t){var e={extensions:b.default,offsetTop:0,showBackBtn:!1,autoSave:!1,showTitle:!1,titleText:"",full:!1},n=(t=Object.assign({},e,t)).html,r=t.json,a=t.extensions,u=t.showBackBtn,S=t.showTitle,I=t.markdown,j=t.showdown,x=t.titleText,N=_(t.extensions),A=n;if(r){var B=o.Node.fromJSON(N,r);A=y.getHtmlFromNode(B,N)}if(I&&j){var q=new j.Converter;q.setFlavor("github"),A=q.makeHtml(I)}if(t.autoSave){var P=location.pathname,T=localStorage.getItem("smartblock:"+P);T&&(A=T),S&&(x=localStorage.getItem("smartblock-title:"+P))}var D=w(null),F=D[0],L=D[1],H=k(null);E((function(){var e=document.createElement("div");e.innerHTML=A;var n=o.DOMParser.fromSchema(N).parse(e,{preserveWhitespace:!0});t.onInit&&t.onInit({schema:N}),t.getEditorRef&&t.getEditorRef(H);var r={schema:N,plugins:C(a,N),doc:n};L(r)}),[]);var Q=w(!0),W=Q[0],V=Q[1],R=i.useMemo((function(){return l()}),[]),U=k(null),G=function(t){return t.filter((function(t){return"block"===t.group}))}(a),$=O(a),J=function(t){return t.filter((function(t){return"edit"===t.group}))}(a),K=function(t){var e={};return t.forEach((function(t){t.view&&(e[t.name]=function(e,n,r){return t.view(e,n,r)})})),e}(a);return i.createElement("div",{id:R,onClick:function(t){t.target.getAttribute("id")===R?V(!1):V(!0)},ref:H},i.createElement("div",{className:c.default("smartblock-container",{"is-full":t.full})},t.showTitle&&i.createElement(g.default,{onChange:function(e){!function(t,e){var n=location.pathname;localStorage.setItem("smartblock-title:"+n,t),e.onTitleChange&&e.onTitleChange(t)}(e,t)},defaultValue:x,placeholder:t.titlePlaceholder}),i.createElement("div",{className:"smartblock-inner"},i.createElement("div",{className:W?"":"ProseMirrorHideSelection",ref:U},i.createElement("div",{className:"smartblock-input-area"},F&&i.createElement(f.default,{options:F,nodeViews:K,onChange:function(e,n){(function(t,e,n,r,i,o){var a=t.doc;if(i&&i.current){var u=i.current.querySelector(".selected");if(u){var c=y.getViewport(),l=y.getScrollTop()+c.height,f=y.getOffset(u).top;if(f+80>=l){if(!/iPod|iPhone|iPad/.test(navigator.platform)||!document.activeElement)return s.default(0,f-80,{duration:300}),!0;if(document.activeElement.isContentEditable)return s.default(0,f-80,{duration:300}),!0}}}if(n.onChange){var h=y.getHtmlFromNode(a,r),d={json:a.toJSON(),html:h,schema:r};if(n.outputMarkdown&&o){var p=new o.Converter;p.setFlavor("github"),d.markdown=p.makeMd(h)}n.onChange(d)}if(n.autoSave){var m=location.pathname;h=y.getHtmlFromNode(a,r);localStorage.setItem("smartblock:"+m,h)}var v=a.content.childCount,g=a.content.child(v-1);if("paragraph"!==g.type.name){var b=t.schema.nodes.paragraph;e(t.tr.insert(t.doc.content.size,b.createAndFill()))}else if(0!==g.textContent.length){b=t.schema.nodes.paragraph;e(t.tr.insert(t.doc.content.size,b.createAndFill()))}return!1})(e,n,t,N,U,j)&&setTimeout((function(){V(!0)}),700)},render:function(t){var e=t.editor,n=t.view;return t.scrolling&&V(!1),i.createElement(i.Fragment,null,W&&i.createElement(i.Fragment,null,i.createElement(p.default,{view:n,menu:M(G)}),i.createElement(d.default,{view:n,menu:M(J)}),function(t,e){var n=y.getParentNodeFromState(t.state),r=e.find((function(t){return t.name===n.type.name}));return!r||!r.hideInlineMenuOnFocus}(n,G)&&i.createElement(h.default,{menu:M($),blockMenu:M(G),view:n}),i.createElement(v.default,{view:n,menu:M(G)}),u&&i.createElement(m.default,{view:n})),e)}}))))))}},"2wj0":function(t,e,n){"use strict";n("dZ+Y"),n("HAE/"),Object.defineProperty(e,"__esModule",{value:!0});var r=n("q1tI"),i=n("UxO+"),o=n("V2qZ"),a=n("rNiN");e.useForceUpdate=function(){var t=r.useState(0)[1];return function(){t((function(t){return t+1}))}},e.useView=function(t){var n=e.useForceUpdate();return r.useMemo((function(){var e=new o.EditorView(null,{state:i.EditorState.create(t.options),dispatchTransaction:function(r){var i=e.state.applyTransaction(r),o=i.state,a=i.transactions;e.updateState(o),a.some((function(t){return t.docChanged}))&&t.onChange(o,e.dispatch),n()},attributes:t.attributes,nodeViews:t.nodeViews});return t.onChange(e.state,e.dispatch),e}),[])},e.useScroll=function(){var t=r.useState(a.getScrollTop()),e=t[0],n=t[1];return r.useEffect((function(){var t=function(){n(a.getScrollTop())};return window.addEventListener("scroll",t),function(){window.removeEventListener("scroll",t)}}),[e]),e},e.useScrolling=function(t,e){var n=r.useState(!1),i=n[0],o=n[1];return r.useEffect((function(){var n=null,r=0;if(t.current){var a=t.current.getBoundingClientRect().top,u=setInterval((function(){var u=t.current.getBoundingClientRect().top;u!==a&&(a=u,3===++r&&!1===i&&(r=0,o(!0)),clearTimeout(n),n=setTimeout((function(){o(!1),r=0}),e))}),100);return function(){clearInterval(u)}}}),[]),i}},"346+":function(t,e,n){"use strict";n("pIFo"),n("HAE/"),n("91GP");var r=this&&this.__assign||function(){return(r=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var i=n("q1tI"),o=n("MEpN"),a=n("UxO+"),u=n("V2qZ"),s=n("rNiN"),c=n("2wj0"),l=i.useRef,f=i.useEffect,h={nodes:{doc:{content:"block"},text:{group:"inline"},title:{group:"block",content:"text*",selectable:!1,parseDOM:[{tag:"h1"}],toDOM:function(){return["h1",0]}}}};e.default=function(t){t=Object.assign({},{placeholder:"Title here...",defaultValue:""},t);var e=l(null),n=new o.Schema(r({},h)),d=document.createElement("div");d.innerHTML=t.defaultValue;var p=o.DOMParser.fromSchema(n).parse(d),m={onChange:function(e){if(t.onChange){var r=s.getHtmlFromNode(e.doc,n);r=r.replace(/<h1>(.*)<\/h1>/,"$1"),t.onChange(r)}},options:{schema:n,doc:p,plugins:[new a.Plugin({props:{decorations:function(t){var e=[];return t.doc.descendants((function(t,n){t.type.isBlock&&0===t.childCount&&e.push(u.Decoration.node(n,n+t.nodeSize,{class:"empty-node"}))})),u.DecorationSet.create(t.doc,e)}}})]}},v=c.useView(m);return f((function(){e.current&&e.current.appendChild(v.dom)}),[]),i.createElement("div",{ref:e,className:"smartblock-title"})}},"5/KJ":function(t,e,n){"use strict";n("bWfx"),n("f3/d"),n("dRSK"),n("HAE/"),Object.defineProperty(e,"__esModule",{value:!0});var r=n("q1tI"),i=n("mG1W"),o=n("rNiN"),a=n("y4gM"),u=r.useState,s=r.useEffect;e.default=function(t){var e=t.menu,n=t.view,c=n.state,l=n.dispatch,f=function(t){var e=t.menu,n=t.view,i=n.state,o=e.find((function(t){return!(!t.active||!t.active(i))}));return o&&o.customMenu?r.createElement(r.Fragment,null,o.customMenu(n)):r.createElement(r.Fragment,null)}(t),h=function(t){var e=t.menu,n=t.view,r=o.getParentNodeFromState(n.state);if(r&&e&&e.length){var i=r.type.name,a=e.find((function(t){return t.name===i}));return!a||!a.hideMenuOnFocus}}(t),d=u({left:0,top:0}),p=d[0],m=d[1];if(s((function(){var e=function(t){var e=t.view,n=e.state,r=n.selection;if(!r||!r.empty)return{top:-1e3,right:0};var a=r.$anchor;if(0===a.pos)return{top:-1e3,right:0};var u=n.doc.resolve(a.pos).path[1],s=0,c=i.findChildren(n.doc,(function(t){return u===s||u+1===s?(s++,!0):(s++,!1)}),!1)[0];if(!c)return{top:-1e3};var l=e.coordsAtPos(c.pos),f=e.nodeDOM(c.pos),h=o.getOffset(f).top,d=o.getOffset(e.dom).top;return 0===l.top?{top:-1e3}:f&&f.offsetHeight?{left:5,top:h+f.offsetHeight-d+20}:{left:5,top:h-d+20}}(t);m(e)}),[t]),!h)return null;var v=!1,g=e.find((function(t){return!(!t.active||!t.active(c))}));return g&&g.hideBlockMenuOnFocus&&(v=!0),r.createElement("div",{style:p,className:"smartblock-menu"},r.createElement("div",{className:"smartblock-menu-top"},e.map((function(t,e){return t.customButton?t.customButton({state:c,dispatch:l}):r.createElement(a.default,{key:e,type:"button",active:t.active&&t.active(c),disabled:t.enable&&!t.enable(c)||v,onClick:function(e){e.preventDefault(),t.onClick(c,l,n)}},"string"!=typeof t.icon?t.icon:r.createElement("span",{dangerouslySetInnerHTML:{__html:t.icon}}))}))),f&&f.props&&f.props.children&&r.createElement("div",{className:"smartblock-custom-menu"},f))}},"81GO":function(t,e,n){var r=n("IECa"),i=n("NXNr");t.exports=function(t,e,n){n=n||{};var o=function(){var t=window.pageYOffset||document.documentElement.scrollTop,e=window.pageXOffset||document.documentElement.scrollLeft;return{top:t,left:e}}(),a=r(o).ease(n.ease||"out-circ").to({top:e,left:t}).duration(n.duration||1e3);function u(){i(u),a.update()}return a.update((function(t){window.scrollTo(0|t.left,0|t.top)})),a.on("end",(function(){u=function(){}})),u(),a}},"81jY":function(t,e,n){"use strict";n("bWfx"),n("dRSK"),n("HAE/"),Object.defineProperty(e,"__esModule",{value:!0});var r=n("q1tI"),i=n("rNiN"),o=n("y4gM"),a=r.useRef;e.default=function(t){var e=t.menu,n=t.blockMenu,u=t.children,s=t.view,c=s.state,l=s.dispatch,f=s.state.selection,h=a(null),d=function(t,e){var n=t.state.selection,r=i.getOffset(t.dom).left,o=t.coordsAtPos(n.$head.pos),a=i.getOffset(t.dom).top,u=o.top+i.getScrollTop()+25-a,s=o.left-50-r;if(e&&e.current&&e.current.offsetWidth){var c=e.current.offsetWidth;if(s+c>window.innerWidth)return{top:u,left:window.innerWidth-c}}return{left:s,top:u}}(s,h),p=function(t,e){var n=t.state.selection,r=i.getOffset(t.dom).left,o=t.coordsAtPos(n.$head.pos).left-50-r,a=e.current?e.current.offsetWidth:0;return e&&e.current&&e.current.offsetWidth&&o+a>window.innerWidth?o-window.innerWidth+a:20}(s,h),m=function(t){var e=t.blockMenu,n=t.view,i=n.state,o=e.find((function(t){return!(!t.active||!t.active(i))}));return!(!o||!o.customInlineMenu)&&r.createElement(r.Fragment,null,o.customInlineMenu(n))}({blockMenu:n,view:s});return!f||f.empty?r.createElement(r.Fragment,null):0===e.length?r.createElement(r.Fragment,null):r.createElement("div",{style:d,ref:h,className:"smartblock-inline-menu"},r.createElement("div",{className:"smartblock-inline-menu-arrow",style:{left:p+"px"}}),r.createElement("div",{className:"smartblock-inline-menu-inner"},u,e.map((function(t,e){return r.createElement(o.default,{key:"inline-"+e,type:"button",active:t.active&&t.active(c),disabled:t.enable&&!t.enable(c),onClick:function(e){e.preventDefault(),t.onClick(c,l)}},"string"!=typeof t.icon?t.icon:r.createElement("span",{dangerouslySetInnerHTML:{__html:t.icon}}))})),m&&m.props&&m.props.children&&r.createElement(r.Fragment,null,m)))}},"9Ojb":function(t,e,n){"use strict";n("HAE/"),Object.defineProperty(e,"__esModule",{value:!0});var r=n("vm0/"),i=n("5VLk"),o=n("9HVD"),a=n("Zxxf"),u=n("vCGa"),s=n("sDAw");e.default=[new r.default,new a.default,new o.default,new i.default,new u.default,new s.default({placeholder:"Content here..."})]},CUlp:function(t,e,n){var r,i;n("V+eJ"),"undefined"!=typeof window&&window,void 0===(i="function"==typeof(r=function(){"use strict";function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var n=this._events=this._events||{},r=n[t]=n[t]||[];return-1==r.indexOf(e)&&r.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var n=this._onceEvents=this._onceEvents||{};return(n[t]=n[t]||{})[e]=!0,this}},e.off=function(t,e){var n=this._events&&this._events[t];if(n&&n.length){var r=n.indexOf(e);return-1!=r&&n.splice(r,1),this}},e.emitEvent=function(t,e){var n=this._events&&this._events[t];if(n&&n.length){n=n.slice(0),e=e||[];for(var r=this._onceEvents&&this._onceEvents[t],i=0;i<n.length;i++){var o=n[i];r&&r[o]&&(this.off(t,o),delete r[o]),o.apply(this,e)}return this}},e.allOff=function(){delete this._events,delete this._onceEvents},t})?r.call(e,n,e,t):r)||(t.exports=i)},EOM4:function(t,e,n){"use strict";n("dRSK"),n("f3/d"),n("HAE/"),Object.defineProperty(e,"__esModule",{value:!0});var r=n("q1tI"),i=n("vX6Q"),o=n("rNiN"),a=r.useState,u=r.useEffect;e.default=function(t){var e=function(t){var e=t.menu,n=t.view,r=o.getParentNodeFromState(n.state);if(r&&e&&e.length){var i=r.type.name,a=e.find((function(t){return t.name===i}));return a&&a.customLayout?a.customLayout:null}}(t);if(!e)return null;var n=t.view,s=o.calculateStyle(t.view),c=o.getParentNodeFromState(n.state),l=o.findNodePosition(n.state.doc,c),f=n.nodeDOM(l),h={position:"absolute",zIndex:10,top:s.top,left:0,right:0};return function(t){var e=a({top:0,left:0,width:0,height:0}),n=e[0],r=e[1];return u((function(){i.default(t,(function(){var e=t.getBoundingClientRect();n.height!==e.height&&r(e)}))})),n}(f).height?r.createElement("div",{style:h},e(t.view,f)):null}},Gfru:function(t,e,n){"use strict";n("HAE/"),n("91GP");var r=this&&this.__assign||function(){return(r=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var i=n("q1tI");e.default=function(t){return i.createElement("svg",r({width:1792,height:1792,viewBox:"0 0 1792 1792"},t),i.createElement("title",null,"undo"),i.createElement("g",{id:"bebf11ee-5e4c-414b-9c0e-9afbb64c0153","data-name":"\\u30E9\\u30D9\\u30EB"},i.createElement("path",{d:"M715.62,1146.77v412.47L0,843.62,715.62,128V510.8l356.57,39.61c395.14,43.91,676.64,243.79,716.86,492,31.48,194.23-94.21,351.37-190.3,420.9-106.64,77.16-245,118.33-401.49,76.89,119.27-39.75,212.14-134.61,207.69-214.79-7-125.53-148.89-178.63-452-178.63Z"})))}},HiHN:function(t,e,n){"use strict";n("bWfx"),n("HAE/"),Object.defineProperty(e,"__esModule",{value:!0});var r=n("q1tI"),i=n("mG1W"),o=n("rNiN"),a=n("y4gM"),u=r.useState,s=r.useEffect,c=function(t){var e=t.view,n=e.state,r=n.selection;if(!r)return{top:-1e3};var a=r.$anchor,u=n.doc.resolve(a.pos).path[1],s=0;if(0===a.pos)return{top:-1e3};var c=i.findChildren(n.doc,(function(t){return u===s||u+1===s?(s++,!0):(s++,!1)}),!1)[0];if(!c)return{top:-1e3};var l,f=e.coordsAtPos(c.pos),h=e.nodeDOM(c.pos),d=o.getOffset(h).top,p=(l=e.dom,o.getOffset(l).top);return 0===f.top?{top:-1e3}:{right:20,top:d-p-40}};e.default=function(t){var e=u({right:20,top:0}),n=e[0],i=e[1],o=t.menu,l=t.view,f=l.state,h=l.dispatch;return s((function(){var e=c(t);i(e)}),[t]),r.createElement("div",{style:n,className:"smartblock-edit-menu"},o.map((function(t,e){return r.createElement(a.default,{className:"smartblock-edit-btn",key:"edit-"+e,type:"button",color:t.btnColor,active:t.active&&t.active(f),disabled:t.enable&&!t.enable(f),onClick:function(e){e.preventDefault(),t.onClick(f,h,l)}},t.icon)})))}},IECa:function(t,e,n){n("eM6i");var r=n("SUtY"),i=n("WU8n"),o=n("s7Eg"),a=n("WvqM");function u(t){if(!(this instanceof u))return new u(t);this._from=t,this.ease("linear"),this.duration(500)}t.exports=u,r(u.prototype),u.prototype.reset=function(){return this.isArray="array"===o(this._from),this._curr=i(this._from),this._done=!1,this._start=Date.now(),this},u.prototype.to=function(t){return this.reset(),this._to=t,this},u.prototype.duration=function(t){return this._duration=t,this},u.prototype.ease=function(t){if(!(t="function"==typeof t?t:a[t]))throw new TypeError("invalid easing function");return this._ease=t,this},u.prototype.stop=function(){return this.stopped=!0,this._done=!0,this.emit("stop"),this.emit("end"),this},u.prototype.step=function(){if(!this._done){var t=this._duration,e=Date.now();if(e-this._start>=t)return this._from=this._to,this._update(this._to),this._done=!0,this.emit("end"),this;var n=this._from,r=this._to,i=this._curr,o=(0,this._ease)((e-this._start)/t);if(this.isArray){for(var a=0;a<n.length;++a)i[a]=n[a]+(r[a]-n[a])*o;return this._update(i),this}for(var u in n)i[u]=n[u]+(r[u]-n[u])*o;return this._update(i),this}},u.prototype.update=function(t){return 0==arguments.length?this.step():(this._update=t,this)}},NXNr:function(t,e){e=t.exports=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){var e=(new Date).getTime(),r=Math.max(0,16-(e-n)),i=setTimeout(t,r);return n=e,i};var n=(new Date).getTime();var r=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.clearTimeout;e.cancel=function(t){r.call(window,t)}},SUtY:function(t,e){function n(t){if(t)return function(t){for(var e in n.prototype)t[e]=n.prototype[e];return t}(t)}t.exports=n,n.prototype.on=n.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},n.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this},n.prototype.off=n.prototype.removeListener=n.prototype.removeAllListeners=n.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n,r=this._callbacks["$"+t];if(!r)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var i=0;i<r.length;i++)if((n=r[i])===e||n.fn===e){r.splice(i,1);break}return this},n.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),n=this._callbacks["$"+t];if(n)for(var r=0,i=(n=n.slice(0)).length;r<i;++r)n[r].apply(this,e);return this},n.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},n.prototype.hasListeners=function(t){return!!this.listeners(t).length}},UXRv:function(t,e,n){"use strict";n("HAE/"),Object.defineProperty(e,"__esModule",{value:!0});var r=n("q1tI"),i=n("2wj0"),o=r.useRef,a=r.useEffect;e.default=function(t){var e=o(null),n=i.useView(t);a((function(){e.current&&e.current.appendChild(n.dom),t.autoFocus&&n.focus()}),[]);var u=i.useScrolling(e,300),s=r.createElement("div",{ref:e});return t.render({editor:s,view:n,scrolling:u})}},WU8n:function(t,e,n){var r;n("Oyvg");try{r=n("s7Eg")}catch(i){r=n("s7Eg")}t.exports=function t(e){switch(r(e)){case"object":var n={};for(var i in e)e.hasOwnProperty(i)&&(n[i]=t(e[i]));return n;case"array":n=new Array(e.length);for(var o=0,a=e.length;o<a;o++)n[o]=t(e[o]);return n;case"regexp":var u="";return u+=e.multiline?"m":"",u+=e.global?"g":"",u+=e.ignoreCase?"i":"",new RegExp(e.source,u);case"date":return new Date(e.getTime());default:return e}}},WvqM:function(t,e){e.linear=function(t){return t},e.inQuad=function(t){return t*t},e.outQuad=function(t){return t*(2-t)},e.inOutQuad=function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},e.inCube=function(t){return t*t*t},e.outCube=function(t){return--t*t*t+1},e.inOutCube=function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},e.inQuart=function(t){return t*t*t*t},e.outQuart=function(t){return 1- --t*t*t*t},e.inOutQuart=function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},e.inQuint=function(t){return t*t*t*t*t},e.outQuint=function(t){return--t*t*t*t*t+1},e.inOutQuint=function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},e.inSine=function(t){return 1-Math.cos(t*Math.PI/2)},e.outSine=function(t){return Math.sin(t*Math.PI/2)},e.inOutSine=function(t){return.5*(1-Math.cos(Math.PI*t))},e.inExpo=function(t){return 0==t?0:Math.pow(1024,t-1)},e.outExpo=function(t){return 1==t?t:1-Math.pow(2,-10*t)},e.inOutExpo=function(t){return 0==t?0:1==t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))},e.inCirc=function(t){return 1-Math.sqrt(1-t*t)},e.outCirc=function(t){return Math.sqrt(1- --t*t)},e.inOutCirc=function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},e.inBack=function(t){var e=1.70158;return t*t*((e+1)*t-e)},e.outBack=function(t){var e=1.70158;return--t*t*((e+1)*t+e)+1},e.inOutBack=function(t){var e=2.5949095;return(t*=2)<1?t*t*((e+1)*t-e)*.5:.5*((t-=2)*t*((e+1)*t+e)+2)},e.inBounce=function(t){return 1-e.outBounce(1-t)},e.outBounce=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},e.inOutBounce=function(t){return t<.5?.5*e.inBounce(2*t):.5*e.outBounce(2*t-1)+.5},e["in-quad"]=e.inQuad,e["out-quad"]=e.outQuad,e["in-out-quad"]=e.inOutQuad,e["in-cube"]=e.inCube,e["out-cube"]=e.outCube,e["in-out-cube"]=e.inOutCube,e["in-quart"]=e.inQuart,e["out-quart"]=e.outQuart,e["in-out-quart"]=e.inOutQuart,e["in-quint"]=e.inQuint,e["out-quint"]=e.outQuint,e["in-out-quint"]=e.inOutQuint,e["in-sine"]=e.inSine,e["out-sine"]=e.outSine,e["in-out-sine"]=e.inOutSine,e["in-expo"]=e.inExpo,e["out-expo"]=e.outExpo,e["in-out-expo"]=e.inOutExpo,e["in-circ"]=e.inCirc,e["out-circ"]=e.outCirc,e["in-out-circ"]=e.inOutCirc,e["in-back"]=e.inBack,e["out-back"]=e.outBack,e["in-out-back"]=e.inOutBack,e["in-bounce"]=e.inBounce,e["out-bounce"]=e.outBounce,e["in-out-bounce"]=e.inOutBounce},ossU:function(t,e,n){"use strict";n("HAE/"),Object.defineProperty(e,"__esModule",{value:!0});var r=n("q1tI"),i=n("hyZr"),o=n("Gfru");e.default=function(t){var e=t.view,n=e.state,a=e.dispatch;return i.undoDepth(n)?r.createElement("button",{className:"smartblock-backbtn",onClick:function(){i.undo(n,a)}},r.createElement(o.default,{style:{width:"24px",height:"24px"}})):r.createElement(r.Fragment,null)}},s7Eg:function(t,e,n){n("a1Th"),n("h7Nl"),n("Btvt");var r=Object.prototype.toString;t.exports=function(t){switch(r.call(t)){case"[object Date]":return"date";case"[object RegExp]":return"regexp";case"[object Arguments]":return"arguments";case"[object Array]":return"array";case"[object Error]":return"error"}return null===t?"null":void 0===t?"undefined":t!=t?"nan":t&&1===t.nodeType?"element":typeof(t=t.valueOf?t.valueOf():Object.prototype.valueOf.apply(t))}},vX6Q:function(t,e,n){var r,i;n("8+KV"),n("hHhE"),n("2Spj"),n("LK8F"),function(o,a){"use strict";r=[n("CUlp")],void 0===(i=function(t){return function(t,e){var n=t.jQuery,r=t.console;function i(t,e){for(var n in e)t[n]=e[n];return t}var o=Array.prototype.slice;function a(t,e,u){if(!(this instanceof a))return new a(t,e,u);var s,c=t;("string"==typeof t&&(c=document.querySelectorAll(t)),c)?(this.elements=(s=c,Array.isArray(s)?s:"object"==typeof s&&"number"==typeof s.length?o.call(s):[s]),this.options=i({},this.options),"function"==typeof e?u=e:i(this.options,e),u&&this.on("always",u),this.getImages(),n&&(this.jqDeferred=new n.Deferred),setTimeout(this.check.bind(this))):r.error("Bad element for imagesLoaded "+(c||t))}a.prototype=Object.create(e.prototype),a.prototype.options={},a.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},a.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),!0===this.options.background&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&u[e]){for(var n=t.querySelectorAll("img"),r=0;r<n.length;r++){var i=n[r];this.addImage(i)}if("string"==typeof this.options.background){var o=t.querySelectorAll(this.options.background);for(r=0;r<o.length;r++){var a=o[r];this.addElementBackgroundImages(a)}}}};var u={1:!0,9:!0,11:!0};function s(t){this.img=t}function c(t,e){this.url=t,this.element=e,this.img=new Image}return a.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var n=/url\((['"])?(.*?)\1\)/gi,r=n.exec(e.backgroundImage);null!==r;){var i=r&&r[2];i&&this.addBackground(i,t),r=n.exec(e.backgroundImage)}},a.prototype.addImage=function(t){var e=new s(t);this.images.push(e)},a.prototype.addBackground=function(t,e){var n=new c(t,e);this.images.push(n)},a.prototype.check=function(){var t=this;function e(e,n,r){setTimeout((function(){t.progress(e,n,r)}))}this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?this.images.forEach((function(t){t.once("progress",e),t.check()})):this.complete()},a.prototype.progress=function(t,e,n){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&r&&r.log("progress: "+n,t,e)},a.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},s.prototype=Object.create(e.prototype),s.prototype.check=function(){this.getIsImageComplete()?this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.proxyImage.src=this.img.src)},s.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},s.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},s.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},s.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},s.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},s.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},c.prototype=Object.create(s.prototype),c.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url,this.getIsImageComplete()&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},c.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},c.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},a.makeJQueryPlugin=function(e){(e=e||t.jQuery)&&((n=e).fn.imagesLoaded=function(t,e){return new a(this,t,e).jqDeferred.promise(n(this))})},a.makeJQueryPlugin(),a}(o,t)}.apply(e,r))||(t.exports=i)}("undefined"!=typeof window?window:this)}}]);
//# sourceMappingURL=7-845501e1f1d692403e06.js.map