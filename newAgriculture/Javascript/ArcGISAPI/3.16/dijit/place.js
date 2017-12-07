//>>built
define("dijit/place","dojo/_base/array dojo/dom-geometry dojo/dom-style dojo/_base/kernel dojo/_base/window ./Viewport ./main".split(" "),function(w,s,u,y,v,z,A){function x(f,a,n,p){var e=z.getEffectiveBox(f.ownerDocument);(!f.parentNode||"body"!=String(f.parentNode.tagName).toLowerCase())&&v.body(f.ownerDocument).appendChild(f);var c=null;w.some(a,function(b){var a=b.corner,g=b.pos,d=0,r={w:{L:e.l+e.w-g.x,R:g.x-e.l,M:e.w}[a.charAt(1)],h:{T:e.t+e.h-g.y,B:g.y-e.t,M:e.h}[a.charAt(0)]},h=f.style;h.left=
h.right="auto";n&&(d=n(f,b.aroundCorner,a,r,p),d="undefined"==typeof d?0:d);var k=f.style,l=k.display,m=k.visibility;"none"==k.display&&(k.visibility="hidden",k.display="");h=s.position(f);k.display=l;k.visibility=m;l={L:g.x,R:g.x-h.w,M:Math.max(e.l,Math.min(e.l+e.w,g.x+(h.w>>1))-h.w)}[a.charAt(1)];m={T:g.y,B:g.y-h.h,M:Math.max(e.t,Math.min(e.t+e.h,g.y+(h.h>>1))-h.h)}[a.charAt(0)];g=Math.max(e.l,l);k=Math.max(e.t,m);l=Math.min(e.l+e.w,l+h.w);m=Math.min(e.t+e.h,m+h.h);l-=g;m-=k;d+=h.w-l+(h.h-m);if(null==
c||d<c.overflow)c={corner:a,aroundCorner:b.aroundCorner,x:g,y:k,w:l,h:m,overflow:d,spaceAvailable:r};return!d});c.overflow&&n&&n(f,c.aroundCorner,c.corner,c.spaceAvailable,p);a=c.y;var b=c.x,d=v.body(f.ownerDocument);/relative|absolute/.test(u.get(d,"position"))&&(a-=u.get(d,"marginTop"),b-=u.get(d,"marginLeft"));d=f.style;d.top=a+"px";d.left=b+"px";d.right="auto";return c}var B={TL:"BR",TR:"BL",BL:"TR",BR:"TL"};return A.place={at:function(f,a,n,p,e){n=w.map(n,function(c){var b={corner:c,aroundCorner:B[c],
pos:{x:a.x,y:a.y}};p&&(b.pos.x+="L"==c.charAt(1)?p.x:-p.x,b.pos.y+="T"==c.charAt(0)?p.y:-p.y);return b});return x(f,n,e)},around:function(f,a,n,p,e){function c(b,a){m.push({aroundCorner:b,corner:a,pos:{x:{L:r,R:r+k,M:r+(k>>1)}[b.charAt(1)],y:{T:h,B:h+l,M:h+(l>>1)}[b.charAt(0)]}})}var b;if("string"==typeof a||"offsetWidth"in a||"ownerSVGElement"in a){if(b=s.position(a,!0),/^(above|below)/.test(n[0])){var d=s.getBorderExtents(a),q=a.firstChild?s.getBorderExtents(a.firstChild):{t:0,l:0,b:0,r:0},t=s.getBorderExtents(f),
g=f.firstChild?s.getBorderExtents(f.firstChild):{t:0,l:0,b:0,r:0};b.y+=Math.min(d.t+q.t,t.t+g.t);b.h-=Math.min(d.t+q.t,t.t+g.t)+Math.min(d.b+q.b,t.b+g.b)}}else b=a;if(a.parentNode){d="absolute"==u.getComputedStyle(a).position;for(a=a.parentNode;a&&1==a.nodeType&&"BODY"!=a.nodeName;){q=s.position(a,!0);t=u.getComputedStyle(a);/relative|absolute/.test(t.position)&&(d=!1);if(!d&&/hidden|auto|scroll/.test(t.overflow)){var g=Math.min(b.y+b.h,q.y+q.h),v=Math.min(b.x+b.w,q.x+q.w);b.x=Math.max(b.x,q.x);b.y=
Math.max(b.y,q.y);b.h=g-b.y;b.w=v-b.x}"absolute"==t.position&&(d=!0);a=a.parentNode}}var r=b.x,h=b.y,k="w"in b?b.w:b.w=b.width,l="h"in b?b.h:(y.deprecated("place.around: dijit/place.__Rectangle: { x:"+r+", y:"+h+", height:"+b.height+", width:"+k+" } has been deprecated.  Please use { x:"+r+", y:"+h+", h:"+b.height+", w:"+k+" }","","2.0"),b.h=b.height),m=[];w.forEach(n,function(b){var a=p;switch(b){case "above-centered":c("TM","BM");break;case "below-centered":c("BM","TM");break;case "after-centered":a=
!a;case "before-centered":c(a?"ML":"MR",a?"MR":"ML");break;case "after":a=!a;case "before":c(a?"TL":"TR",a?"TR":"TL");c(a?"BL":"BR",a?"BR":"BL");break;case "below-alt":a=!a;case "below":c(a?"BL":"BR",a?"TL":"TR");c(a?"BR":"BL",a?"TR":"TL");break;case "above-alt":a=!a;case "above":c(a?"TL":"TR",a?"BL":"BR");c(a?"TR":"TL",a?"BR":"BL");break;default:c(b.aroundCorner,b.corner)}});f=x(f,m,e,{w:k,h:l});f.aroundNodePos=b;return f}}});