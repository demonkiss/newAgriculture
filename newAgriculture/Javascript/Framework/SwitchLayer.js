define(function () {
    return {
        switchLayer: switchLayer,
        addZJCityBorder: addZJCityBorder,
        addZJCityNumber: addZJCityNumber,
        getSearchSql: getSearchSql
    }
});
function clearHighLight() {
    tempLayer.clear();
    searchLayer.clear();
    map.infoWindow.hide();
    $("#searchList ul").html("");
    $("#searchList").hide();
    $("#searchListHead").hide();

}
function switchLayer() {
    var  minzoom = downLevel;
    var  midzoom = midLevel;
    var maxzoom = upLevel;

    $(".labelNumber").remove();
    if (areaClick) {
        areaClick.remove();
    }

    if (map.graphics) {
        map.graphics.clear();
    }
    $("#typeinfo").hide();
    total = 0;
    if (map.getLayer("ls")) {
        map.removeLayer(map.getLayer("ls"));
        
    }
    if ($("#map_ls")) {
        $("#map_ls").remove();
    }

    if (map.getLayer("clusters")) {
        map.removeLayer(map.getLayer("clusters"));
    }

    cityLayer.clear();

    if (map.getLayer("cityTextLayer")) {
        map.removeLayer(map.getLayer("cityTextLayer"))
    }
    if (map.getLayer("borderLayer")) {
        map.removeLayer(map.getLayer("borderLayer"));
    }
    var  zoomlevel = map.getZoom();
    if (zoomlevel <= minzoom) {
        clearHighLight();
        sssy = "浙江省";
        $(".sel-fun button").text(sssy);
        $(".sel-fun button").append("<span class=\"caret\"></span>");
        ssqy = "";

        addZJCityNumber();

    } else if (zoomlevel <= midzoom && zoomlevel > minzoom) {
        clearHighLight();

        $(".actionsPane").hide();
        $(".next").hide();
        $(".prev").hide();
        $(".title").html("");
        sssy = getCityName();
        ssqy = "";
        $(".sel-fun button").text(sssy);
        $(".sel-fun button").append("<span class=\"caret\"></span>");
        getCityBlockStatic();

    }
    else if (zoomlevel <= maxzoom && zoomlevel > midzoom) {
        clearHighLight();
        $(".actionsPane").show();
        $(".next").hide();
        $(".prev").hide();
        $(".title").html("");

        sssy = getCityName();
        ssqy = "";
        $(".sel-fun button").text(sssy);
        $(".sel-fun button").append("<span class=\"caret\"></span>");
        getCenterBlockName();
        if (clusterType[0] == "建设分布图") {
            getCityCluster(sssy);
        } else {
            getClusterData(clusterType, currentattr);
        }



        if (showClusterData.length) {

            var number = 0;
            for (var  k = 0; k < showClusterData.length; k++) {
                number += showClusterData[k].length
            }

            $("#total").text(number);
        }
         // addBorder();
        addBlockBorder();
          var ld = "";
          if (layerDType.length) {

              var ld = getLayerDefine(layerDType, currentattr);
              console.log(ld);


              addDynamicLayer(pUrl,pArray, ld,1);
          }

        }
    else if (zoomlevel > maxzoom) {


        $(".actionsPane").hide();
        $(".next").hide();
        $(".prev").hide();
        $(".title").html("");
        sssy = getCityName();

        ssqy = getBlockName();
        $(".sel-fun button").text(ssqy);
        $(".sel-fun button").append("<span class=\"caret\"></span>");

        if (clusterType[0] == "建设分布图") {
            getCityCluster(sssy);
        } else {
            getClusterData(clusterType, currentattr);
        }
        if (showClusterData.length) {
            var  number = 0;
            for (var  k = 0; k < showClusterData.length; k++) {
                number += showClusterData[k].length;
            }
            $("#total").text(number);
        } else {
            var  number = 0;
            $("#total").text(number);
        }


        var ld = "";
        if (layerDType.length) {

            var ld = getLayerDefine(layerDType, currentattr);
            console.log(ld);


            addDynamicLayer(currenturl, visiableArray, ld,0.6);
        }
    }
    require(["mapconfig/cityCode"], function (citycode) {
        if (sssy != "浙江省") {
            var code = citycode.citycode[sssy];

            $(".sel").val(code.toString());
        } else
        {
            $(".sel").val("330000");
        }
       
    });
   
}
function getTypeNumber(city, attributeName,district) {
    typeNumber.length = 0;
    var number = 0;

    if (statisType[0] == "建设分布图") {

        for (var  i = 0; i < ClusterData.length; i++) {
            if (district == ClusterData[i].attributes[attributeName]) {

                number++;
            }        
        }
        var  cData = {};
        cData.name = "建设分布图";
        cData.number = number;
        typeNumber.push(cData);

    } else {
        getStatisticsData(city, clusterType, currentattr);
        for (var  i = 0; i < statisticsData.length; i++) {

            number += statisticsData[i].length;
            var  cData = {};
            cData.name = statisType[i];
            cData.number = statisticsData[i].length;
            typeNumber.push(cData);
        }
    }



}


function getCityCluster(city) {
    showClusterData.length = 0;
    if (clusterType[0] == "建设分布图") {
        var cData = [];
        for (var  i = 0; i < ClusterData.length; i++) {
            if (city == ClusterData[i].attributes["地市名称"]) {
                cData.push(ClusterData[i]);

            }

        }
        if (cData.length) {
            showClusterData.push(cData);
        }

    }
}
function getCityParam(city, attributeName) {
    var  number = 0;
    if (clusterType[0] == "建设分布图") {
        var cData;
        if (ssqy != "") {
            for (var  i = 0; i < ClusterData.length; i++) {

                if (ssqy == ClusterData[i].attributes[attributeName]) {

                    number++;
                }
            }
        } else {
            for (var  i = 0; i < ClusterData.length; i++) {
                if (city == ClusterData[i].attributes["地市名称"]) {

                    number++;
                }
            }
        }

    } else {
        getStatisticsData(city, clusterType, currentattr);
        for (var  i = 0; i < statisticsData.length; i++) {

            number += statisticsData[i].length;

        }
    }

    return number;
}

