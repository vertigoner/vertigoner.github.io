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


let horzBaseLen = Math.max(W, H) / 3;
let vertBaseLen = Math.max(W, H) / 3;
let cornerBaseLen = Math.max(W, H) / 3;
let numLines = 10;
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

const COLORS = ["#fc514b", "#ffdc00", "#504af9"];
let pickRandColor = function() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}
let name = {
  n: new AnimatedText("N", W / 3, H / 3, W / 4, H / 10, Math.random() * 360, pickRandColor()),
  o: new AnimatedText("O", 2 * W / 3, H / 3, W / 4, H / 10, Math.random() * 360, pickRandColor()),
  a: new AnimatedText("A", W / 3, 2 * H / 3, W / 4, H / 10, Math.random() * 360, pickRandColor()),
  h: new AnimatedText("H", 2 * W / 3, 2 * H / 3, W / 4, H / 10, Math.random() * 360, pickRandColor())
};

let svg = document.getElementById('mainSVG');
svg.setAttribute("width", W);
svg.setAttribute("height", H);

initHome(Snap(svg));

document.getElementById("name").addEventListener("click", showMenu);

function initHome(s) {

  // name
  let nameGroup = s.g();
  nameGroup.node.id = "name";
  for (let key of Object.keys(name)) {
    nameGroup.add(name[key].generate(s));
  }

  // lines
  for (let key of Object.keys(cluster)) {
    let clusterGroup = s.g().attr({class: "cluster"});
    clusterGroup.node.id = key; // for some reason snap.svg doesn't let you set id easily

    clusterGroup.add(cluster[key].generate(s));
  }
}

async function showMenu() {
  // letter animation
  let tTotal = 750; // ms
  let dT = 10; // ms
  let dThetas = [];
  let nameKeys = Object.keys(name);
  for (let key of nameKeys) {
    dThetas.push(-1 * name[key].theta / (tTotal / dT));
  }

  let endCond = false;
  let tElapsed = 0;
  do {
    for (let i = 0; i < nameKeys.length; i++) {
      let letter = name[nameKeys[i]];
      letter.theta += dThetas[i];
      letter.snapText.transform("rotate(" + letter.theta + ", " + letter.x + ", " + letter.y + ")");
      endCond = letter.theta == 0;
    }
    await sleep(dT);
    tElapsed += dT;
  } while (!endCond && tElapsed < tTotal);

  name.n.snapText.animate({})

  // show overlay
  document.getElementById("overlay").style.display = "block";
}

function hideMenu() {
  document.getElementById("overlay").style.display = "none";
}
