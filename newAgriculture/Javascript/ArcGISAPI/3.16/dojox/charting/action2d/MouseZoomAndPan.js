//>>built
define("dojox/charting/action2d/MouseZoomAndPan","dojo/_base/declare dojo/_base/window dojo/_base/array dojo/_base/event dojo/_base/connect dojo/mouse ./ChartAction dojo/sniff dojo/dom-prop dojo/keys dojo/has!dojo-bidi?../bidi/action2d/ZoomAndPan".split(" "),function(n,p,s,m,h,t,l,k,q,r,u){var v=k("mozilla")?3:120,w={none:function(a){return!a.ctrlKey&&!a.altKey&&!a.shiftKey},ctrl:function(a){return a.ctrlKey&&!a.altKey&&!a.shiftKey},alt:function(a){return!a.ctrlKey&&a.altKey&&!a.shiftKey},shift:function(a){return!a.ctrlKey&&
!a.altKey&&a.shiftKey}};l=n(k("dojo-bidi")?"dojox.charting.action2d.NonBidiMouseZoomAndPan":"dojox.charting.action2d.MouseZoomAndPan",l,{defaultParams:{axis:"x",scaleFactor:1.2,maxScale:100,enableScroll:!0,enableDoubleClickZoom:!0,enableKeyZoom:!0,keyZoomModifier:"ctrl"},optionalParams:{},constructor:function(a,c,b){this._listeners=[{eventName:t.wheel,methodName:"onMouseWheel"}];b||(b={});this.axis=b.axis?b.axis:"x";this.scaleFactor=b.scaleFactor?b.scaleFactor:1.2;this.maxScale=b.maxScale?b.maxScale:
100;this.enableScroll=void 0!=b.enableScroll?b.enableScroll:!0;this.enableDoubleClickZoom=void 0!=b.enableDoubleClickZoom?b.enableDoubleClickZoom:!0;this.enableKeyZoom=void 0!=b.enableKeyZoom?b.enableKeyZoom:!0;this.keyZoomModifier=b.keyZoomModifier?b.keyZoomModifier:"ctrl";this.enableScroll&&this._listeners.push({eventName:"onmousedown",methodName:"onMouseDown"});this.enableDoubleClickZoom&&this._listeners.push({eventName:"ondblclick",methodName:"onDoubleClick"});this.enableKeyZoom&&this._listeners.push({eventName:"keypress",
methodName:"onKeyPress"});this._handles=[];this.connect()},_disconnectHandles:function(){k("ie")&&this.chart.node.releaseCapture();s.forEach(this._handles,h.disconnect);this._handles=[]},connect:function(){this.inherited(arguments);this.enableKeyZoom&&q.set(this.chart.node,"tabindex","0")},disconnect:function(){this.inherited(arguments);this.enableKeyZoom&&q.set(this.chart.node,"tabindex","-1");this._disconnectHandles()},onMouseDown:function(a){var c=this.chart,b=c.getAxis(this.axis);this._startCoord=
b.vertical?a.pageY:a.pageX;this._startOffset=b.getWindowOffset();this._isPanning=!0;k("ie")?(this._handles.push(h.connect(this.chart.node,"onmousemove",this,"onMouseMove")),this._handles.push(h.connect(this.chart.node,"onmouseup",this,"onMouseUp")),this.chart.node.setCapture()):(this._handles.push(h.connect(p.doc,"onmousemove",this,"onMouseMove")),this._handles.push(h.connect(p.doc,"onmouseup",this,"onMouseUp")));c.node.focus();m.stop(a)},onMouseMove:function(a){if(this._isPanning){var c=this.chart,
b=c.getAxis(this.axis);a=this._getDelta(a);var d=b.getScaler().bounds,d=d.span/(d.upper-d.lower),b=b.getWindowScale();c.setAxisWindow(this.axis,b,this._startOffset-a/d/b);c.render()}},onMouseUp:function(a){this._isPanning=!1;this._disconnectHandles()},onMouseWheel:function(a){var c=a.wheelDelta/v;-1<c&&0>c?c=-1:0<c&&1>c&&(c=1);this._onZoom(c,a)},onKeyPress:function(a){w[this.keyZoomModifier](a)&&("+"==a.keyChar||a.keyCode==r.NUMPAD_PLUS?this._onZoom(1,a):("-"==a.keyChar||a.keyCode==r.NUMPAD_MINUS)&&
this._onZoom(-1,a))},onDoubleClick:function(a){var c=this.chart,b=c.getAxis(this.axis),d=1/this.scaleFactor;if(1==b.getWindowScale()){var e=b.getScaler(),b=e.bounds.from,e=e.bounds.to,f=(b+e)/2,g=this.plot.toData({x:a.pageX,y:a.pageY})[this.axis];c.zoomIn(this.axis,[d*(b-f)+g,d*(e-f)+g])}else c.setAxisWindow(this.axis,1,0),c.render();m.stop(a)},_onZoom:function(a,c){var b=0>a?Math.abs(a)*this.scaleFactor:1/(Math.abs(a)*this.scaleFactor),d=this.chart,e=d.getAxis(this.axis);if(!(e.getWindowScale()/
b>this.maxScale)){var f=e.getScaler(),e=f.bounds.from,f=f.bounds.to,g="keypress"==c.type?(e+f)/2:this.plot.toData({x:c.pageX,y:c.pageY})[this.axis];d.zoomIn(this.axis,[b*(e-g)+g,b*(f-g)+g]);m.stop(c)}},_getDelta:function(a){return this.chart.getAxis(this.axis).vertical?this._startCoord-a.pageY:a.pageX-this._startCoord}});return k("dojo-bidi")?n("dojox.charting.action2d.MouseZoomAndPan",[l,u]):l});