function getCityBlockStatic() {
    var _block = "";
    blockNumber.length = 0;
    require(["Javascript/config/cityCode.js"], function (cityCode) {

        var cityname = sssy.replace("\"", "");
        var url = "Json/city/" + cityCode.citycode[cityname] + ".json";
        console.log(url);
        $.ajax({
            url: url,
            dataType: 'json',
            type: "GET",
            async: false,
            data: {},
            success: function (data) {
                require(["esri/layers/GraphicsLayer", "esri/geometry/Point", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/symbols/PictureMarkerSymbol", "esri/Color", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/TextSymbol",
              "esri/symbols/Font"], function (GraphicsLayer,Point, Polyline, Polygon, PictureMarkerSymbol, Color, Graphic, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, Font) {
                  if (map.getLayer("cityLayer")) {
                      map.removeLayer(map.getLayer("cityLayer"));
                  }
                 
                  var html = "<ul class=\"clearfix\">";
                  var cityTextLayer = new GraphicsLayer({ id: "cityTextLayer" });
                  var  centerPoint = [(map.extent.xmax + map.extent.xmin) / 2.0, (map.extent.ymax + map.extent.ymin) / 2.0];
                  var extent="";
                  for (var  i = 0; i < data.features.length; i++) {
                      var geometry = data.features[i].geometry;
                     
                      var sls = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 2);
                      if (geometry.type == "MultiPolygon") {
                          var length = geometry.coordinates.length;
                          for (var k = 0; k< length; k++) {
                              var polylineJson = {
                                  "paths": geometry.coordinates[k],
                                  "spatialReference": { "wkid": 4326 }
                              };
                              var polyline = new Polyline(polylineJson);
                              extent = polyline.getExtent();
                              var graphic = new Graphic(polyline, sls);
                              cityLayer.add(graphic);
                          }
                      }
                      else {
                          var polylineJson = {
                              "paths": geometry.coordinates,
                              "spatialReference": { "wkid": 4326 }
                          };
                          var polyline = new Polyline(polylineJson);
                          extent = polyline.getExtent();
                          var graphic = new Graphic(polyline, sls);
                          cityLayer.add(graphic);
                      }
                      var qxName = data.features[i].properties.name;
                      var point = new Point(data.features[i].properties.cp);
                      ssqy = qxName;
                      var blockCityNumber = getCityParam(sssy, "县市区名称");
                      var showLabel = qxName + "   " + blockCityNumber;
                      var xjLng = data.features[i].properties.cp[0];
                      var xjLat = data.features[i].properties.cp[1];
                      html += "<li class=\"clearfix\">"
                                      + "<span  xjLat=" + xjLat + " xjLng=" + xjLng + " class='s1 fl xj' >" + qxName + "</span>"
                                      + "<p class=\"s2 fr\"><span>" + blockCityNumber + "</span>个</p>"
                                      + "</li>";
                      var attr = { "name": qxName, "number": blockCityNumber };
                      if (ifIE() == "ie8") {
                          var screenP = map.toScreen(point);

                          var text = $("<span class='labelNumber'>" + showLabel + "</span>").css({ "position": "absolute", "left": screenP.x - 40, "top": screenP.y - 15, "width": "100px", "height": "30px", "color": "#fff", "z-index": "9" }).appendTo($("body"));
                      }
                      blockNumber.push(attr);
                      var font = new Font();
                      font.setSize("10pt");
                      font.setFamily("微软雅黑");

                      var defaultSymbol = new PictureMarkerSymbol("./images/orangetips.png", 120, 40).setOffset(0, 0);
                      cityTextLayer.add(
                        new Graphic(
                          point,
                          defaultSymbol,
                          attr
                        )
                      );

                      var label = new TextSymbol(showLabel)
                        .setColor(new Color([255, 255, 255]), 0.5)
                      .setFont(font);
                      cityTextLayer.add(
                        new Graphic(
                          point,
                          label,
                          attr
                        )
                      );
                      total += blockCityNumber;

                  }

                  html += "</ul>";
                  $(".tabBox1").html(html);
                  map.addLayer(cityLayer);
                  map.addLayer(cityTextLayer);
 
                  $("#total").text(total);
                  var cityTextClick = cityTextLayer.on("mouse-over", function (e) {

                      currentGraphic = e.graphic;
                      var screenP = map.toScreen(e.graphic.geometry);
                      $("#typeinfo").html("");
                      ssqy = e.graphic.attributes["name"];
                      getTypeNumber(sssy, "县市区名称",ssqy);
                      var html = "";
                      for (var  i = 0; i < typeNumber.length; i++) {
                          html += "<span>" + typeNumber[i].name + ":" + typeNumber[i].number + "</span></br>";
                      }
                      $("#typeinfo").append(html);
                      $("#typeinfo").css("left", screenP.x);
                      $("#typeinfo").css("top", screenP.y);
                      if (html) {
                          $("#typeinfo").show();
                      }
                    
                      map.setMapCursor("pointer");
                  })
                  var cityTextClick = cityTextLayer.on("mouse-out", function (e) {

                      $("#typeinfo").hide();
                      map.setMapCursor("default");

                  })

              }


              )
            }

        })
    }
    )
}

function ifIE() {
    
    if (navigator.userAgent.indexOf("MSIE") > 0) {
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {

            return "ie6";
        }
        if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {

            return "ie7";
        }
        if (navigator.userAgent.indexOf("MSIE 8.0") > 0 && !window.innerWidth) {

            return "ie8";
        }
        if (navigator.userAgent.indexOf("MSIE 9.0") > 0) {

            return "ie9";
        }

    }
    
}

