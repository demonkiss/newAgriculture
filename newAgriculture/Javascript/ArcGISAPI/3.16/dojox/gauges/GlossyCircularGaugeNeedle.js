//>>built
define("dojox/gauges/GlossyCircularGaugeNeedle",["dojo/_base/declare","dojo/_base/Color","./AnalogIndicatorBase"],function(c,d,e){return c("dojox.gauges.GlossyCircularGaugeNeedle",[e],{interactionMode:"gauge",color:"#c4c4c4",_getShapes:function(a){var c=d.blendColors(new d(this.color),new d("black"),0.3);if(!this._gauge)return null;var b=[];b[0]=a.createGroup();a=Math.min(this._gauge.width/this._gauge._designWidth,this._gauge.height/this._gauge._designHeight);b[0].createGroup().setTransform({xx:a,
xy:0,yx:0,yy:a,dx:0,dy:0});b[0].children[0].createPath({path:"M357.1429 452.005 L333.0357 465.9233 L333.0357 438.0868 L357.1429 452.005 Z"}).setTransform({xx:0,xy:1,yx:-6.21481,yy:0,dx:-452.00505,dy:2069.75519}).setFill(this.color).setStroke({color:c,width:1,style:"Solid",cap:"butt",join:20});return b}})});