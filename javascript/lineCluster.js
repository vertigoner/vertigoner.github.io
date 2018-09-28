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
    this.lines = [];
  }

  generate(s) { // takes snap object as parameter
    let thetaI = this.rad1 + this.dTheta / 2;

    for (let theta = thetaI; this.lines.length <= this.numLines; theta = (theta + this.dTheta) % (2 * Math.PI)) {
      let randTheta = theta + Math.random() * (this.dTheta * this.numLines / 10) - (this.dTheta * this.numLines / 20);
      let randLen = this.baseLen * (Math.random() + 0.5);
      let x = this.cx + randLen * Math.cos(randTheta);
      let y = this.cy - randLen * Math.sin(randTheta);
      let newLine = s.line(this.cx, this.cy, x, y).attr({class: this.lineClass});
      this.lines.push(newLine);
    }

    return this.lines;
  }
}