function getBlockName() {
    if (map.graphics) {
        map.graphics.clear();
    }
    var _block = "";
    require(["Javascript/config/cityCode.js"], function (cityCode) {

        var cityname = sssy.replace("\"", "");

        var url = "Json/city/" + cityCode.citycode[cityname] + ".json";
        console.log(url);
        $.ajax({
            url: url,
            dataType: 'json',
            type: "GET",
            async: false,
            data: {},
            success: function (data) {
                require(["esri/layers/GraphicsLayer", "esri/geometry/Point", "esri/geometry/Polygon", "esri/geometry/Polyline", "esri/symbols/PictureMarkerSymbol", "esri/Color", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/TextSymbol",
                          "esri/symbols/Font"],
                    function (GraphicsLayer,Point, Polygon, Polyline, PictureMarkerSymbol, Color, Graphic, SimpleLineSymbol, SimpleFillSymbol,TextSymbol, Font) {
                    var borderLayer = new GraphicsLayer({ id: "borderLayer" });
                    var  centerPoint = [(map.extent.xmax + map.extent.xmin) / 2.0, (map.extent.ymax + map.extent.ymin) / 2.0];
                    for (var  i = 0; i < data.features.length; i++) {
                        if (PointInsidePolygon(centerPoint, data.features[i].geometry.coordinates[0])) {
                            console.log(data.features[i].properties.name);
                            _block = data.features[i].properties.name;

                            var geometry = data.features[i].geometry;

                            var sls = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 2);
                            if (geometry.type == "MultiPolygon") {
                                var length = geometry.coordinates.length;
                                for (var k = 0; k < length; k++) {
                                    var polylineJson = {
                                        "paths": geometry.coordinates[k],
                                        "spatialReference": { "wkid": 4326 }
                                    };
                                    var polyline = new Polyline(polylineJson);
      
                                    var graphic = new Graphic(polyline, sls);
                                    borderLayer.add(graphic);
                                }
                            }
                            else {
                                var polylineJson = {
                                    "paths": geometry.coordinates,
                                    "spatialReference": { "wkid": 4326 }
                                };
                                var polyline = new Polyline(polylineJson);

                                var graphic = new Graphic(polyline, sls);
                                borderLayer.add(graphic);
                            }
                            
                              var point = new Point(centerPoint);
                              var font = new Font();
                              font.setSize("16pt");
                              font.setFamily("微软雅黑");
                              var label = new TextSymbol(_block)
   
                                   .setColor(new Color(textColor))
                                  .setFont(font);
                              map.graphics.add(
                                new Graphic(
                                  point,
                                  label
                                )
                              );
                          
                            borderLayer.add(graphic);

                            map.addLayer(borderLayer);
                            break;
                        }


                    }


                })
            }

        });
    })


    return _block;
}
function getCenterBlockName(){
    if (map.graphics) {
        map.graphics.clear();
    }
    var _block = "";
    require(["Javascript/config/cityCode.js"], function (cityCode) {

        var cityname = sssy.replace("\"", "");

        var url = "Json/city/" + cityCode.citycode[cityname] + ".json";
        console.log(url);
        $.ajax({
            url: url,
            dataType: 'json',
            type: "GET",
            async: false,
            data: {},
            success: function (data) {
                require(["esri/layers/GraphicsLayer", "esri/geometry/Point", "esri/geometry/Polygon", "esri/geometry/Polyline", "esri/symbols/PictureMarkerSymbol", "esri/Color", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/TextSymbol",
                          "esri/symbols/Font"],
                    function (GraphicsLayer, Point, Polygon, Polyline, PictureMarkerSymbol, Color, Graphic, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, Font) {
                        var  centerPoint = [(map.extent.xmax + map.extent.xmin) / 2.0, (map.extent.ymax + map.extent.ymin) / 2.0];
                        for (var  i = 0; i < data.features.length; i++) {
                            var geometry = data.features[i].geometry;
                            if (geometry.type == "MultiPolygon") {
                                var length = geometry.coordinates.length;
                                for (var k = 0; k < length; k++) {
                                    var vec = geometry.coordinates[k][0];
                                    if (PointInsidePolygon(centerPoint, vec)) {
                                        console.log(data.features[i].properties.name);
                                        _block = data.features[i].properties.name;


                                        var point = new Point(centerPoint);
                                        var font = new Font();
                                        font.setSize("16pt");
                                        font.setFamily("微软雅黑");
                                        var label = new TextSymbol(_block)
         
                                             .setColor(new Color(textColor))
                                            .setFont(font);
                                        map.graphics.add(
                                          new Graphic(
                                            point,
                                            label
                                          )
                                        );

                                        break;
                                    }
                                }
                            }
                            else {
                                var vec = geometry.coordinates[0];
                                if (PointInsidePolygon(centerPoint, vec)) {
                                    console.log(data.features[i].properties.name);
                                    _block = data.features[i].properties.name;


                                    var point = new Point(centerPoint);
                                    var font = new Font();
                                    font.setSize("16pt");
                                    font.setFamily("微软雅黑");
                                    var label = new TextSymbol(_block)
                
                                         .setColor(new Color(textColor))
                                        .setFont(font);
                                    map.graphics.add(
                                      new Graphic(
                                        point,
                                        label
                                      )
                                    );

                                    break;
                                }
                            }
                         


                        }


                    })
            }

        });
    })


    return _block;
}
function addBlockBorder() {
    var _block = "";
    require(["Javascript/config/cityCode.js"], function (cityCode) {

        var cityname = sssy.replace("\"", "");

        var url = "Json/city/" + cityCode.citycode[cityname] + ".json";
        console.log(url);
        $.ajax({
            url: url,
            dataType: 'json',
            type: "GET",
            async: false,
            data: {},
            success: function (data) {
                require(["esri/layers/GraphicsLayer", "esri/geometry/Polygon", "esri/geometry/Polyline", "esri/symbols/PictureMarkerSymbol", "esri/Color", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol","esri/symbols/TextSymbol",
              "esri/symbols/Font"], function (GraphicsLayer, Polygon, Polyline, PictureMarkerSymbol, Color, Graphic, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, Font) {
                    var borderLayer = new GraphicsLayer({ id: "borderLayer" });
                    var  centerPoint = [(map.extent.xmax + map.extent.xmin) / 2.0, (map.extent.ymax + map.extent.ymin) / 2.0];
                    for (var  i = 0; i < data.features.length; i++) {
                            _block = data.features[i].properties.name;
                            var geometry = data.features[i].geometry;
                            var extent;
                            var sls = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 2);
                            if (geometry.type == "MultiPolygon") {
                                var length = geometry.coordinates.length;
                                for (var k = 0; k < length; k++) {
                                    var polylineJson = {
                                        "paths": geometry.coordinates[k],
                                        "spatialReference": { "wkid": 4326 }
                                    };
                                    var polyline = new Polyline(polylineJson);
                                    extent = polyline.getExtent();
                                    var graphic = new Graphic(polyline, sls);
                                    borderLayer.add(graphic);
                                }
                            }
                            else {
                                var polylineJson = {
                                    "paths": geometry.coordinates,
                                    "spatialReference": { "wkid": 4326 }
                                };
                                var polyline = new Polyline(polylineJson);
                                extent = polyline.getExtent();
                                var graphic = new Graphic(polyline, sls);
                                borderLayer.add(graphic);
                            }
                            borderLayer.add(graphic);
                    }
                    map.addLayer(borderLayer);

                })
            }

        });
    })


    return _block;
}
function getCityName() {
    if (map.graphics) {
        map.graphics.clear();
    }
    var  _city = "杭州市";

    var  centerPoint = [(map.extent.xmax + map.extent.xmin) / 2.0, (map.extent.ymax + map.extent.ymin) / 2.0];
    for (var  i = 0; i < borderData.length; i++) {
        if (PointInsidePolygon(centerPoint, borderData[i].geometry.coordinates[0])) {
            console.log(borderData[i].properties.name);
            _city = borderData[i].properties.name;
          

            break;
        }
    }

    return _city;
}
function PointInsidePolygon(point, vs) {


    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

function addDynamicLayer(url, array, layersql,opacity) {
    require(["esri/layers/ImageParameters", "esri/layers/ArcGISDynamicMapServiceLayer"], function (ImageParameters, ArcGISDynamicMapServiceLayer) {
        var imageParameters = new ImageParameters();

        imageParameters.layerIds = array;
        imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
        imageParameters.transparent = true;

        var layerDefs = [];
        layerDefs[array[0]] = layersql;
 
        imageParameters.layerDefinitions = layerDefs;
  

        var rmap = map.getLayer("ls");
        if (rmap) {
            map.removeLayer(rmap);
            if ($("#map_ls")) {
                $("#map_ls").remove();
            }
        }
        var lslayer = new ArcGISDynamicMapServiceLayer(url, { "imageParameters": imageParameters, "id": "ls", "opacity": opacity });
        map.addLayer(lslayer, 2);
        areaClick = map.on("click", function (e) {
            require(["Framework/IdentifyTask"], function (Identify) {
                Identify.DoIdentify(e.mapPoint, url, array);
            })
        })
        lslayer.setVisibleLayers(array);

    })

}

function getStatisticsData(city, types, attr) {
    if (ClusterData) {

        statisticsData.length = 0;
        if (attr != "认定面积") {
            for (var k = 0; k < types.length; k++) {
                var cdata = [];
                for (var i = 0; i < ClusterData.length; i++) {
                    if (types[k] == ClusterData[i].attributes[attr]) {
                        if (city == ClusterData[i].attributes["地市名称"]) {
           
                            if (ssqy != "") {
                                if (ssqy == ClusterData[i].attributes["县市区名称"]) {
                                    cdata.push(ClusterData[i]);
                                }

                            } else {
                                cdata.push(ClusterData[i]);
                            }
                        }


                    }
                }

                    statisticsData.push(cdata);
            }
        } else {
            for (var k = 0; k < types.length; k++) {
                var cdata = [];
                switch (types[k]) {
                    case "大于1000亩":
                        for (var i = 0; i < ClusterData.length; i++) {
                            if (ClusterData[i].attributes[attr] >= 1000) {
                                if (city == ClusterData[i].attributes["地市名称"]) {
                               
                                    if (ssqy != "") {
                                        if (ssqy == ClusterData[i].attributes["县市区名称"]) {
                                            cdata.push(ClusterData[i]);
                                        }

                                    } else {
                                        cdata.push(ClusterData[i]);
                                    }
                                }

                            }
                        }

                        break;
                    case "500~1000亩":
                        for (var i = 0; i < ClusterData.length; i++) {
                            if (ClusterData[i].attributes[attr] < 1000 && ClusterData[i].attributes[attr] >= 500) {
                        
                                if (city == ClusterData[i].attributes["地市名称"]) {
                          
                                    if (ssqy != "") {
                                        if (ssqy == ClusterData[i].attributes["县市区名称"]) {
                                            cdata.push(ClusterData[i]);
                                        }

                                    } else {
                                        cdata.push(ClusterData[i]);
                                    }
                                }
                            }
                        }
                        break;
                    case "200~500亩":
                        for (var i = 0; i < ClusterData.length; i++) {
                            if (ClusterData[i].attributes[attr] < 500 && ClusterData[i].attributes[attr] >= 200) {
                               
                                if (city == ClusterData[i].attributes["地市名称"]) {
                           
                                    if (ssqy != "") {
                                        if (ssqy == ClusterData[i].attributes["县市区名称"]) {
                                            cdata.push(ClusterData[i]);
                                        }

                                    } else {
                                        cdata.push(ClusterData[i]);
                                    }
                                }
                            }
                        }
                        break;
                    case "小于200亩":
                        for (var i = 0; i < ClusterData.length; i++) {
                            if (ClusterData[i].attributes[attr] < 200) {
                             
                                if (city == ClusterData[i].attributes["地市名称"]) {
                               
                                    if (ssqy != "") {
                                        if (ssqy == ClusterData[i].attributes["县市区名称"]) {
                                            cdata.push(ClusterData[i]);
                                        }

                                    } else {
                                        cdata.push(ClusterData[i]);
                                    }
                                }
                            }
                        }
                        break;
                }

                    statisticsData.push(cdata);
            }

        }

    }
}



function getClusterData(types, attr) {
    if (ClusterData) {

        showClusterData.length = 0;
        if (attr != "认定面积") {
            for (var k = 0; k < types.length; k++) {
                var cdata = [];
                for (var i = 0; i < ClusterData.length; i++) {
                    if (types[k] == ClusterData[i].attributes[attr]) {
                        if (sssy == ClusterData[i].attributes["地市名称"]) {
                
                            if (ssqy != "") {
                                if (ssqy == ClusterData[i].attributes["县市区名称"]) {
                                    cdata.push(ClusterData[i]);
                                }

                            } else {
                                cdata.push(ClusterData[i]);
                            }
                        }


                    }
                }
                if (cdata.length) {
                    showClusterData.push(cdata);
                }

            }
        } else {
            for (var k = 0; k < types.length; k++) {
                var cdata = [];
                switch (types[k]) {
                    case "大于1000亩":
                        for (var i = 0; i < ClusterData.length; i++) {
                            if (ClusterData[i].attributes[attr] >= 1000) {
                                if (sssy == ClusterData[i].attributes["地市名称"]) {
                               
                                    if (ssqy != "") {
                                        if (ssqy == ClusterData[i].attributes["县市区名称"]) {
                                            cdata.push(ClusterData[i]);
                                        }

                                    } else {
                                        cdata.push(ClusterData[i]);
                                    }
                                }
                      
                            }
                        }

                        break;
                    case "500~1000亩":
                        for (var i = 0; i < ClusterData.length; i++) {
                            if (ClusterData[i].attributes[attr] < 1000 && ClusterData[i].attributes[attr] >= 500) {
                          
                                if (sssy == ClusterData[i].attributes["地市名称"]) {
                           
                                    if (ssqy != "") {
                                        if (ssqy == ClusterData[i].attributes["县市区名称"]) {
                                            cdata.push(ClusterData[i]);
                                        }

                                    } else {
                                        cdata.push(ClusterData[i]);
                                    }
                                }
                            }
                        }
                        break;
                    case "200~500亩":
                        for (var i = 0; i < ClusterData.length; i++) {
                            if (ClusterData[i].attributes[attr] < 500 && ClusterData[i].attributes[attr] >= 200) {
                           
                                if (sssy == ClusterData[i].attributes["地市名称"]) {
                         
                                    if (ssqy != "") {
                                        if (ssqy == ClusterData[i].attributes["县市区名称"]) {
                                            cdata.push(ClusterData[i]);
                                        }

                                    } else {
                                        cdata.push(ClusterData[i]);
                                    }
                                }
                            }
                        }
                        break;
                    case "小于200亩":
                        for (var i = 0; i < ClusterData.length; i++) {
                            if (ClusterData[i].attributes[attr] < 200) {
                             
                                if (sssy == ClusterData[i].attributes["地市名称"]) {
                            
                                    if (ssqy != "") {
                                        if (ssqy == ClusterData[i].attributes["县市区名称"]) {
                                            cdata.push(ClusterData[i]);
                                        }

                                    } else {
                                        cdata.push(ClusterData[i]);
                                    }
                                }
                            }
                        }
                        break;
                }
                if (cdata.length) {
                    showClusterData.push(cdata);
                }
                else {
                    $(".checks span").each(function () {
                        if ($(this).text() == types[k]) {

                        }
                    })


                }
            }

        }

    }
}

function addBorder() {
    $.ajax({
        url: "Json/zhejiang.json",
        dataType: 'json',
        async: false,
        data: {},
        success: function (data) {
            require(["esri/layers/GraphicsLayer", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/symbols/PictureMarkerSymbol", "esri/Color", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/TextSymbol",
              "esri/symbols/Font"], function (GraphicsLayer, Polyline, Polygon, PictureMarkerSymbol, Color, Graphic, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, Font) {
                  borderData = data.features;
                  var borderLayer = new GraphicsLayer({ id: "borderLayer" });
          
 
                  for (var i = 0; i < data.features.length; i++) {
                      var  cityName = data.features[i].properties.name;
                      if (sssy == cityName) {
                          var polylineJson = {
                              "paths": data.features[i].geometry.coordinates,
                              "spatialReference": { "wkid": 4326 }
                          };

                          var polyline = new Polyline(polylineJson);
                          var sls = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 2);
                          var graphic = new Graphic(polyline, sls);
                          borderLayer.add(graphic);
                          map.addLayer(borderLayer);
                          return;

                      }
                  }
              })
        }
    })
}

