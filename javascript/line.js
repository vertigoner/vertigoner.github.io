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
    this.dTheta = (Math.abs(rad2 - rad1) - (Math.abs(rad2 - rad1) / numLines)) / numLines;
    this.textDims = [];
  }

  genSvgLines() {
    let lines = [];
    let thetaI = this.rad1 + this.dTheta / 2;

    for (let theta = thetaI; lines.length <= this.numLines; theta = (theta + this.dTheta) % (2 * Math.PI)) {
      let randTheta = theta + Math.random() * (this.dTheta * this.numLines / 10) - (this.dTheta * this.numLines / 20);
      let randLen = this.baseLen * (Math.random() + 0.5);
      let x = this.cx + randLen * Math.cos(randTheta);
      let y = this.cy - randLen * Math.sin(randTheta);
      lines.push(genSvgLine(this.cx, this.cy, x, y, this.lineClass));

      if (lines.length % Math.floor(this.numLines / 3) == 0) {
        this.storeTextDims(theta, randLen);
      }
    }

    return lines;
  }

  storeTextDims(thetaVal, dVal) {
      this.textDims.push({theta: thetaVal, d: dVal});
  }
}

function genSvgLine(x1, y1, x2, y2, lineClass=LINE_CLASS.RED) {
  let svgLine = document.createElementNS("http://www.w3.org/2000/svg", "line");

  setAttributes(svgLine, {"x1": x1.toString(), "y1": y1.toString(),
  "x2": x2.toString(), "y2": y2.toString(), "class": lineClass});

  return svgLine;
}

function genSvgText(text, x, y, dx, dy, theta) {
  let svgText = document.createElementNS("http://www.w3.org/2000/svg", "text");

  setAttributes(svgText, {"x": x.toString(), "y": y.toString(), "dx": dx.toString(),
    "dy": dy.toString(), "transform":"rotate(" + theta + ")"});
  svgText.innerHTML = text;

  return svgText;
}

function setAttributes(el, attrs) {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
