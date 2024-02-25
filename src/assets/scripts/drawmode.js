let cnv;
const history = [];
let i = 0;
let d = 0;
let drawIt = false;
let drawable = false;
function drawSwitch() {
  var x = document.getElementById("sketchHolder");
  if (d == 0) {
    x.style.display = "block";
    d = 1;
    document.getElementById("drawCheck").style["background"] = "black";
    drawIt = true;
  } else if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById("drawCheck").style["background"] = "black";
    drawIt = true;
  } else {
    x.style.display = "none";
    document.getElementById("drawCheck").style["background"] = "none";
    drawIt = false;
  }
}
function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('sketchHolder');
    // noLoop();
    stroke("black");
    strokeWeight(50);
    noFill();
  }
function draw() {
  if (drawIt == true) {
    if (mouseIsPressed === true) {
        i++;
        if (i % 5 == 0) {
          clear();
          history.push({x: mouseX, y: mouseY});
          // history.forEach(({x, y}) => ellipse(x, y, 5, 5));
          if (history.length < 2) {
            return;
          }
        }
      }
  }
  if (drawable == true) {
    beginShape();
    vertex(history[0].x, history[0].y);
    for (let i = 1; i < history.length - 2; i++) {
      const xc = (history[i].x + history[i + 1].x) / 2;
      const yc = (history[i].y + history[i + 1].y) / 2;
      quadraticVertex(history[i].x, history[i].y, xc, yc);
    }
    quadraticVertex(
      history.at(-2).x,
      history.at(-2).y,
      history.at(-1).x,
      history.at(-1).y
    );
    endShape();
  }
}

function mouseReleased() {
  if (drawIt == true) {
    drawable = true;
  }
}

// if mouse is over drawmode button don't add to history
// make a new history for each separate click, and a respective shape for each