function addZJBorder() {
    var extent;
    $.ajax({
        url: "Json/china.json",
        dataType: 'json',
        async: false,
        data: {},
        success: function (data) {
            require(["esri/layers/GraphicsLayer", "esri/geometry/Polygon", "esri/symbols/PictureMarkerSymbol", "esri/Color", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol"], function (GraphicsLayer, Polygon, PictureMarkerSymbol, Color, Graphic, SimpleLineSymbol, SimpleFillSymbol) {


                for (var i = 0; i < data.features.length; i++) {
                    if (data.features[i].properties.name == "浙江") {
                        var polygonJson = {
                            "rings": data.features[i].geometry.coordinates,
                            "spatialReference": { "wkid": 4326 }
                        };
                        var polygon = new Polygon(polygonJson);
                        var pu = new Polygon(data.features[i].geometry.coordinates);
                        var attr = {};

                        var RGB_value = parseInt(166 + parseInt(data.features[i].properties.hospital) * ((166 - 255) / 255));
                        var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 0.5), new Color([255, 255, 0, 0.01]));
                        var graphic = new Graphic(polygon, sfs, attr);
                        extent = pu.getExtent();

                        var borderLayer = new GraphicsLayer({ id: "borderLayer" });
                        var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 2), new Color([RGB_value, 0, 0, 0.01]));
                        borderLayer.add(e.graphic.setSymbol(symbol));
                        map.addLayer(borderLayer);
                    }


                }


            })
        }
    })
    return extent;
}

