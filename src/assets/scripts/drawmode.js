let cnv;
let history = [];
let history2;
let i= 0;
let inc = 0;
let d = 0;
let drawIt = false;
let drawable = false;
let breakDist = 0;
let lines = [];
let qv1;
let qv2;
let qv3;
let qv4;
const thefooter = document.getElementById("tf");
var infooter = false;
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
    history = [];
    clear();
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
    if (infooter === false && mouseIsPressed === true) {
        i++;
        if (i % 5 == 0) {
          history.push({x: mouseX, y: mouseY});
          if (history.length <= 2) {
            return;
          }
        }
        if (history.length > 2) {
          strokeWeight(50);
          stroke(0);
          noFill();
          beginShape();
          vertex(history[0].x, history[0].y);
          for (let i = 1; i < history.length - 2; i++) {
            const xc = (history[i].x + history[i + 1].x) / 2;
            const yc = (history[i].y + history[i + 1].y) / 2;
            quadraticVertex(history[i].x, history[i].y, xc, yc);
          }
          endShape();
        }
    }
  }
}
function mousePressed() {
  history2 = history.length;
}
function mouseReleased() {
  if (drawIt == true) {
    drawable = true;
    if (infooter == false) {
      if (history.length <= 2) {
        i++;
        history.push({x: mouseX, y: mouseY});
        noStroke();
        fill(0);
        ellipse(mouseX, mouseY, 50);
        return;
      }
      if (Math.abs((history2 - history.length)) < 4) {
        fill(0);
        noStroke();
        ellipse(mouseX, mouseY, 50);
        noFill();
        strokeWeight(50);
      }
    } 
    history.push({x: "break", y: "break"});
    for (var i = 0; i < history.length - 1; i++) {
      if (history[i].x = "break") {
      }
    }
  }
}
thefooter.addEventListener("mouseenter", (e) => {
  infooter = true
});

thefooter.addEventListener("mouseleave", (e) => {
  infooter = false;
});