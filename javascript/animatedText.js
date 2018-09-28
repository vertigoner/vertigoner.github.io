/**
 * LineCluster class file for noah-roberts.com
 * Inspired by Sol Lewitt - Wall Drawing 273
 *
 * Noah Roberts
*/

class AnimatedText {

  constructor(text, xi, yi, xf, yf, theta, fill) {
    this.text = text;
    this.xi = xi;
    this.yi = yi;
    this.xf = xf;
    this.yf = yf;
    this.theta = theta;
    this.fill = fill;
    this.x = xi;
    this.y = yi;
  }

  generate(s) { // takes snap object as parameter
    let text = genSnapText(s, this.text, this.x, this.y, this.theta);
    text.node.setAttribute("class", "nameLetter");
    text.node.style.fill = this.fill;

    return text;
  }
}