function addZJCityBorder() {
    if (map.getLayer("cityTextLayer")) {

        map.removeLayer(map.getLayer("cityTextLayer"));
    }
   
    $.ajax({
        url: "Json/zhejiang.json",
        dataType: 'json',
        async: false,
        data: {},
        success: function (data) {
            require(["esri/layers/GraphicsLayer", "esri/geometry/Polygon", "esri/symbols/PictureMarkerSymbol", "esri/Color", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/TextSymbol",
              "esri/symbols/Font"], function (GraphicsLayer, Polygon, PictureMarkerSymbol, Color, Graphic, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, Font) {
                  borderData = data.features;

                  var cityTextLayer = new GraphicsLayer({ id: "cityTextLayer" });
                  var html = "<ul class=\"clearfix\">";   
                  for (var i = 0; i < data.features.length; i++) {

                      var polygonJson = {
                          "rings": data.features[i].geometry.coordinates,
                          "spatialReference": { "wkid": 4326 }
                      };
                      var polygon = new Polygon(polygonJson);
                      var pu = new Polygon(data.features[i].geometry.coordinates);
                      var  cityName = data.features[i].properties.name;
                      var  cityNumber = getCityParam(cityName, "地市名称");
   
                      var upperValue = 2000;
                      var lowerValue = 0;
                      var number = Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
                      var attr = { "name": cityName, "number": cityNumber };
                      var RGB_value = 60 + parseInt((cityNumber - lowerValue) * ((255 - 60) / (upperValue - lowerValue)));

                      var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([RGB_value, 255, 0]), 2), new Color([RGB_value, 0, 0, 0.6]));
                      var graphic = new Graphic(polygon, sfs, attr);
                      var extent = pu.getExtent();
                      var point = extent.getCenter();

                      var showLabel = cityName + "  " + cityNumber;
                      html += "<li class=\"clearfix\">"
                            + "<span class='s1 fl sj' >" + cityName + "</span>"
                             + "<p class=\"s2 fr\"><span>" + cityNumber + "</span>个</p>"
                            + "</li>";                    
                      var font = new Font();
                      font.setSize("10pt");
                      font.setFamily("微软雅黑");

                      cityLayer.add(graphic);
                      var label = new TextSymbol(showLabel)
                        .setColor(new Color([255, 255, 255]), 0.5)

                      .setFont(font);
                      cityTextLayer.add(
                        new Graphic(
                          point,
                          label

                        )
                      );

                      map.addLayer(cityTextLayer);


                  }
                  html += "</ul>";
                  $(".tabBox1").html(html);
                  var cityClick = cityLayer.on("click", function (e) {

                      currentGraphic = e.graphic;
                      var ex = currentGraphic.geometry.getExtent();
                      var cp = ex.getCenter();
                      console.log(cp);
                      $(".sel-fun button").text(sssy);
                      $(".sel-fun button").append("<span class=\"caret\"></span>");
                      $("#farmArea").show();
                      $("#cityArea").hide();
                      map.centerAndZoom(cp, downLevel + 1);
               

                  })

              })
        }
    })
}

