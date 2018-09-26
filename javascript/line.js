/**
 * LineCluster class file for noah-roberts.com
 * Inspired by Sol Lewitt - Wall Drawing 273
 *
 * Noah Roberts
*/

const LINE_CLASS = {
  RED: "redLine",
  BLUE: "blueLine",
  YELLOW: "yellowLine"
};

class LineCluster {

  constructor(cx, cy, rad1, rad2, baseLen, numLines, lineClass) {
    this.cx = cx;
    this.cy = cy;
    this.rad1 = rad1;
    this.rad2 = rad2;
    this.baseLen = baseLen;
    this.numLines = numLines;
    this.lineClass = lineClass;
    this.dTheta = Math.abs(rad2 - rad1) / numLines;
  }

  genSvgLines() {
    let lines = [];

    for (let theta = this.rad1; lines.length <= this.numLines; theta = (theta + this.dTheta) % (2 * Math.PI)) {
      lines.push(genSvgLine(this.cx, this.cy, this.cx + this.baseLen * Math.cos(theta),
        this.cy - this.baseLen * Math.sin(theta), this.lineClass));
        console.log("" + theta);
    }

    return lines;
  }

}

function genSvgLine(x1, y1, x2, y2, lineClass=LINE_CLASS.RED) {
  let svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');

  setAttributes(svgLine, {"x1": x1.toString(), "y1": y1.toString(),
  "x2": x2.toString(), "y2": y2.toString(), "class": lineClass});

  return svgLine;
}

function setAttributes(el, attrs) {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
