initSVG(document.getElementById('mainSVG'));

function initSVG(svg) {
  let w = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

  let h = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

  svg.setAttribute("width", w);
  svg.setAttribute("height", h);

  let line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  setAttributes(line1, {"x1":"0", "y1":(h / 2).toString(),
  "x2":(w / 3).toString(), "y2":(h / 2).toString(), "class":"leftLine"});
  svg.appendChild(line1);
}

function setAttributes(el, attrs) {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