function addZJCityNumber() {
    if (map.getLayer("cityLayer")) {

   
    }
    if(map.getLayer("cityTextLayer")){
         map.removeLayer(map.getLayer("cityTextLayer"))
    }
        
    getTotalNumber();
    $.ajax({
        url: "Json/zhejiang.json",
        dataType: 'json',
        async: false,
        data: {},
        success: function (data) {
            require(["esri/layers/GraphicsLayer", "esri/geometry/Polygon", "esri/symbols/PictureMarkerSymbol", "esri/Color", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/TextSymbol",
              "esri/symbols/Font"], function (GraphicsLayer, Polygon, PictureMarkerSymbol, Color, Graphic, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, Font) {
                  borderData = data.features;

                  var cityTextLayer = new GraphicsLayer({ id: "cityTextLayer" });
                  var html = "<ul class=\"clearfix\">";
                  for (var i = 0; i < data.features.length; i++) {
                      var polygonJson = {
                          "rings": data.features[i].geometry.coordinates,
                          "spatialReference": { "wkid": 4326 }
                      };
                      var polygon = new Polygon(polygonJson);
                      var pu = new Polygon(data.features[i].geometry.coordinates);
                      var  cityName = data.features[i].properties.name;
                      var  cityNumber = getCityParam(cityName,"地市名称");

                      var upperValue = 2000;
                      var lowerValue = 0;
                      var number = Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
                      var attr = { "name": cityName, "number": cityNumber };
                      var RGB_value = 60 + parseInt((cityNumber - lowerValue) * ((255 - 60) / (upperValue - lowerValue)));
                   
                      var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 2), new Color([255, 0, 0, 0.01]));
                      var graphic = new Graphic(polygon, sfs, attr);
                      cityLayer.add(graphic);
                      var extent = pu.getExtent();
                      var point = extent.getCenter();
                
                      var showLabel = cityName + "    " + cityNumber;
                      html += "<li class=\"clearfix\">"
                          + "<span class='s1 fl sj' >" + cityName + "</span>"
                           + "<p class=\"s2 fr\"><span>" + cityNumber + "</span>个</p>"
                          + "</li>";
                      var font = new Font();
                      font.setSize("10pt");
                      font.setFamily("微软雅黑");
       
                      if (ifIE() == "ie8") {
                          var screenP = map.toScreen(point);
           
                          var text = $("<span class='labelNumber'>" + showLabel + "</span>").css({ "position": "absolute", "left": screenP.x - 40, "top": screenP.y - 15, "width": "100px", "height": "30px", "color": "#fff", "z-index": "9" }).appendTo($("body"));
                      }
                    
                   
                      total += cityNumber; 
                      var defaultSymbol = new PictureMarkerSymbol("./images/bluetips.png", 120, 40).setOffset(0, 0);
                      cityTextLayer.add(
                        new Graphic(
                          point,
                          defaultSymbol,
                          attr
                        )
                      );

                      var label = new TextSymbol(showLabel)
                        .setColor(new Color([255, 255, 255]), 0.5)
                      .setFont(font);
                      cityTextLayer.add(
                        new Graphic(
                          point,
                          label,
                          attr
                        )
                      );
               
                  }
      
                  map.addLayer(cityTextLayer);
                  html += "</ul>";
                  $(".tabBox1").html(html);
                  console.log(total);
                  if(gnType!=="储备项目"){
                      $("#total").text(total);
                  }
                  
                  total = 0;
                  var cityClick = cityLayer.on("click", function (e) {
                    
                      currentGraphic = e.graphic;
                      var ex = currentGraphic.geometry.getExtent();
                      var cp = ex.getCenter();
                      console.log(cp);
                      $(".sel-fun button").text(sssy);
                      $(".sel-fun button").append("<span class=\"caret\"></span>");
                      $("#farmArea").show();
                      $("#cityArea").hide();
                      map.centerAndZoom(cp, downLevel + 1);
                      

                  })
                  var cityTextClick = cityTextLayer.on("mouse-over", function (e) {
               
                      currentGraphic = e.graphic;
                      var screenP = map.toScreen(e.graphic.geometry);
                      $("#typeinfo").html("");
                      getTypeNumber(e.graphic.attributes["name"], "地市名称",e.graphic.attributes["name"]);
                      var html = ""
                      for (var  i = 0; i < typeNumber.length; i++) {
                          html += "<span>" + typeNumber[i].name + ":" + typeNumber[i].number + "</span></br>"
                      }
                      $("#typeinfo").append(html);
                      $("#typeinfo").css("left", screenP.x);
                      $("#typeinfo").css("top", screenP.y + 10);
                      if (html) {
                          $("#typeinfo").show();
                      }
                      
                      map.setMapCursor("pointer");
                  })
                  var cityTextClick = cityTextLayer.on("mouse-out", function (e) {
                   
                      $("#typeinfo").hide();
                      map.setMapCursor("default");


                  })

              })
        }

    })
}

