//>>built
define("dojox/fx/style","dojo/_base/kernel dojo/_base/lang dojo/_base/fx dojo/fx ./_base dojo/_base/array dojo/dom dojo/dom-style dojo/dom-class dojo/_base/connect".split(" "),function(k,l,q,m,g,r,n,w,p,s){k.experimental("dojox.fx.style");var t=function(a){return r.map(g._allowedProperties,function(b){return a[b]})},v=function(a,b,c){a=n.byId(a);var d=w.getComputedStyle(a),f=t(d);k[c?"addClass":"removeClass"](a,b);var e=t(d);k[c?"removeClass":"addClass"](a,b);var u={},h=0;r.forEach(g._allowedProperties,
function(a){f[h]!=e[h]&&(u[a]=parseInt(e[h]));h++});return u};m={addClass:function(a,b,c){a=n.byId(a);var d=function(a){return function(){p.add(a,b);a.style.cssText=e}}(a),f=v(a,b,!0),e=a.style.cssText;a=q.animateProperty(l.mixin({node:a,properties:f},c));s.connect(a,"onEnd",a,d);return a},removeClass:function(a,b,c){a=n.byId(a);var d=function(a){return function(){p.remove(a,b);a.style.cssText=e}}(a),f=v(a,b),e=a.style.cssText;a=q.animateProperty(l.mixin({node:a,properties:f},c));s.connect(a,"onEnd",
a,d);return a},toggleClass:function(a,b,c,d){"undefined"==typeof c&&(c=!p.contains(a,b));return g[c?"addClass":"removeClass"](a,b,d)},_allowedProperties:"width height left top backgroundColor color borderBottomWidth borderTopWidth borderLeftWidth borderRightWidth paddingLeft paddingRight paddingTop paddingBottom marginLeft marginTop marginRight marginBottom lineHeight letterSpacing fontSize".split(" ")};l.mixin(g,m);return m});