//>>built
define("dijit/_editor/html",["dojo/_base/array","dojo/_base/lang","dojo/sniff"],function(p,m,l){var d={};m.setObject("dijit._editor.html",d);var n=d.escapeXml=function(a,b){a=a.replace(/&/gm,"\x26amp;").replace(/</gm,"\x26lt;").replace(/>/gm,"\x26gt;").replace(/"/gm,"\x26quot;");b||(a=a.replace(/'/gm,"\x26#39;"));return a};d.getNodeHtml=function(a){var b=[];d.getNodeHtmlHelper(a,b);return b.join("")};d.getNodeHtmlHelper=function(a,b){switch(a.nodeType){case 1:var e=a.nodeName.toLowerCase();if(!e||
"/"==e.charAt(0))return"";b.push("\x3c",e);var g=[],f={},c;if(l("dom-attributes-explicit")||l("dom-attributes-specified-flag"))for(var m=0;c=a.attributes[m++];){var h=c.name;if("_dj"!==h.substr(0,3)&&(!l("dom-attributes-specified-flag")||c.specified)&&!(h in f)){c=c.value;if("src"==h||"href"==h)a.getAttribute("_djrealurl")&&(c=a.getAttribute("_djrealurl"));8===l("ie")&&"style"===h&&(c=c.replace("HEIGHT:","height:").replace("WIDTH:","width:"));g.push([h,c]);f[h]=c}}else{var k=(/^input$|^img$/i.test(a.nodeName)?
a:a.cloneNode(!1)).outerHTML,f=k.match(/[\w-]+=("[^"]*"|'[^']*'|\S*)/gi),k=k.substr(0,k.indexOf("\x3e"));p.forEach(f,function(b){if(b){var c=b.indexOf("\x3d");if(0<c&&(b=b.substring(0,c),"_dj"!=b.substr(0,3)))if(("src"==b||"href"==b)&&a.getAttribute("_djrealurl"))g.push([b,a.getAttribute("_djrealurl")]);else{var d;switch(b){case "style":d=a.style.cssText.toLowerCase();break;case "class":d=a.className;break;case "width":if("img"===e){(c=/width=(\S+)/i.exec(k))&&(d=c[1]);break}case "height":if("img"===
e){(c=/height=(\S+)/i.exec(k))&&(d=c[1]);break}default:d=a.getAttribute(b)}null!=d&&g.push([b,d.toString()])}}},this)}g.sort(function(a,b){return a[0]<b[0]?-1:a[0]==b[0]?0:1});for(f=0;c=g[f++];)b.push(" ",c[0],'\x3d"',"string"===typeof c[1]?n(c[1],!0):c[1],'"');switch(e){case "br":case "hr":case "img":case "input":case "base":case "meta":case "area":case "basefont":b.push(" /\x3e");break;case "script":b.push("\x3e",a.innerHTML,"\x3c/",e,"\x3e");break;default:b.push("\x3e"),a.hasChildNodes()&&d.getChildrenHtmlHelper(a,
b),b.push("\x3c/",e,"\x3e")}break;case 4:case 3:b.push(n(a.nodeValue,!0));break;case 8:b.push("\x3c!--",n(a.nodeValue,!0),"--\x3e");break;default:b.push("\x3c!-- Element not recognized - Type: ",a.nodeType," Name: ",a.nodeName,"--\x3e")}};d.getChildrenHtml=function(a){var b=[];d.getChildrenHtmlHelper(a,b);return b.join("")};d.getChildrenHtmlHelper=function(a,b){if(a)for(var e=a.childNodes||a,g=!l("ie")||e!==a,f,c=0;f=e[c++];)(!g||f.parentNode==a)&&d.getNodeHtmlHelper(f,b)};return d});