//>>built
define("dojox/dtl/filter/misc",["dojo/_base/lang","dojo/_base/json","../_base"],function(e,h,f){var g=e.getObject("filter.misc",!0,f);e.mixin(g,{filesizeformat:function(a){a=parseFloat(a);return 1024>a?1==a?a+" byte":a+" bytes":1048576>a?(a/1024).toFixed(1)+" KB":1073741824>a?(a/1024/1024).toFixed(1)+" MB":(a/1024/1024/1024).toFixed(1)+" GB"},pluralize:function(a,c){c=c||"s";-1==c.indexOf(",")&&(c=","+c);var b=c.split(",");if(2<b.length)return"";var d=b[0],b=b[1];return 1!=parseInt(a,10)?b:d},_phone2numeric:{a:2,
b:2,c:2,d:3,e:3,f:3,g:4,h:4,i:4,j:5,k:5,l:5,m:6,n:6,o:6,p:7,r:7,s:7,t:8,u:8,v:8,w:9,x:9,y:9},phone2numeric:function(a){var c=f.filter.misc;a+="";for(var b="",d=0;d<a.length;d++){var e=a.charAt(d).toLowerCase();c._phone2numeric[e]?b+=c._phone2numeric[e]:b+=a.charAt(d)}return b},pprint:function(a){return h.toJson(a)}});return g});