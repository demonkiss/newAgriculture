//>>built
define("dojox/mobile/Audio",["dojo/_base/declare","dojo/dom-construct","dojo/sniff","dijit/_Contained","dijit/_WidgetBase"],function(f,e,d,g,h){return f("dojox.mobile.Audio",[h,g],{source:null,width:"200px",height:"15px",_playable:!1,_tag:"audio",constructor:function(){this.source=[]},buildRendering:function(){this.domNode=this.srcNodeRef||e.create(this._tag)},_getEmbedRegExp:function(){return d("ff")?/audio\/mpeg/i:d("ie")?/audio\/wav/i:null},startup:function(){if(!this._started){this.inherited(arguments);
var a,c,b;if(this.domNode.canPlayType)if(0<this.source.length){a=0;for(c=this.source.length;a<c;a++)e.create("source",{src:this.source[a].src,type:this.source[a].type},this.domNode),this._playable=this._playable||!!this.domNode.canPlayType(this.source[a].type)}else{a=0;for(c=this.domNode.childNodes.length;a<c;a++)b=this.domNode.childNodes[a],1===b.nodeType&&"SOURCE"===b.nodeName&&(this.source.push({src:b.src,type:b.type}),this._playable=this._playable||!!this.domNode.canPlayType(b.type))}d.add("mobile-embed-audio-video-support",
!0);if(d("mobile-embed-audio-video-support")&&!this._playable){a=0;c=this.source.length;for(b=this._getEmbedRegExp();a<c;a++)if(this.source[a].type.match(b)){a=e.create("embed",{src:this.source[0].src,type:this.source[0].type,width:this.width,height:this.height});this.domNode.parentNode.replaceChild(a,this.domNode);this.domNode=a;this._playable=!0;break}}}}})});