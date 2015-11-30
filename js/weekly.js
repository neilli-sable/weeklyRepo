var weekly = (function() {
  'use strict';

  var initModule = function($container) {
    weekly.graphManager.initModule();
    weekly.graphManager.paintGraph("#graph-plan", graphPlan);
    weekly.domManager.setDateSelector();
  };

  var reloadGraph = function (graphId, graphObj, prefix) {
    graphObj = weekly.graphManager.setDataObject(prefix);
    weekly.graphManager.removeGraph(prefix);
    weekly.graphManager.paintGraph(graphId, graphObj);
  };

  return {
    initModule: initModule,
    reloadGraph: reloadGraph
  };
}());
