/**
 * グラフ描画管理モジュール
*/
weekly.graphManager = (function() {
  'use strict';

  /**
   * メンバー変数
  */
  var svg, x, xAxis;

  /**
   * モジュールの初期化
   * param グラフ位置
  */
  var initModule = function() {

    // x軸に関するスケール・軸は固定なので、ここで処理する
    x = d3.scale.linear()
          .range([0, width]);
    x.domain([0, 6]);

    xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom")
              .ticks(6)
              .tickFormat(weekly.axisUtils.getDate);
  };

  /**
   * グラフ描画
   * graphPos String グラフ位置
   * graphObj Objグラフデータオブジェクト
  */
  var paintGraph = function(graphId, graphObj) {
    if (graphObj.length === 0) return;

    var height = 60 * graphObj.length - margin.top - margin.bottom + 40;

    var y = d3.scale.ordinal()
       .rangeRoundBands([0, height], 0.2);
    y.domain(graphObj.map(function(d) { return d.name; }));
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    svg = d3.select(graphId).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.selectAll(".bar")
        .data(graphObj, name)
        .enter().append("rect")
        .attr("class", function(d) { return d.start < 0 ? "bar negative" : "bar positive"; })
        .attr("x", function(d) { return x(Math.min(d.start)); })
        .attr("y", function(d) { return y(d.name); })
        .attr("width", function(d) { return Math.abs(x(d.end) - x(d.start)); })
        .attr("height", y.rangeBand());

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height) + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("line")
        .attr("x1", x(0))
        .attr("x2", x(0))
        .attr("y2", height);
   };

   /**
    * グラフ描画の除去
  */
  var removeGraph = function(prefix) {
    d3.select('#graph-' + prefix + ' svg').remove("g");
  };

  /**
   * グラフデータオブジェクトを更新
   * param グラフ位置
   * param 対象のオブジェクト
  */
  var setDataObject = function(prefix) {
    var graphObj = [];
    var rows = document.getElementsByClassName('row-' + prefix);
    for (var i = 0; i < rows.length; i++) {
      graphObj[i] = {
        name: document.getElementById('projectName' + i + '-' + prefix).value,
        start: +document.getElementById('projectStart' + i + '-' + prefix).value,
        end: +document.getElementById("projectEnd" + i + '-' + prefix).value
      };
    }
    return graphObj;
  };

  return {
    initModule: initModule,
    setDataObject: setDataObject,
    paintGraph: paintGraph,
    removeGraph: removeGraph,
  };

}());
