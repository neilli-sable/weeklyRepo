/**
 * DOMの操作モジュール
*/
var domManager = (function() {
  /**
   * 新しい入力行を追加する
  */
  var addNewInputLine = function(prefix) {
    rowCount = document.getElementsByClassName('row-' + prefix).length;

    var form = document.getElementById('form-' + prefix);
    var ele = document.createElement('div');
    ele.setAttribute("class", "row-" + prefix);
    ele.innerHTML = '<input type="text" id="projectName' + rowCount + '-' + prefix +'" placeholder="例: ○○プロジェクト"> <select id="projectStart' + rowCount +'-' + prefix + '" class="dateSelector"></select> <select id="projectEnd' + rowCount + '-' + prefix + '" class="dateSelector"></select> <input type="number" id="projectDelay' + rowCount + '-' + prefix + '" class="projectDelay" min="0" max="99" value="0">時間の遅れ';
    form.appendChild(ele);
    setDateSelector();
  };

  /**
   * .dateSelectorのoptionを挿入する。
   * 新しく行を追加するたび、全てのselectorに再挿入するので効率悪い。
   * 気になったら書き直す。
  */
  var setDateSelector = function() {
    var selectors = document.getElementsByClassName('dateSelector');
    for (var i = 0; i < selectors.length; i++) {
      selectors[i].innerHTML = '<option value="0">月</option><option value="1">火</option><option value="2">水</option><option value="3">木</option><option value="4">金</option><option value="5">土</option><option value="6">日</option>';
    }
  };

  return {
    addNewInputLine: addNewInputLine,
    setDateSelector: setDateSelector
  };
}());
