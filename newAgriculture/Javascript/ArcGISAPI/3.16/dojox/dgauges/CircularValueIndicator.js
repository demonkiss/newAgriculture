//>>built
define("dojox/dgauges/CircularValueIndicator",["dojo/_base/declare","dojox/gfx","./ScaleIndicatorBase","dojo/_base/event"],function(c,d,e,f){return c("dojox.dgauges.CircularValueIndicator",e,{indicatorShapeFunc:function(a,b){return a.createLine({x1:0,y1:0,x2:40,y2:0}).setStroke({color:"black",width:1})},refreshRendering:function(){this.inherited(arguments);var a=isNaN(this._transitionValue)?this.value:this._transitionValue,a=this.scale.positionForValue(a);this._gfxGroup.setTransform([{dx:this.scale.originX,
dy:this.scale.originY},d.matrix.rotateg(a)])},_onMouseDown:function(a){this.inherited(arguments);var b=this.scale._gauge._gaugeToPage(this.scale.originX,this.scale.originY),b=180*Math.atan2(a.pageY-b.y,a.pageX-b.x)/Math.PI;this.set("value",this.scale.valueForPosition(b));f.stop(a)},_onMouseMove:function(a){this.inherited(arguments);var b=this.scale._gauge._gaugeToPage(this.scale.originX,this.scale.originY),b=180*Math.atan2(a.pageY-b.y,a.pageX-b.x)/Math.PI;this.set("value",this.scale.valueForPosition(b))}})});