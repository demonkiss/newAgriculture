//>>built
define("dojox/mobile/SearchBox","dojo/_base/declare dojo/_base/lang dojo/_base/window dijit/form/_SearchMixin dojox/mobile/TextBox dojo/dom-class dojo/keys dojo/touch dojo/on ./sniff".split(" "),function(k,r,l,m,n,p,f,d,q,e){return k("dojox.mobile.SearchBox",[n,m],{baseClass:"mblTextBox mblSearchBox",type:"search",placeHolder:"",incremental:!0,_setIncrementalAttr:function(b){this.incremental=b},_onInput:function(b){b.charOrCode==f.ENTER?b.charOrCode=229:this.incremental||(b.charOrCode=0);this.inherited(arguments)},
postCreate:function(){this.inherited(arguments);this.textbox.removeAttribute("incremental");this.textbox.hasAttribute("results")||this.textbox.setAttribute("results","0");5>e("ios")&&(p.add(this.domNode,"iphone4"),this.connect(this.textbox,"onfocus",function(){""!==this.textbox.value&&this.defer(function(){""===this.textbox.value&&this._onInput({charOrCode:f.ENTER})})}));this.connect(this.textbox,"onsearch",function(){this._onInput({charOrCode:f.ENTER})});var b=this,g,h,c;if(e("ios"))this.on(d.press,
function(a){g=a.touches?a.touches[0].pageX:a.pageX;h=a.touches?a.touches[0].pageY:a.pageY;c=q(l.doc,d.release,function(a){var d,e;""!=b.get("value")&&(d=a.pageX-g,e=a.pageY-h,4>=Math.abs(d)&&4>=Math.abs(e)&&(a.preventDefault(),b.set("value",""),b._onInput({charOrCode:f.ENTER})));c&&(c.remove(),c=null)});if(20<=b.domNode.getBoundingClientRect().right-(a.touches?a.touches[0].pageX:a.pageX)&&c)c.remove(),c=null})}})});