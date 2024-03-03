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
          // if (history.length > 2) {clear()};
          history.push({x: mouseX, y: mouseY});
          if (history.length <= 2) {
            return;
          }
        }
    }
  }
  if (drawable == true) {
    if (history.length > 2) {
      strokeWeight(50);
      stroke(0);
      noFill();


    // split the array at each break then do a shape for each!!!!

      beginShape();
      vertex(history[0].x, history[0].y);
      for (let i = 1; i < history.length - 2; i++) {
        const xc = (history[i].x + history[i + 1].x) / 2;
        const yc = (history[i].y + history[i + 1].y) / 2;
        quadraticVertex(history[i].x, history[i].y, xc, yc);
      }
      endShape();

    // this stuff can come back without the variables if separating into separate lines doesn't work out
      // beginShape();
      // if (history.at(-1).x != "break") {
      //   qv3 = history.at(-1).x
      //   qv4 = history.at(-1).y
      // } else if (history.at(-1).x == "break") {
      //   if (history.at(-3).x != "break") {
      //     qv1 = history.at(-3).x
      //     qv2 = history.at(-3).y
      //   } else if (history.at(-3).x == "break") {
      //     qv1 = history.at(-3).x
      //     qv2 = history.at(-3).y
      //   }
      //     qv3 = history.at(-2).x
      //     qv4 = history.at(-2).y
      // }
      // quadraticVertex(
      //   // history.at(-2).x,
      //   // history.at(-2).y,
      //   // history.at(-1).x,
      //   // history.at(-1).y
      //   qv1,
      //   qv2,
      //   qv3,
      //   qv4
      // );
      // endShape();
    }

  }

  // if(lines.length > 0) {
  //   lines[i].store;
  //   lines[i].display;  

  //   for (var i = 0; i < lines.length - 2; i++ ) {
  //     lines[i].display;
  //   }
  // }
}

function mousePressed() {
  history2 = history.length;
  console.log("mousedown, history length:", history.length);
  // if (drawIt == true && drawable == true && infooter == false) {
  //   lines.push(new LineObj);
  //   console.log(lines);
  // }
}

function mouseReleased() {
  if (drawIt == true) {
    drawable = true;
    if (infooter == false) {
      // lines.push(new LineObj);
      // console.log(lines);
      if (history.length <= 2) {
        i++;
        history.push({x: mouseX, y: mouseY});
        noStroke();
        fill(0);
        ellipse(mouseX, mouseY, 50);
        return;
      }
    } else if (infooter === true) {
      history = [];
      clear();
    }
    history.push({x: "break", y: "break"});
    for (var i = 0; i < history.length - 1; i++) {
      if (history[i].x = "break") {
      }
    }
    console.log("mouse released, new history length:", history.length, ",meaning, this much time passed:", history2 - history.length);
    if (Math.abs((history2 - history.length)) < 4) {
      fill(0);
      noStroke();
      ellipse(mouseX, mouseY, 50);
      noFill();
      strokeWeight(50);
    }
    // history2.push(history.toString());
    // inc++;
    // console.log('inc');
  }
}

thefooter.addEventListener("mouseenter", (e) => {
  infooter = true
});

thefooter.addEventListener("mouseleave", (e) => {
  infooter = false;
});

// access universal history at specific places in array and go from there
// class LineObj {
//   constructor() {
//     this.hi = 0;
//     this.h = [];
//   }

//   store() {
//     if (infooter === false && mouseIsPressed === true) {
//       this.hi++;
//       if (this.hi % 5 == 0) {
//         if (this.h.length > 2) {clear()};
//         this.h.push({x: mouseX, y: mouseY});
//         if (this.h.length <= 2) {
//           return;
//         }
//       }
//     }
//   }

//   display() {
//     beginShape();
//     vertex(this.h[0].x, this.h[0].y);
//     for (let i = 1; i < this.h.length - 2; i++) {
//       const xc = (this.h[i].x + this.h[i + 1].x) / 2;
//       const yc = (this.h[i].y + this.h[i + 1].y) / 2;
//       quadraticVertex(this.h[i].x, this.h[i].y, xc, yc);
//     }
//     quadraticVertex(
//       this.h.at(-2).x,
//       this.h.at(-2).y,
//       this.h.at(-1).x,
//       this.h.at(-1).y
//     );
//     endShape();
//   }
// }