function getTotalNumber() {
    var  tNumber = 0;
    total = 0;
    console.log(gnType);
    if (sssy == "浙江省" && gnType == "储备项目") {
        for (var i = 0; i < ClusterData.length; i++) {
            var  value = ClusterData[i].attributes[currentattr];
            if (clusterType.contains(value)) {
                tNumber++;
            }
        }
        total = tNumber;
        $("#total").text(total);
    }
}

function getCityStaticNumber() {
    if (map.getLayer("cityTextLayer")) {

        map.removeLayer(map.getLayer("cityTextLayer"));
    }
    $.ajax({
        url: "Json/zhejiang.json",
        dataType: 'json',
        async: false,
        data: {},
        success: function (data) {
            require(["esri/layers/GraphicsLayer", "esri/geometry/Polygon", "esri/symbols/PictureMarkerSymbol", "esri/Color", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/TextSymbol",
              "esri/symbols/Font"], function (GraphicsLayer, Polygon, PictureMarkerSymbol, Color, Graphic, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, Font) {
                  borderData = data.features;
             
                  var cityTextLayer = new GraphicsLayer({ id: "cityTextLayer" });
           
                  for (var i = 0; i < data.features.length; i++) {
                      if (data.features[i].properties.name == sssy) {
                          var polygonJson = {
                              "rings": data.features[i].geometry.coordinates,
                              "spatialReference": { "wkid": 4326 }
                          };
                          var polygon = new Polygon(polygonJson);
                          var pu = new Polygon(data.features[i].geometry.coordinates);
                          var  cityName = data.features[i].properties.name;
                          var  cityNumber = getCityParam(cityName,"地市名称");
                       
                          var upperValue = 2000;
                          var lowerValue = 0;
                          var number = Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
                          var attr = { "name": cityName, "number": cityNumber };
                          var RGB_value = 60 + parseInt((cityNumber - lowerValue) * ((255 - 60) / (upperValue - lowerValue)));
                      
                          var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 2), new Color([255, 0, 0, 0.01]));
                          var graphic = new Graphic(polygon, sfs, attr);

                          var extent = pu.getExtent();
                          var point = extent.getCenter();
                          var showLabel = cityName + "：" + cityNumber;
                          var font = new Font();
                          font.setSize("10pt");
                          font.setFamily("微软雅黑");
           
                          cityLayer.add(graphic);
                          var defaultSymbol = new PictureMarkerSymbol("./images/bluetips.png", 120, 40).setOffset(0, 0);
                          cityTextLayer.add(
                            new Graphic(
                              point,
                              defaultSymbol,
                              attr
                            )
                          );

                          var label = new TextSymbol(showLabel)
                            .setColor(new Color([255, 255, 255]), 0.5)
                          .setFont(font);
                          cityTextLayer.add(
                            new Graphic(
                              point,
                              label,
                              attr
                            )
                          );

                          map.addLayer(cityTextLayer);
                          break;

                      }
                  }
                  var cityClick = cityLayer.on("click", function (e) {

                      currentGraphic = e.graphic;

                      var ex = currentGraphic.geometry.getExtent();
                      var cp = ex.getCenter();
                      console.log(cp);
                      $(".sel-fun button").text(sssy);
                      $(".sel-fun button").append("<span class=\"caret\"></span>");
                      $("#farmArea").show();
                      $("#cityArea").hide();
                      map.centerAndZoom(cp, downLevel + 1);
                  })
                  var cityTextClick = cityTextLayer.on("mouse-over", function (e) {
         
                      currentGraphic = e.graphic;
                      var screenP = map.toScreen(e.graphic.geometry);
                      $("#typeinfo").html("");
                      getTypeNumber(e.graphic.attributes["name"], "地市名称", e.graphic.attributes["name"]);
                      var html = ""
                      for (var  i = 0; i < typeNumber.length; i++) {
                          html += "<span>" + typeNumber[i].name + ":" + typeNumber[i].number + "</span></br>";
                      }
                      $("#typeinfo").append(html);
                      $("#typeinfo").css("left", screenP.x);
                      $("#typeinfo").css("top", screenP.y);
                      if (html) {
                          $("#typeinfo").show();
                      }
                      

                      map.setMapCursor("pointer");
                  })
                  var cityTextClick = cityTextLayer.on("mouse-out", function (e) {
  
                      $("#typeinfo").hide();
                      map.setMapCursor("default");


                  })

              })
        }
    })
}

