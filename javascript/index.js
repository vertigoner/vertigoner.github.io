/**
 * Main javascript file for noah-roberts.com
 * InsPIred by Sol Lewitt - Wall Drawing 273
 *
 * Noah Roberts
*/

const PI = Math.PI;
const MARGIN = 20;
const W = (window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth) - MARGIN;
const H = (window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight) - MARGIN;

const pageLinks = {
  "Inspired by Sol Lewitt - Wall Drawing 273": "url",
  "Noah Roberts": "url",
  "About Me": "url",
  "Projects": "url"
}

let horzBaseLen = Math.max(W, H) / 3;
let vertBaseLen = Math.max(W, H) / 3;
let cornerBaseLen = Math.max(W, H) / 3;
let numLines = 10;
let textOffsetX = 0;
let textOffsetY = 0;
let cluster = {
  left: new LineCluster(1, H / 2, 3 * PI / 2, PI / 2, horzBaseLen, numLines, LINE_CLASS.RED),
  mid1: new LineCluster(W / 2, H / 2, 0, PI, horzBaseLen, numLines, LINE_CLASS.YELLOW),
  mid2: new LineCluster(W / 2, H / 2, PI, 2 * PI, horzBaseLen, numLines, LINE_CLASS.YELLOW),
  right: new LineCluster(W - 1, H / 2, PI / 2, 3 * PI / 2, horzBaseLen, numLines, LINE_CLASS.RED),
  top: new LineCluster(W / 2, 1, PI, 2 * PI, vertBaseLen, numLines, LINE_CLASS.RED),
  bot: new LineCluster(W / 2, H - 1, 0, PI, vertBaseLen, numLines, LINE_CLASS.RED),
  topLeft: new LineCluster(1, 1, 3 * PI / 2, 2 * PI, cornerBaseLen, numLines, LINE_CLASS.BLUE),
  topRight: new LineCluster(W - 1, 1, PI, 3 * PI / 2, cornerBaseLen, numLines, LINE_CLASS.BLUE),
  botLeft: new LineCluster(1, H - 1, 0, PI / 2, cornerBaseLen, numLines, LINE_CLASS.BLUE),
  botRight: new LineCluster(W - 1, H - 1, PI / 2, PI, cornerBaseLen, numLines, LINE_CLASS.BLUE)
};

initSVG(document.getElementById('mainSVG'));

document.getElementById("mid1").addEventListener("click", showMenu);
document.getElementById("mid2").addEventListener("click", showMenu);

function initSVG(svg) {
  svg.setAttribute("width", W);
  svg.setAttribute("height", H);

  for (let key of Object.keys(cluster)) {
    let clusterGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    clusterGroup.setAttribute("class", "cluster");
    clusterGroup.setAttribute("id", key);

    for (let line of cluster[key].genSvgLines()) {
      clusterGroup.appendChild(line);
    }

    svg.getElementById("lines").appendChild(clusterGroup);
  }
}

function showMenu() {
  document.getElementById("overlay").style.display = "block";
}

function hideMenu() {
  document.getElementById("overlay").style.display = "none";
}
