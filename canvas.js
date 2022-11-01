let myCanvas = document.querySelector("canvas");

myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

var c = myCanvas.getContext("2d");

//Making different color squares
// c.fillStyle = "rgba(255,0,0,0.5)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(0,0,255,0.5)";
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = "rgba(0,255,0,0.5)";
// c.fillRect(300, 300, 100, 100);

//Drawing a line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.stroke();
// c.lineTo(400, 300);
// c.strokeStyle = "red";
// c.stroke();

//Making Arcs / circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();

//Creating multiple circles
// for (var i = 0; i < 100; i++) {
//   var x = Math.random();
//   var y = Math.random();
//   c.beginPath();
//   c.arc(
//     x * window.innerWidth,
//     y * window.innerHeight,
//     30,
//     0,
//     Math.PI * 2,
//     false
//   );
//   c.strokeStyle = `rgba(${x * 255},${y * 255},${x * 255},1)`;
//   c.stroke();
// }

var mouse = {
  x: undefined,
  y: undefined,
};

maxRadius = 45;

let colorArray = ["blue", "red", "gold", "purple", "green"];

//Another event listener
window.addEventListener("resize", function () {
  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;
  init();
});

//Adding and Event Listener
window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

//Creating a circle object
function Circle(x, y, radius, dx, dy) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = Math.random() * 4 + 1;
  this.minRadius = this.radius;
  this.color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
    Math.random() * 255
  )},${Math.floor(Math.random() * 255)})`;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function () {
    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }
    this.draw();
  };
}

var circleArray = [];
//Bouncing circle
function init() {
  circleArray = [];
  for (let i = 0; i < 800; i++) {
    var radius = 20;
    var x = Math.random() * (window.innerWidth - radius * 2) + radius;
    var y = Math.random() * (window.innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 2;
    var dy = (Math.random() - 0.5) * 2;
    circleArray.push(new Circle(x, y, radius, dx, dy));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].draw();
    circleArray[i].update();
  }
}

init();
animate();
