// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.
//>>built
define("esri/renderers/UniqueValueRenderer","dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/has ../kernel ../lang ../symbols/jsonUtils ./Renderer".split(" "),function(d,g,e,k,l,m,h,n){d=d(n,{declaredClass:"esri.renderer.UniqueValueRenderer",constructor:function(b,a,c,e,f){this.values=[];this._symbols={};this.infos=[];b&&!b.declaredClass?(a=b,this.defaultSymbol=(b=a.defaultSymbol)&&(b.declaredClass?b:h.fromJson(b)),this.attributeField=a.field1,this.attributeField2=a.field2,this.attributeField3=
a.field3,this.fieldDelimiter=a.fieldDelimiter,this.defaultLabel=a.defaultLabel,this.setValueExpression(a.valueExpression),a.backgroundFillSymbol&&(this.backgroundFillSymbol=h.fromJson(a.backgroundFillSymbol)),g.forEach(a.uniqueValueInfos,this._addValueInfo,this)):(this.defaultSymbol=b,this.attributeField=a,this.attributeField2=c,this.attributeField3=e,this.fieldDelimiter=f);this._multiple=!!this.attributeField2},addValue:function(b,a){var c=e.isObject(b)?b:{value:b,symbol:a};this._addValueInfo(c)},
removeValue:function(b){var a=g.indexOf(this.values,b);-1!==a&&(this.values.splice(a,1),delete this._symbols[b],this.infos.splice(a,1))},getUniqueValueInfo:function(b){var a=this.attributeField,c=b.attributes,d,f;this._exprTree?a=this._executeExpr(this._exprTree,this._createExprContext(b)):this._multiple?(b=this.attributeField2,d=this.attributeField3,f=[],a&&f.push(c[a]),b&&f.push(c[b]),d&&f.push(c[d]),a=f.join(this.fieldDelimiter||"")):a=e.isFunction(a)?a(b):c[a];return this._symbols[a]},setValueExpression:function(b){this.valueExpression=
b;this._exprTree=this._parseExpr(b,{vars:{$feature:"any"}})},getSymbol:function(b){return(b=this.getUniqueValueInfo(b))&&b.symbol||this.defaultSymbol},_addValueInfo:function(b){var a=b.value;this.values.push(a);this.infos.push(b);var c=b.symbol;c&&!c.declaredClass&&(b.symbol=h.fromJson(c));this._symbols[a]=b},toJson:function(){var b=m.fixJson,a;a={type:"uniqueValue",field1:this.attributeField,field2:this.attributeField2,field3:this.attributeField3,fieldDelimiter:this.fieldDelimiter,valueExpression:this.valueExpression,
defaultSymbol:this.defaultSymbol&&this.defaultSymbol.toJson(),defaultLabel:this.defaultLabel,uniqueValueInfos:g.map(this.infos||[],function(a){a=e.mixin({},a);a.symbol=a.symbol&&a.symbol.toJson();a.value+="";return b(a)})};this.backgroundFillSymbol&&(a.backgroundFillSymbol=this.backgroundFillSymbol.toJson());a=e.mixin(this.inherited(arguments),a);return b(a)}});k("extend-esri")&&e.setObject("renderer.UniqueValueRenderer",d,l);return d});