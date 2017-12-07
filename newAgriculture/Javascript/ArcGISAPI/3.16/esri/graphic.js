// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.
//>>built
define("esri/graphic", "dojo/_base/declare dojo/_base/lang dojo/has ./kernel ./domUtils ./lang ./InfoTemplate ./geometry/jsonUtils ./symbols/jsonUtils".split(" "), function (d, f, k, l, g, h, m, n, p) {
    d = d(null, {
        declaredClass: "esri.Graphic",
        constructor: function (a, b, c, e) {
            a && !a.declaredClass ? (this.geometry = a.geometry ? n.fromJson(a.geometry) : null,
            this.symbol = a.symbol ? p.fromJson(a.symbol) : null,
            this.attributes = a.attributes || null,
            this.infoTemplate = a.infoTemplate ? new m(a.infoTemplate) : null) : (this.geometry = a, this.symbol =b, this.attributes = c, this.infoTemplate = e)
        },
        _shape: null,
        _graphicsLayer: null,
        _visible: !0, visible: !0,
        getDojoShape: function () { return this._shape },
        getShapes: function () { var a = []; this._shape && a.push(this._shape); this._bgShape && a.push(this._bgShape); return a },
        getNode: function () { var a = this._shape && this._shape.getNode(); return a && a.nodeType ? a : null },
        getNodes: function () { var a = this.getShapes(), b, c, e = a.length, d = []; for (c = 0; c < e; c++) (b = a[c] && a[c].getNode()) && b.nodeType && d.push(b); return d },
        getLayer: function () { return this._layer },
        draw: function () {
            var a = this._graphicsLayer; a && a._draw(this, !0); return this
        },
        setGeometry: function (a) {
            this.geometry = a; if (a = this._graphicsLayer) a._updateExtent(this), a._draw(this, !0); return this
        },
        setSymbol: function (a, b) { var c = this._graphicsLayer, e = this._shape; this.symbol = a; c && (b && e && c._removeShape(this), c._draw(this, !0)); return this },
        setAttributes: function (a) { this.attributes = a; return this }, setInfoTemplate: function (a) { this.infoTemplate = a; return this },
        getInfoTemplate: function () { return this._getEffInfoTemplate() },
        _getEffInfoTemplate: function () { var a = this.getLayer(); return this.infoTemplate || a && a.infoTemplate },
        getTitle: function () { var a = this.getInfoTemplate(), b = a && a.title; if (f.isFunction(b)) b = b.call(a, this); else if (f.isString(b)) var c = (a = this.getLayer()) && a._getDateOpts, b = h.substitute(this.attributes, b, { first: !0, dateFormat: c && c.call(a) }); return b },
        getContent: function () {
            var a = this.getInfoTemplate(), b = a && a.content; if (f.isFunction(b)) b = b.call(a, this); else if (f.isString(b)) var c = (a = this.getLayer()) && a._getDateOpts,
            b = h.substitute(this.attributes, b, { dateFormat: c && c.call(a) }); return b
        },
        attr: function (a, b) { var c = this.getNodes(), e, d = c.length; for (e = 0; e < d; e++) null == b ? c[e].removeAttribute(a) : c[e].setAttribute(a, b); return this },
        show: function () { this.visible = this._visible = !0; var a, b, c; if (this.getShapes().length) { a = this.getNodes(); c = a.length; this.attr("data-hidden"); for (b = 0; b < c; b++) g.show(a[b]) } else this._graphicsLayer && this._graphicsLayer._draw(this, !0); return this }, hide: function () {
            this.visible = this._visible = !1; var a =
            this._graphicsLayer, b, c;
            if (a) if ("canvas-2d" === a.surfaceType) a._removeShape(this); else if (a = this.getNodes(), c = a.length) { this.attr("data-hidden", ""); for (b = 0; b < c; b++) g.hide(a[b]) } return this
        },
        toJson: function () {
            var a = {}; this.geometry && (a.geometry = this.geometry.toJson());
            this.attributes && (a.attributes = f.mixin({}, this.attributes)); this.symbol && (a.symbol = this.symbol.toJson());
            this.infoTemplate && (a.infoTemplate = this.infoTemplate.toJson()); return a
        }
    });
    d.prototype.getShape = d.prototype.getDojoShape; k("extend-esri") &&
    (l.Graphic = d); return d
});