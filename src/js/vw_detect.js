/**
 * only for mobile
 * 不支持vw时，降级使用js,依据fontSize大小与预期vw大小不一致来判断
 */
(function() {
  function computedStyle(elem, pseudo, prop) {
    var result;
    if ("getComputedStyle" in window) {
      result = getComputedStyle.call(window, elem, pseudo);
      var console = window.console;
      if (result !== null) {
        if (prop) {
          result = result.getPropertyValue(prop);
        }
      } else {
        if (console) {
          var method = console.error ? "error" : "log";
          console[method].call(
            console,
            "getComputedStyle returning null, its possible modernizr test results are inaccurate"
          );
        }
      }
    } else {
      result = !pseudo && elem.currentStyle && elem.currentStyle[prop];
    }
    return result;
  }

  var div = document.createElement("div");
  div.id = "detect";

  var style = document.createElement("style");
  style.type = "text/css";

  var rule = "#detect{width:50vw}";
  if (style.styleSheet) {
    style.styleSheet.cssText = rule;
  } else {
    style.appendChild(document.createTextNode(rule));
  }

  div.appendChild(style);
  var body = document.body;
  if(!body){
    body = document.createElement('body');
    body.ishack = true;
  }
  body.appendChild(div);
  document.documentElement.appendChild(body);

  var width = parseInt(window.innerWidth / 2, 10);
  var compStyle = parseInt(computedStyle(div, null, "width"), 10);
  if (compStyle != width) {
    var script = document.createElement("script");
    script.src = "./js/flexible.min.js";
    document.querySelector("head").appendChild(script);
  }
  body.removeChild(div);
  body.ishack && document.documentElement.removeChild(body);
})();
