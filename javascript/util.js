/**
 * Utility helper functions
 *
 * Noah Roberts
*/

// create a text svg element
function genSnapText(s, text, x, y, theta) {
  let snapText = s.text(x, y, text);
  snapText.transform("rotate(" + -theta + ", " + x + ", " + y + ")");

  return snapText;

  // let svgText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  //
  // setAttributes(svgText, {"x": x.toString(), "y": y.toString(), "dx": dx.toString(),
  //   "dy": dy.toString(), "transform":"rotate(" + -theta + ", " + x + ", " + y + ")"});
  // svgText.innerHTML = text;
  //
  // return svgText;
}

// set multiple attributes concisely
function setAttributes(el, attrs) {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

// wait a certain period of time
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