function getSearchSql(sValue) {
    var  sSql = "";
    var noinput ;
    if (sssy == "浙江省") {
        noinput = getSearchsql(layerDType, currentattr);
    } else {
        noinput = getSearchsql(layerDType, currentattr);
    }
    sSql = noinput + " and " + searchField + " like  '%" + sValue + "%'";
    console.log(sSql);
    return sSql;
}
function getSearchsql(layerDType, attrName) {
    var  sql = "";
    if (layerDType[0] != "建设分布图") {
        if (attrName != "认定面积") {
            sql = attrName + " in (" + layerDType.toString() + ")";
        } else {
            sql = getAreaSql(clusterType);
        }
    } else {
        if (gnType != "标准农田建设区") {
            sql = "1=2";

        } else {
            sql = " ";
        }


    }
    return sql;
}
function getLayerDefine(layerDType, attrName) {
    var  sql = "";
    if (layerDType[0] != "建设分布图") {
        if (attrName != "认定面积") {
            sql = "地市名称='" + sssy + "' and " + attrName + " in (" + layerDType.toString() + ")";
            if (ssqy != "") {
                sql = "县市区名称='" + ssqy + "' and " + attrName + " in (" + layerDType.toString() + ")";
            }
        } else {
            var asql = getAreaSql(clusterType);

            sql = "地市名称='" + sssy + "' and " + asql;
            if (ssqy != "") {
                sql = "县市区名称='" + ssqy + "' and " + asql;
            }
        }
    } else {
        if (gnType != "标准农田建设区") {
            sql = "地市名称='" + sssy + "' and 1=2";
            if (ssqy != "") {
                sql = "县市区名称='" + ssqy + "' and 1=2";
            }
        } else {
            sql = "地市名称='" + sssy + "'";
            if (ssqy != "") {
                sql = "县市区名称='" + ssqy + "'";
            }
        }


    }
    return sql;
}
function getAreaSql(types) {
    areasql.length = 0;
    for (var k = 0; k < types.length; k++) {
        var cdata = [];
        switch (types[k]) {
            case "大于1000亩":
                areasql.push("(认定面积>1000)");
                break;
            case "500~1000亩":
                areasql.push("(认定面积>500 and 认定面积<=1000)");
                break;
            case "200~500亩":
                areasql.push("(认定面积>200 and 认定面积<=500)");
                break;
            case "小于200亩":
                areasql.push("(认定面积<200)");
                break;
        }
    }
    var sql = "(";

    for (var i = 0; i < areasql.length; i++) {

        if (i == areasql.length - 1) {
            sql += areasql[i];
        } else {
            sql += areasql[i] + " or ";
        }
    }
    return sql + ")";
}
function addMultiClusters(multiData) {
    require(["dojo/parser",
          "dojo/ready",
          "dojo/_base/array",
          "esri/Color",
          "dojo/query",
          "esri/layers/ImageParameters",
          "esri/map",
          "esri/request",
          "esri/graphic",
          "esri/geometry/Extent",

          "esri/symbols/SimpleMarkerSymbol",
          "esri/symbols/SimpleFillSymbol",
          "esri/symbols/PictureMarkerSymbol",
          "esri/renderers/ClassBreaksRenderer",

          "esri/layers/GraphicsLayer",
          "esri/SpatialReference",
          "esri/InfoTemplate",
          "esri/dijit/PopupTemplate",
          "esri/geometry/Point",
          "esri/geometry/webMercatorUtils",
          "esri/layers/ArcGISDynamicMapServiceLayer",
          "extras/ClusterLayer_M",
          "dojo/on",     
          "dijit/layout/BorderContainer",
          "dijit/layout/ContentPane",
          "dojo/domReady!"], function (parser, ready, arrayUtils, Color, query, ImageParameters,
          Map, esriRequest, Graphic, Extent,
          SimpleMarkerSymbol, SimpleFillSymbol, PictureMarkerSymbol, ClassBreaksRenderer,
          GraphicsLayer, SpatialReference, InfoTemplate, PopupTemplate, Point, webMercatorUtils, ArcGISDynamicMapServiceLayer, ClusterLayer_M, on) {
              if (map.getLayer("clusters")) {
                  map.removeLayer(map.getLayer("clusters"));
              }
              var point_array = [];
              var wgs = new esri.SpatialReference({
                  "wkid": 4326
              });
              var attributes = "";
              for (var k = 0; k < multiData.length; k++) {
                  var photoInfo = {};
                  var type = clusterType[k];

                  photoInfo.data = arrayUtils.map(multiData[k], function (p, i) {
                      var latlng = new Point(parseFloat(p.geometry.x), parseFloat(p.geometry.y), wgs);
  
                      var webMercator;
                      if (parseFloat(latlng.x) > 1000) {
                          webMercator = latlng;
                      } else {
                          webMercator = webMercatorUtils.geographicToWebMercator(latlng);
                      }
                      var attributes1 = {
                          "Name": p.name,
                          "Type": type,
                          "imgurl": clusterImg[k],

                      };
                      var attrbutes2 = p.attributes;
                      attributes = $.extend({}, attributes1, attrbutes2);
                      return {

                          "x": webMercator.x,
                          "y": webMercator.y,

                          "attributes": attributes



                      };
                  });
                  point_array.push(photoInfo.data);
              }

              var fieldInfos2 = [];
              for (var key in attributes) {
                  var s_key = key.toLowerCase();
                  var Regx = /^[A-Za-z]*$/;
                  if (s_key.indexOf("shape") > -1 || s_key.indexOf("object") > -1 || Regx.test(key)) {
                      continue;
                  }
                  else {
                      var field = {
                          "fieldName": key,
                          "label": key,
                          visible: true
                      };
                      fieldInfos2.push(field);
                  }
              }


              var popupTemplate = new PopupTemplate({
                  "title": "属性信息",
                  "content": "聚集点信息",
                  "fieldInfos": fieldInfos
       
              });

   
              clusterLayer = new ClusterLayer_M({

                  "data": point_array,
                  "distance": 100,
                  "id": "clusters",
                  "labelColor": textColor,
                  "labelOffset": 10,
                  "showSingles": true,
                  "symbols": clusterType,

                  "singleColor": "#888",

                  "singvar emplate": popupTemplate,
                  "maxSingles": 5000
              });
              var defaultSym = new SimpleMarkerSymbol().setSize(4);
              var renderer = new ClassBreaksRenderer(defaultSym, "clusterCount");


              map.addLayer(clusterLayer);


          })

}

