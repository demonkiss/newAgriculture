// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.
//>>built
define("esri/tasks/ImageServiceMeasureTask","dojo/_base/declare dojo/_base/lang dojo/has ../kernel ../request ../geometry/normalizeUtils ./Task".split(" "),function(a,b,f,g,l,h,m){a=a(m,{declaredClass:"esri.tasks.ImageServiceMeasureTask",constructor:function(k){this._url.path+="/measure";this._handler=b.hitch(this,this._handler)},__msigns:[{n:"execute",c:3,a:[{i:0,p:["fromGeometry","toGeometry"]}],e:2}],_handler:function(k,a,e,c,d){try{this._successHandler([k],"onComplete",e,d)}catch(b){this._errorHandler(b,
c,d)}},execute:function(a,f,e,c){var d=c.assembly;a=this._encode(b.mixin({},this._url.query,{f:"json"},a.toJson(d&&d[0])));var g=this._handler,h=this._errorHandler;return l({url:this._url.path,content:a,callbackParamName:"callback",load:function(a,b){g(a,b,f,e,c.dfd)},error:function(a){h(a,e,c.dfd)}})},onComplete:function(){}});h._createWrappers(a);f("extend-esri")&&b.setObject("tasks.ImageServiceMeasureTask",a,g);return a});